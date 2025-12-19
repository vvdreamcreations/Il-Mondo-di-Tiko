import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import HomePage from './pages/HomePage';
import LibriPage from './pages/LibriPage';
import ChiSiamoPage from './pages/ChiSiamoPage';
import NewsletterPage from './pages/NewsletterPage';
import GalleryPage from './pages/GalleryPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import LaTuaVoce from './pages/LaTuaVoce';
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
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);