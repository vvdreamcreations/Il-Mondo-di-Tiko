import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, Send, TrendingUp, Sparkles } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  emoji: string;
  votes: number;
}

interface SurveyData {
  topics: {
    [key: string]: {
      name: string;
      emoji: string;
      votes: number;
    };
  };
  customTopics: Array<{ text: string; votes: number }>;
  totalVotes: number;
  lastUpdated: string;
}

const TopicSurvey: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Load survey data from JSON
  useEffect(() => {
    fetch('/survey-data.json')
      .then((res) => res.json())
      .then((data) => setSurveyData(data))
      .catch((err) => console.error('Error loading survey data:', err));

    // Check if user has already voted
    const voted = localStorage.getItem('hasVotedTopic');
    if (voted === 'true') {
      setHasVoted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasVoted) {
      alert('Hai già votato! Grazie per la tua partecipazione.');
      return;
    }

    if (!selectedTopic && !customTopic.trim()) {
      alert('Per favore, seleziona un tema o scrivine uno personalizzato.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Determine which topic was selected
      const votedTopic = customTopic.trim() ? `Altro: ${customTopic}` : selectedTopic;

      // Send email via Brevo
      await sendBrevoEmail(votedTopic);

      // Update local state (optimistic update)
      if (surveyData) {
        const updatedData = { ...surveyData };

        if (customTopic.trim()) {
          // Add to custom topics
          const existingCustom = updatedData.customTopics.find(t => t.text === customTopic);
          if (existingCustom) {
            existingCustom.votes++;
          } else {
            updatedData.customTopics.push({ text: customTopic, votes: 1 });
          }
        } else if (selectedTopic && updatedData.topics[selectedTopic]) {
          // Increment predefined topic
          updatedData.topics[selectedTopic].votes++;
        }

        updatedData.totalVotes++;
        setSurveyData(updatedData);
      }

      // Mark as voted
      localStorage.setItem('hasVotedTopic', 'true');
      setHasVoted(true);
      setShowSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);

    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Si è verificato un errore. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendBrevoEmail = async (votedTopic: string) => {
    // Calculate rankings for email
    const rankings = calculateRankings();

    const emailBody = `
Nuovo voto ricevuto per il sondaggio sui temi dei libri!

✅ Tema scelto: ${votedTopic}
📅 Data: ${new Date().toLocaleString('it-IT')}

📊 CLASSIFICA ATTUALE:
${rankings.map((r, i) => `${i + 1}. ${r.name}: ${r.votes} voti (${r.percentage}%)`).join('\n')}

📈 Totale voti: ${surveyData?.totalVotes || 0}

---
Questo messaggio è stato generato automaticamente dal sondaggio su vvdreamcreations.it
    `.trim();

    // Use Brevo API to send email
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': import.meta.env.VITE_BREVO_API_KEY || ''
      },
      body: JSON.stringify({
        sender: { email: 'noreply@vvdreamcreations.it', name: 'VV Dream Creations - Sondaggio' },
        to: [{ email: 'fra.selfpublishing@gmail.com', name: 'Francesca' }],
        subject: '🎨 Nuovo voto per il sondaggio temi libri!',
        textContent: emailBody
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  };

  const calculateRankings = () => {
    if (!surveyData) return [];

    const allTopics = [
      ...Object.entries(surveyData.topics).map(([id, topic]) => ({
        id,
        name: `${topic.emoji} ${topic.name}`,
        votes: topic.votes
      }))
    ];

    // Aggregate all custom topics into "Altri"
    const customTopicsTotal = surveyData.customTopics.reduce((sum, ct) => sum + ct.votes, 0);
    if (customTopicsTotal > 0) {
      allTopics.push({
        id: 'custom-all',
        name: '✏️ Altri',
        votes: customTopicsTotal
      });
    }

    const total = surveyData.totalVotes || 1;

    return allTopics
      .map(t => ({
        ...t,
        percentage: Math.round((t.votes / total) * 100)
      }))
      .sort((a, b) => b.votes - a.votes);
  };

  const rankings = calculateRankings();
  const maxVotes = rankings.length > 0 ? rankings[0].votes : 1;

  if (!surveyData) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <p>Caricamento sondaggio...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-tiko-blue/20 to-tiko-green/20 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-tiko-blue/30 max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Vote className="text-tiko-blue w-6 h-6 animate-pulse" />
            <span className="font-bold uppercase tracking-widest text-sm text-white/80">Il Tuo Parere Conta</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Costruiamo insieme la prossima avventura di Tiko!
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
            Ogni bambino è un mondo a sé e le emozioni sono la loro bussola. Quale sfida vorresti che Tiko affrontasse nel suo prossimo libro? La tua opinione è preziosa per aiutarmi a scrivere una storia che parli davvero al cuore dei più piccoli. Scegli il tema o suggeriscine uno nuovo!
          </p>
          <div className="h-1.5 w-32 bg-gradient-to-r from-tiko-blue to-tiko-green mx-auto rounded-full mt-6 shadow-[0_0_20px_rgba(125,211,252,0.6)]" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Voting Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 rounded-xl bg-tiko-green/20 border border-tiko-green/40 backdrop-blur-sm"
                >
                  <p className="text-white text-center font-medium leading-relaxed">
                    Grazie di cuore per aver partecipato! Il tuo suggerimento è stato registrato ed è preziosissimo. Tiko non vede l'ora di mettersi al lavoro sulla sua nuova storia grazie al tuo aiuto. Resta sintonizzato per scoprire quale tema vincerà!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {hasVoted ? (
              <div className="text-center py-8">
                <Sparkles className="w-16 h-16 text-tiko-yellow mx-auto mb-4 animate-pulse" />
                <h3 className="text-white text-2xl font-bold mb-2">Hai già votato!</h3>
                <p className="text-white/80">
                  Grazie per aver condiviso la tua opinione. Guarda i risultati qui a destra! 👉
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-3">
                  <label className="block text-tiko-yellow font-bold mb-3 text-sm drop-shadow-md">
                    Scegli un tema:
                  </label>

                  {Object.entries(surveyData.topics).map(([id, topic]) => (
                    <label
                      key={id}
                      className="flex items-center gap-3 p-4 rounded-xl bg-black/20 backdrop-blur-sm border-2 border-white/20 hover:border-tiko-blue/50 hover:bg-white/10 transition-all cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="topic"
                        value={id}
                        checked={selectedTopic === id}
                        onChange={(e) => {
                          setSelectedTopic(e.target.value);
                          setCustomTopic(''); // Clear custom if selecting predefined
                        }}
                        className="w-5 h-5 text-tiko-blue focus:ring-2 focus:ring-tiko-blue cursor-pointer"
                      />
                      <span className="text-white font-medium text-lg group-hover:text-tiko-blue transition-colors">
                        {topic.emoji} {topic.name}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Custom Topic Input */}
                <div className="pt-4 border-t border-white/20">
                  <label className="block text-tiko-yellow font-bold mb-2 text-sm drop-shadow-md">
                    Oppure suggerisci un tema:
                  </label>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => {
                      setCustomTopic(e.target.value);
                      if (e.target.value.trim()) {
                        setSelectedTopic(''); // Clear radio if typing custom
                      }
                    }}
                    placeholder="Es: La pazienza, Il coraggio..."
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-tiko-blue/60 focus:border-tiko-blue/50 transition-all placeholder:text-white/40 text-white font-medium"
                  />
                  <p className="text-white/60 text-xs mt-2">
                    Scrivi qui se nessuna delle opzioni ti convince completamente
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || hasVoted}
                  className="w-full bg-gradient-to-r from-tiko-blue to-tiko-green text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(125,211,252,0.4)] hover:shadow-[0_6px_30px_rgba(125,211,252,0.6)] hover:scale-105 transition-all transform flex items-center justify-center gap-2 text-lg border-2 border-tiko-blue/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Invia il mio voto
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Results Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-tiko-green w-6 h-6" />
              <h3 className="text-white text-2xl font-bold">Classifica Temi</h3>
            </div>

            {surveyData.totalVotes === 0 ? (
              <div className="text-center py-12 text-white/60">
                <p className="text-lg">Nessun voto ancora...</p>
                <p className="text-sm mt-2">Sii il primo a votare! 🎨</p>
              </div>
            ) : (
              <div className="space-y-4">
                {rankings.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">
                        {index + 1}. {topic.name}
                      </span>
                    </div>

                    {/* Animated Bar */}
                    <div className="h-8 bg-black/30 rounded-lg overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(topic.votes / maxVotes) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
                        className={`h-full rounded-lg ${index === 0
                          ? 'bg-gradient-to-r from-tiko-yellow to-tiko-orange'
                          : index === 1
                            ? 'bg-gradient-to-r from-tiko-blue to-tiko-green'
                            : 'bg-gradient-to-r from-tiko-blue/70 to-tiko-green/70'
                          }`}
                        style={{
                          boxShadow: index === 0 ? '0 0 20px rgba(250, 204, 21, 0.5)' : 'none'
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {surveyData.totalVotes > 0 && (
              <div className="mt-6 pt-6 border-t border-white/20 text-center">
                <p className="text-white/70 text-sm">
                  <span className="font-bold text-tiko-yellow">{surveyData.totalVotes}</span>{' '}
                  {surveyData.totalVotes === 1 ? 'voto espresso' : 'voti espressi'}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TopicSurvey;
