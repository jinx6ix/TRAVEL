import type { Metadata } from "next"
import KenyaClient from "./KenyaClient"

export const metadata: Metadata = {
  title: "Kenya Safari Tours - JaeTravel Expeditions",
  description:
    "Experience Kenya safaris including Masai Mara, Amboseli, Samburu, and Lake Nakuru with JaeTravel Expeditions. Guided tours, Big Five sightings, and the Great Migration.",
  openGraph: {
    title: "Kenya Safari Tours - JaeTravel Expeditions",
    description:
      "Discover Masai Mara, Amboseli, Samburu, and Lake Nakuru. Book Kenya safari tours with JaeTravel Expeditions.",
    url: "https://jaetravel.com/destinations/kenya",
    siteName: "JaeTravel Expeditions",
    images: [
      {
        url: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg",
        width: 1200,
        height: 630,
        alt: "Kenya Safari Tours - Masai Mara",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://jaetravel.com/destinations/kenya",
  },
}

export default function KenyaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Kenya Safari Tours - JaeTravel Expeditions",
    description:
      "Experience the best Kenya safari tours including Masai Mara, Amboseli, Samburu, and Lake Nakuru with expert guides from JaeTravel Expeditions.",
    url: "https://jaetravel.com/destinations/kenya",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Kenya",
    },
  }

  return (
    <div className="min-h-screen pt-16">
      {/* ✅ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ Header Section in Server (SEO Critical) */}
      <header className="bg-gradient-to-r from-green-600 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            🇰🇪 Kenya Safari Tours - JaeTravel Expeditions
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the ultimate African safari in Kenya’s famous Masai Mara,
            Amboseli, Samburu, and Lake Nakuru with expert guides.
          </p>
        </div>
      </header>

      {/* ✅ Client Component (Animations + UI Sections) */}
      <KenyaClient />
    </div>
  )
}
