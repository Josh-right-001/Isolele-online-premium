"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Crown, Globe, Heart, BookOpen, Shield, Users, Leaf, Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BreadcrumbJsonLd } from "@/components/json-ld"

const timeline = [
  {
    year: "Origins",
    title: { en: "Royal Lineage", fr: "Lignee Royale" },
    desc: {
      en: "Born into royal lineage from the Congo region, guided by ancestral responsibility and the traditional African understanding of kingship as custodianship.",
      fr: "Ne dans une lignee royale de la region du Congo, guide par la responsabilite ancestrale et la conception traditionnelle africaine de la royaute comme gardiennage."
    }
  },
  {
    year: "Vision",
    title: { en: "A Dream Takes Form", fr: "Un Reve Prend Forme" },
    desc: {
      en: "Recognizing that African stories were being told by everyone except Africans themselves, the vision of a sovereign cultural institution was born.",
      fr: "Reconnaissant que les histoires africaines etaient racontees par tout le monde sauf les Africains eux-memes, la vision d'une institution culturelle souveraine est nee."
    }
  },
  {
    year: "Kinshasa",
    title: { en: "Building From Within", fr: "Construire de l'Interieur" },
    desc: {
      en: "Founded in Kinshasa, DRC - choosing to build from within Africa with African illustrators, writers and creators working in their lived realities.",
      fr: "Fonde a Kinshasa, RDC - choisissant de construire de l'interieur de l'Afrique avec des illustrateurs, ecrivains et createurs africains travaillant dans leurs realites vecues."
    }
  },
  {
    year: "Isolele",
    title: { en: "The Chosen Ones Rise", fr: "Les Elus se Levent" },
    desc: {
      en: "Isolele launches as a modern cultural institution - not a commercial trend - with stories rooted in real African experiences designed to restore identity and memory.",
      fr: "Isolele se lance comme une institution culturelle moderne - pas une tendance commerciale - avec des histoires enracinees dans de vraies experiences africaines concues pour restaurer l'identite et la memoire."
    }
  },
  {
    year: "Impact",
    title: { en: "Focus Congo & We Love Congo", fr: "Focus Congo & We Love Congo" },
    desc: {
      en: "Two expressions of the same royal responsibility - restoring dignity on the ground and truth in the world. One ecosystem, one vision.",
      fr: "Deux expressions de la meme responsabilite royale - restaurer la dignite sur le terrain et la verite dans le monde. Un ecosysteme, une vision."
    }
  }
]

const initiatives = [
  {
    title: { en: "We Love Congo", fr: "We Love Congo" },
    subtitle: { en: "Community and Human Dignity", fr: "Communaute et Dignite Humaine" },
    icon: Heart,
    color: "#D4AF37",
    points: {
      en: ["Dignity over charity", "Empowerment over dependency", "Local leadership over external control", "Rebuilding communities with cultural identity"],
      fr: ["La dignite avant la charite", "L'autonomisation avant la dependance", "Le leadership local avant le controle externe", "Reconstruire les communautes avec l'identite culturelle"]
    }
  },
  {
    title: { en: "Focus Congo", fr: "Focus Congo" },
    subtitle: { en: "Global Awareness & Strategic Repositioning", fr: "Sensibilisation Mondiale et Repositionnement Strategique" },
    icon: Globe,
    color: "#B3541E",
    points: {
      en: ["Highlighting Congo's ecological importance", "Showcasing cultural legacy", "Engaging educators and global leaders", "Shifting international perception"],
      fr: ["Mettre en lumiere l'importance ecologique du Congo", "Valoriser l'heritage culturel", "Engager les educateurs et leaders mondiaux", "Changer la perception internationale"]
    }
  }
]

export default function FounderPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const t = (obj: { en: string; fr: string }) => obj[lang as "en" | "fr"] || obj.en
  const tArr = (obj: { en: string[]; fr: string[] }) => obj[lang as "en" | "fr"] || obj.en

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://isolele.com" },
        { name: "Founder", url: "https://isolele.com/founder" }
      ]} />

      <main className="min-h-screen" style={{ backgroundColor: "var(--isolele-bg)" }}>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--isolele-bg)] via-transparent to-transparent z-10" />

          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/king-kufulula.jpg"
              alt="HRM King Kufulula"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-medium tracking-wider mb-6"
                  style={{ backgroundColor: "rgba(212, 175, 55, 0.2)", color: "#D4AF37", border: "1px solid rgba(212, 175, 55, 0.4)" }}
                >
                  {lang === "fr" ? "FONDATEUR ROYAL" : "ROYAL FOUNDER"}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-none"
              >
                HRM King
                <br />
                <span style={{ color: "#D4AF37" }}>Kufulula</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl"
              >
                {lang === "fr"
                  ? "Fondateur Royal d'Isolele | Gardien de l'Heritage Congolais | Architecte Culturel Africain"
                  : "Royal Founder of Isolele | Custodian of Congolese Heritage | African Cultural Architect"}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold tracking-wider transition-all hover:scale-105"
                  style={{ backgroundColor: "#D4AF37", color: "#000" }}
                >
                  {lang === "fr" ? "DECOUVRIR ISOLELE" : "DISCOVER ISOLELE"}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/supporters"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold tracking-wider border-2 transition-all hover:scale-105 text-white"
                  style={{ borderColor: "#D4AF37" }}
                >
                  {lang === "fr" ? "DEVENIR SUPPORTER" : "BECOME A SUPPORTER"}
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Introduction Quote */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Crown className="w-12 h-12 mx-auto mb-8" style={{ color: "var(--isolele-accent)" }} />
              <blockquote className="text-2xl md:text-3xl lg:text-4xl italic leading-relaxed mb-8" style={{ color: "var(--isolele-text)" }}>
                {lang === "fr"
                  ? "\"Isolele n'a pas ete cree pour divertir le monde. Il a ete cree pour restaurer la memoire.\""
                  : "\"Isolele was not created to entertain the world. It was created to restore memory.\""}
              </blockquote>
              <div className="h-px w-24 mx-auto mb-4" style={{ backgroundColor: "var(--isolele-accent)" }} />
              <p className="text-lg font-medium" style={{ color: "var(--isolele-accent)" }}>
                HRM King Kufulula
              </p>
            </motion.div>
          </div>
        </section>

        {/* Biography Section */}
        <section className="py-20 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg-secondary)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* Image column */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 relative"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative" style={{ border: "2px solid var(--isolele-accent)" }}>
                  <Image
                    src="/images/king-kufulula.jpg"
                    alt="HRM King Kufulula - Royal Portrait"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-sm text-gray-300 tracking-wider">
                      {lang === "fr" ? "FIGURE ROYALE CONGOLAISE" : "CONGOLESE ROYAL FIGURE"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Text column */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--isolele-text)" }}>
                  {lang === "fr" ? "Architecte Culturel et Gardien Royal" : "Cultural Architect and Royal Custodian"}
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: "var(--isolele-text-secondary)" }}>
                  {lang === "fr"
                    ? "HRM King Kufulula est une figure royale congolaise, architecte culturel et fondateur d'Isolele, une institution de narration et de culture africaine basee au Congo, creee pour restaurer l'identite, la memoire et la souverainete narrative des communautes africaines et afro-descendantes du monde entier."
                    : "HRM King Kufulula is a Congolese royal figure, cultural architect, and founder of Isolele, a Congo-based African storytelling and cultural institution created to restore identity, memory, and narrative sovereignty to African and Afro-descendant communities worldwide."}
                </p>
                <p className="text-lg leading-relaxed" style={{ color: "var(--isolele-text-secondary)" }}>
                  {lang === "fr"
                    ? "Enracine dans la lignee royale de la region du Congo et guide par la responsabilite ancestrale, le travail de King Kufulula reflete une conception traditionnelle africaine de la royaute : non pas comme spectacle ou domination, mais comme gardiennage du peuple, de la terre, de la culture et des generations futures."
                    : "Rooted in royal lineage from the Congo region and guided by ancestral responsibility, King Kufulula's work reflects a traditional African understanding of kingship: not as spectacle or domination, but as custodianship of people, land, culture, and future generations."}
                </p>

                {/* Philosophy cards */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    { icon: Shield, label: { en: "Protect cultural memory", fr: "Proteger la memoire culturelle" } },
                    { icon: Users, label: { en: "Safeguard future generations", fr: "Proteger les generations futures" } },
                    { icon: Crown, label: { en: "Ensure continuity beyond the individual", fr: "Assurer la continuite au-dela de l'individu" } },
                    { icon: Sparkles, label: { en: "Build systems that outlive their founder", fr: "Construire des systemes qui survivent a leur fondateur" } },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: "var(--isolele-bg)", border: "1px solid rgba(212, 175, 55, 0.2)" }}
                    >
                      <item.icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--isolele-accent)" }} />
                      <span className="text-sm" style={{ color: "var(--isolele-text)" }}>{t(item.label)}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Royalty as Responsibility */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ color: "var(--isolele-accent)" }}>
                {lang === "fr" ? "La Royaute comme Responsabilite" : "Royalty as Responsibility"}
              </h2>
              <p className="text-xl italic mb-12" style={{ color: "var(--isolele-text-secondary)" }}>
                {lang === "fr"
                  ? "Dans la tradition africaine, la royaute se mesure au service, pas au spectacle."
                  : "In African tradition, royalty is measured by service, not display."}
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "var(--isolele-text-secondary)" }}>
                {lang === "fr"
                  ? "Son leadership est defini par la vision a long terme, la construction d'institutions et l'impact intergenerationnel plutot que la visibilite personnelle. Cette philosophie inspire chaque aspect d'Isolele, qui fonctionne comme un royaume culturel moderne dedie a l'education, la narration et la restauration de l'identite."
                  : "His leadership is defined by long-term vision, institution-building, and intergenerational impact rather than personal visibility. This philosophy informs every aspect of Isolele, which functions as a modern cultural kingdom dedicated to education, storytelling, and identity restoration."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Congo: The Foundation */}
        <section className="py-24 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg-secondary)" }}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Leaf className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--isolele-accent)" }} />
              <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--isolele-text)" }}>
                {lang === "fr" ? "Congo : Le Fondement de la Vision" : "Congo: The Foundation of the Vision"}
              </h2>
              <p className="text-xl italic" style={{ color: "var(--isolele-accent)" }}>
                {lang === "fr"
                  ? "Le Congo n'est pas un arriere-plan dans ce travail. C'est le fondement."
                  : "Congo is not a backdrop in this work. It is the foundation."}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Crown, label: { en: "A pillar of human civilization", fr: "Un pilier de la civilisation humaine" } },
                { icon: Leaf, label: { en: "A strategic center of environmental balance", fr: "Un centre strategique d'equilibre environnemental" } },
                { icon: BookOpen, label: { en: "A source of cultural intelligence", fr: "Une source d'intelligence culturelle" } },
                { icon: Heart, label: { en: "A land whose people deserve dignity, not pity", fr: "Une terre dont le peuple merite la dignite, pas la pitie" } },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-2xl text-center"
                  style={{ backgroundColor: "var(--isolele-bg)", border: "1px solid rgba(212, 175, 55, 0.2)" }}
                >
                  <item.icon className="w-10 h-10 mx-auto mb-4" style={{ color: "var(--isolele-accent)" }} />
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--isolele-text)" }}>
                    {t(item.label)}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg leading-relaxed mt-12 text-center max-w-4xl mx-auto"
              style={{ color: "var(--isolele-text-secondary)" }}
            >
              {lang === "fr"
                ? "En tant que l'une des plus anciennes regions de civilisation humaine, le Congo a longtemps ete un centre de systemes spirituels, d'equilibre ecologique et d'organisation sociale avancee. Ses forets regulant le climat de la planete. Ses rivieres soutiennent des ecosystemes au-dela des frontieres. Ses mineraux alimentent la technologie moderne. Sa culture, sa musique et ses histoires ont influence le monde pendant des siecles."
                : "As one of the world's oldest regions of human civilization, Congo has long been a center of spiritual systems, ecological balance, and advanced social organization. Its forests regulate the planet's climate. Its rivers sustain ecosystems across borders. Its minerals power modern technology. Its culture, music, and stories have influenced the world for centuries."}
            </motion.p>
          </div>
        </section>

        {/* Focus Congo & We Love Congo */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--isolele-text)" }}>
                {lang === "fr" ? "Une Mission. Deux Expressions." : "One Mission. Two Expressions."}
              </h2>
              <p className="text-lg" style={{ color: "var(--isolele-text-secondary)" }}>
                {lang === "fr"
                  ? "Les deux initiatives existent pour restaurer la dignite, la stabilite et la reconnaissance mondiale au Congo et a son peuple."
                  : "Both initiatives exist to restore dignity, stability, and global recognition to Congo and its people."}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {initiatives.map((init, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-8 rounded-2xl"
                  style={{
                    backgroundColor: "var(--isolele-bg-secondary)",
                    border: `2px solid ${init.color}40`,
                  }}
                >
                  <init.icon className="w-10 h-10 mb-4" style={{ color: init.color }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: init.color }}>
                    {t(init.title)}
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "var(--isolele-text-secondary)" }}>
                    {t(init.subtitle)}
                  </p>
                  <ul className="space-y-3">
                    {tArr(init.points).map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: init.color }} />
                        <span className="text-sm" style={{ color: "var(--isolele-text)" }}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* One Ecosystem callout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 p-8 rounded-2xl text-center"
              style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "2px solid var(--isolele-accent)" }}
            >
              <p className="text-xl italic mb-4" style={{ color: "var(--isolele-accent)" }}>
                {lang === "fr"
                  ? "\"Vous ne pouvez pas proteger les forets du Congo sans proteger son peuple. Vous ne pouvez pas autonomiser les communautes sans changer les recits mondiaux.\""
                  : "\"You cannot protect Congo's forests without protecting its people. You cannot empower communities without changing global narratives.\""}
              </p>
              <p className="text-sm" style={{ color: "var(--isolele-text-secondary)" }}>
                {lang === "fr"
                  ? "C'est du gardiennage, pas de l'aide temporaire."
                  : "This is guardianship, not temporary aid."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg-secondary)" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ color: "var(--isolele-text)" }}>
              {lang === "fr" ? "Le Parcours" : "The Journey"}
            </h2>

            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: "var(--isolele-accent)" }} />

              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <span className="text-sm font-bold tracking-wider" style={{ color: "var(--isolele-accent)" }}>
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold mt-1 mb-2" style={{ color: "var(--isolele-text)" }}>
                      {t(item.title)}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--isolele-text-secondary)" }}>
                      {t(item.desc)}
                    </p>
                  </div>
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: "var(--isolele-accent)" }} />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Children */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-8" style={{ color: "var(--isolele-accent)" }} />
            <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ color: "var(--isolele-text)" }}>
              {lang === "fr" ? "Education, Enfants et Avenir" : "Education, Children, and the Future"}
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--isolele-text-secondary)" }}>
              {lang === "fr"
                ? "Au coeur de ce travail se trouve l'education. Isolele est concu pour enseigner aux enfants africains et au public mondial a valoriser l'identite africaine sans honte, l'intelligence culturelle comme pouvoir, la creativite comme infrastructure, et la memoire comme leadership."
                : "At the heart of this work is education. Isolele is designed to teach African children and global audiences to value African identity without shame, cultural intelligence as power, creativity as infrastructure, and memory as leadership."}
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl italic font-medium"
              style={{ color: "var(--isolele-accent)" }}
            >
              {lang === "fr"
                ? "\"Si un enfant africain grandit en sachant qu'il appartient au futur, la mission reussit.\""
                : "\"If an African child grows up knowing they belong to the future, the mission succeeds.\""}
            </motion.p>
          </div>
        </section>

        {/* Open Invitation CTA */}
        <section className="py-24 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg-secondary)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--isolele-text)" }}>
              {lang === "fr" ? "Une Invitation Ouverte" : "An Open Invitation"}
            </h2>
            <p className="text-lg mb-8" style={{ color: "var(--isolele-text-secondary)" }}>
              {lang === "fr"
                ? "Isolele, Focus Congo et We Love Congo accueillent la collaboration avec les universites, institutions culturelles, organisations environnementales, investisseurs ethiques et leaders mondiaux qui comprennent que l'Afrique doit etre co-auteur du futur, pas son sujet."
                : "Isolele, Focus Congo, and We Love Congo welcome collaboration with universities, cultural institutions, environmental organizations, ethical investors, and global leaders who understand that Africa must be a co-author of the future, not a subject of it."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/supporters/become"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold tracking-wider transition-all hover:scale-105"
                style={{ backgroundColor: "#D4AF37", color: "#000" }}
              >
                {lang === "fr" ? "REJOINDRE LA MISSION" : "JOIN THE MISSION"}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold tracking-wider border-2 transition-all hover:scale-105"
                style={{ borderColor: "#D4AF37", color: "var(--isolele-text)" }}
              >
                {lang === "fr" ? "NOUS CONTACTER" : "CONTACT US"}
              </Link>
            </div>

            <p className="mt-12 text-sm italic" style={{ color: "var(--isolele-text-secondary)" }}>
              {lang === "fr"
                ? "Ce n'est pas du divertissement seul. Ce n'est pas de la charite. C'est de la reconstruction culturelle."
                : "This is not entertainment alone. This is not charity. This is cultural reconstruction."}
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
