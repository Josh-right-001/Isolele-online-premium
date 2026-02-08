"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

const products = [
  {
    id: "zaiire-comic-1",
    name: "Zaiire: The Necklace of Destiny",
    nameFr: "Zaiire: Le Collier de la Destinee",
    description: "The epic first chapter of the Isolele Universe",
    descriptionFr: "Le premier chapitre epique de l'Univers Isolele",
    price: 26.99,
    originalPrice: 99.99,
    image: "/images/zaiire-hero-cover.jpg",
    badge: "PRE-ORDER",
    type: "comic" as const,
  },
  {
    id: "zaiire-deluxe",
    name: "Zaiire: Deluxe Edition",
    nameFr: "Zaiire: Edition Deluxe",
    description: "Collector's edition with exclusive artwork",
    descriptionFr: "Edition collector avec illustrations exclusives",
    price: 49.99,
    originalPrice: 149.99,
    image: "/images/zaiire-hero-cover.jpg",
    badge: "LIMITED",
    type: "book" as const,
  },
  {
    id: "isolele-artbook",
    name: "The Art of Isolele",
    nameFr: "L'Art d'Isolele",
    description: "Behind the scenes artwork and concept designs",
    descriptionFr: "Illustrations et concepts en coulisses",
    price: 34.99,
    image: "/images/zaiire-hero-cover.jpg",
    badge: "NEW",
    type: "book" as const,
  },
]

export function ProductsSection() {
  const { currentTheme } = useTheme()
  const { currentLanguage, t } = useLanguage()
  const { addItem } = useCart()

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
          <h2 
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: currentTheme.colors.textPrimary }}
          >
            {currentLanguage.code === "fr" ? "DEJA DISPONIBLE" : "ALREADY AVAILABLE"}
          </h2>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            {currentLanguage.code === "fr" 
              ? "Plongez dans l'univers Isolele avec notre collection de bandes dessinees et livres"
              : "Dive into the Isolele universe with our collection of comics and books"
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden"
              style={{ 
                backgroundColor: currentTheme.colors.backgroundSecondary,
                border: `1px solid ${currentTheme.colors.accentPrimary}20`
              }}
            >
              {/* Badge */}
              {product.badge && (
                <div 
                  className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ 
                    backgroundColor: currentTheme.colors.accentPrimary,
                    color: currentTheme.colors.background
                  }}
                >
                  {product.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ backgroundColor: `${currentTheme.colors.background}80` }}
                >
                  <motion.button
                    onClick={() => addItem({
                      id: product.id,
                      name: currentLanguage.code === "fr" ? product.nameFr : product.name,
                      description: currentLanguage.code === "fr" ? product.descriptionFr : product.description,
                      price: product.price,
                      originalPrice: product.originalPrice,
                      image: product.image,
                      type: product.type,
                    })}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-bold"
                    style={{ 
                      backgroundColor: currentTheme.colors.accentPrimary,
                      color: currentTheme.colors.background
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {t("shop_add_to_cart")}
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: currentTheme.colors.textPrimary }}
                >
                  {currentLanguage.code === "fr" ? product.nameFr : product.name}
                </h3>
                <p 
                  className="text-sm mb-4"
                  style={{ color: currentTheme.colors.textSecondary }}
                >
                  {currentLanguage.code === "fr" ? product.descriptionFr : product.description}
                </p>
                <div className="flex items-center gap-3">
                  <span 
                    className="text-2xl font-black"
                    style={{ color: currentTheme.colors.accentPrimary }}
                  >
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span 
                      className="text-sm line-through"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
