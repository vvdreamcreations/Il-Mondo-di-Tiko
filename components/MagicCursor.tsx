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
          cursor: url('/magic-mouse-svg.svg'), auto !important;
        }
        a, button, [role="button"] {
          cursor: url('/magic-mouse-svg.svg'), pointer !important;
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

        </>
    );
};

export default MagicCursor;
