"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Camera, Mountain, Calendar, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const destinations = [
  {
    name: "Kenya Safari Destinations",
    slug: "kenya-safari-tours",
    image: "https://ik.imagekit.io/jinx/travel/ChatGPT%20Image%20Jun%2015,%202025,%2011_15_36%20PM.png?updatedAt=1750018565605?height=400&width=600",
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
    image: "https://ik.imagekit.io/jinx/travel/b12582a3dc9844409c80d6aa5b1cf0d4.webp?updatedAt=1750019014225?height=400&width=600",
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
    image: "https://ik.imagekit.io/jinx/travel/Webp.net-resizeimage.jpg?updatedAt=1750019108294?height=400&width=600",
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
    image: "https://ik.imagekit.io/jinx/travel/paraa_safari_lodge_water_safari_on_the_nile-hi-edited.jpeg?updatedAt=1750019191747?height=400&width=600",
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

export default function DestinationsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  // Generate structured data for SEO
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "East Africa Safari Destinations",
      "description": "Explore the best safari destinations in Kenya, Tanzania, Rwanda, and Uganda with JaeTravel Expeditions",
      "url": typeof window !== 'undefined' ? window.location.href : '',
      "numberOfItems": destinations.length,
      "itemListElement": destinations.map((destination, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TouristDestination",
          "name": destination.name,
          "description": destination.description,
          "url": `${typeof window !== 'undefined' ? window.location.origin : ''}/destinations/${destination.slug}`,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": destination.country
          }
        }
      }))
    }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />
      
      {/* Header with semantic markup */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            East Africa Safari Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Discover the most spectacular wildlife destinations in Kenya, Tanzania, Rwanda, and Uganda with expert guides from JaeTravel Expeditions
          </motion.p>
        </div>
      </header>

      {/* Destinations */}
      <section className="py-20" aria-labelledby="destinations-heading">
        <div className="container mx-auto px-4">
          <h2 id="destinations-heading" className="sr-only">Safari Destinations in East Africa</h2>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
            {destinations.map((destination, index) => (
              <motion.article key={destination.slug} variants={itemVariants} itemScope itemType="https://schema.org/TouristDestination">
                <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                  >
                    <div className={`relative overflow-hidden ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={`Wildlife safari in ${destination.name}, ${destination.country}`}
                        className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-300"
                        itemProp="image"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-3xl font-bold mb-2" itemProp="name">{destination.name}</h2>
                        <Badge className="bg-orange-600">
                          <Users size={14} className="mr-1" aria-hidden="true" />
                          {destination.tours} Safari Tours Available
                        </Badge>
                      </div>
                    </div>

                    <div className={`p-8 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl mb-2">{destination.name}</CardTitle>
                        <CardDescription className="text-lg" itemProp="description">
                          {destination.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-0 space-y-6">
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <MapPin size={18} className="text-orange-600" aria-hidden="true" />
                            Top National Parks & Highlights
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {destination.highlights.map((highlight) => (
                              <Badge key={highlight} variant="outline" itemProp="containsPlace">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <Camera size={18} className="text-orange-600" aria-hidden="true" />
                            Wildlife & Animals
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {destination.wildlife.map((animal) => (
                              <Badge key={animal} variant="secondary" itemProp="attraction">
                                {animal}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <Mountain size={18} className="text-orange-600" aria-hidden="true" />
                            Safari Activities & Experiences
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {destination.activities.map((activity) => (
                              <Badge key={activity} variant="outline" className="border-green-200">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-start gap-2">
                            <Calendar size={18} className="text-orange-600 mt-0.5" aria-hidden="true" />
                            <div>
                              <span className="font-semibold">Best Time to Visit:</span>
                              <p className="text-gray-600">{destination.bestTime}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Users size={18} className="text-orange-600 mt-0.5" aria-hidden="true" />
                            <div>
                              <span className="font-semibold">Ideal For:</span>
                              <p className="text-gray-600">{destination.bestFor.join(", ")}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button asChild className="flex-1 bg-orange-600 hover:bg-orange-700">
                            <Link href={`/destinations/${destination.slug}`} aria-label={`Explore ${destination.name} safari destination`}>
                              Explore {destination.country} Safaris
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href={`/tours?destination=${destination.country}`} aria-label={`View tours in ${destination.country}`}>
                              View All Tours
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-orange-50" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">Ready for Your East African Safari Adventure?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let our safari experts help you plan the perfect wildlife experience tailored to your preferences and budget.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/tours" aria-label="Browse all safari tours">
                  Browse All Safari Tours
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact" aria-label="Plan a custom safari trip">
                  Plan Custom Safari Trip
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}