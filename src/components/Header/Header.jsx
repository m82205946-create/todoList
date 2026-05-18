import { Moon, Sun, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ darkMode, setDarkMode, setIsAuth }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    // 1. App.jsx dagi handleLogout funksiyasini ishga tushirish
    // Bu joyda xatolikni oldini olish uchun funksiya ekanligini tekshiramiz
    if (typeof setIsAuth === "function") {
      setIsAuth();
    } else {
      // Agar prop kelmasa, xavfsizlik uchun localStoreni tozalab yuboramiz
      localStorage.removeItem("currentUser");
      window.location.reload(); 
    }

    // 2. Dropdownni yopish
    setOpen(false);

    // 3. Login sahifasiga yo'naltirish
    navigate("/login");
  };

  return (
    <header className="header">
      <input className="search" placeholder="Search..." />

      <div className="header-right">
        {/* DARK MODE TOGGLE */}
        <button
          className="dark-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#94a3b8" />}
        </button>

        {/* PROFILE AVATAR */}
        <div className="avatar-wrapper">
          <div className="avatar" onClick={() => setOpen(!open)}>
            <User size={22} color="white" />
          </div>

          {open && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={logout}>
                <LogOut size={16} />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}