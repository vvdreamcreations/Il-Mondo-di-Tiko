import React, { useEffect } from 'react';
import { Sparkles, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const Newsletter: React.FC = () => {
  useEffect(() => {
    // Load Brevo form script
    const script = document.createElement('script');
    script.src = 'https://sibforms.com/forms/end-form/build/main.js';
    script.defer = true;
    document.body.appendChild(script);

    // Set Brevo window variables
    (window as any).REQUIRED_CODE_ERROR_MESSAGE = 'Scegli un prefisso paese';
    (window as any).LOCALE = 'it';
    (window as any).EMAIL_INVALID_MESSAGE = "Le informazioni fornite non sono valide. Controlla il formato del campo e riprova.";
    (window as any).REQUIRED_ERROR_MESSAGE = "Questo campo non può essere lasciato vuoto.";
    (window as any).GENERIC_INVALID_MESSAGE = "Le informazioni fornite non sono valide. Controlla il formato del campo e riprova.";
    (window as any).translation = {
      common: {
        selectedList: '{quantity} lista selezionata',
        selectedLists: '{quantity} liste selezionate',
        selectedOption: '{quantity} selezionato',
        selectedOptions: '{quantity} selezionati',
      }
    };
    (window as any).AUTOHIDE = Boolean(0);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="container mx-auto px-4">
      <style>{`
#sib - container input:: placeholder,
  #sib - container textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
        .input--hidden {
  display: none!important;
}
        .sib - form - message - panel {
  display: none;
}
        .sib - form - message - panel[style *= "display: block"] {
  display: block!important;
}
`}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col items-center gap-8 max-w-6xl mx-auto border border-tiko-yellow/30"
      >

        <div className="w-full text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={20} className="text-tiko-yellow animate-pulse" />
            <span className="font-bold uppercase tracking-widest text-sm text-white/80">Iscriviti</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
            Un regalo speciale <br />ti aspetta!
          </h2>
          <p className="text-white/90 text-lg mb-2 font-medium leading-relaxed max-w-3xl mx-auto">
            Iscriviti alla newsletter per entrare nel mondo di Tiko.
          </p>
          <p className="text-white/80 text-base mb-6 italic max-w-2xl mx-auto">
            Ricevi storie esclusive, anteprime e contenuti speciali direttamente nella tua email!
          </p>
        </div>

        {/* Brevo Form */}
        <div className="w-full max-w-2xl">
          <div id="sib-form-container" className="sib-form-container">

            {/* Error Message */}
            <div id="error-message" className="sib-form-message-panel mb-4 p-4 rounded-2xl bg-red-500/20 border border-red-500/40 backdrop-blur-sm hidden">
              <p className="text-white text-center font-medium">
                ⚠️ La tua iscrizione non può essere convalidata.
              </p>
            </div>

            {/* Success Message */}
            <div id="success-message" className="sib-form-message-panel mb-4 p-6 rounded-2xl bg-tiko-green/20 border border-tiko-green/40 backdrop-blur-sm hidden">
              <p className="text-white text-center font-medium leading-relaxed">
                🎉 Grazie di cuore! Hai appena fatto il primo passo nel magico mondo di Tiko. Presto riceverai storie, anteprime e piccoli doni speciali direttamente nella tua email. 💛
              </p>
            </div>

            {/* Form */}
            <div id="sib-container" className="bg-gradient-to-br from-tiko-orange/20 to-tiko-yellow/20 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-tiko-yellow/30 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
              <form
                id="sib-form"
                method="POST"
                action="https://2a1d1407.sibforms.com/serve/MUIFAJN6Tk0Q5be4BfpRBKTpF2wb8ssZVqbQABBMNRRgdQiHKqOJ50bOsyBridRX-bN20xCLwo39GNVRenOWowG-8BW9Xk8M_EKr4iM0X7qC-_WgZeY1s5gukEmpBANGYzddxOTcaOxgvWDwS9VNBb0SYmN1VX49hnaATNqnNWC5C78NozF44xZluyI2SJzb5Eeqy7Lgo_cYYTvQOg=="
                data-type="subscription"
                className="space-y-5"
              >

                {/* Nome Field */}
                <div className="sib-input sib-form-block">
                  <div className="form__entry entry_block">
                    <label className="block text-tiko-yellow font-bold mb-2 text-sm drop-shadow-md" htmlFor="NOME">
                      Il tuo nome (opzionale)
                    </label>
                    <input
                      className="w-full px-5 py-3 rounded-xl bg-black/30 backdrop-blur-sm border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-tiko-yellow/60 focus:border-tiko-yellow/50 transition-all placeholder:text-white/40 text-white font-medium"
                      maxLength={200}
                      type="text"
                      id="NOME"
                      name="NOME"
                      autoComplete="off"
                      placeholder="Il tuo nome"
                    />
                    <label className="entry__error entry__error--primary hidden"></label>
                  </div>
                </div>

                {/* Email Field */}
                <div className="sib-input sib-form-block">
                  <div className="form__entry entry_block">
                    <label className="block text-tiko-yellow font-bold mb-2 text-sm drop-shadow-md" htmlFor="EMAIL">
                      La tua email magica *
                    </label>
                    <input
                      className="w-full px-5 py-3 rounded-xl bg-black/30 backdrop-blur-sm border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-tiko-yellow/60 focus:border-tiko-yellow/50 transition-all placeholder:text-white/40 text-white font-medium"
                      type="email"
                      id="EMAIL"
                      name="EMAIL"
                      autoComplete="off"
                      placeholder="tua@email.it"
                      data-required="true"
                      required
                    />
                    <label className="entry__error entry__error--primary hidden"></label>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="sib-optin sib-form-block">
                  <div className="form__entry entry_mcq">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 rounded border-2 border-tiko-yellow/40 bg-black/30 checked:bg-tiko-yellow checked:border-tiko-yellow focus:ring-2 focus:ring-tiko-yellow/60 transition-all cursor-pointer"
                        value="1"
                        id="OPT_IN"
                        name="OPT_IN"
                      />
                      <span className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors">
                        Accetto le condizioni generali e di ricevere le newsletter
                      </span>
                    </label>
                    <p className="text-white/60 text-xs mt-2 ml-8">
                      Puoi annullare l'iscrizione in qualsiasi momento utilizzando il link incluso nella nostra newsletter.
                    </p>
                    <label className="entry__error entry__error--primary hidden"></label>
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="text-white/70 text-xs leading-relaxed bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <p>
                    Utilizziamo Brevo come piattaforma di marketing. Inviando questo modulo, accetti che i dati personali da te forniti vengano trasferiti a Brevo per il trattamento in conformità{' '}
                    <a href="https://www.brevo.com/it/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-tiko-yellow hover:text-white underline transition-colors">
                      all'Informativa sulla privacy di Brevo
                    </a>.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  className="w-full bg-gradient-to-r from-tiko-yellow to-tiko-orange text-tiko-dark font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:shadow-[0_6px_30px_rgba(250,204,21,0.6)] hover:scale-105 transition-all transform flex items-center justify-center gap-2 text-lg border-2 border-tiko-yellow/30"
                  type="submit"
                >
                  <Gift className="w-5 h-5" />
                  Voglio il mio regalo!
                </button>

                {/* Hidden fields */}
                <input type="text" name="email_address_check" value="" className="input--hidden" />
                <input type="hidden" name="locale" value="it" />
              </form>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default Newsletter;