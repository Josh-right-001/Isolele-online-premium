"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { Crown, Sparkles } from "lucide-react"

export function FounderPreview() {
  const { currentTheme } = useTheme()
  const { currentLanguage } = useLanguage()

  const content = {
    en: {
      title: "H.R.M KING KUFULULA",
      subtitle: "The Visionary Behind Isolele",
      description: "A cultural architect and storyteller, King Kufulula founded Isolele to restore the soul of African storytelling. His vision is to create a mythological empire where African superheroes rise from authentic history, not borrowed myths.",
      quote: "We don't just create characters. We create a lineage. We create a legacy.",
      cta: "Meet the Founder"
    },
    fr: {
      title: "H.R.M ROI KUFULULA",
      subtitle: "Le Visionnaire Derriere Isolele",
      description: "Architecte culturel et conteur, le Roi Kufulula a fonde Isolele pour restaurer l'ame du storytelling africain. Sa vision est de creer un empire mythologique ou les super-heros africains emergent de l'histoire authentique, pas de mythes empruntes.",
      quote: "Nous ne creons pas seulement des personnages. Nous creons une lignee. Nous creons un heritage.",
      cta: "Rencontrer le Fondateur"
    }
  }

  const c = content[currentLanguage.code as keyof typeof content] || content.en

  return (
    <section 
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Crown 
            className="h-[600px] w-[600px]"
            style={{ color: currentTheme.colors.accentPrimary }}
          />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Crown Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8"
            style={{ 
              backgroundColor: `${currentTheme.colors.accentPrimary}20`,
              border: `2px solid ${currentTheme.colors.accentPrimary}`
            }}
            animate={{ 
              boxShadow: [
                `0 0 20px ${currentTheme.colors.accentPrimary}40`,
                `0 0 40px ${currentTheme.colors.accentPrimary}60`,
                `0 0 20px ${currentTheme.colors.accentPrimary}40`
              ]
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Crown 
              className="h-10 w-10"
              style={{ color: currentTheme.colors.accentPrimary }}
            />
          </motion.div>

          <h2 
            className="text-4xl sm:text-5xl font-black mb-2"
            style={{ color: currentTheme.colors.accentPrimary }}
          >
            {c.title}
          </h2>
          <p 
            className="text-xl mb-8"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            {c.subtitle}
          </p>

          <p 
            className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            {c.description}
          </p>

          <motion.blockquote
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative py-8 px-12 rounded-2xl mb-10"
            style={{ 
              backgroundColor: currentTheme.colors.backgroundSecondary,
              border: `1px solid ${currentTheme.colors.accentPrimary}30`
            }}
          >
            <Sparkles 
              className="absolute top-4 left-4 h-6 w-6"
              style={{ color: currentTheme.colors.accentPrimary }}
            />
            <Sparkles 
              className="absolute bottom-4 right-4 h-6 w-6"
              style={{ color: currentTheme.colors.accentPrimary }}
            />
            <p 
              className="text-xl sm:text-2xl font-semibold italic"
              style={{ color: currentTheme.colors.textPrimary }}
            >
              "{c.quote}"
            </p>
          </motion.blockquote>

          <Link href="/founder">
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-bold"
              style={{
                backgroundColor: currentTheme.colors.accentPrimary,
                color: currentTheme.colors.background,
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 30px ${currentTheme.colors.accentPrimary}60`
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Crown className="h-5 w-5" />
              {c.cta}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
