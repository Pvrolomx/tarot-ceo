'use client';
import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════

const T = {
  en: {
    tagline: 'Strategic Perspectives',
    title1: 'Clear Decisions.',
    title2: 'New Perspectives.',
    subtitle: 'Tarot as a strategic thinking tool. Not mystical predictions—lateral perspectives for better decisions.',
    startReading: 'Start a Reading ✨',
    noSignup: 'No signup required • 100% private',
    chooseSpread: 'Choose Your Spread',
    chooseSubtitle: 'Select based on what you need clarity on',
    cards: 'cards',
    card: 'card',
    back: '← Back',
    focusQuestion: 'Focus on your question. Be specific.',
    questionPlaceholder: 'What decision are you facing?\n\nExamples:\n• Should I accept this job offer?\n• Is now the right time to launch?\n• What am I missing about this partnership?',
    drawCards: 'Draw Cards ✨',
    changeSpread: '← Change spread',
    tapReveal: 'Tap each card to reveal',
    consulting: 'Consulting the oracle...',
    strategicReading: 'Strategic Reading',
    newReading: 'New Reading',
    reversed: 'Reversed',
    madeBy: 'Made by',
    spreads: [
      { id: 'yesno', name: 'Yes / No', description: 'Quick clarity on binary decisions', positions: ['Answer'] },
      { id: 'situation', name: 'Situation Analysis', description: 'Understand the challenge and path forward', positions: ['Current Situation', 'Obstacle', 'Advice'] },
      { id: 'decision', name: 'Decision Matrix', description: 'Evaluate options and consequences', positions: ['Option A', 'Option B', 'What you might be missing'] },
    ],
  },
  es: {
    tagline: 'Perspectivas Estratégicas',
    title1: 'Decisiones Claras.',
    title2: 'Nuevas Perspectivas.',
    subtitle: 'Tarot como herramienta de pensamiento estratégico. No predicciones místicas—perspectivas laterales para mejores decisiones.',
    startReading: 'Iniciar Lectura ✨',
    noSignup: 'Sin registro • 100% privado',
    chooseSpread: 'Elige tu Tirada',
    chooseSubtitle: 'Selecciona según lo que necesitas clarificar',
    cards: 'cartas',
    card: 'carta',
    back: '← Atrás',
    focusQuestion: 'Enfócate en tu pregunta. Sé específico.',
    questionPlaceholder: '¿Qué decisión enfrentas?\n\nEjemplos:\n• ¿Debo aceptar esta oferta de trabajo?\n• ¿Es el momento de lanzar?\n• ¿Qué estoy pasando por alto de esta alianza?',
    drawCards: 'Sacar Cartas ✨',
    changeSpread: '← Cambiar tirada',
    tapReveal: 'Toca cada carta para revelar',
    consulting: 'Consultando el oráculo...',
    strategicReading: 'Lectura Estratégica',
    newReading: 'Nueva Lectura',
    reversed: 'Invertida',
    madeBy: 'Hecho por',
    spreads: [
      { id: 'yesno', name: 'Sí / No', description: 'Claridad rápida en decisiones binarias', positions: ['Respuesta'] },
      { id: 'situation', name: 'Análisis de Situación', description: 'Entiende el desafío y el camino', positions: ['Situación Actual', 'Obstáculo', 'Consejo'] },
      { id: 'decision', name: 'Matriz de Decisión', description: 'Evalúa opciones y consecuencias', positions: ['Opción A', 'Opción B', 'Lo que podrías estar ignorando'] },
    ],
  }
};

// Card images hosted on Vercel Blob
const CARD_IMAGES = {
  back: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-7SuG9egBvvMUPNwTuTcKiVlTnfcW53.png',
  0: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-vqdnCQLv7WM9mdOjQyuab4pbEdgbva.png',
  1: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-LhRarF3AMcaaSQlDlk8qobtgTTCMMd.png',
  2: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-rGmt7gXMEAHRAXhb2cWG3gcAjyV08r.png',
  3: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-JF8C2q8PzLTtsNtC2zaei5GnjjNOvN.png',
  4: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-zXkRw4ut8BGh7wlx8iEIKWKgbIqwDq.png',
  5: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-qoS2shrUdkRkbCuSKXYURU4C7exSuS.png',
  6: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-bLm3mP8159oIYX0353tiJL8lKXtpDs.png',
  7: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-YGwvJMKCzq6UyOqzbz9ODrJLvmeMh2.png',
  8: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-UuypIZYWksfPg3PgYv0Nw4faZby9Cs.png',
  9: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-yz0SD5r11mEkEx9rLZj4XP1uKQ2NZ7.png',
  10: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-CEa8OaZVedtwMQ8ioPYGMfFlXo7oKG.png',
  11: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-rZY5ZJtttAFZtGX0y0rkxwYgeupNXf.png',
  12: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-j2ueyKb2xeIB6atKrROXttNu4fLz1n.png',
  13: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-JSiK7V8EZdMdtWJnM1GJBaGErilPHw.png',
  14: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-aZRi9lgRQQ3hRWiG0ymb303tobrjn4.png',
  15: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-ByJO8ecc3RJMk0CQFTFGogsUR9FkND.png',
  16: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-3bfX5TjqMmgkl4wIqwIY1ppdogcALc.png',
  17: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-zTPKfUwpPa5fz2DS3HeXdQLcMs1eIE.png',
  18: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-3FyK9efolfd3rjfNUtUtGnrQQs7HUo.png',
  19: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-lYtj9Isca15VTftKbjB8g3pG8xgYEH.png',
  20: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-FIHPYwhGrpmcrJLDiJ9EIL7WrjKXwA.png',
  21: 'https://q3kmdq0bwilkumjv.public.blob.vercel-storage.com/image-IiQTKbhTdOvkZsCMewG5TVbTBwdn72.png',
};

const MAJOR_ARCANA = [
  { id: 0, name: 'The Fool', nameEs: 'El Loco', keywords: ['New beginnings', 'Spontaneity', 'Leap of faith'], keywordsEs: ['Nuevos comienzos', 'Espontaneidad', 'Salto de fe'], upright: 'Take the risk. The path reveals itself only to those who start walking.', uprightEs: 'Toma el riesgo. El camino se revela solo a quienes empiezan a caminar.', reversed: 'Recklessness warning. Are you ignoring red flags?', reversedEs: 'Advertencia de imprudencia. ¿Estás ignorando señales de alerta?' },
  { id: 1, name: 'The Magician', nameEs: 'El Mago', keywords: ['Skill', 'Resources', 'Action'], keywordsEs: ['Habilidad', 'Recursos', 'Acción'], upright: 'You have everything you need. Stop waiting, start executing.', uprightEs: 'Tienes todo lo que necesitas. Deja de esperar, empieza a ejecutar.', reversed: 'Untapped potential. What skills are you not leveraging?', reversedEs: 'Potencial sin explotar. ¿Qué habilidades no estás aprovechando?' },
  { id: 2, name: 'The High Priestess', nameEs: 'La Sacerdotisa', keywords: ['Intuition', 'Hidden knowledge', 'Patience'], keywordsEs: ['Intuición', 'Conocimiento oculto', 'Paciencia'], upright: 'Trust your gut. The data supports what you already sense.', uprightEs: 'Confía en tu instinto. Los datos respaldan lo que ya sientes.', reversed: "You're ignoring your instincts. Why?", reversedEs: 'Estás ignorando tus instintos. ¿Por qué?' },
  { id: 3, name: 'The Empress', nameEs: 'La Emperatriz', keywords: ['Growth', 'Nurturing', 'Abundance'], keywordsEs: ['Crecimiento', 'Nutrición', 'Abundancia'], upright: 'Invest in growth. This is fertile ground for expansion.', uprightEs: 'Invierte en crecimiento. Este es terreno fértil para expandir.', reversed: 'Creative block. Step back and nurture yourself first.', reversedEs: 'Bloqueo creativo. Da un paso atrás y cuídate primero.' },
  { id: 4, name: 'The Emperor', nameEs: 'El Emperador', keywords: ['Structure', 'Authority', 'Control'], keywordsEs: ['Estructura', 'Autoridad', 'Control'], upright: 'Time for systems and processes. Build the foundation.', uprightEs: 'Tiempo de sistemas y procesos. Construye la base.', reversed: 'Rigidity is hurting you. Where can you flex?', reversedEs: 'La rigidez te está dañando. ¿Dónde puedes flexibilizar?' },
  { id: 5, name: 'The Hierophant', nameEs: 'El Hierofante', keywords: ['Tradition', 'Mentorship', 'Conformity'], keywordsEs: ['Tradición', 'Mentoría', 'Conformidad'], upright: 'Seek wisdom from those who walked this path before.', uprightEs: 'Busca sabiduría de quienes recorrieron este camino antes.', reversed: 'Challenge the status quo. Innovation beats tradition here.', reversedEs: 'Desafía el status quo. La innovación gana a la tradición aquí.' },
  { id: 6, name: 'The Lovers', nameEs: 'Los Enamorados', keywords: ['Choice', 'Partnership', 'Values'], keywordsEs: ['Elección', 'Alianza', 'Valores'], upright: 'This decision defines your values. Choose alignment over convenience.', uprightEs: 'Esta decisión define tus valores. Elige alineación sobre conveniencia.', reversed: 'Misaligned partnership. Is everyone truly committed?', reversedEs: 'Alianza desalineada. ¿Están todos realmente comprometidos?' },
  { id: 7, name: 'The Chariot', nameEs: 'El Carro', keywords: ['Willpower', 'Direction', 'Victory'], keywordsEs: ['Voluntad', 'Dirección', 'Victoria'], upright: 'Push through. Your determination will overcome obstacles.', uprightEs: 'Sigue adelante. Tu determinación superará los obstáculos.', reversed: 'Scattered energy. Pick one direction and commit.', reversedEs: 'Energía dispersa. Elige una dirección y comprométete.' },
  { id: 8, name: 'Strength', nameEs: 'La Fuerza', keywords: ['Courage', 'Patience', 'Soft power'], keywordsEs: ['Coraje', 'Paciencia', 'Poder suave'], upright: 'Influence through patience, not force. Play the long game.', uprightEs: 'Influye con paciencia, no con fuerza. Juega a largo plazo.', reversed: 'Self-doubt is your enemy. You are stronger than you think.', reversedEs: 'La autoduda es tu enemigo. Eres más fuerte de lo que crees.' },
  { id: 9, name: 'The Hermit', nameEs: 'El Ermitaño', keywords: ['Reflection', 'Solitude', 'Inner guidance'], keywordsEs: ['Reflexión', 'Soledad', 'Guía interior'], upright: 'Step back. The answer comes from within, not from more meetings.', uprightEs: 'Da un paso atrás. La respuesta viene de dentro, no de más reuniones.', reversed: 'Isolation is not serving you. Seek outside perspective.', reversedEs: 'El aislamiento no te sirve. Busca perspectiva externa.' },
  { id: 10, name: 'Wheel of Fortune', nameEs: 'La Rueda', keywords: ['Cycles', 'Change', 'Opportunity'], keywordsEs: ['Ciclos', 'Cambio', 'Oportunidad'], upright: 'The timing is right. Cycles are turning in your favor.', uprightEs: 'El momento es correcto. Los ciclos giran a tu favor.', reversed: 'Resistance to change is futile. Adapt or be disrupted.', reversedEs: 'Resistir el cambio es inútil. Adáptate o serás disrumpido.' },
  { id: 11, name: 'Justice', nameEs: 'La Justicia', keywords: ['Fairness', 'Truth', 'Consequences'], keywordsEs: ['Equidad', 'Verdad', 'Consecuencias'], upright: 'Make the ethical choice. It will pay dividends long-term.', uprightEs: 'Toma la decisión ética. Pagará dividendos a largo plazo.', reversed: 'Something is unfair. Address it before proceeding.', reversedEs: 'Algo es injusto. Abórdalo antes de continuar.' },
  { id: 12, name: 'The Hanged Man', nameEs: 'El Colgado', keywords: ['Pause', 'Surrender', 'New perspective'], keywordsEs: ['Pausa', 'Rendición', 'Nueva perspectiva'], upright: 'Stop pushing. The breakthrough comes from letting go.', uprightEs: 'Deja de empujar. El avance viene de soltar.', reversed: 'Stalling. What are you afraid to see from a new angle?', reversedEs: 'Estancamiento. ¿Qué temes ver desde otro ángulo?' },
  { id: 13, name: 'Death', nameEs: 'La Muerte', keywords: ['Transformation', 'Endings', 'Rebirth'], keywordsEs: ['Transformación', 'Finales', 'Renacimiento'], upright: 'Let it die. What you cling to prevents what wants to emerge.', uprightEs: 'Déjalo morir. Lo que aferras impide lo que quiere emerger.', reversed: 'Resisting necessary change. The old way is already dead.', reversedEs: 'Resistiendo cambio necesario. El viejo camino ya murió.' },
  { id: 14, name: 'Temperance', nameEs: 'La Templanza', keywords: ['Balance', 'Patience', 'Integration'], keywordsEs: ['Balance', 'Paciencia', 'Integración'], upright: 'Find the middle path. Extreme positions will backfire.', uprightEs: 'Encuentra el camino medio. Las posiciones extremas fallarán.', reversed: 'Imbalance. Are you overworking one area while neglecting another?', reversedEs: 'Desequilibrio. ¿Sobretrabajas un área mientras descuidas otra?' },
  { id: 15, name: 'The Devil', nameEs: 'El Diablo', keywords: ['Bondage', 'Shadow', 'Materialism'], keywordsEs: ['Atadura', 'Sombra', 'Materialismo'], upright: 'What has power over you? Name it to break free.', uprightEs: '¿Qué tiene poder sobre ti? Nómbralo para liberarte.', reversed: 'Breaking free from old patterns. Keep going.', reversedEs: 'Liberándote de viejos patrones. Sigue adelante.' },
  { id: 16, name: 'The Tower', nameEs: 'La Torre', keywords: ['Disruption', 'Revelation', 'Breakthrough'], keywordsEs: ['Disrupción', 'Revelación', 'Avance'], upright: 'Brace for disruption. It clears the way for something better.', uprightEs: 'Prepárate para la disrupción. Despeja el camino para algo mejor.', reversed: 'Avoiding necessary destruction. The fall will be harder later.', reversedEs: 'Evitando destrucción necesaria. La caída será peor después.' },
  { id: 17, name: 'The Star', nameEs: 'La Estrella', keywords: ['Hope', 'Inspiration', 'Renewal'], keywordsEs: ['Esperanza', 'Inspiración', 'Renovación'], upright: 'After the storm, clarity. Trust the vision unfolding.', uprightEs: 'Después de la tormenta, claridad. Confía en la visión que se revela.', reversed: 'Lost faith. Reconnect with why you started.', reversedEs: 'Fe perdida. Reconecta con por qué empezaste.' },
  { id: 18, name: 'The Moon', nameEs: 'La Luna', keywords: ['Illusion', 'Fear', 'Subconscious'], keywordsEs: ['Ilusión', 'Miedo', 'Subconsciente'], upright: 'Things are not as they appear. Dig deeper before deciding.', uprightEs: 'Las cosas no son lo que parecen. Profundiza antes de decidir.', reversed: 'Confusion clearing. Trust what emerges.', reversedEs: 'La confusión se aclara. Confía en lo que emerge.' },
  { id: 19, name: 'The Sun', nameEs: 'El Sol', keywords: ['Success', 'Joy', 'Clarity'], keywordsEs: ['Éxito', 'Alegría', 'Claridad'], upright: 'Green light. This has high probability of success.', uprightEs: 'Luz verde. Esto tiene alta probabilidad de éxito.', reversed: 'Partial success. Good, but could be great. What is missing?', reversedEs: 'Éxito parcial. Bueno, pero podría ser excelente. ¿Qué falta?' },
  { id: 20, name: 'Judgement', nameEs: 'El Juicio', keywords: ['Reckoning', 'Reflection', 'Calling'], keywordsEs: ['Ajuste de cuentas', 'Reflexión', 'Llamado'], upright: 'Time for honest assessment. What is your higher purpose here?', uprightEs: 'Tiempo de evaluación honesta. ¿Cuál es tu propósito superior aquí?', reversed: 'Self-judgment blocking progress. Forgive and move forward.', reversedEs: 'El autojuicio bloquea el progreso. Perdona y avanza.' },
  { id: 21, name: 'The World', nameEs: 'El Mundo', keywords: ['Completion', 'Integration', 'Achievement'], keywordsEs: ['Completitud', 'Integración', 'Logro'], upright: 'Cycle complete. Celebrate, then prepare for the next level.', uprightEs: 'Ciclo completo. Celebra, luego prepárate para el siguiente nivel.', reversed: 'So close. What final piece needs attention?', reversedEs: 'Tan cerca. ¿Qué pieza final necesita atención?' },
];

// ═══════════════════════════════════════════════════════════════
// CARD COMPONENT
// ═══════════════════════════════════════════════════════════════

const TarotCard = ({ card, isReversed, isFlipped, onClick, lang }: { card: typeof MAJOR_ARCANA[0] | null; isReversed: boolean; isFlipped: boolean; onClick: () => void; lang: 'en' | 'es' }) => {
  const t = T[lang];
  return (
    <div className="card-container w-32 h-48 md:w-40 md:h-60 cursor-pointer" onClick={onClick}>
      <div className={`card-flip w-full h-full ${isFlipped ? 'flipped' : ''}`}>
        {/* Back of card */}
        <div className="card-front w-full h-full rounded-xl overflow-hidden glow">
          <img src={CARD_IMAGES.back} alt="Card back" className="w-full h-full object-cover" />
        </div>
        {/* Front of card */}
        <div className={`card-back w-full h-full rounded-xl overflow-hidden ${isReversed ? 'rotate-180' : ''}`}>
          {card && (
            <img src={CARD_IMAGES[card.id as keyof typeof CARD_IMAGES]} alt={card.name} className="w-full h-full object-cover" />
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [step, setStep] = useState<'home' | 'spread' | 'question' | 'reading'>('home');
  const [selectedSpread, setSelectedSpread] = useState<typeof T.en.spreads[0] | null>(null);
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<{ card: typeof MAJOR_ARCANA[0]; reversed: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const t = T[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem('tarot-lang') as 'en' | 'es';
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    localStorage.setItem('tarot-lang', newLang);
  };

  const drawCards = (count: number) => {
    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(card => ({
      card,
      reversed: Math.random() > 0.7
    }));
  };

  const handleSelectSpread = (spread: typeof T.en.spreads[0]) => {
    setSelectedSpread(spread);
    setStep('question');
  };

  const handleStartReading = () => {
    if (!selectedSpread || !question.trim()) return;
    const cards = drawCards(selectedSpread.positions.length);
    setDrawnCards(cards);
    setFlippedCards(new Array(cards.length).fill(false));
    setStep('reading');
  };

  const handleFlipCard = async (index: number) => {
    if (flippedCards[index]) return;
    
    const newFlipped = [...flippedCards];
    newFlipped[index] = true;
    setFlippedCards(newFlipped);

    if (newFlipped.every(f => f) && !interpretation) {
      setLoading(true);
      try {
        const res = await fetch('/api/reading', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question,
            spread: selectedSpread,
            lang,
            cards: drawnCards.map((c, i) => ({
              position: selectedSpread?.positions[i],
              name: lang === 'es' ? c.card.nameEs : c.card.name,
              reversed: c.reversed,
              upright: lang === 'es' ? c.card.uprightEs : c.card.upright,
              reversedMeaning: lang === 'es' ? c.card.reversedEs : c.card.reversed,
              keywords: lang === 'es' ? c.card.keywordsEs : c.card.keywords
            }))
          })
        });
        const data = await res.json();
        setInterpretation(data.interpretation);
      } catch (e) {
        setInterpretation(lang === 'es' ? 'No se pudo conectar con el oráculo.' : 'Could not connect to the oracle.');
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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center border-b border-white/10">
        <button onClick={handleReset} className="text-xl font-bold text-gradient">TarotCEO</button>
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 hidden sm:block">{t.tagline}</div>
          <button onClick={toggleLang} className="px-2 py-1 rounded text-xs font-bold bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition">
            {lang.toUpperCase()}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        
        {step === 'home' && (
          <div className="text-center max-w-lg animate-fade-in">
            <div className="text-6xl mb-6 animate-float">🎴</div>
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-gradient">{t.title1}</span>
              <br />
              <span className="text-white">{t.title2}</span>
            </h1>
            <p className="text-slate-400 mb-8">{t.subtitle}</p>
            <button onClick={() => setStep('spread')} className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 transition glow">
              {t.startReading}
            </button>
            <p className="text-xs text-slate-600 mt-8">{t.noSignup}</p>
          </div>
        )}

        {step === 'spread' && (
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-center mb-2">{t.chooseSpread}</h2>
            <p className="text-slate-400 text-center mb-8">{t.chooseSubtitle}</p>
            <div className="grid gap-4">
              {t.spreads.map(spread => (
                <button key={spread.id} onClick={() => handleSelectSpread(spread)} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-indigo-500 transition text-left group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition">{spread.name}</h3>
                      <p className="text-slate-400 text-sm mt-1">{spread.description}</p>
                    </div>
                    <div className="text-slate-500 text-sm">{spread.positions.length} {spread.positions.length > 1 ? t.cards : t.card}</div>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {spread.positions.map((pos, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-slate-700/50 rounded text-slate-400">{pos}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep('home')} className="mt-6 text-slate-500 text-sm hover:text-white transition">{t.back}</button>
          </div>
        )}

        {step === 'question' && selectedSpread && (
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold text-center mb-2">{selectedSpread.name}</h2>
            <p className="text-slate-400 text-center mb-8">{t.focusQuestion}</p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t.questionPlaceholder}
              className="w-full h-40 p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
            />
            <button onClick={handleStartReading} disabled={!question.trim()} className="mt-4 w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {t.drawCards}
            </button>
            <button onClick={() => setStep('spread')} className="mt-4 w-full text-slate-500 text-sm hover:text-white transition">{t.changeSpread}</button>
          </div>
        )}

        {step === 'reading' && selectedSpread && (
          <div className="w-full max-w-3xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gradient">{selectedSpread.name}</h2>
              <p className="text-slate-400 text-sm mt-1 italic">&quot;{question}&quot;</p>
            </div>
            
            <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-8">
              {drawnCards.map((drawn, i) => (
                <div key={i} className="text-center">
                  <TarotCard card={flippedCards[i] ? drawn.card : null} isReversed={drawn.reversed} isFlipped={flippedCards[i]} onClick={() => handleFlipCard(i)} lang={lang} />
                  <div className="mt-2 text-xs text-slate-500">{selectedSpread.positions[i]}</div>
                  {flippedCards[i] && (
                    <>
                      <div className="mt-1 text-sm font-medium text-amber-400">{lang === 'es' ? drawn.card.nameEs : drawn.card.name}</div>
                      {drawn.reversed && <div className="text-xs text-red-400">({t.reversed})</div>}
                    </>
                  )}
                </div>
              ))}
            </div>

            {!flippedCards.every(f => f) && (
              <p className="text-center text-slate-500 text-sm animate-pulse">{t.tapReveal}</p>
            )}

            {loading && (
              <div className="text-center py-8">
                <div className="text-2xl animate-spin inline-block">🌀</div>
                <p className="text-slate-400 mt-2">{t.consulting}</p>
              </div>
            )}

            {interpretation && (
              <div className="mt-6 p-6 bg-slate-800/50 rounded-xl border border-indigo-500/30">
                <h3 className="text-lg font-semibold text-indigo-400 mb-3">{t.strategicReading}</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">{interpretation}</p>
              </div>
            )}

            {interpretation && (
              <button onClick={handleReset} className="mt-6 w-full py-3 border border-slate-600 rounded-xl text-slate-400 hover:text-white hover:border-slate-400 transition">
                {t.newReading}
              </button>
            )}
          </div>
        )}

      </main>

      <footer className="p-4 text-center text-xs text-slate-600 border-t border-white/5">
        {t.madeBy} <a href="https://duendes.app" className="text-indigo-400 hover:underline">duendes.app</a> • 2026
      </footer>
    </div>
  );
}
