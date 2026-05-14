import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Footer from '../components/Footer';

/**
 * ChiSiamoPage — densità mobile (Step 2)
 * Pure CSS responsive: meno padding-top, titolo più piccolo su mobile,
 * padding interno della card ridotto, body 14.5px mobile / 18px desktop,
 * quote più compatta. Niente cambi strutturali.
 */
const ChiSiamoPage: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col pb-12 md:pb-24">
      <Helmet>
        <title>Chi Siamo | VV Dream Creations e Il Mondo di Tiko</title>
        <meta name="description" content="Conosci gli autori e l'illustratrice dietro Il Mondo di Tiko. La nostra missione è creare storie che ispirano e insegnano valori importanti." />
      </Helmet>

      <div className="container mx-auto px-4 pt-24 md:pt-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <p className="text-tiko-yellow font-mono text-[10px] md:text-xs tracking-widest uppercase mb-2 md:mb-3">
            Il Nostro Progetto
          </p>
          <h1 className="font-display font-bold text-white text-4xl md:text-7xl mb-4 md:mb-6 drop-shadow-lg leading-[1.05]">
            Chi Siamo
          </h1>
          <div className="flex justify-center mb-4 md:mb-6">
            <img
              src="/vv-dream-creations-logo.webp"
              alt="VV Dream Creations Logo"
              className="h-14 md:h-28 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto opacity-60" />
        </motion.div>

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-3xl mx-auto relative"
        >
          {/* Glow — solo desktop, su mobile pesa */}
          <div className="hidden md:block absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full blur-[80px] pointer-events-none opacity-20"
            style={{ background: '#FACC15' }} />

          <div
            className="relative rounded-3xl p-6 md:p-14"
            style={{
              background: 'linear-gradient(135deg, rgba(253,186,116,0.09) 0%, rgba(26,31,46,0.7) 60%, rgba(167,139,250,0.07) 100%)',
              border: '1px solid rgba(253,186,116,0.18)',
            }}
          >
            <div className="space-y-4 md:space-y-6 text-white/75 text-[14.5px] md:text-lg leading-relaxed">
              <p>
                <strong className="text-white font-semibold">VV Dream Creations</strong> è un progetto editoriale nato dal desiderio di dare voce alle emozioni e alla fantasia dei bambini, attraverso storie che uniscono valore educativo e incanto narrativo. Ogni libro nasce con l'intento di accompagnare i più piccoli nella scoperta di sé e del mondo, offrendo strumenti delicati per riconoscere, esprimere e comprendere le proprie emozioni.
              </p>

              <p>
                Le nostre pubblicazioni si distinguono per un linguaggio semplice e autentico, illustrato con cura e poesia. Ogni racconto è pensato per essere vissuto come un momento di relazione e condivisione, capace di avvicinare bambini e adulti in un dialogo fatto di ascolto, empatia e meraviglia.
              </p>

              <p>
                Crediamo che le storie possano essere{' '}
                <strong className="text-tiko-yellow">semi di crescita e di luce</strong>,
                capaci di educare senza moralizzare, di ispirare senza imporre. Per questo, in ogni libro di VV Dream Creations, la fantasia diventa uno strumento per conoscere se stessi, per imparare la gentilezza e per guardare la vita con occhi pieni di stupore.
              </p>

              <p>
                Con passione, sensibilità pedagogica e amore per la bellezza delle cose semplici, VV Dream Creations crea mondi narrativi che lasciano spazio all'immaginazione e al cuore.
              </p>
            </div>

            {/* Quote banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-7 md:mt-10 rounded-2xl p-5 md:p-6 text-center"
              style={{
                background: 'rgba(253,186,116,0.1)',
                border: '1px solid rgba(253,186,116,0.2)',
              }}
            >
              <Sparkles size={18} className="text-tiko-yellow mx-auto mb-2 md:mb-3 opacity-70" />
              <p className="font-display font-bold italic text-white/90 text-lg md:text-2xl leading-snug">
                "Ogni storia è un seme.<br />Ogni bambino, un giardino."
              </p>
              <p className="text-white/40 text-[10px] md:text-sm mt-2 md:mt-3 tracking-widest uppercase font-medium">
                VV Dream Creations
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ChiSiamoPage;
