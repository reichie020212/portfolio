"use client";

import { useEffect, useState } from "react";
import { applyTheme, readTheme, toggleTheme, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initial = readTheme();
    setTheme(initial);
    applyTheme(initial);

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (e.key === "t" || e.key === "T") {
        const next = toggleTheme();
        setTheme(next);
        window.dispatchEvent(new CustomEvent("rb:theme-change"));
      }
    };
    window.addEventListener("keydown", onKey);

    const onExternal = () => {
      const current = (document.documentElement.getAttribute("data-theme") as Theme | null) ?? "dark";
      setTheme(current);
    };
    window.addEventListener("rb:theme-change", onExternal);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("rb:theme-change", onExternal);
    };
  }, []);

  return (
    <button
      type="button"
      className="theme-btn"
      aria-label={`Toggle theme (current: ${theme})`}
      onClick={() => {
        const next = toggleTheme();
        setTheme(next);
        window.dispatchEvent(new CustomEvent("rb:theme-change"));
      }}
    >
      <span className="ico" aria-hidden="true" />
      <span>{theme}</span>
    </button>
  );
}
