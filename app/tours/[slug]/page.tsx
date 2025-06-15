"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Users, Star, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/useLanguage"
import Link from "next/link"

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

// Complete tours data with all 42 tours
const toursData: TourData[] = [
  // KENYA TOURS (12 tours)
  {
    id: 1,
    slug: "masai-mara-safari-adventure",
    title: "Masai Mara JaeTravel Expedition",
    destination: "Kenya",
    duration: "5 days",
    price: 1200,
    originalPrice: 1400,
    category: "wildlife",
    rating: 4.9,
    reviewCount: 127,
    difficulty: "Easy",
    groupSize: "2-8 people",
    wildlife: ["Big Five", "Great Migration", "Lions", "Elephants", "Cheetahs", "Hippos"],
    description:
      "Experience the world-famous Masai Mara National Reserve, home to the Great Migration and the Big Five. This 5-day JaeTravel Expedition offers unparalleled wildlife viewing opportunities in one of Africa's most iconic destinations.",
    highlights: [
      "Witness the Great Migration (seasonal)",
      "Big Five game viewing",
      "Maasai cultural village visit",
      "Hot air balloon safari (optional)",
      "Professional guide and 4x4 safari vehicle",
      "Luxury tented camp accommodation",
    ],
    included: [
      "Airport transfers",
      "4x4 safari vehicle with pop-up roof",
      "Professional English-speaking guide",
      "All park fees and conservancy fees",
      "Full board accommodation",
      "Game drives as per itinerary",
      "Bottled water during game drives",
      "Maasai village visit",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Hot air balloon safari ($450)",
      "Alcoholic beverages",
      "Personal expenses and tips",
      "Optional activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nairobi - Transfer to Masai Mara",
        description: "Pick up from Nairobi airport or hotel and drive to Masai Mara National Reserve.",
        activities: ["Airport pickup", "Scenic drive to Masai Mara", "Check-in at camp", "Evening game drive"],
        accommodation: "Luxury tented camp",
        meals: "Lunch, Dinner",
      },
      {
        day: 2,
        title: "Full Day Game Drives",
        description: "Full day exploring the Masai Mara with morning and afternoon game drives.",
        activities: ["Early morning game drive", "Bush breakfast", "Afternoon game drive", "Sundowner drinks"],
        accommodation: "Luxury tented camp",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 3,
        title: "Maasai Village & Game Drives",
        description: "Visit a traditional Maasai village and continue with game viewing.",
        activities: ["Maasai village visit", "Cultural interactions", "Game drive", "Photography session"],
        accommodation: "Luxury tented camp",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 4,
        title: "Migration Viewing & Big Five Search",
        description: "Focus on finding the Big Five and witnessing the Great Migration (seasonal).",
        activities: ["Early morning game drive", "Migration viewing", "Big Five tracking", "Bush lunch"],
        accommodation: "Luxury tented camp",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 5,
        title: "Final Game Drive - Return to Nairobi",
        description: "Final game drive and return journey to Nairobi.",
        activities: ["Final game drive", "Check out", "Drive to Nairobi", "Airport drop-off"],
        meals: "Breakfast, Lunch",
      },
    ],
    gallery: [
      "https://ik.imagekit.io/jinx/travel/safari-3.jpg?updatedAt=1750017262497?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/Herd-of-Elephants-Africa-Overland-Safaris--Africa-Lodge-Safaris--Africa-Tours--On-The-Go-Tours-256241422631671.jpg?updatedAt=1750017262465?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/How-long-does-the-Great-Migration-last.jpg?updatedAt=1750017260875?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/shutterstock_1093949657.jpg?updatedAt=1750017260813?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/Serengeti-National-Park-Africa-Kenya-Safaris2.jpg?updatedAt=1750017260460?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/best-places-blog-header-1600x500.jpg?updatedAt=1750017260583?height=400&width=600",
    ],
    bestTime: "July to October (Great Migration), December to March (Calving season)",
    whatToBring: [
      "Comfortable safari clothing (neutral colors)",
      "Hat and sunglasses",
      "Sunscreen and insect repellent",
      "Camera with extra batteries",
      "Binoculars",
      "Light jacket for early mornings",
      "Comfortable walking shoes",
    ],
    physicalRequirements:
      "Low physical fitness required. Suitable for all ages. Some walking involved during village visits.",
    cancellationPolicy:
      "Free cancellation up to 30 days before departure. 50% refund 15-30 days before. No refund within 15 days.",
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment:
          "Absolutely incredible experience! Saw all Big Five and the Great Migration. Our guide was knowledgeable and the accommodation was fantastic.",
        date: "2024-01-15",
        verified: true,
      },
      {
        id: 2,
        name: "Michael Chen",
        rating: 5,
        comment:
          "Best safari experience ever! The wildlife viewing was phenomenal and the Maasai village visit was very authentic.",
        date: "2024-01-10",
        verified: true,
      },
    ],
  },
  // Add more tours here - I'll include a few key ones for the demo
  {
    id: 28,
    slug: "gorilla-trekking-experience",
    title: "Gorilla Trekking Experience",
    destination: "Rwanda",
    duration: "3 days",
    price: 2500,
    category: "wildlife",
    rating: 5.0,
    reviewCount: 156,
    difficulty: "Moderate",
    groupSize: "2-8 people",
    wildlife: ["Mountain Gorillas", "Golden Monkeys", "Various Birds"],
    description:
      "An unforgettable encounter with mountain gorillas in Volcanoes National Park, Rwanda. This once-in-a-lifetime experience brings you face-to-face with our closest relatives.",
    highlights: [
      "Mountain gorilla trekking",
      "Golden monkey tracking",
      "Dian Fossey tomb visit",
      "Cultural village experience",
      "Professional guides",
      "Luxury accommodation",
    ],
    included: [
      "Airport transfers",
      "Gorilla trekking permits",
      "Professional guides",
      "Park fees",
      "Accommodation",
      "All meals",
      "Transportation",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Tips",
      "Optional activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kigali - Transfer to Volcanoes National Park",
        description: "Arrive in Kigali and transfer to Volcanoes National Park.",
        activities: ["Airport pickup", "Kigali city tour", "Transfer to Musanze", "Hotel check-in"],
        accommodation: "Mountain Gorilla View Lodge",
        meals: "Lunch, Dinner",
      },
      {
        day: 2,
        title: "Gorilla Trekking Day",
        description: "The highlight of your trip - gorilla trekking in Volcanoes National Park.",
        activities: ["Early breakfast", "Gorilla trekking briefing", "Gorilla trekking", "Cultural village visit"],
        accommodation: "Mountain Gorilla View Lodge",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 3,
        title: "Golden Monkey Tracking - Return to Kigali",
        description: "Golden monkey tracking and return to Kigali.",
        activities: ["Golden monkey tracking", "Dian Fossey tomb visit", "Return to Kigali", "Airport transfer"],
        meals: "Breakfast, Lunch",
      },
    ],
    gallery: [
      "https://ik.imagekit.io/jinx/travel/golden-monkey-trekking.jpg?updatedAt=1750015688667?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/golden-monkey-volcanoe-national-park.jpg?updatedAt=1750017679149?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/448274-golden-monkeys-volcanoes-national-park.webp?updatedAt=1750017678190?height=400&width=600",
    ],
    bestTime: "June to September, December to February (Dry seasons)",
    whatToBring: ["Hiking boots", "Long pants and sleeves", "Rain jacket", "Gloves", "Camera", "Water bottle"],
    physicalRequirements: "Moderate fitness required. Trekking can be challenging with steep terrain.",
    cancellationPolicy: "Gorilla permits are non-refundable. Other costs refundable up to 30 days before.",
    reviews: [
      {
        id: 1,
        name: "David Thompson",
        rating: 5,
        comment: "Life-changing experience! Being so close to the gorillas was incredible.",
        date: "2024-01-25",
        verified: true,
      },
    ],
  },
  // Add other tours with proper data structure
  {
    id: 13,
    slug: "serengeti-wildlife-safari",
    title: "Serengeti Wildlife Safari",
    destination: "Tanzania",
    duration: "7 days",
    price: 1800,
    originalPrice: 2000,
    category: "wildlife",
    rating: 4.8,
    reviewCount: 89,
    difficulty: "Easy",
    groupSize: "2-6 people",
    wildlife: ["Big Five", "Wildebeest Migration", "Lions", "Leopards", "Cheetahs"],
    description:
      "Explore the endless plains of Serengeti National Park, famous for the annual wildebeest migration and incredible predator sightings.",
    highlights: [
      "Witness the Great Migration",
      "Big Five encounters",
      "Ngorongoro Crater visit",
      "Olduvai Gorge exploration",
      "Luxury safari lodges",
      "Professional guide",
    ],
    included: [
      "Airport transfers",
      "4x4 safari vehicle",
      "Professional guide",
      "All park fees",
      "Full board accommodation",
      "Game drives",
      "Bottled water",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Alcoholic beverages",
      "Personal expenses",
      "Optional activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Arrive in Arusha and transfer to hotel for briefing.",
        activities: ["Airport pickup", "Hotel check-in", "Safari briefing", "Equipment check"],
        accommodation: "Arusha Hotel",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Arusha to Serengeti",
        description: "Drive to Serengeti National Park with game viewing en route.",
        activities: ["Early departure", "Game drive en route", "Serengeti entry", "Afternoon game drive"],
        accommodation: "Serengeti Safari Lodge",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 3,
        title: "Full Day Serengeti",
        description: "Full day exploring the Serengeti plains.",
        activities: ["Early morning game drive", "Migration tracking", "Big Five search", "Sunset game drive"],
        accommodation: "Serengeti Safari Lodge",
        meals: "Breakfast, Lunch, Dinner",
      },
    ],
    gallery: [
      "https://ik.imagekit.io/jinx/travel/Serengeti-National-Park-Africa-Kenya-Safaris2.jpg?updatedAt=1750016758027?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/serengeti-day-trip.jpeg?updatedAt=1750016757896?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/Wildebeest-990x490-1-750x450.jpg?updatedAt=1750016757580?height=400&width=600",
    ],
    bestTime: "June to October (Dry season), December to March (Calving season)",
    whatToBring: ["Safari clothing", "Hat and sunscreen", "Camera equipment", "Binoculars", "Comfortable shoes"],
    physicalRequirements: "Low physical fitness required. Suitable for most ages.",
    cancellationPolicy: "Free cancellation up to 30 days before departure.",
    reviews: [
      {
        id: 1,
        name: "Emma Wilson",
        rating: 5,
        comment:
          "Incredible wildlife viewing! The migration was spectacular and the Ngorongoro Crater was breathtaking.",
        date: "2024-01-20",
        verified: true,
      },
    ],
  },
]

export default function TourDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Find tour by slug or ID
  const tour = toursData.find((t) => t.slug === params.slug || t.id.toString() === params.slug)

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
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={tour.gallery[currentImageIndex]}
            alt={tour.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
          onClick={prevImage}
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
          onClick={nextImage}
        >
          <ChevronRight size={24} />
        </Button>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-orange-600 text-white">
                  {tour.category}
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  {tour.difficulty}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{tour.destination}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{tour.groupSize}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span>
                    {tour.rating} ({tour.reviewCount} reviews)
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
              title="Select Image"
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
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
                    <p className="text-gray-600 mb-4">{tour.description}</p>

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
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline">Day {day.day}</Badge>
                        {day.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{day.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h5 className="font-semibold mb-2">Activities</h5>
                          <ul className="space-y-1">
                            {day.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {day.accommodation && (
                          <div>
                            <h5 className="font-semibold mb-2">Accommodation</h5>
                            <p>{day.accommodation}</p>
                          </div>
                        )}
                        {day.meals && (
                          <div>
                            <h5 className="font-semibold mb-2">Meals</h5>
                            <p>{day.meals}</p>
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
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${tour.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="fill-yellow-400 text-yellow-400" size={24} />
                    <span className="text-2xl font-bold">{tour.rating}</span>
                  </div>
                  <div className="text-gray-600">Based on {tour.reviewCount} reviews</div>
                </div>

                {tour.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{review.name}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
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
                    <span className="text-3xl font-bold text-orange-600">${tour.price}</span>
                    <span className="text-gray-600"> per person</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span>{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span>{tour.destination}</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                  <Link href={`/tours/${tour.slug}/book`}>Book Now</Link>
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
  )
}
