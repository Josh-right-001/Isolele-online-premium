"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Heart, Shield, Star, Award, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const tiers = [
  {
    id: "guardian",
    name: { en: "Guardian", fr: "Gardien" },
    price: "$10",
    color: "#D4AF37",
    icon: Shield,
    desc: {
      en: "Support the foundation of African storytelling",
      fr: "Soutenez les fondations de la narration africaine"
    }
  },
  {
    id: "warrior",
    name: { en: "Warrior", fr: "Guerrier" },
    price: "$25",
    color: "#B3541E",
    icon: Star,
    desc: {
      en: "Champion the cause with deeper access",
      fr: "Defendez la cause avec un acces approfondi"
    }
  },
  {
    id: "patron",
    name: { en: "Royal Patron", fr: "Patron Royal" },
    price: "$100",
    color: "#8B0000",
    icon: Award,
    desc: {
      en: "Walk alongside the mission as a patron",
      fr: "Accompagnez la mission en tant que patron"
    }
  }
]

export default function BecomeSupporterPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const t = (obj: { en: string; fr: string }) => obj[lang as "en" | "fr"] || obj.en
  const [selectedTier, setSelectedTier] = useState("warrior")
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="min-h-screen py-24 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Heart className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--isolele-accent)" }} />
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--isolele-accent)" }}>
            {lang === "fr" ? "DEVENIR SUPPORTER" : "BECOME A SUPPORTER"}
          </h1>
          <p className="text-lg" style={{ color: "var(--isolele-text-secondary)" }}>
            {lang === "fr"
              ? "Choisissez votre niveau et rejoignez le mouvement de restauration culturelle."
              : "Choose your level and join the cultural restoration movement."}
          </p>
        </motion.div>

        {/* Tier Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier) => (
            <motion.button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              whileHover={{ y: -4 }}
              className="p-6 rounded-xl text-left transition-all"
              style={{
                backgroundColor: selectedTier === tier.id ? `${tier.color}15` : "var(--isolele-bg-secondary)",
                border: `2px solid ${selectedTier === tier.id ? tier.color : "rgba(212,175,55,0.15)"}`,
              }}
            >
              <tier.icon className="w-8 h-8 mb-3" style={{ color: tier.color }} />
              <h3 className="text-xl font-bold" style={{ color: tier.color }}>{t(tier.name)}</h3>
              <p className="text-2xl font-bold my-2" style={{ color: "var(--isolele-text)" }}>{tier.price}<span className="text-sm font-normal" style={{ color: "var(--isolele-text-secondary)" }}>/mo</span></p>
              <p className="text-sm" style={{ color: "var(--isolele-text-secondary)" }}>{t(tier.desc)}</p>
            </motion.button>
          ))}
        </div>

        {/* Form */}
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 rounded-2xl"
            style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "1px solid rgba(212,175,55,0.2)" }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--isolele-text)" }}>
              {lang === "fr" ? "Vos Informations" : "Your Information"}
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wider" style={{ color: "var(--isolele-text-secondary)" }}>
                    {lang === "fr" ? "PRENOM" : "FIRST NAME"}
                  </label>
                  <input
                    type="text" required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: "var(--isolele-bg)", color: "var(--isolele-text)", border: "1px solid rgba(212,175,55,0.2)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wider" style={{ color: "var(--isolele-text-secondary)" }}>
                    {lang === "fr" ? "NOM" : "LAST NAME"}
                  </label>
                  <input
                    type="text" required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: "var(--isolele-bg)", color: "var(--isolele-text)", border: "1px solid rgba(212,175,55,0.2)" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-2 tracking-wider" style={{ color: "var(--isolele-text-secondary)" }}>EMAIL</label>
                <input
                  type="email" required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                  style={{ backgroundColor: "var(--isolele-bg)", color: "var(--isolele-text)", border: "1px solid rgba(212,175,55,0.2)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2 tracking-wider" style={{ color: "var(--isolele-text-secondary)" }}>
                  {lang === "fr" ? "MESSAGE (OPTIONNEL)" : "MESSAGE (OPTIONAL)"}
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                  style={{ backgroundColor: "var(--isolele-bg)", color: "var(--isolele-text)", border: "1px solid rgba(212,175,55,0.2)" }}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-bold tracking-wider"
                style={{ backgroundColor: "var(--isolele-accent)", color: "#000" }}
              >
                {lang === "fr" ? "REJOINDRE LA MISSION" : "JOIN THE MISSION"}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-2xl text-center"
            style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "2px solid var(--isolele-accent)" }}
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: "var(--isolele-accent)" }} />
            <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--isolele-text)" }}>
              {lang === "fr" ? "Bienvenue dans la Mission !" : "Welcome to the Mission!"}
            </h2>
            <p className="text-lg mb-8" style={{ color: "var(--isolele-text-secondary)" }}>
              {lang === "fr"
                ? "Merci de rejoindre le mouvement. Vous recevrez un e-mail de confirmation sous peu."
                : "Thank you for joining the movement. You will receive a confirmation email shortly."}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold"
              style={{ backgroundColor: "var(--isolele-accent)", color: "#000" }}
            >
              {lang === "fr" ? "RETOUR A L'ACCUEIL" : "BACK TO HOME"}
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  )
}
