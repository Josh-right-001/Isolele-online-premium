"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { FileText } from "lucide-react"

const sections = [
  {
    title: { en: "1. Acceptance of Terms", fr: "1. Acceptation des Conditions" },
    content: {
      en: "By accessing and using isolele.com and related services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
      fr: "En accedant et en utilisant isolele.com et les services associes, vous acceptez et convenez d'etre lie par ces Conditions de Service. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services."
    }
  },
  {
    title: { en: "2. Intellectual Property", fr: "2. Propriete Intellectuelle" },
    content: {
      en: "All content, characters, stories, artwork, logos, and trademarks displayed on this website are the exclusive property of Isolele and HRM King Kufulula. This includes but is not limited to: Zaiire, Kimoya, Makanda, and all related characters and storylines. No reproduction, distribution, or commercial use is permitted without explicit written consent.",
      fr: "Tout le contenu, les personnages, les histoires, les oeuvres d'art, les logos et les marques affiches sur ce site sont la propriete exclusive d'Isolele et HRM King Kufulula. Cela inclut mais n'est pas limite a : Zaiire, Kimoya, Makanda et tous les personnages et intrigues associes. Aucune reproduction, distribution ou utilisation commerciale n'est permise sans consentement ecrit explicite."
    }
  },
  {
    title: { en: "3. User Accounts", fr: "3. Comptes Utilisateur" },
    content: {
      en: "When creating an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
      fr: "Lors de la creation d'un compte, vous devez fournir des informations exactes et completes. Vous etes responsable du maintien de la confidentialite de vos identifiants de compte et de toutes les activites sous votre compte."
    }
  },
  {
    title: { en: "4. Purchases and Pre-Orders", fr: "4. Achats et Pre-commandes" },
    content: {
      en: "All purchases are subject to availability. Pre-order items will be shipped upon release. Prices are subject to change without notice. Refund policies apply as specified at the time of purchase.",
      fr: "Tous les achats sont soumis a la disponibilite. Les articles en pre-commande seront expedies a la sortie. Les prix sont sujets a modification sans preavis. Les politiques de remboursement s'appliquent comme specifie au moment de l'achat."
    }
  },
  {
    title: { en: "5. Content Usage", fr: "5. Utilisation du Contenu" },
    content: {
      en: "You may view and share content for personal, non-commercial purposes with proper attribution to Isolele. Any commercial use, modification, or distribution requires prior written authorization.",
      fr: "Vous pouvez consulter et partager le contenu a des fins personnelles et non commerciales avec une attribution appropriee a Isolele. Toute utilisation commerciale, modification ou distribution necessite une autorisation ecrite prealable."
    }
  },
  {
    title: { en: "6. Cultural Respect", fr: "6. Respect Culturel" },
    content: {
      en: "Isolele's content represents real African cultural heritage. Users agree to engage with our content respectfully and not to misappropriate, mock, or decontextualize the cultural elements presented.",
      fr: "Le contenu d'Isolele represente un veritable heritage culturel africain. Les utilisateurs acceptent de s'engager avec notre contenu de maniere respectueuse et de ne pas s'approprier, moquer ou decontextualiser les elements culturels presentes."
    }
  },
  {
    title: { en: "7. Limitation of Liability", fr: "7. Limitation de Responsabilite" },
    content: {
      en: "Isolele shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by you for the specific service in question.",
      fr: "Isolele ne sera pas responsable de tout dommage indirect, accessoire ou consecutif decoulant de l'utilisation de nos services. Notre responsabilite totale ne depassera pas le montant que vous avez paye pour le service specifique en question."
    }
  },
  {
    title: { en: "8. Contact", fr: "8. Contact" },
    content: {
      en: "For any questions regarding these Terms of Service, please contact us at legal@isolele.com.",
      fr: "Pour toute question concernant ces Conditions de Service, veuillez nous contacter a legal@isolele.com."
    }
  }
]

export default function TermsPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const t = (obj: { en: string; fr: string }) => obj[lang as "en" | "fr"] || obj.en

  return (
    <main className="min-h-screen py-24 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg)" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <FileText className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--isolele-accent)" }} />
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--isolele-accent)" }}>
            {lang === "fr" ? "CONDITIONS DE SERVICE" : "TERMS OF SERVICE"}
          </h1>
          <p className="text-sm" style={{ color: "var(--isolele-text-secondary)" }}>
            {lang === "fr" ? "Derniere mise a jour : Fevrier 2026" : "Last updated: February 2026"}
          </p>
        </motion.div>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-xl font-bold mb-3" style={{ color: "var(--isolele-text)" }}>{t(section.title)}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--isolele-text-secondary)" }}>{t(section.content)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
