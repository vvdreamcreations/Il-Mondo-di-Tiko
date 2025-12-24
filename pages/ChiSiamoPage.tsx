import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const ChiSiamoPage: React.FC = () => {
    return (
        <div className="flex-grow flex flex-col pb-24">
            <Helmet>
                <title>Chi Siamo | VV Dream Creations e Il Mondo di Tiko</title>
                <meta name="description" content="Conosci gli autori e l'illustratrice dietro Il Mondo di Tiko. La nostra missione è creare storie che ispirano e insegnano valori importanti." />
            </Helmet>
            <div className="container mx-auto px-4 pt-32">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        Chi Siamo
                    </h1>
                    <div className="flex justify-center mb-8">
                        <img
                            src="/vv-dream-creations-logo.webp"
                            alt="VV Dream Creations Logo"
                            className="h-20 md:h-28 lg:h-32 w-auto object-contain hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto rounded-full mt-8 shadow-[0_0_20px_rgba(253,186,116,0.6)]" />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white/10 backdrop-blur-2xl leaf-edges-shadow p-8 md:p-16 border border-white/20">
                        <div className="space-y-6 text-white/90 text-lg leading-relaxed">
                            <p className="drop-shadow-md">
                                <strong className="text-white font-semibold">VV Dream Creations</strong> è un progetto editoriale nato dal desiderio di dare voce alle emozioni e alla fantasia dei bambini, attraverso storie che uniscono valore educativo e incanto narrativo. Ogni libro nasce con l'intento di accompagnare i più piccoli nella scoperta di sé e del mondo, offrendo strumenti delicati per riconoscere, esprimere e comprendere le proprie emozioni.
                            </p>

                            <p className="drop-shadow-md">
                                Le nostre pubblicazioni si distinguono per un linguaggio semplice e autentico, illustrato con cura e poesia. Ogni racconto è pensato per essere vissuto come un momento di relazione e condivisione, capace di avvicinare bambini e adulti in un dialogo fatto di ascolto, empatia e meraviglia.
                            </p>

                            <p className="drop-shadow-md">
                                Crediamo che le storie possano essere <strong className="text-tiko-yellow">semi di crescita e di luce</strong>, capaci di educare senza moralizzare, di ispirare senza imporre. Per questo, in ogni libro di VV Dream Creations, la fantasia diventa uno strumento per conoscere se stessi, per imparare la gentilezza e per guardare la vita con occhi pieni di stupore.
                            </p>

                            <p className="drop-shadow-md">
                                Con passione, sensibilità pedagogica e amore per la bellezza delle cose semplici, VV Dream Creations crea mondi narrativi che lasciano spazio all'immaginazione e al cuore.
                            </p>
                        </div>

                        {/* Decorative Element */}
                        <div className="mt-12 flex justify-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-tiko-yellow/30 to-tiko-orange/30 backdrop-blur-xl border-2 border-white/30 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                                <span className="text-5xl">💛</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default ChiSiamoPage;

