"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { Globe, BookOpen, Film, Gamepad2, Palette, Users } from "lucide-react"

export function CulturalImpact() {
  const { currentTheme } = useTheme()
  const { currentLanguage } = useLanguage()

  const content = {
    en: {
      title: "BEYOND ENTERTAINMENT",
      subtitle: "A Global Movement",
      description: "Isolele isn't just a brand—it's a cultural awakening. A storytelling empire built on truth, spirit, and ancestral memory.",
      impacts: [
        {
          icon: BookOpen,
          title: "Publishing Revolution",
          description: "From comics to novels, creating authentic African narratives"
        },
        {
          icon: Film,
          title: "Cinematic Worlds",
          description: "Bringing African mythology to screens worldwide"
        },
        {
          icon: Gamepad2,
          title: "Gaming Universe",
          description: "Interactive experiences celebrating African heritage"
        },
        {
          icon: Palette,
          title: "Cultural Renaissance",
          description: "Reclaiming Africa's royal and divine identity"
        },
        {
          icon: Users,
          title: "Youth Empowerment",
          description: "Creating heroes that look like African children"
        },
        {
          icon: Globe,
          title: "Global Impact",
          description: "Reaching audiences across borders and generations"
        }
      ],
      statement: "Africa is not a backdrop. It is the origin."
    },
    fr: {
      title: "AU-DELA DU DIVERTISSEMENT",
      subtitle: "Un Mouvement Mondial",
      description: "Isolele n'est pas qu'une marque—c'est un eveil culturel. Un empire de storytelling bati sur la verite, l'esprit et la memoire ancestrale.",
      impacts: [
        {
          icon: BookOpen,
          title: "Revolution Editoriale",
          description: "Des BD aux romans, creer des recits africains authentiques"
        },
        {
          icon: Film,
          title: "Mondes Cinematographiques",
          description: "Amener la mythologie africaine sur les ecrans du monde"
        },
        {
          icon: Gamepad2,
          title: "Univers Gaming",
          description: "Experiences interactives celebrant l'heritage africain"
        },
        {
          icon: Palette,
          title: "Renaissance Culturelle",
          description: "Recuperer l'identite royale et divine de l'Afrique"
        },
        {
          icon: Users,
          title: "Autonomisation des Jeunes",
          description: "Creer des heros qui ressemblent aux enfants africains"
        },
        {
          icon: Globe,
          title: "Impact Mondial",
          description: "Toucher des audiences au-dela des frontieres"
        }
      ],
      statement: "L'Afrique n'est pas un decor. C'est l'origine."
    }
  }

  const c = content[currentLanguage.code as keyof typeof content] || content.en

  return (
    <section 
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: currentTheme.colors.backgroundSecondary }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: currentTheme.colors.textPrimary }}
          >
            {c.title}
          </h2>
          <p 
            className="text-2xl font-semibold mb-4"
            style={{ color: currentTheme.colors.accentPrimary }}
          >
            {c.subtitle}
          </p>
          <p 
            className="text-lg max-w-3xl mx-auto"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            {c.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {c.impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl"
              style={{ 
                backgroundColor: currentTheme.colors.background,
                border: `1px solid ${currentTheme.colors.accentPrimary}20`
              }}
            >
              <div 
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                style={{ backgroundColor: `${currentTheme.colors.accentPrimary}20` }}
              >
                <impact.icon 
                  className="h-6 w-6"
                  style={{ color: currentTheme.colors.accentPrimary }}
                />
              </div>
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: currentTheme.colors.textPrimary }}
              >
                {impact.title}
              </h3>
              <p 
                className="text-sm"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                {impact.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-12 px-8 rounded-2xl"
          style={{ 
            background: `linear-gradient(135deg, ${currentTheme.colors.accentPrimary}20 0%, ${currentTheme.colors.accentSecondary}20 100%)`,
            border: `1px solid ${currentTheme.colors.accentPrimary}30`
          }}
        >
          <p 
            className="text-2xl sm:text-3xl font-black"
            style={{ color: currentTheme.colors.textPrimary }}
          >
            "{c.statement}"
          </p>
        </motion.div>
      </div>
    </section>
  )
}
