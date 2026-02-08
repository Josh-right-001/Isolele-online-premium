"use client"

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ISOLELE COMICS",
    "alternateName": ["Isolele", "We Love Congo", "African Superheroes"],
    "url": "https://isolele.com",
    "logo": "https://isolele.com/images/isolele-logo.jpg",
    "description": "Isolele est un univers visionnaire ne pour restaurer l'ame du storytelling africain - un empire mythologique ou les Superheros sont choisis par le destin.",
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "HRM King Kufulula",
        "jobTitle": "Royal Founder & Cultural Architect",
        "description": "Congolese royal figure, cultural architect, and founder of Isolele"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/isolelecomics",
      "https://www.facebook.com/isolelecomics",
      "https://twitter.com/isolelecomics",
      "https://www.youtube.com/@isolelecomics"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "French", "Portuguese", "Spanish", "Swahili", "Lingala"]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function ComicSeriesJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ComicSeries",
    "name": "Zaiire: The Prince of Kongo",
    "alternateName": "Le Prince du Kongo: Le Collier de la Destinee",
    "description": "Zaiire The Prince of Kongo: Necklace of Destiny is an uplifting action-packed adventure that echoes the Spirit of the Lion King and Black Panther, while offering young readers a Celebration of Heritage, Courage and Self-Discovery.",
    "publisher": {
      "@type": "Organization",
      "name": "ISOLELE COMICS"
    },
    "genre": ["Superhero", "African Mythology", "Fantasy", "Adventure"],
    "inLanguage": ["en", "fr"],
    "character": [
      {
        "@type": "Person",
        "name": "Zaiire",
        "description": "Prince of Kongo, chosen by the Necklace of Destiny"
      },
      {
        "@type": "Person",
        "name": "Kimoya",
        "description": "La Kandake Renaissante, Shadow Hunter"
      },
      {
        "@type": "Person",
        "name": "Zattar",
        "description": "L'Architecte de Sang"
      }
    ],
    "keywords": "African comics, Black superhero, Kongo, African mythology, superhero comics, African storytelling"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ISOLELE COMICS",
    "alternateName": "Isolele - Home of African Superheroes",
    "url": "https://isolele.com",
    "description": "Discover the mythological universe of African superheroes. Black African comics celebrating heritage, courage and self-discovery.",
    "inLanguage": ["en", "fr", "pt", "es", "sw", "ln"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://isolele.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ISOLELE COMICS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://isolele.com/images/isolele-logo.jpg"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function ProductJsonLd({ 
  name, 
  description, 
  price, 
  image,
  availability = "InStock" 
}: { 
  name: string
  description: string
  price: number
  image: string
  availability?: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Organization",
      "name": "ISOLELE COMICS"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD",
      "availability": `https://schema.org/${availability}`,
      "seller": {
        "@type": "Organization",
        "name": "ISOLELE COMICS"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
