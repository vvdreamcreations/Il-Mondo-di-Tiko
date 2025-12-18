import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, CheckCircle, XCircle } from 'lucide-react';
import { getConsent, saveConsent, initializeAnalytics, hasConsentDecision, type Consent } from '../utils/consent';

interface CookieConsentProps {
    onClose?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);
    const [analytics, setAnalytics] = useState(true);
    const [marketing, setMarketing] = useState(true);

    useEffect(() => {
        // Load saved consent if exists to populate checkboxes
        const saved = getConsent();
        if (saved) {
            setAnalytics(saved.analytics);
            setMarketing(saved.marketing);
        }

        // Show banner if no consent decision has been made
        if (!hasConsentDecision()) {
            setIsVisible(true);
        }

        // Listen for open settings event from Footer
        const handleOpenSettings = () => {
            const current = getConsent();
            if (current) {
                setAnalytics(current.analytics);
                setMarketing(current.marketing);
            }
            setIsVisible(true);
            setShowCustomize(true);
        };

        window.addEventListener('openCookieSettings', handleOpenSettings);
        return () => window.removeEventListener('openCookieSettings', handleOpenSettings);
    }, []);

    const handleAcceptAll = () => {
        const consent: Consent = {
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        saveConsent(consent);
        initializeAnalytics();
        setIsVisible(false);
        onClose?.();
    };

    const handleRejectAll = () => {
        const consent: Consent = {
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        saveConsent(consent);
        setIsVisible(false);
        onClose?.();
    };

    const handleCustomSave = () => {
        const consent: Consent = {
            analytics,
            marketing,
            timestamp: new Date().toISOString()
        };
        saveConsent(consent);

        if (analytics) {
            initializeAnalytics();
        }

        setIsVisible(false);
        setShowCustomize(false);
        onClose?.();
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-tiko-yellow/30"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-tiko-yellow/20 backdrop-blur-sm">
                                <Cookie className="w-6 h-6 text-tiko-yellow" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">
                                Rispettiamo la Tua Privacy
                            </h2>
                        </div>
                    </div>

                    {!showCustomize ? (
                        <>
                            {/* Main Content */}
                            <div className="mb-6 space-y-4">
                                <p className="text-white/90 leading-relaxed">
                                    Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza sul nostro sito, analizzare il traffico e personalizzare i contenuti.
                                </p>
                                <p className="text-white/80 text-sm">
                                    Puoi scegliere di accettare tutti i cookie, rifiutarli o personalizzare le tue preferenze. Per maggiori informazioni, consulta la nostra{' '}
                                    <a href="/privacy-policy" className="text-tiko-yellow hover:text-tiko-orange underline transition-colors">
                                        Privacy Policy
                                    </a>
                                    {' '}e{' '}
                                    <a href="/cookie-policy" className="text-tiko-yellow hover:text-tiko-orange underline transition-colors">
                                        Cookie Policy
                                    </a>.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 bg-gradient-to-r from-tiko-green to-tiko-blue text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    Accetta Tutti
                                </button>

                                <button
                                    onClick={handleRejectAll}
                                    className="flex-1 bg-white/10 backdrop-blur-sm text-white font-bold py-4 rounded-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <XCircle className="w-5 h-5" />
                                    Solo Essenziali
                                </button>

                                <button
                                    onClick={() => setShowCustomize(true)}
                                    className="flex-1 bg-transparent text-white font-bold py-4 rounded-xl border-2 border-tiko-yellow/40 hover:bg-tiko-yellow/10 hover:border-tiko-yellow/60 transition-all flex items-center justify-center gap-2"
                                >
                                    <Settings className="w-5 h-5" />
                                    Personalizza
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Customize View */}
                            <div className="mb-6 space-y-4">
                                <p className="text-white/90 mb-4">
                                    Scegli quali categorie di cookie desideri attivare:
                                </p>

                                {/* Essential Cookies (always on) */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white mb-1">Cookie Essenziali</h3>
                                            <p className="text-white/70 text-sm">
                                                Necessari per il funzionamento del sito. Sempre attivi.
                                            </p>
                                        </div>
                                        <div className="ml-4 px-3 py-1 rounded-full bg-tiko-green/20 text-tiko-green text-xs font-bold">
                                            SEMPRE ATTIVI
                                        </div>
                                    </div>
                                </div>

                                {/* Analytics Cookies */}
                                <label className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors block">
                                    <div className="flex items-start gap-4">
                                        <input
                                            type="checkbox"
                                            checked={analytics}
                                            onChange={(e) => setAnalytics(e.target.checked)}
                                            className="mt-1 w-5 h-5 rounded border-2 border-tiko-blue/40 bg-black/30 checked:bg-tiko-blue checked:border-tiko-blue focus:ring-2 focus:ring-tiko-blue/60 transition-all cursor-pointer"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white mb-1">Cookie Analitici</h3>
                                            <p className="text-white/70 text-sm">
                                                Ci aiutano a capire come i visitatori utilizzano il sito (Google Analytics).
                                            </p>
                                        </div>
                                    </div>
                                </label>

                                {/* Marketing Cookies */}
                                <label className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors block">
                                    <div className="flex items-start gap-4">
                                        <input
                                            type="checkbox"
                                            checked={marketing}
                                            onChange={(e) => setMarketing(e.target.checked)}
                                            className="mt-1 w-5 h-5 rounded border-2 border-tiko-orange/40 bg-black/30 checked:bg-tiko-orange checked:border-tiko-orange focus:ring-2 focus:ring-tiko-orange/60 transition-all cursor-pointer"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white mb-1">Cookie di Marketing</h3>
                                            <p className="text-white/70 text-sm">
                                                Per newsletter e comunicazioni personalizzate (Brevo).
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Customize Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleCustomSave}
                                    className="flex-1 bg-gradient-to-r from-tiko-yellow to-tiko-orange text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:shadow-[0_6px_30px_rgba(250,204,21,0.6)] hover:scale-105 transition-all"
                                >
                                    Salva Preferenze
                                </button>

                                <button
                                    onClick={() => setShowCustomize(false)}
                                    className="flex-1 bg-white/10 backdrop-blur-sm text-white font-bold py-4 rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all"
                                >
                                    Indietro
                                </button>
                            </div>
                        </>
                    )}

                    {/* Footer Info */}
                    <p className="text-white/50 text-xs mt-4 text-center">
                        Puoi modificare le tue preferenze in qualsiasi momento dal link nel footer.
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CookieConsent;
