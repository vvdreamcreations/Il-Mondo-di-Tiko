import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="flex-grow flex flex-col pb-24">
            <div className="container mx-auto px-4 pt-32">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        Privacy Policy
                    </h1>
                    <p className="text-white/80 text-lg drop-shadow-md">
                        Ultimo aggiornamento: 12 ottobre 2025
                    </p>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-tiko-yellow to-tiko-orange mx-auto rounded-full mt-8 shadow-[0_0_20px_rgba(253,186,116,0.6)]" />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20">
                        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-white/90">
                            {/* Intro */}
                            <p className="text-lg leading-relaxed drop-shadow-md">
                                VV Dream Creations si impegna a tutelare la privacy dei propri utenti nel rispetto del Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679) e della normativa italiana vigente.
                            </p>
                            <p className="text-lg leading-relaxed drop-shadow-md">
                                Questa informativa descrive come raccogliamo, utilizziamo e proteggiamo i dati personali degli utenti che visitano questo sito web e si iscrivono alla nostra newsletter.
                            </p>

                            {/* 1. Titolare del Trattamento */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    1. Titolare del Trattamento
                                </h2>
                                <p className="drop-shadow-md">
                                    <strong className="text-tiko-yellow">Titolare del Trattamento dei Dati:</strong> VV Dream Creations<br />
                                    <strong className="text-tiko-yellow">Email di contatto:</strong> <a href="mailto:info@vvdreamcreations.it" className="text-tiko-yellow hover:text-tiko-orange transition-colors underline">info@vvdreamcreations.it</a>
                                </p>
                            </section>

                            {/* 2. Dati Raccolti */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    2. Dati Raccolti
                                </h2>

                                <h3 className="font-display text-2xl font-semibold text-tiko-yellow mb-3 drop-shadow-md">
                                    2.1 Dati forniti volontariamente dall'utente
                                </h3>
                                <p className="drop-shadow-md mb-4">
                                    Quando ti iscrivi alla nostra newsletter, raccogliamo i seguenti dati personali:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li className="drop-shadow-md">Nome (facoltativo)</li>
                                    <li className="drop-shadow-md">Indirizzo email (obbligatorio)</li>
                                </ul>
                                <p className="drop-shadow-md">
                                    Il conferimento di questi dati è facoltativo, ma necessario per ricevere la newsletter. Il rifiuto comporta l'impossibilità di iscriversi al servizio.
                                </p>

                                <h3 className="font-display text-2xl font-semibold text-tiko-yellow mb-3 mt-6 drop-shadow-md">
                                    2.2 Dati di navigazione
                                </h3>
                                <p className="drop-shadow-md mb-4">
                                    Durante la navigazione sul sito, vengono raccolti automaticamente alcuni dati tecnici, tra cui:
                                </p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li className="drop-shadow-md">Indirizzo IP</li>
                                    <li className="drop-shadow-md">Tipo di browser utilizzato</li>
                                    <li className="drop-shadow-md">Sistema operativo</li>
                                    <li className="drop-shadow-md">Pagine visitate</li>
                                    <li className="drop-shadow-md">Data e ora di accesso</li>
                                </ul>
                                <p className="drop-shadow-md mt-4">
                                    Questi dati sono raccolti esclusivamente per finalità tecniche e statistiche anonime.
                                </p>
                            </section>

                            {/* 3. Finalità e Base Giuridica */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    3. Finalità e Base Giuridica del Trattamento
                                </h2>
                                <p className="drop-shadow-md mb-4">
                                    I dati personali raccolti vengono utilizzati esclusivamente per le seguenti finalità:
                                </p>

                                <h3 className="font-display text-2xl font-semibold text-tiko-yellow mb-3 drop-shadow-md">
                                    3.1 Invio della newsletter
                                </h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li className="drop-shadow-md"><strong>Finalità:</strong> Invio di newsletter contenenti aggiornamenti su nuovi libri, contenuti esclusivi, anteprime e iniziative editoriali</li>
                                    <li className="drop-shadow-md"><strong>Base giuridica:</strong> Consenso esplicito dell'interessato (art. 6, comma 1, lett. a) del GDPR)</li>
                                    <li className="drop-shadow-md"><strong>Durata:</strong> I dati saranno conservati fino alla revoca del consenso o alla cancellazione dell'iscrizione</li>
                                </ul>

                                <h3 className="font-display text-2xl font-semibold text-tiko-yellow mb-3 mt-6 drop-shadow-md">
                                    3.2 Gestione tecnica del sito
                                </h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li className="drop-shadow-md"><strong>Finalità:</strong> Garantire il corretto funzionamento del sito web</li>
                                    <li className="drop-shadow-md"><strong>Base giuridica:</strong> Legittimo interesse del titolare (art. 6, comma 1, lett. f) del GDPR)</li>
                                </ul>
                            </section>

                            {/* 4. Modalità di Trattamento */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    4. Modalità di Trattamento
                                </h2>
                                <p className="drop-shadow-md">
                                    I dati personali sono trattati con strumenti elettronici e informatici, nel rispetto delle misure di sicurezza previste dal GDPR per prevenire la perdita, l'uso illecito o non corretto e gli accessi non autorizzati.
                                </p>
                                <p className="drop-shadow-md mt-4">
                                    Non vengono utilizzati processi decisionali automatizzati né attività di profilazione.
                                </p>
                            </section>

                            {/* 5. Comunicazione e Diffusione */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    5. Comunicazione e Diffusione dei Dati
                                </h2>
                                <p className="drop-shadow-md mb-4">
                                    I dati personali non verranno mai venduti, ceduti o condivisi con terzi per finalità commerciali.
                                </p>
                                <p className="drop-shadow-md mb-4">
                                    I dati possono essere comunicati esclusivamente a:
                                </p>

                                <h3 className="font-display text-2xl font-semibold text-tiko-yellow mb-3 drop-shadow-md">
                                    5.1 Brevo (Sendinblue)
                                </h3>
                                <p className="drop-shadow-md mb-4">
                                    Per la gestione tecnica della newsletter utilizziamo la piattaforma Brevo (ex Sendinblue), con sede nell'Unione Europea, che agisce come Responsabile del Trattamento ai sensi dell'art. 28 del GDPR.
                                </p>
                                <p className="drop-shadow-md mb-2">I dati trattati da Brevo sono:</p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li className="drop-shadow-md">Nome (se fornito)</li>
                                    <li className="drop-shadow-md">Email</li>
                                    <li className="drop-shadow-md">Data e ora di iscrizione</li>
                                    <li className="drop-shadow-md">Statistiche di apertura e clic (anonimizzate)</li>
                                </ul>
                                <p className="drop-shadow-md">
                                    Per maggiori informazioni sulla privacy di Brevo: <a href="https://www.brevo.com/it/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:text-tiko-orange transition-colors underline">https://www.brevo.com/it/legal/privacypolicy/</a>
                                </p>

                                <h3 className="font-display text-2xl font-semibold text-tiko-yellow mb-3 mt-6 drop-shadow-md">
                                    5.2 Amazon
                                </h3>
                                <p className="drop-shadow-md">
                                    Il sito contiene link ai libri pubblicati su Amazon.it. Quando clicchi su questi link, verrai reindirizzato al sito di Amazon, che gestisce autonomamente i dati secondo la propria Privacy Policy: <a href="https://www.amazon.it/gp/help/customer/display.html?nodeId=201909010" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:text-tiko-orange transition-colors underline">Amazon Privacy Policy</a>
                                </p>
                                <p className="drop-shadow-md mt-4">
                                    I dati non vengono trasferiti al di fuori dell'Unione Europea.
                                </p>
                            </section>

                            {/* 6. Diritti dell'Interessato */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    6. Diritti dell'Interessato
                                </h2>
                                <p className="drop-shadow-md mb-4">
                                    In qualsiasi momento puoi esercitare i seguenti diritti previsti dal GDPR:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li className="drop-shadow-md">Diritto di accesso (art. 15): conoscere quali dati personali sono trattati</li>
                                    <li className="drop-shadow-md">Diritto di rettifica (art. 16): correggere dati inesatti o incompleti</li>
                                    <li className="drop-shadow-md">Diritto di cancellazione (art. 17): richiedere la cancellazione dei tuoi dati</li>
                                    <li className="drop-shadow-md">Diritto di limitazione (art. 18): limitare il trattamento dei dati</li>
                                    <li className="drop-shadow-md">Diritto di opposizione (art. 21): opporsi al trattamento</li>
                                    <li className="drop-shadow-md">Diritto alla portabilità (art. 20): ricevere i dati in formato strutturato</li>
                                    <li className="drop-shadow-md">Diritto di revoca del consenso (art. 7): revocare il consenso in qualsiasi momento</li>
                                </ul>

                                <h3 className="font-display text-2xl font-semibold text-tiko-yellow mb-3 drop-shadow-md">
                                    Come esercitare i diritti
                                </h3>
                                <p className="drop-shadow-md mb-2">
                                    Puoi esercitare i tuoi diritti in due modi:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li className="drop-shadow-md">Per la newsletter: Clicca sul link "Annulla iscrizione" presente in fondo a ogni newsletter ricevuta</li>
                                    <li className="drop-shadow-md">Per richieste generali: Invia un'email a <a href="mailto:info@vvdreamcreations.it" className="text-tiko-yellow hover:text-tiko-orange transition-colors underline">info@vvdreamcreations.it</a> con oggetto "Richiesta GDPR"</li>
                                </ul>
                                <p className="drop-shadow-md">
                                    Risponderemo alla tua richiesta entro 30 giorni.
                                </p>
                            </section>

                            {/* 7. Durata della Conservazione */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    7. Durata della Conservazione dei Dati
                                </h2>
                                <p className="drop-shadow-md mb-2">
                                    I dati personali raccolti per l'invio della newsletter saranno conservati fino a:
                                </p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li className="drop-shadow-md">Revoca del consenso da parte dell'utente</li>
                                    <li className="drop-shadow-md">Cancellazione volontaria dell'iscrizione</li>
                                    <li className="drop-shadow-md">Richiesta di cancellazione inviata al Titolare</li>
                                </ul>
                            </section>

                            {/* 8. Sicurezza */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    8. Sicurezza dei Dati
                                </h2>
                                <p className="drop-shadow-md mb-2">
                                    VV Dream Creations adotta misure tecniche e organizzative adeguate per proteggere i dati personali da:
                                </p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li className="drop-shadow-md">Accessi non autorizzati</li>
                                    <li className="drop-shadow-md">Perdita accidentale</li>
                                    <li className="drop-shadow-md">Distruzione o danneggiamento</li>
                                    <li className="drop-shadow-md">Uso illecito o non conforme</li>
                                </ul>
                            </section>

                            {/* 9. Cookie */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    9. Cookie
                                </h2>
                                <p className="drop-shadow-md">
                                    Questo sito non utilizza cookie di profilazione o cookie di terze parti per finalità pubblicitarie.
                                </p>
                                <p className="drop-shadow-md mt-4">
                                    Potrebbero essere utilizzati esclusivamente cookie tecnici necessari al funzionamento del sito.
                                </p>
                            </section>

                            {/* 10. Modifiche */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    10. Modifiche alla Privacy Policy
                                </h2>
                                <p className="drop-shadow-md">
                                    Questa Privacy Policy può essere aggiornata periodicamente. In caso di modifiche sostanziali, verrà pubblicato un avviso sul sito.
                                </p>
                                <p className="drop-shadow-md mt-4">
                                    Ti invitiamo a consultare regolarmente questa pagina per rimanere informato.
                                </p>
                            </section>

                            {/* 11. Diritto di Reclamo */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    11. Diritto di Reclamo
                                </h2>
                                <p className="drop-shadow-md mb-4">
                                    Hai il diritto di proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali se ritieni che il trattamento dei tuoi dati violi il GDPR.
                                </p>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <p className="drop-shadow-md mb-2"><strong className="text-tiko-yellow">Garante per la Protezione dei Dati Personali</strong></p>
                                    <p className="drop-shadow-md">Piazza Venezia n. 11 - 00187 Roma</p>
                                    <p className="drop-shadow-md">Telefono: (+39) 06.696771</p>
                                    <p className="drop-shadow-md">Email: <a href="mailto:garante@gpdp.it" className="text-tiko-yellow hover:text-tiko-orange transition-colors underline">garante@gpdp.it</a></p>
                                    <p className="drop-shadow-md">Sito web: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:text-tiko-orange transition-colors underline">https://www.garanteprivacy.it</a></p>
                                </div>
                            </section>

                            {/* 12. Contatti */}
                            <section>
                                <h2 className="font-display text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                    12. Contatti
                                </h2>
                                <p className="drop-shadow-md mb-4">
                                    Per qualsiasi domanda o richiesta relativa a questa Privacy Policy o al trattamento dei tuoi dati personali, puoi contattarci a:
                                </p>
                                <p className="drop-shadow-md">
                                    <strong className="text-tiko-yellow">Email:</strong> <a href="mailto:info@vvdreamcreations.it" className="text-tiko-yellow hover:text-tiko-orange transition-colors underline">info@vvdreamcreations.it</a>
                                </p>
                                <p className="drop-shadow-md mt-6 text-center font-semibold text-white">
                                    VV Dream Creations si impegna a rispettare la tua privacy e a trattare i tuoi dati con la massima cura e trasparenza.
                                </p>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default PrivacyPolicyPage;
