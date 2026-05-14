import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrollLock from '../hooks/useScrollLock';

gsap.registerPlugin(ScrollTrigger);

/**
 * Gallery — versione responsive (Step 2)
 *
 * Desktop (≥ 1024px): griglia originale 3-col con TiltCard hover + spotlight.
 *
 * Mobile (< 1024px): "Filter chips + masonry" (variante V3 scelta).
 *   - chip categoria sticky in alto (Tutto / Tiko / Coniglietto / Pennello)
 *   - 2-col masonry via CSS columns con altezze variabili
 *   - spotlight semplificato, niente TiltCard (è hover-only, inutile su touch)
 */

// Schema col-span per griglia desktop a 3 colonne
const SPANS: (1 | 2)[] = [2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 2];

interface GalleryImage {
  thumb: string;
  full: string;
  alt: string;
  /** chiave di categoria derivata dal filename — usata per il filter chip */
  cat: 'tiko' | 'coni' | 'pennello';
}

const IMAGES: GalleryImage[] = [
  { thumb: '/Carosello/thumbs/03.webp',            full: '/Carosello/full/03.webp',            alt: 'Tiko lo scoiattolo scopre la magia del bosco',  cat: 'tiko' },
  { thumb: '/Carosello/thumbs/04.webp',            full: '/Carosello/full/04.webp',            alt: 'Tiko e amici animali nel bosco incantato',       cat: 'tiko' },
  { thumb: '/Carosello/thumbs/06.webp',            full: '/Carosello/full/06.webp',            alt: 'Tiko affronta le sue emozioni',                  cat: 'tiko' },
  { thumb: '/Carosello/thumbs/1.webp',             full: '/Carosello/full/1.webp',             alt: 'Copertina libro Tiko e i segreti della natura',  cat: 'tiko' },
  { thumb: '/Carosello/thumbs/10.webp',            full: '/Carosello/full/10.webp',            alt: 'Momento di calma e mindfulness con Tiko',        cat: 'tiko' },
  { thumb: '/Carosello/thumbs/12.webp',            full: '/Carosello/full/12.webp',            alt: 'Avventure di Tiko lo scoiattolo',                cat: 'tiko' },
  { thumb: '/Carosello/thumbs/16.webp',            full: '/Carosello/full/16.webp',            alt: 'Illustrazione magica del bosco con gli animali', cat: 'tiko' },
  { thumb: '/Carosello/thumbs/Coniglietto 1.webp', full: '/Carosello/full/Coniglietto 1.webp', alt: 'Coniglietto amico di Tiko',                      cat: 'coni' },
  { thumb: '/Carosello/thumbs/Coniglietto 2.webp', full: '/Carosello/full/Coniglietto 2.webp', alt: 'Coniglietto felice del bosco',                   cat: 'coni' },
  { thumb: '/Carosello/thumbs/Coniglietto 3.webp', full: '/Carosello/full/Coniglietto 3.webp', alt: 'Il tenero coniglietto insegna la gentilezza',    cat: 'coni' },
  { thumb: '/Carosello/thumbs/Pennello 1.webp',    full: '/Carosello/full/Pennello 1.webp',    alt: 'Il pennello magico colora le emozioni',          cat: 'pennello' },
  { thumb: '/Carosello/thumbs/Pennello 2.webp',    full: '/Carosello/full/Pennello 2.webp',    alt: 'Arte e creatività per bambini',                  cat: 'pennello' },
  { thumb: '/Carosello/thumbs/Pennello 3.webp',    full: '/Carosello/full/Pennello 3.webp',    alt: 'La magia dei colori nel mondo di Tiko',          cat: 'pennello' },
];

const FILTERS: { id: 'all' | GalleryImage['cat']; label: string }[] = [
  { id: 'all',      label: 'Tutto' },
  { id: 'tiko',     label: 'Tiko' },
  { id: 'coni',     label: 'Coniglietto' },
  { id: 'pennello', label: 'Pennello' },
];

// ── Hook breakpoint ───────────────────────────────────────────────────────────
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

// ── Tilt 3D card (solo desktop) ──────────────────────────────────────────────
const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 380, damping: 28 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 380, damping: 28 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY }}
      onMouseMove={e => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
const Gallery: React.FC = () => {
  const isDesktop = useIsDesktop();
  const [selected, setSelected] = useState<number | null>(null);

  useScrollLock(selected !== null);

  // Keyboard nav per lo spotlight (in entrambe le modalità)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight') setSelected(s => (s! + 1) % IMAGES.length);
      if (e.key === 'ArrowLeft')  setSelected(s => (s! - 1 + IMAGES.length) % IMAGES.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <>
      {isDesktop
        ? <GalleryDesktop onSelect={setSelected} />
        : <GalleryMobileMasonry onSelect={setSelected} />
      }

      <Spotlight
        selected={selected}
        onClose={() => setSelected(null)}
        onPrev={() => setSelected(s => (s! - 1 + IMAGES.length) % IMAGES.length)}
        onNext={() => setSelected(s => (s! + 1) % IMAGES.length)}
      />
    </>
  );
};

export default Gallery;

// ═══════════════════════════════════════════════════════════════════════════
// DESKTOP — griglia originale (intatta)
// ═══════════════════════════════════════════════════════════════════════════
const GalleryDesktop: React.FC<{ onSelect: (i: number) => void }> = ({ onSelect }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.g-item');
    if (!items?.length) return;
    const ctx = gsap.context(() => {
      gsap.from(items, {
        y: 55,
        opacity: 0,
        stagger: 0.06,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 88%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-3 gap-2 px-16 max-w-5xl mx-auto"
    >
      {IMAGES.map((img, i) => (
        <div
          key={i}
          className={`g-item ${SPANS[i] === 2 ? 'col-span-2' : ''}`}
          style={{ perspective: '1000px' }}
        >
          <motion.div
            layoutId={`gal-${i}`}
            onClick={() => onSelect(i)}
            className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-square"
            whileHover={{ scale: 1.02, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            style={{
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
            }}
          >
            <TiltCard>
              <img
                src={img.thumb}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4"
                style={{ background: 'linear-gradient(to top, rgba(26,31,46,0.7) 0%, rgba(253,186,116,0.12) 60%, transparent 100%)' }}
              >
                <div
                  className="p-2.5 rounded-xl"
                  style={{ background: 'rgba(253,186,116,0.2)', border: '1px solid rgba(253,186,116,0.4)' }}
                >
                  <ZoomIn size={16} style={{ color: '#FDE68A' }} />
                </div>
              </div>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1.5px rgba(253,186,116,0.45)' }}
              />
            </TiltCard>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE — Filter chips + masonry (variante V3 scelta)
// ═══════════════════════════════════════════════════════════════════════════
const GalleryMobileMasonry: React.FC<{ onSelect: (i: number) => void }> = ({ onSelect }) => {
  const [filter, setFilter] = useState<typeof FILTERS[number]['id']>('all');

  // Contatori per categoria (statici, derivati una volta)
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: IMAGES.length };
    FILTERS.forEach(f => {
      if (f.id === 'all') return;
      c[f.id] = IMAGES.filter(i => i.cat === f.id).length;
    });
    return c;
  }, []);

  // Mappa indice "filtrato" → indice globale (per layoutId con spotlight)
  const visible = useMemo(() => {
    return IMAGES
      .map((img, i) => ({ img, i }))
      .filter(({ img }) => filter === 'all' || img.cat === filter);
  }, [filter]);

  // Aspect ratios variabili deterministici per masonry naturale
  const ratios = useMemo(() => IMAGES.map((_, idx) => 1 + ((idx * 37) % 100) / 200), []);

  return (
    <>
      {/* Filter chips sticky */}
      <div
        className="sticky top-0 z-20 pt-2 pb-3"
        style={{
          background:
            'linear-gradient(180deg, rgba(26,31,46,0.96) 0%, rgba(26,31,46,0.65) 80%, transparent)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <div
          className="flex gap-2 overflow-x-auto px-4 no-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' }}
          role="tablist"
          aria-label="Filtra illustrazioni"
        >
          {FILTERS.map(f => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs tracking-wide cursor-pointer transition-all duration-200"
                style={{
                  background: active ? '#FACC15' : 'rgba(255,255,255,0.06)',
                  border: active ? '1px solid #FACC15' : '1px solid rgba(255,255,255,0.12)',
                  color: active ? '#1A1F2E' : 'rgba(255,255,255,0.75)',
                }}
              >
                {f.label}
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full"
                  style={{
                    background: active ? 'rgba(26,31,46,0.18)' : 'rgba(255,255,255,0.07)',
                    opacity: 0.75,
                  }}
                >
                  {counts[f.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry 2-col via CSS columns */}
      <motion.div
        layout
        className="px-3 pt-2"
        style={{ columnCount: 2, columnGap: 8 }}
      >
        <AnimatePresence>
          {visible.map(({ img, i }) => (
            <motion.div
              key={i}
              layoutId={`gal-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => onSelect(i)}
              className="relative rounded-2xl overflow-hidden cursor-pointer mb-2 group"
              style={{
                breakInside: 'avoid',
                aspectRatio: `1 / ${ratios[i].toFixed(2)}`,
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 6px 22px rgba(0,0,0,0.35)',
              }}
            >
              <img
                src={img.thumb}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
              <div
                className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-200"
                style={{ background: 'linear-gradient(to top, rgba(26,31,46,0.55) 0%, transparent 50%)' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="text-center text-white/45 text-sm py-8 px-4">
          Nessuna illustrazione in questa categoria.
        </p>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SPOTLIGHT — condiviso desktop/mobile, con swipe gestures su touch
// ═══════════════════════════════════════════════════════════════════════════
interface SpotlightProps {
  selected: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Spotlight: React.FC<SpotlightProps> = ({ selected, onClose, onPrev, onNext }) => {
  const touchStartX = useRef<number>(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? onNext() : onPrev());
  };

  return createPortal(
    <AnimatePresence>
      {selected !== null && (
        <motion.div
          key="spotlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 md:p-16"
          style={{ background: 'rgba(8, 10, 18, 0.9)', backdropFilter: 'blur(28px)' }}
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.15]"
              style={{ background: 'radial-gradient(circle, #FACC15 0%, #FB923C 60%, transparent 100%)' }}
            />
          </div>

          <motion.div
            layoutId={`gal-${selected}`}
            className="relative rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 'min(82vw, 920px)',
              maxHeight: '82vh',
              boxShadow: '0 0 100px rgba(0,0,0,0.7), 0 0 50px rgba(253,186,116,0.12)',
              border: '1px solid rgba(253,186,116,0.22)',
            }}
          >
            <img
              src={IMAGES[selected].full}
              alt={IMAGES[selected].alt}
              style={{
                maxWidth: 'min(82vw, 920px)',
                maxHeight: '82vh',
                display: 'block',
                objectFit: 'contain',
              }}
              loading="eager"
            />
          </motion.div>

          {/* Chiudi */}
          <motion.button
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ delay: 0.18 }}
            onClick={onClose}
            aria-label="Chiudi"
            className="absolute top-5 right-5 md:top-8 md:right-8 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.75)',
            }}
            whileHover={{ scale: 1.1, background: 'rgba(253,186,116,0.2)', color: '#FDE68A' }}
            whileTap={{ scale: 0.93 }}
          >
            <X size={17} />
          </motion.button>

          {/* Prev — visibile da md in su, su mobile si usa lo swipe */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ delay: 0.18 }}
            onClick={e => { e.stopPropagation(); onPrev(); }}
            aria-label="Precedente"
            className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(255,255,255,0.7)',
            }}
            whileHover={{ scale: 1.1, background: 'rgba(253,186,116,0.2)', color: '#FDE68A' }}
            whileTap={{ scale: 0.93 }}
          >
            <ChevronLeft size={20} />
          </motion.button>

          {/* Next */}
          <motion.button
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ delay: 0.18 }}
            onClick={e => { e.stopPropagation(); onNext(); }}
            aria-label="Successiva"
            className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(255,255,255,0.7)',
            }}
            whileHover={{ scale: 1.1, background: 'rgba(253,186,116,0.2)', color: '#FDE68A' }}
            whileTap={{ scale: 0.93 }}
          >
            <ChevronRight size={20} />
          </motion.button>

          {/* Contatore + hint swipe su mobile */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.22 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/35 text-xs tracking-widest font-medium uppercase whitespace-nowrap"
          >
            {selected + 1} &nbsp;/&nbsp; {IMAGES.length}
            <span className="md:hidden ml-2 opacity-70">· swipe ← →</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
