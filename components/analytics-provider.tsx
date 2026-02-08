"use client"

import { useEffect, useCallback, type ReactNode } from "react"
import { usePathname } from "next/navigation"

// Lightweight analytics provider for Isolele
// Tracks page views and custom events without external dependencies
// Ready for PostHog, Plausible, or any analytics provider when keys are added

interface AnalyticsEvent {
  name: string
  properties?: Record<string, string | number | boolean>
}

// Event queue for when analytics loads async
const eventQueue: AnalyticsEvent[] = []
let analyticsReady = false

// Custom event tracker
export function trackEvent({ name, properties }: AnalyticsEvent) {
  if (typeof window === "undefined") return

  // Check Do Not Track
  if (navigator.doNotTrack === "1") return

  const event = { name, properties }

  if (!analyticsReady) {
    eventQueue.push(event)
  }

  // Send to PostHog if available on window
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (posthogKey && typeof window !== "undefined" && (window as Record<string, unknown>).posthog) {
    const ph = (window as Record<string, unknown>).posthog as { capture: (name: string, props?: Record<string, string | number | boolean>) => void }
    ph.capture(name, properties)
  }

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${name}`, properties)
  }
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    analyticsReady = true
    // Flush queued events
    while (eventQueue.length > 0) {
      const event = eventQueue.shift()
      if (event) trackEvent(event)
    }
  }, [])

  // Track page views on route change
  const trackPageView = useCallback(() => {
    trackEvent({
      name: "page_view",
      properties: {
        path: pathname,
        referrer: typeof document !== "undefined" ? document.referrer : "",
        title: typeof document !== "undefined" ? document.title : "",
      },
    })
  }, [pathname])

  useEffect(() => {
    trackPageView()
  }, [trackPageView])

  return <>{children}</>
}

// Utility: track CTA clicks
export function useTrackCTA() {
  return (ctaName: string, destination?: string) => {
    trackEvent({
      name: "cta_click",
      properties: { cta_name: ctaName, destination: destination || "" },
    })
  }
}

// Utility: track product events (add to cart, view, etc.)
export function useTrackProductEvent() {
  return (action: string, productId: string, productName: string) => {
    trackEvent({
      name: `product_${action}`,
      properties: { product_id: productId, product_name: productName },
    })
  }
}
