import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { trackBookClick } from '../utils/analytics';
import { Book } from '../types';
import { RefreshCw, ArrowRight, Sparkles, ShoppingCart, Check } from 'lucide-react';

interface MagicCardProps {
  book: Book;
  onOpenDetails: (book: Book) => void;
  compact?: boolean; // For HomePage optimization
}

const MagicCard: React.FC<MagicCardProps> = ({ book, onOpenDetails, compact = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);

    // Track book click in Google Analytics when flipping to see details
    if (!isFlipped) {
      trackBookClick(book.id, book.title);
    }
  };

  return (
    <div className={`group ${compact ? 'h-[420px]' : 'h-[520px]'} w-full perspective-1000 cursor-pointer`} onClick={handleFlip}>
      <motion.div
        className="relative h-full w-full transition-all duration-500 preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 h-full w-full backface-hidden rounded-[2rem] bg-white shadow-2xl overflow-hidden border border-white/20 transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(251,191,36,0.3)] group-hover:scale-[1.02] group-hover:border-tiko-yellow/50">

          {/* REMOVED the white gradient overlay that was washing out the image */}

          {/* Full Cover Image */}
          <div className="h-full w-full relative">
            <img
              src={book.coverImage}
              alt={book.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay for Text Visibility */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent ${compact ? 'pt-24 pb-6 px-6' : 'pt-32 pb-10 px-8'} text-white z-10`}>
              <div className="flex justify-between items-start mb-3">
                <span className={`inline-block px-3 py-1 rounded-full bg-tiko-yellow text-tiko-dark ${compact ? 'text-[10px]' : 'text-xs'} font-black uppercase tracking-widest shadow-[0_0_15px_rgba(250,204,21,0.6)]`}>
                  {book.age}
                </span>
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 group-hover:bg-tiko-yellow group-hover:text-tiko-dark transition-colors duration-300">
                  <RefreshCw className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} transition-transform duration-500 group-hover:rotate-180`} />
                </div>
              </div>

              <h3 className={`font-display font-bold ${compact ? 'text-xl' : 'text-2xl'} leading-tight mb-3 drop-shadow-lg ${compact ? 'min-h-[3rem]' : 'min-h-[4rem]'}`}>
                {book.title}
              </h3>

              <div className="flex items-center justify-between mt-2">
                <p className={`text-tiko-yellow font-bold ${compact ? 'text-2xl' : 'text-3xl'} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>{book.price}</p>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className={`${compact ? 'text-[10px]' : 'text-xs'}  text-gray-300 font-medium`}
                >
                  Scopri di più
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 h-full w-full backface-hidden rotate-y-180 rounded-[2rem] shadow-2xl p-8 flex flex-col justify-between items-center text-center bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-4 border-tiko-yellow/30"
        >
          <div className="mt-4 w-full flex-grow flex flex-col justify-center">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-tiko-yellow/20 backdrop-blur-sm mb-6 mx-auto shadow-[0_0_20px_rgba(250,204,21,0.3)] animate-float border border-tiko-yellow/30">
              <Sparkles className="w-8 h-8 text-tiko-yellow fill-current" />
            </div>

            <h4 className="font-display font-bold text-xl text-tiko-yellow mb-3 uppercase tracking-wider drop-shadow-lg">La Magia</h4>

            <p className="font-sans text-white/90 text-lg italic leading-relaxed px-2 mb-4 font-medium drop-shadow-md">
              "{book.shortDescription}"
            </p>
          </div>

          <div className="w-full flex flex-col gap-4 mb-4">
            {/* Amazon Button - Prominent */}
            <div className="flex flex-col gap-2">
              <a
                href={`https://www.amazon.it/dp/${book.asin}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full px-6 py-4 bg-gradient-to-r from-[#FF9900] to-[#FFB84D] text-white rounded-2xl font-black text-lg shadow-[0_4px_15px_rgba(255,153,0,0.4)] hover:shadow-[0_6px_20px_rgba(255,153,0,0.6)] hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3"
              >
                <ShoppingCart size={24} className="animate-bounce" />
                Acquista su Amazon
              </a>

              {/* Kindle Unlimited Text */}
              <div className="flex items-center justify-center gap-1.5 text-white font-bold text-xs py-1.5 px-4 bg-tiko-blue/20 backdrop-blur-sm rounded-full mx-auto border border-tiko-blue/40 shadow-sm">
                <Check size={14} className="text-tiko-green" strokeWidth={4} />
                <span>Gratis con <strong className="text-tiko-blue">Kindle Unlimited</strong></span>
              </div>
            </div>

            {/* Read More Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(book);
              }}
              className="w-full group/btn px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-2xl font-bold hover:border-tiko-yellow hover:text-tiko-yellow hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span className="relative z-10">Dettagli & Benefici</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MagicCard;
