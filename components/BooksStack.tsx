import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, BookOpen, Info } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BOOKS } from '../constants';
import { Book } from '../types';
import BookModal from './BookModal';

gsap.registerPlugin(ScrollTrigger);

const BooksStack: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const total = cards.length;
    let rafId = 0;

    // Stato iniziale: tutte le carte dopo la prima sotto lo schermo
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

    // Titolo fade-in
    gsap.from(titleRef.current, {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 85%' },
    });

    // Un solo ScrollTrigger che gestisce tutto
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${(total - 1) * window.innerHeight}`,
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
              // Scala inizia subito ma lentamente; blur/opacità solo nell'ultimo 45%
              const scale = 1 - 0.1 * cardProgress;
              const fadeStart = 0.55;
              const fadeProgress = cardProgress > fadeStart
                ? (cardProgress - fadeStart) / (1 - fadeStart)
                : 0;
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
      style={{ height: `${BOOKS.length * 100}vh` }}
    >
      {/* Contenitore sticky */}
      <div
        ref={stickyRef}
        className="sticky top-0 overflow-hidden"
        style={{ height: '100dvh' }}
      >
        {/* Header sezione — sopra lo stack */}
        <div
          ref={titleRef}
          className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 pt-24 pb-4 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(26,31,46,0.9) 0%, transparent 100%)' }}
        >
          <div>
            <p className="text-tiko-yellow font-mono text-xs tracking-widest uppercase mb-1">
              Le Avventure di Tiko
            </p>
            <h2 className="font-display font-bold text-white text-2xl md:text-3xl drop-shadow-lg">
              5 storie, 5 emozioni
            </h2>
          </div>

          {/* Indicatore libro attivo */}
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

        {/* Stack carte */}
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
            {/* Sfondo gradiente tematico del libro — si dissolve in alto per blend con carta precedente */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: book.gradient,
                opacity: 0.6,
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)',
              }}
            />

            {/* Glow accentato */}
            <div
              className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-30"
              style={{ background: book.accentColor }}
            />

            {/* Numero decorativo grande */}
            <div
              className="absolute bottom-8 right-6 md:right-12 font-display font-bold select-none pointer-events-none"
              style={{
                fontSize: 'clamp(6rem, 18vw, 14rem)',
                color: 'rgba(255,255,255,0.04)',
                lineHeight: 1,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Contenuto principale */}
            <div className="relative z-10 h-full flex flex-col lg:flex-row items-center gap-8 px-6 md:px-12 lg:px-16 pt-32 pb-12 max-w-7xl mx-auto">

              {/* ── Sinistra: copertina + info ── */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 flex-1 min-w-0">

                {/* Copertina */}
                <div className="relative shrink-0">
                  <div
                    className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 pointer-events-none"
                    style={{ background: book.accentColor }}
                  />
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="relative z-10 rounded-2xl shadow-2xl object-cover"
                    style={{ width: 'clamp(130px, 16vw, 200px)', aspectRatio: '3/4' }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>

                {/* Testo */}
                <div className="flex flex-col justify-center max-w-md">
                  {/* Badge età */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 self-start"
                    style={{
                      background: `${book.accentColor}22`,
                      border: `1px solid ${book.accentColor}44`,
                      color: book.accentColor,
                    }}
                  >
                    <BookOpen size={11} />
                    {book.age}
                  </div>

                  <h3
                    className="font-display font-bold text-white leading-tight mb-3"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
                  >
                    {book.title}
                  </h3>

                  <p className="text-white/65 text-base leading-relaxed mb-5">
                    {book.shortDescription}
                  </p>

                  {/* Benefici */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {book.benefits.map((b, bi) => (
                      <span
                        key={bi}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          color: 'rgba(255,255,255,0.75)',
                        }}
                      >
                        {b.title}
                      </span>
                    ))}
                  </div>

                  {/* Stelle + prezzo */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} size={14} fill={book.accentColor} color={book.accentColor} />
                      ))}
                    </div>
                    <span className="text-white/40 text-sm">·</span>
                    <span className="font-bold text-white/90">{book.price}</span>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3">
                    <motion.a
                      href={`https://www.amazon.it/dp/${book.asin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
                      style={{
                        background: book.accentColor,
                        color: '#1A1F2E',
                        boxShadow: `0 0 30px ${book.accentColor}44`,
                      }}
                      whileHover={{ scale: 1.05, boxShadow: `0 0 50px ${book.accentColor}66` }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <ShoppingCart size={15} />
                      Acquista su Amazon
                    </motion.a>

                    <motion.button
                      onClick={() => openModal(book)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: `1px solid ${book.accentColor}55`,
                        color: book.accentColor,
                      }}
                      whileHover={{ scale: 1.05, background: `${book.accentColor}18` }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <Info size={15} />
                      Dettagli & Benefici
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* ── Destra: griglia illustrazioni ── */}
              <div className="hidden lg:grid grid-cols-2 gap-3 shrink-0" style={{ width: '38%' }}>
                {book.internalImages.map((img, ii) => (
                  <motion.div
                    key={ii}
                    className="relative rounded-2xl overflow-hidden aspect-square"
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <img
                      src={img}
                      alt={`Illustrazione ${ii + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `${book.accentColor}22` }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Mobile: una sola immagine interna */}
              <div className="lg:hidden w-full max-w-xs rounded-2xl overflow-hidden aspect-video">
                <img
                  src={book.internalImages[0]}
                  alt="Illustrazione"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <BookModal book={selectedBook} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default BooksStack;
