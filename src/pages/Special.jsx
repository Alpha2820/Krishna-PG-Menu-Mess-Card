import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const ANNOUNCEMENT_STYLES = {
  warning: {
    icon: "⚠️",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
  },
  info: {
    icon: "📢",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.25)",
  },
  celebration: {
    icon: "🎉",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
  },
};

const SPECIALS = [
  {
    occasion: "Sunday Special",
    items: "Puri Sabzi + Kheer",
    icon: "🎉",
    color: "#f59e0b",
    desc: "Every Sunday treat",
  },
  {
    occasion: "Festival Menu",
    items: "Updated before festivals",
    icon: "🪔",
    color: "#818cf8",
    desc: "Seasonal & cultural occasions",
  },
  {
    occasion: "Guest Meal",
    items: "Contact management",
    icon: "👥",
    color: "#10b981",
    desc: "For visitors & special requests",
  },
];

function Special() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "announcements"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => b.createdAt - a.createdAt);
      setAnnouncements(data);
    });
    return () => unsub();
  }, []);

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{ background: "#0d0d0d" }}
    >
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-28">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Special Menu</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
            Occasions & extras
          </p>
        </div>

        {/* ✅ Announcements from Firebase */}
        {announcements.length > 0 && (
          <div className="mb-5">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold mb-2 px-1">
              📢 Announcements
            </p>
            <div className="flex flex-col gap-2">
              {announcements.map(({ id, message, type, postedAt }) => {
                const s = ANNOUNCEMENT_STYLES[type] || ANNOUNCEMENT_STYLES.info;
                return (
                  <div
                    key={id}
                    className="rounded-xl px-4 py-3.5"
                    style={{
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base">{s.icon}</span>
                      <p
                        className="text-[10px] font-medium"
                        style={{ color: s.color }}
                      >
                        {postedAt}
                      </p>
                    </div>
                    <p className="text-sm text-white leading-relaxed">
                      {message}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Special cards */}
        <div className="flex flex-col gap-3">
          {SPECIALS.map(({ occasion, items, icon, color, desc }) => {
            const itemList = items.split("+").map((i) => i.trim());
            return (
              <div
                key={occasion}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{ background: "#141414", border: "1px solid #222" }}
              >
                <div
                  className="flex items-center gap-3 px-4 py-3"
                  style={{
                    borderBottom: "1px solid #1f1f1f",
                    background: `${color}08`,
                  }}
                >
                  <div
                    className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-base"
                    style={{ background: `${color}18` }}
                  >
                    {icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">
                      {occasion}
                    </p>
                    <p
                      className="text-[10px] mt-0.5 uppercase tracking-wider font-medium"
                      style={{ color: `${color}99` }}
                    >
                      {desc}
                    </p>
                  </div>
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: color, opacity: 0.6 }}
                  />
                </div>
                <div className="px-4 py-3 flex flex-wrap gap-1.5">
                  {itemList.length > 1 ? (
                    itemList.map((it, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg"
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
                    <span className="text-sm text-gray-400">{items}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mt-6 rounded-2xl p-4 flex items-start gap-3"
          style={{ background: "#141414", border: "1px solid #1f1f1f" }}
        >
          <div
            className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-sm"
            style={{ background: "rgba(251,191,36,0.1)" }}
          >
            🍱
          </div>
          <p className="text-xs text-gray-500 leading-relaxed pt-1">
            Festival and special occasion menus will be updated here by
            management before the event.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Special;
