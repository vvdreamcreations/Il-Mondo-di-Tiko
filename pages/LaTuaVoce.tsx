import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Heart, Lightbulb, Vote, Sparkles } from 'lucide-react';
import TopicSurvey from '../components/TopicSurvey';
import TopicSuggestionForm from '../components/TopicSuggestionForm';
import Footer from '../components/Footer';

const LaTuaVoce: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>La Tua Voce | Partecipa alla creazione delle storie di Tiko</title>
        <meta name="description" content="Vota i temi dei prossimi libri e suggerisci nuove idee. Il tuo parere aiuta a creare le avventure di Tiko." />
      </Helmet>

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
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center mb-4">

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

          {/* Tiko */}
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

      {/* Survey */}
      <section className="mb-12">
        <TopicSurvey />
      </section>

      {/* Suggestion form */}
      <section className="mb-12">
        <TopicSuggestionForm />
      </section>

      {/* Closing */}
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

      <Footer />
    </div>
  );
};

export default LaTuaVoce;
