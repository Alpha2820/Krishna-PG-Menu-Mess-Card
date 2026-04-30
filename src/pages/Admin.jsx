import { useState } from "react";
import Login from "./Login";
import menu from "../data/menu";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

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

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDay, setSelectedDay] = useState(today);
  const [editedMenu, setEditedMenu] = useState(
    JSON.parse(JSON.stringify(DEFAULT_MENU)),
  );
  const [toast, setToast] = useState(null);

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  const showToast = (type) => {
    setToast(type);
    setTimeout(() => setToast(null), 3000);
  };

  const hasChanges = () => {
    return JSON.stringify(editedMenu) !== JSON.stringify(DEFAULT_MENU);
  };

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
    } catch (err) {
      console.error("Save failed:", err);
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
    } catch (err) {
      console.error("Restore failed:", err);
    }
  };

  const currentDay = editedMenu[selectedDay];

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
  };

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{ background: "#0d0d0d" }}
    >
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap"
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

      <div className="max-w-2xl mx-auto px-4 pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">
              Krishna PG Menu Manager
            </p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-xs text-gray-500 border border-gray-800 px-3 py-1.5 rounded-lg hover:text-red-400 hover:border-red-400/30 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Day selector */}
        <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
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
          className="rounded-2xl p-5 mb-4"
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
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
                placeholder={`Enter ${label.toLowerCase()} items separated by +`}
              />
            </div>
          ))}

          <button
            onClick={handleSave}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
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
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
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
    </div>
  );
}

export default Admin;
