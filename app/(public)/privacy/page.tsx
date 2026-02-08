"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Shield } from "lucide-react"

const sections = [
  {
    title: { en: "1. Information We Collect", fr: "1. Informations que Nous Collectons" },
    content: {
      en: "We collect information you provide directly: name, email address, and payment information when making purchases. We also automatically collect usage data including IP address, browser type, and pages visited to improve our services.",
      fr: "Nous collectons les informations que vous fournissez directement : nom, adresse e-mail et informations de paiement lors de vos achats. Nous collectons egalement automatiquement des donnees d'utilisation comprenant l'adresse IP, le type de navigateur et les pages visitees pour ameliorer nos services."
    }
  },
  {
    title: { en: "2. How We Use Your Information", fr: "2. Comment Nous Utilisons Vos Informations" },
    content: {
      en: "Your information is used to process orders, send newsletters and updates (with your consent), improve our website and services, communicate about new releases and events, and provide customer support.",
      fr: "Vos informations sont utilisees pour traiter les commandes, envoyer des newsletters et mises a jour (avec votre consentement), ameliorer notre site web et nos services, communiquer sur les nouvelles sorties et evenements, et fournir un support client."
    }
  },
  {
    title: { en: "3. Data Protection", fr: "3. Protection des Donnees" },
    content: {
      en: "We implement industry-standard security measures to protect your personal data. All payment processing is handled through secure, PCI-compliant third-party providers. We never store your full credit card information on our servers.",
      fr: "Nous mettons en oeuvre des mesures de securite standard de l'industrie pour proteger vos donnees personnelles. Tout le traitement des paiements est gere par des fournisseurs tiers securises et conformes PCI. Nous ne stockons jamais vos informations completes de carte de credit sur nos serveurs."
    }
  },
  {
    title: { en: "4. Cookies", fr: "4. Cookies" },
    content: {
      en: "We use essential cookies for website functionality and optional analytics cookies to understand how visitors interact with our site. You can manage cookie preferences through your browser settings.",
      fr: "Nous utilisons des cookies essentiels pour la fonctionnalite du site et des cookies d'analyse optionnels pour comprendre comment les visiteurs interagissent avec notre site. Vous pouvez gerer les preferences de cookies via les parametres de votre navigateur."
    }
  },
  {
    title: { en: "5. Third-Party Services", fr: "5. Services Tiers" },
    content: {
      en: "We may share limited data with trusted third-party service providers for payment processing, email delivery, and analytics. These partners are contractually bound to protect your data.",
      fr: "Nous pouvons partager des donnees limitees avec des fournisseurs de services tiers de confiance pour le traitement des paiements, la livraison d'e-mails et l'analyse. Ces partenaires sont contractuellement tenus de proteger vos donnees."
    }
  },
  {
    title: { en: "6. Your Rights", fr: "6. Vos Droits" },
    content: {
      en: "You have the right to access, correct, or delete your personal data. You can unsubscribe from marketing communications at any time. To exercise these rights, contact us at privacy@isolele.com.",
      fr: "Vous avez le droit d'acceder, de corriger ou de supprimer vos donnees personnelles. Vous pouvez vous desabonner des communications marketing a tout moment. Pour exercer ces droits, contactez-nous a privacy@isolele.com."
    }
  },
  {
    title: { en: "7. Children's Privacy", fr: "7. Confidentialite des Enfants" },
    content: {
      en: "We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal data, please contact us to have it removed.",
      fr: "Nous ne collectons pas sciemment d'informations personnelles d'enfants de moins de 13 ans. Si vous pensez qu'un enfant nous a fourni des donnees personnelles, veuillez nous contacter pour les faire supprimer."
    }
  },
  {
    title: { en: "8. Contact", fr: "8. Contact" },
    content: {
      en: "For privacy-related inquiries, please contact our data protection team at privacy@isolele.com.",
      fr: "Pour les questions relatives a la confidentialite, veuillez contacter notre equipe de protection des donnees a privacy@isolele.com."
    }
  }
]

export default function PrivacyPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const t = (obj: { en: string; fr: string }) => obj[lang as "en" | "fr"] || obj.en

  return (
    <main className="min-h-screen py-24 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg)" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Shield className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--isolele-accent)" }} />
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--isolele-accent)" }}>
            {lang === "fr" ? "POLITIQUE DE CONFIDENTIALITE" : "PRIVACY POLICY"}
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
