import Navbar from "../components/Navbar";

import {
  Brain,
  Eye,
  Activity,
  BarChart3
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-7xl font-bold leading-tight max-w-5xl">
          AI-Driven Early
          <span className="text-violet-600">
            {" "}Neurodevelopmental Screening
          </span>
        </h1>

        <p className="mt-8 text-gray-600 text-xl max-w-3xl leading-relaxed">
          MindBloom combines Artificial Intelligence, Computer Vision,
          Behavioral Analysis, and Cognitive Therapy Monitoring
          to support early autism screening and therapy evaluation.
        </p>

        <div className="flex gap-6 mt-10">

          <button className="bg-violet-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold">
            Get Started
          </button>

          <button className="border border-gray-300 px-8 py-4 rounded-2xl text-lg font-semibold">
            Learn More
          </button>

        </div>
        <section className="px-10 pb-24">

  <h2 className="text-5xl font-bold text-center mb-16">
    Core Features
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

  <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2">

    <Brain className="text-violet-600 w-12 h-12 mb-6" />

    <h3 className="text-2xl font-bold mb-4 text-violet-600">
      Behavioral Analysis
    </h3>

    <p className="text-gray-600 leading-relaxed">
      Analyze behavioral patterns including attention,
      engagement, and interaction responses using AI models.
    </p>

  </div>

  <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2">

    <Eye className="text-violet-600 w-12 h-12 mb-6" />

    <h3 className="text-2xl font-bold mb-4 text-violet-600">
      Video Screening
    </h3>

    <p className="text-gray-600 leading-relaxed">
      Detect eye gaze, facial expressions, and engagement
      patterns through computer vision analysis.
    </p>

  </div>

  <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2">

    <Activity className="text-violet-600 w-12 h-12 mb-6" />

    <h3 className="text-2xl font-bold mb-4 text-violet-600">
      Risk Scoring
    </h3>

    <p className="text-gray-600 leading-relaxed">
      Generate weighted hybrid confidence scores using
      multimodal machine learning analysis.
    </p>

  </div>

  <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2">

    <BarChart3 className="text-violet-600 w-12 h-12 mb-6" />

    <h3 className="text-2xl font-bold mb-4 text-violet-600">
      Therapy Tracking
    </h3>

    <p className="text-gray-600 leading-relaxed">
      Monitor therapy effectiveness through cognitive
      activities and progress-based evaluation.
    </p>

  </div>

</div>

</section>

      </section>

    </div>
  );
}