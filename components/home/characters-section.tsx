"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const characters = [
  {
    id: "zaire",
    name: "ZAIRE",
    title: "Prince du Kongo",
    description: "Fils du tonnerre et de la royaute, choisi par le Collier de la Destinee.",
    image: "/images/characters/zaire.jpg",
    color: "#D4AF37",
  },
  {
    id: "kimoya",
    name: "KIMOYA",
    title: "La Kandake Renaissante",
    description: "Heritiere des reines guerrieres, chasseuse d'ombres.",
    image: "/images/characters/kimoya.jpg",
    color: "#B3541E",
  },
  {
    id: "zattar",
    name: "ZATTAR",
    title: "L'Architecte de Sang",
    description: "Genie maudit de la technologie interdite.",
    image: "/images/characters/zattar.jpg",
    color: "#8B0000",
  },
  {
    id: "njoko-twins",
    name: "LES JUMEAUX NJOKO",
    title: "Prophetes Orphelins",
    description: "Orphelins prophetes qui parlent avec les rivieres et les etoiles.",
    image: "/images/characters/njoko.jpg",
    color: "#4169E1",
  },
  {
    id: "imvula",
    name: "REINE IMVULA",
    title: "Gardienne des Betes du Ciel",
    description: "Souveraine de Stormglass, gardienne des Betes du Ciel.",
    image: "/images/characters/imvula.jpg",
    color: "#9932CC",
  },
]

export function CharactersSection() {
  const { currentTheme } = useTheme()
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 350
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" })
    }
    
    if (direction === "left" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    } else if (direction === "right" && activeIndex < characters.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }

  return (
    <section 
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-black tracking-wider mb-2"
              style={{ color: currentTheme.colors.textPrimary }}
            >
              {t("theChosen")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Rencontrez les heros, legendes et gardiens de l'Univers Isolele
            </motion.p>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex gap-2">
            <motion.button
              onClick={() => scroll("left")}
              className="p-3 rounded-full transition-all"
              style={{ 
                backgroundColor: `${currentTheme.colors.accentPrimary}20`,
                color: currentTheme.colors.accentPrimary
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: currentTheme.colors.accentPrimary,
                color: currentTheme.colors.background
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={() => scroll("right")}
              className="p-3 rounded-full transition-all"
              style={{ 
                backgroundColor: `${currentTheme.colors.accentPrimary}20`,
                color: currentTheme.colors.accentPrimary
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: currentTheme.colors.accentPrimary,
                color: currentTheme.colors.background
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Characters Carousel */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="flex-shrink-0 w-72 group"
              style={{ scrollSnapAlign: "start" }}
            >
              <Link href={`/characters/${character.id}`}>
                <div 
                  className="relative h-96 rounded-2xl overflow-hidden mb-4 transition-all duration-500"
                  style={{
                    backgroundColor: currentTheme.colors.backgroundSecondary,
                    border: `1px solid ${currentTheme.colors.accentPrimary}30`,
                  }}
                >
                  {/* Character image placeholder */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${character.color}40 0%, ${currentTheme.colors.background} 100%)`
                    }}
                  >
                    <span 
                      className="text-8xl font-black opacity-20"
                      style={{ color: character.color }}
                    >
                      {character.name[0]}
                    </span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: `linear-gradient(to top, ${currentTheme.colors.background} 0%, transparent 50%)`
                    }}
                  />
                  
                  {/* Glowing border on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: `inset 0 0 30px ${character.color}40, 0 0 30px ${character.color}30`
                    }}
                  />
                </div>
                
                {/* Character info */}
                <h3 
                  className="text-2xl font-black tracking-wider mb-1"
                  style={{ color: currentTheme.colors.textPrimary }}
                >
                  {character.name}
                </h3>
                <p 
                  className="text-sm font-medium mb-3"
                  style={{ color: character.color }}
                >
                  {character.title}
                </p>
                
                {/* Discover button */}
                <motion.span
                  className="inline-flex items-center gap-2 text-sm font-bold tracking-wider"
                  style={{ color: currentTheme.colors.accentPrimary }}
                  whileHover={{ x: 5 }}
                >
                  {t("discover")}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {characters.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index)
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({ left: index * 300, behavior: "smooth" })
                }
              }}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === activeIndex 
                  ? currentTheme.colors.accentPrimary 
                  : `${currentTheme.colors.textSecondary}40`,
                width: index === activeIndex ? "24px" : "8px"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
