import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";
import {
  getTodayIndex,
  getTomorrowIndex,
  getCurrentMealIndex,
} from "../utils/dateHelper";
import Header from "../components/Header";
import MealCard from "../components/MealCard";
import TomorrowMenu from "../components/TomorrowMenu";

const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const MEALS = [
  { label: "Breakfast", key: "breakfast", icon: "☀️" },
  { label: "Lunch", key: "lunch", icon: "🍛" },
  { label: "Dinner", key: "dinner", icon: "🌙" },
];

function Home() {
  const [activeMeal, setActiveMeal] = useState(getCurrentMealIndex());
  const [menuData, setMenuData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todayIndex, setTodayIndex] = useState(getTodayIndex());

  // ✅ Auto switch meal every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMeal(getCurrentMealIndex());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Auto update date at midnight
  useEffect(() => {
    const checkMidnight = setInterval(() => {
      const newIndex = getTodayIndex();
      setTodayIndex((prev) => {
        if (prev !== newIndex) {
          setActiveMeal(getCurrentMealIndex());
          return newIndex;
        }
        return prev;
      });
    }, 60000);
    return () => clearInterval(checkMidnight);
  }, []);

  // ✅ Listen to menu from Firestore
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "menu", "week"), (snap) => {
      if (snap.exists()) setMenuData(snap.data());
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // ✅ Listen to announcements from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "announcements"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Sort by postedAt descending
      data.sort((a, b) => b.createdAt - a.createdAt);
      setAnnouncements(data);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0d0d0d" }}
      >
        <p className="text-gray-500 text-sm animate-pulse">Loading menu...</p>
      </div>
    );
  }

  const todayKey = DAYS[todayIndex];
  const tomorrowKey = DAYS[getTomorrowIndex()];

  const todayData = {
    day: todayKey.charAt(0).toUpperCase() + todayKey.slice(1),
    breakfast: menuData?.[todayKey]?.breakfast || "Not updated",
    lunch: menuData?.[todayKey]?.lunch || "Not updated",
    dinner: menuData?.[todayKey]?.dinner || "Not updated",
  };

  const tomorrowRaw = menuData?.[tomorrowKey];
  const tomorrowData = tomorrowRaw
    ? {
        day: tomorrowKey.charAt(0).toUpperCase() + tomorrowKey.slice(1),
        ...tomorrowRaw,
      }
    : null;

  const activeMealData = MEALS[activeMeal];

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

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{ background: "#0d0d0d" }}
    >
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-28">
        <Header
          day={todayData.day}
          activeMeal={activeMeal}
          setActiveMeal={setActiveMeal}
        />

        {/* ✅ Announcements from Firebase */}
        {announcements.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            {announcements.map(({ id, message, type, postedAt }) => {
              const s = ANNOUNCEMENT_STYLES[type] || ANNOUNCEMENT_STYLES.info;
              return (
                <div
                  key={id}
                  className="rounded-xl px-4 py-3.5"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
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
        )}

        {/* Today's Menu */}
        <section
          className="mt-6 rounded-2xl p-5"
          style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
        >
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-base font-semibold text-white">
                Today's Menu
              </h2>
              <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest">
                {todayData.day}
              </p>
            </div>
            <span
              className="text-[11px] text-amber-400 font-medium px-2.5 py-1 rounded-lg"
              style={{
                background: "rgba(251,191,36,0.12)",
                border: "1px solid rgba(251,191,36,0.25)",
              }}
            >
              Fresh Today 🍽️
            </span>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {MEALS.map((meal, i) => (
              <div
                key={meal.key}
                onClick={() => setActiveMeal(i)}
                className="cursor-pointer transition-all duration-200 rounded-2xl"
                style={{
                  opacity: activeMeal === i ? 1 : 0.55,
                  transform: activeMeal === i ? "scale(1.01)" : "scale(1)",
                  outline:
                    activeMeal === i
                      ? "1px solid rgba(255,255,255,0.12)"
                      : "none",
                }}
              >
                <MealCard
                  label={meal.label}
                  item={todayData[meal.key]}
                  icon={meal.icon}
                />
              </div>
            ))}
          </div>

          <div
            className="mt-4 p-4 rounded-xl"
            style={{ background: "#222", border: "1px solid #333" }}
          >
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
              {activeMealData.icon} Currently highlighted
            </p>
            <p className="text-white font-semibold text-sm leading-relaxed">
              {todayData[activeMealData.key] || "Not updated yet"}
            </p>
          </div>
        </section>

        {tomorrowData && (
          <section className="mt-5">
            <TomorrowMenu tomorrowData={tomorrowData} />
          </section>
        )}

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: "Meals/day", value: "3" },
            { label: "Days/week", value: "7" },
            { label: "Updated", value: "Daily" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-3 text-center"
              style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
            >
              <p className="text-base font-bold text-amber-400">{value}</p>
              <p className="text-[10px] text-gray-600 mt-0.5 uppercase tracking-wider">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
