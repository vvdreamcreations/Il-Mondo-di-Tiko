import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, BookOpen, Info } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BOOKS } from '../constants';
import { Book } from '../types';
import BookModal from './BookModal';

gsap.registerPlugin(ScrollTrigger);

/**
 * BooksStack — versione responsive
 *
 * Desktop (≥ 1024px) → stack pinnato originale (resta com'era prima)
 * Mobile  (< 1024px) → "Hero + Thumbnail picker" (variante V3 scelta)
 *
 * Su mobile cambia tutto: niente pin, niente scroll-jack di 5 viewport.
 * Una sola card grande in evidenza con prezzo + CTA, e una rail di copertine
 * sotto: tap → cambio libro animato. Totale 1.2 viewport invece di 5.
 *
 * IMPORTANTE: lo switch è basato su un media query stabile (matchMedia)
 * letto al primo render. Cambiare orientation/dimensione richiede refresh,
 * ma evita doppio mount di ScrollTrigger e flickering.
 */

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

const BooksStack: React.FC = () => {
  const isDesktop = useIsDesktop();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300);
  };

  return (
    <>
      {isDesktop ? (
        <BooksDesktopStack onOpenDetails={openModal} />
      ) : (
        <BooksMobilePicker onOpenDetails={openModal} />
      )}
      <BookModal book={selectedBook} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default BooksStack;

// ═══════════════════════════════════════════════════════════════════════════
// DESKTOP — stack pinnato (≈ versione originale, leggermente ripulita)
// ═══════════════════════════════════════════════════════════════════════════
const BooksDesktopStack: React.FC<{ onOpenDetails: (b: Book) => void }> = ({ onOpenDetails }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const total = cards.length;
    let rafId = 0;

    // Stato iniziale
    cards.forEach((card, i) => {
      if (i === 0) {
        card.style.transform = 'translateY(0%) scale(1)';
        card.style.filter = 'none';
        card.style.opacity = '1';
      } else {
        card.style.transform = 'translateY(100%) scale(1)';
        card.style.filter = 'none';
        card.style.opacity = '1';
      }
    });

    gsap.from(titleRef.current, {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 85%' },
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${(total - 1) * window.innerHeight * 0.5}`,
      pin: sticky,
      anticipatePin: 1,
      pinSpacing: true,
      invalidateOnRefresh: true,
      refreshPriority: -1,
      onUpdate: (self) => {
        const progress = self.progress;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rawIndex = progress * (total - 1);
          const currentIdx = Math.min(Math.floor(rawIndex), total - 2);
          const cardProgress = rawIndex - currentIdx;
          setActiveIndex(Math.round(rawIndex));

          cards.forEach((card, i) => {
            if (i < currentIdx) {
              card.style.transform = 'translateY(0%) scale(0.88)';
              card.style.filter = 'blur(10px)';
              card.style.opacity = '0.25';
            } else if (i === currentIdx) {
              const scale = 1 - 0.1 * cardProgress;
              const fadeStart = 0.55;
              const fadeProgress = cardProgress > fadeStart
                ? (cardProgress - fadeStart) / (1 - fadeStart) : 0;
              const blur = 8 * fadeProgress;
              const opacity = 1 - 0.72 * fadeProgress;
              card.style.transform = `translateY(0%) scale(${scale})`;
              card.style.filter = blur > 0.1 ? `blur(${blur}px)` : 'none';
              card.style.opacity = String(opacity);
            } else if (i === currentIdx + 1) {
              const y = (1 - cardProgress) * 100;
              card.style.transform = `translateY(${y}%) scale(1)`;
              card.style.filter = 'none';
              card.style.opacity = '1';
            } else {
              card.style.transform = 'translateY(100%) scale(1)';
              card.style.filter = 'none';
              card.style.opacity = '1';
            }
          });
        });
      },
    });

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll()
        .filter(t => t.vars.trigger === section || t.vars.trigger === titleRef.current)
        .forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="books" className="relative" ref={sectionRef}
      style={{ height: `${BOOKS.length * 50}vh` }}
    >
      <div ref={stickyRef} className="sticky top-0 overflow-hidden" style={{ height: '100dvh' }}>
        <div
          ref={titleRef}
          className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 pt-24 pb-4 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(26,31,46,0.9) 0%, transparent 100%)' }}
        >
          <div>
            <p className="text-tiko-yellow font-mono text-xs tracking-widest uppercase mb-1">Le Avventure di Tiko</p>
            <h2 className="font-display font-bold text-white text-2xl md:text-3xl drop-shadow-lg">5 storie, 5 emozioni</h2>
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            {BOOKS.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === activeIndex ? 28 : 8,
                  opacity: i === activeIndex ? 1 : 0.3,
                  backgroundColor: i === activeIndex ? BOOKS[i].accentColor : '#fff',
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
        </div>

        {BOOKS.map((book, i) => (
          <div
            key={book.id}
            ref={el => { cardRefs.current[i] = el; }}
            className="book-card absolute inset-0"
            style={{
              zIndex: i,
              willChange: 'transform, filter, opacity',
              background: 'linear-gradient(to bottom, transparent 0%, #1A1F2E 22%, #1A1F2E 100%)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: book.gradient, opacity: 0.6,
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)',
              }}
            />
            <div
              className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-30"
              style={{ background: book.accentColor }}
            />
            <div
              className="absolute bottom-8 right-12 font-display font-bold select-none pointer-events-none"
              style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>

            <div className="relative z-10 h-full flex flex-row items-center gap-8 px-12 lg:px-16 pt-32 pb-12 max-w-7xl mx-auto">
              <div className="flex flex-row items-start gap-8 flex-1 min-w-0">
                <div className="relative shrink-0">
                  <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 pointer-events-none" style={{ background: book.accentColor }} />
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="relative z-10 rounded-2xl shadow-2xl object-cover"
                    style={{ width: 'clamp(130px, 16vw, 200px)', aspectRatio: '3/4' }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="flex flex-col justify-center max-w-md">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 self-start"
                    style={{ background: `${book.accentColor}22`, border: `1px solid ${book.accentColor}44`, color: book.accentColor }}
                  >
                    <BookOpen size={11} />{book.age}
                  </div>
                  <h3 className="font-display font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
                    {book.title}
                  </h3>
                  <p className="text-white/65 text-base leading-relaxed mb-5">{book.shortDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {book.benefits.map((b, bi) => (
                      <span key={bi} className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)' }}
                      >{b.title}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} size={14} fill={book.accentColor} color={book.accentColor} />
                      ))}
                    </div>
                    <span className="text-white/40 text-sm">·</span>
                    <span className="font-bold text-white/90">{book.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <motion.a
                      href={`https://www.amazon.it/dp/${book.asin}`}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
                      style={{ background: book.accentColor, color: '#1A1F2E', boxShadow: `0 0 30px ${book.accentColor}44` }}
                      whileHover={{ scale: 1.05, boxShadow: `0 0 50px ${book.accentColor}66` }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <ShoppingCart size={15} />Acquista su Amazon
                    </motion.a>
                    <motion.button
                      onClick={() => onOpenDetails(book)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm"
                      style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${book.accentColor}55`, color: book.accentColor }}
                      whileHover={{ scale: 1.05, background: `${book.accentColor}18` }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <Info size={15} />Dettagli & Benefici
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* griglia illustrazioni desktop */}
              <div className="grid grid-cols-2 gap-3 shrink-0" style={{ width: '38%' }}>
                {book.internalImages.map((img, ii) => (
                  <motion.div
                    key={ii}
                    className="relative rounded-2xl overflow-hidden aspect-square"
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <img src={img} alt={`Illustrazione ${ii + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `${book.accentColor}22` }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE — Hero card + thumbnail picker (variante V3 scelta)
// ═══════════════════════════════════════════════════════════════════════════
const BooksMobilePicker: React.FC<{ onOpenDetails: (b: Book) => void }> = ({ onOpenDetails }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const b = BOOKS[activeIdx];

  // Riporta la copertina attiva al centro della rail
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const active = rail.children[activeIdx] as HTMLElement | undefined;
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeIdx]);

  return (
    <section id="books" className="relative py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-tiko-yellow font-mono text-xs tracking-widest uppercase mb-2">
            Le Avventure di Tiko
          </p>
          <h2 className="font-display font-bold text-white text-3xl mb-2 drop-shadow-lg">
            5 storie, 5 emozioni
          </h2>
          <p className="text-white/55 text-sm">{activeIdx + 1} di {BOOKS.length}</p>
        </div>

        {/* Hero card */}
        <motion.article
          key={b.id}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden mb-5"
          style={{
            background: `linear-gradient(180deg, ${b.accentColor}26 0%, rgba(26,31,46,0.95) 70%)`,
            border: `1px solid ${b.accentColor}44`,
            transition: 'border-color 0.5s ease, background 0.5s ease',
          }}
        >
          {/* glow */}
          <div
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl pointer-events-none"
            style={{ background: b.accentColor, opacity: 0.3, transition: 'background 0.5s ease' }}
          />

          {/* cover */}
          <div className="flex justify-center pt-8 pb-6 relative">
            <motion.div
              key={`cover-${b.id}`}
              initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              className="w-40 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                aspectRatio: '3/4',
                boxShadow: `0 24px 48px rgba(0,0,0,0.5), 0 0 60px ${b.accentColor}55`,
              }}
            >
              <img
                src={b.coverImage}
                alt={b.title}
                className="w-full h-full object-cover"
                loading={activeIdx === 0 ? 'eager' : 'lazy'}
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </motion.div>
          </div>

          {/* Contenuto */}
          <div className="px-6 pb-6">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
              style={{
                background: `${b.accentColor}22`,
                border: `1px solid ${b.accentColor}55`,
                color: b.accentColor,
                transition: 'all 0.4s',
              }}
            >
              <BookOpen size={11} />{b.age}
            </div>
            <h3 className="font-display font-bold text-white text-2xl leading-tight mb-2">
              {b.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              {b.shortDescription}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {b.benefits.map((bn, bi) => (
                <span key={bi}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)' }}
                >{bn.title}</span>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} size={13} fill={b.accentColor} color={b.accentColor} />
                ))}
              </div>
              <span className="text-white/40 text-xs">·</span>
              <span className="font-bold text-white/90 text-base">{b.price}</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <motion.a
                href={`https://www.amazon.it/dp/${b.asin}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm w-full"
                style={{ background: b.accentColor, color: '#1A1F2E', boxShadow: `0 0 28px ${b.accentColor}55`, transition: 'background 0.4s' }}
                whileTap={{ scale: 0.97 }}
              >
                <ShoppingCart size={15} />Acquista su Amazon
              </motion.a>
              <button
                onClick={() => onOpenDetails(b)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm w-full"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: `1px solid ${b.accentColor}55`,
                  color: b.accentColor,
                  transition: 'all 0.4s',
                }}
              >
                <Info size={15} />Dettagli & Benefici
              </button>
            </div>
          </div>
        </motion.article>

        {/* Thumbnail rail */}
        <p className="text-center text-white/45 text-[11px] tracking-[0.15em] uppercase font-medium mb-3">
          ↓ Tocca per cambiare libro
        </p>
        <div
          ref={railRef}
          className="flex gap-3 overflow-x-auto pb-2 px-1 no-scrollbar snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {BOOKS.map((bk, i) => (
            <button
              key={bk.id}
              onClick={() => setActiveIdx(i)}
              aria-label={`Mostra ${bk.title}`}
              aria-pressed={i === activeIdx}
              className="shrink-0 snap-center rounded-xl overflow-hidden transition-all duration-300"
              style={{
                width: 68,
                aspectRatio: '3/4',
                padding: 0,
                cursor: 'pointer',
                border: i === activeIdx ? `2.5px solid ${bk.accentColor}` : '2.5px solid transparent',
                background: 'transparent',
                opacity: i === activeIdx ? 1 : 0.55,
                transform: i === activeIdx ? 'scale(1.06)' : 'scale(1)',
                boxShadow: i === activeIdx ? `0 4px 20px ${bk.accentColor}66` : 'none',
              }}
            >
              <img
                src={bk.coverImage}
                alt={bk.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
