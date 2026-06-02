import Navbar from "../components/Navbar";
import heroImage from "../assets/usethis.png";


import {
  Brain,
  Eye,
  Activity,
  BarChart3
} from "lucide-react";

export default function Landing({ darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100 dark:bg-gray-950">

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid md:grid-cols-2 items-center gap-10">

          {/* LEFT SIDE */}
          <div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              AI-Driven Early
              <span className="block text-violet-600">
                Neurodevelopmental Screening
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              MindBloom combines Artificial Intelligence,
              Computer Vision, Behavioral Analysis and
              Cognitive Therapy Monitoring to support
              early autism screening and therapy evaluation.
            </p>

            <div className="flex gap-4 mt-8">

              <button className="bg-violet-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-violet-700 transition">
                Get Started
              </button>

              <button className="border border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
                Learn More
              </button>

            </div>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center">

            <img
              src={heroImage}
              alt="MindBloom"
              className="w-[450px] md:w-[550px] opacity-20"
            />

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-8 py-12">

        <h2 className="text-4xl font-bold text-center mb-12">
          How MindBloom Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

          {[
            "Upload Video",
            "Fill Questionnaire",
            "AI Analysis",
            "Risk Assessment",
            "Therapy Tracking",
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition"
            >
              <h3 className="text-violet-600 font-bold text-2xl">
                {index + 1}
              </h3>

              <p className="mt-2 font-medium">
                {step}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* CORE FEATURES */}
      <section className="max-w-7xl mx-auto px-8 py-16">

        <h2 className="text-4xl font-bold text-center mb-14">
          Core Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300">
            <Brain className="text-violet-600 w-12 h-12 mb-5" />

            <h3 className="text-xl font-bold mb-3 text-violet-600">
              Behavioral Analysis
            </h3>

            <p className="text-gray-600">
              Analyze behavioral patterns including
              attention, engagement and interaction responses.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300">
            <Eye className="text-violet-600 w-12 h-12 mb-5" />

            <h3 className="text-xl font-bold mb-3 text-violet-600">
              Video Screening
            </h3>

            <p className="text-gray-600">
              Detect eye gaze, facial expressions and
              engagement patterns through computer vision.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300">
            <Activity className="text-violet-600 w-12 h-12 mb-5" />

            <h3 className="text-xl font-bold mb-3 text-violet-600">
              Risk Scoring
            </h3>

            <p className="text-gray-600">
              Generate weighted hybrid confidence scores
              using machine learning analysis.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300">
            <BarChart3 className="text-violet-600 w-12 h-12 mb-5" />

            <h3 className="text-xl font-bold mb-3 text-violet-600">
              Therapy Tracking
            </h3>

            <p className="text-gray-600">
              Monitor therapy effectiveness and progress
              through cognitive activity evaluation.
            </p>
          </div>

        </div>

        <div className="text-center mt-16 text-gray-500">
          Developed by students of ISE
        </div>

      </section>

    </div>
  );
}