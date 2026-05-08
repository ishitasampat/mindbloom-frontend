import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between">

      <h1 className="text-3xl font-bold text-violet-600">
        MindBloom
      </h1>

      <div className="flex gap-6 text-gray-700 font-medium">

        <Link to="/">Home</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/upload">Upload</Link>

        <Link to="/questionnaire">Questionnaire</Link>

        <Link to="/therapy">Therapy</Link>

        <Link to="/reports">Reports</Link>

      </div>

      <Link
        to="/login"
        className="bg-violet-600 text-white px-5 py-2 rounded-xl"
      >
        Login
      </Link>

    </nav>
  );
}