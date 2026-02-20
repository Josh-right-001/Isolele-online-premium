import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans"
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
});

export const metadata: Metadata = {
  title: 'ISOLELE | Home of African Superheroes',
  description: 'Isolele est un univers visionnaire ne pour restaurer l\'ame du storytelling africain - un empire mythologique ou les Superheros sont choisis par le destin.',
  generator: 'Isolele Comics',
  keywords: ['African comics', 'superheroes', 'Kongo', 'mythology', 'Zaire', 'Kimoya', 'African storytelling'],
  authors: [{ name: 'We Love Congo' }],
  openGraph: {
    title: 'ISOLELE | Home of African Superheroes',
    description: 'Discover the mythological universe of African superheroes',
    url: 'https://isolele.com',
    siteName: 'ISOLELE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISOLELE | Home of African Superheroes',
    description: 'Discover the mythological universe of African superheroes',
  },
  icons: {
    icon: '/images/isolele-logo.jpg',
    apple: '/images/isolele-logo.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
