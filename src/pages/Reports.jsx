import Navbar from "../components/Navbar";

import {
  Brain,
  Eye,
  Activity,
  BadgeCheck
} from "lucide-react";

export default function Reports() {
  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-3">
          AI Assessment Report
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Multimodal behavioral analysis and autism risk evaluation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <Brain className="w-14 h-14 text-violet-600 mb-6" />

            <h2 className="text-3xl font-bold mb-3">
              Risk Confidence Score
            </h2>

            <p className="text-7xl font-bold text-violet-600 mb-6">
              72%
            </p>

            <p className="text-gray-600 leading-relaxed">
              AI analysis indicates moderate behavioral indicators
              associated with neurodevelopmental risk patterns.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <BadgeCheck className="w-14 h-14 text-green-500 mb-6" />

            <h2 className="text-3xl font-bold mb-3">
              AI Summary
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg">
              The multimodal assessment detected reduced eye-contact consistency,
              moderate attention variability, and stable emotional engagement.
              Continued therapy monitoring and cognitive activities are recommended.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <Eye className="w-12 h-12 text-blue-500 mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Eye Contact
            </h3>

            <p className="text-5xl font-bold text-blue-500">
              68%
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <Activity className="w-12 h-12 text-green-500 mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Attention Span
            </h3>

            <p className="text-5xl font-bold text-green-500">
              Moderate
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <Brain className="w-12 h-12 text-pink-500 mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Engagement
            </h3>

            <p className="text-5xl font-bold text-pink-500">
              Stable
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}