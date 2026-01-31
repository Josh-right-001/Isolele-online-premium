"use client"

import { HeroSection } from "@/components/home/hero-section"
import { UniverseSection } from "@/components/home/universe-section"
import { CharactersSection } from "@/components/home/characters-section"
import { NewsSection } from "@/components/home/news-section"
import { CTASection } from "@/components/home/cta-section"
import { StorySection } from "@/components/home/story-section"
import { ProductsSection } from "@/components/home/products-section"
import { FounderPreview } from "@/components/home/founder-preview"
import { CulturalImpact } from "@/components/home/cultural-impact"
import { ReviewsSection } from "@/components/home/reviews-section"
import { OrganizationJsonLd, ComicSeriesJsonLd, WebsiteJsonLd } from "@/components/json-ld"

export default function HomePage() {
  return (
    <>
      {/* SEO Structured Data */}
      <OrganizationJsonLd />
      <ComicSeriesJsonLd />
      <WebsiteJsonLd />
      
      {/* Page Sections - Extended for 8-9 scrolls */}
      <HeroSection />
      <UniverseSection />
      <StorySection />
      <CharactersSection />
      <ProductsSection />
      <FounderPreview />
      <CulturalImpact />
      <NewsSection />
      <ReviewsSection />
      <CTASection />
    </>
  )
}
