import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { BOOKS } from '../constants';
import Footer from '../components/Footer';

const LibriPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col pb-24">
            <Helmet>
                <title>I Libri di Tiko | Storie di amicizia, emozioni e magia</title>
                <meta name="description" content="Esplora la collana di libri di Tiko: il Pennello Magico, il Sassolino della Calma e altri. Favole educative per la crescita dei tuoi bambini." />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "itemListElement": [
                            ${BOOKS.map((book, index) => `{
                                "@type": "ListItem",
                                "position": ${index + 1},
                                "item": {
                                    "@type": "Book",
                                    "name": "${book.title}",
                                    "description": "${book.shortDescription}",
                                    "image": "${book.coverImage}",
                                    "url": "https://www.vvdreamcreations.it/libri#${book.id}",
                                    "author": {
                                        "@type": "Organization",
                                        "name": "VV Dream Creations"
                                    }
                                }
                            }`).join(',')}
                        ]
                    }
                `}
                </script>
            </Helmet>
            <div className="container mx-auto px-4 pt-32">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        I Nostri Libri
                    </h1>
                    <p className="text-white/90 text-xl max-w-3xl mx-auto font-medium drop-shadow-md">
                        Scopri tutte le avventure di Tiko, il piccolo scoiattolo che insegna ai bambini il valore dell'amicizia, della gentilezza e della crescita emotiva.
                    </p>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto rounded-full mt-8 shadow-[0_0_20px_rgba(253,186,116,0.6)]" />
                </motion.div>

                {/* Books List */}
                <div className="space-y-12">
                    {BOOKS.map((book, index) => (
                        <motion.article
                            key={book.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                            className="bg-white/10 backdrop-blur-2xl rough-edges-shadow p-8 md:p-12 border border-white/20 hover:border-tiko-yellow/50 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {/* Book Cover */}
                                <div className="flex-shrink-0 w-full md:w-64">
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-tiko-yellow/20 to-tiko-orange/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="relative w-full torn-edges shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Book Details */}
                                <div className="flex-grow">
                                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                                        {book.title}
                                    </h2>
                                    <p className="text-white/90 text-lg leading-relaxed mb-6 drop-shadow-md">
                                        {book.fullDescription}
                                    </p>

                                    {/* Book Benefits */}
                                    {book.benefits && book.benefits.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="font-display text-xl font-semibold text-tiko-yellow mb-3 drop-shadow-md">
                                                Cosa insegna questo libro:
                                            </h3>
                                            <ul className="space-y-2">
                                                {book.benefits.map((benefit, idx) => (
                                                    <li key={idx} className="text-white/80 flex items-start">
                                                        <span className="text-tiko-yellow mr-2">✨</span>
                                                        <span className="drop-shadow-md"><strong>{benefit.title}:</strong> {benefit.description}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Price and CTA */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        {/* Price */}
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-tiko-yellow font-bold text-3xl md:text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                {book.price}
                                            </span>
                                        </div>

                                        {/* Amazon Link */}
                                        <a
                                            href={`https://www.amazon.it/dp/${book.asin}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-gradient-to-r from-tiko-yellow to-tiko-orange text-white font-semibold px-8 py-3 rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transition-all duration-300 transform hover:scale-105"
                                        >
                                            <span>Acquista su Amazon</span>
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default LibriPage;
