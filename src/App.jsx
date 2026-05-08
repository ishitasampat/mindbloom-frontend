import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Questionnaire from "./pages/Questionnaire";
import Therapy from "./pages/Therapy";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>

      <RoutesWrapper
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

    </div>
  );
}

function RoutesWrapper({ darkMode, setDarkMode }) {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Landing
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/upload"
          element={
            <Upload
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/questionnaire"
          element={
            <Questionnaire
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/therapy"
          element={
            <Therapy
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/reports"
          element={
            <Reports
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;