import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-8 md:py-12 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-black/30 backdrop-blur-md inline-block px-6 md:px-12 py-6 md:py-8 rounded-3xl border border-white/10 max-w-full">
          {/* VV Dream Creations Logo */}
          <div className="mb-4 md:mb-6 flex justify-center">
            <img
              src="/vv-dream-creations-logo.png"
              alt="VV Dream Creations Logo"
              className="h-12 md:h-16 lg:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement('span');
                  fallback.innerText = "VV Dream Creations";
                  fallback.className = "font-display font-bold text-xl md:text-2xl text-white";
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 md:mb-8 font-medium text-sm md:text-base">
            <a href="https://www.instagram.com/vvdreamcreations/" target="_blank" rel="noopener noreferrer" className="hover:text-tiko-yellow transition-colors hover:scale-110 transform duration-200">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61568152116518" target="_blank" rel="noopener noreferrer" className="hover:text-tiko-yellow transition-colors hover:scale-110 transform duration-200">Facebook</a>
            <a href="https://www.amazon.it/stores/VV-Dream-Creations/author/B0FJGCG3CM?ref=sr_ntt_srch_lnk_1&qid=1765724311&sr=8-1&shoppingPortalEnabled=true" target="_blank" rel="noopener noreferrer" className="hover:text-tiko-yellow transition-colors hover:scale-110 transform duration-200">Amazon</a>
            <Link to="/privacy-policy" className="hover:text-tiko-yellow transition-colors hover:scale-110 transform duration-200">Privacy Policy</Link>
          </div>

          <p className="text-white/60 text-xs md:text-sm leading-relaxed">
            © {new Date().getFullYear()} VV Dream Creations. Tutti i diritti riservati. <br className="hidden sm:inline" />
            <span className="sm:inline block mt-1 sm:mt-0">Designed with ❤️ for magic moments.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
