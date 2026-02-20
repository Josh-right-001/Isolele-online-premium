"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

export function StorySection() {
  const { currentTheme } = useTheme()
  const { t, currentLanguage } = useLanguage()

  const storyContent = {
    en: {
      title: "THE PRINCE OF KONGO: NECKLACE OF DESTINY",
      subtitle: "An Epic Journey of Heritage, Power, and Destiny",
      paragraphs: [
        "In the heart of Africa, where tradition and legacy intertwine with modernity, a royal prince will soon discover his true destiny.",
        "\"The Prince of Kongo: Necklace of Destiny\" tells the epic story of Zaiire, a young boy from the bustling city of Kinshasa, raised in a life of unimaginable wealth and privilege. His family, one of the richest in Africa, has built an empire of prosperity, yet Zaiire's heart belongs to something far greater.",
        "Unbeknownst to him, an ancient legacy flows through his veins—a legacy tied to the very soul of his people, rooted deep within the rich culture and history of Kongo.",
        "On the surface, Zaiire is a boy accustomed to luxury, prestige, and respect. But when he visits his estranged mother in the poorest slums of Kinshasa, his world is turned upside down.",
        "During their reunion, his mother entrusts him with a powerful and ancient relic—the Necklace of Destiny, a mystical artifact passed down through generations of Congolese royalty. This necklace holds the power to awaken his inner strength and connects him to the primal forces of the earth, the spirits of his ancestors, and the true role he is destined to play as a protector of the Kongo."
      ],
      conclusion: "The destiny of a nation rests around his neck. Will Zaiire embrace it?",
      cta: "Discover the Full Story"
    },
    fr: {
      title: "LE PRINCE DU KONGO: LE COLLIER DE LA DESTINEE",
      subtitle: "Un Voyage Epique d'Heritage, de Pouvoir et de Destinee",
      paragraphs: [
        "Au coeur de l'Afrique, ou tradition et heritage s'entrelacent avec la modernite, un prince royal decouvrira bientot sa veritable destinee.",
        "\"Le Prince du Kongo: Le Collier de la Destinee\" raconte l'histoire epique de Zaiire, un jeune garcon de la ville animee de Kinshasa, eleve dans une vie de richesse et de privilege inimaginables. Sa famille, l'une des plus riches d'Afrique, a bati un empire de prosperite, mais le coeur de Zaiire appartient a quelque chose de bien plus grand.",
        "A son insu, un heritage ancien coule dans ses veines—un heritage lie a l'ame meme de son peuple, enracine profondement dans la riche culture et l'histoire du Kongo.",
        "En apparence, Zaiire est un garcon habitue au luxe, au prestige et au respect. Mais quand il rend visite a sa mere separee dans les bidonvilles les plus pauvres de Kinshasa, son monde est bouleverse.",
        "Lors de leurs retrouvailles, sa mere lui confie une relique puissante et ancienne—le Collier de la Destinee, un artefact mystique transmis de generation en generation a la royaute congolaise. Ce collier detient le pouvoir d'eveiller sa force interieure et le connecte aux forces primordiales de la terre, aux esprits de ses ancetres, et au veritable role qu'il est destine a jouer en tant que protecteur du Kongo."
      ],
      conclusion: "Le destin d'une nation repose autour de son cou. Zaiire l'acceptera-t-il?",
      cta: "Decouvrir l'Histoire Complete"
    }
  }

  const content = storyContent[currentLanguage.code as keyof typeof storyContent] || storyContent.en

  return (
    <section 
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: currentTheme.colors.backgroundSecondary }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/zaiire-hero-cover.jpg"
                alt="Zaiire Prince du Kongo"
                fill
                className="object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 60%, ${currentTheme.colors.backgroundSecondary} 100%)`
                }}
              />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 px-6 py-3 rounded-xl"
              style={{ 
                backgroundColor: currentTheme.colors.accentPrimary,
                color: currentTheme.colors.background
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <p className="text-sm font-bold">H.R.M KING KUFULULA</p>
              <p className="text-xs opacity-80">Creator & Author</p>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ color: currentTheme.colors.accentPrimary }}
            >
              {content.title}
            </h2>
            <p 
              className="text-xl mb-8"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              {content.subtitle}
            </p>
            
            <div className="space-y-4 mb-8">
              {content.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="leading-relaxed"
                  style={{ color: currentTheme.colors.textSecondary }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-bold italic mb-8 pl-6 border-l-4"
              style={{ 
                color: currentTheme.colors.accentPrimary,
                borderColor: currentTheme.colors.accentPrimary
              }}
            >
              "{content.conclusion}"
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
