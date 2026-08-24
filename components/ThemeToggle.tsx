"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";

const nextTheme: Record<Theme, Theme> = {
  light: "dark",
  dark: "system",
  system: "light",
};

const iconForTheme = { light: Sun, dark: Moon, system: Monitor };

export function ThemeToggle() {
  const storedTheme = useSyncExternalStore<Theme>(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      return () => window.removeEventListener("storage", onStoreChange);
    },
    () => {
      try {
        const stored = window.localStorage.getItem("theme");
        return stored === "light" || stored === "dark" ? stored : "system";
      } catch {
        return "system";
      }
    },
    () => "system",
  );
  const [themeOverride, setThemeOverride] = useState<Theme | null>(null);
  const theme = themeOverride ?? storedTheme;

  const Icon = iconForTheme[theme];

  function cycleTheme() {
    const updated = nextTheme[theme];
    setThemeOverride(updated);
    if (updated === "system") {
      window.localStorage.removeItem("theme");
      document.documentElement.dataset.theme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches
        ? "dark"
        : "light";
    } else {
      window.localStorage.setItem("theme", updated);
      document.documentElement.dataset.theme = updated;
    }
  }

  return (
    <button
      type="button"
      className="text-muted hover:bg-surface hover:text-text rounded-[var(--radius-control)] p-2 transition-colors"
      aria-label={`Theme: ${theme}. Switch to ${nextTheme[theme]}.`}
      title={`Theme: ${theme}`}
      onClick={cycleTheme}
    >
      <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
    </button>
  );
}
