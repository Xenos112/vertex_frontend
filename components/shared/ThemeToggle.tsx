"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <button>
      {theme === "dark" ? (
        <Sun className="h-6 w-6" onClick={() => setTheme("system")} />
      ) : theme === "system" ? (
        <Monitor className="h-6 w-6" onClick={() => setTheme("light")} />
      ) : (
        <Moon className="h-6 w-6" onClick={() => setTheme("dark")} />
      )}
    </button>
  );
}
