import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden perspective-1000">
      
      <div className="container mx-auto px-4 z-10 text-center relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Main Logo */}
          <motion.img 
            src="/il-mondo-di-tiko-logo.png" 
            alt="Il Mondo di Tiko Logo"
            className="w-48 md:w-64 h-auto mb-8 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            onError={(e) => {
                // If local logo is missing, hide image and use text (fallback)
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                    const fallback = document.createElement('h2');
                    fallback.innerText = "Il Mondo di Tiko";
                    fallback.className = "font-display font-bold text-5xl text-tiko-yellow mb-8 drop-shadow-md";
                    parent.insertBefore(fallback, e.currentTarget);
                }
            }}
          />

          <motion.div 
            className="inline-flex items-center gap-3 py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/40 text-white font-bold text-sm md:text-base mb-6 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            animate={{ 
                boxShadow: ["0 0 10px rgba(255,255,255,0.2)", "0 0 30px rgba(255,255,255,0.6)", "0 0 10px rgba(255,255,255,0.2)"],
                borderColor: ["rgba(255,255,255,0.4)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.4)"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles size={16} className="text-tiko-yellow" />
            <span className="tracking-widest uppercase">Benvenuti nel bosco magico</span>
            <Sparkles size={16} className="text-tiko-yellow" />
          </motion.div>
          
          <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
            Dove i sogni <br />
            <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-300% animate-gradient filter drop-shadow-[0_0_20px_rgba(255,165,0,0.5)]">
                    prendono vita
                </span>
                {/* Glow behind text */}
                <motion.span 
                    className="absolute inset-0 z-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 blur-2xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-medium drop-shadow-lg leading-relaxed tracking-wide"
        >
          Un piccolo scoiattolo curioso, gentile e pieno di sogni. <br className="hidden md:block"/>
          Tra alberi parlanti e magie inaspettate, Tiko vive avventure che parlano al cuore.
        </motion.p>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
        >
            <a 
                href="#books"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-tiko-yellow to-[#FF9900] text-tiko-dark px-12 py-5 rounded-full font-bold text-xl shadow-[0_0_40px_rgba(255,165,0,0.5)] hover:shadow-[0_0_60px_rgba(255,165,0,0.8)] hover:scale-105 transition-all duration-300 relative overflow-hidden group border-2 border-white/20"
            >
                <span className="relative z-10 flex items-center gap-2">
                    Scopri i Libri di Tiko
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </span>
                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm" />
            </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;