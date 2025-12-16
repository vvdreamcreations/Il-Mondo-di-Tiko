import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VALUES } from '../constants';
import { ValueItem } from '../types';
import { Rocket, Heart, Sprout, Palette, Plus, X, Sparkles } from 'lucide-react';

const iconMap = {
    Rocket: Rocket,
    Heart: Heart,
    Sprout: Sprout,
    Palette: Palette
};

const Values: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<ValueItem | null>(null);

    return (
        <section className="container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20"
            >
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        Perché i nostri libri conquistano<br />grandi e piccoli...
                    </h2>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto rounded-full shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {VALUES.map((value, index) => {
                        const Icon = iconMap[value.iconName as keyof typeof iconMap];
                        return (
                            <motion.div
                                key={value.id}
                                onClick={() => setSelectedValue(value)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    y: -12,
                                    scale: 1.03,
                                    boxShadow: "0 25px 50px -12px rgba(250, 204, 21, 0.4)",
                                    borderColor: "rgba(250, 204, 21, 0.5)"
                                }}
                                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/10 flex flex-col items-center text-center transition-colors duration-300 relative overflow-hidden group cursor-pointer"
                            >
                                {/* Hover Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-b from-tiko-yellow/10 to-tiko-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Top Accent Line */}
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-tiko-yellow to-tiko-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center shadow-[0_0_10px_rgba(250,204,21,0.6)]" />

                                <div className="relative z-10 w-20 h-20 rounded-2xl bg-tiko-yellow/20 backdrop-blur-sm flex items-center justify-center text-tiko-yellow mb-6 group-hover:bg-tiko-yellow group-hover:text-tiko-dark transition-colors duration-300 shadow-[0_4px_15px_rgba(250,204,21,0.2)] group-hover:shadow-[0_10px_30px_rgba(250,204,21,0.5)]">
                                    <Icon size={40} strokeWidth={2} className="transform group-hover:scale-110 transition-transform duration-300" />
                                </div>

                                <h3 className="relative z-10 font-display text-xl font-bold text-white mb-3 group-hover:text-tiko-yellow transition-colors drop-shadow-lg">
                                    {value.title}
                                </h3>

                                <p className="relative z-10 text-white/80 text-sm leading-relaxed mb-6 flex-grow font-medium drop-shadow-md">
                                    {value.description}
                                </p>

                                <div
                                    className="relative z-10 mt-auto px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-bold text-xs flex items-center gap-2 group-hover:bg-tiko-yellow group-hover:text-tiko-dark transition-all duration-300 border border-white/20 group-hover:border-tiko-yellow shadow-lg"
                                >
                                    <Plus size={14} />
                                    <span>Scopri di più</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Value Detail Modal */}
            <AnimatePresence>
                {selectedValue && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedValue(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col md:flex-row border border-white/50 max-h-[85vh] md:max-h-[80vh]"
                        >
                            <button
                                onClick={() => setSelectedValue(null)}
                                className="absolute top-4 right-4 z-50 bg-white/80 backdrop-blur text-gray-500 p-2 rounded-full hover:bg-gray-100 hover:text-red-500 transition-all shadow-lg"
                            >
                                <X size={24} />
                            </button>

                            {/* Image Section - Sticky on Desktop */}
                            <div className="w-full md:w-1/2 h-48 md:h-auto relative shrink-0">
                                <img
                                    src={selectedValue.image}
                                    alt={selectedValue.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                                    <h3 className="text-white font-display font-bold text-2xl drop-shadow-md">{selectedValue.title}</h3>
                                </div>
                            </div>

                            {/* Content Section - Scrollable */}
                            <div className="w-full md:w-1/2 flex flex-col bg-white relative h-full max-h-[60vh] md:max-h-full">
                                <div className="overflow-y-auto p-8 md:p-10 custom-scrollbar">
                                    <div className="hidden md:flex items-center gap-3 mb-6 text-tiko-orange sticky top-0 bg-white/95 backdrop-blur py-2 z-10">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                            {React.createElement(iconMap[selectedValue.iconName as keyof typeof iconMap], { size: 24 })}
                                        </div>
                                        <h3 className="font-display font-bold text-3xl text-tiko-dark">{selectedValue.title}</h3>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-gray-600 leading-relaxed text-lg font-medium">
                                            {selectedValue.description}
                                        </p>

                                        <hr className="border-gray-100" />

                                        <div className="bg-yellow-50/50 p-4 rounded-2xl border border-yellow-100">
                                            <h4 className="flex items-center gap-2 font-bold text-tiko-dark mb-3 uppercase tracking-wider text-sm">
                                                <Sparkles size={16} className="text-tiko-yellow" />
                                                Il beneficio per il bambino
                                            </h4>
                                            <p className="text-gray-600 leading-relaxed italic">
                                                {selectedValue.fullDescription}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 border-t border-gray-100 bg-white mt-auto">
                                    <button
                                        onClick={() => setSelectedValue(null)}
                                        className="w-full py-4 rounded-xl bg-tiko-dark text-white font-bold hover:bg-tiko-blue transition-colors duration-300 shadow-lg"
                                    >
                                        Chiudi
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Values;
