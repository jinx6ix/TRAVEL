import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIBookingAssistant } from "@/components/ai-booking-assistant"
import { LanguageProvider } from "@/hooks/useLanguage"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JaeTravel",
  description: "Discover the best safari experiences in Kenya, Tanzania, Rwanda, and Uganda",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="light" 
            enableSystem 
            disableTransitionOnChange
          >
            <Navbar />
            <main>{children}</main>
            <Footer />
            <AIBookingAssistant />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}