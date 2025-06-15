"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, Camera, TelescopeIcon as Binoculars } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const kenyaHighlights = [
  {
    name: "Masai Mara National Reserve",
    image: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg?updatedAt=1750013375250?height=300&width=400",
    description: "World-famous for the Great Migration and Big Five sightings.",
    bestTime: "July - October",
    activities: ["Game Drives", "Hot Air Balloon", "Cultural Visits"],
    wildlife: ["Lions", "Elephants", "Wildebeest", "Zebras"],
  },
  {
    name: "Amboseli National Park",
    image: "https://ik.imagekit.io/jinx/travel/amboseli-elephants-00007.jpg?updatedAt=1750008046158?height=300&width=400",
    description: "Spectacular views of Mount Kilimanjaro and large elephant herds.",
    bestTime: "June - October",
    activities: ["Game Drives", "Photography", "Nature Walks"],
    wildlife: ["Elephants", "Lions", "Cheetahs", "Buffaloes"],
  },
  {
    name: "Samburu National Reserve",
    image: "https://ik.imagekit.io/jinx/travel/Samburu_National_Reserve,_Kenya-26December2012.jpg?updatedAt=1750008245147?height=300&width=400",
    description: "Unique wildlife species in the northern frontier district.",
    bestTime: "June - September",
    activities: ["Game Drives", "Cultural Tours", "Bird Watching"],
    wildlife: ["Grevy's Zebra", "Reticulated Giraffe", "Beisa Oryx"],
  },
  {
    name: "Lake Nakuru National Park",
    image: "https://ik.imagekit.io/jinx/travel/lake-nakuru-flamingos-in-red-sunset-590x390.jpg?updatedAt=1750008429931?height=300&width=400",
    description: "Famous for flamingos and rhino sanctuary.",
    bestTime: "Year-round",
    activities: ["Game Drives", "Bird Watching", "Photography"],
    wildlife: ["Flamingos", "Rhinos", "Lions", "Leopards"],
  },
]

const kenyaTours = [
  {
    id: 1,
    title: "Maasai Mara Safari",
    duration: "5 days",
    price: 1200,
    rating: 4.9,
    image: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg?updatedAt=1750013375250?height=250&width=350",
  },
  {
    id: 2,
    title: "Amboseli Elephant Safari",
    duration: "4 days",
    price: 980,
    rating: 4.7,
    image: "https://ik.imagekit.io/jinx/travel/amboseli-elephants-00007.jpg?updatedAt=1750008046158?height=250&width=350",
  },
  {
    id: 3,
    title: "Samburu Game Reserve",
    duration: "3 days",
    price: 750,
    rating: 4.6,
    image: "https://ik.imagekit.io/jinx/travel/Samburu_National_Reserve,_Kenya-26December2012.jpg?updatedAt=1750008245147?height=250&width=350",
  },
]

export default function KenyaPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            🇰🇪 Kenya JaeTravel Expedition
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8"
          >
            The heart of JaeTravel Expedition with the famous Masai Mara and diverse wildlife
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
              <h2 className="text-4xl font-bold mb-6">Discover Kenya</h2>
              <p className="text-lg text-gray-600 mb-6">
                Kenya is the birthplace of safari and remains one of Africa's premier wildlife destinations. From the
                world-famous Masai Mara to the snow-capped peaks of Mount Kenya, this diverse country offers
                unforgettable experiences.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Home to the Great Migration, the Big Five, and rich cultural heritage, Kenya provides the perfect
                introduction to East African wildlife and culture.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">12</div>
                  <div className="text-gray-600">Tours Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">50+</div>
                  <div className="text-gray-600">National Parks</div>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link href="/tours?destination=Kenya">View Kenya Tours</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img src="https://ik.imagekit.io/jinx/travel/ChatGPT%20Image%20Jun%2015,%202025,%2011_15_36%20PM.png?updatedAt=1750018565605?height=500&width=600" alt="Kenya Wildlife" className="rounded-lg shadow-xl" />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Kenya Highlights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore Kenya's most spectacular national parks and reserves
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {kenyaHighlights.map((highlight, index) => (
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Kenya Tours</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked safari experiences showcasing the best of Kenya
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kenyaTours.map((tour, index) => (
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
                    <Badge className="absolute top-4 left-4 bg-orange-600">Kenya</Badge>
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
              <Link href="/tours?destination=Kenya">View All Kenya Tours</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
