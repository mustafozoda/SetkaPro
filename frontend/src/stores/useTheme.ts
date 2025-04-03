import { create } from "zustand";

type ThemeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useTheme = create<ThemeStore>((set, get) => ({
  theme: "light",
  toggleTheme: () => {
    const currentTheme = get().theme; // Access current theme
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    set({ theme: newTheme });
  },
}));
