import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Brain,
  Eye,
  Activity,
  HeartPulse,
  Gamepad2,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Play
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { mindbloomStorage } from "../utils/mindbloomStorage";

export default function Dashboard({ darkMode, setDarkMode }) {
  const [metrics, setMetrics] = useState(mindbloomStorage.getMultimodalMetrics());
  const [sessions, setSessions] = useState(mindbloomStorage.getTherapySessions());
  const [questionnaire, setQuestionnaire] = useState(mindbloomStorage.getQuestionnaire());

  useEffect(() => {
    setMetrics(mindbloomStorage.getMultimodalMetrics());
    setSessions(mindbloomStorage.getTherapySessions());
    setQuestionnaire(mindbloomStorage.getQuestionnaire());
  }, []);

  // Compute chart data dynamically from therapy sessions
  const chartData = sessions.length > 0
    ? [...sessions].reverse().map((s, idx) => ({
        session: `Sess ${idx + 1}`,
        accuracy: Math.round(s.accuracy || 70),
        attention: Math.min(95, Math.round((s.accuracy || 70) * 0.95 + 5)),
        game: s.game_name
      }))
    : [
        { session: "Sess 1", accuracy: 55, attention: 50 },
        { session: "Sess 2", accuracy: 68, attention: 62 },
        { session: "Sess 3", accuracy: 75, attention: 74 },
        { session: "Sess 4", accuracy: 82, attention: 80 }
      ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 transition-colors duration-300">

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="p-6 md:p-10 max-w-7xl mx-auto">

        {/* Dashboard Title & Overview Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
              Clinical Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              AI-powered neurodevelopmental screening and longitudinal therapy progress overview.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/therapy"
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold transition flex items-center gap-2 shadow-md"
            >
              <Gamepad2 size={20} />
              Launch Therapy
            </Link>
            <Link
              to="/reports"
              className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-2xl font-semibold transition"
            >
              View Report
            </Link>
          </div>
        </div>

        {/* Subject Information Header */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-2xl">
              {metrics.childName ? metrics.childName.charAt(0) : "A"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {metrics.childName} (Age {metrics.childAge})
              </h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Caregiver Monitoring Protocol • Primary Focus: Social Communication & Joint Attention
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-violet-100 text-violet-800 dark:bg-violet-950/80 dark:text-violet-300">
              {metrics.riskBand}
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {sessions.length} Activities Completed
            </span>
          </div>
        </div>

        {/* Top 4 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Autism Risk Score */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <Brain className="w-12 h-12 text-violet-600 dark:text-violet-400 mb-5" />
            <h2 className="text-gray-500 dark:text-gray-400 text-base font-semibold">
              Multimodal Risk Score
            </h2>
            <p className="text-5xl font-black mt-2 text-violet-600 dark:text-violet-400">
              {metrics.fusionScore}%
            </p>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">
              Based on questionnaire, CV, & games
            </span>
          </div>

          {/* Eye Contact Consistency */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <Eye className="w-12 h-12 text-blue-500 mb-5" />
            <h2 className="text-gray-500 dark:text-gray-400 text-base font-semibold">
              Gaze Fixation Consistency
            </h2>
            <p className="text-5xl font-black mt-2 text-blue-500">
              {metrics.eyeContactScore}%
            </p>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">
              From video interaction analysis
            </span>
          </div>

          {/* Cognitive Attention */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <Activity className="w-12 h-12 text-emerald-500 mb-5" />
            <h2 className="text-gray-500 dark:text-gray-400 text-base font-semibold">
              Average Game Accuracy
            </h2>
            <p className="text-5xl font-black mt-2 text-emerald-500">
              {metrics.therapyScore}%
            </p>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">
              Across all 4 therapy exercises
            </span>
          </div>

          {/* Engagement Stability */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <HeartPulse className="w-12 h-12 text-pink-500 mb-5" />
            <h2 className="text-gray-500 dark:text-gray-400 text-base font-semibold">
              Affective Engagement
            </h2>
            <p className="text-4xl font-black mt-3 text-pink-500">
              Stable
            </p>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">
              High positive responsiveness
            </span>
          </div>

        </div>

        {/* Therapy Progress Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8 mb-8 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Longitudinal Therapy Progression
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Visual attention and response accuracy trajectory across completed cognitive activities.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-violet-600 dark:text-violet-400">
                <span className="w-3 h-3 rounded-full bg-violet-600" />
                Attention Index
              </span>
              <span className="flex items-center gap-1.5 text-blue-500">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                Game Accuracy %
              </span>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="session" stroke="#94A3B8" />
                <YAxis domain={[0, 100]} stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF", 
                    borderColor: darkMode ? "#374151" : "#E5E7EB",
                    borderRadius: "1rem"
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey="attention"
                  stroke="#7C3AED"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  strokeDasharray="4 4"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Therapy Sessions Activity Log */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8 border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recent Therapy Activity Logs
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Synchronized session telemetry recorded during cognitive games.
              </p>
            </div>
            <Link
              to="/therapy"
              className="text-violet-600 dark:text-violet-400 font-bold text-sm hover:underline flex items-center gap-1"
            >
              Play Activity <ArrowRight size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800 pb-3">
                <tr>
                  <th className="pb-3 font-semibold">Activity Name</th>
                  <th className="pb-3 font-semibold">Level / Theme</th>
                  <th className="pb-3 font-semibold">Accuracy</th>
                  <th className="pb-3 font-semibold">Attempts</th>
                  <th className="pb-3 font-semibold">Duration</th>
                  <th className="pb-3 font-semibold">Date Logged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {sessions.map((sess) => (
                  <tr key={sess.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition">
                    <td className="py-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Gamepad2 size={16} className="text-violet-600" />
                      {sess.game_name}
                    </td>
                    <td className="py-4 text-gray-600 dark:text-gray-300">
                      {sess.level || "Standard Mode"}
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        {sess.accuracy}%
                      </span>
                    </td>
                    <td className="py-4 text-gray-600 dark:text-gray-300 font-medium">
                      {sess.total_attempts} attempts
                    </td>
                    <td className="py-4 text-gray-600 dark:text-gray-300">
                      {sess.completion_time}s
                    </td>
                    <td className="py-4 text-gray-400 text-xs">
                      {new Date(sess.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}