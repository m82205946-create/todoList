// Home.jsx

import React from "react";
import { NavLink } from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  ListTodo,
  Clock3,
  Star,
} from "lucide-react";

import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <div className="logo-circle">
            <ListTodo size={22} />
          </div>

          <div className="texts">
            <h2>Smart Todo</h2>
            <p>SMART TASK MANAGER</p>
          </div>
        </div>

        <NavLink to="/login" className="login-btns">
          Kirish
          <ArrowRight size={18} />
        </NavLink>
      </header>

      {/* Hero */}
      <section className="hero">

        <div className="badge">
          <Star size={15} />
          SMART TODO PLATFORMASI
        </div>

        <h1>
          Vazifalarni <br />
          <span>zamonaviy boshqaring</span>
        </h1>

        <p>
          Kundalik vazifalar, rejalashtirish, vaqtni boshqarish
          va samaradorlikni oshirish uchun qulay platforma.
        </p>

        <NavLink to="/login" className="hero-btn">
          Kirish
          <ArrowRight size={20} />
        </NavLink>

      </section>

      {/* Stats */}
      <section className="stats">

        <div className="card">
          <div className="icon">
            <CheckCircle2 size={28} />
          </div>

          <h2>1,200+</h2>
          <p>BAJARILGAN TASKLAR</p>
        </div>

        <div className="card">
          <div className="icon">
            <Clock3 size={28} />
          </div>

          <h2>50+</h2>
          <p>KUNLIK REJALAR</p>
        </div>

        <div className="card">
          <div className="icon">
            <ListTodo size={28} />
          </div>

          <h2>300+</h2>
          <p>AKTIV TASKLAR</p>
        </div>

        <div className="card">
          <div className="icon">
            <Star size={28} />
          </div>

          <h2>10,000+</h2>
          <p>UMUMIY ESLATMALAR</p>
        </div>

      </section>

    </div>
  );
}