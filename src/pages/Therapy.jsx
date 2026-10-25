import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MemoryMatch from "../components/MemoryMatch";
import ResponseChallenge from "../components/ResponseChallenge";
import FocusTraining from "../components/FocusTraining";
import EmotionRecognition from "../components/EmotionRecognition";

import {
  Brain,
  Puzzle,
  Timer,
  Sparkles
} from "lucide-react";

export default function Therapy({ darkMode, setDarkMode }) {
  const [activeActivity, setActiveActivity] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 transition-colors duration-300">

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="p-6 md:p-10 max-w-7xl mx-auto">

        {activeActivity === "memory-match" ? (
          <MemoryMatch onClose={() => setActiveActivity(null)} />
        ) : activeActivity === "response-challenge" ? (
          <ResponseChallenge onClose={() => setActiveActivity(null)} />
        ) : activeActivity === "focus-training" ? (
          <FocusTraining onClose={() => setActiveActivity(null)} />
        ) : activeActivity === "emotion-recognition" ? (
          <EmotionRecognition onClose={() => setActiveActivity(null)} />
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
              Therapy Activities
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
              Cognitive, attention, and social engagement activities designed to support neurodevelopmental progress.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              {/* Activity 1: Memory Match */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                <div>
                  <Puzzle className="w-14 h-14 text-violet-600 mb-6" />
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    Memory Match
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                    Improve visual working memory and attention through gentle paired object matching.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveActivity("memory-match")}
                  className="bg-violet-600 hover:bg-violet-700 transition text-white px-6 py-3 rounded-2xl font-semibold cursor-pointer w-full text-center"
                >
                  Start Activity
                </button>
              </div>

              {/* Activity 2: Focus Training */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                <div>
                  <Brain className="w-14 h-14 text-blue-500 mb-6" />
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    Focus Training
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                    Calm visual star tracking to practice sustained attention and impulse control.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveActivity("focus-training")}
                  className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded-2xl font-semibold cursor-pointer w-full text-center"
                >
                  Start Activity
                </button>
              </div>

              {/* Activity 3: Response Challenge */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                <div>
                  <Timer className="w-14 h-14 text-pink-500 mb-6" />
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    Response Challenge
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                    Practice speech-prompted object, shape, and color matching with reaction observation.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveActivity("response-challenge")}
                  className="bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-3 rounded-2xl font-semibold cursor-pointer w-full text-center"
                >
                  Start Activity
                </button>
              </div>

              {/* Activity 4: Emotion Recognition */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                <div>
                  <Sparkles className="w-14 h-14 text-emerald-500 mb-6" />
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    Emotion Recognition
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                    Activities focused on identifying friendly facial expressions and social feelings.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveActivity("emotion-recognition")}
                  className="bg-emerald-500 hover:bg-emerald-600 transition text-white px-6 py-3 rounded-2xl font-semibold cursor-pointer w-full text-center"
                >
                  Start Activity
                </button>
              </div>

            </div>
          </>
        )}

      </div>

    </div>
  );
}