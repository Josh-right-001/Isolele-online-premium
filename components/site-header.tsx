"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronDown, 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  Palette,
  Globe
} from "lucide-react"
import { useTheme, themes } from "@/lib/theme-context"
import { useLanguage, languages } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

const characterLinks = [
  { name: "ZAIRE - PRINCE DU KONGO", href: "/characters/zaire" },
  { name: "KIMOYA - LA KANDAKE RENAISSANTE", href: "/characters/kimoya" },
  { name: "ZATTAR - L'ARCHITECTE DE SANG", href: "/characters/zattar" },
  { name: "LES JUMEAUX NJOKO", href: "/characters/njoko-twins" },
  { name: "REINE IMVULA", href: "/characters/imvula" },
]

const supporterLinks = [
  { key: "nav_become_supporter", href: "/supporters/become" },
  { key: "nav_partners", href: "/supporters/partners" },
  { key: "nav_restaurant", href: "/supporters/restaurant" },
]

export function SiteHeader() {
  const { currentTheme, setTheme, isTransitioning } = useTheme()
  const { currentLanguage, setLanguage, t } = useLanguage()
  const { totalItems, setIsCartOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const cartCount = totalItems; // Declare cartCount variable

  const navItems = [
    { key: "nav_home", href: "/" },
    { key: "nav_about", href: "/about" },
    { key: "nav_founder", href: "/founder" },
    { key: "nav_news", href: "/news" },
    { key: "nav_characters", href: "/characters", hasDropdown: true, dropdownItems: characterLinks },
    { key: "nav_shop", href: "/shop" },
    { key: "nav_supporters", href: "/supporters", hasDropdown: true, dropdownKey: "supporters" },
  ]

  return (
    <>
      {/* Theme transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ backgroundColor: currentTheme.colors.accentPrimary }}
          />
        )}
      </AnimatePresence>

      <header 
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{ 
          backgroundColor: `${currentTheme.colors.background}ee`,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${currentTheme.colors.accentPrimary}20`
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Image
                  src="/images/isolele-logo.png"
                  alt="ISOLELE"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <motion.div
                  className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    boxShadow: `0 0 20px ${currentTheme.colors.accentPrimary}60`
                  }}
                />
              </motion.div>
              <div className="hidden sm:block">
                <h1 
                  className="text-2xl font-bold tracking-wider"
                  style={{ color: currentTheme.colors.textPrimary }}
                >
                  ISOLELE
                </h1>
                <p 
                  className="text-xs tracking-widest font-mono"
                  style={{ color: currentTheme.colors.textSecondary }}
                >
                  {t("universe_subtitle")}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div 
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="group relative px-4 py-2 text-sm font-medium tracking-wider transition-colors duration-200 flex items-center gap-1"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    <span className="group-hover:text-[var(--isolele-accent)] transition-colors">
                      {t(item.key)}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDown 
                        className="h-4 w-4 transition-transform duration-200"
                        style={{ 
                          transform: activeDropdown === item.key ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                      />
                    )}
                    <motion.span
                      className="absolute bottom-0 left-4 right-4 h-0.5"
                      style={{ backgroundColor: currentTheme.colors.accentPrimary }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>

                  {/* Dropdown for Characters */}
                  {item.key === "nav_characters" && activeDropdown === "nav_characters" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-72 rounded-lg overflow-hidden"
                      style={{ 
                        backgroundColor: `${currentTheme.colors.backgroundSecondary}f0`,
                        backdropFilter: "blur(20px)",
                        border: `1px solid ${currentTheme.colors.accentPrimary}30`
                      }}
                    >
                      <Link
                        href="/characters"
                        className="block px-4 py-3 text-sm font-medium border-b transition-colors"
                        style={{ 
                          color: currentTheme.colors.accentPrimary,
                          borderColor: `${currentTheme.colors.accentPrimary}20`
                        }}
                      >
                        {t("nav_all_characters")}
                      </Link>
                      {characterLinks.map((char) => (
                        <Link
                          key={char.href}
                          href={char.href}
                          className="block px-4 py-3 text-sm transition-colors hover:bg-white/5"
                          style={{ color: currentTheme.colors.textSecondary }}
                        >
                          {char.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}

                  {/* Dropdown for Supporters */}
                  {item.key === "nav_supporters" && activeDropdown === "nav_supporters" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 rounded-lg overflow-hidden"
                      style={{ 
                        backgroundColor: `${currentTheme.colors.backgroundSecondary}f0`,
                        backdropFilter: "blur(20px)",
                        border: `1px solid ${currentTheme.colors.accentPrimary}30`
                      }}
                    >
                      {supporterLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-3 text-sm transition-colors hover:bg-white/5"
                          style={{ color: currentTheme.colors.textSecondary }}
                        >
                          {t(link.key)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <motion.button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: currentTheme.colors.textSecondary }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="h-5 w-5" />
                </motion.button>
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="absolute right-0 top-full mt-2 overflow-hidden"
                    >
                      <input
                        type="text"
                        placeholder={t("search_placeholder")}
                        className="w-full px-4 py-2 rounded-lg text-sm outline-none"
                        style={{ 
                          backgroundColor: currentTheme.colors.backgroundSecondary,
                          color: currentTheme.colors.textPrimary,
                          border: `1px solid ${currentTheme.colors.accentPrimary}30`
                        }}
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Language Selector */}
              <div className="relative hidden sm:block">
                <motion.button
                  onClick={() => {
                    setLanguageOpen(!languageOpen)
                    setThemeOpen(false)
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
                  style={{ 
                    color: currentTheme.colors.textSecondary,
                    backgroundColor: languageOpen ? `${currentTheme.colors.backgroundSecondary}80` : "transparent"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className="h-4 w-4" />
                  <span className="uppercase">{currentLanguage.code}</span>
                </motion.button>
                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-lg overflow-hidden"
                      style={{ 
                        backgroundColor: `${currentTheme.colors.backgroundSecondary}f0`,
                        backdropFilter: "blur(20px)",
                        border: `1px solid ${currentTheme.colors.accentPrimary}30`
                      }}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code)
                            setLanguageOpen(false)
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left",
                            currentLanguage.code === lang.code 
                              ? "bg-white/10" 
                              : "hover:bg-white/5"
                          )}
                          style={{ color: currentTheme.colors.textSecondary }}
                        >
                          <span className="text-lg">{lang.flag === "US" ? "🇺🇸" : lang.flag === "FR" ? "🇫🇷" : lang.flag === "PT" ? "🇵🇹" : lang.flag === "ZA" ? "🇿🇦" : lang.flag === "ES" ? "🇪🇸" : lang.flag === "TZ" ? "🇹🇿" : "🇨🇩"}</span>
                          <span>{lang.nativeName}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Selector */}
              <div className="relative hidden sm:block">
                <motion.button
                  onClick={() => {
                    setThemeOpen(!themeOpen)
                    setLanguageOpen(false)
                  }}
                  className="p-2 rounded-full transition-colors"
                  style={{ 
                    color: currentTheme.colors.textSecondary,
                    backgroundColor: themeOpen ? `${currentTheme.colors.backgroundSecondary}80` : "transparent"
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Palette className="h-5 w-5" />
                </motion.button>
                <AnimatePresence>
                  {themeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-lg overflow-hidden p-2"
                      style={{ 
                        backgroundColor: `${currentTheme.colors.backgroundSecondary}f0`,
                        backdropFilter: "blur(20px)",
                        border: `1px solid ${currentTheme.colors.accentPrimary}30`
                      }}
                    >
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => {
                            setTheme(theme.id)
                            setThemeOpen(false)
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                            currentTheme.id === theme.id 
                              ? "bg-white/10" 
                              : "hover:bg-white/5"
                          )}
                          style={{ color: currentTheme.colors.textSecondary }}
                        >
                          <div className="flex gap-1">
                            <div 
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: theme.colors.accentPrimary }}
                            />
                            <div 
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: theme.colors.accentSecondary }}
                            />
                          </div>
                          <span>{theme.nameFr}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full transition-colors"
                style={{ color: currentTheme.colors.textSecondary }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center font-bold"
                    style={{ 
                      backgroundColor: currentTheme.colors.accentSecondary,
                      color: "#FFFFFF"
                    }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full transition-colors"
                style={{ color: currentTheme.colors.textSecondary }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-4/5 max-w-sm lg:hidden overflow-y-auto"
              style={{ 
                backgroundColor: currentTheme.colors.background,
                borderLeft: `1px solid ${currentTheme.colors.accentPrimary}30`
              }}
            >
              <div className="p-6 pt-24">
                {navItems.map((item) => (
                  <div key={item.key} className="border-b" style={{ borderColor: `${currentTheme.colors.accentPrimary}20` }}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-4 text-lg font-medium"
                      style={{ color: currentTheme.colors.textPrimary }}
                    >
                      {t(item.key)}
                    </Link>
                  </div>
                ))}
                
                {/* Mobile Language & Theme */}
                <div className="mt-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={cn(
                          "px-3 py-2 rounded-lg text-sm",
                          currentLanguage.code === lang.code && "ring-2"
                        )}
                        style={{ 
                          backgroundColor: currentTheme.colors.backgroundSecondary,
                          color: currentTheme.colors.textSecondary,
                          ringColor: currentTheme.colors.accentPrimary
                        }}
                      >
                        {lang.code.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setTheme(theme.id)}
                        className={cn(
                          "p-2 rounded-lg",
                          currentTheme.id === theme.id && "ring-2"
                        )}
                        style={{ 
                          backgroundColor: theme.colors.background,
                          ringColor: theme.colors.accentPrimary
                        }}
                      >
                        <div className="flex gap-1">
                          <div 
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: theme.colors.accentPrimary }}
                          />
                          <div 
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: theme.colors.accentSecondary }}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
