"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, Camera, TelescopeIcon as Binoculars } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const tanzaniaHighlights = [
  {
    name: "Serengeti National Park",
    image: "https://ik.imagekit.io/jinx/travel/Serengeti-National-Park-Africa-Kenya-Safaris2.jpg?updatedAt=1750017260460?height=300&width=400",
    description: "Endless plains hosting the Great Migration and abundant wildlife.",
    bestTime: "June - October",
    activities: ["Game Drives", "Hot Air Balloon", "Photography"],
    wildlife: ["Wildebeest", "Lions", "Cheetahs", "Leopards"],
  },
  {
    name: "Ngorongoro Crater",
    image: "https://ik.imagekit.io/jinx/travel/Ngorongoro-Crater.jpg?updatedAt=1750013843530?height=300&width=400",
    description: "World's largest intact volcanic caldera with incredible wildlife density.",
    bestTime: "Year-round",
    activities: ["Game Drives", "Cultural Tours", "Photography"],
    wildlife: ["Big Five", "Flamingos", "Hippos", "Hyenas"],
  },
  {
    name: "Mount Kilimanjaro",
    image: "https://ik.imagekit.io/jinx/travel/kilimanjaro-moutain-climbing.jpg?updatedAt=1750013910253?height=300&width=400",
    description: "Africa's highest peak and world's tallest free-standing mountain.",
    bestTime: "January - March, June - October",
    activities: ["Mountain Climbing", "Trekking", "Photography"],
    wildlife: ["Colobus Monkeys", "Blue Monkeys", "Various Birds"],
  },
  {
    name: "Zanzibar Archipelago",
    image: "https://ik.imagekit.io/jinx/travel/GettyImages-471172058_high.jpg?updatedAt=1750021568930?height=300&width=400",
    description: "Spice islands with pristine beaches and rich cultural heritage.",
    bestTime: "June - September",
    activities: ["Beach Relaxation", "Spice Tours", "Diving", "Cultural Tours"],
    wildlife: ["Dolphins", "Sea Turtles", "Tropical Fish"],
  },
]

const tanzaniaTours = [
  {
    id: 13,
    title: "Serengeti Wildlife Safari",
    duration: "7 days",
    price: 1800,
    rating: 4.8,
    image: "https://ik.imagekit.io/jinx/travel/serengeti-day-trip.jpeg?updatedAt=1750016757896?height=250&width=350",
  },
  {
    id: 14,
    title: "Ngorongoro Crater Tour",
    duration: "3 days",
    price: 950,
    rating: 4.9,
    image: "https://ik.imagekit.io/jinx/travel/Ngorongoro-Crater.jpg?updatedAt=1750013843530?height=250&width=350",
  },
  {
    id: 15,
    title: "Kilimanjaro Climbing",
    duration: "8 days",
    price: 2200,
    rating: 4.7,
    image: "https://ik.imagekit.io/jinx/travel/kilimanjaro-moutain-climbing.jpg?updatedAt=1750013910253?height=250&width=350",
  },
]

export default function TanzaniaPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            🇹🇿 Tanzania Adventures
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8"
          >
            Home to Serengeti, Ngorongoro Crater, Mount Kilimanjaro, and Zanzibar
          </motion.p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Explore Tanzania</h2>
              <p className="text-lg text-gray-600 mb-6">
                Tanzania offers some of Africa's most iconic destinations. From the endless plains of the Serengeti to
                the pristine beaches of Zanzibar, and from the wildlife-rich Ngorongoro Crater to the towering peak of
                Kilimanjaro.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Experience the Great Migration, climb Africa's highest mountain, relax on spice island beaches, and
                immerse yourself in rich Swahili culture.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">15</div>
                  <div className="text-gray-600">Tours Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">22</div>
                  <div className="text-gray-600">National Parks</div>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link href="/tours?destination=Tanzania">View Tanzania Tours</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://ik.imagekit.io/jinx/travel/b12582a3dc9844409c80d6aa5b1cf0d4.webp?updatedAt=1750019014225?height=500&width=600"
                alt="Tanzania Wildlife"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Tanzania Highlights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover Tanzania's most spectacular destinations and experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tanzaniaHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-orange-600">{highlight.bestTime}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{highlight.name}</CardTitle>
                    <CardDescription>{highlight.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Camera size={16} className="text-orange-600" />
                          Activities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {highlight.activities.map((activity) => (
                            <Badge key={activity} variant="outline">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Binoculars size={16} className="text-orange-600" />
                          Wildlife
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {highlight.wildlife.map((animal) => (
                            <Badge key={animal} variant="secondary">
                              {animal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Tanzania Tours</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the best of Tanzania with our carefully curated tours
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tanzaniaTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-orange-600">Tanzania</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{tour.title}</CardTitle>
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
                      <span className="text-2xl font-bold text-orange-600">${tour.price}</span>
                      <Button asChild>
                        <Link href={`/tours/${tour.id}`}>Book Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" asChild>
              <Link href="/tours?destination=Tanzania">View All Tanzania Tours</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
