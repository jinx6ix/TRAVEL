import type { Metadata } from "next"
import DestinationsClient from "@/components/destinations/DestinationsClient"

export const metadata: Metadata = {
  title: "East Africa Safari Destinations | JaeTravel Expeditions",
  description: "Explore Kenya, Tanzania, Rwanda, and Uganda safari destinations with expert guides from JaeTravel Expeditions. Book safaris, wildlife tours, and adventure trips.",
  keywords: [
    "Africa safaris",
    "Kenya safari",
    "Tanzania tours",
    "Rwanda gorilla trekking",
    "Uganda wildlife safari",
    "East Africa safari",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jaetravelexpeditions.com/destinations",
    siteName: "JaeTravel Expeditions",
    title: "East Africa Safari Destinations",
    description: "Explore Kenya, Tanzania, Rwanda, and Uganda safari destinations with expert guides from JaeTravel Expeditions.",
    images: [
      { url: "https://ik.imagekit.io/jinx/travel/ChatGPT%20Image%20Jun%2015,%202025,%2011_15_36%20PM.png", width: 1200, height: 630 }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@JaeTravel",
    creator: "@JaeTravel",
    title: "East Africa Safari Destinations",
    description: "Explore Kenya, Tanzania, Rwanda, and Uganda safari destinations with expert guides from JaeTravel Expeditions.",
  },
}
 const destinations = [
  {
    name: "Kenya Safari Destinations",
    slug: "kenya-safari-tours",
    image: "https://ik.imagekit.io/jinx/travel/ChatGPT%20Image%20Jun%2015,%202025,%2011_15_36%20PM.png?height=400&width=600",
    description: "Experience the heart of African safari with JaeTravel Expeditions in Kenya's famous Masai Mara, Amboseli, and diverse wildlife parks. Home to the Great Migration and Big Five sightings.",
    highlights: ["Masai Mara National Reserve", "Amboseli National Park", "Samburu National Reserve", "Lake Nakuru National Park"],
    tours: 12,
    bestTime: "July - October (Great Migration season)",
    wildlife: ["Big Five", "Great Migration Wildebeest", "Flamingos", "Elephants", "Lions", "Leopards"],
    activities: ["Game Drives", "Hot Air Balloon Safaris", "Maasai Cultural Visits", "Wildlife Photography", "Bird Watching"],
    country: "Kenya",
    region: "East Africa",
    bestFor: ["First-time safari travelers", "Photography enthusiasts", "Family safaris", "Great Migration viewing"]
  },
  {
    name: "Tanzania Safari Adventures",
    slug: "tanzania-safari-tours",
    image: "https://ik.imagekit.io/jinx/travel/b12582a3dc9844409c80d6aa5b1cf0d4.webp?height=400&width=600",
    description: "Discover Tanzania's iconic Serengeti, Ngorongoro Crater, and Mount Kilimanjaro. Premier destination for wildlife safaris and beach combinations with Zanzibar.",
    highlights: ["Serengeti National Park", "Ngorongoro Conservation Area", "Mount Kilimanjaro", "Zanzibar Island"],
    tours: 15,
    bestTime: "June - October (Dry season for wildlife viewing)",
    wildlife: ["Wildebeest Migration", "Lions", "Cheetahs", "Black Rhinos", "Elephants", "Giraffes"],
    activities: ["Mountain Climbing", "Beach Relaxation", "Spice Tours", "Scuba Diving", "Cultural Experiences"],
    country: "Tanzania",
    region: "East Africa",
    bestFor: ["Great Migration safaris", "Mountain climbing", "Beach & safari combos", "Luxury safari experiences"]
  },
  {
    name: "Rwanda Gorilla Trekking",
    slug: "rwanda-gorilla-trekking-tours",
    image: "https://ik.imagekit.io/jinx/travel/Webp.net-resizeimage.jpg?height=400&width=600",
    description: "The land of a thousand hills, Rwanda offers unforgettable mountain gorilla encounters in Volcanoes National Park and pristine rainforest experiences.",
    highlights: ["Volcanoes National Park", "Nyungwe Forest National Park", "Lake Kivu", "Kigali City"],
    tours: 8,
    bestTime: "June - September & December - February (Dry seasons)",
    wildlife: ["Mountain Gorillas", "Golden Monkeys", "Chimpanzees", "Bird Species", "Forest Elephants"],
    activities: ["Gorilla Trekking", "Canopy Walk", "Cultural Tours", "City Tours", "Primate Tracking"],
    country: "Rwanda",
    region: "East Africa",
    bestFor: ["Gorilla trekking", "Primate watching", "Cultural experiences", "Adventure travelers"]
  },
  {
    name: "Uganda Wildlife Safaris",
    slug: "uganda-safari-tours",
    image: "https://ik.imagekit.io/jinx/travel/paraa_safari_lodge_water_safari_on_the_nile-hi-edited.jpeg?height=400&width=600",
    description: "The Pearl of Africa with incredible biodiversity, gorilla trekking in Bwindi, and spectacular wildlife experiences in Queen Elizabeth and Murchison Falls National Parks.",
    highlights: ["Bwindi Impenetrable Forest", "Queen Elizabeth National Park", "Murchison Falls National Park", "Kibale National Park"],
    tours: 7,
    bestTime: "December - February & June - August (Dry seasons)",
    wildlife: ["Mountain Gorillas", "Chimpanzees", "Tree Climbing Lions", "Hippos", "Crocodiles", "Elephants"],
    activities: ["Primate Tracking", "Boat Safaris", "White Water Rafting", "Hiking", "Bird Watching"],
    country: "Uganda",
    region: "East Africa",
    bestFor: ["Gorilla and chimp trekking", "Budget safaris", "Adventure activities", "Bird watching"]
  },
]

// Generate JSON-LD structured data for all destinations
const generateStructuredData = () => {
  return destinations.map(dest => ({
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Karen Road",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    "name": dest.name,
    "description": dest.description,
    "image": dest.image,
    "touristType": dest.bestFor.join(", "),
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "0", // optional, can add if known
      "longitude": "0"
    },
    "containsPlace": dest.highlights.map(place => ({
      "@type": "LandmarksOrHistoricalBuildings",
      "name": place
    })),
    "activity": dest.activities.map(act => ({
      "@type": "TouristActivity",
      "name": act
    })),
    "wildlife": dest.wildlife
  }))
}

export default function DestinationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />
      <DestinationsClient destinations={destinations} />
    </>
  )
}
