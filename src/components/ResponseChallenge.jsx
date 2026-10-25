import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Volume2, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Trophy, 
  Activity,
  Terminal,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { mindbloomStorage } from "../utils/mindbloomStorage";

// Themes data structure
const THEME_CONTENT = {
  animals: [
    { name: "Dog", voice: "dog", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400" },
    { name: "Cat", voice: "cat", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400" },
    { name: "Rabbit", voice: "rabbit", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=400" },
    { name: "Elephant", voice: "elephant", image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=400" },
    { name: "Lion", voice: "lion", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400" },
    { name: "Cow", voice: "cow", image: "https://images.unsplash.com/photo-1570042225831-d9b06b2d47e4?auto=format&fit=crop&q=80&w=400" },
    { name: "Horse", voice: "horse", image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400" },
    { name: "Monkey", voice: "monkey", image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&q=80&w=400" }
  ],
  shapes: [
    {
      name: "Circle",
      voice: "circle",
      isShape: true,
      render: (color = "#8B5CF6") => (
        <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill={color} />
        </svg>
      )
    },
    {
      name: "Square",
      voice: "square",
      isShape: true,
      render: (color = "#3B82F6") => (
        <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 100 100">
          <rect x="15" y="15" width="70" height="70" rx="8" fill={color} />
        </svg>
      )
    },
    {
      name: "Triangle",
      voice: "triangle",
      isShape: true,
      render: (color = "#10B981") => (
        <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 100 100">
          <polygon points="50,12 90,82 10,82" fill={color} strokeLinejoin="round" strokeWidth="4" stroke={color} />
        </svg>
      )
    },
    {
      name: "Star",
      voice: "star",
      isShape: true,
      render: (color = "#FBBF24") => (
        <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 100 100">
          <path d="M 50,10 L 62,38 L 92,38 L 68,55 L 77,85 L 50,68 L 23,85 L 32,55 L 8,38 L 38,38 Z" fill={color} strokeLinejoin="round" strokeWidth="4" stroke={color} />
        </svg>
      )
    },
    {
      name: "Rectangle",
      voice: "rectangle",
      isShape: true,
      render: (color = "#EC4899") => (
        <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 100 100">
          <rect x="10" y="25" width="80" height="50" rx="8" fill={color} />
        </svg>
      )
    }
  ],
  colours: [
    { name: "Red", voice: "red", isColour: true, hex: "#EF4444" },
    { name: "Blue", voice: "blue", isColour: true, hex: "#3B82F6" },
    { name: "Green", voice: "green", isColour: true, hex: "#10B981" },
    { name: "Yellow", voice: "yellow", isColour: true, hex: "#F59E0B" },
    { name: "Orange", voice: "orange", isColour: true, hex: "#F97316" },
    { name: "Purple", voice: "purple", isColour: true, hex: "#8B5CF6" }
  ]
};

// Text Speech helper using standard Web Speech API
const speakWord = (word) => {
  const speech = new SpeechSynthesisUtterance(word);
  speech.rate = 0.8; // slow rate
  speech.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
};

export default function ResponseChallenge({ onClose }) {
  // Game state workflow: START, PLAY, COMPLETE
  const [gameState, setGameState] = useState("START");
  const [selectedTheme, setSelectedTheme] = useState("");
  
  // Game session states
  const [roundNumber, setRoundNumber] = useState(1);
  const [targetItem, setTargetItem] = useState(null);
  const [options, setOptions] = useState([]);
  
  // Scoring parameters
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [responseTimes, setResponseTimes] = useState([]); // array of float seconds
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // correct answers selected
  
  // UI states
  const [feedback, setFeedback] = useState({ text: "Tap correct item below!", type: "info" });
  const [wrongIndices, setWrongIndices] = useState([]); // tracks wrong options selected in current round
  const [isLocked, setIsLocked] = useState(false); // locks board input on match transitions
  const [sessionID, setSessionID] = useState("");
  const [showTelemetryDrawer, setShowTelemetryDrawer] = useState(false);
  const [roundStartTime, setRoundStartTime] = useState(0);

  // Initialize a new round
  const setupRound = (roundIndex, themeKey) => {
    const list = THEME_CONTENT[themeKey];
    
    // 1. Pick a random target item
    const targetIdx = Math.floor(Math.random() * list.length);
    const target = list[targetIdx];
    
    // 2. Pick 3 distinct wrong options
    const remaining = list.filter(item => item.name !== target.name);
    
    // Shuffle remaining list to pick three random items
    const shuffledRemaining = [...remaining].sort(() => Math.random() - 0.5);
    const incorrectChoices = shuffledRemaining.slice(0, 3);
    
    // 3. Combine and shuffle all 4 choices
    const combinedOptions = [target, ...incorrectChoices];
    const shuffledOptions = [...combinedOptions].sort(() => Math.random() - 0.5);
    
    setTargetItem(target);
    setOptions(shuffledOptions);
    setWrongIndices([]);
    setFeedback({ text: "Tap the correct match below!", type: "info" });
    setIsLocked(false);
    setRoundStartTime(Date.now());
  };

  // Trigger game start
  const handleThemeSelection = (themeKey) => {
    setSelectedTheme(themeKey);
    setRoundNumber(1);
    setWrongAttempts(0);
    setTotalAttempts(0);
    setCorrectAnswersCount(0);
    setResponseTimes([]);
    setSessionID("res_" + Math.floor(100000 + Math.random() * 900000));
    setGameState("PLAY");
    setupRound(1, themeKey);
  };

  // Option selection handler
  const handleOptionClick = (option, index) => {
    if (isLocked || wrongIndices.includes(index)) return;
    
    setTotalAttempts(prev => prev + 1);
    
    if (option.name === targetItem.name) {
      // Correct Match!
      const timeTaken = (Date.now() - roundStartTime) / 1000;
      setResponseTimes(prev => [...prev, timeTaken]);
      setCorrectAnswersCount(prev => prev + 1);
      
      setFeedback({ text: "Great job! 🌟", type: "success" });
      setIsLocked(true);
      
      // Delay 1.2 seconds, then advance
      setTimeout(() => {
        if (roundNumber === 10) {
          setGameState("COMPLETE");
          const finalAcc = totalAttempts > 0 ? ((10 / totalAttempts) * 100) : 100;
          mindbloomStorage.saveTherapySession({
            game_name: "Response Challenge",
            level: `${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} (10 Rounds)`,
            correct_matches: 10,
            wrong_attempts: wrongAttempts,
            total_attempts: totalAttempts,
            accuracy: parseFloat(finalAcc.toFixed(1)),
            completion_time: Math.round(responseTimes.reduce((a, b) => a + b, 0) + timeTaken)
          });
        } else {
          setRoundNumber(prev => {
            const nextRound = prev + 1;
            setupRound(nextRound, selectedTheme);
            return nextRound;
          });
        }
      }, 1200);
    } else {
      // Incorrect Match
      setWrongAttempts(prev => prev + 1);
      setWrongIndices(prev => [...prev, index]);
      setFeedback({ text: "Let's try again 😊", type: "warning" });
    }
  };

  // Restart current theme game
  const handleRestart = () => {
    handleThemeSelection(selectedTheme);
  };

  // Go back to selection page
  const handleChooseAnotherTheme = () => {
    setGameState("START");
    setSelectedTheme("");
  };

  // Score statistics calculations
  const totalRounds = 10;
  const correctCount = correctAnswersCount;
  const accuracyPercent = totalAttempts > 0 ? (correctCount / totalAttempts) * 100 : 0;
  const avgResponseTime = responseTimes.length > 0 
    ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
    : 0;

  // Final telemetry payload format
  const telemetryData = {
    game: "response-challenge",
    theme: selectedTheme,
    rounds: totalRounds,
    correct: correctCount,
    accuracy: parseFloat(accuracyPercent.toFixed(1)),
    averageResponseTime: parseFloat(avgResponseTime.toFixed(2)),
    totalAttempts: totalAttempts,
    session_id: sessionID,
    timestamp: new Date().toISOString()
  };

  return (
    <div className="w-full max-w-4xl mx-auto transition-colors duration-300">
      
      {/* Back Button Actions */}
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
        <h1 className="text-4xl font-extrabold text-violet-600 dark:text-violet-400 mb-2">
          Response Challenge
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Practice visual focus, auditory cues, and quick responses!
        </p>
      </div>

      {/* Main Game Interface Board */}
      <div className="bg-white dark:bg-gray-850 rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-100 dark:border-gray-800 transition duration-300">
        
        {/* ================= SCREEN 1: THEME SELECTION ================= */}
        {gameState === "START" && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Choose something you would like to practice
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
              Select a theme to begin your visual matching exercises. Each challenge is 10 rounds.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Animals Card */}
              <button 
                onClick={() => handleThemeSelection("animals")}
                className="flex flex-col items-center text-center p-6 bg-slate-50 hover:bg-violet-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 rounded-2xl border-4 border-transparent hover:border-violet-500 focus:border-violet-500 transition duration-300 outline-none group cursor-pointer"
              >
                <span className="text-5xl mb-4 group-hover:scale-110 transition duration-300">🐾</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white mb-2">Animals</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">Identify familiar animals using photos</span>
              </button>

              {/* Shapes Card */}
              <button 
                onClick={() => handleThemeSelection("shapes")}
                className="flex flex-col items-center text-center p-6 bg-slate-50 hover:bg-violet-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 rounded-2xl border-4 border-transparent hover:border-violet-500 focus:border-violet-500 transition duration-300 outline-none group cursor-pointer"
              >
                <span className="text-5xl mb-4 group-hover:scale-110 transition duration-300">🔷</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white mb-2">Shapes</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">Identify shapes using solid vectors</span>
              </button>

              {/* Colours Card */}
              <button 
                onClick={() => handleThemeSelection("colours")}
                className="flex flex-col items-center text-center p-6 bg-slate-50 hover:bg-violet-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 rounded-2xl border-4 border-transparent hover:border-violet-500 focus:border-violet-500 transition duration-300 outline-none group cursor-pointer"
              >
                <span className="text-5xl mb-4 group-hover:scale-110 transition duration-300">🎨</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white mb-2">Colours</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">Recognize and identify core colours</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= SCREEN 2: ACTIVE GAMEPLAY ================= */}
        {gameState === "PLAY" && targetItem && (
          <div className="flex flex-col items-center">
            
            {/* Header info */}
            <div className="w-full flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-850 pb-4">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Theme: {selectedTheme}
              </span>
              <span className="text-lg font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-4 py-1.5 rounded-full">
                Round {roundNumber} of 10
              </span>
            </div>

            {/* Instruction Banner */}
            <div className="text-center mb-6">
              <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
                Find the <span className="text-violet-600 dark:text-violet-400 uppercase">{targetItem.name}</span>
              </h2>
              
              <button
                onClick={() => speakWord(targetItem.voice)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition duration-200"
              >
                <Volume2 size={20} />
                Listen
              </button>
            </div>

            {/* Match feedback banner */}
            <div className={`w-full max-w-md py-3 px-6 rounded-2xl text-center font-bold text-lg mb-8 transition-all duration-300 ${
              feedback.type === "success" 
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 scale-105 border-2 border-emerald-100 dark:border-emerald-900" 
                : feedback.type === "warning"
                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-2 border-amber-100 dark:border-amber-900"
                : "bg-slate-50 dark:bg-gray-800/40 text-gray-500 dark:text-gray-400 border border-transparent"
            }`}>
              {feedback.text}
            </div>

            {/* Choices grid (2x2) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl mb-8">
              {options.map((option, idx) => {
                const isWrong = wrongIndices.includes(idx);
                const isRightAndSolved = isLocked && option.name === targetItem.name;
                
                return (
                  <button
                    key={`${option.name}_${idx}`}
                    onClick={() => handleOptionClick(option, idx)}
                    disabled={isLocked || isWrong}
                    className={`aspect-square w-full rounded-3xl border-4 transition-all duration-300 overflow-hidden flex items-center justify-center p-3 relative bg-slate-50 dark:bg-gray-800 outline-none cursor-pointer ${
                      isRightAndSolved
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 scale-95 shadow-lg"
                        : isWrong
                        ? "border-amber-400 dark:border-amber-500 bg-amber-50/20 dark:bg-amber-950/10 opacity-30 cursor-not-allowed"
                        : "border-gray-200 dark:border-gray-700 hover:border-violet-500 dark:hover:border-violet-500 hover:-translate-y-1 hover:shadow-md"
                    }`}
                  >
                    {/* Visual option renderer: Animal Photo, SVG Shape, or Color Card */}
                    {option.image && (
                      <img 
                        src={option.image} 
                        alt={option.name} 
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    )}
                    
                    {option.isShape && (
                      <div className="flex items-center justify-center w-full h-full">
                        {option.render(isWrong ? "#D1D5DB" : undefined)}
                      </div>
                    )}
                    
                    {option.isColour && (
                      <div 
                        className="w-full h-full rounded-2xl shadow-inner border border-gray-100 dark:border-gray-900"
                        style={{ backgroundColor: isWrong ? "#D1D5DB" : option.hex }}
                      />
                    )}

                    {/* Feedback overlays */}
                    {isRightAndSolved && (
                      <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/10 flex items-center justify-center">
                        <span className="bg-emerald-500 text-white rounded-full p-2.5 shadow-md">
                          <Check size={28} strokeWidth={3} />
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center w-full border-t border-gray-100 dark:border-gray-850 pt-4">
              <button 
                onClick={handleRestart}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl transition font-medium"
              >
                <RotateCcw size={16} />
                Restart Challenge
              </button>
            </div>

          </div>
        )}

        {/* ================= SCREEN 3: COMPLETION SCREEN ================= */}
        {gameState === "COMPLETE" && (
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-2">
              Challenge Complete! 🌟
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-lg">
              You completed the Response Challenge game. Excellent visual focus!
            </p>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mb-8">
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Theme</span>
                <span className="text-lg font-bold text-gray-800 dark:text-white capitalize">{selectedTheme}</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Accuracy</span>
                <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{accuracyPercent.toFixed(1)}%</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Correct</span>
                <span className="text-2xl font-black text-emerald-500">{correctCount} / 10</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">Avg Speed</span>
                <span className="text-2xl font-black text-amber-500">{avgResponseTime.toFixed(1)}s</span>
              </div>
            </div>

            {/* Telemetry panel for developer/clinician validation */}
            <details className="w-full max-w-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-800 rounded-2xl text-left overflow-hidden mb-8">
              <summary 
                onClick={() => setShowTelemetryDrawer(!showTelemetryDrawer)} 
                className="px-5 py-3.5 bg-gray-100 dark:bg-gray-800/80 font-bold text-sm text-gray-600 dark:text-gray-300 flex justify-between items-center cursor-pointer select-none"
              >
                <span className="flex items-center gap-2">
                  <Terminal size={14} />
                  MindBloom Telemetry Log (Developer Preview)
                </span>
                {showTelemetryDrawer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </summary>
              <div className="p-5 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                  The JSON below is stored in the local frontend state and is structured to sync with MindBloom's cognitive screening analytics models:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-56">
                  <code>{JSON.stringify(telemetryData, null, 2)}</code>
                </pre>
              </div>
            </details>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
              <button 
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition duration-200 w-full"
              >
                <RotateCcw size={18} />
                Play Again
              </button>
              <button 
                onClick={handleChooseAnotherTheme}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-850 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full font-bold border border-gray-200 dark:border-gray-750 transition duration-200 w-full"
              >
                Choose Another Theme
              </button>
            </div>
            
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-sm mt-8 leading-relaxed">
              These results are activity observations and are not a medical diagnosis.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
