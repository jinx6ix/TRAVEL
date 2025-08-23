"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, Camera, TelescopeIcon as Binoculars, MapPin, Users, Award } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

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
    season: "Year-round"
  },
  {
    id: 2,
    title: "Amboseli Elephant Safari",
    duration: "4 days / 3 nights",
    price: 980,
    rating: 4.7,
    image: "https://ik.imagekit.io/jinx/travel/amboseli-elephants-00007.jpg?updatedAt=1750008046158?height=250&width=350",
    highlights: ["Mount Kilimanjaro views", "Elephant research", "Photography sessions", "Nature walks"],
    groupSize: "Private tours available",
    season: "Best June-October"
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
    season: "Year-round"
  },
]

export default function KenyaPage() {
  // Generate structured data for SEO
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": "Kenya Safari Tours - JaeTravel Expeditions",
      "description": "Experience the best Kenya safari tours including Masai Mara, Amboseli, Samburu, and Lake Nakuru with expert guides from JaeTravel Expeditions",
      "url": typeof window !== 'undefined' ? window.location.href : '',
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Kenya"
      },
      "containsPlace": kenyaHighlights.map(park => ({
        "@type": "TouristAttraction",
        "name": park.name,
        "description": park.description
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
      <header className="bg-gradient-to-r from-green-600 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            🇰🇪 Kenya Safari Tours - JaeTravel Expeditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Experience the ultimate African safari in Kenya's famous Masai Mara, Amboseli, and diverse wildlife parks with expert guides
          </motion.p>
        </div>
      </header>

      {/* Overview */}
      <section className="py-20" aria-labelledby="kenya-overview">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 id="kenya-overview" className="text-4xl font-bold mb-6">Discover Kenya Safari Adventures</h2>
              <p className="text-lg text-gray-600 mb-6">
                Kenya is the birthplace of safari and remains one of Africa's premier wildlife destinations. From the
                world-famous Masai Mara to the snow-capped peaks of Mount Kenya, this diverse country offers
                unforgettable experiences for wildlife enthusiasts and photographers.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Home to the Great Migration, the Big Five, and rich Maasai cultural heritage, Kenya provides the perfect
                introduction to East African wildlife and authentic cultural experiences with JaeTravel Expeditions.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">12+</div>
                  <div className="text-gray-600">Safari Tours</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">50+</div>
                  <div className="text-gray-600">National Parks</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">1000+</div>
                  <div className="text-gray-600">Wildlife Species</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <div className="text-gray-600">Expert Guides</div>
                </div>
              </div>
              <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/tours?destination=Kenya">Explore Kenya Safari Tours</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://ik.imagekit.io/jinx/travel/ChatGPT%20Image%20Jun%2015,%202025,%2011_15_36%20PM.png?updatedAt=1750018565605?height=500&width=600" 
                alt="Kenya wildlife safari with elephants and Mount Kilimanjaro backdrop" 
                className="rounded-lg shadow-xl" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-gray-50" aria-labelledby="kenya-highlights">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="kenya-highlights" className="text-4xl md:text-5xl font-bold mb-4">Kenya Safari Highlights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore Kenya's most spectacular national parks and game reserves with expert guides
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
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={highlight.image || "/placeholder.svg"}
                      alt={`${highlight.name} Kenya safari destination`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-orange-600 w-fit">
                        <Calendar size={12} className="mr-1" />
                        {highlight.bestTime}
                      </Badge>
                      {highlight.unesco && (
                        <Badge className="bg-blue-600 w-fit">
                          <Award size={12} className="mr-1" />
                          UNESCO Site
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{highlight.name}</CardTitle>
                    <CardDescription>{highlight.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} />
                      <span>{highlight.location} • {highlight.area}</span>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Camera size={16} className="text-orange-600" />
                        Safari Activities
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {highlight.activities.map((activity) => (
                          <Badge key={activity} variant="outline" className="text-xs">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Binoculars size={16} className="text-orange-600" />
                        Wildlife Highlights
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {highlight.wildlife.map((animal) => (
                          <Badge key={animal} variant="secondary" className="text-xs">
                            {animal}
                          </Badge>
                        ))}
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
      <section className="py-20" aria-labelledby="featured-tours">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="featured-tours" className="text-4xl md:text-5xl font-bold mb-4">Featured Kenya Safari Tours</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked safari experiences showcasing the best of Kenya's wildlife and landscapes
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
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={`${tour.title} Kenya safari tour`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-orange-600">Kenya Safari</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{tour.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar size={14} />
                      {tour.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-600" />
                        <span className="text-sm text-gray-600">{tour.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{tour.rating}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-sm">Tour Highlights:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {tour.highlights.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-orange-600 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-orange-600">${tour.price}</span>
                        <span className="text-sm text-gray-600 block">per person</span>
                      </div>
                      <Button asChild className="bg-orange-600 hover:bg-orange-700">
                        <Link href={`/tours/${tour.id}`}>View Tour</Link>
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
            <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/tours?destination=Kenya">View All Kenya Safari Tours</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Kenya Safari Adventure?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact our Kenya safari experts to plan your perfect wildlife experience with JaeTravel Expeditions
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/contact">Plan Your Safari</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/destinations">Explore More Destinations</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}