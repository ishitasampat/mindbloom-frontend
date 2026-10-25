import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, User } from "lucide-react";
import logo from "../assets/usethis.png";

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/upload", label: "Video Screening" },
    { to: "/questionnaire", label: "Questionnaire" },
    { to: "/therapy", label: "Therapy Games" },
    { to: "/reports", label: "Reports" }
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-xs px-6 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 transition-colors duration-300">

      {/* Brand Logo & Title */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="MindBloom Logo"
          className="w-10 h-10 object-contain drop-shadow"
        />
        <span className="text-2xl font-black text-violet-600 dark:text-violet-400 tracking-tight">
          MindBloom
        </span>
      </Link>

      {/* Main Nav Links */}
      <div className="flex flex-wrap gap-1 sm:gap-2 text-sm font-semibold items-center">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3.5 py-2 rounded-xl transition cursor-pointer ${
                isActive
                  ? "bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 font-bold"
                  : "text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        {/* Portal Login Link */}
        <Link
          to="/login"
          className={`p-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ml-1 ${
            location.pathname === "/login"
              ? "bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-bold"
              : "text-gray-600 dark:text-gray-300 hover:text-violet-600 hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
          title="Clinical Portal Sign In"
        >
          <User size={18} />
          <span className="hidden md:inline">Portal</span>
        </Link>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 ml-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
          aria-label="Toggle Dark / Light Theme"
        >
          {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        </button>
      </div>

    </nav>
  );
}