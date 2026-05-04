import { useState, useEffect } from "react";
import { getFormattedDate } from "../utils/dateHelper";

const MEALS = [
  { label: "Breakfast", icon: "☀️", time: "7–9 AM" },
  { label: "Lunch", icon: "🍱", time: "12–2 PM" },
  { label: "Dinner", icon: "🌙", time: "7–9 PM" },
];
const WEATHER_API_KEY = "d7835463f4ecc5b76a1a3fa4e5c3f757";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=Ghaziabad,IN&appid=${WEATHER_API_KEY}&units=metric`;

// Weather icon mapping
function getWeatherEmoji(code) {
  if (!code) return "🌤️";
  if (code >= 200 && code < 300) return "⛈️"; // thunderstorm
  if (code >= 300 && code < 400) return "🌦️"; // drizzle
  if (code >= 500 && code < 600) return "🌧️"; // rain
  if (code >= 600 && code < 700) return "❄️"; // snow
  if (code >= 700 && code < 800) return "🌫️"; // fog/mist
  if (code === 800) return "☀️"; // clear
  if (code > 800) return "☁️"; // cloudy
  return "🌤️";
}

function LiveClock() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1c1c1a] border border-[#2a2a28] rounded-lg px-3 py-1 text-amber-400 font-semibold text-xs tracking-wide min-w-14 text-center font-mono">
      {time}
    </div>
  );
}

function Header({ day, activeMeal, setActiveMeal }) {
  const [weather, setWeather] = useState({ temp: null, code: null });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(WEATHER_URL);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || res.statusText);
        setWeather({
          temp: Math.round(data.main.temp),
          code: data.weather[0].id,
        });
      } catch (error) {
        console.error("Weather fetch failed:", error);
      }
    };

    fetchWeather(); // fetch on load
    const interval = setInterval(fetchWeather, 30 * 60 * 1000); // refresh every 30 mins
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-8 pt-5 border-b border-gray-800">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-[#1c1c1a] border border-[#2a2a28] flex items-center justify-center text-lg">
              🍽️
            </span>
            Krishna <span className="text-amber-500">PG</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">{getFormattedDate()}</p>
          <p className="text-gray-600 text-[10px] mt-0.5 uppercase tracking-widest">
            Today's Menu
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 bg-emerald-950 border border-emerald-800 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-widest">
              {day}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* ✅ Real weather */}
            <div className="bg-[#1c1c1a] border border-[#2a2a28] rounded-lg px-2.5 py-1 text-[11px] text-gray-400 flex items-center gap-1.5">
              {weather.temp !== null ? (
                <>
                  {getWeatherEmoji(weather.code)}
                  <span className="text-white font-semibold text-xs">
                    {weather.temp}°C
                  </span>
                </>
              ) : (
                <>
                  ☁️{" "}
                  <span className="text-white font-semibold text-xs">--°C</span>
                </>
              )}
            </div>
            <LiveClock />
          </div>

          <span className="text-[10px] text-gray-600">Freshly prepared</span>
        </div>
      </div>

      {/* Meal Tabs */}
      <div className="flex mx-0">
        {MEALS.map((meal, i) => (
          <button
            key={meal.label}
            onClick={() => setActiveMeal(i)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium uppercase tracking-wider border-b-2 transition-all duration-200
              ${
                activeMeal === i
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-gray-600 hover:text-gray-400 hover:bg-white/5"
              }`}
          >
            <span className="text-sm">{meal.icon}</span>
            {meal.label}
            <span className="text-[9px] font-normal opacity-60 normal-case tracking-normal">
              {meal.time}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Header;
