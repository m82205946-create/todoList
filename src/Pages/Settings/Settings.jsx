import { useState, useEffect } from "react";
import { User, Shield } from "lucide-react";
import ChangePasswordModal from "../../Components/ChangePasswordModal/ChangePasswordModal";
import "./Settings.css";

export default function Settings() {
  const [openModal, setOpenModal] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [saved, setSaved] = useState(false);

  const [twoFA, setTwoFA] = useState(
    JSON.parse(localStorage.getItem("2fa")) || false
  );

  // ✅ LOAD CURRENT USER (LOGIN BILAN MOS)
  useEffect(() => {
    const rawUser = localStorage.getItem("currentUser");

    const currentUser = rawUser
      ? JSON.parse(rawUser)
      : null;

    if (currentUser && currentUser.email) {
      setUserData({
        name: currentUser.name || "User",
        email: currentUser.email,
      });
    } else {
      setUserData({
        name: "Guest",
        email: "not-logged@example.com",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // 💾 SAVE PROFILE UPDATE
  const handleSave = () => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify(userData)
    );

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // 🔐 2FA TOGGLE
  const toggle2FA = () => {
    const updated = !twoFA;
    setTwoFA(updated);
    localStorage.setItem("2fa", JSON.stringify(updated));
  };

  // ❌ DELETE ACCOUNT
  const handleDelete = () => {
    const confirmDelete = window.confirm("Delete account?");
    if (confirmDelete) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="settings-page">

      <ChangePasswordModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      {/* HEADER */}
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account and preferences</p>
      </div>

      {/* PROFILE */}
      <div className="settings-card">
        <div className="card-title blue">
          <User size={18} />
          <span>Profile</span>
        </div>

        <div className="profile-box">
          <div className="avatar">
            {userData.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
          </div>
        </div>

        {/* INPUTS */}
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>

        {saved && (
          <span className="saved-text">
            Saved Successfully
          </span>
        )}
      </div>

      {/* SECURITY */}
      <div className="settings-card">
        <div className="card-title red">
          <Shield size={18} />
          <span>Security</span>
        </div>

        <button
          className="security-btn"
          onClick={() => setOpenModal(true)}
        >
          Change Password
        </button>

        <button className="security-btn" onClick={toggle2FA}>
          Two-Factor Authentication

          <div className={twoFA ? "toggle active" : "toggle"}>
            <div className="toggle-circle" />
          </div>
        </button>

        <button className="delete-acc" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
}