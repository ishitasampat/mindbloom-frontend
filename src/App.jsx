import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Questionnaire from "./pages/Questionnaire";
import Therapy from "./pages/Therapy";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/therapy" element={<Therapy />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;