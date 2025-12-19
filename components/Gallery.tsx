import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Optimized images: lightweight thumbnails for carousel, full-size for modal
    const images = [
        { thumb: '/Carosello/thumbs/03.webp', full: '/Carosello/full/03.png', alt: 'Illustrazione Tiko lo scoiattolo che scopre la magia del bosco' },
        { thumb: '/Carosello/thumbs/04.webp', full: '/Carosello/full/04.png', alt: 'Disegno per bambini Tiko e amici animali nel bosco incantato' },
        { thumb: '/Carosello/thumbs/06.webp', full: '/Carosello/full/06.png', alt: 'Tiko lo scoiattolo affronta le sue emozioni - illustrazione libro per bambini' },
        { thumb: '/Carosello/thumbs/1.webp', full: '/Carosello/full/1.png', alt: 'Copertina libro Tiko e i segreti della natura' },
        { thumb: '/Carosello/thumbs/10.webp', full: '/Carosello/full/10.png', alt: 'Momento di calma e mindfulness per bambini con Tiko' },
        { thumb: '/Carosello/thumbs/12.webp', full: '/Carosello/full/12.png', alt: 'Avventure di Tiko lo scoiattolo - storie educative' },
        { thumb: '/Carosello/thumbs/16.webp', full: '/Carosello/full/16.png', alt: 'Illustrazione magica bosco e animali - Il Mondo di Tiko' },
        { thumb: '/Carosello/thumbs/Coniglietto 1.webp', full: '/Carosello/full/Coniglietto 1.jpg', alt: 'Coniglietto amico di Tiko - personaggio storie per bambini' },
        { thumb: '/Carosello/thumbs/Coniglietto 2.webp', full: '/Carosello/full/Coniglietto 2.jpg', alt: 'Coniglietto felice illustrazione libro infanzia' },
        { thumb: '/Carosello/thumbs/Coniglietto 3.webp', full: '/Carosello/full/Coniglietto 3.jpg', alt: 'Disegno tenero coniglietto per insegnare la gentilezza' },
        { thumb: '/Carosello/thumbs/Pennello 1.webp', full: '/Carosello/full/Pennello 1.jpg', alt: 'Pennello magico che colora le emozioni - illustrazione' },
        { thumb: '/Carosello/thumbs/Pennello 2.webp', full: '/Carosello/full/Pennello 2.jpg', alt: 'Arte e creatività per bambini - il pennello di Tiko' },
        { thumb: '/Carosello/thumbs/Pennello 3.webp', full: '/Carosello/full/Pennello 3.jpg', alt: 'Magia dei colori e delle emozioni nei libri di Tiko' },
    ];

    // Don't render if no images
    if (images.length === 0) {
        return null;
    }

    // Smooth scroll navigation
    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 350;
            scrollRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <section className="w-full py-16">
                <div className="container mx-auto px-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Sparkles size={24} className="text-tiko-yellow animate-pulse" />
                            <h2 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                                Galleria Magica
                            </h2>
                            <Sparkles size={24} className="text-tiko-yellow animate-pulse" />
                        </div>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto drop-shadow-md">
                            Scorri per scoprire i momenti più belli del mondo di Tiko
                        </p>
                    </motion.div>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-tiko-yellow/90 hover:bg-tiko-yellow rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
                        aria-label="Scorri a sinistra"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-tiko-dark" strokeWidth={3} />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-tiko-yellow/90 hover:bg-tiko-yellow rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
                        aria-label="Scorri a destra"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-tiko-dark" strokeWidth={3} />
                    </button>

                    {/* Gradient overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

                    {/* Scrollable Images Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 pb-4 scroll-smooth"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#FACC15 #1F2937',
                        }}
                    >
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                className="relative group flex-shrink-0"
                            >
                                <div
                                    className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                                    onClick={() => setSelectedImage(image.full)}
                                >
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-tiko-yellow/30 via-transparent to-tiko-orange/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                                    {/* Image */}
                                    <img
                                        src={image.thumb}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                        draggable="false"
                                    />

                                    {/* Border on hover */}
                                    <div className="absolute inset-0 border-4 border-tiko-yellow/0 group-hover:border-tiko-yellow/80 rounded-2xl transition-all duration-500" />

                                    {/* Click hint on hover (desktop only) */}
                                    <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold text-sm">
                                            Clicca per ingrandire
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Custom Scrollbar Styles */}
                    <style jsx>{`
            div::-webkit-scrollbar {
              height: 8px;
            }
            div::-webkit-scrollbar-track {
              background: #1F2937;
              border-radius: 10px;
            }
            div::-webkit-scrollbar-thumb {
              background: linear-gradient(90deg, #FACC15, #FB923C);
              border-radius: 10px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: #FACC15;
            }
          `}</style>
                </div>
            </section>

            {/* Image Modal */}
            {/* Image Modal - Rendered via Portal to ensure it is above everything */}
            {createPortal(
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            key="gallery-modal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
                            onClick={() => setSelectedImage(null)}
                        >
                            {/* Close Button - Fixed position to ensure visibility */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(null);
                                }}
                                className="absolute top-4 right-4 md:top-8 md:right-8 z-[10000] p-3 bg-tiko-yellow text-tiko-dark rounded-full hover:scale-110 transition-transform shadow-lg border-2 border-white/20"
                                aria-label="Chiudi"
                            >
                                <X className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
                            </button>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative w-full max-w-5xl flex items-center justify-center pointer-events-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={selectedImage}
                                    alt="Immagine ingrandita"
                                    className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border-4 border-white/10 pointer-events-auto"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default Gallery;
