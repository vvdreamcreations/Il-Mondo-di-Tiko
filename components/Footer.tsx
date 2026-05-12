import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ShoppingBag } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-16 pb-8 overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Glow ambientale sottile */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 blur-[80px] pointer-events-none opacity-15 rounded-full"
        style={{ background: '#FACC15' }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* Logo + tagline */}
        <div className="flex flex-col items-center mb-10">
          <img
            src="/vv-dream-creations-logo.webp"
            alt="VV Dream Creations"
            width="300"
            height="100"
            className="h-20 md:h-28 w-auto object-contain mb-4 opacity-90 hover:opacity-100 transition-opacity duration-300"
            onError={e => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const fb = document.createElement('span');
                fb.innerText = 'VV Dream Creations';
                fb.className = 'font-display font-bold text-2xl text-white';
                parent.appendChild(fb);
              }
            }}
          />
          <p className="text-white/35 text-sm text-center max-w-xs leading-relaxed">
            Storie illustrate per bambini che insegnano emozioni con dolcezza.
          </p>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            href="https://www.instagram.com/vvdreamcreations/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.65)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(253,186,116,0.18)';
              (e.currentTarget as HTMLElement).style.color = '#FDE68A';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)';
            }}
          >
            <Instagram size={17} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61568152116518"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.65)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(253,186,116,0.18)';
              (e.currentTarget as HTMLElement).style.color = '#FDE68A';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)';
            }}
          >
            <Facebook size={17} />
          </a>
          <a
            href="https://www.amazon.it/stores/VV-Dream-Creations/author/B0FJGCG3CM"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Amazon"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.65)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(253,186,116,0.18)';
              (e.currentTarget as HTMLElement).style.color = '#FDE68A';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)';
            }}
          >
            <ShoppingBag size={17} />
          </a>
        </div>

        {/* Links legali */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-white/35 text-sm">
          <Link to="/privacy-policy" className="hover:text-tiko-yellow transition-colors duration-200">
            Privacy Policy
          </Link>
          <span className="opacity-30">·</span>
          <Link to="/cookie-policy" className="hover:text-tiko-yellow transition-colors duration-200">
            Cookie Policy
          </Link>
          <span className="opacity-30">·</span>
          <button
            onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
            className="hover:text-tiko-yellow transition-colors duration-200"
          >
            Gestisci Cookie
          </button>
        </div>

        {/* Copyright */}
        <p className="text-center text-white/25 text-xs leading-relaxed">
          © {new Date().getFullYear()} VV Dream Creations. Tutti i diritti riservati.
          <span className="mx-2 opacity-50">·</span>
          Creato con ❤️ per momenti magici.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
