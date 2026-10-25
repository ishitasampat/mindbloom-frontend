import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Gamepad2, 
  Check, 
  Award,
  Terminal
} from "lucide-react";
import { mindbloomStorage } from "../utils/mindbloomStorage";
import "./MemoryMatch.css";

// Vector SVG objects (Dog, Cat, Apple, Car, Star)
const CARD_TYPES = [
  {
    id: 'dog',
    name: 'Dog',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Cute Dog">
        <circle cx="50" cy="50" r="38" fill="#F4E0C8"/>
        <path d="M 14,32 C 6,45 8,65 18,65 C 28,65 24,40 24,32 Z" fill="#8B5A2B"/>
        <path d="M 86,32 C 94,45 92,65 82,65 C 72,65 76,40 76,32 Z" fill="#8B5A2B"/>
        <circle cx="38" cy="45" r="5" fill="#2C3E50"/>
        <circle cx="38" cy="43" r="1.5" fill="#FFFFFF"/>
        <circle cx="62" cy="45" r="5" fill="#2C3E50"/>
        <circle cx="62" cy="43" r="1.5" fill="#FFFFFF"/>
        <circle cx="28" cy="55" r="4.5" fill="#FFADAD" opacity="0.6"/>
        <circle cx="72" cy="55" r="4.5" fill="#FFADAD" opacity="0.6"/>
        <ellipse cx="50" cy="55" r="9" rx="9" ry="6" fill="#FFFFFF"/>
        <polygon points="46,52 54,52 50,56" fill="#2C3E50"/>
        <path d="M 46,57 Q 50,60 54,57" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M 48,59 Q 50,65 52,59 Z" fill="#FF6B6B"/>
      </svg>
    `
  },
  {
    id: 'cat',
    name: 'Cat',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Cute Cat">
        <polygon points="18,16 38,40 18,46" fill="#E67E22" stroke="#D35400" stroke-width="0.5"/>
        <polygon points="22,23 32,38 21,41" fill="#FFD2D2"/>
        <polygon points="82,16 62,40 82,46" fill="#E67E22" stroke="#D35400" stroke-width="0.5"/>
        <polygon points="78,23 68,38 79,41" fill="#FFD2D2"/>
        <circle cx="50" cy="52" r="35" fill="#F39C12"/>
        <circle cx="36" cy="48" r="5" fill="#2C3E50"/>
        <circle cx="36" cy="46" r="1.5" fill="#FFFFFF"/>
        <circle cx="64" cy="48" r="5" fill="#2C3E50"/>
        <circle cx="64" cy="46" r="1.5" fill="#FFFFFF"/>
        <circle cx="26" cy="58" r="4.5" fill="#FF8A8A" opacity="0.6"/>
        <circle cx="74" cy="58" r="4.5" fill="#FF8A8A" opacity="0.6"/>
        <polygon points="48,54 52,54 50,56" fill="#FF7675"/>
        <path d="M 46,59 Q 50,62 50,59 Q 50,62 54,59" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <line x1="22" y1="56" x2="8" y2="54" stroke="#2C3E50" stroke-width="2" stroke-linecap="round"/>
        <line x1="22" y1="60" x2="6" y2="60" stroke="#2C3E50" stroke-width="2" stroke-linecap="round"/>
        <line x1="78" y1="56" x2="92" y2="54" stroke="#2C3E50" stroke-width="2" stroke-linecap="round"/>
        <line x1="78" y1="60" x2="94" y2="60" stroke="#2C3E50" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'apple',
    name: 'Apple',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Red Apple">
        <path d="M 50,22 Q 55,10 63,8" stroke="#8B5A2B" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M 54,16 Q 66,10 68,20 Q 58,22 54,16 Z" fill="#2ECC71"/>
        <path d="M 50,28 C 30,24 14,36 16,56 C 18,74 38,88 50,86 C 62,88 82,74 84,56 C 86,36 70,24 50,28 Z" fill="#FF4D4D"/>
        <ellipse cx="32" cy="44" r="8" rx="8" ry="4" transform="rotate(-30 32 44)" fill="#FFFFFF" opacity="0.4"/>
        <circle cx="40" cy="54" r="3" fill="#2C3E50"/>
        <circle cx="60" cy="54" r="3" fill="#2C3E50"/>
        <path d="M 46,60 Q 50,64 54,60" stroke="#2C3E50" stroke-width="2" stroke-linecap="round" fill="none"/>
        <circle cx="33" cy="58" r="3" fill="#FFAAAA" opacity="0.8"/>
        <circle cx="67" cy="58" r="3" fill="#FFAAAA" opacity="0.8"/>
      </svg>
    `
  },
  {
    id: 'car',
    name: 'Car',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Cartoon Car">
        <ellipse cx="50" cy="78" rx="38" ry="4" fill="#BDC3C7" opacity="0.6"/>
        <path d="M 28,52 C 30,36 40,32 50,32 C 60,32 70,36 72,52 Z" fill="#3498DB"/>
        <path d="M 33,50 C 35,39 42,36 48,36 L 48,50 Z" fill="#AED6F1"/>
        <path d="M 67,50 C 65,39 58,36 52,36 L 52,50 Z" fill="#AED6F1"/>
        <rect x="14" y="48" width="72" height="20" rx="8" fill="#2980B9"/>
        <circle cx="18" cy="56" r="3.5" fill="#F1C40F"/>
        <circle cx="82" cy="56" r="3.5" fill="#F1C40F"/>
        <circle cx="30" cy="68" r="11" fill="#2C3E50"/>
        <circle cx="30" cy="68" r="5" fill="#BDC3C7"/>
        <circle cx="70" cy="68" r="11" fill="#2C3E50"/>
        <circle cx="70" cy="68" r="5" fill="#BDC3C7"/>
        <circle cx="45" cy="58" r="1.5" fill="#FFFFFF"/>
        <circle cx="55" cy="58" r="1.5" fill="#FFFFFF"/>
        <path d="M 48,61 Q 50,63 52,61" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      </svg>
    `
  },
  {
    id: 'star',
    name: 'Star',
    svg: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Smiling Star">
        <path d="M 50,8 L 62,35 L 91,35 L 68,52 L 77,80 L 50,63 L 23,80 L 32,52 L 9,35 L 38,35 Z" fill="#F1C40F" stroke="#F39C12" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="42" cy="44" r="3.5" fill="#2C3E50"/>
        <circle cx="42" cy="42" r="1" fill="#FFFFFF"/>
        <circle cx="58" cy="44" r="3.5" fill="#2C3E50"/>
        <circle cx="58" cy="42" r="1" fill="#FFFFFF"/>
        <path d="M 46,50 Q 50,55 54,50" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <circle cx="35" cy="49" r="3" fill="#E74C3C" opacity="0.6"/>
        <circle cx="65" cy="49" r="3" fill="#E74C3C" opacity="0.6"/>
      </svg>
    `
  }
];

// Card front (face-down) cloud pattern
const CARD_FRONT_PATTERN_SVG = `
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="card-front-pattern" aria-label="Card Back Pattern">
    <path d="M 30,65 C 20,65 15,55 25,48 C 20,35 38,25 48,32 C 55,20 75,25 75,38 C 85,38 88,52 80,60 C 85,70 70,75 65,70 C 60,80 40,80 30,65 Z" fill="#6C5CE7" opacity="0.12"/>
    <circle cx="43" cy="48" r="3" fill="#6C5CE7" opacity="0.3"/>
    <circle cx="57" cy="48" r="3" fill="#6C5CE7" opacity="0.3"/>
    <path d="M 46,54 Q 50,57 54,54" stroke="#6C5CE7" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.3"/>
  </svg>
`;

const SUCCESS_FEEDBACK = [
  "Great match! 🌟",
  "Awesome! You found them! 🎉",
  "Wonderful! They go together! ✨",
  "Nice job! Keep going! ☀️",
  "Perfect match! 🎈"
];

const TRY_AGAIN_FEEDBACK = [
  "Let's try again! 🧩",
  "Almost! Check the other cards! 👀",
  "Keep trying, you're doing great! 🧡",
  "Try another pair! 🚀",
  "Where could they be? Let's check! 🕵️"
];

export default function MemoryMatch({ onClose }) {
  // Game workflow state: START, PLAY, COMPLETE
  const [gameState, setGameState] = useState("START");
  
  // Scoring metrics
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // indices
  const [correctMatches, setCorrectMatches] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [sessionID, setSessionID] = useState("");
  const [showDevLog, setShowDevLog] = useState(false);
  
  // HUD feedback banner
  const [feedback, setFeedback] = useState({ text: "Find the matching pairs!", type: "info" });
  
  const timerRef = useRef(null);

  // Clean timer interval on unmount
  useEffect(() => {
    return () => stopTimer();
  }, []);

  // Update timer trigger
  useEffect(() => {
    if (gameState === "PLAY") {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [gameState]);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const showFeedback = (text, type) => {
    setFeedback({ text, type });
  };

  // Fisher-Yates card shuffle
  const initGameSession = () => {
    const freshSessionID = 'mem_' + Math.floor(100000 + Math.random() * 900000);
    setSessionID(freshSessionID);
    
    // Reset stats
    setCorrectMatches(0);
    setWrongAttempts(0);
    setTotalAttempts(0);
    setElapsedSeconds(0);
    setFlippedCards([]);
    setIsEvaluating(false);
    showFeedback("Find the matching pairs! Tap any card.", "info");

    const pairs = [...CARD_TYPES, ...CARD_TYPES];
    const cardObjects = pairs.map((item, index) => ({
      ...item,
      uniqueId: `${item.id}_${index}`,
      isFlipped: false,
      isMatched: false,
      isMismatched: false
    }));

    // Shuffle
    for (let i = cardObjects.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardObjects[i], cardObjects[j]] = [cardObjects[j], cardObjects[i]];
    }

    setCards(cardObjects);
    setGameState("PLAY");
  };

  // Card click callback
  const handleCardClick = (index) => {
    if (isEvaluating || gameState !== "PLAY") return;
    
    const selectedCard = cards[index];
    if (selectedCard.isFlipped || selectedCard.isMatched) return;
    if (flippedCards.length >= 2) return;

    // Flip card face up
    const updatedCards = [...cards];
    updatedCards[index] = { ...selectedCard, isFlipped: true };
    setCards(updatedCards);

    const nextFlipped = [...flippedCards, index];
    setFlippedCards(nextFlipped);

    // If second card selected, evaluate match
    if (nextFlipped.length === 2) {
      setIsEvaluating(true);
      setTotalAttempts(prev => prev + 1);
      
      const [firstIdx, secondIdx] = nextFlipped;
      const cardA = cards[firstIdx];
      const cardB = cards[secondIdx];

      if (cardA.id === cardB.id) {
        // Matched
        setTimeout(() => {
          const matchedCards = [...updatedCards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setCards(matchedCards);
          
          setCorrectMatches(prev => {
            const newCount = prev + 1;
            if (newCount === 5) {
              setGameState("COMPLETE");
              const finalAcc = totalAttempts > 0 ? ((5 / totalAttempts) * 100) : 100;
              mindbloomStorage.saveTherapySession({
                game_name: "Memory Match",
                level: "5 Pairs (Animals/Objects)",
                correct_matches: 5,
                wrong_attempts: wrongAttempts,
                total_attempts: totalAttempts,
                accuracy: parseFloat(finalAcc.toFixed(1)),
                completion_time: elapsedSeconds
              });
            }
            return newCount;
          });

          setFlippedCards([]);
          setIsEvaluating(false);
          
          const successMsg = SUCCESS_FEEDBACK[Math.floor(Math.random() * SUCCESS_FEEDBACK.length)];
          showFeedback(successMsg, "success");
        }, 500);
      } else {
        // Mismatched
        setWrongAttempts(prev => prev + 1);
        
        const tryAgainMsg = TRY_AGAIN_FEEDBACK[Math.floor(Math.random() * TRY_AGAIN_FEEDBACK.length)];
        showFeedback(tryAgainMsg, "warning");

        const markedCards = [...updatedCards];
        markedCards[firstIdx].isMismatched = true;
        markedCards[secondIdx].isMismatched = true;
        setCards(markedCards);

        setTimeout(() => {
          const resetCards = [...markedCards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[firstIdx].isMismatched = false;
          resetCards[secondIdx].isFlipped = false;
          resetCards[secondIdx].isMismatched = false;
          setCards(resetCards);
          
          setFlippedCards([]);
          setIsEvaluating(false);
        }, 1100);
      }
    }
  };

  // Helper formatting for timer HUD
  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60).toString().padStart(2, "0");
    const secs = (totalSecs % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const accuracyRate = totalAttempts > 0 ? (correctMatches / totalAttempts) * 100 : 0;

  // Construct standard telemetry package
  const telemetryData = {
    game_name: "Memory Match",
    session_id: sessionID,
    child_id: "child_dev_123",
    level: "easy",
    total_cards: 10,
    total_pairs: 5,
    correct_matches: correctMatches,
    wrong_attempts: wrongAttempts,
    total_attempts: totalAttempts,
    accuracy: parseFloat(accuracyRate.toFixed(2)),
    completion_time: elapsedSeconds,
    completed: gameState === "COMPLETE",
    timestamp: new Date().toISOString()
  };

  return (
    <div className="memory-match-game">
      {/* Back to Activities Row */}
      <div className="header-actions">
        <button onClick={onClose} className="btn-back">
          <ArrowLeft size={18} />
          Back to Therapy List
        </button>
      </div>

      <div className="game-title-wrap">
        <h2 className="game-title">Memory Match</h2>
        <p className="game-subtitle">Find the matching pairs!</p>
      </div>

      {/* Main Board Container */}
      <div className="game-container-box">
        
        {/* VIEW 1: START SCREEN */}
        {gameState === "START" && (
          <div className="game-panel">
            <div className="start-banner">
              <div className="icon-bubble">
                <Gamepad2 size={44} className="text-violet-600" />
              </div>
            </div>
            <h2>Ready to Play?</h2>
            <p className="start-instruction">
              Flip the cards and find the matching pictures. Let's practice memory and attention matching!
            </p>
            <button onClick={initGameSession} className="btn btn-primary btn-large">
              Start Game
            </button>
          </div>
        )}

        {/* VIEW 2: ACTIVE GAME BOARD */}
        {gameState === "PLAY" && (
          <div className="game-panel">
            
            {/* Stats Bar */}
            <div className="stats-bar">
              <div className="stat-card">
                <span className="stat-label">⏱️ Time</span>
                <span className="stat-value">{formatTime(elapsedSeconds)}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">✨ Matches</span>
                <span className="stat-value">{correctMatches} / 5</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">🔄 Attempts</span>
                <span className="stat-value">{totalAttempts}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">🎯 Accuracy</span>
                <span className="stat-value">{accuracyRate.toFixed(1)}%</span>
              </div>
            </div>

            {/* Instruction Banner */}
            <div className={`feedback-banner ${feedback.type}`}>
              <span>{feedback.text}</span>
            </div>

            {/* 5x2 Card Grid */}
            <div className="game-board">
              {cards.map((card, idx) => {
                const isFlipped = card.isFlipped || card.isMatched;
                return (
                  <button
                    key={card.uniqueId}
                    onClick={() => handleCardClick(idx)}
                    className={`card ${isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""} ${card.isMismatched ? "mismatched" : ""}`}
                    aria-label={`Card ${idx + 1}`}
                    type="button"
                  >
                    <div className="card-inner">
                      <div 
                        className="card-front" 
                        dangerouslySetInnerHTML={{ __html: CARD_FRONT_PATTERN_SVG }}
                      />
                      <div 
                        className="card-back"
                        dangerouslySetInnerHTML={{ __html: card.svg }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="control-row">
              <button onClick={initGameSession} className="btn btn-secondary">
                <RotateCcw size={16} /> Restart
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: COMPLETION SCREEN */}
        {gameState === "COMPLETE" && (
          <div className="game-panel">
            <div className="success-banner">🎉</div>
            <h2 className="completion-title">Great Job!</h2>
            <p className="completion-sub">You found all the matching pictures!</p>

            <div className="results-grid">
              <div className="result-tile">
                <span className="result-icon">⏱️</span>
                <span className="result-label">Time Taken</span>
                <span className="result-value">{elapsedSeconds}s</span>
              </div>
              <div className="result-tile">
                <span className="result-icon">🔄</span>
                <span className="result-label">Attempts</span>
                <span className="result-value">{totalAttempts}</span>
              </div>
              <div className="result-tile">
                <span className="result-icon">🎯</span>
                <span className="result-label">Accuracy</span>
                <span className="result-value">{accuracyRate.toFixed(1)}%</span>
              </div>
            </div>

            {/* Telemetry log for FastAPI integration debugging */}
            <details className="data-integration-details">
              <summary 
                onClick={() => setShowDevLog(!showDevLog)} 
                className="data-summary-btn"
              >
                <span className="flex items-center gap-2">
                  <Terminal size={14} />
                  Devynex Session Data Log (Developer Preview)
                </span>
                {showDevLog ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </summary>
              <div className="data-content">
                <p>Below is the structured data package ready to send to the FastAPI/PostgreSQL database:</p>
                <pre>
                  <code>{JSON.stringify(telemetryData, null, 2)}</code>
                </pre>
              </div>
            </details>

            <button onClick={initGameSession} className="btn btn-primary btn-large">
              <RotateCcw size={18} /> Play Again
            </button>
          </div>
        )}

        <p className="disclaimer-note">
          Devynex Early Screening & Therapy Support System. This game is a therapy aid and does not constitute a medical diagnosis.
        </p>
      </div>
    </div>
  );
}
