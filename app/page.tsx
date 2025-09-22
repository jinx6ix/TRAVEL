// app/page.tsx
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, ArrowRight } from "lucide-react"

import HeroSection from "@/components/hero-section"
import DestinationsSection from "@/components/destinations-section"
import OffersSection from "@/components/offers-section"
import BookingWidgetSection from "@/components/booking-widget-section"
import FeaturedToursSection from "@/components/featured-tours-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import { ReviewsSection } from "@/components/reviews-section"

// --- SEO Metadata ---
const siteUrl = "https://www.jaetravel.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JaeTravel Expeditions - Premium African Safari Tours & Adventures",
  description:
    "Experience unforgettable African safaris with JaeTravel Expeditions. Explore Kenya, Tanzania, Rwanda, and Uganda with our expertly guided tours and luxury accommodations.",
  keywords: [
    "African safari",
    "Kenya tours",
    "Tanzania wildlife",
    "gorilla trekking",
    "luxury safari",
    "Masai Mara",
    "Serengeti",
    "travel Africa",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "JaeTravel Expeditions - Premium African Safari Tours & Adventures",
    description:
      "Experience unforgettable African safaris with JaeTravel Expeditions. Explore Kenya, Tanzania, Rwanda, and Uganda with our expertly guided tours and luxury accommodations.",
    siteName: "JaeTravel Expeditions",
    locale: "en_US",
    images: [
      {
        url: "https://ik.imagekit.io/jinx/travel/_8503066.jpg?updatedAt=1750002707556",
        width: 1200,
        height: 630,
        alt: "African Safari Tours - JaeTravel Expeditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jaetravel",
    creator: "@jaetravel",
    title: "JaeTravel Expeditions",
    description: "Premium African Safari Tours & Adventures",
    images: ["https://ik.imagekit.io/jinx/travel/_8503066.jpg?updatedAt=1750002707556"],
  },
}

// --- Structured Data ---
const generateStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "JaeTravel Expeditions",
  description:
    "Experience unforgettable African safaris with JaeTravel Expeditions. Explore Kenya, Tanzania, Rwanda, and Uganda with our expertly guided tours and luxury accommodations.",
  url: siteUrl,
  telephone: "+254-726-485-228",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Safari Lane",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi",
    postalCode: "00100",
    addressCountry: "KE",
  },
  openingHours: "Mo-Fr 08:00-18:00",
  image: "https://ik.imagekit.io/jinx/travel/_8503066.jpg?updatedAt=1750002707556",
  priceRange: "$$$",
  areaServed: ["Kenya", "Tanzania", "Rwanda", "Uganda"],
})

// --- Data ---
const destinations = [
  { name: "Kenya", image: "https://ik.imagekit.io/jinx/travel/_8108045.jpg?updatedAt=1750002790492", tours: 12 },
  { name: "Tanzania", image: "https://ik.imagekit.io/jinx/travel/_8502569.jpg?updatedAt=1750002716388", tours: 15 },
  { name: "Rwanda", image: "https://ik.imagekit.io/jinx/travel/25-Top-Attractions-in-Rwanda-2.jpg?updatedAt=1750004163696", tours: 8 },
  { name: "Uganda", image: "https://ik.imagekit.io/jinx/travel/lake_bunyonyi__uganda-the-pearl-of-africa.webp?updatedAt=1750004263683", tours: 7 },
]

const featuredTours = [
  {
    id: 1,
    slug: "masai-mara-safari-adventure",
    title: "Masai Mara JaeTravel Expeditions",
    destination: "Kenya",
    duration: "5 days",
    price: "$1,200",
    rating: 4.9,
    image: "https://ik.imagekit.io/jinx/travel/_8503066.jpg?updatedAt=1750002707556",
    description: "Experience the great migration and witness the Big Five in their natural habitat.",
  },
  {
    id: 2,
    slug: "serengeti-wildlife-safari",
    title: "Serengeti Wildlife Safari",
    destination: "Tanzania",
    duration: "7 days",
    price: "$1,800",
    rating: 4.8,
    image: "https://ik.imagekit.io/jinx/travel/_Z9P6137.jpg?updatedAt=1750002508464",
    description: "Explore the endless plains of Serengeti and witness incredible wildlife.",
  },
  {
    id: 3,
    slug: "gorilla-trekking-experience",
    title: "Gorilla Trekking Experience",
    destination: "Rwanda",
    duration: "3 days",
    price: "$2,500",
    rating: 5.0,
    image: "https://ik.imagekit.io/jinx/travel/Gorilla-Tours-from-Mombasa-1024x675.webp?updatedAt=1750005789952",
    description: "Get up close with mountain gorillas in their natural habitat.",
  },
]

// --- Components ---
function FeaturedTourCard({ tour }: { tour: typeof featuredTours[0] }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <Badge className="absolute top-4 left-4 bg-orange-600 hover:bg-orange-700">{tour.destination}</Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{tour.title}</CardTitle>
        <CardDescription>{tour.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-orange-600" />
            <span className="text-sm text-gray-600">{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{tour.rating}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto">
        <div className="flex items-center justify-between w-full">
          <span className="text-2xl font-bold text-orange-600">{tour.price}</span>
          <Button asChild>
            <Link href={`/offers/${tour.slug}/book`}>
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function HomePage() {
  const structuredData = generateStructuredData()

  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <HeroSection />
      <DestinationsSection destinations={destinations} />
      <OffersSection />
      <BookingWidgetSection />
      <FeaturedToursSection featuredTours={featuredTours} />
      <WhyChooseUsSection />
      <ReviewsSection />
    </div>
  )
}
