import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Values from './components/Values';
import About from './components/About';
import MagicCard from './components/MagicCard';
import BookModal from './components/BookModal';
import Reviews from './components/Reviews';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { BOOKS } from './constants';
import { Book } from './types';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Removed scroll-based transforms (parallax/opacity) to keep video fixed and visible.

  // Force video play on mount
  useEffect(() => {
    if (videoRef.current) {
        // Critical for browsers: explicitly set defaultMuted before play
        videoRef.current.defaultMuted = true;
        videoRef.current.muted = true;
        
        videoRef.current.playbackRate = 0.85; // Slightly slower for magical atmosphere
        
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Video started playing successfully
                setVideoLoaded(true);
            }).catch(error => {
                console.log("Autoplay prevented or failed:", error);
                // The fallback image will show
            });
        }
    }
  }, []);

  const handleOpenDetails = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300);
  };

  return (
    <div className="min-h-screen flex flex-col relative font-sans overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND SYSTEM - FIXED & STATIC */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-gray-900">
        
        {/* LAYER 1: DEEP VISUALS (Video/Image) */}
        <div className="absolute inset-0 w-full h-full">
            {/* Fallback Image - Magical Forest */}
            <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1600&auto=format&fit=crop" 
                    alt="Bosco magico" 
                    className="w-full h-full object-cover opacity-80"
                />
            </div>

            {/* Video Layer - Forest Sunbeams */}
            <motion.div 
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: videoLoaded ? 1 : 0 }}
                transition={{ duration: 1.5 }}
            >
                <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover" 
                    onPlay={() => setVideoLoaded(true)}
                >
                    {/* Magical Forest Sunbeams Video */}
                    <source src="https://videos.pexels.com/video-files/2882118/2882118-hd_1280_720_24fps.mp4" type="video/mp4" />
                </video>
            </motion.div>
        </div>

        {/* LAYER 2: ATMOSPHERIC OVERLAYS */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Darker overlay to ensure text readability over the video while scrolling */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            
            {/* Warm/Magic Tint */}
            <div className="absolute inset-0 bg-tiko-orange/10 mix-blend-overlay" />
        </div>
      </div>

      {/* SCROLLABLE CONTENT LAYER */}
      <div className="relative z-10 flex-grow flex flex-col">
        <Hero />
        
        {/* Wrapper for sections */}
        <div className="space-y-32 pb-24 mt-10">
            
            <Values />
            
            <About />

            {/* Books Section */}
            <section id="books" className="container mx-auto px-4">
            <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden"
            >
                {/* Shine effect on the glass container */}
                <div className="absolute -top-full -left-full w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-45 pointer-events-none" />

                {/* Section Title */}
                <div className="text-center mb-16 relative z-10">
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                    Le Avventure di Tiko
                    </h2>
                    <p className="text-white/90 text-xl max-w-2xl mx-auto font-medium drop-shadow-md">
                    Clicca sulle carte per scoprire la magia che nascondono.
                    </p>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto rounded-full mt-8 shadow-[0_0_20px_rgba(253,186,116,0.6)]" />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
                {BOOKS.map((book, index) => (
                    <motion.div 
                        key={book.id} 
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 50, rotateX: -10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                    <MagicCard book={book} onOpenDetails={handleOpenDetails} />
                    </motion.div>
                ))}
                </div>
            </motion.div>
            </section>

            <Reviews />
            
            <Newsletter />
        </div>
        
        <Footer />
      </div>

      <BookModal 
        book={selectedBook} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default App;