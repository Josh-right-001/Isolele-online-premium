"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { Sparkles, Crown, Flame } from "lucide-react"
import { useInView } from "framer-motion"
import { useRef } from "react"

const pillars = [
  {
    key: "destiny",
    icon: Sparkles,
    title: "La Destinee n'est pas un Choix",
    description: "C'est un Appel. Chaque personnage est invoque par les lignees sanguines, les esprits anciens et les histoires inachevees de leurs ancetres.",
  },
  {
    key: "heritage",
    icon: Crown,
    title: "Les Lignees Royales Portent un Pouvoir Ancien",
    description: "Le sang royal transporte la memoire et la puissance des royaumes oublies, attendant d'etre reveillees par les elus.",
  },
  {
    key: "resurrection",
    icon: Flame,
    title: "Les Esprits Ancestraux ne Meurent Jamais",
    description: "L'Afrique n'a jamais ete impuissante. La prophetie est revenue, et avec elle, la resurrection des mythes enterres.",
  },
]

export function UniverseSection() {
  const { currentTheme } = useTheme()
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: currentTheme.colors.backgroundSecondary }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${currentTheme.colors.accentPrimary} 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, ${currentTheme.colors.accentSecondary} 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black tracking-wider mb-4"
            style={{ color: currentTheme.colors.textPrimary }}
          >
            {t("universeIsolele")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl font-medium tracking-wide mb-6"
            style={{ color: currentTheme.colors.accentPrimary }}
          >
            {t("theChosenOnes")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Isolele est un univers visionnaire ne pour restaurer l'ame du storytelling africain - 
            un empire mythologique ou les Superheros sont choisis par le destin, les royaumes jamais 
            oublies, et le pouvoir ancestral est vivant dans chaque page, chaque prophetie, chaque bataille.
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.key}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              className="group relative p-8 rounded-2xl transition-all duration-500"
              style={{
                backgroundColor: `${currentTheme.colors.background}80`,
                border: `1px solid ${currentTheme.colors.accentPrimary}30`,
              }}
            >
              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `inset 0 0 30px ${currentTheme.colors.accentPrimary}20, 0 0 30px ${currentTheme.colors.accentPrimary}20`
                }}
              />
              
              {/* Icon */}
              <div className="relative mb-6">
                <motion.div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${currentTheme.colors.accentPrimary}20` }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <pillar.icon 
                    className="w-8 h-8"
                    style={{ color: currentTheme.colors.accentPrimary }}
                  />
                </motion.div>
                {/* Animated particles around icon */}
                {index === 0 && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Sparkles 
                      className="w-4 h-4"
                      style={{ color: currentTheme.colors.accentPrimary }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <h3 
                className="text-xl font-bold tracking-wide mb-4 relative"
                style={{ color: currentTheme.colors.textPrimary }}
              >
                {pillar.title}
              </h3>
              <p 
                className="text-sm leading-relaxed relative"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                {pillar.description}
              </p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-8 right-8 h-0.5"
                style={{ backgroundColor: currentTheme.colors.accentPrimary }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
