// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/hooks/useLanguage";
import { SEO } from "@/config/seo.config";

const inter = Inter({ subsets: ["latin"] });

// Default metadata for the entire site
export const metadata: Metadata = {
  metadataBase: new URL(SEO.canonical || "https://jaetravel.com"),
  title: {
    default: SEO.defaultTitle || "Jae Travel Expeditions",
    template: "%s | Jae Travel Expeditions",
  },
  description: SEO.defaultDescription || "Discover unforgettable safari adventures with Jae Travel Expeditions. Book your dream tour today!",
  keywords: SEO.keywords || [
    "safari tours",
    "african adventures",
    "travel expeditions",
    "wildlife safaris",
    "Jae Travel",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SEO.canonical,
    siteName: "Jae Travel Expeditions",
    title: SEO.defaultTitle || "Jae Travel Expeditions",
    description: SEO.defaultDescription || "Discover unforgettable safari adventures with Jae Travel Expeditions.",
    images: [
      {
        url: SEO.logo || "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jae Travel Expeditions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@JaeTravel",
    creator: "@JaeTravel",
    title: SEO.defaultTitle || "Jae Travel Expeditions",
    description: SEO.defaultDescription || "Discover unforgettable safari adventures with Jae Travel Expeditions.",
    images: [SEO.logo || "/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: SEO.verification || {},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-Q6Y2Y3PSXH"; // Fallback GA4 ID
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5MCS8TS6"; // Fallback GTM ID

  // Default structured data (TravelAgency + WebSite)
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Karen Road",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    name: SEO.organizationName || "Jae Travel Expeditions",
    url: SEO.canonical || "https://jaetravel.com",
    logo: SEO.logo || "/logo.svg",
    description: SEO.defaultDescription || "Discover unforgettable safari adventures with Jae Travel Expeditions.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SEO.contactPhone || "+254726485228",
      contactType: "Customer Service",
      email: SEO.contactEmail || "info@jaetravel.com",
    },
    sameAs: SEO.socials || [
      "https://www.facebook.com/JaeTravelExpeditions",
      "https://www.instagram.com/jaetravelexpeditions/",
      "https://www.tiktok.com/@jaetravelexpeditions",
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Karen Road",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    name: SEO.defaultTitle || "Jae Travel Expeditions",
    url: SEO.canonical || "https://jaetravel.com",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SEO.canonical || "https://jaetravel.com"}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Basic SEO / meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={SEO.canonical || "https://jaetravel.com"} />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />

        {/* Preload critical assets */}
        <link rel="preload" href="/logo.svg" as="image" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

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
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {/* Providers */}
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navbar />
            <main>{children}</main> {/* Ensures page-specific content inherits SEO */}
            <Footer />
          </ThemeProvider>
        </LanguageProvider>

        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}