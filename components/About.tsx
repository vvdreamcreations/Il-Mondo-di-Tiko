import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
        className="bg-white/20 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white/50 overflow-hidden relative"
      >
        {/* Liquid Glass Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Image Side - Tiko Character */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Quote Banner - Above Tiko */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-6 rounded-2xl shadow-xl max-w-md border border-tiko-orange/20 rotate-1"
            >
              <p className="font-handwriting text-tiko-dark font-bold text-lg italic text-center">"Ogni storia è un piccolo seme di meraviglia."</p>
            </motion.div>

            <div className="relative group w-full max-w-md">
              {/* Soft glow background for the character */}
              <div className="absolute inset-0 bg-tiko-yellow/30 blur-3xl rounded-full transform scale-75" />

              <img
                src="/tiko-mascot.webp"
                srcSet="/tiko-mascot-mobile.webp 550w, /tiko-mascot.webp 600w"
                sizes="(max-width: 768px) 550px, 600px"
                alt="Tiko lo Scoiattolo - Mascotte"
                width="600"
                height="600"
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Text Side with Opaque Background */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {/* Opaque container for text readability */}
            <div className="bg-gradient-to-br from-amber-50/95 to-orange-50/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg relative z-10 border-2 border-tiko-yellow/30">
              <span className="text-tiko-orange font-bold uppercase tracking-widest text-sm mb-2 block">Chi Siamo</span>
              {/* VV Dream Creations Logo */}
              <div className="mb-6">
                <img
                  src="/vv-dream-creations-logo.webp"
                  alt="VV Dream Creations"
                  className="h-16 md:h-20 w-auto object-contain"
                  loading="lazy"
                />
              </div>

              {/* Tagline with site theme colors */}
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tiko-yellow via-tiko-orange to-amber-600">Dare voce alle emozioni</span>
              </h2>

              <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-medium">
                <p>
                  VV Dream Creations è un progetto editoriale nato dal desiderio di dare voce alle emozioni e alla fantasia dei bambini. Crediamo che le storie siano semi di crescita e di luce, capaci di educare senza moralizzare e di ispirare senza imporre.
                </p>
                <p>
                  Le nostre pubblicazioni uniscono valore educativo e incanto narrativo: un linguaggio semplice e autentico, illustrato con cura e poesia.
                </p>
                <div className="bg-orange-50 border-l-4 border-tiko-orange p-6 rounded-r-xl">
                  <p className="font-bold text-tiko-dark">
                    La nostra missione? Creare mondi narrativi che lasciano spazio all'immaginazione e al cuore, avvicinando bambini e adulti in un dialogo fatto di ascolto, empatia e meraviglia.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default About;


