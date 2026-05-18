// Habits.jsx
import React, { useEffect, useState } from "react";
import "../Habits/Habits.css";
import NewHabitModal from "../NewHabitModal/NewHabitModal";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Habits() {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // LOAD HABITS FROM LOCALSTORAGE
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  // SAVE HABITS
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // DARK MODE TOGGLE
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // TOGGLE DAY
  const toggleDay = (id, index) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const updatedDays = [...habit.days];
        updatedDays[index] = !updatedDays[index];

        const completedCount = updatedDays.filter(Boolean).length;

        return {
          ...habit,
          days: updatedDays,
          streak: completedCount,
          progress: Math.round((completedCount / 7) * 100),
        };
      })
    );
  };

  // ADD HABIT - Modal yuborgan objectni qabul qiladi
  const addHabit = (habitData) => {
    const newHabit = {
      id: Date.now(),
      name: habitData.name,
      category: habitData.category,
      days: Array(7).fill(false),
      streak: 0,
      progress: 0,
    };

    setHabits((prev) => [...prev, newHabit]);
  };

  // DELETE HABIT
  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  // STATS
  const completedHabits = habits.filter((h) => h.progress === 100).length;
  const averageProgress = habits.length > 0 
    ? Math.round(habits.reduce((acc, h) => acc + h.progress, 0) / habits.length) 
    : 0;

  return (
    <div className={`habits-page ${darkMode ? "dark-mode" : ""}`}>
      <NewHabitModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddHabit={addHabit}
      />

      <div className="habits-header">
        <div>
          <h1>Habit Tracker</h1>
          <p>Build better routines and improve your life</p>
        </div>
        <div className="habits-header-right">
        
          <button className="habits-add-btn" onClick={() => setModalOpen(true)}>
            + Add Habit
          </button>
        </div>
      </div>

      <div className="habits-stats-grid">
        <div className="habits-stats-card habits-blue-card">
          <div className="habits-stats-icon">✓</div>
          <div>
            <h3>{habits.length}</h3>
            <p>Total Habits</p>
          </div>
        </div>
        <div className="habits-stats-card habits-green-card">
          <div className="habits-stats-icon">🔥</div>
          <div>
            <h3>{completedHabits}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="habits-stats-card habits-purple-card">
          <div className="habits-stats-icon">⚡</div>
          <div>
            <h3>{averageProgress}%</h3>
            <p>Average Progress</p>
          </div>
        </div>
      </div>

      <div className="habits-habit-wrapper">
        {habits.map((habit) => (
          <div key={habit.id} className="habits-habit-card">
            <div className="habits-habit-left">
              <div className="habits-habit-avatar">{habit.name[0].toUpperCase()}</div>
              <div>
                <h3>{habit.name}</h3>
                <p>{habit.category}</p>
              </div>
            </div>

            <div className="habits-days">
              {weekDays.map((day, index) => (
                <div key={index} className="habits-day-item">
                  <span>{day}</span>
                  <div
                    className={`habits-circle ${habit.days[index] ? "active" : ""}`}
                    onClick={() => toggleDay(habit.id, index)}
                  >
                    {habit.days[index] ? "✓" : ""}
                  </div>
                </div>
              ))}
            </div>

            <div className="habits-habit-right">
              <div className="habits-streak-box">🔥 {habit.streak}</div>
              <div className="habits-progress">
                <div className="habits-progress-top">
                  <span>Progress</span>
                  <span>{habit.progress}%</span>
                </div>
                <div className="habits-progress-bar">
                  <div className="habits-progress-fill" style={{ width: `${habit.progress}%` }}></div>
                </div>
              </div>
              <button className="habits-delete-btn" onClick={() => deleteHabit(habit.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}