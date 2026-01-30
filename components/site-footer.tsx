"use client"

import React from "react"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { useState } from "react"

export function SiteFooter() {
  const { currentTheme } = useTheme()
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here we would submit to Supabase
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const quickLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "founder", href: "/founder" },
    { key: "news", href: "/news" },
    { key: "characters", href: "/characters" },
    { key: "shop", href: "/shop" },
    { key: "supporters", href: "/supporters" },
  ]

  const resourceLinks = [
    { key: "press", href: "/press" },
    { key: "careers", href: "/careers" },
    { key: "contactUs", href: "/contact" },
    { key: "faq", href: "/faq" },
    { key: "terms", href: "/terms" },
    { key: "privacy", href: "/privacy" },
  ]

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/isolele", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/isolele", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/isolele", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/isolele", label: "YouTube" },
  ]

  return (
    <footer 
      className="relative overflow-hidden"
      style={{ backgroundColor: currentTheme.colors.backgroundSecondary }}
    >
      {/* Decorative top border */}
      <div 
        className="h-1"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${currentTheme.colors.accentPrimary}, transparent)`
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Identity */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/isolele-logo.jpg"
                alt="ISOLELE"
                width={40}
                height={40}
                className="rounded"
              />
              <span 
                className="text-xl font-bold tracking-wider"
                style={{ color: currentTheme.colors.textPrimary }}
              >
                ISOLELE
              </span>
            </Link>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Isolele est un univers mythologique visionnaire ne pour restaurer l'ame du storytelling africain - un empire mythologique ou les Superheros sont choisis par le destin, les royaumes jamais oublies, et le pouvoir ancestral est vivant dans chaque page, chaque prophetie, chaque bataille.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-colors"
                  style={{ 
                    backgroundColor: `${currentTheme.colors.accentPrimary}20`,
                    color: currentTheme.colors.textSecondary
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: currentTheme.colors.accentPrimary,
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 
              className="text-lg font-bold tracking-wider mb-6"
              style={{ color: currentTheme.colors.accentPrimary }}
            >
              {t("explore")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:translate-x-1 inline-block"
                    style={{ color: currentTheme.colors.textSecondary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = currentTheme.colors.accentPrimary
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = currentTheme.colors.textSecondary
                    }}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 
              className="text-lg font-bold tracking-wider mb-6"
              style={{ color: currentTheme.colors.accentPrimary }}
            >
              {t("resources")}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: currentTheme.colors.textSecondary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = currentTheme.colors.accentPrimary
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = currentTheme.colors.textSecondary
                    }}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 
              className="text-lg font-bold tracking-wider mb-6"
              style={{ color: currentTheme.colors.accentPrimary }}
            >
              {t("stayInformed")}
            </h3>
            <p 
              className="text-sm mb-4"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Inscrivez-vous a notre newsletter pour recevoir des mises a jour exclusives sur les nouvelles sorties, les evenements et les offres speciales.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("yourEmail")}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                style={{ 
                  backgroundColor: currentTheme.colors.background,
                  color: currentTheme.colors.textPrimary,
                  border: `1px solid ${currentTheme.colors.accentPrimary}30`
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = currentTheme.colors.accentPrimary
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = `${currentTheme.colors.accentPrimary}30`
                }}
              />
              <motion.button
                type="submit"
                className="w-full px-4 py-3 rounded-lg text-sm font-bold tracking-wider transition-all"
                style={{ 
                  backgroundColor: currentTheme.colors.accentPrimary,
                  color: currentTheme.colors.background
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {subscribed ? "MERCI!" : t("subscribe")}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div 
          className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: `${currentTheme.colors.accentPrimary}20` }}
        >
          <p 
            className="text-sm text-center md:text-left"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            &copy; 2025 Isolele. {t("copyright")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/sitemap"
              className="transition-colors"
              style={{ color: currentTheme.colors.textSecondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentTheme.colors.accentPrimary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = currentTheme.colors.textSecondary
              }}
            >
              {t("siteMap")}
            </Link>
            <span style={{ color: currentTheme.colors.textSecondary }}>|</span>
            <Link
              href="/accessibility"
              className="transition-colors"
              style={{ color: currentTheme.colors.textSecondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentTheme.colors.accentPrimary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = currentTheme.colors.textSecondary
              }}
            >
              {t("accessibility")}
            </Link>
            <span style={{ color: currentTheme.colors.textSecondary }}>|</span>
            <button
              className="transition-colors"
              style={{ color: currentTheme.colors.textSecondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentTheme.colors.accentPrimary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = currentTheme.colors.textSecondary
              }}
            >
              {t("cookieSettings")}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div 
          className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${currentTheme.colors.accentPrimary} 0%, transparent 70%)`
          }}
        />
      </div>
    </footer>
  )
}
