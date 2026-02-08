"use client"

import { useState, useEffect, type ReactNode } from "react"
import { ThemeProvider } from "@/lib/theme-context"
import { LanguageProvider } from "@/lib/language-context"
import { CartProvider } from "@/lib/cart-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingScreen } from "@/components/loading-screen"
import { CartDrawer } from "@/components/cart-drawer"
import { AnalyticsProvider } from "@/components/analytics-provider"

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
        <CartProvider>
          <AnalyticsProvider>
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
              <CartDrawer />
            </div>
          </AnalyticsProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
