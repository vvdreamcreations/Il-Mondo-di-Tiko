import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const NewsletterPage: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col pb-24">
      <Helmet>
        <title>Newsletter | Resta aggiornato sul Mondo di Tiko</title>
        <meta name="description" content="Iscriviti alla newsletter per ricevere contenuti esclusivi, attività per bambini e anteprime sui nuovi libri." />
      </Helmet>

      <div className="container mx-auto px-4 pt-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
            style={{
              background: 'rgba(253,186,116,0.15)',
              border: '1px solid rgba(253,186,116,0.3)',
              color: '#FDE68A',
            }}
          >
            <Mail size={11} />
            Newsletter
          </div>
          <h1 className="font-display font-bold text-white text-5xl md:text-7xl mb-4 drop-shadow-lg">
            Entra nel<br />
            <span className="text-gradient-gold italic">Mondo di Tiko</span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Storie esclusive, anteprime e contenuti speciali direttamente nella tua email.
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto mt-8 opacity-60" />
        </motion.div>

        <Newsletter />
      </div>

      <Footer />
    </div>
  );
};

export default NewsletterPage;
