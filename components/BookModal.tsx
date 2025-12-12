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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Left Column: Visual & CTA */}
            <div className={`w-full md:w-2/5 p-8 flex flex-col items-center justify-center ${book.themeColor} bg-opacity-30`}>
              <div className="relative shadow-2xl rounded-lg overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 max-w-[280px]">
                <img src={book.coverImage} alt={book.title} className="w-full h-auto object-cover" />
              </div>
              <a
                href={`https://www.amazon.it/dp/${book.asin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full max-w-xs bg-[#FF9900] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#ffad33] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                <ShoppingBag className="w-5 h-5" />
                Acquista su Amazon
              </a>
              <p className="mt-3 text-xs text-gray-500 text-center opacity-70">
                Spedizione sicura e veloce con Amazon Prime
              </p>
            </div>

            {/* Right Column: Content */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto no-scrollbar bg-white">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-tiko-blue uppercase bg-blue-50 rounded-full">
                {book.age}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-tiko-dark mb-4 leading-tight">
                {book.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 italic border-l-4 border-tiko-yellow pl-4">
                {book.fullDescription}
              </p>

              <div className="mb-8">
                <h3 className="font-display text-xl font-bold text-tiko-dark mb-4">
                  Cosa impara il tuo bambino:
                </h3>
                <ul className="space-y-4">
                  {book.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <CheckCircle className="w-6 h-6 text-tiko-green shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-800 block">{benefit.title}</span>
                        <span className="text-sm text-gray-600">{benefit.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">Perfetto per...</h4>
                <p className="text-gray-600">
                  {book.targetAudience}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookModal;