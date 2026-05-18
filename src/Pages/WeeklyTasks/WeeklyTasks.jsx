import React, { useMemo } from "react";
import { CheckCircle2, TrendingUp, Target } from "lucide-react";
import "./WeeklyTasks.css";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WeeklyTasks({ habits = [] }) {
  const stats = useMemo(() => {
    // 1. Kunlik bar chart ma'lumotlari
    const dailyData = weekDays.map((day, index) => {
      const completedCount = habits.reduce((sum, h) => sum + (h.days[index] ? 1 : 0), 0);
      const missedCount = habits.length - completedCount;
      return { day, completed: completedCount, missed: missedCount };
    });

    // 2. Top Stats hisob-kitobi
    const totalCompleted = dailyData.reduce((sum, d) => sum + d.completed, 0);
    const dailyAvg = habits.length > 0 ? Math.round(totalCompleted / 7) : 0;
    const consistencyScore = habits.length > 0 ? Math.round((totalCompleted / (habits.length * 7)) * 100) : 0;

    // 3. Trend Line ma'lumotlari (Rasmga mos o'suvchi trend)
    const trendPoints = [
      { x: 40, y: 90, val: 65, label: "Week 1" },
      { x: 140, y: 75, val: 72, label: "Week 2" },
      { x: 240, y: 55, val: 78, label: "Week 3" },
      { x: 340, y: 35, val: consistencyScore, label: "Week 4" }
    ];

    // 4. Kategoriyalar bo'yicha taqsimot
    const categories = [
      { label: "Work", class: "cat-work" },
      { label: "Personal", class: "cat-personal" },
      { label: "Health", class: "cat-health" },
      { label: "Learning", class: "cat-learning" }
    ];
    const distribution = categories.map(cat => {
      const catHabits = habits.filter(h => h.category === cat.label);
      const catDone = catHabits.reduce((sum, h) => sum + h.days.filter(Boolean).length, 0);
      const totalDone = totalCompleted || 1;
      return { ...cat, percent: Math.round((catDone / totalDone) * 100) };
    });

    return { dailyData, totalCompleted, dailyAvg, consistencyScore, trendPoints, distribution };
  }, [habits]);

  const maxVal = habits.length || 1;

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <h1>Analytics</h1>
        <p>Track your productivity insights</p>
      </header>

      {/* 1. TOP CARDS */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="icon-box blue"><CheckCircle2 size={24} /></div>
          <div className="stat-info">
            <span className="label">Total Completed</span>
            <h2 className="value">{stats.totalCompleted}</h2>
            <span className="sub">This week</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box purple"><TrendingUp size={24} /></div>
          <div className="stat-info">
            <span className="label">Daily Average</span>
            <h2 className="value">{stats.dailyAvg}</h2>
            <span className="sub">Tasks per day</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box green"><Target size={24} /></div>
          <div className="stat-info">
            <span className="label">Consistency Score</span>
            <h2 className="value">{stats.consistencyScore}%</h2>
            <span className="sub">Habit completion</span>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE CHARTS */}
      <div className="charts-grid">
        {/* BAR CHART */}
        <div className="chart-box">
          <h3>Weekly Productivity</h3>
          <div className="bar-chart-area">
            {stats.dailyData.map((d, i) => (
              <div key={i} className="bar-col">
                <div className="bar-tooltip">
                  <div className="t-item"><span className="dot done"></span> Done: {d.completed}</div>
                  <div className="t-item"><span className="dot missed"></span> Missed: {d.missed}</div>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ height: `${(d.completed / maxVal) * 100}%` }}></div>
                </div>
                <span className="day-label">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* LINE CHART (Habit Consistency Trend) */}
        <div className="chart-box">
          <h3>Habit Consistency Trend</h3>
          <div className="line-chart-container">
            <svg viewBox="0 0 400 120" className="line-svg">
              <line x1="0" y1="90" x2="400" y2="90" className="line-grid" />
              <line x1="0" y1="60" x2="400" y2="60" className="line-grid" />
              <line x1="0" y1="30" x2="400" y2="30" className="line-grid" />
              
              <path 
                d="M40,90 C100,85 140,75 140,75 S200,65 240,55 S300,40 340,35" 
                className="line-path-main" 
              />

              {stats.trendPoints.map((p, i) => (
                <g key={i} className="line-node">
                  <foreignObject x={p.x - 20} y={p.y - 45} width="40" height="30">
                    <div className="line-hover-tooltip">{p.val}%</div>
                  </foreignObject>
                  <circle cx={p.x} cy={p.y} r="5" className="line-circle" />
                  <circle cx={p.x} cy={p.y} r="15" fill="transparent" />
                </g>
              ))}
            </svg>
            <div className="line-labels">
              <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TASK DISTRIBUTION (Kartalar) */}
      <div className="chart-box category-container">
        <h3>Task Distribution by Category</h3>
        <div className="dist-grid">
          {stats.distribution.map((item, i) => (
            <div key={i} className="dist-card">
              <div className={`dist-accent-line ${item.class}`}></div>
              <div className="dist-info">
                <span className="dist-label">{item.label}</span>
                <h2 className="dist-value">{item.percent}%</h2>
              </div>
              <div className="dist-progress-wrapper">
                <div className="dist-progress-bg">
                  <div className={`dist-progress-fill ${item.class}`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}