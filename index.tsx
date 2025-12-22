import './index.css';
import './src/fonts.css'; // Optimized local fonts
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LibriPage = React.lazy(() => import('./pages/LibriPage'));
const ChiSiamoPage = React.lazy(() => import('./pages/ChiSiamoPage'));
const NewsletterPage = React.lazy(() => import('./pages/NewsletterPage'));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicy'));
const LaTuaVoce = React.lazy(() => import('./pages/LaTuaVoce'));
import ScrollToTop from './components/ScrollToTop';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <ScrollToTop />
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-900 text-tiko-yellow">Caricamento...</div>}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="libri" element={<LibriPage />} />
              <Route path="chi-siamo" element={<ChiSiamoPage />} />
              <Route path="newsletter" element={<NewsletterPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="la-tua-voce" element={<LaTuaVoce />} />
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
            </Route>
          </Routes>
        </React.Suspense>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);