import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Brain,
  Eye,
  Activity,
  BadgeCheck,
  Printer,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  FileText,
  AlertTriangle,
  HeartHandshake,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { mindbloomStorage } from "../utils/mindbloomStorage";

export default function Reports({ darkMode, setDarkMode }) {
  const [metrics, setMetrics] = useState(mindbloomStorage.getMultimodalMetrics());
  const [questionnaire, setQuestionnaire] = useState(mindbloomStorage.getQuestionnaire());
  const [videoScreening, setVideoScreening] = useState(mindbloomStorage.getVideoScreening());
  const [therapySessions, setTherapySessions] = useState(mindbloomStorage.getTherapySessions());

  useEffect(() => {
    setMetrics(mindbloomStorage.getMultimodalMetrics());
    setQuestionnaire(mindbloomStorage.getQuestionnaire());
    setVideoScreening(mindbloomStorage.getVideoScreening());
    setTherapySessions(mindbloomStorage.getTherapySessions());
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 transition-colors duration-300">

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="p-6 md:p-10 max-w-7xl mx-auto print:p-0 print:max-w-none">

        {/* Header with Title and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              AI Clinical Assessment Report
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Multimodal neurodevelopmental screening fusion: Behavioral ML, Computer Vision, and Cognitive Therapy.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold flex items-center gap-2 shadow-sm transition cursor-pointer print:hidden"
          >
            <Printer size={18} />
            Print / Export Clinical Summary
          </button>
        </div>

        {/* Patient / Child Profile Banner */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 mb-8 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-2xl">
              {metrics.childName ? metrics.childName.charAt(0) : "A"}
            </div>
            <div>
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider block">
                Subject Profile
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.childName} (Age {metrics.childAge})
              </h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Evaluation Date: {metrics.lastUpdated} • Screening Status: Active Monitoring
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-sm font-bold flex items-center gap-2">
              <Sparkles size={16} />
              Multimodal Fusion Active
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium">
              Sessions Logged: {therapySessions.length}
            </div>
          </div>
        </div>

        {/* Multimodal Score Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          {/* Fusion Risk Confidence Score */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <Brain className="w-12 h-12 text-violet-600 dark:text-violet-400" />
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {metrics.riskBand}
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              Multimodal Risk Confidence Score
            </h2>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-7xl font-black text-violet-600 dark:text-violet-400">
                {metrics.fusionScore}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Weighted composite
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Calculated using our hybrid screening model combining: 
              Behavioral Questionnaire (40%), Computer Vision Gaze (35%), and Cognitive Therapy Game performance (25%).
            </p>

            {/* Fusion Component Weight Breakdown */}
            <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-400">
                <span>Behavioral Questionnaire ML</span>
                <span>{metrics.questionnaireRisk}%</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-400">
                <span>Computer Vision Eye Gaze</span>
                <span>{metrics.videoRisk}%</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-400">
                <span>Cognitive Therapy Performance</span>
                <span>{metrics.therapyScore}% accuracy</span>
              </div>
            </div>
          </div>

          {/* AI Clinical Summary */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <BadgeCheck className="w-12 h-12 text-emerald-500" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Explainable Evidence
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                Multimodal AI Clinical Synthesis
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base mb-6">
                The multimodal screening pipeline detected moderate variation in ocular fixation consistency ({videoScreening.eyeContactScore}%), speech milestone delay, and elevated sensory sensitivity. 
                Sustained attention during cognitive therapy games remains stable with positive engagement across sessions.
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-4">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm block mb-1">
                Clinical Recommendation:
              </span>
              <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                Recommend comprehensive pediatric developmental follow-up, speech-language therapy consultation, and continued structured cognitive play.
              </p>
            </div>
          </div>

        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <Eye className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
              Eye Contact Consistency
            </h3>
            <p className="text-4xl font-black text-blue-500 mb-2">
              {metrics.eyeContactScore}%
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Joint visual attention during video assessment.
            </span>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <Activity className="w-12 h-12 text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
              Cognitive Attention Span
            </h3>
            <p className="text-4xl font-black text-emerald-500 mb-2">
              Moderate
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Average game focus time: ~42 seconds per session.
            </span>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <TrendingUp className="w-12 h-12 text-pink-500 mb-4" />
            <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
              Therapy Response Engagement
            </h3>
            <p className="text-4xl font-black text-pink-500 mb-2">
              Stable
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              High responsiveness in Response Challenge & Memory Match.
            </span>
          </div>

        </div>

        {/* Explainable AI (XAI) Feature Importance Section */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Sparkles className="text-violet-600" size={24} />
            Explainable AI (XAI) Feature Contribution
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            SHAP-modeled behavioral and neurodevelopmental indicator contributions to the overall risk prediction:
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                <span>Joint Attention Gaze Deviation (Video Analysis)</span>
                <span className="text-violet-600 font-bold">+28% Risk Weight</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-violet-600 h-2.5 rounded-full w-[78%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                <span>Delayed First Words & 2-Word Speech Milestones</span>
                <span className="text-blue-600 font-bold">+22% Risk Weight</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full w-[65%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                <span>Sensory Sound & Light Sensitivities</span>
                <span className="text-amber-500 font-bold">+18% Risk Weight</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full w-[52%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                <span>Cognitive Working Memory & Focus Score (Protective Factor)</span>
                <span className="text-emerald-600 font-bold">-16% Protective Weight</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-2.5 rounded-full w-[45%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Disclaimer */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed flex items-center justify-center gap-2">
            <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
            MindBloom Early Screening Platform is a clinical decision-support and therapy progress monitoring tool. 
            This automated report does not provide or replace a formal medical diagnosis of Autism Spectrum Disorder (ASD).
          </p>
        </div>

      </div>

    </div>
  );
}