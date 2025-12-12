import React from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Newsletter: React.FC = () => {
  return (
    <section className="container mx-auto px-4">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-tiko-blue/90 to-purple-400/90 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-2xl flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto border border-white/30"
        >
          
          <div className="lg:w-1/2 text-center lg:text-left text-white">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <Sparkles size={20} className="text-tiko-yellow animate-pulse" />
                <span className="font-bold uppercase tracking-widest text-sm text-white/80">Iscriviti</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
              Un regalo speciale <br/>ti aspetta!
            </h2>
            <p className="text-white/90 text-lg mb-6 font-medium leading-relaxed">
              Iscriviti alla newsletter per entrare nel mondo di Tiko. Ricevi subito un contenuto esclusivo e rimani aggiornato sulle nuove magie in arrivo.
            </p>
          </div>

          <div className="lg:w-1/2 w-full">
            <form className="flex flex-col gap-4 bg-white/20 p-6 rounded-3xl border border-white/20 shadow-inner" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Il tuo nome" 
                className="w-full px-6 py-4 rounded-xl bg-white/90 border border-transparent focus:outline-none focus:ring-4 focus:ring-tiko-yellow/50 transition-all placeholder:text-gray-400 text-tiko-dark"
              />
              <input 
                type="email" 
                placeholder="La tua email magica" 
                className="w-full px-6 py-4 rounded-xl bg-white/90 border border-transparent focus:outline-none focus:ring-4 focus:ring-tiko-yellow/50 transition-all placeholder:text-gray-400 text-tiko-dark"
              />
              <button className="w-full bg-tiko-yellow text-tiko-dark font-bold py-4 rounded-xl shadow-lg hover:bg-white hover:text-tiko-blue transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg">
                <Mail size={22} />
                Voglio il mio regalo!
              </button>
              <p className="text-xs text-white/70 text-center mt-2">
                Niente spam, solo magia. Promesso.
              </p>
            </form>
          </div>

        </motion.div>
    </section>
  );
};

export default Newsletter;