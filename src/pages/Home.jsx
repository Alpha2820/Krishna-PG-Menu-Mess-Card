import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
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
  const [loading, setLoading] = useState(true);

  // Auto switch meal based on time
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMeal(getCurrentMealIndex());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Listen to Firestore in real time
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "menu", "week"), (snap) => {
      if (snap.exists()) {
        setMenuData(snap.data());
      }
      setLoading(false);
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

  const todayKey = DAYS[getTodayIndex()];
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

          {/* Active meal spotlight */}
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

        {/* Tomorrow Section */}
        {tomorrowData && (
          <section className="mt-5">
            <TomorrowMenu tomorrowData={tomorrowData} />
          </section>
        )}

        {/* Stats footer */}
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
