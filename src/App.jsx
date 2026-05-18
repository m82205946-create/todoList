import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Pages/Layout/Layout";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Habits from "./Pages/Habits/Habits";
import WeeklyTasks from "./Pages/WeeklyTasks/WeeklyTasks";
import Settings from "./Pages/Settings/Settings";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // =========================
  // AUTH STATE
  // =========================
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser"))
  );

  // =========================
  // HABITS STATE
  // =========================
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // =========================
  // LOGIN
  // =========================
  const handleLogin = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <ToastContainer position="top-right" autoClose={2000} />

      <BrowserRouter>
        <Routes>

          {/* =========================
              AUTH ROUTES
          ========================= */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Login setUser={handleLogin} />
              )
            }
          />

          <Route
            path="/register"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Register />
              )
            }
          />

          {/* =========================
              PROTECTED ROUTES
          ========================= */}
          <Route
            path="/"
            element={
              user ? (
                <Layout
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  setUser={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >

            {/* 🔥 DEFAULT PAGE = DASHBOARD */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route
              path="dashboard"
              element={<Dashboard habits={habits} />}
            />

            <Route
              path="habits"
              element={<Habits habits={habits} setHabits={setHabits} />}
            />

            <Route
              path="tasks"
              element={<WeeklyTasks habits={habits} />}
            />

            <Route
              path="settings"
              element={<Settings />}
            />

          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;