import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

const STORAGE_KEY = "vozes-theme"

type ThemeMode = "light" | "dark"

function readStoredTheme(): ThemeMode | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === "light" || value === "dark" ? value : null
  } catch {
    return null
  }
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.style.colorScheme = theme
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  )

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const followSystem = () => {
      if (readStoredTheme()) return
      const next: ThemeMode = media.matches ? "dark" : "light"
      applyTheme(next)
      setTheme(next)
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      const next: ThemeMode =
        event.newValue === "dark" || event.newValue === "light"
          ? event.newValue
          : media.matches
            ? "dark"
            : "light"
      applyTheme(next)
      setTheme(next)
    }

    media.addEventListener("change", followSystem)
    window.addEventListener("storage", onStorage)
    return () => {
      media.removeEventListener("change", followSystem)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  function toggle() {
    const next: ThemeMode = theme === "dark" ? "light" : "dark"
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* preference stays for this visit */
    }
    applyTheme(next)
    setTheme(next)
  }

  const dark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      className="grid size-10 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
    >
      {dark ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
    </button>
  )
}
