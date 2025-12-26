import React, { useEffect, lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import CookieConsent from './components/CookieConsent';
import { motion } from 'framer-motion';
import { hasAnalyticsConsent, initializeAnalytics } from './utils/consent';

// Lazy load non-critical components
const MagicCursor = lazy(() => import('./components/MagicCursor'));
const MagicGL = lazy(() => import('./components/MagicGL'));

const App: React.FC = () => {

  // Lazy load particles to unblock initial render
  const [showParticles, setShowParticles] = React.useState(false);

  useEffect(() => {
    // Delay particles by 1 second (faster start as requested)
    const timer = setTimeout(() => setShowParticles(true), 1000);
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

      {/* GLOBAL BACKGROUND SYSTEM - FIXED & STATIC */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-gray-900">

        {/* LAYER 1: DEEP VISUALS (Static Image) */}
        <div className="absolute inset-0 w-full h-full">
          <picture>
            <source media="(max-width: 768px)" srcSet="/sfondo-bosco-mobile.webp" />
            <img
              src="/sfondo-bosco-statico.webp"
              alt="Sfondo Bosco Magico"
              className="w-full h-full object-cover"
              loading="eager"
              width="1920"
              height="1080"
            />
          </picture>
        </div>

        {/* LAYER 2: REAL-TIME PARTICLES (WebGL) */}
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

        {/* LAYER 2: ATMOSPHERIC OVERLAYS */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Darker overlay to ensure text readability over the video while scrolling */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

          {/* Warm/Magic Tint */}
          <div className="absolute inset-0 bg-tiko-orange/10 mix-blend-overlay" />
        </div>
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

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
};

export default App;
