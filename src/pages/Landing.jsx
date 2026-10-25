import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroImage from "../assets/usethis.png";
import {
  Brain,
  Eye,
  Activity,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export default function Landing({ darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">

        <div className="grid md:grid-cols-2 items-center gap-12">

          {/* LEFT SIDE */}
          <div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-bold mb-6">
              <Sparkles size={14} />
              AI-Driven Clinical Screening & Therapy Platform
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
              AI-Driven Early
              <span className="block text-violet-600 dark:text-violet-400">
                Neurodevelopmental Screening
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              MindBloom combines Artificial Intelligence, Computer Vision, Behavioral Milestone Analysis, and Cognitive Therapy Monitoring to support early autism risk evaluation and clinical decision support.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/dashboard"
                className="bg-violet-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-violet-700 transition shadow-lg hover:shadow-violet-200 dark:hover:shadow-none flex items-center gap-2"
              >
                Launch Dashboard
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/therapy"
                className="bg-white dark:bg-gray-850 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-8 py-3.5 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Explore Therapy Games
              </Link>

            </div>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center">

            <div className="relative">
              <img
                src={heroImage}
                alt="MindBloom Logo Hero"
                className="w-[350px] md:w-[480px] drop-shadow-2xl transition hover:scale-105 duration-500"
              />
            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-14">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          How MindBloom Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">

          {[
            { step: "Upload Video", desc: "Child interaction & gaze session" },
            { step: "Fill Questionnaire", desc: "Standardized AQ-10 milestones" },
            { step: "AI Analysis", desc: "Computer vision + ML fusion" },
            { step: "Risk Assessment", desc: "Explainable clinical report" },
            { step: "Therapy Tracking", desc: "4 cognitive therapy games" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 text-center hover:shadow-md transition"
            >
              <h3 className="text-violet-600 dark:text-violet-400 font-black text-3xl">
                0{index + 1}
              </h3>

              <p className="mt-2 font-bold text-gray-900 dark:text-white text-base">
                {item.step}
              </p>

              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                {item.desc}
              </span>
            </div>
          ))}

        </div>

      </section>

      {/* CORE FEATURES */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Core Multimodal Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-800">
            <Brain className="text-violet-600 dark:text-violet-400 w-12 h-12 mb-5" />

            <h3 className="text-xl font-bold mb-3 text-violet-600 dark:text-violet-400">
              Behavioral ML Analysis
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Analyze behavioral patterns including social communication, speech milestones, and sensory sensitivities with SHAP explainability.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-800">
            <Eye className="text-blue-500 w-12 h-12 mb-5" />

            <h3 className="text-xl font-bold mb-3 text-blue-500">
              Video Eye Gaze Screening
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Detect ocular fixation, gaze shift latency, and joint visual attention during play using MediaPipe FaceMesh.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-800">
            <Activity className="text-emerald-500 w-12 h-12 mb-5" />

            <h3 className="text-xl font-bold mb-3 text-emerald-500">
              Multimodal Fusion Risk
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Generate weighted hybrid risk confidence scores combining behavioral markers, gaze stability, and therapy metrics.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-800">
            <BarChart3 className="text-pink-500 w-12 h-12 mb-5" />

            <h3 className="text-xl font-bold mb-3 text-pink-500">
              Therapy Games Monitoring
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Monitor working memory, attention, reaction speed, and emotional recognition across 4 calm, accessible therapy games.
            </p>
          </div>

        </div>

        <div className="text-center mt-16 text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1.5">
          <ShieldCheck size={16} className="text-emerald-500" />
          Developed for AI-Enabled Early Neurodevelopmental Screening & Clinical Therapy Monitoring
        </div>

      </section>

    </div>
  );
}