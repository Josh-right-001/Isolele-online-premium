"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface ThemeColors {
  background: string
  backgroundSecondary: string
  accentPrimary: string
  accentSecondary: string
  textPrimary: string
  textSecondary: string
}

export interface Theme {
  id: string
  name: string
  nameFr: string
  colors: ThemeColors
}

export const themes: Theme[] = [
  {
    id: "lumiere-royale",
    name: "Royal Light",
    nameFr: "Lumiere Royale",
    colors: {
      background: "#FFFFFF",
      backgroundSecondary: "#F8F6F0",
      accentPrimary: "#B8860B",
      accentSecondary: "#8B6914",
      textPrimary: "#1A1A1A",
      textSecondary: "#4A4A4A",
    },
  },
  {
    id: "royaume-ancestral",
    name: "Ancestral Kingdom",
    nameFr: "Royaume Ancestral",
    colors: {
      background: "#0A0A0A",
      backgroundSecondary: "#1A120B",
      accentPrimary: "#D4AF37",
      accentSecondary: "#B3541E",
      textPrimary: "#F5F5DC",
      textSecondary: "#D3D3C7",
    },
  },
  {
    id: "savane-electrique",
    name: "Electric Savanna",
    nameFr: "Savane Electrique",
    colors: {
      background: "#0F1A2B",
      backgroundSecondary: "#2D1B69",
      accentPrimary: "#00F5FF",
      accentSecondary: "#FF00FF",
      textPrimary: "#FFFFFF",
      textSecondary: "#ADD8E6",
    },
  },
  {
    id: "foret-mystique",
    name: "Mystic Forest",
    nameFr: "Foret Mystique",
    colors: {
      background: "#0B2818",
      backgroundSecondary: "#1A472A",
      accentPrimary: "#C0C0C0",
      accentSecondary: "#40E0D0",
      textPrimary: "#98FF98",
      textSecondary: "#C1E1C1",
    },
  },
  {
    id: "desert-enchante",
    name: "Enchanted Desert",
    nameFr: "Desert Enchante",
    colors: {
      background: "#8B4513",
      backgroundSecondary: "#B22222",
      accentPrimary: "#FFD700",
      accentSecondary: "#FF8C00",
      textPrimary: "#F4D03F",
      textSecondary: "#FAEBD7",
    },
  },
]

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (themeId: string) => void
  isTransitioning: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0])
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("isolele-theme")
    if (savedTheme) {
      const theme = themes.find((t) => t.id === savedTheme)
      if (theme) {
        setCurrentTheme(theme)
        applyTheme(theme)
      }
    } else {
      applyTheme(themes[0])
    }
  }, [])

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement
    root.style.setProperty("--isolele-bg", theme.colors.background)
    root.style.setProperty("--isolele-bg-secondary", theme.colors.backgroundSecondary)
    root.style.setProperty("--isolele-accent", theme.colors.accentPrimary)
    root.style.setProperty("--isolele-accent-secondary", theme.colors.accentSecondary)
    root.style.setProperty("--isolele-text", theme.colors.textPrimary)
    root.style.setProperty("--isolele-text-secondary", theme.colors.textSecondary)
  }

  const setTheme = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId)
    if (theme && theme.id !== currentTheme.id) {
      setIsTransitioning(true)
      
      setTimeout(() => {
        setCurrentTheme(theme)
        applyTheme(theme)
        localStorage.setItem("isolele-theme", themeId)
        
        setTimeout(() => {
          setIsTransitioning(false)
        }, 800)
      }, 100)
    }
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
