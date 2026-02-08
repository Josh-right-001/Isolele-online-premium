"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Zap, Shield, Flame, Droplets, Crown, Eye, Sword } from "lucide-react"
import Link from "next/link"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import Image from "next/image"

const characters = [
  {
    id: "zaire",
    name: "ZAIRE",
    title: { en: "Prince of Kongo", fr: "Prince du Kongo" },
    description: {
      en: "Son of thunder and royalty, chosen by the Necklace of Destiny. Zaire must balance his privileged life with the demands of a hero's calling.",
      fr: "Fils du tonnerre et de la royaute, choisi par le Collier de la Destinee. Zaire doit équilibrer sa vie privilégiée avec les exigences de l'appel d'un héros."
    },
    powers: [
      { icon: Zap, name: { en: "Lightning Control", fr: "Contrôle de la Foudre" } },
      { icon: Crown, name: { en: "Royal Authority", fr: "Autorité Royale" } },
      { icon: Shield, name: { en: "Ancestral Protection", fr: "Protection Ancestrale" } }
    ],
    color: "#D4AF37",
    kingdom: { en: "Kingdom of Kongo", fr: "Royaume du Kongo" }
  },
  {
    id: "kimoya",
    name: "KIMOYA",
    title: { en: "The Reborn Kandake", fr: "La Kandake Renaissante" },
    description: {
      en: "Heir of warrior queens, shadow hunter and protector of the Ethercobalt. She carries the power of Nubian gods in her veins.",
      fr: "Héritière des reines guerrières, chasseuse d'ombres et protectrice de l'Ethercobalt. Elle porte le pouvoir des dieux nubiens dans ses veines."
    },
    powers: [
      { icon: Eye, name: { en: "Shadow Sight", fr: "Vision de l'Ombre" } },
      { icon: Sword, name: { en: "Divine Combat", fr: "Combat Divin" } },
      { icon: Shield, name: { en: "Nubian Shield", fr: "Bouclier Nubien" } }
    ],
    color: "#B3541E",
    kingdom: { en: "Kingdom of Kush", fr: "Royaume de Kush" }
  },
  {
    id: "zattar",
    name: "ZATTAR",
    title: { en: "The Blood Architect", fr: "L'Architecte de Sang" },
    description: {
      en: "Cursed genius of forbidden technology. Master of techno-mystical constructs that blur the line between science and ancient magic.",
      fr: "Génie maudit de la technologie interdite. Maître des constructions techno-mystiques qui brouillent la frontière entre science et magie ancienne."
    },
    powers: [
      { icon: Flame, name: { en: "Blood Technology", fr: "Technologie de Sang" } },
      { icon: Shield, name: { en: "Construct Creation", fr: "Création de Constructs" } },
      { icon: Eye, name: { en: "Pattern Vision", fr: "Vision des Motifs" } }
    ],
    color: "#8B0000",
    kingdom: { en: "Iron Desert of Tsoro", fr: "Désert de Fer de Tsoro" }
  },
  {
    id: "jumeaux-njoko",
    name: { en: "THE NJOKO TWINS", fr: "LES JUMEAUX NJOKO" },
    title: { en: "Orphan Prophets", fr: "Prophètes Orphelins" },
    description: {
      en: "Orphan prophets who speak with rivers and stars. Their dual nature connects the physical realm to the spirit world.",
      fr: "Prophètes orphelins qui parlent avec les rivières et les étoiles. Leur double nature connecte le royaume physique au monde des esprits."
    },
    powers: [
      { icon: Droplets, name: { en: "Water Communion", fr: "Communion Aquatique" } },
      { icon: Eye, name: { en: "Star Reading", fr: "Lecture des Étoiles" } },
      { icon: Shield, name: { en: "Twin Bond", fr: "Lien Gemellaire" } }
    ],
    color: "#00CED1",
    kingdom: { en: "Oracle Nation of M'Bara", fr: "Nation Oracle de M'Bara" }
  },
  {
    id: "reine-imvula",
    name: { en: "QUEEN IMVULA", fr: "REINE IMVULA" },
    title: { en: "Guardian of Sky Beasts", fr: "Gardienne des Bêtes du Ciel" },
    description: {
      en: "Sovereign of Stormglass, guardian of the celestial creatures that patrol the boundaries between worlds.",
      fr: "Souveraine de Stormglass, gardienne des créatures célestes qui patrouillent les frontières entre les mondes."
    },
    powers: [
      { icon: Crown, name: { en: "Sky Command", fr: "Commandement du Ciel" } },
      { icon: Shield, name: { en: "Beast Bond", fr: "Lien des Bêtes" } },
      { icon: Zap, name: { en: "Storm Summoning", fr: "Invocation des Tempêtes" } }
    ],
    color: "#9370DB",
    kingdom: { en: "Skyfall Islands", fr: "Îles Skyfall" }
  }
]

export default function CharactersPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const t = (obj: { en: string; fr: string } | string) => {
    if (typeof obj === 'string') return obj
    return obj[lang as 'en' | 'fr'] || obj.en
  }
  const language = currentLanguage.code; // Declare the language variable

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://isolele.com" },
        { name: "Characters", url: "https://isolele.com/characters" }
      ]} />
      
      <main className="min-h-screen py-20" style={{ backgroundColor: 'var(--isolele-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--isolele-accent)' }}>
              {lang === 'fr' ? "LES ELUS" : "THE CHOSEN ONES"}
            </h1>
            <p className="text-xl max-w-3xl mx-auto italic" style={{ color: 'var(--isolele-text-secondary)' }}>
              {lang === 'fr'
                ? "Ces ne sont pas des héros empruntés à des mythes étrangers. Ils sont nés du sol, de l'esprit et du ciel du continent mère."
                : "These are not heroes borrowed from foreign myths. They are born from the soil, spirit and sky of the mother continent."}
            </p>
          </motion.div>

          {/* Characters Grid */}
          <div className="grid gap-12">
            {characters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid md:grid-cols-2 gap-8 items-center"
                style={{
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
                }}
              >
                {/* Character Image Placeholder */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative aspect-[3/4] rounded-2xl overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}
                  style={{ 
                    backgroundColor: 'var(--isolele-bg-secondary)',
                    border: `2px solid ${character.color}`,
                    boxShadow: `0 0 40px ${character.color}40`
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Crown className="w-24 h-24 mx-auto mb-4" style={{ color: character.color }} />
                      <span className="text-2xl font-bold" style={{ color: character.color }}>
                        {typeof character.name === 'string' ? character.name : t(character.name)}
                      </span>
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{ 
                      background: `radial-gradient(circle at center, ${character.color} 0%, transparent 70%)`
                    }}
                  />
                </motion.div>

                {/* Character Info */}
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span 
                      className="text-sm font-medium px-4 py-1 rounded-full"
                      style={{ backgroundColor: `${character.color}30`, color: character.color }}
                    >
                      {t(character.kingdom)}
                    </span>
                    
                    <h2 
                      className="text-4xl md:text-5xl font-bold mt-4 mb-2"
                      style={{ color: character.color }}
                    >
                      {typeof character.name === 'string' ? character.name : t(character.name)}
                    </h2>
                    
                    <h3 className="text-xl mb-6" style={{ color: 'var(--isolele-text-secondary)' }}>
                      {t(character.title)}
                    </h3>
                    
                    <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--isolele-text)' }}>
                      {t(character.description)}
                    </p>

                    {/* Powers */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      {character.powers.map((power, powerIndex) => (
                        <motion.div
                          key={powerIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + powerIndex * 0.1 }}
                          className="flex items-center gap-2 px-4 py-2 rounded-full"
                          style={{ 
                            backgroundColor: 'var(--isolele-bg-secondary)',
                            border: `1px solid ${character.color}50`
                          }}
                        >
                          <power.icon className="w-4 h-4" style={{ color: character.color }} />
                          <span className="text-sm" style={{ color: 'var(--isolele-text)' }}>
                            {t(power.name)}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <Link
                      href={`/characters/${character.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
                      style={{ 
                        backgroundColor: character.color,
                        color: '#000'
                      }}
                    >
                      {lang === 'fr' ? "VOIR LE PROFIL COMPLET" : "VIEW FULL PROFILE"}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-20 text-lg italic"
            style={{ color: 'var(--isolele-text-secondary)' }}
          >
            {lang === 'fr' 
              ? "(Des centaines d'autres attendent...)"
              : "(Hundreds more await...)"}
          </motion.p>
        </div>
      </main>
    </>
  )
}
