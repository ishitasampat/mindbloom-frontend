
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import logo from "../assets/usethis.png";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm px-8 py-4 flex items-center justify-between transition duration-300">

      <div className="flex items-center gap-3">

  <img
    src={logo}
    alt="MindBloom Logo"
    className="w-12 h-12 object-contain"
  />

  <h1 className="text-3xl font-bold text-violet-600">
    MindBloom
  </h1>

</div>

      <div className="flex gap-6 text-gray-700 dark:text-gray-200 font-medium items-center">

        <Link to="/">Home</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/upload">Upload</Link>

        <Link to="/questionnaire">Questionnaire</Link>

        <Link to="/therapy">Therapy</Link>

        <Link to="/reports">Reports</Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

      </div>

    </nav>
  );
}