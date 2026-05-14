import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

/**
 * GalleryPage — densità mobile (Step 2)
 * Solo riduzione di padding/typo nell'header. Il grosso del lavoro mobile
 * è dentro <Gallery /> (filter chips + masonry V3).
 */
const GalleryPage: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col">
      <Helmet>
        <title>Gallery | Illustrazioni e Momenti Magici di Tiko</title>
        <meta name="description" content="Guarda le illustrazioni originali e i momenti più belli tratti dai libri di Tiko. Un viaggio visivo nel mondo della magia." />
      </Helmet>

      <div className="pt-24 md:pt-32 pb-6 md:pb-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-7 md:mb-12 px-4"
        >
          <p className="text-tiko-yellow font-mono text-[10px] md:text-xs tracking-widest uppercase mb-2 md:mb-3">
            Illustrazioni
          </p>
          <h1 className="font-display font-bold text-white text-4xl md:text-7xl mb-2 md:mb-4 drop-shadow-lg leading-[1.05]">
            La Gallery
          </h1>
          <p className="text-white/55 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
            Un viaggio visivo tra le illustrazioni originali del mondo di Tiko.
          </p>
          <div className="hidden md:block h-px w-24 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto mt-8 opacity-60" />
        </motion.div>

        <Gallery />
      </div>

      <Footer />
    </div>
  );
};

export default GalleryPage;
