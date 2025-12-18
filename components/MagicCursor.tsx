import { useEffect, useState } from 'react';

const MagicCursor = () => {
    const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;
        let trailId = 0;
        let lastTime = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            // Throttle to 60fps (16ms)
            if (now - lastTime < 16) return;
            lastTime = now;

            mouseX = e.clientX;
            mouseY = e.clientY;

            // Add trail point
            setTrail((prev) => {
                const newTrail = [...prev, { x: mouseX, y: mouseY, id: trailId++ }];
                // Keep only last 5 trail points (reduced for performance)
                return newTrail.slice(-5);
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Clear trail periodically
        const trailClearInterval = setInterval(() => {
            setTrail((prev) => prev.slice(1));
        }, 80); // Increased interval for better performance

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(trailClearInterval);
        };
    }, []);

    return (
        <>
            {/* CSS for custom cursor */}
            <style>{`
        * {
          cursor: none !important;
        }
        a, button, [role="button"] {
          cursor: none !important;
        }
        
        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>

            {/* Trail particles */}
            {trail.map((point, index) => (
                <div
                    key={point.id}
                    className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999]"
                    style={{
                        left: `${point.x}px`,
                        top: `${point.y}px`,
                        transform: 'translate(-50%, -50%)',
                        background: `radial-gradient(circle, rgba(250, 204, 21, ${0.6 - index * 0.07}) 0%, transparent 70%)`,
                        boxShadow: `0 0 ${8 - index}px rgba(250, 204, 21, ${0.8 - index * 0.1})`,
                        transition: 'opacity 0.3s ease-out',
                        opacity: 1 - index * 0.12,
                    }}
                />
            ))}

            {/* Main star cursor - Always visible with clear pointer */}
            <div
                className="fixed pointer-events-none z-[10000]"
                style={{
                    left: `${trail[trail.length - 1]?.x || 0}px`,
                    top: `${trail[trail.length - 1]?.y || 0}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {/* Outer glow - removed pulse for constant visibility */}
                <div className="absolute inset-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-full h-full rounded-full bg-tiko-yellow/30 blur-md" />
                </div>

                {/* Directional Star with elongated top point */}
                <svg
                    width="28"
                    height="32"
                    viewBox="0 0 28 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-translate-x-1/2 -translate-y-1/2"
                    style={{
                        filter: 'drop-shadow(0 0 6px rgba(250, 204, 21, 0.8)) drop-shadow(0 0 2px rgba(255, 255, 255, 0.9))',
                    }}
                >
                    {/* White border for contrast */}
                    <path
                        d="M14 2 L16 12 L26 14 L17 19 L19 29 L14 24 L9 29 L11 19 L2 14 L12 12 Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="1.5"
                    />
                    {/* Yellow star fill */}
                    <path
                        d="M14 3 L16 12 L25 14 L17 19 L19 28 L14 23.5 L9 28 L11 19 L3 14 L12 12 Z"
                        fill="#FACC15"
                    />
                    {/* Brighter center for pointer clarity */}
                    <circle cx="14" cy="12" r="2" fill="#FFF4A3" />
                </svg>
            </div>
        </>
    );
};

export default MagicCursor;
