"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { Star, Quote } from "lucide-react"

export function ReviewsSection() {
  const { currentTheme } = useTheme()
  const { currentLanguage } = useLanguage()

  const reviews = [
    {
      text: {
        en: "A new benchmark for superhero literature. This is the future of the genre.",
        fr: "Une nouvelle reference pour la litterature de super-heros. C'est l'avenir du genre."
      },
      author: "Literary Review",
      stars: 5
    },
    {
      text: {
        en: "An emotional rollercoaster that celebrates heritage while delivering action-packed adventure.",
        fr: "Des montagnes russes emotionnelles qui celebrent l'heritage tout en offrant une aventure pleine d'action."
      },
      author: "Comics Weekly",
      stars: 5
    },
    {
      text: {
        en: "Zaiire is already generating buzz as the next big thing in African storytelling.",
        fr: "Zaiire fait deja parler de lui comme la prochaine grande chose du storytelling africain."
      },
      author: "Culture Magazine",
      stars: 5
    },
    {
      text: {
        en: "A story that not only entertains but transforms lives. Its themes resonate with readers of all ages.",
        fr: "Une histoire qui non seulement divertit mais transforme les vies. Ses themes resonnent avec les lecteurs de tous ages."
      },
      author: "Youth Media",
      stars: 5
    }
  ]

  const content = {
    en: {
      title: "A CULTURAL PHENOMENON IN THE MAKING",
      subtitle: "Early Reviews",
      description: "Critics and readers alike are calling Zaiire 'the future of African superhero storytelling'"
    },
    fr: {
      title: "UN PHENOMENE CULTUREL EN DEVENIR",
      subtitle: "Premieres Critiques",
      description: "Critiques et lecteurs qualifient Zaiire de 'futur du storytelling africain de super-heros'"
    }
  }

  const c = content[currentLanguage.code as keyof typeof content] || content.en

  return (
    <section 
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p 
            className="text-sm font-bold tracking-widest mb-4"
            style={{ color: currentTheme.colors.accentPrimary }}
          >
            {c.subtitle}
          </p>
          <h2 
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: currentTheme.colors.textPrimary }}
          >
            {c.title}
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            {c.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 rounded-2xl"
              style={{ 
                backgroundColor: currentTheme.colors.backgroundSecondary,
                border: `1px solid ${currentTheme.colors.accentPrimary}20`
              }}
            >
              <Quote 
                className="absolute top-4 right-4 h-8 w-8 opacity-20"
                style={{ color: currentTheme.colors.accentPrimary }}
              />
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-5 w-5 fill-current"
                    style={{ color: currentTheme.colors.accentPrimary }}
                  />
                ))}
              </div>
              
              <p 
                className="text-lg mb-4 leading-relaxed"
                style={{ color: currentTheme.colors.textPrimary }}
              >
                "{review.text[currentLanguage.code as keyof typeof review.text] || review.text.en}"
              </p>
              
              <p 
                className="text-sm font-bold"
                style={{ color: currentTheme.colors.accentPrimary }}
              >
                - {review.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
