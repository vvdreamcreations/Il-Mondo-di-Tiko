import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, Send, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';
import { trackSurveyVote } from '../utils/analytics';

const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbyDrbPqNC9_PIDSDaBlZw-7aSfFt4bZoBJ0zdlAXwJoOdDWK_kE-IvBSfORK_Y3qmd6/exec';

interface SurveyData {
  topics: {
    [key: string]: {
      id: string;
      name: string;
      emoji: string;
      votes: number;
    };
  };
  totalVotes: number;
}

const TopicSurvey: React.FC = () => {
  // Initialize with default topics for instant display
  const [surveyData, setSurveyData] = useState<SurveyData | null>({
    topics: {
      'fear': { id: 'fear', name: 'La paura', emoji: '😱', votes: 0 },
      'jealousy': { id: 'jealousy', name: 'La gelosia tra fratelli', emoji: '😠', votes: 0 },
      'sharing': { id: 'sharing', name: 'La condivisione', emoji: '🤝', votes: 0 },
      'sadness': { id: 'sadness', name: 'La tristezza', emoji: '😢', votes: 0 }
    },
    totalVotes: 0
  });
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [previousVote, setPreviousVote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isVoteModification, setIsVoteModification] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Load survey data from Google Sheets
  const loadSurveyData = async (silent = false) => {
    try {
      if (!silent) setIsLoading(true);
      setError('');
      const response = await fetch(GOOGLE_SHEETS_API);
      const data = await response.json();

      if (data.success) {
        setSurveyData(data);

        // Check if user has previously voted
        const storedVote = localStorage.getItem('userTopicVote');
        if (storedVote) {
          setPreviousVote(storedVote);
          setSelectedTopic(storedVote);
        }
      } else {
        setError('Errore nel caricamento dati');
      }
    } catch (err) {
      console.error('Error loading survey data:', err);
      setError('Impossibile caricare il sondaggio');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSurveyData(false); // Initial load with loading screen
    // Refresh data every 30 seconds silently (no loading screen)
    const interval = setInterval(() => loadSurveyData(true), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTopic) {
      alert('Per favore, seleziona un tema.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if this is a vote modification BEFORE making changes
      const isModification = previousVote !== '';

      // Submit vote to Google Sheets
      // Using text/plain to avoid CORS preflight (OPTIONS) that Apps Script doesn't handle
      const response = await fetch(GOOGLE_SHEETS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          topicId: selectedTopic,
          previousVote: previousVote // Send previous vote for replacement logic
        })
      });

      const result = await response.json();

      if (result.success) {
        // Save vote locally
        localStorage.setItem('userTopicVote', selectedTopic);
        setPreviousVote(selectedTopic);
        setIsVoteModification(isModification); // Set based on check above
        setShowSuccess(true);

        // Track vote in Google Analytics
        if (surveyData?.topics[selectedTopic]) {
          const topicName = surveyData.topics[selectedTopic].name;
          trackSurveyVote(selectedTopic, topicName);
        }

        // Reload data silently to show updated counts
        await loadSurveyData(true);

        // Success message stays visible (no timeout removal)

      } else {
        throw new Error(result.error || 'Submission failed');
      }

    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Si è verificato un errore. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateRankings = () => {
    if (!surveyData) return [];

    const allTopics = Object.values(surveyData.topics).map(topic => ({
      id: topic.id,
      name: `${topic.emoji} ${topic.name}`,
      votes: topic.votes
    }));

    const total = surveyData.totalVotes || 1;

    return allTopics
      .map(t => ({
        ...t,
        percentage: Math.round((t.votes / total) * 100)
      }))
      .sort((a, b) => b.votes - a.votes);
  };


  // Only show full loading screen on very first load when no data at all
  if (isLoading && !surveyData) {
    return (
      <section className="container mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center">
          <RefreshCw className="w-8 h-8 text-tiko-yellow mx-auto mb-4 animate-spin" />
          <p className="text-white/90">Caricamento sondaggio...</p>
        </div>
      </section>
    );
  }

  // Show error only if critical failure and no data
  if (error && !surveyData) {
    return (
      <section className="container mx-auto px-4">
        <div className="bg-red-500/20 backdrop-blur-xl rounded-3xl p-8 text-center border border-red-500/40">
          <p className="text-white">{error}</p>
          <button
            onClick={() => loadSurveyData(false)}
            className="mt-4 px-6 py-2 bg-tiko-yellow rounded-xl text-white hover:bg-tiko-orange transition-colors"
          >
            Riprova
          </button>
        </div>
      </section>
    );
  }

  const rankings = calculateRankings();


  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rough-edges-shadow p-6 md:p-10 border border-tiko-yellow/30"
      >
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Vote className="text-tiko-yellow w-6 h-6 animate-pulse" />
            <span className="font-bold uppercase tracking-widest text-sm text-white/80">Il Tuo Parere Conta</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Quale tema ti piacerebbe leggere?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
            Aiutaci a scegliere il tema del prossimo libro di Tiko! Ogni voto conta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Voting Form */}
          <div>
            {/* Previous Vote Message */}
            {previousVote && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-tiko-blue/20 border border-tiko-blue/40 backdrop-blur-sm"
              >
                <p className="text-white/90 text-sm">
                  ✅ <strong>Hai già votato!</strong><br />
                  Puoi modificare la tua scelta selezionando un altro tema qui sotto.
                </p>
              </motion.div>
            )}

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 rounded-xl bg-tiko-green/20 border border-tiko-green/40 backdrop-blur-sm"
                >
                  <p className="text-white font-medium text-center">
                    {isVoteModification ? '✨ Hai modificato il tuo voto!' : '🎉 Grazie mille! Il tuo voto è stato registrato con successo!'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-3 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10">
              {surveyData && Object.entries(surveyData.topics).map(([id, topic]) => (
                <label
                  key={id}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${selectedTopic === id
                    ? 'bg-tiko-yellow/30 border-2 border-tiko-yellow shadow-[0_0_20px_rgba(250,204,21,0.3)]'
                    : 'bg-white/5 border-2 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                  <input
                    type="radio"
                    name="topic"
                    value={id}
                    checked={selectedTopic === id}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-5 h-5 text-tiko-yellow focus:ring-tiko-yellow"
                  />
                  <span className="text-3xl">{topic.emoji}</span>
                  <span className="flex-1 text-white font-medium text-lg">{topic.name}</span>
                </label>
              ))}

              <button
                type="submit"
                disabled={isSubmitting || !selectedTopic}
                className="w-full bg-gradient-to-r from-tiko-yellow to-tiko-orange text-white font-bold py-3 rounded-xl shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:shadow-[0_6px_30px_rgba(250,204,21,0.6)] hover:scale-105 transition-all transform flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Invio...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {previousVote ? 'Modifica Voto' : 'Invia Voto'}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Rankings */}
          <div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-tiko-yellow w-5 h-5" />
                  <h3 className="font-bold text-white text-lg">Classifica</h3>
                </div>
                <button
                  onClick={loadSurveyData}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Aggiorna dati"
                >
                  <RefreshCw className="w-4 h-4 text-white/60 hover:text-white" />
                </button>
              </div>

              <div className="space-y-3">
                {rankings.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="text-white/90 font-medium flex items-center gap-2">
                        <span className={`${index === 0 ? 'text-tiko-yellow text-lg' : 'text-white/60'}`}>
                          #{index + 1}
                        </span>
                        {topic.name}
                      </span>
                      <span className="text-white/70 font-bold">{topic.votes}</span>
                    </div>
                    <div className="h-6 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${topic.percentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
                        className={`h-full flex items-center justify-end pr-2 ${index === 0
                          ? 'bg-gradient-to-r from-tiko-yellow to-tiko-orange'
                          : index === 1
                            ? 'bg-gradient-to-r from-tiko-blue/80 to-tiko-blue'
                            : 'bg-gradient-to-r from-white/40 to-white/20'
                          }`}
                      >
                        <span className="text-white text-[10px] font-bold drop-shadow-md">
                          {topic.percentage}%
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Voti totali:</span>
                  <span className="text-tiko-yellow font-bold text-lg">{surveyData?.totalVotes || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-center">
          <p className="text-white/50 text-[10px]">
            Risultati in tempo reale. Voto anonimo.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default TopicSurvey;
