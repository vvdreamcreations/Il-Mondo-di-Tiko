import React from 'react';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Reviews: React.FC = () => {
  return (
    <section className="container mx-auto px-4 overflow-hidden">
      <div className="bg-black/40 backdrop-blur-xl rounded-[3rem] py-16 border border-white/10 shadow-2xl">
        <div className="container mx-auto px-4 mb-12 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">Dicono di noi</h2>
                <p className="text-white/80 text-lg">Le parole di chi ha già sognato con Tiko</p>
            </motion.div>
        </div>

        <div className="relative w-full flex overflow-x-hidden group">
            <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                repeat: Infinity, 
                duration: 40, 
                ease: "linear" 
            }}
            >
            {/* Double the array to create seamless loop */}
            {[...REVIEWS, ...REVIEWS].map((review, index) => (
                <div 
                key={`${review.id}-${index}`} 
                className="w-[350px] md:w-[450px] bg-white/90 backdrop-blur-sm p-8 rounded-3xl flex-shrink-0 whitespace-normal border border-white/20 shadow-lg relative transform hover:scale-105 transition-transform duration-300"
                >
                <Quote className="absolute top-6 right-6 text-tiko-yellow/20 rotate-180" size={60} />
                
                <div className="flex gap-1 mb-4 text-tiko-yellow relative z-10">
                    {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                    ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic font-medium relative z-10">
                    "{review.text}"
                </p>
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-tiko-orange to-tiko-yellow flex items-center justify-center font-bold text-white text-xl shadow-md">
                        {review.author.charAt(0)}
                    </div>
                    <span className="font-bold text-tiko-dark text-sm uppercase tracking-wide">{review.author}</span>
                </div>
                </div>
            ))}
            </motion.div>
            
            {/* Gradient fades for edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/20 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
