"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, ChevronLeft, ChevronRight, ArrowRight, Check } from "lucide-react"
import { ReviewsSection } from "@/components/reviews-section"

// ✅ lazy-load heavy widget (no SSR)
const BookingWidgetSection = dynamic(
  () => import("@/components/booking-widget-section"),
  { ssr: false, loading: () => <div className="py-16 text-center">Loading booking widget…</div> }
)

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
  }
]

const destinations = [
  { name: "Kenya", image: "https://ik.imagekit.io/jinx/travel/_8108045.jpg?updatedAt=1750002790492", tours: 12 },
  { name: "Tanzania", image: "https://ik.imagekit.io/jinx/travel/_8502569.jpg?updatedAt=1750002716388", tours: 15 },
  { name: "Rwanda", image: "https://ik.imagekit.io/jinx/travel/25-Top-Attractions-in-Rwanda-2.jpg?updatedAt=1750004163696", tours: 8 },
  { name: "Uganda", image: "https://ik.imagekit.io/jinx/travel/lake_bunyonyi__uganda-the-pearl-of-africa.webp?updatedAt=1750004263683", tours: 7 }
]

const offers = [
  {
    id: 1,
    slug: "nairobi-highlights-express-tour",
    title: "Nairobi Highlights Express Tour",
    destination: "Kenya",
    duration: "Half Day (5 hrs)",
    price: "$99",
    originalPrice: "$129",
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
    cta: "Reserve Now - Instant Confirmation"
  },
  {
    id: 2,
    slug: "maasai-mara-luxury-safari",
    title: "Maasai Mara Luxury Safari",
    destination: "Kenya",
    duration: "3 Days / 2 Nights",
    price: "$1,299",
    originalPrice: "$1,599",
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
    cta: "Secure Your Luxury Safari"
  },
  {
    id: 3,
    slug: "amboseli-elephant-paradise",
    title: "Amboseli Elephant Paradise",
    destination: "Kenya",
    duration: "2 Days / 1 Night",
    price: "$749",
    originalPrice: "$899",
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
    cta: "Book Family Package"
  }
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

function OfferCard({ offer, featured = false }: { offer: typeof offers[0]; featured?: boolean }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className={`h-full ${featured ? "transform md:-translate-y-2" : ""}`}>
      <Card className="h-full flex flex-col overflow-hidden border-2 border-orange-100 hover:border-orange-300 transition-colors shadow-lg hover:shadow-xl">
        <div className="relative w-full h-48">
          <Image
            src={offer.image}
            alt={offer.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
          <Badge className="absolute top-4 left-4 bg-orange-600 hover:bg-orange-700">{offer.badge}</Badge>
          <Badge className="absolute top-4 right-4 bg-green-600 hover:bg-green-700">{offer.availability}</Badge>
        </div>

        <CardHeader>
          <CardTitle className="text-2xl">{offer.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-orange-600" />
            <span className="text-sm text-gray-600">{offer.duration}</span>
            <span className="mx-2">•</span>
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{offer.rating}</span>
            <span className="text-sm text-gray-500">({offer.reviews})</span>
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="mb-4">{offer.description}</p>

          <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
            <p className="text-sm font-medium text-orange-800">{offer.offer}</p>
          </div>

          <div className="space-y-2 mb-4">
            <h4 className="font-semibold text-gray-900">Tour Highlights:</h4>
            <ul className="space-y-1">
              {offer.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-4 w-4 mt-0.5 mr-2 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="text-sm text-gray-500 line-through">{offer.originalPrice}</p>
              <p className="text-2xl font-bold text-orange-600">{offer.price}</p>
              <p className="text-xs text-gray-500">per person</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="mt-auto">
          <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
            <Link href={`/offers/${offer.slug}/book`}>
              {offer.cta} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function FeaturedTourCard({ tour }: { tour: typeof featuredTours[0] }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
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
    </motion.div>
  )
}

function OffersSection() {
  const [activeOffer, setActiveOffer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setActiveOffer((p) => (p + 1) % offers.length), 8000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  }

  const offerVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 600 : -600, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 600 : -600, opacity: 0 }),
  }

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Special Offers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Limited time deals on our most popular safaris</p>
        </motion.div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <div className="relative h-[600px] overflow-hidden">
            <AnimatePresence custom={1} initial={false}>
              <motion.div
                key={activeOffer}
                custom={1}
                variants={offerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="absolute inset-0"
              >
                <OfferCard offer={offers[activeOffer]} />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {offers.map((_, index) => (
                <button
                  title="slide"
                  key={index}
                  onClick={() => setActiveOffer(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === activeOffer ? "bg-orange-600 w-6" : "bg-gray-300"}`}
                  aria-label={`Go to offer ${index + 1}`}
                />
              ))}
            </div>

            <button
              title="prev"
              onClick={() => setActiveOffer((prev) => (prev - 1 + offers.length) % offers.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg z-10"
              aria-label="Previous offer"
            >
              <ChevronLeft className="text-orange-600" size={24} />
            </button>
            <button
              title="next"
              onClick={() => setActiveOffer((prev) => (prev + 1) % offers.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg z-10"
              aria-label="Next offer"
            >
              <ChevronRight className="text-orange-600" size={24} />
            </button>
          </div>
        </div>

        {/* Desktop grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {offers.map((offer, index) => (
            <motion.div key={offer.id} variants={itemVariants}>
              <OfferCard offer={offer} featured={index === 1} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  }

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="absolute inset-0">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full relative"
          >
            <Image
              src={heroImages[currentSlide].url}
              alt={heroImages[currentSlide].title}
              fill
              priority={currentSlide === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0" />
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {heroImages.map((_, index) => (
              <button
                title="hero-dot"
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            title="prev-hero"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            title="next-hero"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1 initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-5xl md:text-7xl font-bold mb-6">
            Jae Travel Expeditions
          </motion.h1>
        </div>

        <div className="absolute bottom-20 left-8 z-20 text-white">
          <motion.div key={currentSlide} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-xl font-bold mb-1">{heroImages[currentSlide].title}</h3>
            <p className="text-sm text-gray-200">{heroImages[currentSlide].location}</p>
          </motion.div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Destinations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore the most beautiful places in East Africa</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination) => (
              <motion.div key={destination.name} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={`${destination.name} safari tours`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{destination.name}</h3>
                      <p className="text-sm">{destination.tours} safaris available</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Button className="w-full" asChild>
                      <Link href={`/destinations/${destination.name.toLowerCase()}`}>
                        Explore {destination.name}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OFFERS */}
      <OffersSection />

      {/* BOOKING WIDGET (lazy) */}
      <BookingWidgetSection />

      {/* FEATURED */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Safaris</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Handpicked adventures for your perfect safari</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <motion.div key={tour.id} variants={itemVariants}>
                <FeaturedTourCard tour={tour} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/offers">View All Safaris</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Exceptional safari experiences with local expertise</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🦁", title: "Expert Guides", description: "Professional local guides with decades of experience" },
              { icon: "🚗", title: "Quality Vehicles", description: "Well-maintained 4x4 vehicles with pop-up roofs" },
              { icon: "⭐", title: "Best Experience", description: "We create unforgettable memories that last a lifetime" },
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

      <ReviewsSection />
    </div>
  )
}
