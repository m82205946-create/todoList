  import { NavLink } from "react-router-dom";
  import {
    LayoutDashboard,
    CheckSquare,
    Calendar,
    BarChart3,
    Settings,
  } from "lucide-react";

  import "./Sidebar.css";

  export default function Sidebar() {
    return (
      <aside className="sidebar">
        <div className="logo">
          <h2>Smart Todo App</h2>
        </div>

        <nav className="sidebar-nav">

          <NavLink
            to="dashboard"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>


          <NavLink
            to="/habits"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <Calendar size={20} />
            Habits  
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <BarChart3 size={20} />
            WeeklyTasks
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <Settings size={20} />
            Settings
          </NavLink>

        </nav>
      </aside>
    );
  }