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

interface TourData {
  id: number
  slug: string
  title: string
  destination: string
  duration: string
  price: number
  originalPrice?: number
  category: string
  rating: number
  reviewCount: number
  difficulty: string
  groupSize: string
  wildlife?: string[]
  description: string
  highlights: string[]
  included: string[]
  excluded: string[]
  itinerary: {
    day: number
    title: string
    description: string
    activities: string[]
    accommodation?: string
    meals?: string
  }[]
  gallery: string[]
  bestTime: string
  whatToBring: string[]
  physicalRequirements: string
  cancellationPolicy: string
  reviews: {
    id: number
    name: string
    rating: number
    comment: string
    date: string
    verified: boolean
  }[]
}

// Import your tours data (truncated for brevity)
import  toursData  from "@/data/tours-data"

export default function TourDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Find tour by slug or ID
  const tour = toursData.find((t) => t.slug === params.slug || t.id.toString() === params.slug)

  // Generate SEO metadata
  const pageTitle = `${tour?.title} | ${SEO.defaultTitle}`
  const pageDescription = tour?.description || "Experience an unforgettable tour with Jae Travel Expeditions"
  const canonicalUrl = `${SEO.canonical}/tours/${tour?.slug}`
  const images = tour?.gallery.map((image) => ({
    url: image,
    width: 1200,
    height: 630,
    alt: `${tour.title} tour image`
  })) || SEO.openGraph.images

  // Structured data for search engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": tour?.title,
    "description": tour?.description,
    "url": canonicalUrl,
    "image": images,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": tour?.destination
    },
    "offers": {
      "@type": "Offer",
      "price": tour?.price,
      "priceCurrency": "USD",
      "validFrom": new Date().toISOString().split('T')[0],
      "url": canonicalUrl
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tour?.rating,
      "reviewCount": tour?.reviewCount
    }
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-4">The tour you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/tours")} className="bg-orange-600 hover:bg-orange-700">
            Back to Tours
          </Button>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length)
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
        <meta property="og:image" content={images[0].url} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={images[0].url} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden" itemScope itemType="https://schema.org/TouristAttraction">
          <meta itemProp="name" content={tour.title} />
          <meta itemProp="description" content={tour.description} />
          <div itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <meta itemProp="url" content={tour.gallery[currentImageIndex]} />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={tour.gallery[currentImageIndex]}
              alt={`${tour.title} - Featured Image`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              loading="eager"
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
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

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-orange-600 text-white" itemProp="keywords">
                    {tour.category}
                  </Badge>
                  <Badge variant="outline" className="text-white border-white">
                    {tour.difficulty}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold mb-2" itemProp="name">{tour.title}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1" itemProp="location" itemScope itemType="https://schema.org/Place">
                    <MapPin size={16} />
                    <span itemProp="name">{tour.destination}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span itemProp="duration">{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-1" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span>
                      <span itemProp="ratingValue">{tour.rating}</span> (<span itemProp="reviewCount">{tour.reviewCount}</span> reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {tour.gallery.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View image ${index + 1} of ${tour.gallery.length}`}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Tour</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4" itemProp="description">{tour.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Highlights</h4>
                          <ul className="space-y-1">
                            {tour.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {tour.wildlife && tour.wildlife.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Wildlife to See</h4>
                            <div className="flex flex-wrap gap-2">
                              {tour.wildlife.map((animal, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {animal}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600">What's Included</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {tour.included.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600">What's Excluded</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {tour.excluded.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Important Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Best Time to Visit</h4>
                        <p className="text-sm text-gray-600">{tour.bestTime}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Physical Requirements</h4>
                        <p className="text-sm text-gray-600">{tour.physicalRequirements}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">What to Bring</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {tour.whatToBring.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                        <p className="text-sm text-gray-600">{tour.cancellationPolicy}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="itinerary" className="space-y-4">
                  {tour.itinerary.map((day, index) => (
                    <Card key={index} itemScope itemType="https://schema.org/ItemList">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Badge variant="outline" itemProp="position">Day {day.day}</Badge>
                          <span itemProp="name">{day.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4" itemProp="description">{day.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold mb-2">Activities</h5>
                            <ul className="space-y-1">
                              {day.activities.map((activity, actIndex) => (
                                <li key={actIndex} className="flex items-start gap-2" itemProp="itemListElement">
                                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {day.accommodation && (
                            <div>
                              <h5 className="font-semibold mb-2">Accommodation</h5>
                              <p itemProp="location">{day.accommodation}</p>
                            </div>
                          )}
                          {day.meals && (
                            <div>
                              <h5 className="font-semibold mb-2">Meals</h5>
                              <p itemProp="foodEvent">{day.meals}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="gallery" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tour.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-lg cursor-pointer group"
                        onClick={() => setCurrentImageIndex(index)}
                        itemProp="image"
                        itemScope
                        itemType="https://schema.org/ImageObject"
                      >
                        <img
                          src={image}
                          alt={`${tour.title} - Image ${index + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          itemProp="contentUrl"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <meta itemProp="description" content={`${tour.title} tour image ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                      <Star className="fill-yellow-400 text-yellow-400" size={24} />
                      <span className="text-2xl font-bold" itemProp="ratingValue">{tour.rating}</span>
                      <meta itemProp="reviewCount" content={tour.reviewCount.toString()} />
                    </div>
                    <div className="text-gray-600">Based on {tour.reviewCount} reviews</div>
                  </div>

                  {tour.reviews.map((review) => (
                    <Card key={review.id} itemScope itemType="https://schema.org/Review">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold" itemProp="author">{review.name}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                />
                              ))}
                              <meta itemProp="ratingValue" content={review.rating.toString()} />
                              <meta itemProp="bestRating" content="5" />
                            </div>
                          </div>
                          <span className="text-sm text-gray-500" itemProp="datePublished">{review.date}</span>
                        </div>
                        <p className="text-gray-600" itemProp="reviewBody">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Book This Tour</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      {tour.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">${tour.originalPrice}</span>
                      )}
                      <span className="text-3xl font-bold text-orange-600" itemProp="price">${tour.price}</span>
                      <span className="text-gray-600"> per person</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <span itemProp="duration">{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-500" />
                      <span>{tour.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-500" />
                      <span itemProp="location">{tour.destination}</span>
                    </div>
                  </div>

                  <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                    <Link href={`/tours/${tour.slug}/book`} itemProp="url">Book Now</Link>
                  </Button>

                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    Free cancellation up to 24 hours before the tour
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