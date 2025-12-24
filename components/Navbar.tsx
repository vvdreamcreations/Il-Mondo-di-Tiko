import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/chi-siamo', label: 'Chi Siamo' },
    { to: '/libri', label: 'Libri' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/la-tua-voce', label: 'La Tua Voce' },
    { to: '/newsletter', label: 'Newsletter' },
    { to: '/privacy-policy', label: 'Privacy' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-3xl rough-edges-shadow px-6 py-3 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] border border-white/30 ring-1 ring-white/20 hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] transition-all duration-500">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <NavLink
              to="/"
              onClick={scrollToTop}
              className="font-display text-2xl font-bold text-white hover:text-tiko-yellow transition-colors relative z-10 py-1"
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
                    `relative z-50 flex items-center justify-center h-full px-5 py-3 xl:px-6 transition-all duration-300 font-medium text-sm xl:text-base group max-xl:px-3 ${isActive
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
                      {/* Hover bg for better hit area visualization (optional) */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 leaf-edges transition-colors duration-200" />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

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
                <div className="pt-4 pb-2 space-y-3">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => {
                        scrollToTop();
                        setIsMenuOpen(false);
                      }}
                      className={({ isActive }) =>
                        `block px-4 py-2 leaf-edges font-medium transition-colors ${isActive
                          ? 'bg-tiko-yellow/20 text-tiko-yellow'
                          : 'text-white hover:bg-white/10 hover:text-tiko-yellow'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
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
