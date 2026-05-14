import React, { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Navbar — versione mobile-friendly
 *
 * Cosa cambia rispetto alla versione precedente:
 *  - Su mobile (<lg) il menu non espande più la pill verso il basso, ma apre
 *    un OVERLAY fullscreen con sfondo blur, link a tutta larghezza e tap
 *    target larghi (≥48px).
 *  - Il body viene lockato quando il menu è aperto (no scroll dietro).
 *  - Esc + tap fuori chiudono il menu.
 *  - Su mobile il brand viene accorciato a "Tiko" sotto i 380px per evitare
 *    overflow.
 */
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pillRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/chi-siamo', label: 'Chi Siamo' },
    { to: '/libri', label: 'Libri' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/la-tua-voce', label: 'La Tua Voce' },
    { to: '/newsletter', label: 'Newsletter' },
  ];

  // Morphing della pill al primo scroll
  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const ctx = gsap.context(() => {
      gsap.set(pill, {
        backgroundColor: 'rgba(26, 31, 46, 0)',
        backdropFilter: 'blur(0px)',
        borderColor: 'rgba(255, 255, 255, 0)',
        boxShadow: 'none',
      });
      ScrollTrigger.create({
        start: 80,
        onEnter: () => {
          gsap.to(pill, {
            backgroundColor: 'rgba(26, 31, 46, 0.75)',
            backdropFilter: 'blur(24px)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            duration: 0.5,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(pill, {
            backgroundColor: 'rgba(26, 31, 46, 0)',
            backdropFilter: 'blur(0px)',
            borderColor: 'rgba(255, 255, 255, 0)',
            boxShadow: 'none',
            duration: 0.4,
            ease: 'power2.out',
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Body lock + Esc per chiudere
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] py-4">
        <div className="container mx-auto px-4">
          <div
            ref={pillRef}
            className="rounded-2xl px-4 py-2.5 md:px-6 md:py-3 border transition-colors duration-300"
            style={{ borderColor: 'rgba(255,255,255,0)' }}
          >
            <div className="flex items-center justify-between gap-2">

              {/* Brand */}
              <NavLink
                to="/"
                onClick={scrollToTop}
                className="font-display font-bold text-white hover:text-tiko-yellow transition-colors duration-300 relative z-10 py-1 whitespace-nowrap text-lg sm:text-xl md:text-2xl"
              >
                Il Mondo di Tiko
              </NavLink>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 h-full">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={scrollToTop}
                    className={({ isActive }) =>
                      `relative z-50 flex items-center justify-center h-full px-5 py-3 xl:px-6 transition-all duration-300 font-medium text-sm xl:text-base group max-xl:px-3 ${
                        isActive ? 'text-tiko-yellow' : 'text-white hover:text-tiko-yellow'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">{link.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute -bottom-1 left-3 right-3 h-0.5 bg-tiko-yellow rounded-full"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-colors duration-200" />
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              {/* CTA Desktop */}
              <Link
                to="/libri"
                onClick={scrollToTop}
                className="hidden lg:inline-flex items-center gap-2 bg-tiko-yellow text-tiko-dark px-5 py-2.5 rounded-full font-bold text-sm btn-magnetic overflow-hidden relative group hover:scale-105 active:scale-[0.97] transition-all duration-200"
              >
                <span className="relative z-10">Scopri i Libri</span>
                <span className="absolute inset-0 bg-tiko-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden text-white hover:text-tiko-yellow transition-colors p-2 -m-2"
                aria-label="Apri menu"
                aria-expanded={isMenuOpen}
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-[70]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
          >
            {/* backdrop */}
            <div
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0"
              style={{
                background: 'rgba(10, 12, 22, 0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            />

            {/* Pannello */}
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative z-10 flex flex-col h-full"
              style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
              {/* Header con close */}
              <div className="flex items-center justify-between px-6 pt-5 pb-2">
                <NavLink
                  to="/"
                  onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
                  className="font-display font-bold text-white text-xl"
                >
                  Il Mondo di Tiko
                </NavLink>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Chiudi menu"
                  className="text-white p-3 -m-3 hover:text-tiko-yellow transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Link list */}
              <nav className="flex-1 flex flex-col justify-center px-6 -mt-12">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.to}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: 'easeOut' }}
                    >
                      <NavLink
                        to={link.to}
                        onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
                        className={({ isActive }) =>
                          `block py-4 px-2 font-display font-bold text-3xl transition-colors ${
                            isActive ? 'text-tiko-yellow' : 'text-white hover:text-tiko-yellow'
                          }`
                        }
                        end={link.to === '/'}
                      >
                        {({ isActive }) => (
                          <span className="inline-flex items-center gap-3">
                            {isActive && <span className="w-2 h-2 rounded-full bg-tiko-yellow shadow-[0_0_12px_rgba(250,204,21,0.6)]" />}
                            {link.label}
                          </span>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTA mobile in fondo */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                className="px-6 pb-8"
              >
                <Link
                  to="/libri"
                  onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
                  className="flex items-center justify-center gap-2 w-full bg-tiko-yellow text-tiko-dark py-4 rounded-full font-bold text-base shadow-[0_0_30px_rgba(250,204,21,0.35)]"
                >
                  Scopri i Libri di Tiko →
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
