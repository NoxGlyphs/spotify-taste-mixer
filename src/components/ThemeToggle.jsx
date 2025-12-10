"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initial = saved ? saved : document.documentElement.getAttribute("data-theme");
    const isDark = initial === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    setDarkMode(isDark);
  }, []);

  function toggleTheme() {
    const newTheme = darkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-3xl border border-[rgb(var(--color-border))] bg-[rgba(var(--color-border),0.15)]"
    >
      <span
        className={`absolute inset-0 rounded-3xl transition-colors duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400/60"
            : "bg-gradient-to-r from-white via-blue-50 to-blue-100"
        }`}
      />
      <span
        className={`relative block h-5 w-5 m-px rounded-full shadow-sm transition-transform duration-300 ${
          darkMode ? "translate-x-6 bg-purple-600" : "translate-x-0 bg-white"
        }`}
      />
    </button>
  );
}
