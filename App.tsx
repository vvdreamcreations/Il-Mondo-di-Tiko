import React, { useEffect, lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import CookieConsent from './components/CookieConsent';
import { motion } from 'framer-motion';
import { hasAnalyticsConsent, initializeAnalytics } from './utils/consent';

// Lazy load non-critical components
const MagicCursor = lazy(() => import('./components/MagicCursor'));
const MagicGL = lazy(() => import('./components/MagicGL'));
const TikoMascot = lazy(() => import('./components/TikoMascot'));

const App: React.FC = () => {

  // Lazy load particles to unblock initial render
  const [showParticles, setShowParticles] = React.useState(false);

  useEffect(() => {
    // Delay particles by 2.5 seconds to prioritize LCP and main thread
    const timer = setTimeout(() => setShowParticles(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Check for existing analytics consent and initialize if approved
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      initializeAnalytics();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative font-sans overflow-x-hidden">

      {/* GLOBAL BACKGROUND — colore piatto tiko-forest per coerenza design system */}
      <div className="fixed inset-0 w-full h-[100lvh] z-0 overflow-hidden bg-tiko-forest">

        {/* PARTICELLE WebGL sopra il colore */}
        {showParticles && (
          <Suspense fallback={null}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 z-10 pointer-events-none"
            >
              <MagicGL />
            </motion.div>
          </Suspense>
        )}

        {/* Tint caldo ambientale */}
        <div className="absolute inset-0 bg-tiko-orange/5 pointer-events-none" />
      </div>

      {/* NAVIGATION */}
      <Navbar />

      {/* SCROLLABLE CONTENT LAYER */}
      <div className="relative z-10 flex-grow flex flex-col">
        <Outlet />
      </div>

      {/* Magic Cursor - Lazy loaded - DISABLED FOR DEBUGGING CLICK ISSUES */}
      {/* <Suspense fallback={null}>
        <MagicCursor />
      </Suspense> */}

      {/* Interactive Mascot */}
      <Suspense fallback={null}>
        <TikoMascot />
      </Suspense>

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
};

export default App;
