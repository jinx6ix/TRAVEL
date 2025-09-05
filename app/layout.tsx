// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/hooks/useLanguage"

const inter = Inter({ subsets: ["latin"] })

// Default metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://jaetravelexpeditions.com"),
  title: {
    default: "Jae Travel Expeditions",
    template: "%s | Jae Travel Expeditions",
  },
  description:
    "Book unforgettable safaris in Kenya, Tanzania, Uganda, and Rwanda. Explore wildlife, culture, and adventure with Jae Travel Expeditions.",
  keywords: [
    "africa safaris",
    "kenya safari",
    "tanzania tours",
    "uganda gorilla trekking",
  ],
    // ✅ Add icons
    icons: {
      icon: "/logo.ico", // browser tab
      shortcut: "/logo.ico",
      apple: "/logo.png",   // Apple touch icon
    },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jaetravelexpeditions.com",
    siteName: "Jae Travel Expeditions",
    title: "Jae Travel Expeditions",
    description: "Unforgettable Africa Safaris and Tours",
    images: [
      {
        url: "/logo.png", // <-- Your logo
        width: 500,
        height: 500,
        alt: "Jae Travel Expeditions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@JaeTravel",
    creator: "@JaeTravel",
    title: "Jae Travel Expeditions",
    description: "Africa Safari Packages and Tours",
    images: ["/logo.png"], // <-- Your logo
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Jae Travel Expeditions",
    url: "https://jaetravelexpeditions.com",
    logo: "https://jaetravelexpeditions.com/logo.png", // <-- absolute path for Google
    description:
      "Book unforgettable safaris in Kenya, Tanzania, Uganda, and Rwanda with Jae Travel Expeditions.",
    sameAs: [
      "https://www.facebook.com/jaetravel",
      "https://www.instagram.com/jaetravel",
      "https://twitter.com/jaetravel",
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5MCS8TS6');`}
        </Script>

        {/* Global JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5MCS8TS6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </LanguageProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
