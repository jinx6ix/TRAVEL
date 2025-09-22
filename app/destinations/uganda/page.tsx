import type { Metadata } from "next"
import UgandaClient from "./UgandaPageClient"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Uganda Safari Tours & Gorilla Trekking | JaeTravel",
  description:
    "Discover Uganda, the Pearl of Africa, with JaeTravel Expeditions. Experience gorilla trekking in Bwindi, wildlife safaris in Queen Elizabeth Park, and the majestic Murchison Falls.",
  keywords: [
    "Uganda safari",
    "Uganda tours",
    "Bwindi gorilla trekking",
    "Queen Elizabeth National Park",
    "Murchison Falls safari",
    "Rwenzori Mountains trekking",
    "Uganda holidays",
    "JaeTravel Expeditions",
  ],
  openGraph: {
    title: "Uganda Safari Tours & Gorilla Trekking | JaeTravel",
    description:
      "Join JaeTravel Expeditions to explore Uganda’s wildlife — gorilla trekking, national parks, and unique adventures.",
    url: "https://jaetravel.com/destinations/uganda",
    siteName: "JaeTravel",
    images: [
      {
        url: "https://ik.imagekit.io/jinx/travel/bwindi-forest-uganda-gorilla-safaris.jpg",
        width: 1200,
        height: 630,
        alt: "Uganda Safari Tours — JaeTravel Expeditions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uganda Safari Tours | Gorilla Trekking with JaeTravel",
    description:
      "Book Uganda tours with JaeTravel — gorilla trekking, wildlife safaris, and cultural adventures.",
    images: ["https://ik.imagekit.io/jinx/travel/bwindi-forest-uganda-gorilla-safaris.jpg"],
  },
  alternates: {
    canonical: "https://jaetravel.com/destinations/uganda",
  },
}

export default function Page() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jaetravel.com/" },
      { "@type": "ListItem", position: 2, name: "Destinations", item: "https://jaetravel.com/destinations" },
      { "@type": "ListItem", position: 3, name: "Uganda", item: "https://jaetravel.com/destinations/uganda" },
    ],
  }

  const destinationLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Uganda",
    description:
      "Uganda, the Pearl of Africa, offers gorilla trekking, wildlife safaris, and breathtaking landscapes.",
    image: "https://ik.imagekit.io/jinx/travel/bwindi-forest-uganda-gorilla-safaris.jpg",
    geo: { "@type": "GeoCoordinates", latitude: 1.3733, longitude: 32.2903 },
    touristType: ["Wildlife lovers", "Adventure seekers", "Nature explorers"],
  }

  return (
    <>
      {/* Header moved to server for SEO (H1 visible to crawlers immediately) */}
      <header className="bg-gradient-to-r from-red-600 to-yellow-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">🇺🇬 Uganda - The Pearl of Africa</h1>
          <p className="text-xl mb-8">
            Incredible biodiversity and primate experiences in the heart of Africa
          </p>
        </div>
      </header>

      {/* Client component — animations & UI */}
      <UgandaClient />

      {/* Structured data (JSON-LD) — kept in server markup for crawlers */}
      <Script id="ld-json-breadcrumb" type="application/ld+json">
        {JSON.stringify(breadcrumbLd)}
      </Script>

      <Script id="ld-json-destination" type="application/ld+json">
        {JSON.stringify(destinationLd)}
      </Script>
    </>
  )
}
