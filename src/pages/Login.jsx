import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Brain, 
  ShieldCheck, 
  User, 
  Stethoscope, 
  Sparkles, 
  ArrowRight,
  Lock,
  Mail,
  Moon,
  Sun
} from "lucide-react";
import logo from "../assets/usethis.png";

export default function Login({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const [role, setRole] = useState("parent"); // 'parent', 'clinician', 'researcher'
  const [email, setEmail] = useState("parent@mindbloom.health");
  const [password, setPassword] = useState("••••••••");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleQuickDemo = (demoRole) => {
    setRole(demoRole);
    if (demoRole === "clinician") {
      setEmail("dr.sarah.chen@pediatrics.org");
    } else if (demoRole === "parent") {
      setEmail("caregiver.aarav@mindbloom.health");
    } else {
      setEmail("research.ise@mindbloom.edu");
    }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col justify-between p-6 transition-colors duration-300">
      
      {/* Top Bar */}
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center py-2">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="MindBloom Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            MindBloom
          </span>
        </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-700 transition cursor-pointer"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-gray-800 my-8">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto mb-4 font-bold">
            <Brain size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Welcome to MindBloom
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            AI-based neurodevelopmental screening & therapy platform.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setRole("parent")}
            className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
              role === "parent"
                ? "bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-300 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800"
            }`}
          >
            <User size={16} />
            Parent / Caregiver
          </button>

          <button
            type="button"
            onClick={() => setRole("clinician")}
            className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
              role === "clinician"
                ? "bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-300 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800"
            }`}
          >
            <Stethoscope size={16} />
            Clinician / Specialist
          </button>
        </div>

        {/* Standard Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
              Portal Account Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white outline-none focus:border-violet-500 text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
              Security Key / Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white outline-none focus:border-violet-500 text-sm font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3.5 rounded-xl font-bold transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            Sign In to Dashboard
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Demo Access Buttons */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block text-center mb-3">
            One-Click Clinical Demo Access
          </span>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo("parent")}
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold transition border border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer"
            >
              <span>Demo as Caregiver (Aarav M.)</span>
              <span className="text-violet-600 dark:text-violet-400 font-bold">Access →</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("clinician")}
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold transition border border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer"
            >
              <span>Demo as Pediatric Clinician (Dr. Sarah Chen)</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">Access →</span>
            </button>
          </div>
        </div>

        {/* Compliance Footer Note */}
        <div className="mt-8 text-center flex items-center justify-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>Ethical AI & HIPAA Health Data Compliant Protocol</span>
        </div>

      </div>

      <div className="text-center text-xs text-gray-400 dark:text-gray-500 pb-2">
        MindBloom AI-Enabled Multimodal Neurodevelopmental Screening & Therapy Monitoring Platform
      </div>

    </div>
  );
}