"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, Camera, TelescopeIcon as Binoculars } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const rwandaHighlights = [
  {
    name: "Volcanoes National Park",
    image: "/placeholder.svg?height=300&width=400",
    description: "Home to mountain gorillas and golden monkeys in the Virunga Mountains.",
    bestTime: "June - September",
    activities: ["Gorilla Trekking", "Golden Monkey Tracking", "Volcano Hiking"],
    wildlife: ["Mountain Gorillas", "Golden Monkeys", "Forest Birds"],
  },
  {
    name: "Nyungwe Forest National Park",
    image: "/placeholder.svg?height=300&width=400",
    description: "Ancient rainforest with canopy walkway and diverse primates.",
    bestTime: "June - September",
    activities: ["Canopy Walk", "Chimpanzee Tracking", "Bird Watching"],
    wildlife: ["Chimpanzees", "Colobus Monkeys", "300+ Bird Species"],
  },
  {
    name: "Lake Kivu",
    image: "/placeholder.svg?height=300&width=400",
    description: "One of Africa's Great Lakes with stunning scenery and relaxation.",
    bestTime: "Year-round",
    activities: ["Boat Trips", "Swimming", "Cycling", "Coffee Tours"],
    wildlife: ["Fish Eagles", "Kingfishers", "Various Fish Species"],
  },
  {
    name: "Akagera National Park",
    image: "/placeholder.svg?height=300&width=400",
    description: "Rwanda's only savanna park with Big Five and diverse ecosystems.",
    bestTime: "June - September",
    activities: ["Game Drives", "Boat Safaris", "Bird Watching"],
    wildlife: ["Lions", "Elephants", "Rhinos", "Hippos"],
  },
]

const rwandaTours = [
  {
    id: 28,
    title: "Gorilla Trekking Experience",
    duration: "3 days",
    price: 2500,
    rating: 5.0,
    image: "/placeholder.svg?height=250&width=350",
  },
  {
    id: 29,
    title: "Nyungwe Forest Canopy Walk",
    duration: "2 days",
    price: 450,
    rating: 4.6,
    image: "/placeholder.svg?height=250&width=350",
  },
  {
    id: 33,
    title: "Golden Monkey Tracking",
    duration: "2 days",
    price: 680,
    rating: 4.7,
    image: "/placeholder.svg?height=250&width=350",
  },
]

export default function RwandaPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            🇷🇼 Rwanda - Land of a Thousand Hills
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8"
          >
            Famous for mountain gorilla encounters and stunning landscapes
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
              <h2 className="text-4xl font-bold mb-6">Discover Rwanda</h2>
              <p className="text-lg text-gray-600 mb-6">
                Rwanda, known as the "Land of a Thousand Hills," is a remarkable destination offering unique wildlife
                experiences, particularly mountain gorilla trekking. This small but beautiful country has transformed
                into one of Africa's premier eco-tourism destinations.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From the misty mountains of Volcanoes National Park to the ancient rainforests of Nyungwe, Rwanda offers
                intimate wildlife encounters and breathtaking landscapes.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">8</div>
                  <div className="text-gray-600">Tours Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">1000+</div>
                  <div className="text-gray-600">Mountain Gorillas</div>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link href="/tours?destination=Rwanda">View Rwanda Tours</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img src="/placeholder.svg?height=500&width=600" alt="Rwanda Gorillas" className="rounded-lg shadow-xl" />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Rwanda Highlights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience Rwanda's unique wildlife and stunning natural beauty
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rwandaHighlights.map((highlight, index) => (
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Rwanda Tours</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unique primate experiences and cultural encounters in Rwanda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rwandaTours.map((tour, index) => (
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
                    <Badge className="absolute top-4 left-4 bg-orange-600">Rwanda</Badge>
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
              <Link href="/tours?destination=Rwanda">View All Rwanda Tours</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
