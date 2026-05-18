import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import "./Layout.css";

export default function Layout({ darkMode, setDarkMode, setIsAuth }) {
  return (
    <div className={darkMode ? "layout dark" : "layout"}>

      <Sidebar />

      <div className="layout-right">

        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setIsAuth={setIsAuth}
        />

        <main className="layout-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}