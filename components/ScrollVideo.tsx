import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 85;
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(4, '0')}.jpg`;

const ScrollVideo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayTopRef = useRef<HTMLDivElement>(null);
  const overlayBottomRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const [isReady, setIsReady] = useState(false);

  // Disegna un frame sul canvas con cover crop
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img?.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover: scala per riempire il canvas, ritaglia al centro
    const scale = Math.max(cw / iw, ch / ih);
    const sw = cw / scale;
    const sh = ch / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  };

  // Ridimensiona canvas al viewport e ridisegna il frame corrente
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (currentFrameRef.current >= 0) {
      drawFrame(currentFrameRef.current);
    }
  };

  // Fase 1: precarica tutti i frame
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        // Mostra il primo frame non appena è disponibile
        if (i === 0 && canvasRef.current) {
          resizeCanvas();
          currentFrameRef.current = 0;
          drawFrame(0);
        }
        if (loaded === FRAME_COUNT) {
          setIsReady(true);
        }
      };
      images[i] = img;
    }
    framesRef.current = images;

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Fase 2: inizializza ScrollTrigger quando tutti i frame sono pronti
  useEffect(() => {
    if (!isReady) return;

    const section = sectionRef.current;
    if (!section) return;

    // Disegna frame 0 al momento del mount
    currentFrameRef.current = 0;
    drawFrame(0);

    let rafId = 0;

    const ctx = gsap.context(() => {
      // Overlay superiore (fade-in dall'alto)
      gsap.fromTo(
        overlayTopRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=8%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Overlay inferiore (fade-out verso il basso)
      gsap.fromTo(
        overlayBottomRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: '+=92%',
            end: '+=100%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Scroll → frame via RAF
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * 4}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: 10,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            Math.round(self.progress * (FRAME_COUNT - 1)),
            FRAME_COUNT - 1
          );
          if (frameIndex === currentFrameRef.current) return;
          currentFrameRef.current = frameIndex;
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => drawFrame(frameIndex));
        },
      });
    }, section);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [isReady]);

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: '100dvh' }}>

      {/* Loading overlay — scompare non appena tutti i frame sono pronti */}
      {!isReady && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ background: '#1A1F2E' }}
        >
          <div className="flex flex-col items-center gap-3 text-white/30">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
            <span className="text-xs tracking-widest uppercase font-medium">Caricamento</span>
          </div>
        </div>
      )}

      {/* Canvas fullscreen — sostituisce il video */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%', transform: 'translateZ(0)' }}
      />

      {/* Overlay fade-in dall'alto */}
      <div
        ref={overlayTopRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #1A1F2E 0%, #1A1F2E 30%, transparent 100%)' }}
      />

      {/* Overlay fade-out verso il basso */}
      <div
        ref={overlayBottomRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #1A1F2E 0%, #1A1F2E 30%, transparent 100%)', opacity: 0 }}
      />

    </div>
  );
};

export default ScrollVideo;
