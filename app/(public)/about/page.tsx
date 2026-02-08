"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Sparkles, Crown, Users, Globe, Zap, BookOpen, Heart, Star } from "lucide-react"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import Image from "next/image"

const pillars = [
  {
    id: "mythology",
    icon: Crown,
    title: {
      en: "A Mythological Universe",
      fr: "Un Univers Mythologique"
    },
    description: {
      en: "A vast interconnected world inspired by real African kingdoms - from the thrones of Kongo, Kush and Axum to hidden empires guided by gods, warrior queens and oracles. SuperHeroes rise, not in tights and capes, but in sacred garments, with powers granted by ancestral pacts.",
      fr: "Un vaste monde interconnecte inspire des vrais royaumes africains - des trones du Kongo, de Kush et d'Axum aux empires caches guides par des dieux, des reines guerrieres et des oracles. Les SuperHeros s'elevent, non pas en collants et capes, mais en vetements sacres, avec des pouvoirs offerts par des pactes ancestraux."
    }
  },
  {
    id: "media",
    icon: BookOpen,
    title: {
      en: "A Publishing & Media Movement",
      fr: "Un Mouvement d'Edition et de Media"
    },
    description: {
      en: "From comics to novels, animations, games and cinematic worlds - Isolele builds a platform that enables African and diaspora creatives to tell their own legends with excellence, scale and soul.",
      fr: "Des bandes dessinees aux romans, animations, jeux et mondes cinematographiques - Isolele construit une plateforme qui permet aux creatifs africains et de la diaspora de raconter leurs propres legendes avec excellence, echelle et ame."
    }
  },
  {
    id: "cultural",
    icon: Globe,
    title: {
      en: "A Cultural Renovation",
      fr: "Une Renovation Culturelle"
    },
    description: {
      en: "Isolele is part of a greater renaissance - a movement to reclaim, celebrate and reimagine Africa's royal, mythical and divine identity. These are not just stories, they are acts of remembrance.",
      fr: "Isolele fait partie d'une plus grande renaissance - un mouvement pour recuperer, celebrer et reimaginer l'identite royale, mythique et divine de l'Afrique. Ce ne sont pas seulement des histoires, ce sont des actes de souvenir."
    }
  },
  {
    id: "legacy",
    icon: Heart,
    title: {
      en: "A Legacy Engine",
      fr: "Un Moteur de Legacie"
    },
    description: {
      en: "Every child who reads Isolele will discover superheroes who look like them, speak their language, protect their land and honor their ancestors. This is for the next generation of kings, queens, warriors, inventors and storytellers.",
      fr: "Chaque enfant qui lit Isolele decouvrira des super-heros qui leur ressemblent, parlent leur langue, protegent leur terre et honorent leurs ancetres. C'est pour la prochaine generation de rois, de reines, de guerriers, d'inventeurs et de conteurs."
    }
  }
]

const principles = [
  { en: "Destiny is not a Choice, it's a Calling", fr: "La Destinee n'est pas un Choix, c'est un Appel" },
  { en: "Royal Bloodlines Carry Ancient Power", fr: "Les Lignees Royales Transportent un Pouvoir Ancien" },
  { en: "Ancestral Spirits Never Die", fr: "Les Esprits Ancestraux ne Meurent Jamais" },
  { en: "Africa Was Never Powerless", fr: "L'Afrique n'a Jamais ete Impuissante" },
  { en: "The Prophecy Has Returned", fr: "La Prophetie est Revenue" }
]

const regions = [
  {
    name: { en: "The Royal Dynasty of Kongo", fr: "La Dynastie Royale du Kongo" },
    description: { en: "An empire of wealth, storms and divine legacy.", fr: "Un empire de richesse, de tempetes et d'heritage divin." }
  },
  {
    name: { en: "The Kandake Bloodline of Kush", fr: "La Lignee Kandake de Kush" },
    description: { en: "Warrior queens who wield the ancient power of Nubian gods.", fr: "Des reines guerrieres qui manient le pouvoir ancien des dieux nubiens." }
  },
  {
    name: { en: "The Oracle Nation of M'Bara", fr: "La Nation Oracle de M'Bara" },
    description: { en: "Guardians of memory, time and dream realms.", fr: "Gardiennes de la memoire, du temps et des royaumes des reves." }
  },
  {
    name: { en: "The Iron Desert of Tsoro", fr: "Le Desert de Fer de Tsoro" },
    description: { en: "A land of fallen warriors and mystics forged in sand.", fr: "Une terre de guerriers tombes et de mystiques forges dans le sable." }
  },
  {
    name: { en: "The Skyfall Islands", fr: "Les Iles Skyfall" },
    description: { en: "Floating islands where celestial beings guard forbidden truths.", fr: "Des iles flottantes ou les etres celestes gardent des verites interdites." }
  }
]

export default function AboutPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const t = (obj: { en: string; fr: string }) => obj[lang as 'en' | 'fr'] || obj.en
  const language = currentLanguage.code; // Declare the language variable

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://isolele.com" },
        { name: "About", url: "https://isolele.com/about" }
      ]} />
      
      <main className="min-h-screen" style={{ backgroundColor: 'var(--isolele-bg)' }}>
        {/* Hero Banner */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--isolele-bg)]" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url("/images/isolele-logo.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)'
            }}
          />
          <div className="relative z-10 text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl italic mb-6"
              style={{ color: 'var(--isolele-text-secondary)' }}
            >
              {lang === 'fr' 
                ? '"Chaque histoire de super-heros a besoin de racines dans la verite..."'
                : '"Every superhero story needs roots in truth..."'}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold"
              style={{ color: 'var(--isolele-accent)' }}
            >
              {lang === 'fr' ? "Qu'est-ce qu'ISOLELE ?" : "What is ISOLELE?"}
            </motion.h1>
          </div>
        </section>

        {/* Definition Section */}
        <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--isolele-text)' }}>
              {lang === 'fr' ? "L'UNIVERS VISIONNAIRE" : "THE VISIONARY UNIVERSE"}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-12" style={{ color: 'var(--isolele-text-secondary)' }}>
              {lang === 'fr' 
                ? "Isolele est un univers visionnaire ne pour restaurer l'ame du storytelling africain - un empire mythologique ou les Superheros sont choisis par le destin, les royaumes jamais oublies, et le pouvoir ancestral est vivant dans chaque page, chaque prophetie, chaque bataille."
                : "Isolele is a visionary universe born to restore the soul of African storytelling - a mythological empire where Superheroes are chosen by destiny, kingdoms never forgotten, and ancestral power is alive in every page, every prophecy, every battle."}
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold"
                style={{ color: 'var(--isolele-accent)' }}
              >
                {lang === 'fr' ? "Le Retour des Elus." : "The Return of the Chosen."}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold"
                style={{ color: 'var(--isolele-accent-secondary)' }}
              >
                {lang === 'fr' ? "L'Emergence d'une Afrique Mythique." : "The Emergence of a Mythical Africa."}
              </motion.div>
            </div>
          </motion.div>

          {/* Name Meaning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-2xl"
            style={{ backgroundColor: 'var(--isolele-bg-secondary)', border: '1px solid var(--isolele-accent)' }}
          >
            <Sparkles className="w-10 h-10 mb-4" style={{ color: 'var(--isolele-accent)' }} />
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--isolele-text)' }}>
              {lang === 'fr' ? "Le Nom et Son Pouvoir" : "The Name and Its Power"}
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--isolele-text-secondary)' }}>
              {lang === 'fr'
                ? '"Isolele" signifie "Les Elus" - un nom enracine dans un but divin. Chaque personnage de cet univers n\'est pas seulement ne puissant, il est convoque par les lignees sanguines, les esprits anciens et les histoires inachevees de leurs ancetres. Ce n\'est pas seulement de la fiction. C\'est un heritage spirituel renaissant sous une forme moderne.'
                : '"Isolele" means "The Chosen Ones" - a name rooted in divine purpose. Every character in this universe is not just born powerful, they are summoned by bloodlines, ancient spirits and unfinished stories of their ancestors. This is not just fiction. It is a spiritual heritage reborn in modern form.'}
            </p>
          </motion.div>
        </section>

        {/* Four Pillars */}
        <section className="py-20 px-4 md:px-8" style={{ backgroundColor: 'var(--isolele-bg-secondary)' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ color: 'var(--isolele-text)' }}>
              {lang === 'fr' ? "Les Quatre Piliers d'Isolele" : "The Four Pillars of Isolele"}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl"
                  style={{ backgroundColor: 'var(--isolele-bg)', border: '1px solid rgba(212, 175, 55, 0.2)' }}
                >
                  <pillar.icon className="w-12 h-12 mb-6" style={{ color: 'var(--isolele-accent)' }} />
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--isolele-text)' }}>
                    {t(pillar.title)}
                  </h3>
                  <p style={{ color: 'var(--isolele-text-secondary)' }}>
                    {t(pillar.description)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fundamental Principles */}
        <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ color: 'var(--isolele-text)' }}>
            {lang === 'fr' ? "Principes Fondamentaux" : "Fundamental Principles"}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-4 rounded-full cursor-pointer"
                style={{ 
                  backgroundColor: 'var(--isolele-bg-secondary)', 
                  border: '2px solid var(--isolele-accent)',
                  color: 'var(--isolele-text)'
                }}
              >
                <Star className="w-4 h-4 inline mr-2" style={{ color: 'var(--isolele-accent)' }} />
                {t(principle)}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Universe Map */}
        <section className="py-20 px-4 md:px-8" style={{ backgroundColor: 'var(--isolele-bg-secondary)' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: 'var(--isolele-text)' }}>
              {lang === 'fr' ? "L'UNIVERS D'ISOLELE" : "THE ISOLELE UNIVERSE"}
            </h2>
            <p className="text-center text-lg mb-16" style={{ color: 'var(--isolele-text-secondary)' }}>
              {lang === 'fr' 
                ? "Isolele s'etend sur un mythe multi-royaumes avec des royaumes, des tribus et des lignees sanguines interconnectes a travers :"
                : "Isolele spans a multi-kingdom myth with interconnected kingdoms, tribes and bloodlines through:"}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regions.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: 'var(--isolele-bg)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                >
                  <Zap className="w-8 h-8 mb-4" style={{ color: 'var(--isolele-accent)' }} />
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--isolele-accent)' }}>
                    {t(region.name)}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--isolele-text-secondary)' }}>
                    {t(region.description)}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <p className="text-center mt-8 italic" style={{ color: 'var(--isolele-text-secondary)' }}>
              {lang === 'fr' 
                ? "Et plus encore... Chaque region possede son propre pantheon, sa prophetie et son protecteur."
                : "And more... Each region has its own pantheon, prophecy and protector."}
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto text-center">
          <Zap className="w-16 h-16 mx-auto mb-8" style={{ color: 'var(--isolele-accent)' }} />
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--isolele-text)' }}>
            {lang === 'fr' ? "LA VISION" : "THE VISION"}
          </h2>
          <p className="text-xl leading-relaxed" style={{ color: 'var(--isolele-text-secondary)' }}>
            {lang === 'fr'
              ? "Restaurer l'Afrique comme centre du mythe, de la magie et de la puissance. Creer une tapisserie vivante de legendes qui eveillent la fierte, le but et la prophetie dans chaque ame qu'elles touchent a travers les frontieres, les generations et les plateformes."
              : "Restore Africa as the center of myth, magic and power. Create a living tapestry of legends that awaken pride, purpose and prophecy in every soul they touch across borders, generations and platforms."}
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-2xl"
            style={{ backgroundColor: 'var(--isolele-bg-secondary)', border: '2px solid var(--isolele-accent)' }}
          >
            <p className="text-2xl italic" style={{ color: 'var(--isolele-accent)' }}>
              {lang === 'fr'
                ? '"Nous ne creons pas seulement des personnages. Nous creons une lignee. Nous creons un heritage."'
                : '"We are not just creating characters. We are creating a lineage. We are creating a legacy."'}
            </p>
          </motion.div>
        </section>
      </main>
    </>
  )
}
