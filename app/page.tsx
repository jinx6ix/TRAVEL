"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { ReviewsSection } from "@/components/reviews-section"

const heroImages = [
  {
    url: "https://cwzwdxedgblbbabcbnkj.supabase.co/storage/v1/object/sign/travel-images/_8108019.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTA2ZTM4Ni1hNGVjLTQ5MDEtYmU4NC1lZjgxY2E3OGI4YWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cmF2ZWwtaW1hZ2VzL184MTA4MDE5LmpwZyIsImlhdCI6MTc1MDAwMTk1OCwiZXhwIjoxNzgxNTM3OTU4fQ.BliZarhrxiotixnxtYX46nrQRZaMqxNoOpALoJDStxE",
    title: "Masai Mara Safari",
    location: "Kenya",
    description: "Unforgettable safaris, breathtaking landscapes, and authentic cultural experiences",
  },
  {
    url: "https://ik.imagekit.io/jinx/travel/_8501829.jpg?updatedAt=1750002842952",
    title: "Serengeti Wildlife",
    location: "Tanzania",
    description: "Witness the great migration and incredible wildlife diversity",
  },
  {
    url: "https://ik.imagekit.io/jinx/travel/_Z9P8753%20BW%20DN%20logo%20verkleind.jpg?updatedAt=1750002836396",
    title: "Mountain Gorillas",
    location: "Rwanda",
    description: "Get up close with mountain gorillas in their natural habitat",
  },
  {
    url: "https://ik.imagekit.io/jinx/travel/_Z9P5462%20DN%20logo%20verkleind.jpg?updatedAt=1750002833108",
    title: "Bwindi Forest",
    location: "Uganda",
    description: "Experience the Pearl of Africa's incredible biodiversity",
  },
  {
    url: "https://ik.imagekit.io/jinx/travel/_8502455.jpg?updatedAt=1750002805348",
    title: "Mount Kilimanjaro",
    location: "Tanzania",
    description: "Conquer Africa's highest peak with expert guides",
  },
]

const destinations = [
  { name: "Kenya", image: "https://ik.imagekit.io/jinx/travel/_8108045.jpg?updatedAt=1750002790492?height=300&width=400", tours: 12 },
  { name: "Tanzania", image: "https://ik.imagekit.io/jinx/travel/_8502569.jpg?updatedAt=1750002716388?height=300&width=400", tours: 15 },
  { name: "Rwanda", image: "https://ik.imagekit.io/jinx/travel/25-Top-Attractions-in-Rwanda-2.jpg?updatedAt=1750004163696?height=300&width=400", tours: 8 },
  { name: "Uganda", image: "https://ik.imagekit.io/jinx/travel/lake_bunyonyi__uganda-the-pearl-of-africa.webp?updatedAt=1750004263683?height=300&width=400", tours: 7 },
]

const featuredTours = [
  {
    id: 1,
    title: "Masai Mara JaeTravel Expeditions",
    destination: "Kenya",
    duration: "5 days",
    price: "$1,200",
    rating: 4.9,
    image: "https://ik.imagekit.io/jinx/travel/_8503066.jpg?updatedAt=1750002707556?height=250&width=350",
    description: "Experience the great migration and witness the Big Five in their natural habitat.",
  },
  {
    id: 2,
    title: "Serengeti Wildlife Safari",
    destination: "Tanzania",
    duration: "7 days",
    price: "$1,800",
    rating: 4.8,
    image: "https://ik.imagekit.io/jinx/travel/_Z9P6137.jpg?updatedAt=1750002508464?height=250&width=350",
    description: "Explore the endless plains of Serengeti and witness incredible wildlife.",
  },
  {
    id: 3,
    title: "Gorilla Trekking Experience",
    destination: "Rwanda",
    duration: "3 days",
    price: "$2,500",
    rating: 5.0,
    image: "https://ik.imagekit.io/jinx/travel/Gorilla-Tours-from-Mombasa-1024x675.webp?updatedAt=1750005789952?height=250&width=350",
    description: "Get up close with mountain gorillas in their natural habitat.",
  },
]

export default function HomePage() {
  const { t } = useLanguage()
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Image Slider */}
        <div className="absolute inset-0">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full relative"
          >
            <img
              src={heroImages[currentSlide].url || "/placeholder.svg"}
              alt={heroImages[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" />
          </motion.div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {heroImages.map((_, index) => (
              <button
                title="button"
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            title="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            title="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl mb-8"
          >
            {t("heroDescription")}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
            <Button size="lg" className="px-8 py-3 bg-orange-600 hover:bg-orange-700">
              {t("searchTours")}
            </Button>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="px-8 py-3" asChild>
              <Link href="/tours">{t("exploreTours")}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-white border-white hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/vehicle-hire">Vehicle Hire</Link>
            </Button>
          </motion.div>
        </div>

        {/* Slide Info */}
        <div className="absolute bottom-20 left-8 z-20 text-white">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/30 backdrop-blur-sm rounded-lg p-4"
          >
            <h3 className="text-xl font-bold mb-1">{heroImages[currentSlide].title}</h3>
            <p className="text-sm text-gray-200">{heroImages[currentSlide].location}</p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("ourDestinations")}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("exploreMostBeautiful")}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {destinations.map((destination, index) => (
              <motion.div key={destination.name} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{destination.name}</h3>
                      <p className="text-sm">
                        {destination.tours} {t("toursAvailable")}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Button className="w-full" asChild>
                      <Link href={`/destinations/${destination.name.toLowerCase()}`}>
                        {t("explore")} {destination.name}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("featuredTours")}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("handpickedAdventures")}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredTours.map((tour) => (
              <motion.div key={tour.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-orange-600">{tour.destination}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{tour.title}</CardTitle>
                    <CardDescription>{tour.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span className="text-sm text-gray-600">{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{tour.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">{tour.price}</span>
                      <Button asChild>
                        <Link href={`/tours/${tour.id}`}>{t("bookNow")}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" asChild>
              <Link href="/tours">{t("viewAllTours")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("whyChooseUs")}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("exceptionalSafariExperiences")}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "🦁",
                title: t("expertGuides"),
                description: t("professionalLocalGuides"),
              },
              {
                icon: "🚗",
                title: t("qualityVehicles"),
                description: t("wellMaintainedVehicles"),
              },
              {
                icon: "⭐",
                title: t("bestExperience"),
                description: t("unforgettableMemories"),
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />
    </div>
  )
}
