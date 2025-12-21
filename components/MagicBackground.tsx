import React, { useEffect, useRef } from 'react';

const MagicBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Handle resize
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        // --- ASSETS ---
        const leafImages: HTMLImageElement[] = [];
        const leafSources = [
            '/Foglie/Foglia-1.png',
            '/Foglie/Foglia-2.png',
            '/Foglie/Foglia-3.png',
            '/Foglie/Foglia-4.png'
        ];

        // Load leaf images
        leafSources.forEach(src => {
            const img = new Image();
            img.src = src;
            leafImages.push(img);
        });

        // --- PARTICLES CLASSES ---

        // 1. Fireflies (Lucciole) - Glowing yellow/orange
        class Firefly {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            fadeSpeed: number;
            fadingIn: boolean;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1; // 1-3px
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random();
                this.fadeSpeed = Math.random() * 0.02 + 0.005;
                this.fadingIn = Math.random() > 0.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges (or wrap around, wrapping is better for nature)
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Pulse opacity
                if (this.fadingIn) {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= 1) this.fadingIn = false;
                } else {
                    this.opacity -= this.fadeSpeed;
                    if (this.opacity <= 0) {
                        this.fadingIn = true;
                        // Reposition randomly when invisible for variety
                        this.x = Math.random() * width;
                        this.y = Math.random() * height;
                    }
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(250, 204, 21, ${this.opacity})`; // tiko-yellow
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(250, 204, 21, 0.8)";
                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            }
        }

        // 2. Magic Dust (Polvere Magica) - Tiny particles, slow, pink/blue
        class MagicDust {
            x: number;
            y: number;
            size: number;
            speedY: number;
            opacity: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5; // very small
                this.speedY = Math.random() * -0.2 - 0.05; // slowly floating up
                this.opacity = Math.random() * 0.5 + 0.1;
                // Randomly blue or pinkish
                this.color = Math.random() > 0.5 ? '125, 211, 252' : '251, 146, 60'; // tiko-blue or tiko-orange
            }

            update() {
                this.y += this.speedY;
                this.x += Math.sin(this.y * 0.01) * 0.2; // slight sway

                if (this.y < 0) {
                    this.y = height;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // 3. Falling Leaves (Foglie) - Images with rotation
        class Leaf {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            rotation: number;
            rotationSpeed: number;
            image: HTMLImageElement;
            swayAmplitude: number;
            swayFrequency: number;
            time: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * -height; // Start above viewport
                this.size = Math.random() * 20 + 20; // 20-40px
                this.speedY = Math.random() * 1 + 0.5;
                this.speedX = 0;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 2 - 1;
                this.image = leafImages[Math.floor(Math.random() * leafImages.length)];
                this.swayAmplitude = Math.random() * 50 + 20;
                this.swayFrequency = Math.random() * 0.02 + 0.005;
                this.time = Math.random() * 100;
            }

            update() {
                this.time += 1;
                this.y += this.speedY;
                // Sway movement
                this.x += Math.sin(this.time * this.swayFrequency) * 0.5;
                this.rotation += this.rotationSpeed;

                if (this.y > height + 50) {
                    this.y = -50;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                if (!ctx || !this.image.complete) return;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.globalAlpha = 0.8;
                ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
                ctx.restore();
            }
        }

        // --- INSTANTIATION ---
        const fireflies: Firefly[] = Array.from({ length: 20 }, () => new Firefly());
        const dustParticles: MagicDust[] = Array.from({ length: 50 }, () => new MagicDust());
        const leaves: Leaf[] = Array.from({ length: 15 }, () => new Leaf());

        // --- ANIMATION LOOP ---
        let startTimestamp: number | null = null;

        const animate = (timestamp: number) => {
            // Create clear rect
            ctx.clearRect(0, 0, width, height);

            // Draw all
            dustParticles.forEach(p => { p.update(); p.draw(); });
            leaves.forEach(l => { l.update(); l.draw(); });
            fireflies.forEach(f => { f.update(); f.draw(); });

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        />
    );
};

export default MagicBackground;
