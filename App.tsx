import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import CookieConsent from './components/CookieConsent';
import { motion } from 'framer-motion';
import { hasAnalyticsConsent, initializeAnalytics } from './utils/consent';

// Lazy load non-critical components
const MagicCursor = lazy(() => import('./components/MagicCursor'));

const App: React.FC = () => {
  const [video1Loaded, setVideo1Loaded] = useState(false);
  const [video2Loaded, setVideo2Loaded] = useState(false);
  const [activeVideo, setActiveVideo] = useState(1);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Setup videos and crossfade logic
  useEffect(() => {
    const setupVideo = (videoElement: HTMLVideoElement | null) => {
      if (!videoElement) return;

      videoElement.defaultMuted = true;
      videoElement.muted = true;
      videoElement.playbackRate = 0.85;
    };

    setupVideo(video1Ref.current);
    setupVideo(video2Ref.current);

    // Start video 1
    if (video1Ref.current) {
      const playPromise = video1Ref.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setVideo1Loaded(true);
        }).catch(error => {
          console.log("Video 1 autoplay prevented:", error);
        });
      }
    }
  }, []);

  // Check for existing analytics consent and initialize if approved
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      initializeAnalytics();
    }
  }, []);

  // Handle crossfade when video is near end
  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;

    const handleTimeUpdate = () => {
      if (!video1 || !video2) return;

      const currentVideo = activeVideo === 1 ? video1 : video2;
      const nextVideo = activeVideo === 1 ? video2 : video1;

      // Start crossfade 2 seconds before end
      if (currentVideo.duration - currentVideo.currentTime < 2) {
        // Start next video if not playing
        if (nextVideo.paused) {
          nextVideo.currentTime = 0;
          nextVideo.play().then(() => {
            if (activeVideo === 1) {
              setVideo2Loaded(true);
            }
          }).catch(err => console.log("Next video play failed:", err));
        }

        // Switch active video when current ends
        if (currentVideo.duration - currentVideo.currentTime < 0.1) {
          setActiveVideo(activeVideo === 1 ? 2 : 1);
        }
      }
    };

    if (video1) {
      video1.addEventListener('timeupdate', handleTimeUpdate);
    }
    if (video2) {
      video2.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (video1) video1.removeEventListener('timeupdate', handleTimeUpdate);
      if (video2) video2.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [activeVideo]);

  return (
    <div className="min-h-screen flex flex-col relative font-sans overflow-x-hidden">

      {/* GLOBAL BACKGROUND SYSTEM - FIXED & STATIC */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-gray-900">

        {/* LAYER 1: DEEP VISUALS (Video/Image) */}
        <div className="absolute inset-0 w-full h-full">
          {/* No fallback image needed - video will load */}

          {/* Video 1 */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: video1Loaded && activeVideo === 1 ? 1 : 0 }}
            transition={{ duration: 2 }}
          >
            <video
              ref={video1Ref}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
            >
              <source src="/Forest.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Video 2 */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: video2Loaded && activeVideo === 2 ? 1 : 0 }}
            transition={{ duration: 2 }}
          >
            <video
              ref={video2Ref}
              muted
              playsInline
              preload="none"
              className="w-full h-full object-cover"
              style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
            >
              <source src="/Forest.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>

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

      {/* Magic Cursor - Lazy loaded */}
      <Suspense fallback={null}>
        <MagicCursor />
      </Suspense>

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
};

export default App;
