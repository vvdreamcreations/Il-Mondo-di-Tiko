import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, Lightbulb } from 'lucide-react';
import emailjs from '@emailjs/browser';

const TopicSuggestionForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !topic.trim()) {
            alert('Per favore, compila almeno il nome e il tema.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Send email via EmailJS
            await emailjs.send(
                'service_gok0ss9',
                'template_bmbk3q7',
                {
                    from_name: name,
                    from_email: email || 'Non fornita',
                    topic_suggestion: topic,
                    to_name: 'Francesca',
                },
                'zbzh-uRIg2LLvbH1O'
            );

            // Show success message
            setShowSuccess(true);

            // Reset form
            setName('');
            setEmail('');
            setTopic('');

            // Hide success message after 5 seconds
            setTimeout(() => setShowSuccess(false), 5000);

        } catch (error) {
            console.error('Error sending suggestion:', error);
            alert('Si è verificato un errore. Riprova più tardi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="container mx-auto px-4 mt-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-tiko-yellow/20 to-tiko-orange/20 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-tiko-yellow/30 max-w-4xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Lightbulb className="text-tiko-yellow w-6 h-6 animate-pulse" />
                        <span className="font-bold uppercase tracking-widest text-sm text-white/80">Hai un'Idea?</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                        Suggerisci un Tema Personalizzato
                    </h3>
                    <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">
                        Vuoi suggerirci un tema particolare o che non è indicato tra le opzioni? Scrivici il tuo nome e il tema e ci verrà recapitato direttamente. Valutiamo accuratamente ogni richiesta!
                    </p>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6 p-4 rounded-xl bg-tiko-green/20 border border-tiko-green/40 backdrop-blur-sm"
                    >
                        <p className="text-white text-center font-medium">
                            ✨ Grazie! Il tuo suggerimento è stato inviato con successo. Lo valuteremo con attenzione!
                        </p>
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
                    {/* Name Field */}
                    <div>
                        <label className="block text-tiko-yellow font-bold mb-2 text-sm drop-shadow-md flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Nome <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Il tuo nome"
                            required
                            maxLength={100}
                            className="w-full px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-tiko-yellow/60 focus:border-tiko-yellow/50 transition-all placeholder:text-white/40 text-white font-medium"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-tiko-yellow font-bold mb-2 text-sm drop-shadow-md flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email (opzionale ma consigliata)
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="la.tua@email.it"
                            maxLength={150}
                            className="w-full px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-tiko-yellow/60 focus:border-tiko-yellow/50 transition-all placeholder:text-white/40 text-white font-medium"
                        />
                        <p className="text-white/60 text-xs mt-2">
                            Essenziale per essere ricontattato se verrà scelto il tuo tema!
                        </p>
                    </div>

                    {/* Topic Field */}
                    <div>
                        <label className="block text-tiko-yellow font-bold mb-2 text-sm drop-shadow-md flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" />
                            Tema Suggerito <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Es: Il coraggio, La pazienza, L'amicizia..."
                            required
                            maxLength={300}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-tiko-yellow/60 focus:border-tiko-yellow/50 transition-all placeholder:text-white/40 text-white font-medium resize-none"
                        />
                        <p className="text-white/60 text-xs mt-2">
                            Descrivi brevemente il tema emotivo che vorresti vedere in un libro di Tiko
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-tiko-yellow to-tiko-orange text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:shadow-[0_6px_30px_rgba(250,204,21,0.6)] hover:scale-105 transition-all transform flex items-center justify-center gap-2 text-lg border-2 border-tiko-yellow/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Invio in corso...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Invia Suggerimento
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </section>
    );
};

export default TopicSuggestionForm;
