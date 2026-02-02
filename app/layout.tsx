import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TarotCEO - Strategic Decisions, Clear Perspectives',
  description: 'Tarot as a tool for strategic thinking. Not mystical predictions, but lateral perspectives for business decisions.',
  metadataBase: new URL('https://tarot.duendes.app'),
  manifest: '/manifest.json',
  themeColor: '#8b5cf6',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TarotCEO',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  openGraph: {
    title: 'TarotCEO - Strategic Decisions',
    description: 'Tarot for professionals. Clear decisions through new perspectives.',
    url: 'https://tarot.duendes.app',
    siteName: 'TarotCEO',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans text-white antialiased">{children}</body>
    </html>
  )
}
