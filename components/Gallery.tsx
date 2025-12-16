import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Static list of images in public/Carosello/ folder
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
                        {images.map((imagePath, index) => (
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
                                    onClick={() => setSelectedImage(imagePath)}
                                >
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-tiko-yellow/30 via-transparent to-tiko-orange/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                                    {/* Image */}
                                    <img
                                        src={imagePath}
                                        alt={`Galleria ${index + 1}`}
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
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Gallery;
