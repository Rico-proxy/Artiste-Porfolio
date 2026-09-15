import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-foreground/5 text-secondary transition-colors hover:bg-foreground/10 hover:text-secondary"
    >
      <Sun
        className={[
          "absolute size-5 transition-all duration-500 ease-out",
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100",
        ].join(" ")}
        strokeWidth={1.8}
      />
      <Moon
        className={[
          "absolute size-5 transition-all duration-500 ease-out",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0",
        ].join(" ")}
        strokeWidth={1.8}
      />
    </button>
  )
}
