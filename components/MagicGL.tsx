import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// --- SHADERS ---

// 1. STANDARD PARTICLE SHADER (Fireflies & Dust)
const particleVertexShader = `
  uniform float uTime;
  uniform float uTimeOffset;
  
  attribute float aScale;
  attribute vec3 aSpeed;
  attribute float aPhase;
  attribute vec3 aInitialPos;
  attribute vec3 aColor;
  attribute float aType; // 0.0 = Firefly, 1.0 = Dust
  
  varying vec2 vUv;
  varying float vOpacity;
  varying vec3 vColor;

  void main() {
    vUv = uv;
    vColor = aColor;
    
    vec3 instancePos = aInitialPos;
    float effectiveTime = uTime + uTimeOffset;
    
    // --- MOTION LOGIC ---
    // Both types float around in the shader for smoothness
    float xTime = effectiveTime * aSpeed.z + aPhase;
    instancePos.x += sin(xTime) * aSpeed.x * 2.0;
    
    float yTime = effectiveTime * aSpeed.y * 0.9 + aPhase * 1.5;
    instancePos.y += sin(yTime) * aSpeed.y * 2.5;
    
    float zTime = effectiveTime * aSpeed.z * 0.7 + aPhase * 1.2;
    instancePos.z += sin(zTime) * 1.0;

    vec4 mvPosition = modelViewMatrix * vec4(instancePos, 1.0);
    gl_Position = projectionMatrix * (mvPosition + vec4(position.x * aScale, position.y * aScale, 0.0, 0.0));

    // --- PULSE LOGIC ---
    float pulse = sin(effectiveTime * 3.0 + aPhase * 5.0);
    
    if (aType > 0.5) {
        // DUST: Gentle Shimmer
        vOpacity = 0.4 + pulse * 0.2; 
    } else {
        // FIREFLY: Deep Heartbeat
        vOpacity = 0.5 + (pulse + 1.0) * 0.5 * 0.5;
    }
  }
`;

// 2. LEAF SHADER (Falling & Tumbling)
const leafVertexShader = `
  uniform float uTime;
  
  attribute float aScale;
  attribute vec3 aSpeed; // x=swaySpeed, y=fallSpeed, z=rotationSpeed
  attribute float aPhase;
  attribute vec3 aInitialPos;
  attribute vec3 aColor;
  attribute float aRotation; // Current rotation angle
  
  varying vec2 vUv;
  varying float vOpacity;
  varying vec3 vColor;

  void main() {
    vUv = uv;
    vColor = aColor; 
    vOpacity = 1.0; // Leaves are solid

    vec3 pos = aInitialPos;
    
    // 1. SWAY (Shader-based visual smoothing)
    // We combine Physics position (falling) with Shader sway (side-to-side)
    float sway = sin(uTime * aSpeed.x + aPhase);
    pos.x += sway * 0.5; // Visual sway amplitude

    // 2. ROTATION (Billboarding with Z-Roll)
    // Simple 2D rotation matrix around Z axis for "tumbling" effect
    float c = cos(aRotation);
    float s = sin(aRotation);
    mat2 rotMat = mat2(c, -s, s, c);
    
    vec2 rotatedPos = rotMat * vec2(position.x * aScale, position.y * aScale);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Apply rotated offsets relative to camera-facing plane
    gl_Position = projectionMatrix * (mvPosition + vec4(rotatedPos, 0.0, 0.0));
  }
`;

const particleFragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vOpacity;
  varying vec3 vColor;
  
  void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      vec3 finalColor = texColor.rgb * vColor;
      gl_FragColor = vec4(finalColor, texColor.a * vOpacity);
  }
`;

// --- PHYSICS ENGINE (Unified for Lights) ---

type ParticleData = {
    x: number; y: number; z: number;
    vx: number; vy: number; vz: number;
    baseX: number; baseY: number; baseZ: number;
    drag: number;
    mass: number;
    scale: number;
    phase: number;
    speedX: number; speedY: number; speedZ: number;
    type: number; // 0 or 1
    color: [number, number, number];
    targetColor: [number, number, number];
};

const useCombinedParticlePhysics = (
    fireflyCount: number,
    dustCount: number
) => {
    // 1. Stable Particle Data (Mutable Ref)
    // We do NOT want to recreate this on viewport resize
    const particlesRef = useRef<ParticleData[]>([]);

    // Initialize ONCE
    const initialized = useRef(false);

    if (!initialized.current) {
        const arr = [];
        const total = fireflyCount + dustCount;

        // Initial viewport guess (will check bounds dynamically later)
        const width = 20;
        const height = 10;

        for (let i = 0; i < total; i++) {
            const isDust = i >= fireflyCount;
            const type = isDust ? 1.0 : 0.0;
            const baseColor: [number, number, number] = isDust ? [0.1, 0.5, 0.2] : [1.0, 0.95, 0.6];
            const mass = isDust ? 0.2 : 1.0;
            const drag = isDust ? 0.95 : 0.94;
            const scale = (Math.random() * 0.25 + 0.20);
            const z = Math.random() * 2 - 1;

            arr.push({
                x: (Math.random() - 0.5) * width * 1.5,
                y: (Math.random() - 0.5) * height * 1.5,
                z: z,
                baseX: 0, baseY: 0, baseZ: 0,
                vx: 0, vy: 0, vz: 0,
                drag: drag,
                mass: mass,
                scale: scale,
                phase: Math.random() * Math.PI * 2,
                speedX: Math.random() * 0.5 + 0.3,
                speedY: Math.random() * 0.5 + 0.3,
                speedZ: Math.random() * 0.5 + 0.3,
                type: type,
                color: [...baseColor],
                targetColor: [...baseColor]
            });
        }
        particlesRef.current = arr;
        initialized.current = true;
    }

    const meshRef = useRef<THREE.InstancedMesh>(null);
    const positionAttr = useRef<THREE.InstancedBufferAttribute>(null);
    const colorAttr = useRef<THREE.InstancedBufferAttribute>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;
        const { width, height } = state.viewport; // Dynamic access

        let needsUpdate = false;
        let colorUpdate = false;

        const particles = particlesRef.current;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Physics
            p.x += p.vx; p.y += p.vy; p.z += p.vz;
            p.vx *= p.drag; p.vy *= p.drag; p.vz *= p.drag;

            // Dust Specifics: Random Walk
            if (p.type > 0.5) {
                p.vx += (Math.random() - 0.5) * 0.001;
                p.vy += (Math.random() - 0.5) * 0.001;
                p.vz += (Math.random() - 0.5) * 0.001;

                p.color[0] += (p.targetColor[0] - p.color[0]) * 0.05;
                p.color[1] += (p.targetColor[1] - p.color[1]) * 0.05;
                p.color[2] += (p.targetColor[2] - p.color[2]) * 0.05;
            }

            // Boundary Wrap
            if (p.x > width) p.x = -width;
            if (p.x < -width) p.x = width;
            if (p.y > height) p.y = -height;
            if (p.y < -height) p.y = height;

            if (positionAttr.current) {
                positionAttr.current.setXYZ(i, p.x, p.y, p.z);
                needsUpdate = true;
            }
            if (colorAttr.current) {
                colorAttr.current.setXYZ(i, p.color[0], p.color[1], p.color[2]);
                colorUpdate = true;
            }
        }

        if (needsUpdate && positionAttr.current) positionAttr.current.needsUpdate = true;
        if (colorUpdate && colorAttr.current) colorAttr.current.needsUpdate = true;

        const mat = meshRef.current.material as THREE.ShaderMaterial;
        mat.uniforms.uTime.value = time;
    });

    const applyForce = useCallback((origin: THREE.Vector3) => {
        const particles = particlesRef.current;
        particles.forEach(p => {
            const dx = p.x - origin.x;
            const dy = p.y - origin.y;
            const dist = Math.sqrt(dx * dx + dy * dy + 0.1);
            if (dist < 2.0) {
                const isDust = p.type > 0.5;
                const force = isDust ? 0.02 : 0.08;
                const cap = isDust ? 0.1 : 0.3;
                const f = Math.min((1.0 / dist * dist) * force, cap);

                p.vx += (dx / dist) * f * (1.0 / p.mass) * 0.2;
                p.vy += (dy / dist) * f * (1.0 / p.mass) * 0.2;

                if (isDust) {
                    p.color[0] = 0.6; p.color[1] = 1.0; p.color[2] = 0.5;
                }
            }
        });
    }, []);

    return { meshRef, positionAttr, colorAttr, particles: particlesRef.current, applyForce };
};

// --- LEAF PHYSICS ---

type LeafData = {
    x: number; y: number; z: number;
    vx: number; vy: number; vz: number;
    rotation: number;
    rotSpeed: number;
    scale: number;
    color: [number, number, number];
    swaySpeed: number;
    phase: number;
};

const useLeafPhysics = (
    count: number
) => {
    // Stable Leaf Data
    const leavesRef = useRef<LeafData[]>([]);
    const initialized = useRef(false);

    if (!initialized.current) {
        const arr = [];
        const colors = [
            [1.0, 0.5, 0.0],
            [0.8, 0.2, 0.1],
            [1.0, 0.8, 0.0],
            [0.6, 0.7, 0.2],
        ];

        // Init guess
        const width = 20;
        const height = 10;

        for (let i = 0; i < count; i++) {
            const col = colors[Math.floor(Math.random() * colors.length)];
            arr.push({
                x: (Math.random() - 0.5) * width * 1.5,
                y: (Math.random() - 0.5) * height * 1.5,
                z: Math.random() * 2 - 0.5,
                vx: 0, vy: 0, vz: 0,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.05,
                scale: Math.random() * 0.4 + 0.3,
                swaySpeed: Math.random() * 1.0 + 0.5,
                phase: Math.random() * Math.PI * 2,
                color: [col[0], col[1], col[2]]
            });
        }
        leavesRef.current = arr;
        initialized.current = true;
    }

    const meshRef = useRef<THREE.InstancedMesh>(null);
    const positionAttr = useRef<THREE.InstancedBufferAttribute>(null);
    const rotationAttr = useRef<THREE.InstancedBufferAttribute>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;
        const { width, height } = state.viewport;

        let needsUpdate = false;
        let rotUpdate = false;

        const leaves = leavesRef.current;

        for (let i = 0; i < leaves.length; i++) {
            const l = leaves[i];

            // Gravity
            if (l.vy > -0.02) l.vy -= 0.0005;

            l.x += l.vx;
            l.y += l.vy;
            l.z += l.vz;

            l.vx *= 0.95;
            l.vy *= 0.98;
            l.vz *= 0.95;

            l.rotation += l.rotSpeed;

            // Updated Wrap Logic using dynamic viewport
            if (l.y < -height / 2 - 2) {
                l.y = height / 2 + 2;
                l.x = (Math.random() - 0.5) * width; // Randomize X on respawn
                l.vy = 0;
            }

            if (positionAttr.current) {
                positionAttr.current.setXYZ(i, l.x, l.y, l.z);
                needsUpdate = true;
            }
            if (rotationAttr.current) {
                rotationAttr.current.setX(i, l.rotation);
                rotUpdate = true;
            }
        }

        if (needsUpdate && positionAttr.current) positionAttr.current.needsUpdate = true;
        if (rotUpdate && rotationAttr.current) rotationAttr.current.needsUpdate = true;

        const mat = meshRef.current.material as THREE.ShaderMaterial;
        mat.uniforms.uTime.value = time;
    });

    const applyForce = useCallback((origin: THREE.Vector3) => {
        const leaves = leavesRef.current;
        leaves.forEach(l => {
            const dx = l.x - origin.x;
            const dy = l.y - origin.y;
            const dist = Math.sqrt(dx * dx + dy * dy + 0.1);
            if (dist < 2.5) {
                const force = 0.15;
                const f = Math.min((1.0 / dist * dist) * force, 0.5);

                l.vx += (dx / dist) * f * 0.5;
                l.vy += (dy / dist) * f * 0.5 + 0.02;
                l.rotSpeed += (Math.random() - 0.5) * 0.2;
            }
        });
    }, []);

    return { meshRef, positionAttr, rotationAttr, leaves: leavesRef.current, applyForce };
};

// --- COMPONENTS ---

const Particles = ({ isMobile }: { isMobile: boolean }) => {
    const texture = useTexture('/Effetti-Luce/firefly-light.svg');
    // viewport unused in init

    // Desktop: 20 Fireflies, 60 Dust. Mobile: 10 Fireflies, 35 Dust.
    const fireflyCount = isMobile ? 10 : 20;
    const dustCount = isMobile ? 35 : 60;

    const { meshRef, positionAttr, colorAttr, particles, applyForce } = useCombinedParticlePhysics(fireflyCount, dustCount);

    useEffect(() => {
        const handler = (e: CustomEvent) => applyForce(e.detail.position);
        window.addEventListener('magic-interaction', handler as EventListener);
        return () => window.removeEventListener('magic-interaction', handler as EventListener);
    }, [applyForce]);

    // Initial Attribute Arrays
    const [scales, speeds, phases, types, defaultColors] = useMemo(() => {
        const count = particles.length;
        const s = new Float32Array(count);
        const sp = new Float32Array(count * 3);
        const ph = new Float32Array(count);
        const t = new Float32Array(count);
        const c = new Float32Array(count * 3);

        particles.forEach((p, i) => {
            s[i] = p.scale;
            sp[i * 3] = p.speedX; sp[i * 3 + 1] = p.speedY; sp[i * 3 + 2] = p.speedZ;
            ph[i] = p.phase;
            t[i] = p.type;
            c[i * 3] = p.color[0]; c[i * 3 + 1] = p.color[1]; c[i * 3 + 2] = p.color[2];
        });
        return [s, sp, ph, t, c];
    }, [particles]);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]} frustumCulled={false}>
            <planeGeometry args={[1, 1]}>
                <instancedBufferAttribute ref={positionAttr} attach="attributes-aInitialPos" args={[new Float32Array(particles.length * 3), 3]} />
                <instancedBufferAttribute attach="attributes-aScale" args={[scales, 1]} />
                <instancedBufferAttribute attach="attributes-aSpeed" args={[speeds, 3]} />
                <instancedBufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
                <instancedBufferAttribute attach="attributes-aType" args={[types, 1]} />
                <instancedBufferAttribute ref={colorAttr} attach="attributes-aColor" args={[defaultColors, 3]} />
            </planeGeometry>
            <shaderMaterial
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexShader={particleVertexShader}
                fragmentShader={particleFragmentShader}
                uniforms={{
                    uTime: { value: 0 },
                    uTimeOffset: { value: 0 },
                    uTexture: { value: texture }
                }}
            />
        </instancedMesh>
    )
}

const Leaves = ({ isMobile }: { isMobile: boolean }) => {
    const texture = useTexture('/Foglie/Foglia-1.svg');

    // Desktop: 20 Leaves, Mobile: 8 Leaves
    const count = isMobile ? 8 : 20;
    const { meshRef, positionAttr, rotationAttr, leaves, applyForce } = useLeafPhysics(count);

    useEffect(() => {
        const handler = (e: CustomEvent) => applyForce(e.detail.position);
        window.addEventListener('magic-interaction', handler as EventListener);
        return () => window.removeEventListener('magic-interaction', handler as EventListener);
    }, [applyForce]);

    // Initial Attributes
    const [scales, speeds, phases, defaultColors] = useMemo(() => {
        const count = leaves.length;
        const s = new Float32Array(count);
        const sp = new Float32Array(count * 3); // x=sway, y=unused, z=unused
        const ph = new Float32Array(count);
        const c = new Float32Array(count * 3);

        leaves.forEach((l, i) => {
            s[i] = l.scale;
            sp[i * 3] = l.swaySpeed; sp[i * 3 + 1] = 0; sp[i * 3 + 2] = 0;
            ph[i] = l.phase;
            c[i * 3] = l.color[0]; c[i * 3 + 1] = l.color[1]; c[i * 3 + 2] = l.color[2];
        });
        return [s, sp, ph, c];
    }, [leaves]);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, leaves.length]} frustumCulled={false}>
            <planeGeometry args={[1, 1]}>
                <instancedBufferAttribute ref={positionAttr} attach="attributes-aInitialPos" args={[new Float32Array(leaves.length * 3), 3]} />
                <instancedBufferAttribute attach="attributes-aScale" args={[scales, 1]} />
                <instancedBufferAttribute attach="attributes-aSpeed" args={[speeds, 3]} />
                <instancedBufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
                <instancedBufferAttribute ref={rotationAttr} attach="attributes-aRotation" args={[new Float32Array(leaves.length), 1]} />
                <instancedBufferAttribute attach="attributes-aColor" args={[defaultColors, 3]} />
            </planeGeometry>
            <shaderMaterial
                transparent
                depthWrite={false}
                side={THREE.DoubleSide} // Important for tumbling!
                blending={THREE.NormalBlending} // Leaves are solid-ish
                vertexShader={leafVertexShader}
                fragmentShader={particleFragmentShader}
                uniforms={{
                    uTime: { value: 0 },
                    uTexture: { value: texture }
                }}
            />
        </instancedMesh>
    )
}

const Scene = () => {
    const { gl, scene, viewport } = useThree();

    // Detect Mobile for Optimization
    // We use a simple check based on viewport width from Three.js or window.innerWidth
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Interaction Raycaster
    useEffect(() => {
        let lastCall = 0;
        const handleInteraction = (e: MouseEvent | TouchEvent) => {
            const now = Date.now();
            // Throttle more on mobile (60fps vs 30fps check is roughly 16ms vs 33ms)
            // But here we throttle to ~30fps for everyone, maybe 15fps for mobile touch if really needed
            if (now - lastCall < (isMobile ? 50 : 30)) return;
            lastCall = now;

            let cx, cy;
            if (e.type === 'touchstart') {
                cx = (e as TouchEvent).touches[0].clientX;
                cy = (e as TouchEvent).touches[0].clientY;
            } else {
                cx = (e as MouseEvent).clientX;
                cy = (e as MouseEvent).clientY;
            }
            const x = (cx / window.innerWidth) * 2 - 1;
            const y = -(cy / window.innerHeight) * 2 + 1;
            const worldX = x * (viewport.width / 2);
            const worldY = y * (viewport.height / 2);
            const position = new THREE.Vector3(worldX, worldY, 0);
            window.dispatchEvent(new CustomEvent('magic-interaction', { detail: { position } }));
        };
        window.addEventListener('mousedown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction, { passive: true }); // Passive for better scroll performance
        return () => {
            window.removeEventListener('mousedown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [viewport, isMobile]);

    useEffect(() => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
    }, [gl, scene]);

    return (
        <React.Suspense fallback={null}>
            {/* Reduce counts significantly on mobile to free up GPU for UI/CSS */}
            <Particles isMobile={isMobile} />
            <Leaves isMobile={isMobile} />
        </React.Suspense>
    )
}

const MagicGL = () => {
    return (
        <div className="absolute inset-0 w-full h-full -z-10" style={{ pointerEvents: 'auto' }}>
            <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                dpr={[1, 1.25]}
                gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor(new THREE.Color(0x000000), 0);
                }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default MagicGL;
