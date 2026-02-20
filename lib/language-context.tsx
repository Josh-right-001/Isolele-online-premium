"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "US" },
  { code: "fr", name: "French", nativeName: "Francais", flag: "FR" },
  { code: "pt", name: "Portuguese", nativeName: "Portugues", flag: "PT" },
  { code: "zu", name: "Zulu", nativeName: "Zulu", flag: "ZA" },
  { code: "es", name: "Spanish", nativeName: "Espanol", flag: "ES" },
  { code: "xh", name: "Xhosa", nativeName: "Xhosa", flag: "ZA" },
  { code: "sw", name: "Swahili", nativeName: "Swahili", flag: "TZ" },
  { code: "ln", name: "Lingala", nativeName: "Lingala", flag: "CD" },
]

// Translations object
export const translations: Record<string, Record<string, string>> = {
  en: {
    home: "HOME",
    about: "ABOUT",
    founder: "FOUNDER",
    news: "COMICS NEWS",
    characters: "CHARACTERS",
    shop: "SHOP",
    supporters: "SUPPORTERS",
    allCharacters: "ALL CHARACTERS",
    becomeSupporter: "BECOME A SUPPORTER",
    partners: "PARTNERS",
    restaurantPartner: "RESTAURANT PARTNER",
    theChosenOnes: "The Chosen Ones",
    buyNow: "BUY NOW",
    discoverStory: "DISCOVER THE STORY",
    exploreUniverse: "EXPLORE THE UNIVERSE",
    subscribeNewsletter: "SUBSCRIBE TO NEWSLETTER",
    joinLegend: "JOIN THE LEGEND",
    readMore: "READ MORE",
    latestNews: "LATEST NEWS",
    theChosen: "THE CHOSEN",
    universeIsolele: "THE ISOLELE UNIVERSE",
    destiny: "DESTINY",
    heritage: "HERITAGE",
    resurrection: "RESURRECTION",
    explore: "EXPLORE",
    resources: "RESOURCES",
    stayInformed: "STAY INFORMED",
    yourEmail: "Your email address",
    subscribe: "SUBSCRIBE",
    copyright: "All rights reserved. A We Love Congo initiative.",
    press: "Press",
    careers: "Careers",
    contactUs: "Contact Us",
    faq: "FAQ",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    siteMap: "Site Map",
    accessibility: "Accessibility",
    cookieSettings: "Cookie Settings",
    searchPlaceholder: "Search...",
    cart: "Cart",
    viewProfile: "VIEW FULL PROFILE",
    discover: "DISCOVER",
  },
  fr: {
    home: "ACCUEIL",
    about: "A PROPOS",
    founder: "FONDATEUR",
    news: "ACTUALITES BD",
    characters: "PERSONNAGES",
    shop: "BOUTIQUE",
    supporters: "SUPPORTEURS",
    allCharacters: "TOUS LES PERSONNAGES",
    becomeSupporter: "DEVENIR SUPPORTEUR",
    partners: "PARTENAIRES",
    restaurantPartner: "RESTAURANT PARTENAIRE",
    theChosenOnes: "Les Elus",
    buyNow: "ACHETER MAINTENANT",
    discoverStory: "DECOUVRIR L'HISTOIRE",
    exploreUniverse: "EXPLORER L'UNIVERS",
    subscribeNewsletter: "S'ABONNER A LA NEWSLETTER",
    joinLegend: "REJOIGNEZ LA LEGENDE",
    readMore: "LIRE LA SUITE",
    latestNews: "DERNIERES ACTUALITES",
    theChosen: "LES ELUS",
    universeIsolele: "L'UNIVERS ISOLELE",
    destiny: "DESTINEE",
    heritage: "HERITAGE",
    resurrection: "RESURRECTION",
    explore: "EXPLORER",
    resources: "RESSOURCES",
    stayInformed: "RESTEZ INFORME",
    yourEmail: "Votre adresse email",
    subscribe: "S'INSCRIRE",
    copyright: "Tous droits reserves. Une initiative We Love Congo.",
    press: "Presse",
    careers: "Carrieres",
    contactUs: "Nous contacter",
    faq: "FAQ",
    terms: "Conditions d'utilisation",
    privacy: "Politique de confidentialite",
    siteMap: "Plan du site",
    accessibility: "Accessibilite",
    cookieSettings: "Parametres des cookies",
    searchPlaceholder: "Rechercher...",
    cart: "Panier",
    viewProfile: "VOIR LE PROFIL COMPLET",
    discover: "DECOUVRIR",
  },
}

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (code: string) => void
  t: (key: string) => string
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

  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage.code] || translations.en
    return langTranslations[key] || translations.en[key] || key
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
