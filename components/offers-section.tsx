"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, ChevronLeft, ChevronRight, ArrowRight, Check } from "lucide-react"

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

export default function OffersSection() {
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