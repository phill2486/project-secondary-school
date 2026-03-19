import './globals.css'
import type { Metadata } from 'next'
import ClientLayout from '@/components/layout/ClientLayout'

export const metadata: Metadata = {
  title: 'Kampala Preparatory School',
  description: 'Soaring To Excellence — Nurturing Uganda\'s next generation of leaders in Kitebi, Kampala.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}