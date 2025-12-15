import { useEffect, useState } from 'react';

const MagicCursor = () => {
    const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;
        let trailId = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Add trail point
            setTrail((prev) => {
                const newTrail = [...prev, { x: mouseX, y: mouseY, id: trailId++ }];
                // Keep only last 8 trail points
                return newTrail.slice(-8);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Clear trail periodically
        const trailClearInterval = setInterval(() => {
            setTrail((prev) => prev.slice(1));
        }, 50);

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

            {/* Main star cursor */}
            <div
                className="fixed pointer-events-none z-[10000] transition-transform duration-100 ease-out"
                style={{
                    left: `${trail[trail.length - 1]?.x || 0}px`,
                    top: `${trail[trail.length - 1]?.y || 0}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {/* Outer glow */}
                <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-full h-full rounded-full bg-tiko-yellow/20 blur-md animate-pulse" />
                </div>

                {/* Star icon */}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-tiko-yellow drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] -translate-x-1/2 -translate-y-1/2"
                    style={{
                        filter: 'drop-shadow(0 0 4px rgba(250, 204, 21, 0.6))',
                    }}
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            </div>
        </>
    );
};

export default MagicCursor;
