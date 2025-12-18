import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import Values from '../components/Values';
import About from '../components/About';
import MagicCard from '../components/MagicCard';
import BookModal from '../components/BookModal';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { BOOKS } from '../constants';
import { Book } from '../types';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenDetails = (book: Book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedBook(null), 300);
    };

    return (
        <div className="flex-grow flex flex-col">
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
                                    <MagicCard book={book} onOpenDetails={handleOpenDetails} compact />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                <Gallery />

                <Reviews />

                <Newsletter />
            </div>

            <Footer />

            <BookModal
                book={selectedBook}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default HomePage;
