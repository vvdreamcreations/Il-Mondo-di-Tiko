import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Settings, Info, ExternalLink } from 'lucide-react';

const CookiePolicy: React.FC = () => {
    const openCookieSettings = () => {
        // Force cookie banner to reappear
        localStorage.removeItem('cookieConsent');
        window.location.reload();
    };

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
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-tiko-orange/20 backdrop-blur-sm border border-tiko-orange/30">
                        <Cookie className="w-5 h-5 text-tiko-orange" />
                        <span className="text-white/90 text-sm font-bold">COOKIE POLICY</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                        Informativa sui Cookie
                    </h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        Questa policy spiega cosa sono i cookie, come li utilizziamo e come puoi gestirli.
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
                    className="bg-white/10 backdrop-blur-xl rough-edges-shadow p-8 md:p-12 border border-white/20 max-w-4xl mx-auto space-y-8"
                >

                    {/* 1. Cosa sono i cookie */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-yellow/20">
                                <Info className="w-5 h-5 text-tiko-yellow" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">1. Cosa Sono i Cookie?</h2>
                        </div>
                        <div className="text-white/90 pl-10 space-y-3">
                            <p>
                                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. Servono a migliorare l'esperienza di navigazione, ricordare le tue preferenze e aiutarci a capire come viene utilizzato il sito.
                            </p>
                            <p className="text-white/70 text-sm">
                                I cookie possono essere "di sessione" (eliminati alla chiusura del browser) o "permanenti" (rimangono fino alla scadenza o cancellazione manuale).
                            </p>
                        </div>
                    </div>

                    {/* 2. Cookie utilizzati */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-blue/20">
                                <Cookie className="w-5 h-5 text-tiko-blue" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">2. Cookie Utilizzati dal Sito</h2>
                        </div>
                        <div className="pl-10 space-y-6">

                            {/* Cookie Tecnici */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                <h3 className="font-bold text-tiko-green mb-3 flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    Cookie Strettamente Necessari (Tecnici)
                                </h3>
                                <p className="text-white/80 text-sm mb-4">
                                    Essenziali per il funzionamento del sito. Non richiedono consenso.
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-white/10">
                                            <tr className="text-white">
                                                <th className="text-left p-2">Nome</th>
                                                <th className="text-left p-2">Scopo</th>
                                                <th className="text-left p-2">Durata</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-white/80">
                                            <tr className="border-t border-white/10">
                                                <td className="p-2 font-mono text-xs">cookieConsent</td>
                                                <td className="p-2">Memorizza le tue preferenze cookie</td>
                                                <td className="p-2">1 anno</td>
                                            </tr>
                                            <tr className="border-t border-white/10">
                                                <td className="p-2 font-mono text-xs">hasVotedTopic</td>
                                                <td className="p-2">Previene voti multipli nel sondaggio</td>
                                                <td className="p-2">Permanente</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Cookie Analytics */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                <h3 className="font-bold text-tiko-blue mb-3 flex items-center gap-2">
                                    <Settings className="w-5 h-5" />
                                    Cookie Analitici
                                </h3>
                                <p className="text-white/80 text-sm mb-4">
                                    Ci aiutano a capire come i visitatori utilizzano il sito. <strong>Richiedono consenso.</strong>
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-white/10">
                                            <tr className="text-white">
                                                <th className="text-left p-2">Nome</th>
                                                <th className="text-left p-2">Fornitore</th>
                                                <th className="text-left p-2">Scopo</th>
                                                <th className="text-left p-2">Durata</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-white/80">
                                            <tr className="border-t border-white/10">
                                                <td className="p-2 font-mono text-xs">_ga</td>
                                                <td className="p-2">Google</td>
                                                <td className="p-2">Distingue utenti unici</td>
                                                <td className="p-2">2 anni</td>
                                            </tr>
                                            <tr className="border-t border-white/10">
                                                <td className="p-2 font-mono text-xs">_ga_*</td>
                                                <td className="p-2">Google</td>
                                                <td className="p-2">Stato sessione Analytics</td>
                                                <td className="p-2">2 anni</td>
                                            </tr>
                                            <tr className="border-t border-white/10">
                                                <td className="p-2 font-mono text-xs">_gid</td>
                                                <td className="p-2">Google</td>
                                                <td className="p-2">Distingue utenti</td>
                                                <td className="p-2">24 ore</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-white/60 text-xs mt-3">
                                    <strong>Nota:</strong> Google Analytics utilizza IP anonimizzati in conformità al GDPR.
                                </p>
                            </div>

                            {/* Cookie Marketing */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                <h3 className="font-bold text-tiko-orange mb-3 flex items-center gap-2">
                                    <ExternalLink className="w-5 h-5" />
                                    Cookie di Marketing
                                </h3>
                                <p className="text-white/80 text-sm mb-4">
                                    Per newsletter e comunicazioni personalizzate. <strong>Richiedono consenso.</strong>
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-white/10">
                                            <tr className="text-white">
                                                <th className="text-left p-2">Servizio</th>
                                                <th className="text-left p-2">Fornitore</th>
                                                <th className="text-left p-2">Scopo</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-white/80">
                                            <tr className="border-t border-white/10">
                                                <td className="p-2">Brevo</td>
                                                <td className="p-2">Brevo (ex Sendinblue)</td>
                                                <td className="p-2">Gestione newsletter e comunicazioni</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 3. Come gestire i cookie */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-green/20">
                                <Settings className="w-5 h-5 text-tiko-green" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">3. Come Gestire i Cookie</h2>
                        </div>
                        <div className="text-white/90 pl-10 space-y-4">

                            <div>
                                <h3 className="font-bold text-white mb-2">3.1 Tramite il Nostro Banner</h3>
                                <p className="text-white/80 mb-3">
                                    Puoi modificare le tue preferenze in qualsiasi momento cliccando sul pulsante qui sotto o tramite il link "Gestisci Cookie" nel footer del sito.
                                </p>
                                <button
                                    onClick={openCookieSettings}
                                    className="bg-gradient-to-r from-tiko-yellow to-tiko-orange text-white font-bold py-3 px-6 rounded-xl shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:shadow-[0_6px_30px_rgba(250,204,21,0.6)] hover:scale-105 transition-all inline-flex items-center gap-2"
                                >
                                    <Settings className="w-5 h-5" />
                                    Gestisci Preferenze Cookie
                                </button>
                            </div>

                            <div>
                                <h3 className="font-bold text-white mb-2">3.2 Tramite il Tuo Browser</h3>
                                <p className="text-white/80 mb-3">
                                    Puoi anche gestire o eliminare i cookie tramite le impostazioni del tuo browser:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-white/70 text-sm">
                                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:underline">Chrome</a></li>
                                    <li><a href="https://support.mozilla.org/it/kb/Eliminare%20i%20cookie" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:underline">Firefox</a></li>
                                    <li><a href="https://support.apple.com/it-it/HT201265" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:underline">Safari</a></li>
                                    <li><a href="https://support.microsoft.com/it-it/windows/eliminare-e-gestire-i-cookie-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:underline">Edge</a></li>
                                </ul>
                                <p className="text-white/60 text-xs mt-3">
                                    <strong>Nota:</strong> Disabilitare i cookie potrebbe limitare alcune funzionalità del sito.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* 4. Collegamenti */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-tiko-blue/20">
                                <ExternalLink className="w-5 h-5 text-tiko-blue" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white">4. Informazioni Aggiuntive</h2>
                        </div>
                        <div className="text-white/90 pl-10 space-y-3">
                            <p>Per maggiori informazioni sulla privacy e i tuoi diritti, consulta:</p>
                            <ul className="list-disc list-inside space-y-1 text-white/80">
                                <li>
                                    <a href="/privacy-policy" className="text-tiko-yellow hover:underline">Privacy Policy</a> - Informativa completa sul trattamento dei dati
                                </li>
                                <li>
                                    <a href="https://www.garanteprivacy.it/cookie" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:underline inline-flex items-center gap-1">
                                        Garante Privacy - Linee guida cookie <ExternalLink className="w-3 h-3" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                        <div className="bg-tiko-orange/10 backdrop-blur-sm rounded-xl p-6 border border-tiko-orange/30">
                            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-tiko-orange" />
                                Domande?
                            </h3>
                            <p className="text-white/90">
                                Per qualsiasi domanda sui cookie o sulle nostre politiche, contattaci a:{' '}
                                <a href="mailto:info@vvdreamcreations.it" className="text-tiko-yellow hover:underline font-bold">
                                    info@vvdreamcreations.it
                                </a>
                            </p>
                        </div>
                    </div>

                </motion.div>
            </section>
        </div>
    );
};

export default CookiePolicy;
