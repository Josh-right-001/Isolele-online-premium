"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { HelpCircle, ChevronDown, MessageSquare } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    q: { en: "What is Isolele?", fr: "Qu'est-ce qu'Isolele ?" },
    a: {
      en: "Isolele is a Congo-based African storytelling and cultural institution founded by HRM King Kufulula. It restores identity, memory, and narrative sovereignty to African and Afro-descendant communities worldwide through comics, animation, education, and cultural programs.",
      fr: "Isolele est une institution africaine de narration et de culture basee au Congo, fondee par HRM King Kufulula. Elle restaure l'identite, la memoire et la souverainete narrative des communautes africaines et afro-descendantes du monde entier a travers des bandes dessinees, l'animation, l'education et des programmes culturels."
    }
  },
  {
    q: { en: "Where is Isolele based?", fr: "Ou est base Isolele ?" },
    a: {
      en: "Isolele is headquartered in Kinshasa, Democratic Republic of the Congo. We operate with African creators based in Africa, building from within the continent rather than externally.",
      fr: "Isolele a son siege a Kinshasa, en Republique Democratique du Congo. Nous travaillons avec des createurs africains bases en Afrique, construisant de l'interieur du continent plutot que de l'exterieur."
    }
  },
  {
    q: { en: "How can I buy Isolele comics?", fr: "Comment acheter les bandes dessinees Isolele ?" },
    a: {
      en: "You can pre-order our comics through our online shop. Zaiire: Prince of Kongo Vol.1 and Kimoya: The Reborn Kandake are currently available for pre-order. Physical and digital editions will be available upon release.",
      fr: "Vous pouvez pre-commander nos bandes dessinees via notre boutique en ligne. Zaiire: Prince du Kongo Vol.1 et Kimoya: La Kandake Renaissante sont actuellement disponibles en pre-commande. Les editions physiques et numeriques seront disponibles a la sortie."
    }
  },
  {
    q: { en: "What is the difference between Focus Congo and We Love Congo?", fr: "Quelle est la difference entre Focus Congo et We Love Congo ?" },
    a: {
      en: "Both are expressions of the same mission. Focus Congo works on global awareness and strategic repositioning of Congo's image internationally. We Love Congo focuses on community empowerment, dignity, and local development within the DRC.",
      fr: "Les deux sont des expressions de la meme mission. Focus Congo travaille sur la sensibilisation mondiale et le repositionnement strategique de l'image du Congo a l'international. We Love Congo se concentre sur l'autonomisation communautaire, la dignite et le developpement local en RDC."
    }
  },
  {
    q: { en: "Can I support Isolele financially?", fr: "Puis-je soutenir Isolele financierement ?" },
    a: {
      en: "Yes! We offer supporter tiers starting from $10/month. Visit our Supporters page to learn about Guardian, Warrior, and Royal Patron tiers, each offering unique benefits and ways to contribute to the mission.",
      fr: "Oui ! Nous proposons des niveaux de soutien a partir de 10$/mois. Visitez notre page Supporters pour decouvrir les niveaux Gardien, Guerrier et Patron Royal, chacun offrant des avantages uniques et des moyens de contribuer a la mission."
    }
  },
  {
    q: { en: "Are you hiring?", fr: "Recrutez-vous ?" },
    a: {
      en: "We regularly seek illustrators, writers, developers, community managers, and cultural researchers. Visit our Careers page for open positions, or send your portfolio to careers@isolele.com.",
      fr: "Nous recherchons regulierement des illustrateurs, ecrivains, developpeurs, community managers et chercheurs culturels. Visitez notre page Carrieres pour les postes ouverts, ou envoyez votre portfolio a careers@isolele.com."
    }
  },
  {
    q: { en: "Is Isolele a charity?", fr: "Isolele est-il une organisation caritative ?" },
    a: {
      en: "No. Isolele is a cultural institution. Our approach is built on dignity, not charity. We invest in sustainable, community-led initiatives that build long-term capacity rather than creating dependency.",
      fr: "Non. Isolele est une institution culturelle. Notre approche est fondee sur la dignite, pas la charite. Nous investissons dans des initiatives durables et communautaires qui renforcent les capacites a long terme plutot que de creer de la dependance."
    }
  },
  {
    q: { en: "What age group are the comics for?", fr: "A quelle tranche d'age s'adressent les bandes dessinees ?" },
    a: {
      en: "Our comics are designed for readers aged 8 and above. They contain age-appropriate action, cultural education, and positive messaging about African identity and heritage.",
      fr: "Nos bandes dessinees sont concues pour les lecteurs de 8 ans et plus. Elles contiennent de l'action adaptee a l'age, de l'education culturelle et des messages positifs sur l'identite et le patrimoine africains."
    }
  },
]

export default function FAQPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const t = (obj: { en: string; fr: string }) => obj[lang as "en" | "fr"] || obj.en
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen py-24 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg)" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <HelpCircle className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--isolele-accent)" }} />
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--isolele-accent)" }}>
            {lang === "fr" ? "QUESTIONS FREQUENTES" : "FAQ"}
          </h1>
          <p className="text-lg" style={{ color: "var(--isolele-text-secondary)" }}>
            {lang === "fr"
              ? "Tout ce que vous devez savoir sur Isolele, notre mission et nos projets."
              : "Everything you need to know about Isolele, our mission, and our projects."}
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium pr-4" style={{ color: "var(--isolele-text)" }}>{t(faq.q)}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 shrink-0" style={{ color: "var(--isolele-accent)" }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--isolele-text-secondary)" }}>
                      {t(faq.a)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl text-center"
          style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "2px solid var(--isolele-accent)" }}
        >
          <MessageSquare className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--isolele-accent)" }} />
          <h3 className="text-xl font-bold mb-2" style={{ color: "var(--isolele-text)" }}>
            {lang === "fr" ? "Vous avez encore des questions ?" : "Still Have Questions?"}
          </h3>
          <p className="text-sm mb-4" style={{ color: "var(--isolele-text-secondary)" }}>
            {lang === "fr" ? "N'hesitez pas a nous contacter directement." : "Feel free to reach out to us directly."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all hover:scale-105"
            style={{ backgroundColor: "var(--isolele-accent)", color: "#000" }}
          >
            {lang === "fr" ? "CONTACTEZ-NOUS" : "CONTACT US"}
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
