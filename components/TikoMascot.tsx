import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Corner = 'bottom-left' | 'bottom-right';

const TikoMascot: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [corner, setCorner] = useState<Corner>('bottom-right');
    const [isScrollingFast, setIsScrollingFast] = useState(false);

    // Timer refs to handle cleanup
    const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastScrollY = useRef(0);

    // Random integer between min and max (inclusive)
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

    // Choose a random corner
    const pickRandomCorner = (): Corner => {
        const corners: Corner[] = ['bottom-left', 'bottom-right'];
        return corners[Math.floor(Math.random() * corners.length)];
    };

    // Main loop for appearance
    const scheduleNextAppearance = useCallback((delay: number) => {
        if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);

        showTimeoutRef.current = setTimeout(() => {
            // Check scroll status before showing
            if (!isScrollingFast) {
                setCorner(pickRandomCorner());
                setIsVisible(true);

                // Schedule hide after 5 seconds
                if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = setTimeout(() => {
                    setIsVisible(false);
                    // Schedule next appearance (7-10s after hiding)
                    scheduleNextAppearance(randomInt(7000, 10000));
                }, 5000);
            } else {
                // If scrolling fast, retry in 2 seconds
                scheduleNextAppearance(2000);
            }
        }, delay);
    }, [isScrollingFast]);

    // Initial setup
    useEffect(() => {
        // Initial start after 6 seconds
        scheduleNextAppearance(6000);

        return () => {
            if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [scheduleNextAppearance]);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const velocity = Math.abs(currentScrollY - lastScrollY.current);
            lastScrollY.current = currentScrollY;

            // Threshold for "fast" scrolling
            if (velocity > 50) {
                setIsScrollingFast(true);

                // Reset scrolling fast status after scrolling stops
                if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
                scrollTimeoutRef.current = setTimeout(() => {
                    setIsScrollingFast(false);
                }, 500); // 500ms after stop scroll
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Style generation
    const getCornerStyle = () => {
        const baseClass = "fixed z-40 w-32 md:w-48 pointer-events-none filter drop-shadow-2xl";
        let transforms = {};
        let position = {};

        switch (corner) {
            case 'bottom-right':
                position = { bottom: '-20px', right: '-20px' };
                transforms = { scaleX: 1, scaleY: 1 };
                break;
            case 'bottom-left':
                position = { bottom: '-20px', left: '-20px' };
                transforms = { scaleX: -1, scaleY: 1 };
                break;
        }

        return { className: baseClass, style: { ...position, ...transforms } };
    };

    const variants = {
        hidden: {
            x: corner.includes('right') ? '100%' : '-100%',
            y: '100%',
            opacity: 0
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: { type: "spring", damping: 20, stiffness: 100, duration: 1.5 } // Slowed down to 1.5s
        },
        exit: {
            x: corner.includes('right') ? '100%' : '-100%',
            y: '100%',
            opacity: 0,
            transition: { duration: 1.5, ease: "anticipate" } // Slowed down to 1.5s
        }
    };

    const { className, style } = getCornerStyle();

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.img
                    key="tiko-mascot"
                    src="/tiko-mascot.gif"
                    alt="Tiko Mascotte"
                    className={className}
                    style={style}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    loading="lazy"
                />
            )}
        </AnimatePresence>
    );
};

export default TikoMascot;
