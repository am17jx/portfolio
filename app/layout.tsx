import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { personalInfo } from '@/lib/data'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: {
    default: `${personalInfo.name} | Full-Stack Developer`,
    template: `%s | ${personalInfo.name}`,
  },
  description:
    'Full-Stack Engineer (Node.js + React) graduating 2026 from Al-Nahrain University. Building scalable web apps and REST APIs from Baghdad, Iraq.',
  keywords: [
    'Ameer Ahmed',
    'full-stack developer',
    'Node.js developer',
    'React developer',
    'REST API developer',
    'software developer Baghdad',
    'Express.js',
    'PostgreSQL',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: `${personalInfo.name} Portfolio`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
      </head>
      <body className="font-sans antialiased bg-bg-primary text-slate-200">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
