import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIBookingAssistant } from "@/components/ai-booking-assistant"
import { LanguageProvider } from "@/hooks/useLanguage"
import { pageKeywords } from "@/lib/keywords"
import DynamicSEO from "@/components/dynamic-seo"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // ✅ reduces CLS
})

// --- DEFAULT KEYWORDS ---
const defaultKeywords: string[] = [
  "African Safari",
  "Luxury Safari Tours",
  "Kenya Safari Packages",
  "Tanzania Serengeti Tours",
  "Uganda Gorilla Trekking",
  "Rwanda Safari Holidays",
  "East Africa Travel",
  "Wildlife Safari Expeditions",
  "Luxury African Vacations",
]

// --- DEFAULT METADATA ---
export const defaultMetadata: Metadata = {
  title: {
    default: "JaeTravel Expeditions | Premium African Safari Experiences",
    template: "%s | JaeTravel Expeditions",
  },
  description:
    "Luxury safari tours and bespoke travel experiences in East Africa. Explore Kenya, Tanzania, Rwanda & Uganda with our expert guides. Book your dream African adventure today.",
  keywords: defaultKeywords,
  icons: {
    icon: "https://ik.imagekit.io/jinx/travel/logo.jpg?updatedAt=1751985025367",
    apple: "https://ik.imagekit.io/jinx/travel/logo.jpg?updatedAt=1751985025367",
  },
  authors: [{ name: "Ian Iraya", url: "https://jaetravel.com" }],
  creator: "Ian Iraya",
  publisher: "Ian Iraya",
  metadataBase: new URL("https://jaetravel.com"),
  alternates: {
    canonical: "/",
    languages: { "en-US": "/en-US" },
  },
  openGraph: {
    title: "JaeTravel Expeditions | Premium African Safari Experiences",
    description:
      "Luxury safari tours and bespoke travel experiences in East Africa. Book your dream African adventure today.",
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
    description:
      "Luxury safari tours and bespoke travel experiences in East Africa",
    images: [
      "https://ik.imagekit.io/jinx/travel/logo.jpg?updatedAt=1751985025367",
    ],
    creator: "@jaetravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: { yandex: "b585127e41b6a92f" },
  category: "travel & tourism",
}

// --- SERVER-SIDE DYNAMIC METADATA ---
export async function generateMetadata({
  params,
}: {
  params?: Record<string, string | string[]>
} = {}): Promise<Metadata> {
  const path =
    params && Object.keys(params).length > 0
      ? "/" + Object.values(params).flat().map(String).join("/")
      : "/"

  const matched = pageKeywords.find((item) => item.url === path)

  if (!matched) return defaultMetadata

  return {
    ...defaultMetadata,
    title: {
      default: matched.metaTitle,
      template: "%s | JaeTravel Expeditions",
    },
    description: matched.metaDescription,
    keywords:
      "keywords" in matched
        ? (matched.keywords as string[] | undefined)
        : defaultKeywords,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: matched.metaTitle,
      description: matched.metaDescription,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: matched.metaTitle,
      description: matched.metaDescription,
    },
  }
}

// --- ROOT LAYOUT ---
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Preconnect for faster FCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* ✅ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Jae Travel Expeditions",
              url: "https://jaetravel.com",
              logo: "https://jaetravel.com/logo.png",
              sameAs: [
                "https://www.facebook.com/jaetravel",
                "https://twitter.com/jaetravel",
                "https://www.instagram.com/jaetravel",
              ],
              description:
                "Jae Travel Expeditions offers guided East Africa safaris including Kenya, Tanzania, Uganda & Rwanda safari packages.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Nairobi CBD",
                addressLocality: "Nairobi",
                addressCountry: "Kenya",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+254-726-485-228",
                contactType: "Customer Service",
              },
              areaServed: ["Kenya", "Tanzania", "Uganda", "Rwanda"],
              serviceType: "Safari Tours & Travel Packages",
            }),
          }}
        />
      </head>

      <body className={inter.className}>
        {/* GTM (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5MCS8TS6"
            height="0"
            width="0"
            loading="lazy"
            style={{ display: "none", visibility: "hidden" }}
          />
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
            <DynamicSEO />
            <Footer />
            <AIBookingAssistant />
          </ThemeProvider>
        </LanguageProvider>

        {/* ✅ Load analytics AFTER interactive (reduces TBT) */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5MCS8TS6');
          `}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q6Y2Y3PSXH"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q6Y2Y3PSXH');
          `}
        </Script>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
