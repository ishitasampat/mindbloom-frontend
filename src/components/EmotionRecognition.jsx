import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  Heart, 
  Check, 
  Terminal,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { mindbloomStorage } from "../utils/mindbloomStorage";

// High-contrast, friendly SVG illustrated emotions
const EMOTIONS = [
  {
    id: "happy",
    name: "Happy",
    prompt: "Who is feeling HAPPY?",
    voiceText: "Happy",
    color: "#10B981",
    bgColor: "#ECFDF5",
    svg: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28">
        <circle cx="50" cy="50" r="42" fill="#FEF08A" stroke="#EAB308" strokeWidth="4" />
        {/* Smiling Eyes */}
        <path d="M 32,42 Q 38,36 44,42" stroke="#713F12" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 56,42 Q 62,36 68,42" stroke="#713F12" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        {/* Rosy Cheeks */}
        <circle cx="28" cy="52" r="6" fill="#F87171" opacity="0.6" />
        <circle cx="72" cy="52" r="6" fill="#F87171" opacity="0.6" />
        {/* Big Smile */}
        <path d="M 32,56 Q 50,78 68,56" stroke="#713F12" strokeWidth="4.5" strokeLinecap="round" fill="#FDE047" />
        <path d="M 40,64 Q 50,74 60,64 Z" fill="#EF4444" />
      </svg>
    )
  },
  {
    id: "calm",
    name: "Calm",
    prompt: "Who is feeling CALM and peaceful?",
    voiceText: "Calm",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    svg: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28">
        <circle cx="50" cy="50" r="42" fill="#BFDBFE" stroke="#60A5FA" strokeWidth="4" />
        {/* Peaceful closed eyes */}
        <path d="M 30,46 Q 38,50 44,46" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 56,46 Q 62,50 70,46" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Gentle calm smile */}
        <path d="M 38,62 Q 50,68 62,62" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="28" cy="54" r="5" fill="#93C5FD" opacity="0.6" />
        <circle cx="72" cy="54" r="5" fill="#93C5FD" opacity="0.6" />
      </svg>
    )
  },
  {
    id: "surprised",
    name: "Surprised",
    prompt: "Who looks SURPRISED?",
    voiceText: "Surprised",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    svg: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28">
        <circle cx="50" cy="50" r="42" fill="#FED7AA" stroke="#F97316" strokeWidth="4" />
        {/* High Eyebrows */}
        <path d="M 30,32 Q 38,26 44,32" stroke="#7C2D12" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 56,32 Q 62,26 70,32" stroke="#7C2D12" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Wide Eyes */}
        <circle cx="38" cy="44" r="7" fill="#7C2D12" />
        <circle cx="36" cy="42" r="2" fill="#FFFFFF" />
        <circle cx="62" cy="44" r="7" fill="#7C2D12" />
        <circle cx="60" cy="42" r="2" fill="#FFFFFF" />
        {/* Open 'O' Mouth */}
        <ellipse cx="50" cy="65" rx="9" ry="12" fill="#7C2D12" />
        <ellipse cx="50" cy="65" rx="6" ry="8" fill="#F87171" />
      </svg>
    )
  },
  {
    id: "sad",
    name: "Sad",
    prompt: "Who is feeling SAD and needs comfort?",
    voiceText: "Sad",
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
    svg: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28">
        <circle cx="50" cy="50" r="42" fill="#E9D5FF" stroke="#A855F7" strokeWidth="4" />
        {/* Downturned Eyebrows */}
        <path d="M 30,38 Q 38,42 44,38" stroke="#4C1D95" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 56,38 Q 62,42 70,38" stroke="#4C1D95" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Sad eyes */}
        <circle cx="38" cy="46" r="5" fill="#4C1D95" />
        <circle cx="62" cy="46" r="5" fill="#4C1D95" />
        {/* Gentle Tear */}
        <path d="M 68,54 C 68,58 64,62 64,65 C 64,68 68,70 70,68 C 72,66 72,56 68,54 Z" fill="#60A5FA" />
        {/* Pouting Downturned Mouth */}
        <path d="M 36,68 Q 50,56 64,68" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    )
  }
];

const speakWord = (text) => {
  try {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.8;
    speech.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  } catch {
    // Unsupported
  }
};

export default function EmotionRecognition({ onClose }) {
  const [gameState, setGameState] = useState("START"); // START, PLAY, COMPLETE
  const [roundNumber, setRoundNumber] = useState(1);
  const totalRounds = 8;

  const [targetEmotion, setTargetEmotion] = useState(null);
  const [choices, setChoices] = useState([]);
  const [wrongIndices, setWrongIndices] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  // Stats
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [latencies, setLatencies] = useState([]);
  const [roundStartTime, setRoundStartTime] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(0);
  const [feedback, setFeedback] = useState({ text: "Tap the face that matches the feeling!", type: "info" });
  const [showTelemetry, setShowTelemetry] = useState(false);

  const initRound = (rnd) => {
    // Pick random target emotion
    const targetIdx = Math.floor(Math.random() * EMOTIONS.length);
    const target = EMOTIONS[targetIdx];
    setTargetEmotion(target);

    // Shuffle all 4 emotions
    const shuffled = [...EMOTIONS].sort(() => Math.random() - 0.5);
    setChoices(shuffled);
    setWrongIndices([]);
    setIsLocked(false);
    setFeedback({ text: `Find the ${target.name} face!`, type: "info" });
    setRoundStartTime(Date.now());
  };

  const handleStart = () => {
    setCorrectCount(0);
    setWrongAttempts(0);
    setTotalAttempts(0);
    setLatencies([]);
    setRoundNumber(1);
    setSessionStartTime(Date.now());
    setGameState("PLAY");
    initRound(1);
  };

  const handleChoiceClick = (emotion, index) => {
    if (isLocked || wrongIndices.includes(index)) return;

    setTotalAttempts(prev => prev + 1);

    if (emotion.id === targetEmotion.id) {
      // Correct!
      const elapsed = (Date.now() - roundStartTime) / 1000;
      setLatencies(prev => [...prev, elapsed]);
      setCorrectCount(prev => prev + 1);
      setIsLocked(true);
      setFeedback({ text: `Great job! That's ${targetEmotion.name}! 🌟`, type: "success" });

      setTimeout(() => {
        if (roundNumber >= totalRounds) {
          finishGame(correctCount + 1, wrongAttempts, [...latencies, elapsed]);
        } else {
          setRoundNumber(prev => {
            const next = prev + 1;
            initRound(next);
            return next;
          });
        }
      }, 1200);
    } else {
      // Try again
      setWrongAttempts(prev => prev + 1);
      setWrongIndices(prev => [...prev, index]);
      setFeedback({ text: "Let's try again! Look at the smile or eyes 😊", type: "warning" });
    }
  };

  const finishGame = (finalCorrect, finalWrong, finalLatencies) => {
    setGameState("COMPLETE");
    const totalActions = finalCorrect + finalWrong;
    const accuracy = totalActions > 0 ? (finalCorrect / totalActions) * 100 : 100;
    const duration = Math.round((Date.now() - sessionStartTime) / 1000);

    mindbloomStorage.saveTherapySession({
      game_name: "Emotion Recognition",
      level: "Social Expressions (8 Rounds)",
      correct_matches: finalCorrect,
      wrong_attempts: finalWrong,
      total_attempts: totalActions,
      accuracy: parseFloat(accuracy.toFixed(1)),
      completion_time: duration
    });
  };

  const accuracyPercent = totalAttempts > 0 
    ? ((correctCount / totalAttempts) * 100).toFixed(1) 
    : "100";

  const avgSpeed = latencies.length > 0 
    ? (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(1)
    : "1.8";

  return (
    <div className="w-full max-w-4xl mx-auto transition-colors duration-300">
      
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onClose} 
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl transition duration-200 font-medium"
        >
          <ArrowLeft size={16} />
          Back to Therapy List
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-2">
          Emotion Recognition
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Learn and identify friendly facial expressions and social feelings!
        </p>
      </div>

      <div className="bg-white dark:bg-gray-850 rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-100 dark:border-gray-800 transition duration-300">

        {/* ================= SCREEN 1: START SCREEN ================= */}
        {gameState === "START" && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-5xl mb-6 shadow-inner">
              😊
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              Explore Friendly Feelings
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8 text-base leading-relaxed">
              We will practice finding different emotions: Happy, Calm, Surprised, and Sad. 
              Listen to the friendly voice or read the cue, then pick the matching expression!
            </p>
            <button 
              onClick={handleStart}
              className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Start Activity
            </button>
          </div>
        )}

        {/* ================= SCREEN 2: GAMEPLAY ================= */}
        {gameState === "PLAY" && targetEmotion && (
          <div className="flex flex-col items-center">
            
            {/* Header info */}
            <div className="w-full flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-850 pb-4">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Heart size={16} className="text-emerald-500" />
                Social Emotion Matching
              </span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-1.5 rounded-full">
                Round {roundNumber} of {totalRounds}
              </span>
            </div>

            {/* Instruction Banner & Listen Button */}
            <div className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
                Find <span className="text-emerald-600 dark:text-emerald-400 uppercase">{targetEmotion.name}</span>
              </h2>
              
              <button
                onClick={() => speakWord(targetEmotion.prompt)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition duration-200"
              >
                <Volume2 size={18} />
                Listen
              </button>
            </div>

            {/* Feedback Bar */}
            <div className={`w-full max-w-md py-3 px-6 rounded-2xl text-center font-bold text-lg mb-8 transition-all duration-300 ${
              feedback.type === "success" 
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 scale-105 border-2 border-emerald-200" 
                : feedback.type === "warning"
                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-2 border-amber-200"
                : "bg-slate-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            }`}>
              {feedback.text}
            </div>

            {/* 2x2 Grid of Emotions */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-md mb-8">
              {choices.map((emotion, idx) => {
                const isWrong = wrongIndices.includes(idx);
                const isSolved = isLocked && emotion.id === targetEmotion.id;

                return (
                  <button
                    key={`${emotion.id}_${idx}`}
                    onClick={() => handleChoiceClick(emotion, idx)}
                    disabled={isLocked || isWrong}
                    type="button"
                    className={`aspect-square rounded-3xl border-4 p-4 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer outline-none relative ${
                      isSolved
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 scale-105 shadow-lg"
                        : isWrong
                        ? "border-gray-200 dark:border-gray-700 opacity-25 cursor-not-allowed bg-gray-50 dark:bg-gray-800"
                        : "border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 hover:border-emerald-500 hover:-translate-y-1 shadow-sm"
                    }`}
                  >
                    {emotion.svg}
                    <span className="font-bold text-base text-gray-700 dark:text-gray-200 mt-2">
                      {emotion.name}
                    </span>

                    {isSolved && (
                      <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full p-1.5 shadow">
                        <Check size={18} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center w-full border-t border-gray-100 dark:border-gray-850 pt-4">
              <button 
                onClick={handleStart}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl transition font-medium"
              >
                <RotateCcw size={16} />
                Restart Activity
              </button>
            </div>

          </div>
        )}

        {/* ================= SCREEN 3: COMPLETION SCREEN ================= */}
        {gameState === "COMPLETE" && (
          <div className="flex flex-col items-center text-center py-4">
            <div className="text-6xl mb-4 animate-bounce">💖</div>
            <h2 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-2">
              Emotion Activity Complete!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-base">
              You recognized all the facial expressions and emotions wonderfully!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mb-8">
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Rounds</span>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{totalRounds}</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Accuracy</span>
                <span className="text-2xl font-bold text-emerald-500">{accuracyPercent}%</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Avg Response</span>
                <span className="text-2xl font-bold text-amber-500">{avgSpeed}s</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Total Attempts</span>
                <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">{totalAttempts}</span>
              </div>
            </div>

            {/* Developer Telemetry Drawer */}
            <details className="w-full max-w-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-800 rounded-2xl text-left overflow-hidden mb-8">
              <summary 
                onClick={() => setShowTelemetry(!showTelemetry)}
                className="px-5 py-3.5 bg-gray-100 dark:bg-gray-800/80 font-bold text-sm text-gray-600 dark:text-gray-300 flex justify-between items-center cursor-pointer select-none"
              >
                <span className="flex items-center gap-2">
                  <Terminal size={14} />
                  MindBloom Social Emotion Telemetry Log
                </span>
                {showTelemetry ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </summary>
              <div className="p-5 border-t border-gray-200 dark:border-gray-800">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto">
                  <code>{JSON.stringify({
                    game: "emotion-recognition",
                    rounds_completed: totalRounds,
                    correct_recognitions: correctCount,
                    re_cues_needed: wrongAttempts,
                    accuracy: parseFloat(accuracyPercent),
                    average_latency_sec: parseFloat(avgSpeed),
                    timestamp: new Date().toISOString()
                  }, null, 2)}</code>
                </pre>
              </div>
            </details>

            <button 
              onClick={handleStart}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Play Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
