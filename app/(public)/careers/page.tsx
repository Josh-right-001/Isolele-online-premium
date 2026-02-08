"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Globe, Palette, Code, Megaphone } from "lucide-react"

const positions = [
  {
    title: { en: "Senior Illustrator - Comic Series", fr: "Illustrateur Senior - Serie de Bandes Dessinees" },
    dept: { en: "Creative", fr: "Creatif" },
    location: "Kinshasa, DRC",
    type: { en: "Full-time", fr: "Temps plein" },
    icon: Palette,
  },
  {
    title: { en: "Narrative Designer & Writer", fr: "Concepteur Narratif et Ecrivain" },
    dept: { en: "Storytelling", fr: "Narration" },
    location: "Remote / Kinshasa",
    type: { en: "Full-time", fr: "Temps plein" },
    icon: Heart,
  },
  {
    title: { en: "Community Manager - Francophone Africa", fr: "Community Manager - Afrique Francophone" },
    dept: { en: "Community", fr: "Communaute" },
    location: "Remote",
    type: { en: "Full-time", fr: "Temps plein" },
    icon: Megaphone,
  },
  {
    title: { en: "Full-Stack Developer", fr: "Developpeur Full-Stack" },
    dept: { en: "Technology", fr: "Technologie" },
    location: "Remote",
    type: { en: "Full-time", fr: "Temps plein" },
    icon: Code,
  },
  {
    title: { en: "Cultural Research Coordinator", fr: "Coordinateur de Recherche Culturelle" },
    dept: { en: "Research", fr: "Recherche" },
    location: "Kinshasa, DRC",
    type: { en: "Contract", fr: "Contrat" },
    icon: Globe,
  },
]

const values = [
  { label: { en: "Built From Africa, For the World", fr: "Construit d'Afrique, Pour le Monde" } },
  { label: { en: "Dignity Over Charity", fr: "La Dignite Avant la Charite" } },
  { label: { en: "Stories That Heal", fr: "Des Histoires Qui Guerissent" } },
  { label: { en: "Long-Term Vision", fr: "Vision a Long Terme" } },
]

export default function CareersPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const t = (obj: { en: string; fr: string }) => obj[lang as "en" | "fr"] || obj.en

  return (
    <main className="min-h-screen py-24 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Briefcase className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--isolele-accent)" }} />
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--isolele-accent)" }}>
            {lang === "fr" ? "CARRIERES" : "CAREERS"}
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--isolele-text-secondary)" }}>
            {lang === "fr"
              ? "Rejoignez l'equipe qui reconstruit la narration africaine. Nous recherchons des createurs, des penseurs et des batisseurs."
              : "Join the team rebuilding African storytelling. We are looking for creators, thinkers, and builders."}
          </p>
        </motion.div>

        {/* Values */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {values.map((v, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="px-5 py-2.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: "var(--isolele-bg-secondary)", color: "var(--isolele-accent)", border: "1px solid rgba(212,175,55,0.3)" }}
            >
              {t(v.label)}
            </motion.span>
          ))}
        </div>

        {/* Positions */}
        <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--isolele-text)" }}>
          {lang === "fr" ? "Postes Ouverts" : "Open Positions"}
        </h2>
        <div className="space-y-4">
          {positions.map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
              className="p-6 rounded-xl flex flex-col md:flex-row md:items-center gap-4 cursor-pointer group"
              style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <pos.icon className="w-8 h-8 shrink-0" style={{ color: "var(--isolele-accent)" }} />
              <div className="flex-1">
                <h3 className="text-lg font-bold" style={{ color: "var(--isolele-text)" }}>{t(pos.title)}</h3>
                <div className="flex flex-wrap gap-4 mt-1">
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--isolele-text-secondary)" }}>
                    <MapPin className="w-3 h-3" /> {pos.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--isolele-text-secondary)" }}>
                    <Clock className="w-3 h-3" /> {t(pos.type)}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "var(--isolele-bg)", color: "var(--isolele-accent)" }}>
                    {t(pos.dept)}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "var(--isolele-accent)" }} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl text-center"
          style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "2px solid var(--isolele-accent)" }}
        >
          <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--isolele-text)" }}>
            {lang === "fr" ? "Vous ne voyez pas votre poste ?" : "Don't See Your Role?"}
          </h3>
          <p className="text-sm mb-6" style={{ color: "var(--isolele-text-secondary)" }}>
            {lang === "fr"
              ? "Envoyez-nous votre portfolio ou CV a careers@isolele.com. Nous sommes toujours a la recherche de talents exceptionnels."
              : "Send us your portfolio or CV at careers@isolele.com. We are always looking for exceptional talent."}
          </p>
          <p className="font-bold" style={{ color: "var(--isolele-accent)" }}>careers@isolele.com</p>
        </motion.div>
      </div>
    </main>
  )
}
