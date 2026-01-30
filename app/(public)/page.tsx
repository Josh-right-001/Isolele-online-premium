"use client"

import { HeroSection } from "@/components/home/hero-section"
import { UniverseSection } from "@/components/home/universe-section"
import { CharactersSection } from "@/components/home/characters-section"
import { NewsSection } from "@/components/home/news-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <UniverseSection />
      <CharactersSection />
      <NewsSection />
      <CTASection />
    </>
  )
}
