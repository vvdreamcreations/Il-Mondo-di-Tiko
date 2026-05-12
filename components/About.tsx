import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Spezza una stringa in span per parola — necessario per il reveal GSAP
const SplitWords: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <>
    {text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
        <span className={`inline-block word-span ${className ?? ''}`}>{word}</span>
      </span>
    ))}
  </>
);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const neutralRef = useRef<HTMLParagraphElement>(null);
  const dramaticRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Riga neutra — parola per parola
      if (neutralRef.current) {
        const words = neutralRef.current.querySelectorAll('.word-span');
        gsap.from(words, {
          y: '110%',
          opacity: 0,
          duration: 0.65,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: neutralRef.current,
            start: 'top 82%',
          },
        });
      }

      // Riga drammatica — parola per parola con ritardo
      if (dramaticRef.current) {
        const words = dramaticRef.current.querySelectorAll('.word-span');
        gsap.from(words, {
          y: '110%',
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: dramaticRef.current,
            start: 'top 80%',
          },
        });
      }

      // Testo corpo — fade up
      if (bodyRef.current) {
        gsap.from(bodyRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 82%',
          },
        });
      }

      // Immagine lato destro
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          x: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="container mx-auto px-4">
      <div
        className="container-radius overflow-hidden relative"
        style={{ background: '#1A1F2E', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Texture noise visibile su sfondo scuro */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
          }}
        />

        {/* Glow decorativo */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-tiko-yellow/4 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-tiko-orange/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Stelle decorative */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ right: `${5 + i * 8}%`, top: `${8 + (i % 3) * 12}%` }}
            animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.4, 1] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          >
            <Star size={i % 2 === 0 ? 7 : 4} className="text-tiko-yellow/40" fill="currentColor" />
          </motion.div>
        ))}

        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 p-8 md:p-14 lg:p-20">

          {/* ── Colonna sinistra: Manifesto ── */}
          <div className="flex-1 flex flex-col justify-center">

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 self-start"
            >
              <div className="w-8 h-px bg-tiko-yellow/60" />
              <span className="text-tiko-yellow font-mono text-xs tracking-[0.2em] uppercase">
                La nostra filosofia
              </span>
            </motion.div>

            {/* Riga neutra */}
            <p
              ref={neutralRef}
              className="text-white/45 text-lg md:text-xl font-medium leading-relaxed mb-5"
            >
              <SplitWords text="La maggior parte dei libri per bambini racconta storie." />
            </p>

            {/* Riga drammatica */}
            <h2
              ref={dramaticRef}
              className="font-display font-bold italic leading-tight mb-10"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            >
              <SplitWords text="Noi" className="text-white" />
              <SplitWords text="insegniamo" className="text-white" />
              <SplitWords text="emozioni." className="text-gradient-gold" />
            </h2>

            {/* Testo corpo */}
            <div ref={bodyRef} className="space-y-5">
              <p className="text-white/65 text-base md:text-lg leading-relaxed font-medium">
                VV Dream Creations è un progetto editoriale nato dal desiderio di dare voce alle emozioni
                e alla fantasia dei bambini. Crediamo che le storie siano semi di crescita e di luce,
                capaci di educare senza moralizzare e di ispirare senza imporre.
              </p>
              <p className="text-white/65 text-base md:text-lg leading-relaxed font-medium">
                Le nostre pubblicazioni uniscono valore educativo e incanto narrativo: un linguaggio
                semplice e autentico, illustrato con cura e poesia.
              </p>

              {/* Box missione */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderLeft: '3px solid rgba(253,186,116,0.6)',
                }}
              >
                <p className="text-tiko-cream/85 font-semibold text-base leading-relaxed">
                  La nostra missione? Creare mondi narrativi che lasciano spazio all'immaginazione
                  e al cuore, avvicinando bambini e adulti in un dialogo fatto di ascolto, empatia
                  e meraviglia.
                </p>
              </div>

              {/* Chi Siamo label */}
              <div className="pt-2">
                <span className="text-tiko-orange font-bold uppercase tracking-widest text-xs">
                  Chi Siamo
                </span>
              </div>
            </div>
          </div>

          {/* ── Colonna destra: Mascotte ── */}
          <div ref={imageRef} className="flex flex-col items-center gap-6 lg:w-[42%] shrink-0">

            {/* Quote banner */}
            <motion.div
              initial={{ opacity: 0, rotate: -1 }}
              whileInView={{ opacity: 1, rotate: 1.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-tiko-cream p-5 rounded-2xl max-w-xs border border-tiko-orange/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
              <p className="text-tiko-dark font-bold text-base italic text-center leading-snug">
                "Ogni storia è un piccolo seme di meraviglia."
              </p>
            </motion.div>

            {/* Mascotte con glow */}
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-tiko-yellow/20 blur-3xl rounded-full scale-75 pointer-events-none" />
              <img
                src="/tiko-mascot.webp"
                srcSet="/tiko-mascot-mobile.webp 550w, /tiko-mascot.webp 600w"
                sizes="(max-width: 768px) 550px, 600px"
                alt="Tiko lo Scoiattolo"
                width="600"
                height="600"
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>

            {/* Logo VV Dream Creations */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <img
                src="/vv-dream-creations-logo.webp"
                alt="VV Dream Creations"
                width="300"
                height="100"
                className="h-16 md:h-20 w-auto object-contain opacity-90"
                loading="lazy"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
