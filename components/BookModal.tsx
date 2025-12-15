import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book } from '../types';
import { X, CheckCircle, ShoppingBag } from 'lucide-react';

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, isOpen, onClose }) => {
  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 pt-24">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900/98 to-gray-800/98 backdrop-blur-xl rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden max-h-[75vh] flex flex-col md:flex-row border border-white/10"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-3 right-3 z-10 p-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-tiko-yellow hover:text-tiko-dark transition-colors border border-white/20 text-white shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Visual & CTA */}
            <div className="w-full md:w-2/5 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-tiko-yellow/10 to-tiko-orange/10 backdrop-blur-sm">
              <div className="relative shadow-2xl rounded-lg overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 max-w-[220px]">
                <img src={book.coverImage} alt={book.title} className="w-full h-auto object-cover" />
              </div>
              <a
                href={`https://www.amazon.it/dp/${book.asin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full max-w-xs bg-gradient-to-r from-[#FF9900] to-[#FFB84D] text-white font-bold py-3 px-5 rounded-xl shadow-lg hover:shadow-[0_6px_20px_rgba(255,153,0,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Acquista su Amazon
              </a>
              <p className="mt-2 text-xs text-white/70 text-center">
                Spedizione sicura e veloce con Amazon Prime
              </p>
            </div>

            {/* Right Column: Content - No Scroll */}
            <div className="w-full md:w-3/5 p-6 flex flex-col">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-tiko-dark uppercase bg-tiko-yellow rounded-full self-start">
                {book.age}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
                {book.title}
              </h2>
              <p className="text-white/90 text-sm leading-relaxed mb-4 italic border-l-4 border-tiko-yellow pl-3 drop-shadow-md">
                {book.fullDescription}
              </p>

              <div className="flex-grow flex flex-col justify-center">
                <h3 className="font-display text-lg font-bold text-tiko-yellow mb-3 drop-shadow-lg">
                  Cosa impara:
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {book.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                      <CheckCircle className="w-4 h-4 text-tiko-green shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white text-sm block drop-shadow-md">{benefit.title}</span>
                        <span className="text-xs text-white/70">{benefit.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookModal;