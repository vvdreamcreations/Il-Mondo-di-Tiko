import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollVideo — Variante V1 "Loop video"
 *
 * Sostituisce la precedente versione scroll-driven (85 frame JPG + pin 4×viewport).
 * Adesso: sezione 70vh con video loop autoplay muto.
 *
 * Benefici:
 * - Su mobile non c'è più scroll-jack (la Home si è accorciata di ~4 viewport).
 * - Niente preloading di 85 immagini all'apertura della Home.
 * - Niente ScrollTrigger / GSAP per questa sezione.
 * - Fallback automatico: se prefers-reduced-motion oppure connessione Save-Data,
 *   mostra solo il poster statico.
 *
 * Asset attesi nella public/ del repo:
 *   /scroll-loop.mp4       — loop ~4-6s, 720p (~1-2MB con h264)
 *   /scroll-loop.webm      — stessa cosa in VP9 (opzionale, fallback più leggero)
 *   /scroll-loop-poster.webp — primo frame come poster (LCP-friendly)
 *
 * Suggerimento per generare il loop dai vecchi 85 frame con ffmpeg:
 *   ffmpeg -framerate 24 -i public/frames/frame_%04d.jpg -c:v libx264 \
 *     -pix_fmt yuv420p -vf "scale=720:-2" -movflags +faststart \
 *     -an public/scroll-loop.mp4
 *   ffmpeg -framerate 24 -i public/frames/frame_%04d.jpg -c:v libvpx-vp9 \
 *     -b:v 0 -crf 32 -vf "scale=720:-2" -an public/scroll-loop.webm
 *   cp public/frames/frame_0001.jpg /tmp/p.jpg && cwebp -q 80 /tmp/p.jpg -o public/scroll-loop-poster.webp
 */
const ScrollVideo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [allowVideo, setAllowVideo] = useState(true);

  // Decide se mostrare il video o solo il poster
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Connection può essere undefined su Safari/Firefox
    const conn = (navigator as any).connection;
    const saveData = !!(conn && conn.saveData);
    const slow = !!(conn && /2g/i.test(conn.effectiveType || ''));
    if (reducedMotion || saveData || slow) setAllowVideo(false);
  }, []);

  // Reveal overlay al primo ingresso in viewport + lazy-mount del video
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShouldPlay(true);
            const ov = overlayRef.current;
            if (ov) {
              ov.style.opacity = '1';
              ov.style.transform = 'translateY(0)';
            }
            io.unobserve(sec);
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        // 70vh su mobile (compatto), 80vh tablet, 90vh desktop
        // 100dvh evita gli shift della barra Safari iOS
        height: 'clamp(70dvh, 75vh, 90vh)',
        minHeight: 480,
        background: '#0A0F1F',
      }}
    >
      {/* Video / poster di sfondo */}
      <div className="absolute inset-0">
        {allowVideo && shouldPlay ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/scroll-loop-poster.webp"
            className="w-full h-full object-cover"
            style={{ transform: 'translateZ(0)' }}
          >
            <source src="/scroll-loop.webm" type="video/webm" />
            <source src="/scroll-loop.mp4" type="video/mp4" />
          </video>
        ) : (
          // Fallback statico: poster a piena copertura
          <img
            src="/scroll-loop-poster.webp"
            alt="Il bosco magico di Tiko al tramonto"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Vignette + overlay per leggibilità testo (uguale al Hero) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom,
                rgba(10,15,31,0.35) 0%,
                rgba(10,15,31,0.15) 30%,
                rgba(10,15,31,0.55) 80%,
                rgba(26,31,46,0.95) 100%),
              radial-gradient(ellipse at center, transparent 35%, rgba(10,15,31,0.45) 100%)
            `,
          }}
        />
      </div>

      {/* Overlay testo */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-12 md:pb-20 text-center"
        style={{
          opacity: 0,
          transform: 'translateY(24px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        <p className="text-tiko-yellow font-mono text-[10px] md:text-xs tracking-[0.28em] uppercase mb-3 md:mb-4">
          Il bosco di Tiko
        </p>
        <h2
          className="font-display font-bold text-white drop-shadow-2xl leading-[1.05] max-w-2xl"
          style={{ fontSize: 'clamp(1.6rem, 5vw, 3.4rem)' }}
        >
          Un mondo dove ogni emozione
          <br />
          <span className="italic text-gradient-gold">trova la sua voce</span>
        </h2>
      </div>
    </section>
  );
};

export default ScrollVideo;
