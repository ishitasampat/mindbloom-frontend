import Navbar from "../components/Navbar";

import {
  UploadCloud,
  Video,
  Brain,
  Eye
} from "lucide-react";

export default function Upload() {
  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-3">
          Video Analysis
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Upload interaction videos for AI-powered behavioral analysis.
        </p>

        <div className="bg-white rounded-3xl p-12 shadow-sm border-2 border-dashed border-violet-300 flex flex-col items-center justify-center text-center">

          <UploadCloud className="w-20 h-20 text-violet-600 mb-6" />

          <h2 className="text-3xl font-bold mb-4">
            Upload Child Interaction Video
          </h2>

          <p className="text-gray-500 mb-8 max-w-xl">
            Supported analysis includes facial expressions,
            eye gaze detection, attention tracking,
            and engagement monitoring.
          </p>

          <button className="bg-violet-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold">
            Choose Video
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white p-8 rounded-3xl shadow-sm">

            <Eye className="w-12 h-12 text-blue-500 mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Eye Gaze Tracking
            </h3>

            <p className="text-gray-600">
              Detect eye contact consistency and attention focus.
            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">

            <Brain className="w-12 h-12 text-violet-600 mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Behavioral Analysis
            </h3>

            <p className="text-gray-600">
              AI evaluates engagement and emotional responses.
            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">

            <Video className="w-12 h-12 text-pink-500 mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Video Processing
            </h3>

            <p className="text-gray-600">
              Process uploaded sessions using computer vision models.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}