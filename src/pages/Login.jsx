import { useState } from "react";

const ADMIN_PASSWORD = "krishna@admin123"; // change this to whatever you want

function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans px-4"
      style={{ background: "#0d0d0d" }}
    >
      <div
        className={`w-full max-w-sm rounded-2xl p-6 transition-all ${shake ? "animate-bounce" : ""}`}
        style={{ background: "#141414", border: "1px solid #222" }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
            style={{
              background: "rgba(251,191,36,0.1)",
              border: "1px solid rgba(251,191,36,0.2)",
            }}
          >
            🍽️
          </div>
          <h1 className="text-xl font-bold text-white">Krishna PG</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
            Admin Access
          </p>
        </div>

        {/* Password input */}
        <div className="flex flex-col gap-3">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
              background: "#1a1a1a",
              border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "#2a2a2a"}`,
            }}
          >
            <span className="text-gray-500 text-sm">🔒</span>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-600"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-xs text-red-400 text-center">
              Wrong password. Try again!
            </p>
          )}

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl text-sm font-semibold text-black transition-all duration-200 active:scale-95"
            style={{ background: "#fbbf24" }}
          >
            Login →
          </button>
        </div>

        <p className="text-center text-gray-700 text-[10px] mt-6">
          Only authorized personnel
        </p>
      </div>
    </div>
  );
}

export default Login;
