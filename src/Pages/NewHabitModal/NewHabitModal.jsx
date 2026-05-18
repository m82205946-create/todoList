// NewHabitModal.jsx
import React, { useState } from "react";
import "./NewHabitModal.css";

export default function NewHabitModal({ isOpen, onClose, onAddHabit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Work");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Habits.jsx dagi addHabit funksiyasiga object yuboramiz
    onAddHabit({ name, category });
    
    // Formani tozalash va yopish
    setName("");
    setCategory("Work");
    onClose();
  };

  return (
    <div className="glass-overlay" onClick={onClose}>
      <div className="glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="glass-card-inner">
          <button className="glass-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <header className="glass-header">
            <div className="glass-icon-wrapper">
              <div className="glass-icon-pulse"></div>
              <span className="glass-icon">★</span>
            </div>
            <h2>Yangi odat</h2>
            <p>Hayotingizni tartibga soling</p>
          </header>

          <form onSubmit={handleSubmit} className="glass-form">
            <div className="glass-input-group">
              <label>Odat sarlavhasi</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Yoga qilish..."
                autoFocus
                required
              />
            </div>

            <div className="glass-input-group">
              <label>Kategoriya</label>
              <div className="custom-select-container">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Work">Ish va Biznes</option>
                  <option value="Health">Salomatlik</option>
                  <option value="Learning">O'rganish</option>
                  <option value="Personal">Shaxsiy</option>
                </select>
                <div className="select-glow"></div>
              </div>
            </div>

            <div className="glass-actions">
              <button type="button" className="glass-btn glass-btn-cancel" onClick={onClose}>
                Bekor qilish
              </button>
              <button type="submit" className="glass-btn glass-btn-submit">
                Odatni yaratish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}