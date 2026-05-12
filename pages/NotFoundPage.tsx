import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, TreePine } from 'lucide-react';
import Footer from '../components/Footer';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Pagina non trovata | Il Mondo di Tiko</title>
      </Helmet>

      <div className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 flex justify-center">
            <div className="p-5 rounded-full" style={{ background: 'rgba(253,186,116,0.12)', border: '1px solid rgba(253,186,116,0.25)' }}>
              <TreePine size={48} style={{ color: '#FBBF24' }} />
            </div>
          </div>

          <p className="text-tiko-yellow font-mono text-xs tracking-widest uppercase mb-3">Errore 404</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Pagina non trovata
          </h1>
          <p className="text-white/55 text-lg max-w-md mx-auto mb-10">
            Sembra che Tiko si sia perso nel bosco. Torna alla home e ricomincia l'avventura!
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 font-bold py-3 px-8 rounded-xl transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(to right, #FACC15, #FB923C)',
              boxShadow: '0 4px 20px rgba(250,204,21,0.4)',
              color: '#1A1F2E',
            }}
          >
            <Home size={18} />
            Torna alla Home
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
