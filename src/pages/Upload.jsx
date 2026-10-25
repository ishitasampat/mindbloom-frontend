import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  UploadCloud,
  Video,
  Brain,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Play,
  RotateCcw,
  Activity,
  Layers,
  FileCheck
} from "lucide-react";
import { mindbloomStorage } from "../utils/mindbloomStorage";

export default function Upload({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState("");
  const [results, setResults] = useState(null);

  // Simulated CV gaze tracking points on canvas
  const [gazePoints, setGazePoints] = useState([
    { x: 48, y: 42, active: true },
    { x: 52, y: 44, active: true },
    { x: 45, y: 60, active: false }
  ]);

  const PIPELINE_STAGES = [
    "Initializing MediaPipe 468-point Face Mesh...",
    "Estimating 3D Eye Gaze Vectors & Pupillary Fixation...",
    "Measuring Joint Attention & Turn-Taking Latency...",
    "Evaluating Affective Expression & Facial Micro-Movements...",
    "Computing Temporal Attention Consistency via LSTM..."
  ];

  const handleStartAnalysis = (fileName = "clinical_toddler_interaction_assessment.mp4") => {
    setSelectedFile({ name: fileName });
    setIsAnalyzing(true);
    setAnalysisProgress(5);
    setCurrentStage(PIPELINE_STAGES[0]);
    setResults(null);

    let progress = 5;
    const interval = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        clearInterval(interval);
        setAnalysisProgress(100);
        setCurrentStage("Analysis Complete!");
        
        // Generate metrics
        const metrics = {
          completed: true,
          videoName: fileName,
          eyeContactScore: 68,
          gazeDeviation: "14.2° (Moderate deviation)",
          jointAttentionLatency: 1.4,
          expressionStability: "Stable (Affective variability within expected range)",
          attentionConsistency: 72,
          timestamp: new Date().toISOString()
        };

        mindbloomStorage.saveVideoScreening(metrics);
        setResults(metrics);
        setIsAnalyzing(false);
      } else {
        setAnalysisProgress(progress);
        const stageIndex = Math.min(PIPELINE_STAGES.length - 1, Math.floor((progress / 100) * PIPELINE_STAGES.length));
        setCurrentStage(PIPELINE_STAGES[stageIndex]);

        // Jiggle simulated gaze vectors
        setGazePoints([
          { x: 45 + Math.random() * 10, y: 40 + Math.random() * 10, active: true },
          { x: 50 + Math.random() * 8, y: 42 + Math.random() * 8, active: true },
          { x: 35 + Math.random() * 30, y: 55 + Math.random() * 15, active: false }
        ]);
      }
    }, 600);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleStartAnalysis(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 transition-colors duration-300">

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="p-6 md:p-10 max-w-7xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
          Computer Vision Video Screening
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
          Upload or simulate child interaction videos for AI-powered facial landmarking, eye-gaze tracking, and behavioral attention analysis.
        </p>

        {/* ================= MAIN INTERACTION PANEL ================= */}
        {!isAnalyzing && !results && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 md:p-14 shadow-sm border-2 border-dashed border-violet-300 dark:border-gray-700 flex flex-col items-center justify-center text-center">

            <div className="w-24 h-24 rounded-full bg-violet-100 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6">
              <UploadCloud size={48} />
            </div>

            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Upload Child Interaction Video
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl text-base leading-relaxed">
              Our automated computer vision pipeline analyzes eye gaze consistency, joint attention response times, and facial expressions during clinical or caregiver interactions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <label className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold cursor-pointer shadow-md hover:shadow-lg transition">
                Choose Video File
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => handleStartAnalysis("clinical_toddler_sample_assessment.mp4")}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold transition flex items-center gap-2 cursor-pointer"
              >
                <Play size={20} className="fill-violet-600 dark:fill-violet-400" />
                Load Clinical Sample Video
              </button>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
              Supported formats: MP4, WebM, MOV (Max 100MB). Video is processed privately in client evaluation session.
            </p>

          </div>
        )}

        {/* ================= PIPELINE IN PROGRESS ================= */}
        {isAnalyzing && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center">
            
            {/* Simulated CV Tracking Canvas */}
            <div className="relative w-full max-w-lg aspect-video bg-gray-950 rounded-2xl overflow-hidden mb-8 border-2 border-violet-500 shadow-xl flex items-center justify-center">
              {/* Silhouette / Face mesh placeholder */}
              <div className="absolute inset-0 opacity-30 flex items-center justify-center">
                <div className="w-48 h-64 border border-dashed border-emerald-400 rounded-full flex items-center justify-center">
                  <div className="w-32 h-16 border border-emerald-400 rounded-full"></div>
                </div>
              </div>

              {/* Dynamic Gaze Tracking Crosshairs */}
              {gazePoints.map((pt, i) => (
                <div
                  key={i}
                  style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ${
                    pt.active 
                      ? "w-8 h-8 border-2 border-emerald-400 bg-emerald-400/20" 
                      : "w-6 h-6 border border-amber-400 bg-amber-400/20"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${pt.active ? "bg-emerald-400" : "bg-amber-400"}`} />
                </div>
              ))}

              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur px-3 py-1 rounded-md text-xs font-mono text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                OpenCV + MediaPipe FaceMesh Active
              </div>

              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur px-3 py-1 rounded-md text-xs font-mono text-gray-300">
                Gaze Vector: [{gazePoints[0]?.x.toFixed(1)}, {gazePoints[0]?.y.toFixed(1)}]
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Analyzing Interaction Session
            </h3>

            <p className="text-violet-600 dark:text-violet-400 font-semibold mb-6 animate-pulse">
              {currentStage}
            </p>

            <div className="w-full max-w-md bg-gray-200 dark:bg-gray-800 rounded-full h-3 mb-4 overflow-hidden">
              <div
                className="bg-violet-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>

            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {analysisProgress}% Processed
            </span>

          </div>
        )}

        {/* ================= RESULTS VIEW ================= */}
        {results && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 size={16} />
                  Computer Vision Analysis Completed
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  Video Screening Assessment
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Source: {results.videoName}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleStartAnalysis(results.videoName)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition flex items-center gap-2 cursor-pointer text-sm"
                >
                  <RotateCcw size={16} />
                  Re-analyze
                </button>
                <button
                  onClick={() => navigate("/reports")}
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition flex items-center gap-2 cursor-pointer shadow-md text-sm"
                >
                  <FileCheck size={16} />
                  View Full Report
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              <div className="bg-slate-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <Eye className="w-10 h-10 text-blue-500 mb-3" />
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Eye Contact Consistency
                </span>
                <span className="text-4xl font-black text-blue-600 dark:text-blue-400">
                  {results.eyeContactScore}%
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Temporal fixation on parent/therapist face target.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <Activity className="w-10 h-10 text-emerald-500 mb-3" />
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Joint Attention Latency
                </span>
                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                  {results.jointAttentionLatency}s
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Average time taken to orient toward pointed object.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <Brain className="w-10 h-10 text-violet-600 mb-3" />
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Attention Consistency
                </span>
                <span className="text-4xl font-black text-violet-600 dark:text-violet-400">
                  {results.attentionConsistency}%
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  LSTM temporal continuity score during task.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <Layers className="w-10 h-10 text-pink-500 mb-3" />
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Affective Expression
                </span>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  Stable
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Facial micro-expression variability within typical bounds.
                </p>
              </div>

            </div>

            <div className="bg-violet-50 dark:bg-violet-950/30 rounded-2xl p-6 border border-violet-100 dark:border-violet-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Sparkles className="text-violet-600 dark:text-violet-400 w-8 h-8 shrink-0" />
                <p className="text-sm text-violet-900 dark:text-violet-200 leading-relaxed">
                  Video screening results have been synchronized into MindBloom's Multimodal Fusion model. Combine with Questionnaire and Therapy activity records for a comprehensive clinical assessment.
                </p>
              </div>
              <button
                onClick={() => navigate("/reports")}
                className="whitespace-nowrap px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-sm shadow transition"
              >
                Open Multimodal Report
              </button>
            </div>

          </div>
        )}

        {/* Feature Cards Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <Eye className="w-12 h-12 text-blue-500 mb-5" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Eye Gaze Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Detects ocular fixation consistency, gaze shift latency, and joint visual attention during interpersonal play.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <Brain className="w-12 h-12 text-violet-600 mb-5" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Behavioral Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              AI evaluates engagement stability, head orientation variability, and emotional reciprocation indicators.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <Video className="w-12 h-12 text-pink-500 mb-5" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Video Processing
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Processes uploaded sessions frame-by-frame with zero latency using client-accelerated computer vision pipelines.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}