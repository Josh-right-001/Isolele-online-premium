"use client"

import { useState, useEffect, type ReactNode } from "react"
import { ThemeProvider } from "@/lib/theme-context"
import { LanguageProvider } from "@/lib/language-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingScreen } from "@/components/loading-screen"

export default function PublicLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem("isolele-visited")
    if (hasVisited) {
      setIsLoading(false)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    sessionStorage.setItem("isolele-visited", "true")
  }

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        <div 
          className="min-h-screen flex flex-col transition-colors duration-800"
          style={{ 
            backgroundColor: "var(--isolele-bg)",
            color: "var(--isolele-text)"
          }}
        >
          <SiteHeader />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <SiteFooter />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
