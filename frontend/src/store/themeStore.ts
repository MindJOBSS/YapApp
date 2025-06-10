import { create } from "zustand";

export const themeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme : string) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
