import { FiSunrise, FiSun, FiMoon, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MEAL_CONFIG = {
  breakfast: {
    icon: FiSunrise,
    label: "Breakfast",
    time: "7–9 AM",
    accent: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  lunch: {
    icon: FiSun,
    label: "Lunch",
    time: "12–2 PM",
    accent: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  dinner: {
    icon: FiMoon,
    label: "Dinner",
    time: "7–9 PM",
    accent: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/20",
  },
};

function MealRow({ meal, value }) {
  const { icon: Icon, label, time, accent, bg, border } = MEAL_CONFIG[meal];
  const items = value ? value.split("+").map((i) => i.trim()) : [];

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border ${border} bg-white/2`}
    >
      {/* Icon */}
      <div
        className={`w-8 h-8 shrink-0 rounded-lg ${bg} flex items-center justify-center`}
      >
        <Icon size={15} className={accent} strokeWidth={2} />
      </div>

      {/* Label + time */}
      <div className="w-20 shrink-0">
        <p
          className={`text-[11px] font-semibold uppercase tracking-wider ${accent}`}
        >
          {label}
        </p>
        <p className="text-[9px] text-gray-600 mt-0.5">{time}</p>
      </div>

      {/* Items */}
      <div className="flex-1 min-w-0">
        {items.length > 1 ? (
          <div className="flex flex-wrap gap-1">
            {items.map((it, idx) => (
              <span
                key={idx}
                className="text-[11px] text-white/70 bg-white/5 border border-white/10 rounded-md px-1.5 py-0.5"
              >
                {it}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/80 font-medium">
            {value || (
              <span className="text-gray-600 italic text-xs">
                Not decided yet
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

function TomorrowMenu({ tomorrowData }) {
  const navigate = useNavigate();

  if (!tomorrowData) return null;

  return (
    <div className="rounded-2xl bg-white/3 border border-gray-800 p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-base font-semibold text-white">
            Tomorrow{" "}
            <span className="text-gray-500 font-normal">
              ({tomorrowData.day})
            </span>
          </h2>
          <p className="text-[10px] text-gray-600 mt-0.5 uppercase tracking-widest">
            Upcoming meals
          </p>
        </div>

        <button
          onClick={() => navigate("/weekly")}
          className="flex items-center gap-1 text-[11px] text-amber-400 border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded-lg transition-all duration-200 active:scale-95"
        >
          Full week
          <FiChevronRight size={12} strokeWidth={2.5} />
        </button>
      </div>

      {/* Meal rows */}
      <div className="flex flex-col gap-2">
        {["breakfast", "lunch", "dinner"].map((meal) => (
          <MealRow key={meal} meal={meal} value={tomorrowData[meal]} />
        ))}
      </div>
    </div>
  );
}

export default TomorrowMenu;
