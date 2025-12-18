import { useEffect, useState } from 'react';

const MagicCursor = () => {
    const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;
        let trailId = 0;
        let lastTime = 0;
        let hideTimeout: NodeJS.Timeout;

        // Check if touch device
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            // Throttle to 60fps (16ms)
            if (now - lastTime < 16) return;
            lastTime = now;

            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update mouse position for main cursor
            setMousePos({ x: mouseX, y: mouseY });

            // Show cursor
            setIsVisible(true);

            // On touch devices, hide cursor after 500ms of inactivity
            if (isTouchDevice) {
                clearTimeout(hideTimeout);
                hideTimeout = setTimeout(() => {
                    setIsVisible(false);
                }, 500);
            }

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
            clearTimeout(hideTimeout);
        };
    }, []);

    return (
        <>
            {/* CSS to hide system cursor */}
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
            {isVisible && trail.map((point, index) => (
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

            {/* Custom SVG Cursor */}
            {isVisible && (
                <div
                    className="fixed pointer-events-none z-[10000] transition-opacity duration-300"
                    style={{
                        left: `${mousePos.x}px`,
                        top: `${mousePos.y}px`,
                        transform: 'translate(-50%, -50%)',
                        opacity: isVisible ? 1 : 0,
                    }}
                >
                    <img
                        src="/magic-mouse-svg.svg"
                        alt="cursor"
                        className="w-8 h-8"
                        style={{
                            filter: 'drop-shadow(0 0 4px rgba(250, 204, 21, 0.6))',
                        }}
                    />
                </div>
            )}

        </>
    );
};

export default MagicCursor;
