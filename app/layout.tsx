import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: "Slotly — Modern Appointment Booking SaaS",
    template: "%s | Slotly",
  },
  description:
    "Slotly is a full-stack appointment booking SaaS for modern service businesses and boutique studios.",
  keywords: [
    "appointment booking",
    "scheduling saas",
    "client bookings",
    "calendar automation",
    "drizzle orm",
    "nextjs 15",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
