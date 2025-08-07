import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIBookingAssistant } from "@/components/ai-booking-assistant"
import { LanguageProvider } from "@/hooks/useLanguage"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "JaeTravel Expeditions | Premium African Safari Experiences",
    template: "%s | JaeTravel Expeditions"
  },
  icons: {
    icon: 'https://ik.imagekit.io/jinx/travel/logo.jpg?updatedAt=1751985025367',
    apple: 'https://ik.imagekit.io/jinx/travel/logo.jpg?updatedAt=1751985025367',
  },
  description: "Luxury safari tours and bespoke travel experiences in East Africa. Explore Kenya, Tanzania, Rwanda & Uganda with our expert guides. Book your dream African adventure today.",
  keywords: [
    "African safari",
    "luxury travel Kenya",
    "Tanzania tours",
    "Rwanda gorilla trekking",
    "Uganda wildlife",
    "bespoke safari",
    "private guided tours",
    "East Africa travel",
    "safari packages",
    "wildlife photography tours"
  ],
  authors: [{ name: "JaeTravel Expeditions", url: "https://jaetravel.com" }],
  creator: "JaeTravel Expeditions",
  publisher: "JaeTravel Expeditions",
  metadataBase: new URL('https://jaetravel.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: "JaeTravel Expeditions | Premium African Safari Experiences",
    description: "Luxury safari tours and bespoke travel experiences in East Africa. Book your dream African adventure today.",
    url: "https://jaetravel.com",
    siteName: "JaeTravel Expeditions",
    images: [
      {
        url: "https://ik.imagekit.io/jinx/travel/logo.jpg?updatedAt=1751985025367",
        width: 1200,
        height: 630,
        alt: "JaeTravel Expeditions Safari Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JaeTravel Expeditions | Premium African Safari Experiences",
    description: "Luxury safari tours and bespoke travel experiences in East Africa",
    images: ["https://ik.imagekit.io/jinx/travel/logo.jpg?updatedAt=1751985025367"],
    creator: "@jaetravel",
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
    yandex: 'b585127e41b6a92f',
  },
  category: "travel & tourism",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5MCS8TS6');
            `,
          }}
        />
        
        {/* Optional: Google Analytics (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q6Y2Y3PSXH"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q6Y2Y3PSXH');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5MCS8TS6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

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

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
