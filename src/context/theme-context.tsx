"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

type Theme = "dark" | "light";
type ThemeContextValue = { theme: Theme; toggle: () => void; setTheme: (theme: Theme) => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);
const themeChangeEvent = "rw-theme-change";

const loadTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem("rw_theme") as Theme | null;
    return saved === "light" || saved === "dark" ? saved : "dark";
  } catch {
    return "dark";
  }
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
};

const subscribeToTheme = (onStoreChange: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key === "rw_theme") onStoreChange();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(themeChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(themeChangeEvent, onStoreChange);
  };
};

const getServerTheme = (): Theme => "dark";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, loadTheme, getServerTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    localStorage.setItem("rw_theme", nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  }, []);

  const toggle = useCallback(() => {
    setTheme(loadTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext) ?? { theme: "dark" as Theme, toggle: () => {}, setTheme: () => {} };
}
