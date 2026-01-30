"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export function HeroSection() {
  const { currentTheme } = useTheme()
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-zaire.jpg')`,
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.background}e6 0%, ${currentTheme.colors.backgroundSecondary}cc 50%, ${currentTheme.colors.background}e6 100%)`
        }}
      />
      
      {/* Animated Kongo patterns overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-64 w-64 border rotate-45"
            style={{
              borderColor: currentTheme.colors.accentPrimary,
              left: `${(i * 20) - 10}%`,
              top: `${(i % 3) * 30}%`,
            }}
            animate={{
              rotate: [45, 90, 45],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Lightning effects */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-96"
        style={{ backgroundColor: currentTheme.colors.accentPrimary }}
        animate={{
          opacity: [0, 1, 0],
          scaleY: [0, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 5,
        }}
      />
      <motion.div
        className="absolute top-20 right-1/3 w-px h-64"
        style={{ backgroundColor: currentTheme.colors.accentSecondary }}
        animate={{
          opacity: [0, 1, 0],
          scaleY: [0, 1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 7,
          delay: 2,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-wider mb-4"
            style={{ 
              color: currentTheme.colors.textPrimary,
              textShadow: `0 0 40px ${currentTheme.colors.accentPrimary}40`
            }}
          >
            ZAIRE
          </h1>
          <p 
            className="text-2xl sm:text-3xl font-bold tracking-widest mb-2"
            style={{ color: currentTheme.colors.accentPrimary }}
          >
            PRINCE DU KONGO
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl font-semibold tracking-wide mb-6"
          style={{ color: currentTheme.colors.textSecondary }}
        >
          Le Collier de la Destinee
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: currentTheme.colors.textSecondary }}
        >
          Une aventure palpitante et edifiante qui fait echo a l'esprit du Roi Lion et de Black Panther, 
          tout en offrant aux jeunes lecteurs une celebration de l'heritage, du courage et de la decouverte de soi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/shop">
            <motion.button
              className="px-8 py-4 rounded-lg text-lg font-bold tracking-wider transition-all"
              style={{
                backgroundColor: currentTheme.colors.accentPrimary,
                color: currentTheme.colors.background,
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 30px ${currentTheme.colors.accentPrimary}80`
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("buyNow")}
            </motion.button>
          </Link>
          <Link href="/about">
            <motion.button
              className="px-8 py-4 rounded-lg text-lg font-bold tracking-wider transition-all border-2"
              style={{
                borderColor: currentTheme.colors.accentPrimary,
                color: currentTheme.colors.accentPrimary,
                backgroundColor: "transparent",
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: `${currentTheme.colors.accentPrimary}20`
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("discoverStory")}
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div 
          className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
          style={{ borderColor: currentTheme.colors.textSecondary }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full"
            style={{ backgroundColor: currentTheme.colors.accentPrimary }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}
