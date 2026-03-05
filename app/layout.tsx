import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.reigate.co'),
  title: {
    default: 'Reigate Local Directory | Businesses, News & Guides',
    template: '%s | Reigate.co'
  },
  description: 'Find trusted local businesses, read the latest news, and discover what\'s happening in Reigate and surrounding areas. Your complete local directory and community guide.',
  keywords: [
    'Reigate',
    'Reigate Surrey', 
    'Reigate directory',
    'Reigate news',
    'Reigate businesses',
    'Reigate shops',
    'Reigate RH2',
    'local directory',
    'local news',
    'Surrey',
    'Redhill',
    'Horley',
    'Dorking'
  ],
  authors: [{ name: 'Reigate.co Team' }],
  creator: 'Reigate.co',
  publisher: 'Reigate.co',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.reigate.co',
    siteName: 'Reigate.co',
    title: 'Reigate.co — Local Directory & News',
    description: 'Find trusted local businesses, read the latest news, and discover what\'s happening in Reigate and surrounding areas.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reigate.co - Local Directory & News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reigate.co — Local Directory & News',
    description: 'Find trusted local businesses, read the latest news, and discover what\'s happening in Reigate and surrounding areas.',
    images: ['/og-image.png'],
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
  alternates: {
    canonical: 'https://www.reigate.co',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
