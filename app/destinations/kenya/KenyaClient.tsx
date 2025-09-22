"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, Camera, MapPin, Users, Award } from "lucide-react"

const kenyaHighlights = [
    {
      name: "Masai Mara National Reserve",
      image: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg?updatedAt=1750013375250?height=300&width=400",
      description: "World-famous for the Great Migration and Big Five sightings. Experience the greatest wildlife spectacle on earth with millions of wildebeest crossing the Mara River.",
      bestTime: "July - October (Great Migration season)",
      activities: ["Game Drives", "Hot Air Balloon Safaris", "Maasai Cultural Visits", "Photography"],
      wildlife: ["Lions", "Elephants", "Wildebeest", "Zebras", "Cheetahs", "Leopards"],
      location: "Southwestern Kenya",
      area: "1,510 km²",
      unesco: false
    },
    {
      name: "Amboseli National Park",
      image: "https://ik.imagekit.io/jinx/travel/amboseli-elephants-00007.jpg?updatedAt=1750008046158?height=300&width=400",
      description: "Spectacular views of Mount Kilimanjaro and large elephant herds. Known for its large elephant populations and stunning views of Africa's highest mountain.",
      bestTime: "June - October (Dry season)",
      activities: ["Game Drives", "Photography Tours", "Nature Walks", "Bird Watching"],
      wildlife: ["Elephants", "Lions", "Cheetahs", "Buffaloes", "Giraffes", "Over 400 bird species"],
      location: "Southern Kenya",
      area: "392 km²",
      unesco: false
    },
    {
      name: "Samburu National Reserve",
      image: "https://ik.imagekit.io/jinx/travel/Samburu_National_Reserve,_Kenya-26December2012.jpg?updatedAt=1750008245147?height=300&width=400",
      description: "Unique wildlife species in the northern frontier district. Home to the 'Samburu Special Five' - rare species found only in this arid region.",
      bestTime: "June - September (Cool dry season)",
      activities: ["Game Drives", "Cultural Tours", "Bird Watching", "Guided Nature Walks"],
      wildlife: ["Grevy's Zebra", "Reticulated Giraffe", "Beisa Oryx", "Somali Ostrich", "Gerenuk"],
      location: "Northern Kenya",
      area: "165 km²",
      unesco: false
    },
    {
      name: "Lake Nakuru National Park",
      image: "https://ik.imagekit.io/jinx/travel/lake-nakuru-flamingos-in-red-sunset-590x390.jpg?updatedAt=1750008429931?height=300&width=400",
      description: "Famous for flamingos and rhino sanctuary. A birdwatcher's paradise with over 450 bird species and successful rhino conservation programs.",
      bestTime: "Year-round (Best June-March)",
      activities: ["Game Drives", "Bird Watching", "Photography", "Rhino Tracking"],
      wildlife: ["Flamingos", "Rhinos", "Lions", "Leopards", "Waterbucks", "Pelicans"],
      location: "Central Kenya",
      area: "188 km²",
      unesco: true
    },
  ]
  
  const kenyaTours = [
    {
      id: 1,
      title: "Classic Maasai Mara Safari",
      duration: "5 days / 4 nights",
      price: 1200,
      rating: 4.9,
      image: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg?updatedAt=1750013375250?height=250&width=350",
      highlights: ["Great Migration viewing", "Big Five sightings", "Maasai village visit", "Game drives"],
      groupSize: "Small groups (max 6)",
      season: "Year-round",
      slug: "masai-mara-safari-adventure"
    },
    {
      id: 2,
      title: "Amboseli Elephant Safari",
      duration: "4 days / 3 nights",
      price: 980,
      rating: 4.7,
      image: "https://ik.imagekit.io/jinx/travel/amboseli-elephants-00007.jpg?updatedAt=1750008046158?height=250&width=350",
      highlights: ["Mount Kilimanjaro views", "Elephant research", "Photography sessions", "Nature walks"],
      season: "Best June-October",
      slug: "amboseli-elephant-safari"
    },
    {
      id: 3,
      title: "Samburu Special Five Safari",
      duration: "3 days / 2 nights",
      price: 750,
      rating: 4.6,
      image: "https://ik.imagekit.io/jinx/travel/Samburu_National_Reserve,_Kenya-26December2012.jpg?updatedAt=1750008245147?height=250&width=350",
      highlights: ["Rare species viewing", "Cultural experiences", "River activities", "Bird watching"],
      groupSize: "Small groups (max 6)",
      season: "Year-round",
      slug: "samburu-game-reserve"
    },
  ]
  
export default function KenyaClient() {
  return (
    <>
      {/* ✅ Overview Section */}
      <section className="py-20" aria-labelledby="kenya-overview">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            id="kenya-overview"
            className="text-4xl font-bold mb-6"
          >
            Discover Kenya Safari Adventures
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Kenya is the birthplace of safari and home to the Big Five, Great
            Migration, and rich Maasai heritage.
          </motion.p>
        </div>
      </section>

      {/* ✅ Highlights Section */}
      <section className="py-20 bg-gray-50" aria-labelledby="kenya-highlights">
        <div className="container mx-auto px-4">
          <h2
            id="kenya-highlights"
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            Kenya Safari Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {kenyaHighlights.map((h, i) => (
              <motion.div
                key={h.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <Card>
                  <img
                    src={h.image}
                    alt={`${h.name} Kenya safari destination`}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{h.name}</CardTitle>
                    <CardDescription>{h.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin size={14} />
                      <span>
                        {h.location} • {h.area}
                      </span>
                    </div>
                    {h.unesco && (
                      <Badge className="bg-blue-600">
                        <Award size={12} className="mr-1" /> UNESCO Site
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Tours Section */}
      <section className="py-20" aria-labelledby="featured-tours">
        <div className="container mx-auto px-4">
          <h2
            id="featured-tours"
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            Featured Kenya Safari Tours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kenyaTours.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <Card>
                  <img
                    src={t.image}
                    alt={`${t.title} safari tour`}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{t.title}</CardTitle>
                    <CardDescription>{t.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-bold">
                        ${t.price}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400" />
                        {t.rating}
                      </span>
                    </div>
                    <Button asChild className="mt-4 bg-orange-600 hover:bg-orange-700">
                      <Link href={`/tours/${t.slug}`}>View Tour</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
