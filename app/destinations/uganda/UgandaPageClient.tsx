"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, Camera, MapPin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const ugandaHighlights = [
  {
    name: "Bwindi Impenetrable Forest",
    image: "https://ik.imagekit.io/jinx/travel/bwindi-forest-uganda-gorilla-safaris.jpg?updatedAt=1750021878410",
    description: "UNESCO World Heritage site home to half of the world's mountain gorillas.",
    bestTime: "June - August, December - February",
    activities: ["Gorilla Trekking", "Bird Watching", "Nature Walks"],
    wildlife: ["Mountain Gorillas", "Forest Birds", "Butterflies"],
  },
  {
    name: "Queen Elizabeth National Park",
    image: "https://ik.imagekit.io/jinx/travel/Queen-Elizabeth-National-Park.jpg?updatedAt=1750021975764",
    description: "Diverse ecosystems with tree-climbing lions and boat safaris.",
    bestTime: "June - September",
    activities: ["Game Drives", "Boat Safaris", "Chimpanzee Tracking"],
    wildlife: ["Tree Lions", "Elephants", "Hippos", "Crocodiles"],
  },
  {
    name: "Murchison Falls National Park",
    image: "https://ik.imagekit.io/jinx/travel/murchison-falls.webp?updatedAt=1750022040416",
    description: "Uganda's largest park featuring the powerful Murchison Falls.",
    bestTime: "December - February, June - September",
    activities: ["Game Drives", "Boat Trips", "Hiking to Falls"],
    wildlife: ["Elephants", "Giraffes", "Lions", "Hippos"],
  },
  {
    name: "Rwenzori Mountains",
    image: "https://ik.imagekit.io/jinx/travel/Rwenzori-Mountains-03_1600p.jpg?updatedAt=1750016117660",
    description: "The legendary Mountains of the Moon with glacial peaks.",
    bestTime: "June - August, December - February",
    activities: ["Mountain Climbing", "Hiking", "Photography"],
    wildlife: ["Hyrax", "Chameleons", "Endemic Birds"],
  },
]

const ugandaTours = [
  {
    id: 36,
    title: "Bwindi Gorilla Trekking",
    duration: "4 days",
    price: 2200,
    rating: 4.9,
    image: "https://ik.imagekit.io/jinx/travel/bwindi-forest-uganda-gorilla-safaris.jpg?updatedAt=1750021878410",
  },
  {
    id: 37,
    title: "Queen Elizabeth Safari",
    duration: "5 days",
    price: 1150,
    rating: 4.6,
    image: "https://ik.imagekit.io/jinx/travel/Queen-Elizabeth-National-Park.jpg?updatedAt=1750021975764",
  },
  {
    id: 38,
    title: "Murchison Falls Adventure",
    duration: "4 days",
    price: 980,
    rating: 4.7,
    image: "https://ik.imagekit.io/jinx/travel/murchison-falls.webp?updatedAt=1750022040416",
  },
]

export default function UgandaClient() {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }
  const itemVariants = { hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }

  return (
    <div className="min-h-screen pt-16">
      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold mb-6">Explore Uganda</h2>
              <p className="text-lg text-gray-600 mb-6">
                Uganda, aptly named "The Pearl of Africa" by Winston Churchill, offers some of the continent's most
                diverse wildlife experiences. From mountain gorilla trekking to white-water rafting on the Nile, Uganda
                combines adventure with incredible biodiversity.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Home to half of the world's remaining mountain gorillas, tree-climbing lions, and the source of the
                Nile, Uganda provides unique experiences found nowhere else on Earth.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">7</div>
                  <div className="text-gray-600">Tours Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">500+</div>
                  <div className="text-gray-600">Mountain Gorillas</div>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link href="/tours?destination=Uganda">View Uganda Tours</Link>
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <img
                src="https://ik.imagekit.io/jinx/travel/paraa_safari_lodge_water_safari_on_the_nile-hi-edited.jpeg?updatedAt=1750019191747"
                alt="Uganda Wildlife"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Uganda Highlights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover Uganda's incredible biodiversity and unique wildlife experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ugandaHighlights.map((highlight, index) => (
              <motion.div key={highlight.name} variants={itemVariants} initial="hidden" whileInView="visible" transition={{ delay: index * 0.06 }} viewport={{ once: true }}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img src={highlight.image || "/placeholder.svg"} alt={highlight.name} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
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
                            <Badge key={activity} variant="outline">{activity}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <MapPin size={16} className="text-orange-600" />
                          Wildlife
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {highlight.wildlife.map((animal) => (
                            <Badge key={animal} variant="secondary">{animal}</Badge>
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Uganda Tours</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience Uganda's unique wildlife and adventure opportunities</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ugandaTours.map((tour, index) => (
              <motion.div key={tour.id} variants={itemVariants} initial="hidden" whileInView="visible" transition={{ delay: index * 0.06 }} viewport={{ once: true }}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img src={tour.image || "/placeholder.svg"} alt={tour.title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
                    <Badge className="absolute top-4 left-4 bg-orange-600">Uganda</Badge>
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

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/tours?destination=Uganda">View All Uganda Tours</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
