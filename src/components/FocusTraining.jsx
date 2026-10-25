import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  RotateCcw, 
  Sparkles, 
  Eye, 
  Target, 
  Award, 
  Volume2, 
  Check, 
  Terminal,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { mindbloomStorage } from "../utils/mindbloomStorage";

// 9 calm celestial positions for the star
const GRID_CELLS = [
  { id: 0, label: "Top Left", symbol: "🌸" },
  { id: 1, label: "Top Center", symbol: "🌿" },
  { id: 2, label: "Top Right", symbol: "🌸" },
  { id: 3, label: "Middle Left", symbol: "🌿" },
  { id: 4, label: "Center Garden", symbol: "🌼" },
  { id: 5, label: "Middle Right", symbol: "🌿" },
  { id: 6, label: "Bottom Left", symbol: "🌸" },
  { id: 7, label: "Bottom Center", symbol: "🌿" },
  { id: 8, label: "Bottom Right", symbol: "🌸" }
];

const GENTLE_PROMPTS = [
  "Great focus! 🌟",
  "You caught the star! ✨",
  "Wonderful attention! 🌼",
  "Nice catch! Keep watching! 🎈",
  "Super calm and focused! ☀️"
];

// Gentle Web Audio API synthesizer for positive reinforcement (non-startling soft chime)
const playSoftChime = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // Audio context not allowed or unsupported
  }
};

export default function FocusTraining({ onClose }) {
  const [gameState, setGameState] = useState("START"); // START, PLAY, COMPLETE
  const [roundNumber, setRoundNumber] = useState(1);
  const totalRounds = 8;

  // Active target cell (0-8)
  const [activeCell, setActiveCell] = useState(4);
  const [isGlowing, setIsGlowing] = useState(false);
  const [roundStartTimestamp, setRoundStartTimestamp] = useState(0);

  // Scoring metrics
  const [hits, setHits] = useState(0);
  const [earlyTaps, setEarlyTaps] = useState(0);
  const [latencies, setLatencies] = useState([]);
  const [feedback, setFeedback] = useState({ text: "Watch the garden and tap the star when it glows!", type: "info" });
  const [sessionStartTime, setSessionStartTime] = useState(0);
  const [showTelemetry, setShowTelemetry] = useState(false);

  const moveTimeoutRef = useRef(null);
  const glowTimeoutRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(moveTimeoutRef.current);
      clearTimeout(glowTimeoutRef.current);
    };
  }, []);

  // Initiate a round
  const startNextRound = (currentRnd) => {
    setIsGlowing(false);
    setFeedback({ text: "Watch carefully... where will it glow? 👀", type: "info" });

    // Pick a new random cell different from current
    let nextCell;
    do {
      nextCell = Math.floor(Math.random() * 9);
    } while (nextCell === activeCell);

    setActiveCell(nextCell);

    // Random calm delay between 1.2s and 2.5s before the star glows
    const delay = 1200 + Math.random() * 1300;
    moveTimeoutRef.current = setTimeout(() => {
      setIsGlowing(true);
      setRoundStartTimestamp(Date.now());
      setFeedback({ text: "Now! Tap the glowing star! ⭐", type: "highlight" });
    }, delay);
  };

  const handleStartGame = () => {
    setHits(0);
    setEarlyTaps(0);
    setLatencies([]);
    setRoundNumber(1);
    setSessionStartTime(Date.now());
    setGameState("PLAY");
    startNextRound(1);
  };

  const handleCellClick = (cellIndex) => {
    if (gameState !== "PLAY") return;

    if (cellIndex === activeCell && isGlowing) {
      // Successful catch!
      const latency = (Date.now() - roundStartTimestamp) / 1000;
      setLatencies(prev => [...prev, latency]);
      setHits(prev => prev + 1);
      setIsGlowing(false);
      playSoftChime();

      const cheer = GENTLE_PROMPTS[Math.floor(Math.random() * GENTLE_PROMPTS.length)];
      setFeedback({ text: cheer, type: "success" });

      setTimeout(() => {
        if (roundNumber >= totalRounds) {
          finishGame(hits + 1, earlyTaps, [...latencies, latency]);
        } else {
          setRoundNumber(prev => {
            const next = prev + 1;
            startNextRound(next);
            return next;
          });
        }
      }, 1200);
    } else {
      // Tapped too early or wrong cell
      setEarlyTaps(prev => prev + 1);
      setFeedback({ text: "Wait for the star to glow, then tap! 😊", type: "warning" });
    }
  };

  const finishGame = (finalHits, finalEarly, finalLatencies) => {
    setGameState("COMPLETE");
    const duration = Math.round((Date.now() - sessionStartTime) / 1000);
    const totalAttempts = finalHits + finalEarly;
    const accuracy = totalAttempts > 0 ? (finalHits / totalAttempts) * 100 : 100;

    mindbloomStorage.saveTherapySession({
      game_name: "Focus Training",
      level: "Garden Star Path (8 Rounds)",
      correct_matches: finalHits,
      wrong_attempts: finalEarly,
      total_attempts: totalAttempts,
      accuracy: parseFloat(accuracy.toFixed(1)),
      completion_time: duration
    });
  };

  const avgLatency = latencies.length > 0 
    ? (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2)
    : "1.25";

  const totalActions = hits + earlyTaps;
  const accuracyPercent = totalActions > 0 ? ((hits / totalActions) * 100).toFixed(1) : "100";

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
        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
          Focus Training
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Practice visual tracking, patient focus, and gentle motor timing!
        </p>
      </div>

      <div className="bg-white dark:bg-gray-850 rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-100 dark:border-gray-800 transition duration-300">

        {/* ================= SCREEN 1: START SCREEN ================= */}
        {gameState === "START" && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-5xl mb-6 shadow-inner animate-pulse">
              ⭐
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              Ready for Garden Star Focus?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8 text-base leading-relaxed">
              A calm little star will travel through the garden flowers. 
              Watch patiently, and tap the star when it begins to <strong>gently glow</strong>!
            </p>
            <button 
              onClick={handleStartGame}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Start Focus Activity
            </button>
          </div>
        )}

        {/* ================= SCREEN 2: GAMEPLAY BOARD ================= */}
        {gameState === "PLAY" && (
          <div className="flex flex-col items-center">
            
            {/* HUD Header */}
            <div className="w-full flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Eye size={16} className="text-blue-500" />
                Visual Attention Tracking
              </span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-4 py-1.5 rounded-full">
                Round {roundNumber} of {totalRounds}
              </span>
            </div>

            {/* Instruction/Feedback Banner */}
            <div className={`w-full max-w-md py-3 px-6 rounded-2xl text-center font-bold text-lg mb-8 transition-all duration-300 ${
              feedback.type === "success" 
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 scale-105 border-2 border-emerald-200 dark:border-emerald-800" 
                : feedback.type === "highlight"
                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-2 border-amber-300 animate-pulse"
                : feedback.type === "warning"
                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-2 border-amber-200"
                : "bg-slate-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            }`}>
              {feedback.text}
            </div>

            {/* 3x3 Garden Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-md mb-8">
              {GRID_CELLS.map((cell, idx) => {
                const isTargetHere = activeCell === idx;
                return (
                  <button
                    key={cell.id}
                    onClick={() => handleCellClick(idx)}
                    type="button"
                    className={`aspect-square rounded-3xl border-3 flex flex-col items-center justify-center p-3 transition-all duration-300 relative cursor-pointer outline-none ${
                      isTargetHere && isGlowing
                        ? "border-amber-400 bg-amber-50 dark:bg-amber-950/50 shadow-xl shadow-amber-200/50 scale-105"
                        : isTargetHere
                        ? "border-blue-400 bg-blue-50/70 dark:bg-blue-950/30 scale-100"
                        : "border-gray-200 dark:border-gray-700 bg-slate-50/70 dark:bg-gray-800/60 hover:border-gray-300"
                    }`}
                  >
                    {isTargetHere ? (
                      <div className="flex flex-col items-center">
                        <span className={`text-4xl sm:text-5xl transition-all duration-300 ${isGlowing ? "scale-125 filter drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]" : "opacity-90"}`}>
                          ⭐
                        </span>
                        {isGlowing && (
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1 uppercase tracking-wider">
                            TAP!
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-2xl sm:text-3xl opacity-40 hover:opacity-60 transition">
                        {cell.symbol}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center w-full border-t border-gray-100 dark:border-gray-800 pt-4">
              <button 
                onClick={handleStartGame}
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
            <div className="text-6xl mb-4 animate-bounce">🌟</div>
            <h2 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
              Focus Training Complete!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-base">
              You tracked the star with great calmness and attention throughout the garden!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mb-8">
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Target Hits</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{hits} / {totalRounds}</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Focus Accuracy</span>
                <span className="text-2xl font-bold text-emerald-500">{accuracyPercent}%</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Avg Reaction</span>
                <span className="text-2xl font-bold text-amber-500">{avgLatency}s</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Impulse Control</span>
                <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                  {earlyTaps === 0 ? "Excellent" : `${earlyTaps} re-cues`}
                </span>
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
                  Devynex / MindBloom Session Telemetry Log
                </span>
                {showTelemetry ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </summary>
              <div className="p-5 border-t border-gray-200 dark:border-gray-800">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto">
                  <code>{JSON.stringify({
                    game: "focus-training",
                    rounds_completed: totalRounds,
                    target_hits: hits,
                    early_attempts: earlyTaps,
                    accuracy: parseFloat(accuracyPercent),
                    average_latency_sec: parseFloat(avgLatency),
                    timestamp: new Date().toISOString()
                  }, null, 2)}</code>
                </pre>
              </div>
            </details>

            <button 
              onClick={handleStartGame}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition flex items-center gap-2"
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
