import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(logoRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.9,
      })
        .from(badgeRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.7,
        }, '-=0.4')
        .from(titleLine1Ref.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
        }, '-=0.3')
        .from(titleLine2Ref.current, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(1.4)',
        }, '-=0.5')
        .from(subtitleRef.current, {
          y: 25,
          opacity: 0,
          duration: 0.7,
        }, '-=0.4')
        .from(ctaRef.current, {
          y: 20,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, '-=0.3')
        .from(scrollIndicatorRef.current, {
          opacity: 0,
          duration: 0.5,
        }, '-=0.1');
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden pt-28 pb-12">

      {/* Background Video */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: 'translateZ(0)', willChange: 'transform', background: '#1A1F2E' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <source src="/hero-loop.mp4" type="video/mp4" />
          <source src="/hero-loop.webm" type="video/webm" />
        </video>

        {/* Overlay unico combinato: gradiente + vignette in un solo layer */}
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
          sizes="(max-width: 480px) 150px, (max-width: 768px) 340px, 800px"
          alt="Il Mondo di Tiko Logo"
          width="800"
          height="599"
          className="w-40 md:w-56 lg:w-64 h-auto mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]"
          fetchPriority="high"
          loading="eager"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Badge pill */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-3 py-2 px-6 rounded-full glass-light text-white font-bold text-sm md:text-base mb-8 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
        >
          <Sparkles size={15} className="text-tiko-yellow" />
          <span className="tracking-widest uppercase text-xs md:text-sm">Benvenuti nel bosco magico</span>
          <Sparkles size={15} className="text-tiko-yellow" />
        </div>

        {/* Titolo */}
        <h1 className="font-display font-bold text-white leading-tight mb-6 drop-shadow-2xl">
          <span
            ref={titleLine1Ref}
            className="block text-4xl md:text-6xl lg:text-7xl mb-2"
          >
            Dove i sogni
          </span>
          <span
            ref={titleLine2Ref}
            className="block text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-gradient-gold italic"
          >
            prendono vita
          </span>
        </h1>

        {/* Sottotitolo */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
        >
          Un piccolo scoiattolo curioso, gentile e pieno di sogni.{' '}
          <span className="hidden md:inline"><br /></span>
          Tra alberi parlanti e magie inaspettate, Tiko vive avventure che parlano al cuore.
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <Link
            to="/libri"
            className="inline-flex items-center gap-3 bg-tiko-yellow text-tiko-dark px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(250,204,21,0.35)] relative overflow-hidden group border-2 border-white/20 hover:scale-[1.04] hover:shadow-[0_0_60px_rgba(250,204,21,0.55)] active:scale-[0.97] transition-all duration-200"
          >
            <span className="relative z-10 flex items-center gap-2">
              Scopri i Libri di Tiko
              <ArrowDown className="w-5 h-5" />
            </span>
            {/* Hover overlay arancione */}
            <span className="absolute inset-0 bg-tiko-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scorri</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

    </section>
  );
};

export default Hero;
