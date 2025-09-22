import type { Metadata } from "next"
import Script from "next/script"
import DisabilityToursClient from "./DisabilityToursClient"

export const metadata: Metadata = {
  title: "Accessible Kenya Safari Tours | Disability-Friendly Travel | JaeTravel Expeditions",
  description:
    "Experience Kenya's wildlife with our fully accessible safari tours. Wheelchair-friendly vehicles, adapted accommodations, and trained staff for travelers with disabilities.",
  keywords: [
    "accessible kenya safari",
    "disability tours kenya",
    "wheelchair friendly safari",
    "accessible travel africa",
    "special needs safari",
    "mobility impaired kenya tours",
    "adapted safari vehicles",
    "barrier-free kenya travel",
    "inclusive safari experiences",
    "disabled travel kenya",
  ],
  openGraph: {
    title: "Accessible Kenya Safari Tours | JaeTravel Expeditions",
    description: "Fully accessible safari experiences in Kenya for travelers with disabilities",
    type: "website",
    locale: "en_US",
    url: "https://www.jaetravel.com/disability-tours-kenya",
    images: [
      {
        url: "https://ik.imagekit.io/jinx/travel/accessible-safari-kenya.jpg?updatedAt=1750073000000",
        width: 1200,
        height: 630,
        alt: "Accessible Kenya Safari Tour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessible Kenya Safari Tours | JaeTravel Expeditions",
    description: "Fully accessible safari experiences in Kenya for travelers with disabilities",
  },
  robots: "index, follow",
  authors: [{ name: "JaeTravel Expeditions" }],
  publisher: "JaeTravel Expeditions",
  verification: {
    google: "your-google-verification-code",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Accessible Kenya Safari Tours",
  description:
    "Fully accessible safari experiences in Kenya for travelers with disabilities",
  url: "https://www.jaetravel.com/disability-tours-kenya",
  address: { "@type": "PostalAddress", addressCountry: "Kenya" },
  accessibilityFeature: [
    "wheelchairAccessible",
    "accessibleVehicle",
    "barrierFreeAccess",
    "trainedStaff",
  ],
  touristType: ["Disabled visitors", "Wheelchair users", "Mobility impaired visitors"],
}

export default function DisabilityToursPage() {
  return (
    <>
      {/* SEO-friendly header in server component */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Accessible Kenya Safari Tours
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Fully wheelchair-accessible vehicles, adapted lodges, and trained
            staff — making safaris in Kenya barrier-free and inclusive.
          </p>
        </div>
      </header>

      {/* Client-side interactive content */}
      <DisabilityToursClient />

      {/* Structured Data JSON-LD */}
      <Script id="ld-json-disability-tours" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  )
}
