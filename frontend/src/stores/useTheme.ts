import { create } from "zustand";

type ThemeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const applyThemeClass = (theme: "light" | "dark") => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      applyThemeClass(stored);
      return stored;
    }
    // Default to system preference if no stored theme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = prefersDark ? "dark" : "light";
    applyThemeClass(initial);
    return initial;
  }
  return "light";
};

export const useTheme = create<ThemeStore>((set, get) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    const current = get().theme;
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyThemeClass(next);
    set({ theme: next });
  },
}));
