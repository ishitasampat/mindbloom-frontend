import Navbar from "../components/Navbar";

import {
  Brain,
  Puzzle,
  Timer,
  Sparkles
} from "lucide-react";

export default function Therapy() {
  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-3">
          Therapy Activities
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Cognitive activities designed to improve attention,
          memory, and social engagement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300">

            <Puzzle className="w-14 h-14 text-violet-600 mb-6" />

            <h2 className="text-2xl font-bold mb-3">
              Memory Match
            </h2>

            <p className="text-gray-600 mb-6">
              Improve short-term memory and focus through interactive matching activities.
            </p>

            <button className="bg-violet-600 text-white px-6 py-3 rounded-2xl">
              Start Activity
            </button>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300">

            <Brain className="w-14 h-14 text-blue-500 mb-6" />

            <h2 className="text-2xl font-bold mb-3">
              Focus Training
            </h2>

            <p className="text-gray-600 mb-6">
              AI-guided exercises that help improve concentration and attention span.
            </p>

            <button className="bg-blue-500 text-white px-6 py-3 rounded-2xl">
              Start Activity
            </button>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300">

            <Timer className="w-14 h-14 text-pink-500 mb-6" />

            <h2 className="text-2xl font-bold mb-3">
              Response Challenge
            </h2>

            <p className="text-gray-600 mb-6">
              Measure reaction speed and engagement using timed cognitive tasks.
            </p>

            <button className="bg-pink-500 text-white px-6 py-3 rounded-2xl">
              Start Activity
            </button>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300">

            <Sparkles className="w-14 h-14 text-green-500 mb-6" />

            <h2 className="text-2xl font-bold mb-3">
              Emotion Recognition
            </h2>

            <p className="text-gray-600 mb-6">
              Activities focused on identifying expressions and emotional understanding.
            </p>

            <button className="bg-green-500 text-white px-6 py-3 rounded-2xl">
              Start Activity
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}