import React from "react";

const styles = {
  Breakfast: {
    card: "bg-amber-50/5 border-amber-400/20 hover:border-amber-400/40 hover:bg-amber-50/10",
    icon: "bg-amber-400/10",
    label: "text-amber-400/70",
    dot: "bg-amber-400",
    glow: "shadow-amber-400/10",
  },
  Lunch: {
    card: "bg-emerald-50/5 border-emerald-400/20 hover:border-emerald-400/40 hover:bg-emerald-50/10",
    icon: "bg-emerald-400/10",
    label: "text-emerald-400/70",
    dot: "bg-emerald-400",
    glow: "shadow-emerald-400/10",
  },
  Dinner: {
    card: "bg-indigo-50/5 border-indigo-400/20 hover:border-indigo-400/40 hover:bg-indigo-50/10",
    icon: "bg-indigo-400/10",
    label: "text-indigo-400/70",
    dot: "bg-indigo-400",
    glow: "shadow-indigo-400/10",
  },
};

const mealTimes = {
  Breakfast: "7:00 – 9:00 AM",
  Lunch: "12:00 – 2:00 PM",
  Dinner: "7:00 – 9:00 PM",
};

function MealCard({ label, item, icon }) {
  const s = styles[label];
  const items = item ? item.split("+").map((i) => i.trim()) : [];

  return (
    <div
      className={`w-full rounded-2xl p-5 border transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl ${s.card} ${s.glow}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 shrink-0 rounded-xl ${s.icon} flex items-center justify-center text-xl`}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Label + time */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <p
              className={`text-[10px] uppercase font-bold tracking-widest ${s.label}`}
            >
              {label}
            </p>
            <span className="text-[9px] text-gray-600 shrink-0">
              {mealTimes[label]}
            </span>
          </div>

          {/* Items — the real fix: no truncate, wrap properly */}
          {items.length > 1 ? (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {items.map((it, idx) => (
                <span
                  key={idx}
                  className="text-xs text-white/80 bg-white/5 border border-white/10 rounded-md px-2 py-0.5"
                >
                  {it}
                </span>
              ))}
            </div>
          ) : (
            <h3 className="text-base font-semibold text-white leading-snug mt-0.5">
              {item || "Not updated"}
            </h3>
          )}
        </div>

        {/* Status dot */}
        <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
          <div className={`w-2 h-2 rounded-full ${s.dot} animate-pulse`} />
        </div>
      </div>
    </div>
  );
}

export default MealCard;
