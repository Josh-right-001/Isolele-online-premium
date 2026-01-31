"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language as LangCode, type TranslationKeys, languageNames, languageFlags } from "./translations"

export interface Language {
  code: LangCode
  name: string
  nativeName: string
  flag: string
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: languageFlags.en },
  { code: "fr", name: "French", nativeName: "Francais", flag: languageFlags.fr },
  { code: "pt", name: "Portuguese", nativeName: "Portugues", flag: languageFlags.pt },
  { code: "es", name: "Spanish", nativeName: "Espanol", flag: languageFlags.es },
  { code: "zu", name: "Zulu", nativeName: "Zulu", flag: languageFlags.zu },
  { code: "xh", name: "Xhosa", nativeName: "Xhosa", flag: languageFlags.xh },
  { code: "sw", name: "Swahili", nativeName: "Swahili", flag: languageFlags.sw },
  { code: "ln", name: "Lingala", nativeName: "Lingala", flag: languageFlags.ln },
]

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (code: string) => void
  t: (key: keyof TranslationKeys | string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

  useEffect(() => {
    const savedLang = localStorage.getItem("isolele-language")
    if (savedLang) {
      const lang = languages.find((l) => l.code === savedLang)
      if (lang) {
        setCurrentLanguage(lang)
      }
    }
  }, [])

  const setLanguage = (code: string) => {
    const lang = languages.find((l) => l.code === code)
    if (lang) {
      setCurrentLanguage(lang)
      localStorage.setItem("isolele-language", code)
    }
  }

  const t = (key: keyof TranslationKeys | string): string => {
    const langCode = currentLanguage.code as LangCode
    const langTranslations = translations[langCode] || translations.en
    const translationKey = key as keyof TranslationKeys
    return langTranslations[translationKey] || translations.en[translationKey] || String(key)
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
