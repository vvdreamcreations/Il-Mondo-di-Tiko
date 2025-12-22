import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// --- SHADERS ---

// Vertex Shader for ALL Particles (lights) - smooth floating
const particleVertexShader = `
  uniform float uTime;
  uniform float uTimeOffset;
  attribute float aScale;
  attribute vec3 aSpeed;
  attribute float aPhase;
  attribute vec3 aInitialPos;
  
  varying vec2 vUv;
  varying float vOpacity;

  void main() {
    vUv = uv;
    
    vec3 instancePos = aInitialPos;
    
    // Apply time offset for staggered groups
    float effectiveTime = uTime + uTimeOffset;
    
    // FLOATING MOTION - Multi-directional wandering
    // X-axis: Horizontal sway
    float xTime1 = effectiveTime * aSpeed.z * 0.6 + aPhase;
    float xTime2 = effectiveTime * aSpeed.z * 0.4 + aPhase * 2.0;
    instancePos.x += sin(xTime1) * aSpeed.x * 2.5;
    instancePos.x += cos(xTime2) * aSpeed.x * 1.2;
    
    // Y-axis: Vertical floating (up and down)
    float yTime1 = effectiveTime * aSpeed.y * 0.5 + aPhase * 1.5;
    float yTime2 = effectiveTime * aSpeed.y * 0.3 + aPhase * 0.7;
    instancePos.y += sin(yTime1) * aSpeed.y * 3.0;
    instancePos.y += cos(yTime2) * aSpeed.y * 1.5;
    
    // Z-axis: Depth variation
    float zTime = effectiveTime * aSpeed.z * 0.45 + aPhase * 1.2;
    instancePos.z += sin(zTime) * 0.8;

    vec4 mvPosition = modelViewMatrix * vec4(instancePos, 1.0);
    gl_Position = projectionMatrix * (mvPosition + vec4(position.x * aScale, position.y * aScale, 0.0, 0.0));

    // Pulsing glow effect
    vOpacity = 0.5 + 0.5 * sin(effectiveTime * 1.0 + aPhase);
  }
`;

// Vertex Shader for LEAVES (falling downward with sway)
const leafVertexShader = `
  uniform float uTime;
  uniform float uTimeOffset;
  attribute float aScale;
  attribute vec3 aSpeed;
  attribute float aPhase;
  attribute vec3 aInitialPos;
  
  varying vec2 vUv;
  varying float vOpacity;

  void main() {
    vUv = uv;
    
    vec3 instancePos = aInitialPos;
    float effectiveTime = uTime + uTimeOffset;
    
    // FALLING MOTION - Downward with horizontal sway
    // Vertical fall with looping
    float yDist = effectiveTime * aSpeed.y * 0.8;
    instancePos.y -= yDist;
    float height = 30.0;
    instancePos.y = mod(instancePos.y + 15.0, height) - 15.0;

    // Horizontal sway (zigzag pattern)
    instancePos.x += sin(effectiveTime * aSpeed.z * 0.5 + aPhase) * aSpeed.x * 3.5;
    instancePos.x += sin(effectiveTime * aSpeed.z * 2.0 + aPhase * 2.0) * aSpeed.x * 0.8;
    
    // Z-axis rotation for depth
    instancePos.z += sin(effectiveTime * aSpeed.z * 0.8 + aPhase * 1.5) * 0.5;

    vec4 mvPosition = modelViewMatrix * vec4(instancePos, 1.0);
    gl_Position = projectionMatrix * (mvPosition + vec4(position.x * aScale, position.y * aScale, 0.0, 0.0));

    vOpacity = 0.9 + 0.1 * sin(effectiveTime + aPhase);
  }
`;

// Fragment Shader for Textured Particles
const textureFragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vOpacity;
  
  void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      gl_FragColor = vec4(texColor.rgb, texColor.a * vOpacity);
  }
`;

// --- COMPONENTS ---

// Light Effects using texture-based approach
const LightEffects = () => {
    const textures = useTexture([
        '/Effetti-Luce/firefly-light.svg',
        '/Effetti-Luce/magic-dust-light.svg',
        '/Effetti-Luce/sparkle-light.svg',
    ]);

    return (
        <>
            <LightGroup texture={textures[0]} count={40} timeOffset={0} />
            <LightGroup texture={textures[1]} count={50} timeOffset={3} />
            <LightGroup texture={textures[2]} count={25} timeOffset={6} />
        </>
    )
}

const LightGroup = ({ texture, count, timeOffset }: { texture: THREE.Texture, count: number, timeOffset: number }) => {
    const { viewport } = useThree();
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const realCount = viewport.width < 768 ? Math.floor(count / 2) : count;

    const [initialPos, scales, speeds, phases] = useMemo(() => {
        const p = new Float32Array(realCount * 3);
        const s = new Float32Array(realCount);
        const sp = new Float32Array(realCount * 3);
        const ph = new Float32Array(realCount);

        for (let i = 0; i < realCount; i++) {
            p[i * 3] = (Math.random() - 0.5) * viewport.width * 1.2;
            p[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 1.2;
            p[i * 3 + 2] = Math.random() * 3 - 1.5;

            s[i] = Math.random() * 0.1 + 0.15;

            sp[i * 3] = Math.random() * 0.3 + 0.2;
            sp[i * 3 + 1] = Math.random() * 0.4 + 0.3;
            sp[i * 3 + 2] = Math.random() * 0.5 + 0.3;

            ph[i] = Math.random() * Math.PI * 2;
        }
        return [p, s, sp, ph];
    }, [viewport.width, viewport.height, realCount]);

    useFrame((state) => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = state.clock.elapsedTime;
            mat.uniforms.uTimeOffset.value = timeOffset;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, realCount]}>
            <planeGeometry args={[1, 1]}>
                <instancedBufferAttribute attach="attributes-aInitialPos" args={[initialPos, 3]} />
                <instancedBufferAttribute attach="attributes-aScale" args={[scales, 1]} />
                <instancedBufferAttribute attach="attributes-aSpeed" args={[speeds, 3]} />
                <instancedBufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
            </planeGeometry>
            <shaderMaterial
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexShader={particleVertexShader}
                fragmentShader={textureFragmentShader}
                uniforms={{
                    uTime: { value: 0 },
                    uTimeOffset: { value: timeOffset },
                    uTexture: { value: texture }
                }}
            />
        </instancedMesh>
    )
}

// Leaves component
const Leaves = () => {
    const textures = useTexture([
        '/Foglie/Foglia-2.png',
        '/Foglie/Foglia-3.png',
        '/Foglie/Foglia-4.png',
    ]);

    return (
        <>
            <LeafGroup texture={textures[0]} count={20} timeOffset={0} />
            <LeafGroup texture={textures[1]} count={20} timeOffset={5} />
            <LeafGroup texture={textures[2]} count={20} timeOffset={10} />
        </>
    )
}

const LeafGroup = ({ texture, count, timeOffset }: { texture: THREE.Texture, count: number, timeOffset: number }) => {
    const { viewport } = useThree();
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const realCount = viewport.width < 768 ? count / 2 : count;

    const [initialPos, scales, speeds, phases] = useMemo(() => {
        const p = new Float32Array(realCount * 3);
        const s = new Float32Array(realCount);
        const sp = new Float32Array(realCount * 3);
        const ph = new Float32Array(realCount);

        for (let i = 0; i < realCount; i++) {
            p[i * 3] = (Math.random() - 0.5) * viewport.width;
            p[i * 3 + 1] = (Math.random() - 0.5) * viewport.height;
            p[i * 3 + 2] = Math.random() * 3 - 1.5;

            s[i] = Math.random() * 0.5 + 0.5;

            sp[i * 3] = Math.random() * 0.4 + 0.3;
            sp[i * 3 + 1] = Math.random() * 0.6 + 0.3;
            sp[i * 3 + 2] = Math.random() * 0.8 + 0.4;

            ph[i] = Math.random() * Math.PI * 2;
        }
        return [p, s, sp, ph];
    }, [viewport.width, realCount]);

    useFrame((state) => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = state.clock.elapsedTime;
            mat.uniforms.uTimeOffset.value = timeOffset;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, realCount]}>
            <planeGeometry args={[1, 1]}>
                <instancedBufferAttribute attach="attributes-aInitialPos" args={[initialPos, 3]} />
                <instancedBufferAttribute attach="attributes-aScale" args={[scales, 1]} />
                <instancedBufferAttribute attach="attributes-aSpeed" args={[speeds, 3]} />
                <instancedBufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
            </planeGeometry>
            <shaderMaterial
                transparent
                depthWrite={false}
                vertexShader={leafVertexShader}
                fragmentShader={textureFragmentShader}
                uniforms={{
                    uTime: { value: 0 },
                    uTimeOffset: { value: timeOffset },
                    uTexture: { value: texture }
                }}
            />
        </instancedMesh>
    )
}

const Scene = () => {
    const { gl, scene } = useThree();

    useEffect(() => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
    }, [gl, scene]);

    return (
        <>
            <React.Suspense fallback={null}>
                <LightEffects />
                <Leaves />
            </React.Suspense>
        </>
    )
}

const MagicGL = () => {
    return (
        <div className="absolute inset-0 w-full h-full -z-10" style={{ pointerEvents: 'none' }}>
            <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                dpr={[1, 1.5]}
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




