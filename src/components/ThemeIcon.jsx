import React, { useState, useEffect } from "react";

export default function ThemeIcon() {
  const [theme, setTheme] = useState("light");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = saved || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);

    // Trigger spin animation
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
  };

  return (
    <button
      className={`theme-toggle ${theme}`}
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <span className={`theme-icon ${spinning ? "spin" : ""}`}>
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
