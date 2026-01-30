'use client';
import { useState } from 'react';

// ═══════════════════════════════════════════════════════════════
// TAROT DATA
// ═══════════════════════════════════════════════════════════════

const MAJOR_ARCANA = [
  { id: 0, name: 'The Fool', keywords: ['New beginnings', 'Spontaneity', 'Leap of faith'], upright: 'Take the risk. The path reveals itself only to those who start walking.', reversed: 'Recklessness warning. Are you ignoring red flags?' },
  { id: 1, name: 'The Magician', keywords: ['Skill', 'Resources', 'Action'], upright: 'You have everything you need. Stop waiting, start executing.', reversed: 'Untapped potential. What skills are you not leveraging?' },
  { id: 2, name: 'The High Priestess', keywords: ['Intuition', 'Hidden knowledge', 'Patience'], upright: 'Trust your gut. The data supports what you already sense.', reversed: "You're ignoring your instincts. Why?" },
  { id: 3, name: 'The Empress', keywords: ['Growth', 'Nurturing', 'Abundance'], upright: 'Invest in growth. This is fertile ground for expansion.', reversed: 'Creative block. Step back and nurture yourself first.' },
  { id: 4, name: 'The Emperor', keywords: ['Structure', 'Authority', 'Control'], upright: 'Time for systems and processes. Build the foundation.', reversed: 'Rigidity is hurting you. Where can you flex?' },
  { id: 5, name: 'The Hierophant', keywords: ['Tradition', 'Mentorship', 'Conformity'], upright: 'Seek wisdom from those who walked this path before.', reversed: 'Challenge the status quo. Innovation beats tradition here.' },
  { id: 6, name: 'The Lovers', keywords: ['Choice', 'Partnership', 'Values'], upright: 'This decision defines your values. Choose alignment over convenience.', reversed: 'Misaligned partnership. Is everyone truly committed?' },
  { id: 7, name: 'The Chariot', keywords: ['Willpower', 'Direction', 'Victory'], upright: 'Push through. Your determination will overcome obstacles.', reversed: 'Scattered energy. Pick one direction and commit.' },
  { id: 8, name: 'Strength', keywords: ['Courage', 'Patience', 'Soft power'], upright: 'Influence through patience, not force. Play the long game.', reversed: 'Self-doubt is your enemy. You are stronger than you think.' },
  { id: 9, name: 'The Hermit', keywords: ['Reflection', 'Solitude', 'Inner guidance'], upright: 'Step back. The answer comes from within, not from more meetings.', reversed: 'Isolation is not serving you. Seek outside perspective.' },
  { id: 10, name: 'Wheel of Fortune', keywords: ['Cycles', 'Change', 'Opportunity'], upright: 'The timing is right. Cycles are turning in your favor.', reversed: 'Resistance to change is futile. Adapt or be disrupted.' },
  { id: 11, name: 'Justice', keywords: ['Fairness', 'Truth', 'Consequences'], upright: 'Make the ethical choice. It will pay dividends long-term.', reversed: 'Something is unfair. Address it before proceeding.' },
  { id: 12, name: 'The Hanged Man', keywords: ['Pause', 'Surrender', 'New perspective'], upright: 'Stop pushing. The breakthrough comes from letting go.', reversed: 'Stalling. What are you afraid to see from a new angle?' },
  { id: 13, name: 'Death', keywords: ['Transformation', 'Endings', 'Rebirth'], upright: 'Let it die. What you cling to prevents what wants to emerge.', reversed: 'Resisting necessary change. The old way is already dead.' },
  { id: 14, name: 'Temperance', keywords: ['Balance', 'Patience', 'Integration'], upright: 'Find the middle path. Extreme positions will backfire.', reversed: 'Imbalance. Are you overworking one area while neglecting another?' },
  { id: 15, name: 'The Devil', keywords: ['Bondage', 'Shadow', 'Materialism'], upright: 'What has power over you? Name it to break free.', reversed: 'Breaking free from old patterns. Keep going.' },
  { id: 16, name: 'The Tower', keywords: ['Disruption', 'Revelation', 'Breakthrough'], upright: 'Brace for disruption. It clears the way for something better.', reversed: 'Avoiding necessary destruction. The fall will be harder later.' },
  { id: 17, name: 'The Star', keywords: ['Hope', 'Inspiration', 'Renewal'], upright: 'After the storm, clarity. Trust the vision unfolding.', reversed: 'Lost faith. Reconnect with why you started.' },
  { id: 18, name: 'The Moon', keywords: ['Illusion', 'Fear', 'Subconscious'], upright: 'Things are not as they appear. Dig deeper before deciding.', reversed: 'Confusion clearing. Trust what emerges.' },
  { id: 19, name: 'The Sun', keywords: ['Success', 'Joy', 'Clarity'], upright: 'Green light. This has high probability of success.', reversed: 'Partial success. Good, but could be great. What is missing?' },
  { id: 20, name: 'Judgement', keywords: ['Reckoning', 'Reflection', 'Calling'], upright: 'Time for honest assessment. What is your higher purpose here?', reversed: 'Self-judgment blocking progress. Forgive and move forward.' },
  { id: 21, name: 'The World', keywords: ['Completion', 'Integration', 'Achievement'], upright: 'Cycle complete. Celebrate, then prepare for the next level.', reversed: 'So close. What final piece needs attention?' },
];

const SPREADS = [
  { id: 'yesno', name: 'Yes / No', description: 'Quick clarity on binary decisions', cards: 1, positions: ['Answer'] },
  { id: 'situation', name: 'Situation Analysis', description: 'Understand the challenge and path forward', cards: 3, positions: ['Current Situation', 'Obstacle', 'Advice'] },
  { id: 'decision', name: 'Decision Matrix', description: 'Evaluate options and consequences', cards: 3, positions: ['Option A', 'Option B', 'What you might be missing'] },
];

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const CardPlaceholder = ({ card, isReversed, isFlipped, onClick }: { card: typeof MAJOR_ARCANA[0] | null; isReversed: boolean; isFlipped: boolean; onClick: () => void }) => (
  <div className="card-container w-32 h-48 md:w-40 md:h-60 cursor-pointer" onClick={onClick}>
    <div className={`card-flip w-full h-full ${isFlipped ? 'flipped' : ''}`}>
      {/* Back of card */}
      <div className="card-front w-full h-full rounded-xl bg-gradient-to-br from-indigo-900 to-purple-900 border-2 border-indigo-500/50 flex items-center justify-center glow">
        <div className="text-4xl">✧</div>
      </div>
      {/* Front of card */}
      <div className={`card-back w-full h-full rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-amber-500/50 flex flex-col items-center justify-center p-3 ${isReversed ? 'rotate-180' : ''}`}>
        {card && (
          <>
            <div className="text-3xl mb-2">🃏</div>
            <div className="text-xs font-semibold text-amber-400 text-center">{card.name}</div>
            {isReversed && <div className="text-[10px] text-red-400 mt-1">(Reversed)</div>}
          </>
        )}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const [step, setStep] = useState<'home' | 'spread' | 'question' | 'reading'>('home');
  const [selectedSpread, setSelectedSpread] = useState<typeof SPREADS[0] | null>(null);
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<{ card: typeof MAJOR_ARCANA[0]; reversed: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const drawCards = (count: number) => {
    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(card => ({
      card,
      reversed: Math.random() > 0.7 // 30% chance reversed
    }));
  };

  const handleSelectSpread = (spread: typeof SPREADS[0]) => {
    setSelectedSpread(spread);
    setStep('question');
  };

  const handleStartReading = () => {
    if (!selectedSpread || !question.trim()) return;
    const cards = drawCards(selectedSpread.cards);
    setDrawnCards(cards);
    setFlippedCards(new Array(cards.length).fill(false));
    setStep('reading');
  };

  const handleFlipCard = async (index: number) => {
    if (flippedCards[index]) return;
    
    const newFlipped = [...flippedCards];
    newFlipped[index] = true;
    setFlippedCards(newFlipped);

    // If all cards flipped, get interpretation
    if (newFlipped.every(f => f) && !interpretation) {
      setLoading(true);
      try {
        const res = await fetch('/api/reading', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question,
            spread: selectedSpread,
            cards: drawnCards.map((c, i) => ({
              position: selectedSpread?.positions[i],
              name: c.card.name,
              reversed: c.reversed,
              upright: c.card.upright,
              reversedMeaning: c.card.reversed,
              keywords: c.card.keywords
            }))
          })
        });
        const data = await res.json();
        setInterpretation(data.interpretation);
      } catch (e) {
        setInterpretation('Could not connect to the oracle. Please try again.');
      }
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('home');
    setSelectedSpread(null);
    setQuestion('');
    setDrawnCards([]);
    setFlippedCards([]);
    setInterpretation(null);
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-white/10">
        <button onClick={handleReset} className="text-xl font-bold text-gradient">TarotCEO</button>
        <div className="text-xs text-slate-500">Strategic Perspectives</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        
        {/* HOME */}
        {step === 'home' && (
          <div className="text-center max-w-lg animate-fade-in">
            <div className="text-6xl mb-6 animate-float">🎴</div>
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-gradient">Clear Decisions.</span>
              <br />
              <span className="text-white">New Perspectives.</span>
            </h1>
            <p className="text-slate-400 mb-8">
              Tarot as a strategic thinking tool. Not mystical predictions—lateral perspectives for better decisions.
            </p>
            <button
              onClick={() => setStep('spread')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 transition glow"
            >
              Start a Reading ✨
            </button>
            <p className="text-xs text-slate-600 mt-8">No signup required • 100% private</p>
          </div>
        )}

        {/* SPREAD SELECTION */}
        {step === 'spread' && (
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-center mb-2">Choose Your Spread</h2>
            <p className="text-slate-400 text-center mb-8">Select based on what you need clarity on</p>
            <div className="grid gap-4">
              {SPREADS.map(spread => (
                <button
                  key={spread.id}
                  onClick={() => handleSelectSpread(spread)}
                  className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-indigo-500 transition text-left group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition">{spread.name}</h3>
                      <p className="text-slate-400 text-sm mt-1">{spread.description}</p>
                    </div>
                    <div className="text-slate-500 text-sm">{spread.cards} card{spread.cards > 1 ? 's' : ''}</div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {spread.positions.map((pos, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-slate-700/50 rounded text-slate-400">{pos}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep('home')} className="mt-6 text-slate-500 text-sm hover:text-white transition">← Back</button>
          </div>
        )}

        {/* QUESTION INPUT */}
        {step === 'question' && selectedSpread && (
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold text-center mb-2">{selectedSpread.name}</h2>
            <p className="text-slate-400 text-center mb-8">Focus on your question. Be specific.</p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What decision are you facing?&#10;&#10;Examples:&#10;• Should I accept this job offer?&#10;• Is now the right time to launch?&#10;• What am I missing about this partnership?"
              className="w-full h-40 p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
            />
            <button
              onClick={handleStartReading}
              disabled={!question.trim()}
              className="mt-4 w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Draw Cards ✨
            </button>
            <button onClick={() => setStep('spread')} className="mt-4 w-full text-slate-500 text-sm hover:text-white transition">← Change spread</button>
          </div>
        )}

        {/* READING */}
        {step === 'reading' && selectedSpread && (
          <div className="w-full max-w-3xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gradient">{selectedSpread.name}</h2>
              <p className="text-slate-400 text-sm mt-1 italic">"{question}"</p>
            </div>
            
            {/* Cards */}
            <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-8">
              {drawnCards.map((drawn, i) => (
                <div key={i} className="text-center">
                  <CardPlaceholder
                    card={flippedCards[i] ? drawn.card : null}
                    isReversed={drawn.reversed}
                    isFlipped={flippedCards[i]}
                    onClick={() => handleFlipCard(i)}
                  />
                  <div className="mt-2 text-xs text-slate-500">{selectedSpread.positions[i]}</div>
                  {flippedCards[i] && (
                    <div className="mt-1 text-xs text-slate-400 max-w-[160px]">
                      {drawn.card.keywords.join(' • ')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tap instruction */}
            {!flippedCards.every(f => f) && (
              <p className="text-center text-slate-500 text-sm animate-pulse">Tap each card to reveal</p>
            )}

            {/* Loading */}
            {loading && (
              <div className="text-center py-8">
                <div className="text-2xl animate-spin inline-block">🌀</div>
                <p className="text-slate-400 mt-2">Consulting the oracle...</p>
              </div>
            )}

            {/* Interpretation */}
            {interpretation && (
              <div className="mt-6 p-6 bg-slate-800/50 rounded-xl border border-indigo-500/30">
                <h3 className="text-lg font-semibold text-indigo-400 mb-3">Strategic Reading</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">{interpretation}</p>
              </div>
            )}

            {/* Reset */}
            {interpretation && (
              <button
                onClick={handleReset}
                className="mt-6 w-full py-3 border border-slate-600 rounded-xl text-slate-400 hover:text-white hover:border-slate-400 transition"
              >
                New Reading
              </button>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-slate-600 border-t border-white/5">
        Made by <a href="https://duendes.app" className="text-indigo-400 hover:underline">duendes.app</a> • 2026
      </footer>
    </div>
  );
}
