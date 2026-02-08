import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
  title: 'ISOLELE COMICS | Home of African Superheroes | Zaiire Prince of Kongo',
  description: 'Isolele est un univers visionnaire ne pour restaurer l\'ame du storytelling africain - un empire mythologique ou les Superheros sont choisis par le destin. Decouvrez Zaiire, le Prince du Kongo et son Collier de la Destinee.',
  generator: 'Isolele Comics',
  keywords: [
    // English keywords
    'Black African superhero comics', 'African comics universe', 'Afrocentric comic book universe',
    'African mythology comics', 'Black-owned comic book franchise', 'Afro-futurism comics Africa',
    'African graphic novel series', 'Pan-African superhero universe', 'Afro fantasy comic books',
    'African cultural comics', 'Black excellence comic universe', 'Isolele comics',
    'Zaiire Prince of Kongo', 'Necklace of Destiny', 'Kimoya Kandake', 'African superheroes',
    'Congo comics', 'Kongo mythology', 'African storytelling', 'Black Panther alternative',
    'Lion King inspired', 'African heritage comics', 'We Love Congo',
    // French keywords
    'bande dessinee africaine moderne', 'comics africains heros', 'bande dessinee noire et africaine',
    'comics africains independants', 'super-heros africains', 'BD africaine',
    // Spanish keywords
    'comics africanos', 'superheroes africanos', 'comic afrodescendiente',
    // Portuguese keywords
    'quadrinhos africanos', 'super-herois africanos',
    // Swahili keywords
    'katuni za Afrika', 'mashujaa wa Afrika',
    // Lingala keywords
    'bandi dessinee ya Afrika', 'heros ya Afrika',
    // Kikongo keywords
    'bisalu bia mikanda mia Afrika',
    // Yoruba keywords
    'itan apanilerin Afirika',
    // Chinese keywords
    '非洲漫画', '非洲超级英雄', '黑人漫画', '非洲神话漫画', '非洲未来主义漫画',
    // Korean keywords
    '아프리카 만화', '아프리카 슈퍼히어로', '흑인 만화', '아프리카 신화 만화',
    // Russian keywords
    'Африканские комиксы', 'Африканские супергерои', 'Афрофутуризм комиксы'
  ],
  authors: [{ name: 'HRM King Kufulula' }, { name: 'Isolele Comics' }, { name: 'We Love Congo' }],
  creator: 'HRM King Kufulula - Isolele Comics',
  publisher: 'Isolele Comics',
  category: 'Comics & Graphic Novels',
  classification: 'African Superhero Comics',
  openGraph: {
    title: 'ISOLELE COMICS | Home of African Superheroes',
    description: 'Discover Zaiire, the Prince of Kongo and the mythological universe of African superheroes. Black African comics celebrating heritage, courage and self-discovery.',
    url: 'https://isolele.com',
    siteName: 'ISOLELE COMICS',
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US', 'pt_BR', 'es_ES', 'sw_TZ', 'ln_CD', 'zu_ZA'],
    images: [
      {
        url: '/images/isolele-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'ISOLELE - African Superheroes Universe',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISOLELE COMICS | Home of African Superheroes',
    description: 'Discover Zaiire, the Prince of Kongo. Black African superhero comics celebrating heritage and African mythology.',
    images: ['/images/isolele-logo.jpg'],
    creator: '@isolelecomics',
    site: '@isolelecomics',
  },
  icons: {
    icon: '/images/isolele-logo.jpg',
    apple: '/images/isolele-logo.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://isolele.com',
    languages: {
      'en-US': 'https://isolele.com/en',
      'fr-FR': 'https://isolele.com/fr',
      'pt-BR': 'https://isolele.com/pt',
      'es-ES': 'https://isolele.com/es',
    },
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
        <SpeedInsights />
      </body>
    </html>
  )
}
