import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '온라인 뱅킹 서비스',
  description: '안전하고 편리한 온라인 뱅킹 서비스',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-bank-background text-bank-text min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
