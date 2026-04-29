import menu from "../data/menu";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const today = new Date().getDay();

const MEAL_CONFIG = {
  breakfast: { icon: "☀️", label: "Breakfast", color: "#f59e0b" },
  lunch: { icon: "🍱", label: "Lunch", color: "#10b981" },
  dinner: { icon: "🌙", label: "Dinner", color: "#818cf8" },
};

function Weekly() {
  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{ background: "#0d0d0d" }}
    >
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-28">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Weekly Menu</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
            7-day meal plan
          </p>
        </div>

        {/* Day cards */}
        <div className="flex flex-col gap-3">
          {menu.map((day, i) => {
            const isToday = i === today;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: isToday ? "#1a1608" : "#141414",
                  border: isToday
                    ? "1px solid rgba(251,191,36,0.4)"
                    : "1px solid #222",
                }}
              >
                {/* Day header */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{
                    borderBottom: "1px solid",
                    borderColor: isToday ? "rgba(251,191,36,0.2)" : "#1f1f1f",
                    background: isToday
                      ? "rgba(251,191,36,0.06)"
                      : "transparent",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold"
                      style={{
                        background: isToday
                          ? "rgba(251,191,36,0.2)"
                          : "#1f1f1f",
                        color: isToday ? "#fbbf24" : "#6b7280",
                      }}
                    >
                      {DAYS[i].slice(0, 2).toUpperCase()}
                    </div>
                    <span
                      className="text-sm font-semibold tracking-wide"
                      style={{ color: isToday ? "#fbbf24" : "#e5e7eb" }}
                    >
                      {DAYS[i]}
                    </span>
                  </div>

                  {isToday && (
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(251,191,36,0.15)",
                        border: "1px solid rgba(251,191,36,0.3)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
                      <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                        Today
                      </span>
                    </div>
                  )}
                </div>

                {/* Meal rows */}
                <div className="px-4 py-3 flex flex-col gap-2.5">
                  {["breakfast", "lunch", "dinner"].map((meal) => {
                    const cfg = MEAL_CONFIG[meal];
                    const items = day[meal]
                      ? day[meal].split("+").map((i) => i.trim())
                      : [];
                    return (
                      <div key={meal} className="flex items-start gap-3">
                        {/* Icon */}
                        <div
                          className="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-xs mt-0.5"
                          style={{ background: `${cfg.color}18` }}
                        >
                          {cfg.icon}
                        </div>

                        {/* Label */}
                        <div className="w-16 shrink-0 pt-0.5">
                          <span
                            className="text-[10px] font-semibold uppercase tracking-wider"
                            style={{ color: cfg.color }}
                          >
                            {cfg.label}
                          </span>
                        </div>

                        {/* Items */}
                        <div className="flex-1 flex flex-wrap gap-1.5">
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
                              {day[meal] || "—"}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Weekly;
