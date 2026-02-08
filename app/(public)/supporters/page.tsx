"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Heart, Users, Globe, Star, ArrowRight, Shield, Award } from "lucide-react"
import Link from "next/link"

const partnerLogos = [
  "Cultural Heritage Fund", "African Union Arts", "UNESCO Partnership", "Congo Arts Council",
  "Pan-African Media", "Heritage Foundation"
]

const testimonials = [
  {
    name: "Dr. Amara N.",
    role: { en: "University Professor, Kinshasa", fr: "Professeur d'Universite, Kinshasa" },
    text: {
      en: "Isolele has given my students a mirror they never had. For the first time, they see superheroes who look like them, speak like them, and carry the weight of their own history.",
      fr: "Isolele a donne a mes etudiants un miroir qu'ils n'avaient jamais eu. Pour la premiere fois, ils voient des superheros qui leur ressemblent, parlent comme eux et portent le poids de leur propre histoire."
    }
  },
  {
    name: "Marie-Claire K.",
    role: { en: "Cultural Activist, Brussels", fr: "Activiste Culturelle, Bruxelles" },
    text: {
      en: "This is not just a comic book company. This is a cultural revolution wrapped in storytelling. Supporting Isolele means investing in the dignity of an entire continent.",
      fr: "Ce n'est pas seulement une maison d'edition de bandes dessinees. C'est une revolution culturelle enveloppee de narration. Soutenir Isolele signifie investir dans la dignite de tout un continent."
    }
  },
  {
    name: "James O.",
    role: { en: "Diaspora Community Leader, London", fr: "Leader Communautaire Diaspora, Londres" },
    text: {
      en: "My children finally have stories that don't start with slavery or poverty. They start with kingdoms, prophecies, and power. That changes everything.",
      fr: "Mes enfants ont enfin des histoires qui ne commencent pas par l'esclavage ou la pauvrete. Elles commencent par des royaumes, des propheties et du pouvoir. Cela change tout."
    }
  }
]

const tiers = [
  {
    name: { en: "Guardian", fr: "Gardien" },
    price: "$10/mo",
    color: "#D4AF37",
    icon: Shield,
    benefits: {
      en: ["Early access to new releases", "Monthly newsletter", "Name in credits", "Digital wallpapers"],
      fr: ["Acces anticipe aux nouvelles sorties", "Newsletter mensuelle", "Nom dans les credits", "Fonds d'ecran numeriques"]
    }
  },
  {
    name: { en: "Warrior", fr: "Guerrier" },
    price: "$25/mo",
    color: "#B3541E",
    icon: Star,
    benefits: {
      en: ["All Guardian benefits", "Exclusive behind-the-scenes content", "Quarterly video calls with team", "Limited edition prints"],
      fr: ["Tous les avantages Gardien", "Contenu exclusif des coulisses", "Appels video trimestriels avec l'equipe", "Impressions en edition limitee"]
    }
  },
  {
    name: { en: "Royal Patron", fr: "Patron Royal" },
    price: "$100/mo",
    color: "#8B0000",
    icon: Award,
    benefits: {
      en: ["All Warrior benefits", "Your name as official patron", "Annual signed artwork", "Direct line to creative team", "Invitation to annual events"],
      fr: ["Tous les avantages Guerrier", "Votre nom comme patron officiel", "Oeuvre signee annuelle", "Ligne directe avec l'equipe creative", "Invitation aux evenements annuels"]
    }
  }
]

export default function SupportersPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const t = (obj: { en: string; fr: string }) => obj[lang as "en" | "fr"] || obj.en
  const tArr = (obj: { en: string[]; fr: string[] }) => obj[lang as "en" | "fr"] || obj.en

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--isolele-bg)" }}>
      {/* Hero */}
      <section className="py-24 px-4 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <Heart className="w-16 h-16 mx-auto mb-8" style={{ color: "var(--isolele-accent)" }} />
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: "var(--isolele-accent)" }}>
            {lang === "fr" ? "SUPPORTERS & PARTENAIRES" : "SUPPORTERS & PARTNERS"}
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: "var(--isolele-text-secondary)" }}>
            {lang === "fr"
              ? "Rejoignez le mouvement qui restaure la memoire africaine. Chaque supporter fait partie de quelque chose de plus grand qu'un produit - une renaissance culturelle."
              : "Join the movement restoring African memory. Every supporter is part of something greater than a product - a cultural renaissance."}
          </p>
        </motion.div>
      </section>

      {/* Tiers */}
      <section className="py-20 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg-secondary)" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: "var(--isolele-text)" }}>
            {lang === "fr" ? "Niveaux de Soutien" : "Support Tiers"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="p-8 rounded-2xl flex flex-col"
                style={{ backgroundColor: "var(--isolele-bg)", border: `2px solid ${tier.color}40` }}
              >
                <tier.icon className="w-10 h-10 mb-4" style={{ color: tier.color }} />
                <h3 className="text-2xl font-bold mb-1" style={{ color: tier.color }}>{t(tier.name)}</h3>
                <p className="text-3xl font-bold mb-6" style={{ color: "var(--isolele-text)" }}>{tier.price}</p>
                <ul className="space-y-3 flex-1">
                  {tArr(tier.benefits).map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--isolele-text-secondary)" }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: tier.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/supporters/become"
                  className="mt-8 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm tracking-wider transition-all hover:scale-105"
                  style={{ backgroundColor: tier.color, color: "#000" }}
                >
                  {lang === "fr" ? "REJOINDRE" : "JOIN NOW"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12" style={{ color: "var(--isolele-text)" }}>
            {lang === "fr" ? "Nos Partenaires" : "Our Partners"}
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {partnerLogos.map((name, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-8 py-6 rounded-xl"
                style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "1px solid rgba(212,175,55,0.15)" }}
              >
                <p className="text-sm font-medium" style={{ color: "var(--isolele-text-secondary)" }}>{name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg-secondary)" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "var(--isolele-text)" }}>
            {lang === "fr" ? "Temoignages" : "Testimonials"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl"
                style={{ backgroundColor: "var(--isolele-bg)", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                <p className="text-sm italic mb-6 leading-relaxed" style={{ color: "var(--isolele-text-secondary)" }}>
                  &quot;{t(test.text)}&quot;
                </p>
                <p className="font-bold text-sm" style={{ color: "var(--isolele-text)" }}>{test.name}</p>
                <p className="text-xs" style={{ color: "var(--isolele-accent)" }}>{t(test.role)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
