import { Metadata } from "next"
import RwandaClient from "./RwandaClient"

export const metadata: Metadata = {
  title: "Rwanda Safari Tours & Destinations | JaeTravel Expeditions",
  description:
    "Discover Rwanda, the Land of a Thousand Hills. Gorilla trekking, Nyungwe Forest canopy walks, Akagera safaris and Lake Kivu adventures with JaeTravel Expeditions.",
  openGraph: {
    title: "Rwanda Safari Tours & Destinations | JaeTravel Expeditions",
    description:
      "Explore Rwanda's top highlights: Volcanoes National Park, Nyungwe, Lake Kivu, Akagera National Park. Book gorilla trekking & safari tours today.",
    url: "https://jaetravel.com/destinations/rwanda",
    type: "website",
  },
}

const rwandaHighlights = [
  {
    name: "Volcanoes National Park",
    image: "https://ik.imagekit.io/jinx/travel/Volcanoes-National-Park-Rwanda-Natural-World-Kenya-Safaris.jpg?updatedAt=1750019933313",
    description: "Home to mountain gorillas and golden monkeys in the Virunga Mountains.",
    bestTime: "June - September",
    activities: ["Gorilla Trekking", "Golden Monkey Tracking", "Volcano Hiking"],
    wildlife: ["Mountain Gorillas", "Golden Monkeys", "Forest Birds"],
  },
  {
    name: "Nyungwe Forest National Park",
    image: "https://ik.imagekit.io/jinx/travel/nyungwe-forests.jpg?updatedAt=1750019999650",
    description: "Ancient rainforest with canopy walkway and diverse primates.",
    bestTime: "June - September",
    activities: ["Canopy Walk", "Chimpanzee Tracking", "Bird Watching"],
    wildlife: ["Chimpanzees", "Colobus Monkeys", "300+ Bird Species"],
  },
  {
    name: "Lake Kivu",
    image: "https://ik.imagekit.io/jinx/travel/images%20(4).jpeg?updatedAt=1750015334762",
    description: "One of Africa's Great Lakes with stunning scenery and relaxation.",
    bestTime: "Year-round",
    activities: ["Boat Trips", "Swimming", "Cycling", "Coffee Tours"],
    wildlife: ["Fish Eagles", "Kingfishers", "Various Fish Species"],
  },
  {
    name: "Akagera National Park",
    image: "https://ik.imagekit.io/jinx/travel/Akagera-national-park-1-750x450.jpg?updatedAt=1750015552704",
    description: "Rwanda's only savanna park with Big Five and diverse ecosystems.",
    bestTime: "June - September",
    activities: ["Game Drives", "Boat Safaris", "Bird Watching"],
    wildlife: ["Lions", "Elephants", "Rhinos", "Hippos"],
  },
]

const rwandaTours = [
  {
    id: 28,
    slug: "gorilla-trekking-experience",
    title: "Gorilla Trekking Experience",
    duration: "3 days",
    price: 2500,
    rating: 5.0,
    image: "https://ik.imagekit.io/jinx/travel/gorilla-trekking-experience-13.jpg?updatedAt=1750015182565",
  },
  {
    id: 29,
    slug: "nyungwe-forest-canopy-walk",
    title: "Nyungwe Forest Canopy Walk",
    duration: "2 days",
    price: 450,
    rating: 4.6,
    image: "https://ik.imagekit.io/jinx/travel/Walk-trail-nyungwe-Usoke-explorers.jpg?updatedAt=1750015272732",
  },
  {
    id: 33,
    slug: "golden-monkey-tracking",
    title: "Golden Monkey Tracking",
    duration: "2 days",
    price: 680,
    rating: 4.7,
    image: "https://ik.imagekit.io/jinx/travel/golden-monkey-trekking.jpg?updatedAt=1750015688667",
  },
]

export default function RwandaPage() {
  return (
    <div className="min-h-screen">
      {/* ✅ Header moved to server for SEO */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          🇷🇼 Rwanda - Land of a Thousand Hills
        </h1>
        <p className="text-xl mb-6 max-w-3xl mx-auto">
          Famous for mountain gorilla encounters, Nyungwe canopy walks, and
          stunning landscapes, Rwanda is Africa’s premier eco-tourism hub.
        </p>
      </header>

      {/* ✅ Client handles animated highlights/tours */}
      <RwandaClient highlights={rwandaHighlights} tours={rwandaTours} />
    </div>
  )
}
