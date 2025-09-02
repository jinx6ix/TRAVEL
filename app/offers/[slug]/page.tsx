"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Users, Star, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/useLanguage"
import Link from "next/link"
import { SEO } from "@/config/seo.config"

interface OfferData {
  id: number
  slug: string
  title: string
  destination: string
  duration: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  description: string
  badge: string
  highlights: string[]
  offer: string
  availability: string
}

const safariOffers = [
  {
    id: 1,
    slug: "nairobi-highlights-express-tour",
    title: "Nairobi Highlights Express Tour",
    destination: "Kenya",
    duration: "Half Day (5 hrs)",
    price: 99,
    originalPrice: 129,
    rating: 4.8,
    reviews: 142,
    image: "https://ik.imagekit.io/jinx/travel/Giraffe-at-Nairobi-National-Park.webp?updatedAt=1751635762605",
    description: "Perfect for layovers! Experience Nairobi's top attractions in just hours",
    badge: "TRANSIT SPECIAL",
    highlights: [
      "Hotel pickup/drop-off included",
      "Giraffe Centre & Karen Blixen Museum",
      "Optional Sheldrick Wildlife Trust",
      "Local artisan shopping"
    ],
    offer: "Book 48hrs in advance & get free airport transfer",
    availability: "Only 3 spots left today",
  },
  {
    id: 2,
    slug: "maasai-mara-luxury-safari",
    title: "Maasai Mara Luxury Safari",
    destination: "Kenya",
    duration: "3 Days / 2 Nights",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 89,
    image: "https://ik.imagekit.io/jinx/travel/mahali-mzuri-2-2-420x310.jpg?updatedAt=1751635762576",
    description: "Premium safari with luxury tents & private game drives",
    badge: "BEST SELLER",
    highlights: [
      "Award-winning eco-lodges",
      "Sunset champagne game drives",
      "Hot air balloon add-on available",
      "Maasai cultural experience"
    ],
    offer: "FREE night + massage for couples (limited time)",
    availability: "High season - booking fast",
  },
  {
    id: 3,
    slug: "amboseli-elephant-paradise",
    title: "Amboseli Elephant Paradise",
    destination: "Kenya",
    duration: "2 Days / 1 Night",
    price: 749,
    originalPrice: 899,
    rating: 4.7,
    reviews: 63,
    image: "https://ik.imagekit.io/jinx/travel/Amboseli-National-Park-Elephantsssss.jpg?updatedAt=1751635762755",
    description: "Hundreds of elephants with Kilimanjaro backdrop",
    badge: "FAMILY FAVORITE",
    highlights: [
      "Guaranteed elephant sightings",
      "Kilimanjaro photo opportunities",
      "Child-friendly lodge with pool",
      "400+ bird species"
    ],
    offer: "Kids under 12 stay FREE (2 adults minimum)",
    availability: "Only 1 lodge remaining",
  }
]

export default function OfferDetailPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Safely extract slug (fallback to empty string if null)
  const slug = params?.slug ?? ""

  // Find offer by slug or ID
  const offer = safariOffers.find(
    (o) => o.slug === slug || o.id.toString() === slug
  )

  // Generate SEO metadata
  const pageTitle = `${offer?.title} | ${SEO.defaultTitle}`
  const pageDescription = offer?.description || "Special safari offer from Jae Travel Expeditions"
  const canonicalUrl = `${SEO.canonical}/offers/${offer?.slug}`
  const images = [offer?.image || SEO.openGraph.images[0].url]

  // Structured data for search engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": offer?.title,
    "description": offer?.description,
    "url": canonicalUrl,
    "image": images,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": offer?.destination
    },
    "offers": {
      "@type": "Offer",
      "price": offer?.price,
      "priceCurrency": "USD",
      "priceValidUntil": "2024-12-31",
      "url": canonicalUrl
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": offer?.rating,
      "reviewCount": offer?.reviews
    }
  }

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Offer Not Found</h1>
          <p className="text-gray-600 mb-4">The offer you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/offers")} className="bg-orange-600 hover:bg-orange-700">
            Back to Offers
          </Button>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex(0) // Only one image in offer data
  }

  const prevImage = () => {
    setCurrentImageIndex(0) // Only one image in offer data
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={images[0]} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={images[0]} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden" itemScope itemType="https://schema.org/TouristAttraction">
          <meta itemProp="name" content={offer.title} />
          <meta itemProp="description" content={offer.description} />
          <div itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <meta itemProp="url" content={offer.image} />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={offer.image}
              alt={`${offer.title} - Featured Image`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              loading="eager"
            />
          </AnimatePresence>

          {/* Navigation Arrows (hidden since only one image) */}
          {false && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </Button>
            </>
          )}

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-orange-600 text-white">
                    {offer.badge}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold mb-2" itemProp="name">{offer.title}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1" itemProp="location" itemScope itemType="https://schema.org/Place">
                    <MapPin size={16} />
                    <span itemProp="name">{offer.destination}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span itemProp="duration">{offer.duration}</span>
                  </div>
                  <div className="flex items-center gap-1" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span>
                      <span itemProp="ratingValue">{offer.rating}</span> (<span itemProp="reviewCount">{offer.reviews}</span> reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="highlights">Highlights</TabsTrigger>
                  <TabsTrigger value="offer">Special Offer</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Offer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4" itemProp="description">{offer.description}</p>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                        <h4 className="font-semibold text-yellow-800 mb-1">Limited Time Offer</h4>
                        <p className="text-yellow-700">{offer.offer}</p>
                        <p className="text-sm text-yellow-600 mt-2">{offer.availability}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="highlights" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tour Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {offer.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <div className="w-2 h-2 bg-orange-600 rounded-full" />
                            </div>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="offer" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Special Offer Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">What's Included</h4>
                          <ul className="space-y-2">
                            {offer.highlights.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-orange-800 mb-1">Special Conditions</h4>
                          <p className="text-orange-700">{offer.offer}</p>
                          <p className="text-sm text-orange-600 mt-2">{offer.availability}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 border-2 border-orange-500">
                <CardHeader>
                  <CardTitle>Book This Offer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg text-gray-500 line-through">${offer.originalPrice}</span>
                      <span className="text-3xl font-bold text-orange-600 ml-2" itemProp="price">${offer.price}</span>
                      <div className="text-sm text-green-600 font-medium">
                        Save ${offer.originalPrice - offer.price}!
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <span itemProp="duration">{offer.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-500" />
                      <span itemProp="location">{offer.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span>{offer.rating} ({offer.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm text-orange-700 font-medium">{offer.offer}</p>
                    <p className="text-xs text-orange-600 mt-1">{offer.availability}</p>
                  </div>

                  <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                    <Link href={`/offers/${offer.slug}/book`} itemProp="url">Book Now</Link>
                  </Button>

                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    Limited time offer - subject to availability
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}