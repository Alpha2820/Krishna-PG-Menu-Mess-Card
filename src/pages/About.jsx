const INFO = [
  { label: "Mess Name", value: "Krishna PG" },
  { label: "Meals/Day", value: "3" },
  { label: "Days/Week", value: "7" },
  { label: "Breakfast", value: "7:00 – 9:00 AM" },
  { label: "Lunch", value: "12:00 – 2:00 PM" },
  { label: "Dinner", value: "7:00 – 9:00 PM" },
];

const TIMINGS = [
  { meal: "Breakfast", time: "7:00 – 9:00 AM", icon: "☀️", color: "#f59e0b" },
  { meal: "Lunch", time: "12:00 – 2:00 PM", icon: "🍱", color: "#10b981" },
  { meal: "Dinner", time: "7:00 – 9:00 PM", icon: "🌙", color: "#818cf8" },
];

function About() {
  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{ background: "#0d0d0d" }}
    >
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-28">
        {/* Logo block */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: "#141414", border: "1px solid #222" }}
          >
            🍽️
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Krishna <span className="text-amber-400">PG</span>
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">
              Mess Information
            </p>
          </div>
        </div>

        {/* Info table */}
        <div
          className="rounded-2xl overflow-hidden mb-3"
          style={{ background: "#141414", border: "1px solid #222" }}
        >
          {INFO.map(({ label, value }, i) => (
            <div
              key={label}
              className="flex justify-between items-center px-5 py-3.5 text-sm"
              style={{
                borderBottom:
                  i !== INFO.length - 1 ? "1px solid #1f1f1f" : "none",
              }}
            >
              <span className="text-gray-500">{label}</span>
              <span className="text-white font-medium">{value}</span>
            </div>
          ))}
        </div>

        {/* Meal timings */}
        <div
          className="rounded-2xl overflow-hidden mb-3"
          style={{ background: "#141414", border: "1px solid #222" }}
        >
          <div
            className="px-5 py-3 flex items-center gap-2"
            style={{
              borderBottom: "1px solid #1f1f1f",
              background: "rgba(251,191,36,0.05)",
            }}
          >
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-widest">
              Meal Timings
            </span>
          </div>
          {TIMINGS.map(({ meal, time, icon, color }, i) => (
            <div
              key={meal}
              className="flex items-center gap-3 px-5 py-3.5"
              style={{
                borderBottom:
                  i !== TIMINGS.length - 1 ? "1px solid #1f1f1f" : "none",
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0"
                style={{ background: `${color}18` }}
              >
                {icon}
              </div>
              <span className="text-sm text-gray-400 flex-1">{meal}</span>
              <span className="text-sm font-medium" style={{ color }}>
                {time}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          Built with ❤️ for Krishna PG residents
        </p>
        <p className="text-center text-gray-600 text-xs mt-1">
          by Abhijeet Tiwari
        </p>
      </div>
    </div>
  );
}

export default About;
