"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Newspaper, Download, ExternalLink, Mail, FileText, ImageIcon, Camera } from "lucide-react"

const pressReleases = [
  {
    date: "Feb 2026",
    title: { en: "Isolele Announces Global Expansion of African Comic Universe", fr: "Isolele annonce l'expansion mondiale de l'univers de bandes dessinees africaines" },
    desc: { en: "The Congo-based cultural institution expands its reach to 40+ countries with new distribution partnerships.", fr: "L'institution culturelle basee au Congo etend sa portee a plus de 40 pays avec de nouveaux partenariats de distribution." }
  },
  {
    date: "Dec 2025",
    title: { en: "Focus Congo Initiative Launches International Awareness Campaign", fr: "L'initiative Focus Congo lance une campagne de sensibilisation internationale" },
    desc: { en: "A comprehensive campaign to reposition Congo's image on the global stage through storytelling and education.", fr: "Une campagne complete pour repositionner l'image du Congo sur la scene mondiale a travers la narration et l'education." }
  },
  {
    date: "Oct 2025",
    title: { en: "Zaiire: Prince of Kongo Vol.1 Pre-Orders Open", fr: "Zaiire: Prince du Kongo Vol.1 - Pre-commandes ouvertes" },
    desc: { en: "The flagship comic series that blends ancient Kongo history with modern storytelling opens for worldwide pre-orders.", fr: "La serie phare qui melange l'histoire ancienne du Kongo avec la narration moderne ouvre les pre-commandes mondiales." }
  },
  {
    date: "Aug 2025",
    title: { en: "We Love Congo Community Programs Reach 10,000 Families", fr: "Les programmes communautaires We Love Congo touchent 10 000 familles" },
    desc: { en: "Community-led programs in the DRC reach a milestone of supporting over 10,000 families with dignity-first approaches.", fr: "Les programmes communautaires en RDC atteignent le jalon de soutien a plus de 10 000 familles avec des approches axees sur la dignite." }
  }
]

const mediaResources = [
  { icon: FileText, label: { en: "Brand Guidelines PDF", fr: "Guide de Marque PDF" } },
  { icon: ImageIcon, label: { en: "Logo Pack (SVG, PNG)", fr: "Pack Logo (SVG, PNG)" } },
  { icon: Camera, label: { en: "High-Res Photos", fr: "Photos Haute Resolution" } },
  { icon: FileText, label: { en: "Fact Sheet", fr: "Fiche d'Information" } },
]

export default function PressPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const t = (obj: { en: string; fr: string }) => obj[lang as "en" | "fr"] || obj.en

  return (
    <main className="min-h-screen py-24 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Newspaper className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--isolele-accent)" }} />
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--isolele-accent)" }}>
            {lang === "fr" ? "PRESSE & MEDIA" : "PRESS & MEDIA"}
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--isolele-text-secondary)" }}>
            {lang === "fr"
              ? "Ressources pour les journalistes, les medias et les institutions culturelles."
              : "Resources for journalists, media outlets, and cultural institutions."}
          </p>
        </motion.div>

        {/* Press Releases */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--isolele-text)" }}>
            {lang === "fr" ? "Communiques de Presse" : "Press Releases"}
          </h2>
          <div className="space-y-6">
            {pressReleases.map((pr, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start"
                style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "1px solid rgba(212,175,55,0.15)" }}
              >
                <span className="text-sm font-mono shrink-0 px-3 py-1 rounded" style={{ backgroundColor: "var(--isolele-bg)", color: "var(--isolele-accent)" }}>
                  {pr.date}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--isolele-text)" }}>{t(pr.title)}</h3>
                  <p className="text-sm" style={{ color: "var(--isolele-text-secondary)" }}>{t(pr.desc)}</p>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-all hover:scale-105"
                  style={{ backgroundColor: "var(--isolele-accent)", color: "#000" }}
                >
                  <ExternalLink className="w-4 h-4" />
                  {lang === "fr" ? "Lire" : "Read"}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Media Kit */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--isolele-text)" }}>
            {lang === "fr" ? "Kit Media" : "Media Kit"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mediaResources.map((res, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl text-left transition-all"
                style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                <res.icon className="w-8 h-8 mb-4" style={{ color: "var(--isolele-accent)" }} />
                <p className="font-medium text-sm" style={{ color: "var(--isolele-text)" }}>{t(res.label)}</p>
                <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "var(--isolele-accent)" }}>
                  <Download className="w-3 h-3" />
                  {lang === "fr" ? "Telecharger" : "Download"}
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="p-8 rounded-2xl text-center" style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "2px solid var(--isolele-accent)" }}>
          <Mail className="w-10 h-10 mx-auto mb-4" style={{ color: "var(--isolele-accent)" }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--isolele-text)" }}>
            {lang === "fr" ? "Contact Presse" : "Press Contact"}
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--isolele-text-secondary)" }}>
            {lang === "fr"
              ? "Pour les demandes de presse, entretiens et accreditations media :"
              : "For press inquiries, interviews, and media accreditation:"}
          </p>
          <p className="text-lg font-medium" style={{ color: "var(--isolele-accent)" }}>press@isolele.com</p>
        </section>
      </div>
    </main>
  )
}
