import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrollLock from '../hooks/useScrollLock';

gsap.registerPlugin(ScrollTrigger);

// Schema col-span per griglia desktop a 3 colonne.
// Ogni riga somma esattamente 3: [2+1] [1+2] [1+1+1] [2+1] [1+2] [1+2] = 13 immagini
const SPANS: (1 | 2)[] = [2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 2];

const IMAGES = [
  { thumb: '/Carosello/thumbs/03.webp',           full: '/Carosello/full/03.webp',           alt: 'Tiko lo scoiattolo scopre la magia del bosco' },
  { thumb: '/Carosello/thumbs/04.webp',           full: '/Carosello/full/04.webp',           alt: 'Tiko e amici animali nel bosco incantato' },
  { thumb: '/Carosello/thumbs/06.webp',           full: '/Carosello/full/06.webp',           alt: 'Tiko affronta le sue emozioni' },
  { thumb: '/Carosello/thumbs/1.webp',            full: '/Carosello/full/1.webp',            alt: 'Copertina libro Tiko e i segreti della natura' },
  { thumb: '/Carosello/thumbs/10.webp',           full: '/Carosello/full/10.webp',           alt: 'Momento di calma e mindfulness con Tiko' },
  { thumb: '/Carosello/thumbs/12.webp',           full: '/Carosello/full/12.webp',           alt: 'Avventure di Tiko lo scoiattolo' },
  { thumb: '/Carosello/thumbs/16.webp',           full: '/Carosello/full/16.webp',           alt: 'Illustrazione magica del bosco con gli animali' },
  { thumb: '/Carosello/thumbs/Coniglietto 1.webp', full: '/Carosello/full/Coniglietto 1.webp', alt: 'Coniglietto amico di Tiko' },
  { thumb: '/Carosello/thumbs/Coniglietto 2.webp', full: '/Carosello/full/Coniglietto 2.webp', alt: 'Coniglietto felice del bosco' },
  { thumb: '/Carosello/thumbs/Coniglietto 3.webp', full: '/Carosello/full/Coniglietto 3.webp', alt: 'Il tenero coniglietto insegna la gentilezza' },
  { thumb: '/Carosello/thumbs/Pennello 1.webp',   full: '/Carosello/full/Pennello 1.webp',   alt: 'Il pennello magico colora le emozioni' },
  { thumb: '/Carosello/thumbs/Pennello 2.webp',   full: '/Carosello/full/Pennello 2.webp',   alt: 'Arte e creatività per bambini' },
  { thumb: '/Carosello/thumbs/Pennello 3.webp',   full: '/Carosello/full/Pennello 3.webp',   alt: 'La magia dei colori nel mondo di Tiko' },
];

// ── Tilt 3D card ──────────────────────────────────────────────────────────────
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

// ── Gallery ───────────────────────────────────────────────────────────────────
const Gallery: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollLock(selected !== null);

  // GSAP stagger entrance
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

  // Keyboard navigation
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
      {/* ── Grid ── */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 lg:grid-cols-3 gap-2 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto"
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className={`g-item ${SPANS[i] === 2 ? 'lg:col-span-2' : ''}`}
            style={{ perspective: '1000px' }}
          >
            <motion.div
              layoutId={`gal-${i}`}
              onClick={() => setSelected(i)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-square"
              whileHover={{ scale: 1.02, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
              }}
            >
              <TiltCard>
                {/* Immagine */}
                <img
                  src={img.thumb}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable={false}
                />

                {/* Hover overlay */}
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

                {/* Border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1.5px rgba(253,186,116,0.45)' }}
                />
              </TiltCard>
            </motion.div>
          </div>
        ))}
      </div>

      {/* ── Cinematic spotlight ── */}
      {createPortal(
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
              onClick={() => setSelected(null)}
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.15]"
                  style={{ background: 'radial-gradient(circle, #FACC15 0%, #FB923C 60%, transparent 100%)' }}
                />
              </div>

              {/* Immagine — vola dalla griglia allo spotlight grazie a layoutId */}
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
                  style={{ maxWidth: 'min(82vw, 920px)', maxHeight: '82vh', display: 'block', objectFit: 'contain' }}
                  loading="eager"
                />
              </motion.div>

              {/* Chiudi */}
              <motion.button
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ delay: 0.18 }}
                onClick={() => setSelected(null)}
                aria-label="Chiudi"
                className="absolute top-5 right-5 md:top-8 md:right-8 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}
                whileHover={{ scale: 1.1, background: 'rgba(253,186,116,0.2)', color: '#FDE68A' }}
                whileTap={{ scale: 0.93 }}
              >
                <X size={17} />
              </motion.button>

              {/* Prev */}
              <motion.button
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ delay: 0.18 }}
                onClick={e => { e.stopPropagation(); setSelected(s => (s! - 1 + IMAGES.length) % IMAGES.length); }}
                aria-label="Precedente"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.7)' }}
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
                onClick={e => { e.stopPropagation(); setSelected(s => (s! + 1) % IMAGES.length); }}
                aria-label="Successiva"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.7)' }}
                whileHover={{ scale: 1.1, background: 'rgba(253,186,116,0.2)', color: '#FDE68A' }}
                whileTap={{ scale: 0.93 }}
              >
                <ChevronRight size={20} />
              </motion.button>

              {/* Contatore */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.22 }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/35 text-xs tracking-widest font-medium uppercase"
              >
                {selected + 1} &nbsp;/&nbsp; {IMAGES.length}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Gallery;
