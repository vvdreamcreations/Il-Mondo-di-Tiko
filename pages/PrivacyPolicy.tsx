import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Eye, Lock, Database, Globe, Clock, UserCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
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
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-tiko-blue/20 backdrop-blur-sm border border-tiko-blue/30">
                        <Shield className="w-5 h-5 text-tiko-blue" />
                        <span className="text-white/90 text-sm font-bold">PRIVACY POLICY</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                        Informativa sulla Privacy
                    </h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        La tua privacy è importante per noi. Questa policy spiega come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.
                    </p>
                    <p className="text-white/60 text-sm mt-4">
                        Ultimo aggiornamento: 18 Dicembre 2025
                    </p>
                </motion.div>
            </section>

            {/* Content */}
            <section className="container mx-auto px-4 pb-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 max-w-4xl mx-auto space-y-8"
                >

                    {/* 1. Titolare del Trattamento */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-yellow/20">
                                <UserCheck className="w-5 h-5 text-tiko-yellow" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">1. Titolare del Trattamento</h2>
                        </div>
                        <div className="text-white/90 space-y-2 pl-10">
                            <p><strong>Nome:</strong> VV Dream Creations</p>
                            <p><strong>Email:</strong> <a href="mailto:fra.selfpublishing@gmail.com" className="text-tiko-yellow hover:text-tiko-orange underline">fra.selfpublishing@gmail.com</a></p>
                        </div>
                    </div>

                    {/* 2. Dati Raccolti */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-blue/20">
                                <Database className="w-5 h-5 text-tiko-blue" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">2. Dati Raccolti e Finalità</h2>
                        </div>
                        <div className="text-white/90 space-y-4 pl-10">
                            <div>
                                <h3 className="font-bold text-white mb-2">2.1 Dati di navigazione (Google Analytics)</h3>
                                <ul className="list-disc list-inside space-y-1 text-white/80">
                                    <li>Indirizzo IP (anonimizzato)</li>
                                    <li>Tipo di browser e dispositivo</li>
                                    <li>Pagine visitate e durata della visita</li>
                                    <li>Interazioni con il sito (click, scroll, voti)</li>
                                </ul>
                                <p className="mt-2"><strong>Finalità:</strong> Analisi statistica del traffico e miglioramento dell'esperienza utente.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white mb-2">2.2 Dati forniti volontariamente</h3>
                                <ul className="list-disc list-inside space-y-1 text-white/80">
                                    <li><strong>Newsletter</strong>: Nome (opzionale) ed email</li>
                                    <li><strong>Suggerimenti temi</strong>: Nome, email (opzionale), testo suggerimento</li>
                                </ul>
                                <p className="mt-2"><strong>Finalità:</strong> Invio newsletter, gestione suggerimenti, comunicazioni relative ai servizi.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white mb-2">2.3 Dati tecnici (localStorage)</h3>
                                <ul className="list-disc list-inside space-y-1 text-white/80">
                                    <li>Preferenze cookie</li>
                                    <li>Stato voto sondaggio (prevenzione voti multipli)</li>
                                </ul>
                                <p className="mt-2"><strong>Finalità:</strong> Funzionamento tecnico del sito.</p>
                            </div>
                        </div>
                    </div>

                    {/* 3. Base Giuridica */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-green/20">
                                <Lock className="w-5 h-5 text-tiko-green" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">3. Base Giuridica del Trattamento</h2>
                        </div>
                        <div className="text-white/90 space-y-2 pl-10">
                            <ul className="list-disc list-inside space-y-1 text-white/80">
                                <li><strong>Consenso</strong> (Art. 6(1)(a) GDPR): Per cookie analytics e marketing</li>
                                <li><strong>Interesse legittimo</strong> (Art. 6(1)(f) GDPR): Per cookie tecnici essenziali</li>
                                <li><strong>Esecuzione contratto</strong> (Art. 6(1)(b) GDPR): Per servizi richiesti (newsletter)</li>
                            </ul>
                        </div>
                    </div>

                    {/* 4. Destinatari */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-orange/20">
                                <Globe className="w-5 h-5 text-tiko-orange" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">4. Destinatari dei Dati</h2>
                        </div>
                        <div className="text-white/90 space-y-3 pl-10">
                            <div>
                                <p className="font-bold text-white">I tuoi dati possono essere condivisi con:</p>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-white/80">
                                    <li><strong>Google Analytics</strong> ({' '}
                                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:underline">
                                            Privacy Policy
                                        </a>
                                        ): Per analisi statistiche</li>
                                    <li><strong>Brevo</strong> ({' '}
                                        <a href="https://www.brevo.com/it/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:underline">
                                            Privacy Policy
                                        </a>
                                        ): Per gestione newsletter</li>
                                    <li><strong>EmailJS</strong> ({' '}
                                        <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:underline">
                                            Privacy Policy
                                        </a>
                                        ): Per invio email suggerimenti</li>
                                </ul>
                            </div>
                            <p className="text-white/70 text-sm">
                                <strong>Nota:</strong> Questi servizi agiscono come responsabili del trattamento e possono trasferire dati extra-UE con garanzie adeguate (Standard Contractual Clauses).
                            </p>
                        </div>
                    </div>

                    {/* 5. Conservazione */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-blue/20">
                                <Clock className="w-5 h-5 text-tiko-blue" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">5. Periodo di Conservazione</h2>
                        </div>
                        <div className="text-white/90 pl-10">
                            <ul className="list-disc list-inside space-y-1 text-white/80">
                                <li><strong>Cookie Analytics</strong>: Fino a 2 anni o revoca consenso</li>
                                <li><strong>Email newsletter</strong>: Fino a disiscrizione</li>
                                <li><strong>Suggerimenti temi</strong>: Fino a cancellazione richiesta</li>
                                <li><strong>Preferenze cookie</strong>: 1 anno o cancellazione browser</li>
                            </ul>
                        </div>
                    </div>

                    {/* 6. Diritti */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-yellow/20">
                                <Eye className="w-5 h-5 text-tiko-yellow" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">6. I Tuoi Diritti GDPR</h2>
                        </div>
                        <div className="text-white/90 space-y-3 pl-10">
                            <p>Hai il diritto di:</p>
                            <ul className="list-disc list-inside space-y-1 text-white/80">
                                <li><strong>Accesso</strong>: Ottenere copia dei tuoi dati</li>
                                <li><strong>Rettifica</strong>: Correggere dati inesatti</li>
                                <li><strong>Cancellazione</strong>: Richiedere eliminazione dati</li>
                                <li><strong>Limitazione</strong>: Limitare il trattamento</li>
                                <li><strong>Portabilità</strong>: Ricevere dati in formato strutturato</li>
                                <li><strong>Opposizione</strong>: Opporsi al trattamento</li>
                                <li><strong>Revoca consenso</strong>: Revocare il consenso in qualsiasi momento</li>
                                <li><strong>Reclamo</strong>: Presentare reclamo al Garante Privacy</li>
                            </ul>
                            <p className="mt-4 text-white/90">
                                Per esercitare i tuoi diritti, contattaci a: <a href="mailto:fra.selfpublishing@gmail.com" className="text-tiko-yellow hover:underline">fra.selfpublishing@gmail.com</a>
                            </p>
                        </div>
                    </div>

                    {/* 7. Cookie */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-green/20">
                                <Shield className="w-5 h-5 text-tiko-green" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">7. Cookie e Tecnologie Simili</h2>
                        </div>
                        <div className="text-white/90 pl-10">
                            <p className="mb-2">
                                Utilizziamo cookie analytics e tecnici. Per informazioni dettagliate, consulta la nostra{' '}
                                <a href="/cookie-policy" className="text-tiko-yellow hover:underline">Cookie Policy</a>.
                            </p>
                            <p>
                                Puoi gestire le tue preferenze cookie dal banner o tramite il link nel footer.
                            </p>
                        </div>
                    </div>

                    {/* 8. Sicurezza */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-orange/20">
                                <Lock className="w-5 h-5 text-tiko-orange" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">8. Sicurezza dei Dati</h2>
                        </div>
                        <div className="text-white/90 pl-10">
                            <p>
                                Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati da accessi non autorizzati, perdita o distruzione, tra cui:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-white/80">
                                <li>Connessioni HTTPS crittografate</li>
                                <li>Anonimizzazione IP per Google Analytics</li>
                                <li>Accesso limitato ai dati personali</li>
                                <li>Backup regolari</li>
                            </ul>
                        </div>
                    </div>

                    {/* 9. Modifiche */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-blue/20">
                                <Mail className="w-5 h-5 text-tiko-blue" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">9. Modifiche alla Policy</h2>
                        </div>
                        <div className="text-white/90 pl-10">
                            <p>
                                Potremmo aggiornare questa Privacy Policy periodicamente. Ti informeremo di eventuali modifiche sostanziali tramite banner sul sito o email.
                            </p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                        <div className="bg-tiko-yellow/10 backdrop-blur-sm rounded-xl p-6 border border-tiko-yellow/30">
                            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-tiko-yellow" />
                                Domande o Dubbi?
                            </h3>
                            <p className="text-white/90">
                                Per qualsiasi domanda sulla nostra Privacy Policy o per esercitare i tuoi diritti, contattaci a:{' '}
                                <a href="mailto:fra.selfpublishing@gmail.com" className="text-tiko-yellow hover:underline font-bold">
                                    fra.selfpublishing@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>

                </motion.div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
