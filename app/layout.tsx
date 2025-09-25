// app/layout.tsx — fully updated for GA4, structured data, default SEO, Open Graph, and auto page SEO
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
import { SEO } from "@/config/seo.config"

const inter = Inter({ subsets: ["latin"] })

// Default metadata for the entire site
export const metadata: Metadata = {
  metadataBase: new URL(SEO.canonical || "https://jaetravel.com"),
  title: {
    default: SEO.defaultTitle || "Jae Travel Expeditions",
    template: "%s | Jae Travel Expeditions",
  },
  description: SEO.defaultDescription,
  keywords: SEO.keywords || [],
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SEO.canonical,
    siteName: "Jae Travel Expeditions",
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [
      {
        url: SEO.logo || "/logo.png",
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
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [SEO.logo || "/logo.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-Q6Y2Y3PSXH" // Your GA4 Measurement ID
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5MCS8TS6"

  // Default structured data (Organization + Website)
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SEO.organizationName || "Jae Travel Expeditions",
    url: SEO.canonical,
    logo: SEO.logo || `${SEO.canonical}/logo.png`,
    description: SEO.defaultDescription,
    sameAs: SEO.socials || [
      "https://www.facebook.com/JaeTravelExpeditions",
      "https://www.instagram.com/jaetravelexpeditions/",
      "https://twitter.com/jaetravel",
    ],
  }

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO.defaultTitle,
    url: SEO.canonical,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SEO.canonical}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Basic SEO / meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={SEO.canonical} />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* GA4 tracking */}
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}', { send_page_view: true });
              `}
            </Script>
          </>
        )}

        {/* GTM */}
        {GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}

        {/* Default structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>

      <body className={inter.className}>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Providers */}
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navbar />
            {children} {/* Every page (including Tours & Offers) inherits SEO, OG & GA4 */}
            <Footer />
          </ThemeProvider>
        </LanguageProvider>

        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
