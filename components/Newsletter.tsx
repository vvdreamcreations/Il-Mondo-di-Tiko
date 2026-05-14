import React, { useEffect, useState } from 'react';
import { Sparkles, Gift, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackNewsletterSignup } from '../utils/analytics';

/**
 * Newsletter — densità mobile (Step 2)
 *
 * Cosa cambia rispetto a prima:
 *  - Stelle decorative animate: nascoste sotto md (era 4 nodi animati simultanei).
 *  - Padding card: p-5 mobile → p-8 md → p-14 lg (era p-8 → p-14 sempre).
 *  - Inner #sib-container: p-4 mobile → p-8 md (era p-6/p-8).
 *  - Titolo: text-2xl mobile → text-5xl desktop (era 3xl → 5xl).
 *  - Header badge / sottotitolo accorciato su mobile.
 *  - Inputs: padding e radius leggermente ridotti su mobile.
 */
const Newsletter: React.FC = () => {
  const [shouldLoadScript, setShouldLoadScript] = useState(false);

  useEffect(() => {
    if (!shouldLoadScript) return;

    const script = document.createElement('script');
    script.src = 'https://sibforms.com/forms/end-form/build/main.js';
    script.defer = true;
    document.body.appendChild(script);

    (window as any).REQUIRED_CODE_ERROR_MESSAGE = 'Scegli un prefisso paese';
    (window as any).LOCALE = 'it';
    (window as any).EMAIL_INVALID_MESSAGE = 'Le informazioni fornite non sono valide. Controlla il formato del campo e riprova.';
    (window as any).REQUIRED_ERROR_MESSAGE = 'Questo campo non può essere lasciato vuoto.';
    (window as any).GENERIC_INVALID_MESSAGE = 'Le informazioni fornite non sono valide. Controlla il formato del campo e riprova.';
    (window as any).translation = {
      common: {
        selectedList: '{quantity} lista selezionata',
        selectedLists: '{quantity} liste selezionate',
        selectedOption: '{quantity} selezionato',
        selectedOptions: '{quantity} selezionati',
      },
    };
    (window as any).AUTOHIDE = Boolean(0);

    const timer = setTimeout(() => {
      const form = document.getElementById('sib-form') as HTMLFormElement;
      if (form) {
        form.addEventListener('submit', () => {
          const emailInput = document.getElementById('EMAIL') as HTMLInputElement;
          const email = emailInput?.value || '';
          if (email) trackNewsletterSignup(email);

          setTimeout(() => {
            const successMsg = document.getElementById('success-message');
            const errorMsg = document.getElementById('error-message');
            if (successMsg && errorMsg) {
              successMsg.classList.remove('hidden');
              errorMsg.classList.add('hidden');
              form.reset();
            }
          }, 1500);
        });
      }
    }, 1000);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      clearTimeout(timer);
    };
  }, [shouldLoadScript]);

  return (
    <section className="container mx-auto px-4">
      <style>{`
        #sib-container input::placeholder,
        #sib-container textarea::placeholder { color: rgba(255,255,255,0.35); }
        .input--hidden { display: none !important; }
        .sib-form-message-panel { display: none; }
        .sib-form-message-panel[style*="display: block"] { display: block !important; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        onViewportEnter={() => setShouldLoadScript(true)}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(253,186,116,0.13) 0%, rgba(26,31,46,0.95) 50%, rgba(167,139,250,0.1) 100%)',
          border: '1px solid rgba(253,186,116,0.2)',
        }}
      >
        {/* Glow ambientale — più piccolo su mobile */}
        <div className="absolute -top-16 -right-16 md:-top-24 md:-right-24 w-48 h-48 md:w-72 md:h-72 rounded-full blur-[80px] md:blur-[100px] pointer-events-none opacity-25"
          style={{ background: '#FACC15' }} />
        <div className="absolute -bottom-16 -left-16 md:-bottom-24 md:-left-24 w-48 h-48 md:w-72 md:h-72 rounded-full blur-[80px] md:blur-[100px] pointer-events-none opacity-20"
          style={{ background: '#A78BFA' }} />

        {/* Stelle decorative — solo da md in su (su mobile pesavano + non si vedevano bene) */}
        <div className="hidden md:block">
          {[
            { top: '12%', left: '5%', size: 14, delay: 0 },
            { top: '20%', right: '8%', size: 10, delay: 0.4 },
            { bottom: '25%', left: '8%', size: 8, delay: 0.8 },
            { bottom: '15%', right: '6%', size: 12, delay: 0.2 },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="absolute text-tiko-yellow pointer-events-none"
              style={{ top: s.top, left: (s as any).left, right: (s as any).right, bottom: s.bottom }}
              animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: s.delay }}
            >
              <Sparkles size={s.size} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 p-5 md:p-8 lg:p-14 flex flex-col items-center gap-6 md:gap-8">

          {/* Header */}
          <div className="text-center text-white">
            <div
              className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold mb-3 md:mb-5"
              style={{
                background: 'rgba(253,186,116,0.15)',
                border: '1px solid rgba(253,186,116,0.3)',
                color: '#FDE68A',
              }}
            >
              <Mail size={10} className="md:hidden" />
              <Mail size={11} className="hidden md:inline" />
              Newsletter
            </div>
            <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 leading-tight drop-shadow-lg">
              Un regalo speciale<br />
              <span className="text-gradient-gold italic">ti aspetta!</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
              Iscriviti per entrare nel mondo di Tiko — storie esclusive, anteprime e contenuti speciali direttamente nella tua email.
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-xl">
            <div id="sib-form-container" className="sib-form-container">

              <div id="error-message" className="sib-form-message-panel mb-3 md:mb-4 p-3 md:p-4 rounded-2xl hidden"
                style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
                <p className="text-white text-center font-medium text-sm">
                  ⚠️ La tua iscrizione non può essere convalidata.
                </p>
              </div>

              <div id="success-message" className="sib-form-message-panel mb-3 md:mb-4 p-5 md:p-6 rounded-2xl hidden"
                style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}>
                <p className="text-white text-center font-medium leading-relaxed text-sm">
                  🎉 Grazie di cuore! Presto riceverai storie, anteprime e piccoli doni speciali. 💛
                </p>
              </div>

              <div id="sib-container"
                className="rounded-3xl p-4 md:p-8 space-y-4 md:space-y-5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <iframe name="hidden_iframe" style={{ display: 'none' }} />

                <form
                  id="sib-form"
                  method="POST"
                  action="https://2a1d1407.sibforms.com/serve/MUIFAJN6Tk0Q5be4BfpRBKTpF2wb8ssZVqbQABBMNRRgdQiHKqOJ50bOsyBridRX-bN20xCLwo39GNVRenOWowG-8BW9Xk8M_EKr4iM0X7qC-_WgZeY1s5gukEmpBANGYzddxOTcaOxgvWDwS9VNBb0SYmN1VX49hnaATNqnNWC5C78NozF44xZluyI2SJzb5Eeqy7Lgo_cYYTvQOg=="
                  data-type="subscription"
                  target="hidden_iframe"
                  className="space-y-4 md:space-y-5"
                >
                  {/* Nome */}
                  <div className="sib-input sib-form-block">
                    <div className="form__entry entry_block">
                      <label className="block font-bold mb-1.5 md:mb-2 text-xs md:text-sm tracking-wide" style={{ color: '#FDE68A' }} htmlFor="NOME">
                        Il tuo nome (opzionale)
                      </label>
                      <input
                        className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-xl font-medium transition-all text-sm md:text-base"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: 'white',
                          outline: 'none',
                        }}
                        onFocus={e => { e.currentTarget.style.border = '1px solid rgba(253,186,116,0.5)'; }}
                        onBlur={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)'; }}
                        maxLength={200}
                        type="text"
                        id="NOME"
                        name="NOME"
                        autoComplete="off"
                        placeholder="Il tuo nome"
                      />
                      <label className="entry__error entry__error--primary hidden" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="sib-input sib-form-block">
                    <div className="form__entry entry_block">
                      <label className="block font-bold mb-1.5 md:mb-2 text-xs md:text-sm tracking-wide" style={{ color: '#FDE68A' }} htmlFor="EMAIL">
                        La tua email magica *
                      </label>
                      <input
                        className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-xl font-medium transition-all text-sm md:text-base"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: 'white',
                          outline: 'none',
                        }}
                        onFocus={e => { e.currentTarget.style.border = '1px solid rgba(253,186,116,0.5)'; }}
                        onBlur={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)'; }}
                        type="email"
                        id="EMAIL"
                        name="EMAIL"
                        autoComplete="off"
                        placeholder="tua@email.it"
                        data-required="true"
                        required
                      />
                      <label className="entry__error entry__error--primary hidden" />
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="sib-optin sib-form-block">
                    <div className="form__entry entry_mcq">
                      <label className="flex items-start gap-2.5 md:gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="mt-0.5 w-4 h-4 md:w-5 md:h-5 rounded cursor-pointer"
                          style={{ accentColor: '#FACC15' }}
                          value="1"
                          id="OPT_IN"
                          name="OPT_IN"
                        />
                        <span className="text-white/75 text-xs md:text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                          Accetto le condizioni generali e di ricevere le newsletter
                        </span>
                      </label>
                      <p className="text-white/40 text-[10px] md:text-xs mt-1.5 md:mt-2 ml-6 md:ml-8 leading-relaxed">
                        Puoi annullare l'iscrizione in qualsiasi momento utilizzando il link incluso nella nostra newsletter.
                      </p>
                      <label className="entry__error entry__error--primary hidden" />
                    </div>
                  </div>

                  {/* Privacy */}
                  <p className="text-white/40 text-[10px] md:text-xs leading-relaxed">
                    Utilizziamo Brevo come piattaforma di marketing. Inviando questo modulo, accetti che i dati personali vengano trasferiti a Brevo in conformità alla{' '}
                    <a href="https://www.brevo.com/it/legal/privacypolicy/" target="_blank" rel="noopener noreferrer"
                      className="underline transition-colors" style={{ color: '#FDE68A' }}>
                      Privacy Policy di Brevo
                    </a>.
                  </p>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="w-full py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #FACC15, #FB923C)',
                      color: '#1A1F2E',
                      boxShadow: '0 0 30px rgba(250,204,21,0.3)',
                    }}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(250,204,21,0.5)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Gift size={16} className="md:hidden" />
                    <Gift size={18} className="hidden md:inline" />
                    Voglio il mio regalo!
                  </motion.button>

                  <input type="text" name="email_address_check" value="" className="input--hidden" readOnly />
                  <input type="hidden" name="locale" value="it" />
                </form>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
