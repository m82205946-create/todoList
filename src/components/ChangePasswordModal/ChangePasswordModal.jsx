import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import "./ChangePasswordModal.css";

export default function ChangePasswordModal({ open, onClose, user }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // 🔥 reset when modal opens/closes
  useEffect(() => {
    if (open) {
      setOldPassword("");
      setNewPassword("");
    }
  }, [open]);

  if (!open) return null;

  const handleChangePassword = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserLS = JSON.parse(localStorage.getItem("currentUser"));

    // 🔥 FIX 1: fallback user
    const email = user?.email || currentUserLS?.email;

    if (!email) {
      toast.error("User topilmadi (email yo‘q) ❌");
      return;
    }

    const userIndex = users.findIndex(
      (u) =>
        u.email?.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (userIndex === -1) {
      toast.error("User topilmadi ❌");
      console.log("DEBUG USERS:", users);
      return;
    }

    const currentUser = users[userIndex];

    // 🔥 FIX 2: safe compare
    if (
      currentUser.password?.trim() !== oldPassword.trim()
    ) {
      toast.error("Old password incorrect ❌");
      return;
    }

    if (!newPassword.trim()) {
      toast.error("New password bo‘sh bo‘lmasin ❌");
      return;
    }

    // 🔥 update password
    users[userIndex].password = newPassword.trim();

    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Password o‘zgartirildi ✅");

    setOldPassword("");
    setNewPassword("");

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Change Password</h3>
          <X onClick={onClose} style={{ cursor: "pointer" }} />
        </div>

        <div className="modal-body">
          <input
            type="password"
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button onClick={handleChangePassword}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}