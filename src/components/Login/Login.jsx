import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      toast.error("Email va passwordni to‘ldiring ❌");
      return;
    }

    const user = users.find(
      (u) =>
        u.email?.trim() === email &&
        u.password?.trim() === password
    );

    if (!user) {
      toast.error("Email yoki password noto‘g‘ri ❌");
      return;
    }

    // ❌ password saqlanmaydi (SAFE)
    const currentUser = {
      email: user.email,
      name: user.name || user.email.split("@")[0],
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );

    setUser(currentUser);

    toast.success("Muvaffaqiyatli login bo‘ldi ✅");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="auth-box">
        <h2>Login</h2>
        <p>Accountga kiring</p>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email kiriting"
            onChange={handleChange}
            value={form.email}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password kiriting"
            onChange={handleChange}
            value={form.password}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <NavLink to="/register" className="switch-link">
          Account yo‘qmi? <span>Register</span>
        </NavLink>
      </div>
    </div>
  );
}