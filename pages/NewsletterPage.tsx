import React from 'react';
import { motion } from 'framer-motion';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const NewsletterPage: React.FC = () => {
    return (
        <div className="flex-grow flex flex-col pb-24">
            <div className="container mx-auto px-4 pt-32">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        Newsletter
                    </h1>
                    <p className="text-white/90 text-xl max-w-3xl mx-auto font-medium drop-shadow-md">
                        Iscriviti alla nostra newsletter per ricevere storie esclusive, anteprime e contenuti speciali dedicati al mondo di Tiko.
                    </p>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto rounded-full mt-8 shadow-[0_0_20px_rgba(253,186,116,0.6)]" />
                </motion.div>

                {/* Gift Highlight */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="max-w-2xl mx-auto mb-12"
                >
                    <div className="bg-gradient-to-r from-tiko-yellow/20 to-tiko-orange/20 backdrop-blur-xl rounded-2xl p-6 border-2 border-tiko-yellow/50 shadow-[0_0_40px_rgba(250,204,21,0.3)]">
                        <div className="flex items-center justify-center gap-3 text-white">
                            <span className="text-4xl">🎁</span>
                            <p className="font-display text-xl md:text-2xl font-semibold drop-shadow-md">
                                Riceverai uno splendido regalo di benvenuto!
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Newsletter Component */}
                <Newsletter />
            </div>

            <Footer />
        </div>
    );
};

export default NewsletterPage;
