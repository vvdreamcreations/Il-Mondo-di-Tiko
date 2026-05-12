import React, { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    const ctx = gsap.context(() => {
      // Stato iniziale: trasparente
      gsap.set(pill, {
        backgroundColor: 'rgba(26, 31, 46, 0)',
        backdropFilter: 'blur(0px)',
        borderColor: 'rgba(255, 255, 255, 0)',
        boxShadow: 'none',
      });

      // Scroll trigger: morphing dopo 80px
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto px-4">
        <div
          ref={pillRef}
          className="rounded-2xl px-6 py-3 border transition-colors duration-300"
          style={{ borderColor: 'rgba(255,255,255,0)' }}
        >
          <div className="flex items-center justify-between">

            {/* Logo/Brand */}
            <NavLink
              to="/"
              onClick={scrollToTop}
              className="font-display text-2xl font-bold text-white hover:text-tiko-yellow transition-colors duration-300 relative z-10 py-1"
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
                      isActive
                        ? 'text-tiko-yellow'
                        : 'text-white hover:text-tiko-yellow'
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
              onClick={toggleMenu}
              className="lg:hidden text-white hover:text-tiko-yellow transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 space-y-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => {
                        scrollToTop();
                        setIsMenuOpen(false);
                      }}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 rounded-xl font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-tiko-yellow/20 text-tiko-yellow'
                            : 'text-white hover:bg-white/10 hover:text-tiko-yellow'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <Link
                    to="/libri"
                    onClick={() => setIsMenuOpen(false)}
                    className="block mt-3 px-4 py-2.5 bg-tiko-yellow text-tiko-dark rounded-full font-bold text-center"
                  >
                    Scopri i Libri
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
