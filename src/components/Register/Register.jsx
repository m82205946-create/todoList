import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showToast = (type, message) => {
    if (type === "error") {
      setError(message);
      setSuccess("");
      setTimeout(() => setError(""), 3500); // 3.5 soniyadan keyin o'chadi
    } else {
      setSuccess(message);
      setError("");
      setTimeout(() => setSuccess(""), 3500);
    }
  };

  const handleRegister = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!form.email || !form.password) {
      showToast("error", "Email va passwordni kiriting ⚠️");
      return;
    }

    if (!form.email.includes("@")) {
      showToast("error", "Email noto‘g‘ri kiritildi ❌");
      return;
    }

    const exists = users.find((u) => u.email === form.email);
    if (exists) {
      showToast("error", "Bu email allaqachon ro‘yxatdan o‘tgan ");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    showToast("success", "Muvaqqiyatli ro'yxatdan o'tildi ✅");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="register-container">
      
      {/* TOAST JAYLAShUV HUDUDI */}
      <div className="toast-container">
        {/* XATOLIK TOASTI */}
        {error && (
          <div className="toast-msg error-toast">
            <div className="toast-content">
              <span className="toast-icon-error">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </span>
              <span>{error}</span>
            </div>
            <button className="toast-close-btn" onClick={() => setError("")}>✕</button>
            <div className="toast-progress"></div>
          </div>
        )}

        {/* MUVAFFOQIYATLI TOAST (Rasmda aynan shu turibdi) */}
        {success && (
          <div className="toast-msg success-toast">
            <div className="toast-content">
              <span className="toast-icon-success">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </span>
              <span>{success}</span>
            </div>
            <button className="toast-close-btn" onClick={() => setSuccess("")}>✕</button>
            <div className="toast-progress"></div>
          </div>
        )}
      </div>

      <div className="auth-box">
        <h2>Ro'yxatdan o'tish</h2>
        <p>Yangi account yarating</p>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email@gmail.com"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            onChange={handleChange}
            required
          />
        </div>

        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>

        <NavLink to="/login" className="switch-link">
          Allaqachon account bormi? <span>Kirish</span>
        </NavLink>
      </div>
    </div>
  );
}