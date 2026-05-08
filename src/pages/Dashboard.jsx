import Navbar from "../components/Navbar";

import {
  Brain,
  Eye,
  Activity,
  HeartPulse
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {

  const data = [
    { week: "Week 1", attention: 40 },
    { week: "Week 2", attention: 52 },
    { week: "Week 3", attention: 61 },
    { week: "Week 4", attention: 74 },
    { week: "Week 5", attention: 81 },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-3">
          Dashboard
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          AI-powered behavioral analysis and therapy monitoring overview.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white p-8 rounded-3xl shadow-sm">

            <Brain className="w-12 h-12 text-violet-600 mb-5" />

            <h2 className="text-gray-500 text-lg">
              Autism Risk Score
            </h2>

            <p className="text-5xl font-bold mt-3 text-violet-600">
              72%
            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">

            <Eye className="w-12 h-12 text-blue-500 mb-5" />

            <h2 className="text-gray-500 text-lg">
              Eye Contact
            </h2>

            <p className="text-5xl font-bold mt-3 text-blue-500">
              68%
            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">

            <Activity className="w-12 h-12 text-green-500 mb-5" />

            <h2 className="text-gray-500 text-lg">
              Attention Level
            </h2>

            <p className="text-4xl font-bold mt-3 text-green-500">
              Moderate
            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">

            <HeartPulse className="w-12 h-12 text-pink-500 mb-5" />

            <h2 className="text-gray-500 text-lg">
              Engagement
            </h2>

            <p className="text-4xl font-bold mt-3 text-pink-500">
              Stable
            </p>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 mt-12">

          <div className="mb-8">

            <h2 className="text-3xl font-bold">
              Therapy Progress
            </h2>

            <p className="text-gray-500 mt-2">
              Attention and engagement improvement across sessions.
            </p>

          </div>

          <div className="h-96">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={data}>

                <XAxis dataKey="week" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="attention"
                  stroke="#7C3AED"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}