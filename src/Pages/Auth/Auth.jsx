import React, { useState } from "react";
import "./auth.css";

export default function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    nick: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // REGISTER
  // =========================
  const handleRegister = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!form.nick || !form.password) {
      setError("Nick va password to‘ldirilishi shart ❌");
      return;
    }

    const exists = users.find((u) => u.nick === form.nick);

    if (exists) {
      setError("Bu nick band ❌");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    setError("");
    alert("Account yaratildi ✅");
    setIsLogin(true);
  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.nick === form.nick && u.password === form.password
    );

    if (!user) {
      setError("Nick yoki password noto‘g‘ri ❌");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    setError("");
    onAuth(user);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <p>{isLogin ? "Accountga kiring" : "Yangi account yarating"}</p>

        <input
          type="text"
          name="nick"
          placeholder="Nick"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {error && <div className="error">{error}</div>}

        {isLogin ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <button onClick={handleRegister}>Register</button>
        )}

        <p
          className="switch"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin
            ? "Account yo‘qmi? Register"
            : "Allaqachon account bormi? Login"}
        </p>
      </div>
    </div>
  );
}