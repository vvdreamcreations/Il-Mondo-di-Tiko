import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

/**
 * Hero — versione mobile-friendly
 *
 * Cosa cambia rispetto alla versione precedente:
 *  - min-h-screen → min-h-[100dvh]  (evita gli "scatti" della barra Safari iOS)
 *  - Titolo "prendono vita" ridimensionato per non andare in overflow sotto i 380px
 *  - Logo più compatto su mobile (w-32 invece di w-40)
 *  - Aggiunto poster al video per LCP veloce
 *  - Video saltato (solo poster) se prefers-reduced-motion o connessione Save-Data
 *  - Padding bottom ridotto su mobile per fare entrare l'indicatore "Scorri"
 *
 * Asset attesi:
 *   /hero-poster.webp     — primo frame del loop come poster
 *   /hero-loop.mp4|.webm  — invariati rispetto a prima
 */
const Hero: React.FC = () => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  // Decide se mostrare il video o solo il poster
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as any).connection;
    const saveData = !!(conn && conn.saveData);
    const slow = !!(conn && /2g/i.test(conn.effectiveType || ''));
    setShowVideo(!reducedMotion && !saveData && !slow);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(logoRef.current, { y: -30, opacity: 0, duration: 0.9 })
        .from(badgeRef.current, { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
        .from(titleLine1Ref.current, { y: 50, opacity: 0, duration: 0.8 }, '-=0.3')
        .from(titleLine2Ref.current, { y: 50, opacity: 0, duration: 0.9, ease: 'back.out(1.4)' }, '-=0.5')
        .from(subtitleRef.current, { y: 25, opacity: 0, duration: 0.7 }, '-=0.4')
        .from(ctaRef.current, { y: 20, opacity: 0, scale: 0.95, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
        .from(scrollIndicatorRef.current, { opacity: 0, duration: 0.5 }, '-=0.1');
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative w-full flex flex-col items-center justify-between overflow-hidden pt-24 pb-6 md:pt-28 md:pb-12"
      style={{ minHeight: '100dvh' }}
    >
      {/* Background video/poster */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: 'translateZ(0)', willChange: 'transform', background: '#1A1F2E' }}
      >
        {showVideo ? (
          <video
            autoPlay muted loop playsInline preload="auto"
            poster="/hero-poster.webp"
            className="w-full h-full object-cover"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            <source src="/hero-loop.webm" type="video/webm" />
            <source src="/hero-loop.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/hero-poster.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        )}

        {/* Overlay gradient + vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, rgba(26,31,46,0.55) 0%, rgba(26,31,46,0.25) 40%, rgba(26,31,46,0.75) 100%),
              radial-gradient(ellipse at center, transparent 40%, rgba(26,31,46,0.45) 100%)
            `,
          }}
        />
      </div>

      {/* Contenuto centrale */}
      <div className="container mx-auto px-4 z-10 text-center relative flex flex-col items-center flex-1 justify-center">

        {/* Logo */}
        <img
          ref={logoRef}
          src="/il-mondo-di-tiko-logo.webp"
          srcSet="/il-mondo-di-tiko-logo-mobile.webp 340w, /il-mondo-di-tiko-logo-medium.webp 450w, /il-mondo-di-tiko-logo.webp 800w"
          sizes="(max-width: 480px) 128px, (max-width: 768px) 220px, 320px"
          alt="Il Mondo di Tiko Logo"
          width="800"
          height="599"
          className="w-32 sm:w-40 md:w-56 lg:w-64 h-auto mb-4 md:mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]"
          fetchPriority="high"
          loading="eager"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        {/* Badge pill */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 md:gap-3 py-1.5 px-4 md:py-2 md:px-6 rounded-full glass-light text-white font-bold text-xs md:text-base mb-5 md:mb-8 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
        >
          <Sparkles size={13} className="text-tiko-yellow md:hidden" />
          <Sparkles size={15} className="text-tiko-yellow hidden md:inline" />
          <span className="tracking-[0.18em] md:tracking-widest uppercase text-[10px] md:text-sm">
            Benvenuti nel bosco magico
          </span>
          <Sparkles size={13} className="text-tiko-yellow md:hidden" />
          <Sparkles size={15} className="text-tiko-yellow hidden md:inline" />
        </div>

        {/* Titolo */}
        <h1
          className="font-display font-bold text-white leading-[1.05] md:leading-tight mb-5 md:mb-6 drop-shadow-2xl"
          style={{ textWrap: 'balance' as any }}
        >
          <span
            ref={titleLine1Ref}
            className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-1 md:mb-2"
          >
            Dove i sogni
          </span>
          <span
            ref={titleLine2Ref}
            className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-gradient-gold italic"
          >
            prendono vita
          </span>
        </h1>

        {/* Sottotitolo */}
        <p
          ref={subtitleRef}
          className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/80 max-w-md md:max-w-2xl mx-auto mb-8 md:mb-10 font-medium leading-relaxed px-2"
        >
          Un piccolo scoiattolo curioso, gentile e pieno di sogni.{' '}
          <span className="hidden md:inline"><br /></span>
          Tra alberi parlanti e magie inaspettate, Tiko vive avventure che parlano al cuore.
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <Link
            to="/libri"
            className="inline-flex items-center gap-2 md:gap-3 bg-tiko-yellow text-tiko-dark px-7 py-3.5 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg shadow-[0_0_40px_rgba(250,204,21,0.35)] relative overflow-hidden group border-2 border-white/20 hover:scale-[1.04] hover:shadow-[0_0_60px_rgba(250,204,21,0.55)] active:scale-[0.97] transition-all duration-200"
          >
            <span className="relative z-10 flex items-center gap-2">
              Scopri i Libri di Tiko
              <ArrowDown className="w-4 h-4 md:w-5 md:h-5" />
            </span>
            <span className="absolute inset-0 bg-tiko-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 flex flex-col items-center gap-1.5 md:gap-2 text-white/40 mt-4 md:mt-0"
      >
        <span className="text-[10px] md:text-xs tracking-widest uppercase font-medium">Scorri</span>
        <div className="w-px h-8 md:h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
