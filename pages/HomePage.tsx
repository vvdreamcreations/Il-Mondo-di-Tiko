import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
const Values = React.lazy(() => import('../components/Values'));
const About = React.lazy(() => import('../components/About'));
const MagicCard = React.lazy(() => import('../components/MagicCard'));
const BookModal = React.lazy(() => import('../components/BookModal'));
const Reviews = React.lazy(() => import('../components/Reviews'));
const Newsletter = React.lazy(() => import('../components/Newsletter'));
const Footer = React.lazy(() => import('../components/Footer'));

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
            <Helmet>
                <title>Il Mondo di Tiko | Libri illustrati per bambini e crescita emotiva</title>
                <meta name="description" content="Scopri il mondo di Tiko: libri illustrati per bambini che insegnano a gestire le emozioni con dolcezza. Storie educative su rabbia, calma e gentilezza per crescere felici." />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "VV Dream Creations",
                        "url": "https://www.vvdreamcreations.it",
                        "logo": "https://www.vvdreamcreations.it/vv-dream-creations-logo.webp",
                        "sameAs": [
                            "https://www.facebook.com/vvdreamcreations",
                            "https://www.instagram.com/vvdreamcreations"
                        ]
                    }
                `}
                </script>
            </Helmet>
            <Hero />

            {/* Wrapper for lazy sections */}
            <React.Suspense fallback={<div className="h-screen w-full" />}>
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
                            className="bg-white/10 backdrop-blur-2xl leaf-edges-shadow p-8 md:p-16 border border-white/20 relative overflow-hidden"
                        >
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
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                                    >
                                        <MagicCard book={book} onOpenDetails={handleOpenDetails} compact />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </section>



                    <Reviews />

                    <Newsletter />
                </div>

                <Footer />

                <BookModal
                    book={selectedBook}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </React.Suspense>
        </div>
    );
};

export default HomePage;


