import type { Metadata } from "next"
import { SEO } from "@/config/seo.config"
import AboutPageClient from "./AboutPageClient" // we’ll move your big UI into a client component

export const metadata: Metadata = {
  title: `About Us | ${SEO.defaultTitle}`,
  description:
    "Meet the JaeTravel Expeditions team – trusted East African safari experts with 15+ years of experience delivering unforgettable journeys.",
  alternates: {
    canonical: `${SEO.canonical}/about`,
  },
  openGraph: {
    title: "About JaeTravel Expeditions - Safari Experts",
    description:
      "Since 2009, JaeTravel Expeditions has crafted authentic safari adventures across Kenya, Uganda, Tanzania, and Rwanda.",
    url: `${SEO.canonical}/about`,
    siteName: SEO.siteName,
    images: SEO.openGraph.images,
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About JaeTravel Expeditions - Safari Experts",
    description:
      "Discover the story, values, and team behind East Africa’s most trusted safari operator.",
    images: SEO.openGraph.images,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
}

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JaeTravel Expeditions",
    url: `${SEO.canonical}/about`,
    logo: `${SEO.canonical}/logo.png`,
    description:
      "Your trusted partner for unforgettable East African safari experiences since 2009.",
    foundingDate: "2009",
    founder: {
      "@type": "Person",
      name: "John Safari",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254726485228",
      contactType: "customer service",
      areaServed: "KE, UG, TZ, RW",
      availableLanguage: ["English", "Swahili"],
    },
    sameAs: [
      "https://www.facebook.com/jaetravel",
      "https://www.instagram.com/jaetravel",
    ],
  }

  return (
    <>
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Client-side UI */}
      <AboutPageClient />
    </>
  )
}
