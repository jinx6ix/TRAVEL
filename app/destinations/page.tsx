"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Camera, Mountain } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const destinations = [
  {
    name: "Kenya",
    slug: "kenya",
    image: "https://ik.imagekit.io/jinx/travel/ChatGPT%20Image%20Jun%2015,%202025,%2011_15_36%20PM.png?updatedAt=1750018565605?height=400&width=600",
    description: "The heart of JaeTravel Expeditions with the famous Masai Mara and diverse wildlife.",
    highlights: ["Masai Mara", "Amboseli", "Samburu", "Lake Nakuru"],
    tours: 12,
    bestTime: "July - October",
    wildlife: ["Big Five", "Great Migration", "Flamingos", "Elephants"],
    activities: ["Game Drives", "Hot Air Balloon", "Cultural Visits", "Photography"],
  },
  {
    name: "Tanzania",
    slug: "tanzania",
    image: "https://ik.imagekit.io/jinx/travel/b12582a3dc9844409c80d6aa5b1cf0d4.webp?updatedAt=1750019014225?height=400&width=600",
    description: "Home to Serengeti, Ngorongoro Crater, and Mount Kilimanjaro.",
    highlights: ["Serengeti", "Ngorongoro", "Kilimanjaro", "Zanzibar"],
    tours: 15,
    bestTime: "June - October",
    wildlife: ["Wildebeest Migration", "Lions", "Cheetahs", "Rhinos"],
    activities: ["Mountain Climbing", "Beach Relaxation", "Spice Tours", "Diving"],
  },
  {
    name: "Rwanda",
    slug: "rwanda",
    image: "https://ik.imagekit.io/jinx/travel/Webp.net-resizeimage.jpg?updatedAt=1750019108294?height=400&width=600",
    description: "The land of a thousand hills, famous for mountain gorilla encounters.",
    highlights: ["Volcanoes National Park", "Nyungwe Forest", "Lake Kivu", "Kigali"],
    tours: 8,
    bestTime: "June - September",
    wildlife: ["Mountain Gorillas", "Golden Monkeys", "Chimpanzees", "Birds"],
    activities: ["Gorilla Trekking", "Canopy Walk", "Cultural Tours", "City Tours"],
  },
  {
    name: "Uganda",
    slug: "uganda",
    image: "https://ik.imagekit.io/jinx/travel/paraa_safari_lodge_water_safari_on_the_nile-hi-edited.jpeg?updatedAt=1750019191747?height=400&width=600",
    description: "The Pearl of Africa with incredible biodiversity and primate experiences.",
    highlights: ["Bwindi Forest", "Queen Elizabeth", "Murchison Falls", "Kibale"],
    tours: 7,
    bestTime: "December - February",
    wildlife: ["Mountain Gorillas", "Chimpanzees", "Tree Lions", "Hippos"],
    activities: ["Primate Tracking", "Boat Safaris", "White Water Rafting", "Hiking"],
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

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Our Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8"
          >
            Explore the most spectacular wildlife destinations in East Africa
          </motion.p>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
            {destinations.map((destination, index) => (
              <motion.div key={destination.slug} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                  >
                    <div className={`relative overflow-hidden ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-3xl font-bold mb-2">{destination.name}</h2>
                        <Badge className="bg-orange-600">{destination.tours} Tours Available</Badge>
                      </div>
                    </div>

                    <div className={`p-8 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl mb-2">{destination.name}</CardTitle>
                        <CardDescription className="text-lg">{destination.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="p-0 space-y-6">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <MapPin size={18} className="text-orange-600" />
                            Top Highlights
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.highlights.map((highlight) => (
                              <Badge key={highlight} variant="outline">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Camera size={18} className="text-orange-600" />
                            Wildlife
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.wildlife.map((animal) => (
                              <Badge key={animal} variant="secondary">
                                {animal}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Mountain size={18} className="text-orange-600" />
                            Activities
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.activities.map((activity) => (
                              <Badge key={activity} variant="outline" className="border-green-200">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-semibold">Best Time:</span>
                            <p className="text-gray-600">{destination.bestTime}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Available Tours:</span>
                            <p className="text-gray-600">{destination.tours} tours</p>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button asChild className="flex-1 bg-orange-600 hover:bg-orange-700">
                            <Link href={`/destinations/${destination.slug}`}>Explore {destination.name}</Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href={`/tours?destination=${destination.name}`}>View Tours</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Adventure?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us help you plan the perfect East African safari experience tailored to your preferences.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/tours">Browse All Tours</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Plan Custom Trip</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
