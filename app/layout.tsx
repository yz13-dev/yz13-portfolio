import type { Metadata } from 'next'
import { Spectral, Geologica } from 'next/font/google'
const first_font = Geologica({ subsets: ['latin', 'cyrillic'], weight: ['600', '500', '400', '300', '200'], variable: '--root-font' })
const second_font = Spectral({ subsets: ['latin', 'cyrillic'], weight: ['600', '400'], variable: '--second-font' })
import './globals.css'

export const metadata: Metadata = {
  title: 'YZ13',
  description: 'Created by DM Family',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${first_font.className} ${first_font.variable} ${second_font.variable}`}>
      <body className='min-h-screen dark'>{children}</body>
    </html>
  )
}
