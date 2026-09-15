"use client";

import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "hamzei-theme";

/**
 * Runs before first paint, so the correct theme is on <html> by the time
 * anything is drawn and there is no flash of the wrong palette. Inlined
 * at the top of <body> by the layout — keep it dependency-free and small.
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var s=localStorage.getItem(k);var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  /* The real value lives on <html>, written by the init script. Read it on
     mount rather than guessing, so the label never contradicts the page.
     Only the label depends on this — the icons are driven by CSS, so they
     are already correct on the first frame. */
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  /* Follow the system while the visitor has not made a choice of their own. */
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      const next: Theme = e.matches ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("theme-switching");
      window.setTimeout(() => root.classList.remove("theme-switching"), 360);
    }

    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Private mode or blocked storage — the switch still works for this visit. */
    }
    setTheme(next);
  }

  /* The label names what the click will do, matching the icon. */
  const label = theme === "light" ? toDark : toLight;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink-2 text-slate transition-colors duration-200 hover:border-signal/40 hover:text-signal sm:h-10 sm:w-10"
    >
      <span className="relative block h-[18px] w-[18px]">
        {/* Sun shows while dark: clicking takes you to light. */}
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="theme-icon theme-icon-sun">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>

        {/* Moon shows while light: clicking takes you to dark. */}
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="theme-icon theme-icon-moon">
          <path
            d="M20.5 14.3A8.8 8.8 0 0 1 9.7 3.5a8.8 8.8 0 1 0 10.8 10.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
