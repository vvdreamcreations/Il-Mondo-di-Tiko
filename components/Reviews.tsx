import React from 'react';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Reviews: React.FC = () => {
    return (
        <section className="container mx-auto px-4 overflow-hidden py-4 md:py-6">
            <div style={{ backgroundColor: "rgba(0,0,0,0.1)", backdropFilter: "blur(48px)" }} className=" backdrop-blur-3xl rounded-[2rem] py-6 border border-white/30 shadow-[inset_0_0_30px_rgba(255,255,255,0.1)] ring-1 ring-white/10 relative overflow-hidden">
                {/* Glass Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                <div className="container mx-auto px-4 mb-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-2xl md:text-3xl font-bold mb-1 text-white drop-shadow-md">Dicono di noi</h2>
                        <p className="text-white/80 text-sm md:text-base">Le parole di chi ha già sognato con Tiko</p>
                    </motion.div>
                </div>

                <div className="relative w-full flex overflow-x-hidden group py-2">
                    <motion.div
                        className="flex gap-4 whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 50,
                            ease: "linear"
                        }}
                    >
                        {/* Double the array to create seamless loop */}
                        {[...REVIEWS, ...REVIEWS].map((review, index) => (
                            <div
                                key={`${review.id}-${index}`}
                                className="w-64 min-h-56 backdrop-blur-xl bg-white/10 p-6 rounded-xl flex-shrink-0 flex flex-col whitespace-normal border border-white/20 shadow-lg relative transform hover:scale-105 transition-transform duration-300 hover:shadow-[0_8px_32px_rgba(31,38,135,0.15)] hover:border-white/40"
                            >
                                <Quote className="absolute top-3 right-3 text-white/10 rotate-180" size={24} />

                                <div className="flex gap-0.5 mb-2 text-tiko-yellow relative z-10">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
                                    ))}
                                </div>
                                <p className="text-white text-xs md:text-sm leading-relaxed mb-3 italic font-medium relative z-10 drop-shadow-sm line-clamp-4">
                                    "{review.text}"
                                </p>
                                <div className="flex items-center gap-2 relative z-10">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-tiko-orange to-tiko-yellow flex items-center justify-center font-bold text-white text-xs shadow-md border border-white/20">
                                        {review.author.charAt(0)}
                                    </div>
                                    <span className="font-bold text-white text-[10px] uppercase tracking-wide drop-shadow-sm">{review.author}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradient fades for edges - Improved visibility */}
                    <div style={{ backgroundColor: "rgba(0,0,0,0.1)", backdropFilter: "blur(48px)" }} className=" z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900/10 to-transparent z-10 pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default Reviews;



