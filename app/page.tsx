import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, ArrowRight, Check } from "lucide-react"
import HeroSection from "@/components/hero-section"
import DestinationsSection from "@/components/destinations-section"
import OffersSection from "@/components/offers-section"
import BookingWidgetSection from "@/components/booking-widget-section"
import FeaturedToursSection from "@/components/featured-tours-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import {ReviewsSection} from "@/components/reviews-section"

// Data (could be moved to separate files)
const destinations = [
  { name: "Kenya", image: "https://ik.imagekit.io/jinx/travel/_8108045.jpg?updatedAt=1750002790492", tours: 12 },
  { name: "Tanzania", image: "https://ik.imagekit.io/jinx/travel/_8502569.jpg?updatedAt=1750002716388", tours: 15 },
  { name: "Rwanda", image: "https://ik.imagekit.io/jinx/travel/25-Top-Attractions-in-Rwanda-2.jpg?updatedAt=1750004163696", tours: 8 },
  { name: "Uganda", image: "https://ik.imagekit.io/jinx/travel/lake_bunyonyi__uganda-the-pearl-of-africa.webp?updatedAt=1750004263683", tours: 7 }
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
  }
]

// SEO Metadata
const siteMetadata = {
  title: "JaeTravel Expeditions - Premium African Safari Tours & Adventures",
  description: "Experience unforgettable African safaris with JaeTravel Expeditions. Explore Kenya, Tanzania, Rwanda, and Uganda with our expertly guided tours and luxury accommodations.",
  keywords: "African safari, Kenya tours, Tanzania wildlife, gorilla trekking, luxury safari, Masai Mara, Serengeti, travel Africa",
  author: "JaeTravel Expeditions",
  siteUrl: "https://www.jaetravelexpeditions.com",
  image: "https://ik.imagekit.io/jinx/travel/_8503066.jpg?updatedAt=1750002707556",
  twitterHandle: "@jaetravel",
  locale: "en_US",
  type: "website",
}

// Generate structured data for SEO
const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "JaeTravel Expeditions",
    "description": siteMetadata.description,
    "url": siteMetadata.siteUrl,
    "telephone": "+254-726-485-228",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Safari Lane",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    "openingHours": "Mo-Fr 08:00-18:00",
    "image": siteMetadata.image,
    "priceRange": "$$$",
    "areaServed": ["Kenya", "Tanzania", "Rwanda", "Uganda"],
    "makesOffer": featuredTours.map(tour => ({
      "@type": "Offer",
      "name": tour.title,
      "description": tour.description,
      "price": tour.price,
      "priceCurrency": "USD",
      "eligibleRegion": {
        "@type": "Country",
        "name": tour.destination
      }
    }))
  }
}

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
          priority={false}
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
            <Link href={`/offers/${tour.slug}/book`}>Book Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function HomePage() {
  const structuredData = generateStructuredData();
  
  return (
    <div className="min-h-screen">
      <Head>
        {/* Primary Meta Tags */}
        <title>{siteMetadata.title}</title>
        <meta name="title" content={siteMetadata.title} />
        <meta name="description" content={siteMetadata.description} />
        <meta name="keywords" content={siteMetadata.keywords} />
        <meta name="author" content={siteMetadata.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteMetadata.siteUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={siteMetadata.type} />
        <meta property="og:url" content={siteMetadata.siteUrl} />
        <meta property="og:title" content={siteMetadata.title} />
        <meta property="og:description" content={siteMetadata.description} />
        <meta property="og:image" content={siteMetadata.image} />
        <meta property="og:site_name" content="JaeTravel Expeditions" />
        <meta property="og:locale" content={siteMetadata.locale} />

        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteMetadata.siteUrl} />
        <meta property="twitter:title" content={siteMetadata.title} />
        <meta property="twitter:description" content={siteMetadata.description} />
        <meta property="twitter:image" content={siteMetadata.image} />
        <meta name="twitter:creator" content={siteMetadata.twitterHandle} />
        <meta name="twitter:site" content={siteMetadata.twitterHandle} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

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