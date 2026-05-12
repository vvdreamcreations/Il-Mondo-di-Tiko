import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShoppingCart, BookOpen, Star } from 'lucide-react';
import { BOOKS } from '../constants';
import Footer from '../components/Footer';

const LibriPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col pb-24">
      <Helmet>
        <title>I Libri di Tiko | Storie di amicizia, emozioni e magia</title>
        <meta name="description" content="Esplora la collana di libri di Tiko: il Pennello Magico, il Sassolino della Calma e altri. Favole educative per la crescita dei tuoi bambini." />
        <script type="application/ld+json">
          {`{
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
                  "author": { "@type": "Organization", "name": "VV Dream Creations" }
                }
              }`).join(',')}
            ]
          }`}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 pt-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-tiko-yellow font-mono text-xs tracking-widest uppercase mb-3">
            La Collana
          </p>
          <h1 className="font-display font-bold text-white text-5xl md:text-7xl mb-4 drop-shadow-lg">
            I Libri di Tiko
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Cinque avventure, cinque emozioni. Ogni storia un seme di crescita.
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto mt-8 opacity-60" />
        </motion.div>

        {/* Books */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {BOOKS.map((book, index) => (
            <motion.article
              key={book.id}
              id={book.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(26,31,46,0.8) 100%)',
                border: `1px solid ${book.accentColor}22`,
              }}
            >
              {/* Glow accento */}
              <div
                className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none opacity-20"
                style={{ background: book.accentColor }}
              />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8 md:p-10 items-start">

                {/* Copertina */}
                <div className="flex-shrink-0 w-36 md:w-44 mx-auto md:mx-0">
                  <div className="relative group">
                    <div
                      className="absolute -inset-3 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
                      style={{ background: book.accentColor }}
                    />
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="relative rounded-2xl shadow-2xl w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      style={{ aspectRatio: '3/4' }}
                    />
                  </div>
                </div>

                {/* Contenuto */}
                <div className="flex-1 min-w-0">
                  {/* Badge età */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{
                      background: `${book.accentColor}20`,
                      border: `1px solid ${book.accentColor}40`,
                      color: book.accentColor,
                    }}
                  >
                    <BookOpen size={11} />
                    {book.age}
                  </div>

                  <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-3 leading-tight">
                    {book.title}
                  </h2>

                  <p className="text-white/65 text-base leading-relaxed mb-5">
                    {book.fullDescription}
                  </p>

                  {/* Benefici */}
                  <div className="mb-6 space-y-2">
                    {book.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span style={{ color: book.accentColor }} className="mt-0.5 shrink-0">✦</span>
                        <span className="text-white/70">
                          <strong className="text-white/90">{benefit.title}:</strong>{' '}
                          {benefit.description}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stelle + prezzo + CTA */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} size={13} fill={book.accentColor} color={book.accentColor} />
                      ))}
                    </div>
                    <span className="font-bold text-white/90 text-xl">{book.price}</span>
                    <motion.a
                      href={`https://www.amazon.it/dp/${book.asin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm"
                      style={{
                        background: book.accentColor,
                        color: '#1A1F2E',
                        boxShadow: `0 0 24px ${book.accentColor}44`,
                      }}
                      whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${book.accentColor}66` }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <ShoppingCart size={14} />
                      Acquista su Amazon
                    </motion.a>
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
