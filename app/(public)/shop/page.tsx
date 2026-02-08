"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { ShoppingCart, Star, Truck, Shield, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/json-ld"
import Image from "next/image"

const products = [
  {
    id: "zaire-comic-vol1",
    name: { en: "Zaiire: Prince of Kongo - Vol.1", fr: "Zaiire: Prince du Kongo - Vol.1" },
    subtitle: { en: "Necklace of Destiny", fr: "Le Collier de la Destinee" },
    price: 26.99,
    originalPrice: 99.99,
    description: {
      en: "An uplifting action-packed adventure that echoes the Spirit of the Lion King and Black Panther, while offering young readers a Celebration of Heritage, Courage and Self-Discovery.",
      fr: "Une aventure palpitante et edifiante qui fait echo a l'esprit du Roi Lion et de Black Panther, tout en offrant aux jeunes lecteurs une celebration de l'heritage, du courage et de la decouverte de soi."
    },
    badge: { en: "PRE-ORDER", fr: "PRE-COMMANDE" },
    category: "comics",
    inStock: true,
    rating: 5,
    reviews: 127
  },
  {
    id: "kimoya-comic-vol1",
    name: { en: "Kimoya: The Reborn Kandake", fr: "Kimoya: La Kandake Renaissante" },
    subtitle: { en: "Shadow Hunter Origins", fr: "Origines de la Chasseuse d'Ombres" },
    price: 24.99,
    originalPrice: null,
    description: {
      en: "The daughter of warrior queens returns as Shadow Hunter, protector of the Ethercobalt and heir to the Nubian throne.",
      fr: "La fille des reines guerrieres revient en tant que Chasseuse d'Ombres, protectrice de l'Ethercobalt et heritiere du trone nubien."
    },
    badge: { en: "COMING SOON", fr: "BIENTOT" },
    category: "comics",
    inStock: false,
    rating: 0,
    reviews: 0
  },
  {
    id: "isolele-tshirt",
    name: { en: "ISOLELE Logo T-Shirt", fr: "T-Shirt Logo ISOLELE" },
    subtitle: { en: "Premium Cotton", fr: "Coton Premium" },
    price: 34.99,
    originalPrice: null,
    description: {
      en: "High-quality cotton t-shirt featuring the iconic ISOLELE emblem. Available in black with gold print.",
      fr: "T-shirt en coton de haute qualite avec l'embleme iconique ISOLELE. Disponible en noir avec impression doree."
    },
    badge: null,
    category: "apparel",
    inStock: true,
    rating: 4.8,
    reviews: 45
  },
  {
    id: "kongo-poster",
    name: { en: "Kingdom of Kongo Poster", fr: "Poster Royaume du Kongo" },
    subtitle: { en: "Limited Edition Art Print", fr: "Impression d'Art Edition Limitee" },
    price: 19.99,
    originalPrice: null,
    description: {
      en: "Stunning artwork depicting the mythical Kingdom of Kongo. High-quality print on premium paper.",
      fr: "Oeuvre d'art epoustouflante representant le mythique Royaume du Kongo. Impression de haute qualite sur papier premium."
    },
    badge: { en: "LIMITED", fr: "LIMITE" },
    category: "art",
    inStock: true,
    rating: 4.9,
    reviews: 32
  }
]

const categories = [
  { id: "all", name: { en: "All Products", fr: "Tous les Produits" } },
  { id: "comics", name: { en: "Comics", fr: "Bandes Dessinees" } },
  { id: "apparel", name: { en: "Apparel", fr: "Vetements" } },
  { id: "art", name: { en: "Art & Prints", fr: "Art & Impressions" } }
]

export default function ShopPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const language = currentLanguage.code // Declare the language variable
  const t = (obj: { en: string; fr: string } | null) => {
    if (!obj) return null
    return obj[lang as 'en' | 'fr'] || obj.en
  }

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://isolele.com" },
        { name: "Shop", url: "https://isolele.com/shop" }
      ]} />
      
      {/* Add product structured data for main product */}
      <ProductJsonLd
        name="Zaiire: Prince of Kongo - Necklace of Destiny"
        description="An uplifting action-packed adventure that echoes the Spirit of the Lion King and Black Panther"
        price={26.99}
        image="/images/isolele-logo.jpg"
        availability="PreOrder"
      />
      
      <main className="min-h-screen py-20" style={{ backgroundColor: 'var(--isolele-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--isolele-accent)' }}>
              {lang === 'fr' ? "BOUTIQUE" : "SHOP"}
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--isolele-text-secondary)' }}>
              {lang === 'fr'
                ? "Decouvrez notre collection de bandes dessinees, vetements et articles exclusifs de l'univers Isolele."
                : "Discover our collection of comics, apparel and exclusive items from the Isolele universe."}
            </p>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mb-16"
          >
            {[
              { icon: Truck, text: { en: "Free Shipping 50+", fr: "Livraison Gratuite 50+" } },
              { icon: Shield, text: { en: "Secure Payment", fr: "Paiement Securise" } },
              { icon: CreditCard, text: { en: "Easy Returns", fr: "Retours Faciles" } }
            ].map((badge, index) => (
              <div key={index} className="flex items-center gap-2" style={{ color: 'var(--isolele-text-secondary)' }}>
                <badge.icon className="w-5 h-5" style={{ color: 'var(--isolele-accent)' }} />
                <span>{t(badge.text)}</span>
              </div>
            ))}
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-6 py-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: category.id === 'all' ? 'var(--isolele-accent)' : 'var(--isolele-bg-secondary)',
                  color: category.id === 'all' ? '#000' : 'var(--isolele-text)',
                  border: '1px solid var(--isolele-accent)'
                }}
              >
                {t(category.name)}
              </button>
            ))}
          </motion.div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="rounded-2xl overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--isolele-bg-secondary)',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                {/* Product Image */}
                <div className="relative aspect-square">
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--isolele-bg)' }}
                  >
                    <Image
                      src="/images/isolele-logo.jpg"
                      alt={typeof product.name === 'string' ? product.name : (t(product.name) || '')}
                      width={200}
                      height={200}
                      className="object-contain opacity-50"
                    />
                  </div>
                  
                  {t(product.badge) && (
                    <span 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: 'var(--isolele-accent)', color: '#000' }}
                    >
                      {t(product.badge)}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--isolele-text)' }}>
                    {t(product.name)}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--isolele-text-secondary)' }}>
                    {t(product.subtitle)}
                  </p>

                  {/* Rating */}
                  {product.rating > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4"
                            style={{ 
                              color: i < Math.floor(product.rating) ? 'var(--isolele-accent)' : 'var(--isolele-bg)',
                              fill: i < Math.floor(product.rating) ? 'var(--isolele-accent)' : 'transparent'
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs" style={{ color: 'var(--isolele-text-secondary)' }}>
                        ({product.reviews})
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold" style={{ color: 'var(--isolele-accent)' }}>
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm line-through" style={{ color: 'var(--isolele-text-secondary)' }}>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: product.inStock ? 'var(--isolele-accent)' : 'var(--isolele-bg)',
                      color: product.inStock ? '#000' : 'var(--isolele-text-secondary)',
                      border: product.inStock ? 'none' : '1px solid var(--isolele-text-secondary)'
                    }}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock 
                      ? (lang === 'fr' ? "AJOUTER AU PANIER" : "ADD TO CART")
                      : (lang === 'fr' ? "BIENTOT DISPONIBLE" : "COMING SOON")}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 p-12 rounded-2xl text-center"
            style={{ 
              backgroundColor: 'var(--isolele-bg-secondary)',
              border: '2px solid var(--isolele-accent)'
            }}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--isolele-accent)' }}>
              {lang === 'fr' ? "RESTEZ INFORME" : "STAY INFORMED"}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--isolele-text-secondary)' }}>
              {lang === 'fr'
                ? "Inscrivez-vous a notre newsletter pour recevoir des mises a jour exclusives sur les nouvelles sorties et les offres speciales."
                : "Subscribe to our newsletter for exclusive updates on new releases and special offers."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder={lang === 'fr' ? "Votre email" : "Your email"}
                className="flex-1 px-6 py-3 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--isolele-bg)',
                  border: '1px solid var(--isolele-accent)',
                  color: 'var(--isolele-text)'
                }}
              />
              <Button
                style={{ backgroundColor: 'var(--isolele-accent)', color: '#000' }}
                className="px-8"
              >
                {lang === 'fr' ? "S'INSCRIRE" : "SUBSCRIBE"}
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
