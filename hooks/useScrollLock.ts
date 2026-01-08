import { useEffect } from 'react';

/**
 * Hook to lock body scroll when a modal is open.
 * @param isLocked boolean - whether the scroll should be locked
 */
const useScrollLock = (isLocked: boolean) => {
    useEffect(() => {
        // Save original overflow style
        const originalStyle = window.getComputedStyle(document.body).overflow;

        if (isLocked) {
            document.body.style.overflow = 'hidden';
            // Prevent touch scrolling on mobile potentially if simple overflow:hidden isn't enough
            // But usually overflow:hidden on body is enough for modern browsers.
        }

        // Cleanup function
        return () => {
            // Only restore if we are the ones who locked it (simplistic, assumes single modal stack usually)
            if (isLocked) {
                document.body.style.overflow = originalStyle === 'hidden' ? '' : originalStyle;
            }
        };
    }, [isLocked]);
};

export default useScrollLock;
