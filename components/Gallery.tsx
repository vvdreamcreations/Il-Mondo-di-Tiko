import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';


const Gallery: React.FC = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Static list of images in public/Carosello/ folder
    // Update this array when adding new images to the Carosello folder
    const images = [
        '/Carosello/03.png',
        '/Carosello/04.png',
        '/Carosello/06.png',
        '/Carosello/1.png',
        '/Carosello/10.png',
        '/Carosello/12.png',
        '/Carosello/16.png',
        '/Carosello/Coniglietto 1.jpg',
        '/Carosello/Coniglietto 2.jpg',
        '/Carosello/Coniglietto 3.jpg',
        '/Carosello/Pennello 1.jpg',
        '/Carosello/Pennello 2.jpg',
        '/Carosello/Pennello 3.jpg',
    ];

    // Duplicate images for seamless infinite loop
    const duplicatedImages = [...images, ...images, ...images];

    // Navigation function for manual scrolling
    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            const currentScroll = scrollRef.current.scrollLeft || 0;
            scrollRef.current.scrollLeft = currentScroll + (direction === 'right' ? scrollAmount : -scrollAmount);
        }
    };

    // Don't render if no images
    if (images.length === 0) {
        return null;
    }

    return (
        <>
            <section className="w-full py-16 overflow-hidden">
                <div className="container mx-auto px-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Sparkles size={24} className="text-tiko-yellow animate-pulse" />
                            <h2 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                                Galleria Magica
                            </h2>
                            <Sparkles size={24} className="text-tiko-yellow animate-pulse" />
                        </div>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto drop-shadow-md mb-2">
                            Scopri i momenti più belli del mondo di Tiko
                        </p>
                        <p className="text-tiko-yellow text-sm font-bold animate-pulse">
                            👆 Tieni premuto per mettere in pausa
                        </p>
                    </motion.div>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative select-none"
                    onMouseDown={() => setIsPaused(true)}
                    onMouseUp={() => setIsPaused(false)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-tiko-yellow/90 hover:bg-tiko-yellow rounded-full shadow-xl hover:scale-110 transition-all duration-300"
                        aria-label="Scorri a sinistra"
                    >
                        <svg className="w-6 h-6 text-tiko-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-tiko-yellow/90 hover:bg-tiko-yellow rounded-full shadow-xl hover:scale-110 transition-all duration-300"
                        aria-label="Scorri a destra"
                    >
                        <svg className="w-6 h-6 text-tiko-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Gradient overlays for fade effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Images */}
                    <motion.div
                        ref={scrollRef}
                        className="flex gap-6 cursor-grab active:cursor-grabbing"
                        animate={{
                            x: isPaused ? undefined : [0, '-33.333%'],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: 'loop',
                                duration: 40,
                                ease: 'linear',
                            },
                        }}
                        style={{ width: 'max-content' }}
                    >
                        {duplicatedImages.map((imagePath, index) => (
                            <motion.div
                                key={`${imagePath} -${index} `}
                                className="relative group"
                                whileHover={{ scale: 1.05, zIndex: 20 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(imagePath);
                                }}
                            >
                                <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-tiko-yellow/30 via-transparent to-tiko-orange/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                                    {/* Image */}
                                    <img
                                        src={imagePath}
                                        alt={`Galleria ${index + 1} `}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                        draggable="false"
                                    />

                                    {/* Magical overlay on hover */}
                                    <div className="absolute inset-0 border-4 border-tiko-yellow/0 group-hover:border-tiko-yellow/80 rounded-2xl transition-all duration-500" />

                                    {/* Click hint on hover */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold text-sm">
                                            Clicca per ingrandire
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Pause Indicator */}
                <AnimatePresence>
                    {isPaused && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center mt-6"
                        >
                            <div className="inline-flex items-center gap-2 bg-tiko-yellow/20 backdrop-blur-sm px-6 py-3 rounded-full border border-tiko-yellow/40 shadow-lg">
                                <div className="flex gap-1">
                                    <div className="w-1 h-4 bg-tiko-yellow rounded-full" />
                                    <div className="w-1 h-4 bg-tiko-yellow rounded-full" />
                                </div>
                                <span className="text-white font-bold text-sm">In pausa</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                            className="absolute top-6 right-6 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-tiko-yellow hover:text-tiko-dark transition-colors border border-white/20 text-white shadow-2xl"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative max-w-6xl max-h-[90vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(250,204,21,0.5)] border-4 border-tiko-yellow/50">
                                <img
                                    src={selectedImage}
                                    alt="Immagine ingrandita"
                                    className="w-full h-full object-contain max-h-[90vh]"
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Gallery;
