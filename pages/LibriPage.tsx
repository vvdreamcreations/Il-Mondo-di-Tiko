import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, BookOpen, Star } from 'lucide-react';
import { BOOKS } from '../constants';
import Footer from '../components/Footer';

/**
 * LibriPage — versione responsive (Step 2)
 *
 * Desktop (≥ 1024px): layout originale invariato (lista verticale di card grandi
 *   con cover + descrizione full + benefit dettagliati + CTA inline).
 *
 * Mobile (< 1024px): "Picker" stile pagina Home — un solo libro per volta
 *   in hero card, switch via rail di 5 copertine sticky in alto.
 *   La pagina /libri passa da ~7-8 viewport a ~1.5 viewport.
 */

// Hook condiviso col BooksStack (Step 1)
const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 1024px)').matches;
  });
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
};

const LibriPage: React.FC = () => {
  const isDesktop = useIsDesktop();

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-24">
      <Helmet>
        <title>I Libri di Tiko | Storie di amicizia, emozioni e magia</title>
        <meta
          name="description"
          content="Esplora la collana di libri di Tiko: il Pennello Magico, il Sassolino della Calma e altri. Favole educative per la crescita dei tuoi bambini."
        />
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

      {isDesktop ? <LibriDesktop /> : <LibriMobilePicker />}

      <Footer />
    </div>
  );
};

export default LibriPage;

// ═══════════════════════════════════════════════════════════════════════════
// DESKTOP — layout originale (identico a prima)
// ═══════════════════════════════════════════════════════════════════════════
const LibriDesktop: React.FC = () => (
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
          <div
            className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none opacity-20"
            style={{ background: book.accentColor }}
          />
          <div className="relative z-10 flex flex-row gap-8 p-10 items-start">
            <div className="flex-shrink-0 w-44">
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
            <div className="flex-1 min-w-0">
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
              <h2 className="font-display font-bold text-white text-3xl mb-3 leading-tight">
                {book.title}
              </h2>
              <p className="text-white/65 text-base leading-relaxed mb-5">
                {book.fullDescription}
              </p>
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
);

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE — Picker stile Home (variante V3 scelta)
// ═══════════════════════════════════════════════════════════════════════════
const LibriMobilePicker: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const book = BOOKS[idx];

  // Centra la cover attiva nella rail al cambio
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const active = rail.children[idx] as HTMLElement | undefined;
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [idx]);

  return (
    <div className="pt-24 pb-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 px-4"
      >
        <p className="text-tiko-yellow font-mono text-xs tracking-widest uppercase mb-2">
          La Collana
        </p>
        <h1 className="font-display font-bold text-white text-4xl mb-2 drop-shadow-lg leading-[1.05]">
          I Libri di Tiko
        </h1>
        <p className="text-white/55 text-sm max-w-md mx-auto leading-relaxed">
          Cinque avventure, cinque emozioni.<br />Ogni storia un seme di crescita.
        </p>
      </motion.div>

      {/* Rail copertine sticky */}
      <div
        className="sticky top-0 z-20 pt-3 pb-3"
        style={{
          background:
            'linear-gradient(180deg, rgba(26,31,46,0.96) 0%, rgba(26,31,46,0.7) 80%, transparent)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div
          ref={railRef}
          className="flex gap-2.5 overflow-x-auto px-4 no-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {BOOKS.map((bk, i) => {
            const active = i === idx;
            return (
              <button
                key={bk.id}
                onClick={() => setIdx(i)}
                aria-label={`Mostra ${bk.title}`}
                aria-pressed={active}
                className="shrink-0 rounded-xl overflow-hidden p-0 transition-all duration-300"
                style={{
                  width: 60,
                  aspectRatio: '3/4',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: active ? `2.5px solid ${bk.accentColor}` : '2.5px solid transparent',
                  opacity: active ? 1 : 0.5,
                  transform: active ? 'scale(1.08)' : 'scale(1)',
                  boxShadow: active ? `0 4px 18px ${bk.accentColor}66` : 'none',
                }}
              >
                <img
                  src={bk.coverImage}
                  alt={bk.title}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero card del libro attivo */}
      <div className="px-4 mt-1">
        <AnimatePresence mode="wait">
          <motion.article
            key={book.id}
            id={book.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: `linear-gradient(180deg, ${book.accentColor}30 0%, rgba(26,31,46,0.95) 60%)`,
              border: `1px solid ${book.accentColor}55`,
            }}
          >
            {/* glow accento */}
            <div
              className="absolute -top-10 -right-10 w-52 h-52 rounded-full pointer-events-none"
              style={{
                background: book.accentColor,
                opacity: 0.3,
                filter: 'blur(60px)',
              }}
            />

            {/* cover */}
            <div className="flex justify-center pt-7 pb-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                className="rounded-2xl overflow-hidden"
                style={{
                  width: 160,
                  aspectRatio: '3/4',
                  boxShadow: `0 24px 48px rgba(0,0,0,0.55), 0 0 60px ${book.accentColor}55`,
                }}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              </motion.div>
            </div>

            {/* contenuto */}
            <div className="px-6 pb-6">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2.5"
                style={{
                  background: `${book.accentColor}22`,
                  border: `1px solid ${book.accentColor}55`,
                  color: book.accentColor,
                }}
              >
                <BookOpen size={11} />
                {book.age}
              </div>

              <h2 className="font-display font-bold text-white text-2xl leading-tight mb-2.5">
                {book.title}
              </h2>

              <p className="text-white/75 text-sm leading-relaxed mb-4">
                {book.fullDescription}
              </p>

              {/* Cosa insegna */}
              <div
                className="rounded-2xl p-4 mb-4"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className="font-bold text-[10px] uppercase tracking-[0.15em] text-white/55 mb-2">
                  Cosa insegna
                </p>
                <div className="space-y-2">
                  {book.benefits.map((b, bi) => (
                    <div key={bi} className="flex items-start gap-2 text-[13px] leading-snug">
                      <span style={{ color: book.accentColor }} className="mt-0.5 shrink-0">✦</span>
                      <span className="text-white/80">
                        <strong className="text-white/95">{b.title}:</strong> {b.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* rating + price */}
              <div className="flex items-center gap-2 mb-3.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} size={13} fill={book.accentColor} color={book.accentColor} />
                  ))}
                </div>
                <span className="text-white/35 text-xs">·</span>
                <span className="font-bold text-white/95 text-base">{book.price}</span>
              </div>

              {/* CTA full-width */}
              <motion.a
                href={`https://www.amazon.it/dp/${book.asin}`}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm w-full"
                style={{
                  background: book.accentColor,
                  color: '#1A1F2E',
                  boxShadow: `0 0 28px ${book.accentColor}55`,
                }}
              >
                <ShoppingCart size={15} />
                Acquista su Amazon
              </motion.a>
            </div>
          </motion.article>
        </AnimatePresence>

        <p className="text-center text-white/40 text-[10px] tracking-[0.15em] uppercase font-medium mt-4">
          ↑ Tocca una copertina per cambiare libro
        </p>
      </div>
    </div>
  );
};
