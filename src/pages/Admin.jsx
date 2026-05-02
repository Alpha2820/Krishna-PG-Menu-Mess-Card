import { useState, useEffect } from "react";
import Login from "./Login";
import menu from "../data/menu";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { FiMenu, FiEye, FiBell, FiSettings } from "react-icons/fi";

const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const today = new Date().getDay();

const DEFAULT_MENU = menu.reduce((acc, day, i) => {
  acc[i] = { ...day };
  return acc;
}, {});

const TOAST_CONFIG = {
  saved: {
    msg: "✅ Menu updated successfully!",
    color: "#10b981",
    border: "rgba(16,185,129,0.3)",
  },
  no_changes: {
    msg: "⚠️ No changes made yet!",
    color: "#f59e0b",
    border: "rgba(245,158,11,0.3)",
  },
  restored: {
    msg: "↩️ Restored to default menu!",
    color: "#60a5fa",
    border: "rgba(96,165,250,0.3)",
  },
  error: {
    msg: "❌ Something went wrong!",
    color: "#ef4444",
    border: "rgba(239,68,68,0.3)",
  },
  announced: {
    msg: "📢 Announcement posted!",
    color: "#10b981",
    border: "rgba(16,185,129,0.3)",
  },
  deleted: {
    msg: "🗑️ Announcement deleted!",
    color: "#f59e0b",
    border: "rgba(245,158,11,0.3)",
  },
  password: {
    msg: "🔑 Password updated!",
    color: "#10b981",
    border: "rgba(16,185,129,0.3)",
  },
};

// ─── Menu Tab ───────────────────────────────────────────────
function MenuTab({ showToast }) {
  const [selectedDay, setSelectedDay] = useState(today);
  const [editedMenu, setEditedMenu] = useState(
    JSON.parse(JSON.stringify(DEFAULT_MENU)),
  );

  const hasChanges = () =>
    JSON.stringify(editedMenu) !== JSON.stringify(DEFAULT_MENU);

  const handleChange = (dayIndex, meal, value) => {
    setEditedMenu((prev) => ({
      ...prev,
      [dayIndex]: { ...prev[dayIndex], [meal]: value },
    }));
  };

  const handleSave = async () => {
    if (!hasChanges()) {
      showToast("no_changes");
      return;
    }
    try {
      const firestoreData = {};
      DAYS.forEach((day, i) => {
        firestoreData[day] = {
          breakfast: editedMenu[i].breakfast,
          lunch: editedMenu[i].lunch,
          dinner: editedMenu[i].dinner,
        };
      });
      await setDoc(doc(db, "menu", "week"), firestoreData);
      showToast("saved");
    } catch {
      showToast("error");
    }
  };

  const handleRestoreDefault = async () => {
    try {
      const firestoreData = {};
      DAYS.forEach((day, i) => {
        firestoreData[day] = {
          breakfast: DEFAULT_MENU[i].breakfast,
          lunch: DEFAULT_MENU[i].lunch,
          dinner: DEFAULT_MENU[i].dinner,
        };
      });
      await setDoc(doc(db, "menu", "week"), firestoreData);
      setEditedMenu(JSON.parse(JSON.stringify(DEFAULT_MENU)));
      showToast("restored");
    } catch {
      showToast("error");
    }
  };

  const currentDay = editedMenu[selectedDay];

  return (
    <div className="flex flex-col gap-4">
      {/* Day selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {DAY_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            className="shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{
              background: selectedDay === i ? "#fbbf24" : "#141414",
              color:
                selectedDay === i
                  ? "#000"
                  : i === today
                    ? "#fbbf24"
                    : "#6b7280",
              border:
                selectedDay === i
                  ? "none"
                  : i === today
                    ? "1px solid rgba(251,191,36,0.3)"
                    : "1px solid #222",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Meal editors */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#141414", border: "1px solid #222" }}
      >
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
          Editing:{" "}
          {DAYS[selectedDay].charAt(0).toUpperCase() +
            DAYS[selectedDay].slice(1)}
        </p>
        {[
          { key: "breakfast", icon: "☀️", label: "Breakfast" },
          { key: "lunch", icon: "🍱", label: "Lunch" },
          { key: "dinner", icon: "🌙", label: "Dinner" },
        ].map(({ key, icon, label }) => (
          <div key={key} className="mb-4">
            <p className="text-xs text-gray-400 mb-1.5 flex items-center gap-1.5">
              <span>{icon}</span> {label}
            </p>
            <input
              type="text"
              value={currentDay?.[key] || ""}
              onChange={(e) => handleChange(selectedDay, key, e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
              style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
              placeholder={`Enter ${label.toLowerCase()} items separated by +`}
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl text-sm font-semibold active:scale-95 transition-all"
          style={{ background: "#fbbf24", color: "#000" }}
        >
          💾 Save Changes
        </button>
      </div>

      {/* Restore Default */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#141414", border: "1px solid #222" }}
      >
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
          ↩️ Default Menu
        </p>
        <p className="text-xs text-gray-600 mb-4">
          Restore the original menu for all days
        </p>
        <button
          onClick={handleRestoreDefault}
          className="w-full py-3 rounded-xl text-sm font-semibold active:scale-95 transition-all"
          style={{
            background: "transparent",
            color: "#60a5fa",
            border: "1px solid rgba(96,165,250,0.3)",
          }}
        >
          ↩️ Restore to Default Menu
        </button>
      </div>
    </div>
  );
}

// ─── Preview Tab ─────────────────────────────────────────────
function PreviewTab() {
  const MEAL_CONFIG = {
    breakfast: { icon: "☀️", label: "Breakfast", color: "#f59e0b" },
    lunch: { icon: "🍱", label: "Lunch", color: "#10b981" },
    dinner: { icon: "🌙", label: "Dinner", color: "#818cf8" },
  };

  const todayKey = DAYS[today];
  const todayData = DEFAULT_MENU[today];

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-2xl p-4"
        style={{ background: "#141414", border: "1px solid #222" }}
      >
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
          👁️ Today's Preview —{" "}
          {DAYS[today].charAt(0).toUpperCase() + DAYS[today].slice(1)}
        </p>
        <p className="text-[10px] text-amber-400/60 mb-4">
          This shows current Firebase data. Save changes in Menu tab to see
          updates.
        </p>

        {["breakfast", "lunch", "dinner"].map((meal) => {
          const cfg = MEAL_CONFIG[meal];
          const value = todayData?.[meal] || "";
          const items = value ? value.split("+").map((i) => i.trim()) : [];
          return (
            <div key={meal} className="flex items-start gap-3 mb-3">
              <div
                className="w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-sm"
                style={{ background: `${cfg.color}18` }}
              >
                {cfg.icon}
              </div>
              <div className="flex-1">
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                  style={{ color: cfg.color }}
                >
                  {cfg.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {items.length > 1 ? (
                    items.map((it, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md"
                        style={{
                          background: "#1f1f1f",
                          color: "#d1d5db",
                          border: "1px solid #2a2a2a",
                        }}
                      >
                        {it}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-300">
                      {value || "—"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Announce Tab ────────────────────────────────────────────
// Replace AnnounceTab with this full Firebase-connected version:

function AnnounceTab({ showToast }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [announcements, setAnnouncements] = useState([]);

  const TYPE_CONFIG = {
    info: { icon: "📢", color: "#60a5fa", label: "Info" },
    warning: { icon: "⚠️", color: "#f59e0b", label: "Warning" },
    celebration: { icon: "🎉", color: "#10b981", label: "Celebration" },
  };

  // ✅ Listen to announcements from Firebase
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "announcements"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => b.createdAt - a.createdAt);
      setAnnouncements(data);
    });
    return () => unsub();
  }, []);

  const handlePost = async () => {
    if (!message.trim()) return;
    const postedAt = new Date().toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
    try {
      await addDoc(collection(db, "announcements"), {
        message,
        type,
        postedAt,
        createdAt: Date.now(),
      });
      setMessage("");
      showToast("announced");
    } catch {
      showToast("error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "announcements", id));
      showToast("deleted");
    } catch {
      showToast("error");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-2xl p-5"
        style={{ background: "#141414", border: "1px solid #222" }}
      >
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
          📢 Post Announcement
        </p>

        <div className="flex gap-2 mb-3">
          {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setType(key)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: type === key ? `${cfg.color}20` : "#1a1a1a",
                color: type === key ? cfg.color : "#6b7280",
                border:
                  type === key
                    ? `1px solid ${cfg.color}40`
                    : "1px solid #2a2a2a",
              }}
            >
              {cfg.icon} {cfg.label}
            </button>
          ))}
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your announcement here..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none mb-3"
          style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
        />

        <button
          onClick={handlePost}
          className="w-full py-3 rounded-xl text-sm font-semibold active:scale-95 transition-all"
          style={{ background: "#fbbf24", color: "#000" }}
        >
          📢 Post Announcement
        </button>
      </div>

      <div
        className="rounded-2xl p-5"
        style={{ background: "#141414", border: "1px solid #222" }}
      >
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
          Active Announcements
        </p>
        {announcements.length === 0 ? (
          <p className="text-xs text-gray-600 text-center py-4">
            No announcements yet
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {announcements.map(({ id, message, type, postedAt }) => {
              const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.info;
              return (
                <div
                  key={id}
                  className="rounded-xl p-3"
                  style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <span className="text-sm shrink-0">{cfg.icon}</span>
                      <div>
                        <p className="text-xs text-white leading-relaxed">
                          {message}
                        </p>
                        <p
                          className="text-[10px] mt-1"
                          style={{ color: cfg.color }}
                        >
                          {postedAt}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-[10px] px-2 py-1 rounded-lg shrink-0"
                      style={{
                        color: "#ef4444",
                        border: "1px solid rgba(239,68,68,0.2)",
                        background: "rgba(239,68,68,0.08)",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Settings Tab ────────────────────────────────────────────
function SettingsTab({ showToast, onLogout }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const CURRENT_PASSWORD = "krishna@admin123"; // will move to Firebase later

  const handleChangePassword = () => {
    if (oldPassword !== CURRENT_PASSWORD) {
      showToast("error");
      return;
    }
    if (!newPassword.trim()) {
      showToast("error");
      return;
    }
    // Firebase password update coming soon
    showToast("password");
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Change Password */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#141414", border: "1px solid #222" }}
      >
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
          🔑 Change Password
        </p>
        <div className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Current password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
            style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
            style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
          />
          <button
            onClick={handleChangePassword}
            className="w-full py-3 rounded-xl text-sm font-semibold active:scale-95 transition-all"
            style={{ background: "#fbbf24", color: "#000" }}
          >
            🔑 Update Password
          </button>
        </div>
      </div>

      {/* App Info */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#141414", border: "1px solid #222" }}
      >
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
          ℹ️ App Info
        </p>
        {[
          { label: "App Name", value: "Krishna PG Menu" },
          { label: "Version", value: "1.0.0" },
          { label: "Database", value: "Firebase Firestore" },
          { label: "Hosting", value: "Vercel" },
          { label: "Built by", value: "Abhijeet Tiwari" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between items-center py-2.5"
            style={{ borderBottom: "1px solid #1f1f1f" }}
          >
            <span className="text-xs text-gray-500">{label}</span>
            <span className="text-xs text-white font-medium">{value}</span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full py-3 rounded-xl text-sm font-semibold active:scale-95 transition-all"
        style={{
          background: "transparent",
          color: "#ef4444",
          border: "1px solid rgba(239,68,68,0.3)",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

// ─── Main Admin Component ────────────────────────────────────
function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("menu");
  const [toast, setToast] = useState(null);

  const showToast = (type) => {
    setToast(type);
    setTimeout(() => setToast(null), 3000);
  };

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  const TABS = [
    { key: "menu", icon: <FiMenu />, label: "Menu" },
    { key: "preview", icon: <FiEye />, label: "Preview" },
    { key: "announce", icon: <FiBell />, label: "Announce" },
    { key: "settings", icon: <FiSettings />, label: "Settings" },
  ];

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{ background: "#0d0d0d" }}
    >
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap"
          style={{
            background: "#1a1a1a",
            border: `1px solid ${TOAST_CONFIG[toast].border}`,
            color: TOAST_CONFIG[toast].color,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {TOAST_CONFIG[toast].msg}
        </div>
      )}

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">
              Krishna PG Menu Manager
            </p>
          </div>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
            style={{
              background: "rgba(251,191,36,0.1)",
              border: "1px solid rgba(251,191,36,0.2)",
            }}
          >
            🍽️
          </div>
        </div>

        {/* Tab content */}
        {activeTab === "menu" && <MenuTab showToast={showToast} />}
        {activeTab === "preview" && <PreviewTab />}
        {activeTab === "announce" && <AnnounceTab showToast={showToast} />}
        {activeTab === "settings" && (
          <SettingsTab
            showToast={showToast}
            onLogout={() => setIsLoggedIn(false)}
          />
        )}
      </div>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-[#0b0f14] border-t border-gray-800">
        <div className="flex justify-around items-center py-2">
          {TABS.map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex flex-col items-center text-xs transition-all"
              style={{ color: activeTab === key ? "#fbbf24" : "#6b7280" }}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-[10px] mt-1">{label}</span>
              {activeTab === key && (
                <div className="w-5 h-1 bg-amber-400 rounded-full mt-1" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Admin;
