import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white/40 overflow-hidden"
      >
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            
            {/* Image Side - Tiko Character */}
            <motion.div 
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative group w-full max-w-md">
                {/* Soft glow background for the character */}
                <div className="absolute inset-0 bg-tiko-yellow/30 blur-3xl rounded-full transform scale-75" />
                
                <img 
                  src="/tiko-mascot.png" 
                  alt="Tiko lo Scoiattolo - Mascotte" 
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute bottom-10 -right-4 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block border border-tiko-orange/20 rotate-2">
                   <p className="font-handwriting text-tiko-dark font-bold text-lg italic">"Ogni storia è un piccolo seme di meraviglia."</p>
                </div>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-tiko-orange font-bold uppercase tracking-widest text-sm mb-2 block">Chi Siamo</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-tiko-dark mb-8 leading-tight">
                VV Dream Creations: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tiko-blue to-purple-500">Dare voce alle emozioni</span>
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-medium">
                <p>
                  VV Dream Creations è un progetto editoriale nato dal desiderio di dare voce alle emozioni e alla fantasia dei bambini. Crediamo che le storie siano semi di crescita e di luce, capaci di educare senza moralizzare e di ispirare senza imporre.
                </p>
                <p>
                  Le nostre pubblicazioni uniscono valore educativo e incanto narrativo: un linguaggio semplice e autentico, illustrato con cura e poesia.
                </p>
                <div className="bg-orange-50/50 border-l-4 border-tiko-orange p-6 rounded-r-xl">
                  <p className="font-bold text-tiko-dark">
                    La nostra missione? Creare mondi narrativi che lasciano spazio all'immaginazione e al cuore, avvicinando bambini e adulti in un dialogo fatto di ascolto, empatia e meraviglia.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
      </motion.div>
    </section>
  );
};

export default About;