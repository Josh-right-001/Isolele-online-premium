"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

export function CTASection() {
  const { currentTheme } = useTheme()
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      ref={ref}
      className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Diagonal lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${i * 5}%`,
              background: `linear-gradient(90deg, transparent, ${currentTheme.colors.accentPrimary}10, transparent)`,
              transform: `rotate(${15}deg) translateX(${i % 2 === 0 ? '-10%' : '10%'})`,
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 20,
              delay: i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Glowing orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{ 
            backgroundColor: currentTheme.colors.accentPrimary,
            opacity: 0.1,
            top: "20%",
            left: "10%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl"
          style={{ 
            backgroundColor: currentTheme.colors.accentSecondary,
            opacity: 0.1,
            bottom: "10%",
            right: "15%",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-wider mb-6"
          style={{ color: currentTheme.colors.textPrimary }}
        >
          {t("joinLegend")}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: currentTheme.colors.textSecondary }}
        >
          Faites partie d'un univers de bande dessinee revolutionnaire qui celebre 
          l'heritage africain tout en inspirant la prochaine generation de super-heros.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/about">
            <motion.button
              className="relative px-8 py-4 rounded-lg text-lg font-bold tracking-wider overflow-hidden"
              style={{
                backgroundColor: currentTheme.colors.accentPrimary,
                color: currentTheme.colors.background,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulsating glow */}
              <motion.span
                className="absolute inset-0"
                style={{
                  boxShadow: `0 0 30px ${currentTheme.colors.accentPrimary}80`,
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10">{t("exploreUniverse")}</span>
            </motion.button>
          </Link>
          
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
            {t("subscribeNewsletter")}
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex justify-center gap-4"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentTheme.colors.accentPrimary }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
