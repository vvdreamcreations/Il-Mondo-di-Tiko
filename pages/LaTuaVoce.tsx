import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Lightbulb, Vote, Sparkles } from 'lucide-react';
import TopicSurvey from '../components/TopicSurvey';
import TopicSuggestionForm from '../components/TopicSuggestionForm';
import Footer from '../components/Footer';

const LaTuaVoce: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-32 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-tiko-yellow/20 backdrop-blur-sm border border-tiko-yellow/30">
                        <Heart className="w-5 h-5 text-tiko-yellow" />
                        <span className="text-white/90 text-sm font-bold">LA TUA VOCE</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                        Il Tuo Parere Guida le Nostre Storie
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Le tue opinioni e le tue idee sono preziose per noi! Partecipa attivamente nella creazione delle nuove avventure di Tiko votando il tema che preferisci o suggerendocene uno nuovo.
                    </p>

                    {/* Tiko Greeting Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-8 flex justify-center"
                    >
                        <img
                            src="/tiko-saluta.png"
                            alt="Tiko che saluta"
                            className="h-48 md:h-64 w-auto object-contain drop-shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:scale-105 transition-transform duration-300"
                        />
                    </motion.div>
                </motion.div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-tiko-blue/30"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-full bg-tiko-blue/20">
                                <Vote className="w-5 h-5 text-tiko-blue" />
                            </div>
                            <h3 className="font-bold text-white text-lg">Vota il Tema</h3>
                        </div>
                        <p className="text-white/80 text-sm">
                            Scegli quale tema emotivo vorresti vedere nel prossimo libro di Tiko. Il tuo voto conta davvero!
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-tiko-orange/30"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-full bg-tiko-orange/20">
                                <Lightbulb className="w-5 h-5 text-tiko-orange" />
                            </div>
                            <h3 className="font-bold text-white text-lg">Suggerisci un'Idea</h3>
                        </div>
                        <p className="text-white/80 text-sm">
                            Hai un tema particolare in mente? Condividilo con noi! Valutiamo accuratamente ogni suggerimento.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Survey Section */}
            <section className="mb-24">
                <TopicSurvey />
            </section>

            {/* Suggestion Form Section */}
            <section className="mb-24">
                <TopicSuggestionForm />
            </section>

            {/* Closing Message */}
            <section className="container mx-auto px-4 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-r from-tiko-yellow/20 to-tiko-orange/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-tiko-yellow/30"
                >
                    <Sparkles className="w-12 h-12 text-tiko-yellow mx-auto mb-4" />
                    <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4">
                        Grazie per la Tua Partecipazione!
                    </h2>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto">
                        Ogni voce è importante e contribuisce a rendere le storie di Tiko sempre più speciali e vicine al cuore dei bambini.
                    </p>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default LaTuaVoce;
