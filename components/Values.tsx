import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VALUES } from '../constants';
import { ValueItem } from '../types';
import { Rocket, Heart, Sprout, Palette, X, Sparkles, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrollLock from '../hooks/useScrollLock';

gsap.registerPlugin(ScrollTrigger);

const iconMap = { Rocket, Heart, Sprout, Palette };

// Particelle magiche fluttuanti — disabilitate su mobile / reduced-motion
// per ridurre il numero di nodi animati simultanei (era ~25 per sezione).
const MagicParticles: React.FC<{ color?: string; count?: number }> = ({ color = '#FACC15', count = 6 }) => {
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    setShouldRender(!reducedMotion && !isMobile);
  }, []);
  if (!shouldRender) return null;
  return (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: Math.random() * 5 + 3,
          height: Math.random() * 5 + 3,
          background: color,
          left: `${10 + i * (80 / count) + Math.random() * 10}%`,
          bottom: '10%',
          opacity: 0,
        }}
        animate={{
          y: [0, -(60 + Math.random() * 60)],
          opacity: [0, 0.8, 0],
          scale: [1, 0.5, 0],
        }}
        transition={{
          duration: 2.5 + Math.random() * 1.5,
          repeat: Infinity,
          delay: i * 0.4 + Math.random() * 0.5,
          ease: 'easeOut',
        }}
      />
    ))}
  </div>
  );
};

// ─── Card 1: Fantasia ─────────────────────────────────────────────────────────
const FantasiaCard: React.FC<{ value: ValueItem; onClick: () => void }> = ({ value, onClick }) => {
  const words = ['Sogna...', 'Immagina...', 'Crea...', 'Vola...'];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(p => (p + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="relative cursor-pointer group rounded-[2rem] overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(253,186,116,0.18) 0%, rgba(250,204,21,0.10) 100%)', border: '1px solid rgba(253,186,116,0.25)' }}
    >
      <MagicParticles color="#FACC15" count={7} />

      {/* Glow ambientale */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-tiko-yellow/20 rounded-full blur-3xl pointer-events-none group-hover:bg-tiko-yellow/30 transition-all duration-700" />

      <div className="relative z-10 p-7">
        {/* Icona con alone */}
        <div className="relative w-16 h-16 mb-5">
          <div className="absolute inset-0 bg-tiko-yellow/25 rounded-full blur-xl group-hover:bg-tiko-yellow/40 transition-all duration-500" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-tiko-yellow/30 to-tiko-orange/20 flex items-center justify-center border border-tiko-yellow/30">
            <Rocket size={28} className="text-tiko-yellow" />
          </div>
        </div>

        <h3 className="font-display font-bold text-white text-xl mb-2">{value.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-5">{value.description}</p>

        {/* Parola magica animata */}
        <div className="h-10 flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="font-display font-bold text-2xl text-gradient-gold"
            >
              {words[wordIdx]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer card */}
      <div className="relative z-10 px-7 pb-5">
        <span className="text-tiko-yellow/60 text-xs font-medium group-hover:text-tiko-yellow transition-colors duration-300">
          Scopri di più ✨
        </span>
      </div>
    </motion.div>
  );
};

// ─── Card 2: Dolcezza ─────────────────────────────────────────────────────────
const DolcezzaCard: React.FC<{ value: ValueItem; onClick: () => void }> = ({ value, onClick }) => {
  const quotes = [
    '"Essere gentili è un superpotere."',
    '"Con dolcezza si conquista il mondo."',
    '"Un sorriso cambia tutto."',
  ];
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(p => (p + 1) % quotes.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="relative cursor-pointer group rounded-[2rem] overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(253,186,116,0.15) 0%, rgba(251,113,133,0.10) 100%)', border: '1px solid rgba(253,186,116,0.20)' }}
    >
      <MagicParticles color="#FDBA74" count={5} />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-tiko-orange/15 rounded-full blur-3xl pointer-events-none group-hover:bg-tiko-orange/25 transition-all duration-700" />

      <div className="relative z-10 p-7">
        <div className="relative w-16 h-16 mb-5">
          <div className="absolute inset-0 bg-tiko-orange/25 rounded-full blur-xl group-hover:bg-tiko-orange/40 transition-all duration-500" />
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-tiko-orange/30 to-rose-400/20 flex items-center justify-center border border-tiko-orange/30"
          >
            <Heart size={28} className="text-tiko-orange" />
          </motion.div>
        </div>

        <h3 className="font-display font-bold text-white text-xl mb-2">{value.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-5">{value.description}</p>

        {/* Citazione animata */}
        <div className="rounded-2xl p-4 min-h-[4rem] flex items-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(253,186,116,0.15)' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIdx}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-tiko-cream/80 text-sm italic font-medium leading-snug"
            >
              {quotes[quoteIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 px-7 pb-5">
        <span className="text-tiko-orange/60 text-xs font-medium group-hover:text-tiko-orange transition-colors duration-300">
          Scopri di più ✨
        </span>
      </div>
    </motion.div>
  );
};

// ─── Card 3: Crescita Emotiva ─────────────────────────────────────────────────
const CrescitaCard: React.FC<{ value: ValueItem; onClick: () => void }> = ({ value, onClick }) => {
  const emotions = [
    { emoji: '😨', label: 'Paura', color: 'text-blue-300' },
    { emoji: '🌱', label: 'Coraggio', color: 'text-tiko-green' },
    { emoji: '💛', label: 'Fiducia', color: 'text-tiko-yellow' },
    { emoji: '✨', label: 'Gioia', color: 'text-tiko-orange' },
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep(p => (p + 1) % emotions.length), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="relative cursor-pointer group rounded-[2rem] overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(125,211,252,0.08) 100%)', border: '1px solid rgba(16,185,129,0.20)' }}
    >
      <MagicParticles color="#10B981" count={5} />
      <div className="absolute top-0 right-0 w-32 h-32 bg-tiko-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-7">
        <div className="relative w-16 h-16 mb-5">
          <div className="absolute inset-0 bg-tiko-green/20 rounded-full blur-xl group-hover:bg-tiko-green/35 transition-all duration-500" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-tiko-green/25 to-tiko-blue/15 flex items-center justify-center border border-tiko-green/25">
            <Sprout size={28} className="text-tiko-green" />
          </div>
        </div>

        <h3 className="font-display font-bold text-white text-xl mb-2">{value.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-5">{value.description}</p>

        {/* Emozioni con percorso */}
        <div className="flex items-center justify-between gap-1">
          {emotions.map((e, i) => (
            <React.Fragment key={i}>
              <motion.div
                className="flex flex-col items-center gap-1"
                animate={{ scale: i === step ? 1.25 : 1, opacity: i === step ? 1 : 0.35 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <span className="text-2xl">{e.emoji}</span>
                <span className={`text-xs font-bold font-display ${i === step ? e.color : 'text-white/35'} transition-colors duration-400`}>
                  {e.label}
                </span>
              </motion.div>
              {i < emotions.length - 1 && (
                <motion.div
                  className="flex-1 h-px"
                  animate={{ backgroundColor: i < step ? 'rgba(250,204,21,0.6)' : 'rgba(255,255,255,0.1)' }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-7 pb-5">
        <span className="text-tiko-green/60 text-xs font-medium group-hover:text-tiko-green transition-colors duration-300">
          Scopri di più ✨
        </span>
      </div>
    </motion.div>
  );
};

// ─── Card 4: Illustrazioni ────────────────────────────────────────────────────
const IllustrazioniCard: React.FC<{ value: ValueItem; onClick: () => void }> = ({ value, onClick }) => {
  const images = [
    '/img/libri/pennello/pag2.jpg',
    '/img/libri/bibi/pag6.jpg',
    '/img/libri/sassolino/07.jpg',
    '/img/libri/natale/1.jpg',
  ];
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setImgIdx(p => (p + 1) % images.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="relative cursor-pointer group rounded-[2rem] overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(125,211,252,0.12) 0%, rgba(250,204,21,0.08) 100%)', border: '1px solid rgba(125,211,252,0.18)' }}
    >
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-tiko-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-7 pb-4">
        <div className="relative w-16 h-16 mb-5">
          <div className="absolute inset-0 bg-tiko-blue/20 rounded-full blur-xl group-hover:bg-tiko-blue/35 transition-all duration-500" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-tiko-blue/25 to-tiko-yellow/15 flex items-center justify-center border border-tiko-blue/25">
            <Palette size={28} className="text-tiko-blue" />
          </div>
        </div>

        <h3 className="font-display font-bold text-white text-xl mb-1">{value.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-4">{value.description}</p>
      </div>

      {/* Slideshow illustrazioni */}
      <div className="relative mx-5 mb-5 rounded-2xl overflow-hidden flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.25)', minHeight: '120px' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIdx}
            src={images[imgIdx]}
            alt="Illustrazione interna"
            className="w-full h-auto object-contain rounded-2xl"
            style={{ maxHeight: '180px' }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        {/* Overlay con stelle decorative */}
        <div className="absolute inset-0 bg-gradient-to-t from-tiko-forest/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-2 right-2 flex gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: i === imgIdx ? '#FACC15' : 'rgba(255,255,255,0.3)' }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 px-7 pb-5">
        <span className="text-tiko-blue/60 text-xs font-medium group-hover:text-tiko-blue transition-colors duration-300">
          Scopri di più ✨
        </span>
      </div>
    </motion.div>
  );
};

// ─── Componente principale ────────────────────────────────────────────────────
const Values: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<ValueItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useScrollLock(!!selectedValue);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Titolo
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });

      // Card staggerate
      const cards = cardsRef.current?.querySelectorAll('.value-card');
      if (cards) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cardProps = (value: ValueItem) => ({
    value,
    onClick: () => setSelectedValue(value),
  });

  return (
    <section ref={sectionRef} className="container mx-auto px-4">
      <div
        className="container-radius p-8 md:p-12 relative overflow-hidden"
        style={{ background: 'rgba(26,31,46,0.55)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Glow centrale decorativo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-tiko-yellow/5 blur-3xl rounded-full pointer-events-none" />

        {/* Stelle decorative di sfondo — nascoste su mobile per ridurre rumore visivo */}
        <div className="hidden md:block">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: `${10 + i * 12}%`, top: `${5 + (i % 3) * 15}%` }}
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          >
            <Star size={i % 2 === 0 ? 8 : 5} className="text-tiko-yellow/30" fill="currentColor" />
          </motion.div>
        ))}
        </div>

        {/* Header */}
        <div ref={titleRef} className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ background: 'rgba(250,204,21,0.10)', border: '1px solid rgba(250,204,21,0.20)' }}>
            <Sparkles size={13} className="text-tiko-yellow" />
            <span className="text-tiko-yellow text-xs font-mono tracking-widest uppercase">La magia di Tiko</span>
            <Sparkles size={13} className="text-tiko-yellow" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 drop-shadow-lg">
            Perché i nostri libri conquistano<br className="hidden md:block" /> grandi e piccoli
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
        </div>

        {/* Griglia 2x2 */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
          <div className="value-card"><FantasiaCard {...cardProps(VALUES[0])} /></div>
          <div className="value-card"><DolcezzaCard {...cardProps(VALUES[1])} /></div>
          <div className="value-card"><CrescitaCard {...cardProps(VALUES[2])} /></div>
          <div className="value-card"><IllustrazioniCard {...cardProps(VALUES[3])} /></div>
        </div>
      </div>

      {/* Modal dettaglio */}
      <AnimatePresence>
        {selectedValue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-16 md:pt-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedValue(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
              className="bg-white/95 rounded-[2rem] w-[95vw] md:w-[90vw] max-w-4xl relative z-10 overflow-hidden flex flex-col md:flex-row border border-white/50 max-h-[80vh] md:max-h-[85vh]"
            >
              <button
                onClick={() => setSelectedValue(null)}
                className="absolute top-3 right-3 z-[100] bg-white/80 backdrop-blur text-gray-500 p-3 rounded-full hover:bg-gray-100 hover:text-red-500 transition-all shadow-lg border border-gray-100 cursor-pointer"
                aria-label="Chiudi"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 h-48 md:h-auto relative shrink-0">
                <img src={selectedValue.image} alt={selectedValue.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                  <h3 className="text-white font-display font-bold text-2xl drop-shadow-md">{selectedValue.title}</h3>
                </div>
              </div>

              <div className="w-full md:w-1/2 overflow-y-auto p-6 md:p-10">
                <div className="hidden md:flex items-center gap-3 mb-6 text-tiko-orange pt-2">
                  <div className="p-2 bg-gradient-to-br from-orange-100 to-yellow-50 rounded-xl shadow-inner">
                    {React.createElement(iconMap[selectedValue.iconName as keyof typeof iconMap], { size: 24 })}
                  </div>
                  <h3 className="font-display font-bold text-3xl text-tiko-dark">{selectedValue.title}</h3>
                </div>
                <div className="space-y-5 text-left">
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg font-medium">{selectedValue.description}</p>
                  <hr className="border-gray-100" />
                  <div className="bg-yellow-50/50 p-4 rounded-2xl border border-yellow-100">
                    <h4 className="flex items-center gap-2 font-bold text-tiko-dark mb-3 uppercase tracking-wider text-sm">
                      <Sparkles size={15} className="text-tiko-yellow" />
                      Il beneficio per il bambino
                    </h4>
                    <p className="text-gray-600 leading-relaxed italic text-sm md:text-base">{selectedValue.fullDescription}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Values;
