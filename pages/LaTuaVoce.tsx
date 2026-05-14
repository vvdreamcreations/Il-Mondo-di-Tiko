import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lightbulb, Vote, Sparkles } from 'lucide-react';
import TopicSurvey from '../components/TopicSurvey';
import TopicSuggestionForm from '../components/TopicSuggestionForm';
import Footer from '../components/Footer';

/**
 * LaTuaVoce — versione responsive (Step 2)
 *
 * Desktop (≥ 1024px): layout originale invariato (intro + 3 feature card con
 *   Tiko al centro + survey + form + closing).
 *
 * Mobile (< 1024px): "Tab Vota / Suggerisci" (variante V1 scelta).
 *   - hero intro compatto (badge + titolo + sottotitolo)
 *   - 2 tab che fanno swap tra <TopicSurvey /> e <TopicSuggestionForm />
 *   - closing card più compatta
 *   La pagina passa da ~5-6 viewport a ~2-3 viewport.
 */

const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 1024px)').matches;
  });
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
};

const LaTuaVoce: React.FC = () => {
  const isDesktop = useIsDesktop();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>La Tua Voce | Partecipa alla creazione delle storie di Tiko</title>
        <meta name="description" content="Vota i temi dei prossimi libri e suggerisci nuove idee. Il tuo parere aiuta a creare le avventure di Tiko." />
      </Helmet>

      {isDesktop ? <VoceDesktop /> : <VoceMobileTabs />}

      <Footer />
    </div>
  );
};

export default LaTuaVoce;

// ═══════════════════════════════════════════════════════════════════════════
// DESKTOP — layout originale (identico a prima)
// ═══════════════════════════════════════════════════════════════════════════
const VoceDesktop: React.FC = () => (
  <>
    {/* Hero */}
    <section className="container mx-auto px-4 pt-32 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
          style={{
            background: 'rgba(253,186,116,0.15)',
            border: '1px solid rgba(253,186,116,0.3)',
            color: '#FDE68A',
          }}
        >
          <Heart size={11} />
          La Tua Voce
        </div>
        <h1 className="font-display font-bold text-white text-4xl md:text-6xl mb-5 drop-shadow-lg">
          Il tuo parere aiuta<br className="hidden md:block" /> a creare le nostre storie
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Le tue opinioni e le tue idee sono preziose. Vota il tema che preferisci o suggerisci una nuova avventura per Tiko.
        </p>
        <div className="h-px w-24 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto mt-8 opacity-60" />
      </motion.div>

      {/* Feature cards */}
      <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto items-center mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(96,165,250,0.1) 0%, rgba(26,31,46,0.6) 100%)',
            border: '1px solid rgba(96,165,250,0.2)',
          }}
        >
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.25)' }}
          >
            <Vote size={18} style={{ color: '#60A5FA' }} />
          </div>
          <h3 className="font-bold text-white text-lg mb-2">Vota il Tema</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Scegli quale tema emotivo vorresti vedere nel prossimo libro di Tiko. Il tuo voto conta davvero!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex justify-center"
        >
          <img
            src="/tiko-saluta.webp"
            alt="Tiko che saluta"
            className="h-48 md:h-60 w-auto object-contain hover:scale-105 transition-transform duration-300"
            style={{ filter: 'drop-shadow(0 0 30px rgba(250,204,21,0.35))' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(251,146,60,0.1) 0%, rgba(26,31,46,0.6) 100%)',
            border: '1px solid rgba(251,146,60,0.2)',
          }}
        >
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.25)' }}
          >
            <Lightbulb size={18} style={{ color: '#FB923C' }} />
          </div>
          <h3 className="font-bold text-white text-lg mb-2">Suggerisci un'Idea</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Hai un tema in mente? Condividilo con noi — valutiamo ogni suggerimento con cura.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="mb-12">
      <TopicSurvey />
    </section>

    <section className="mb-12">
      <TopicSuggestionForm />
    </section>

    <section className="container mx-auto px-4 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center rounded-3xl p-10 md:p-14 max-w-2xl mx-auto relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(253,186,116,0.12) 0%, rgba(26,31,46,0.8) 100%)',
          border: '1px solid rgba(253,186,116,0.2)',
        }}
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full blur-[60px] pointer-events-none opacity-25"
          style={{ background: '#FACC15' }} />
        <Sparkles size={28} className="text-tiko-yellow mx-auto mb-5 opacity-80" />
        <h2 className="font-display font-bold text-white text-2xl md:text-4xl mb-4">
          Grazie per la Tua Partecipazione!
        </h2>
        <p className="text-white/60 text-base leading-relaxed">
          Ogni voce è importante e contribuisce a rendere le storie di Tiko sempre più speciali e vicine al cuore dei bambini.
        </p>
      </motion.div>
    </section>
  </>
);

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE — Tab Vota / Suggerisci (variante V1 scelta)
// ═══════════════════════════════════════════════════════════════════════════
type Tab = 'vote' | 'suggest';

const VoceMobileTabs: React.FC = () => {
  const [tab, setTab] = useState<Tab>('vote');

  return (
    <>
      {/* Hero compatto */}
      <section className="px-4 pt-24 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold mb-3.5 tracking-wide"
            style={{
              background: 'rgba(253,186,116,0.15)',
              border: '1px solid rgba(253,186,116,0.3)',
              color: '#FDE68A',
            }}
          >
            <Heart size={10} />
            La Tua Voce
          </div>
          <h1 className="font-display font-bold text-white text-[28px] leading-[1.1] mb-2.5 drop-shadow-lg">
            Il tuo parere aiuta<br />a creare le storie
          </h1>
          <p className="text-white/60 text-sm leading-relaxed">
            Vota il tema o suggerisci una nuova avventura.
          </p>
        </motion.div>

        {/* Tab switch */}
        <div
          className="relative flex p-1 rounded-full mb-1"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* indicatore */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-full"
            style={{
              left: 4,
              width: 'calc(50% - 4px)',
              background: 'linear-gradient(135deg, #FACC15, #FB923C)',
              boxShadow: '0 4px 14px rgba(250,204,21,0.4)',
            }}
            animate={{ x: tab === 'vote' ? 0 : '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />

          <button
            role="tab"
            aria-selected={tab === 'vote'}
            onClick={() => setTab('vote')}
            className="flex-1 relative z-10 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold rounded-full transition-colors duration-300"
            style={{ color: tab === 'vote' ? '#1A1F2E' : 'rgba(255,255,255,0.65)' }}
          >
            <Vote size={13} />
            Vota un tema
          </button>
          <button
            role="tab"
            aria-selected={tab === 'suggest'}
            onClick={() => setTab('suggest')}
            className="flex-1 relative z-10 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold rounded-full transition-colors duration-300"
            style={{ color: tab === 'suggest' ? '#1A1F2E' : 'rgba(255,255,255,0.65)' }}
          >
            <Lightbulb size={13} />
            Suggerisci
          </button>
        </div>
      </section>

      {/* Tab content con cross-fade */}
      <section className="mb-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {tab === 'vote' ? (
            <motion.div
              key="vote"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <TopicSurvey />
            </motion.div>
          ) : (
            <motion.div
              key="suggest"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <TopicSuggestionForm />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Closing compatto */}
      <section className="px-4 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center rounded-3xl p-7 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(253,186,116,0.12) 0%, rgba(26,31,46,0.85) 100%)',
            border: '1px solid rgba(253,186,116,0.2)',
          }}
        >
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-16 rounded-full blur-[40px] pointer-events-none opacity-30"
            style={{ background: '#FACC15' }}
          />
          <Sparkles size={22} className="text-tiko-yellow mx-auto mb-3 opacity-80" />
          <h2 className="font-display font-bold text-white text-xl mb-2">
            Grazie per la Tua Partecipazione!
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Ogni voce è importante e rende le storie di Tiko sempre più speciali.
          </p>
        </motion.div>
      </section>
    </>
  );
};
