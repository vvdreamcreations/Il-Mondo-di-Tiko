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
        transition={{ duration: 0.2, type: 'spring', stiffness: 350, damping: 28 }}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 h-full w-full backface-hidden rounded-[2rem] bg-white shadow-xl overflow-hidden border border-white/20 transition-all duration-300 group-hover:shadow-[0_15px_40px_rgba(251,191,36,0.2)] group-hover:scale-[1.02] group-hover:border-tiko-yellow/50">

          {/* REMOVED the white gradient overlay that was washing out the image */}

          {/* Full Cover Image */}
          <div className="h-full w-full relative">
            <img
              src={book.coverImage}
              alt={`Copertina del libro ${book.title} - Storia illustrata per bambini sulle emozioni`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
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
          className="absolute inset-0 h-full w-full backface-hidden rotate-y-180 rounded-[2rem] shadow-xl px-6 pt-8 pb-12 flex flex-col justify-between items-center text-center bg-gray-900/80 backdrop-blur-[20px] border-4 border-tiko-yellow/30"
        >
          <div className="w-full flex-grow flex flex-col justify-center items-center px-4">
            <div className="mb-4">
              <Sparkles className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} text-tiko-yellow fill-current animate-pulse`} />
            </div>
            <p className={`font-sans text-white/95 ${compact ? 'text-sm leading-snug' : 'text-lg leading-relaxed'} italic font-medium drop-shadow-md text-center mb-4`}>
              "{book.shortDescription}"
            </p>
          </div>

          <div className="w-full flex flex-col gap-2 mb-2 px-2">
            {/* Amazon Button - Compacted */}
            <a
              href={`https://www.amazon.it/dp/${book.asin}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`w-full ${compact ? 'px-3 py-3 text-sm' : 'px-4 py-3.5 text-base'} bg-gradient-to-r from-[#FF9900] to-[#FFB84D] text-white rounded-xl font-black shadow-[0_4px_15px_rgba(255,153,0,0.4)] hover:shadow-[0_6px_20px_rgba(255,153,0,0.6)] hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer z-50 relative`}
            >
              <ShoppingCart size={compact ? 18 : 22} className="animate-bounce" />
              Acquista su Amazon
            </a>

            {/* Kindle Unlimited Text */}
            <div className={`w-full flex items-center justify-center gap-1.5 text-white font-bold ${compact ? 'text-[9px] py-1' : 'text-[10px] py-1.5'} bg-tiko-blue/20 backdrop-blur-sm rounded-lg border border-tiko-blue/40 shadow-sm`}>
              <Check size={compact ? 10 : 12} className="text-tiko-green" strokeWidth={4} />
              <span>Gratis con <strong className="text-tiko-blue">Kindle Unlimited</strong></span>
            </div>

            {/* Read More Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(book);
              }}
              className={`w-full group/btn ${compact ? 'px-3 py-3 text-xs' : 'px-4 py-3 text-sm'} bg-transparent border-2 border-white/30 text-white rounded-xl font-bold hover:border-tiko-yellow hover:text-tiko-yellow hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer z-50 relative`}
            >
              <span className="relative z-10 pointer-events-none">Dettagli & Benefici</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform pointer-events-none" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MagicCard;
