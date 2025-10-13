"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Camera, Mountain, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Destination {
  name: string
  slug: string
  image: string
  description: string
  highlights: string[]
  tours: number
  bestTime: string
  wildlife: string[]
  activities: string[]
  country: string
  region: string
  bestFor: string[]
}

interface DestinationsClientProps {
  destinations: Destination[]
}

export default function DestinationsClient({ destinations }: DestinationsClientProps) {
  const [structuredData, setStructuredData] = useState("")

  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Karen Road",
        "addressLocality": "Nairobi",
        "addressRegion": "Nairobi County",
        "postalCode": "00100",
        "addressCountry": "KE"
      },
      name: "East Africa Safari Destinations",
      description: "Explore Kenya, Tanzania, Rwanda, and Uganda safari destinations with expert guides from JaeTravel Expeditions",
      url: typeof window !== "undefined" ? window.location.href : "",
      numberOfItems: destinations.length,
      itemListElement: destinations.map((destination, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristDestination",
          name: destination.name,
          description: destination.description,
          url: `${typeof window !== "undefined" ? window.location.origin : ""}/destinations/${destination.slug}`,
          address: { "@type": "PostalAddress", addressCountry: destination.country }
        }
      }))
    }
    setStructuredData(JSON.stringify(data))
  }, [destinations])

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }
  const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }

  return (
    <div className="min-h-screen pt-16">
      {/* Structured Data for SEO */}
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />}

      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-bold mb-4">
          East Africa Safari Destinations
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl mb-8 max-w-3xl mx-auto">
          Discover the most spectacular wildlife destinations in Kenya, Tanzania, Rwanda, and Uganda with expert guides from JaeTravel Expeditions
        </motion.p>
      </header>

      {/* Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
            {destinations.map((destination, index) => (
              <motion.article key={destination.slug} variants={itemVariants} itemScope itemType="https://schema.org/TouristDestination">
                <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                    <div className={`relative overflow-hidden ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <img src={destination.image} alt={destination.name} className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-300" itemProp="image" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-3xl font-bold mb-2" itemProp="name">{destination.name}</h2>
                        <Badge className="bg-orange-600">
                          <Users size={14} className="mr-1" /> {destination.tours} Safari Tours
                        </Badge>
                      </div>
                    </div>

                    <div className={`p-8 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl mb-2">{destination.name}</CardTitle>
                        <CardDescription className="text-lg" itemProp="description">{destination.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="p-0 space-y-6">
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2"><MapPin size={18} className="text-orange-600" />Top National Parks</h3>
                          <div className="flex flex-wrap gap-2">{destination.highlights.map((h) => <Badge key={h} variant="outline">{h}</Badge>)}</div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2"><Camera size={18} className="text-orange-600" />Wildlife & Animals</h3>
                          <div className="flex flex-wrap gap-2">{destination.wildlife.map((w) => <Badge key={w} variant="secondary">{w}</Badge>)}</div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2"><Mountain size={18} className="text-orange-600" />Activities</h3>
                          <div className="flex flex-wrap gap-2">{destination.activities.map((a) => <Badge key={a} variant="outline">{a}</Badge>)}</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-start gap-2"><Calendar size={18} className="text-orange-600 mt-0.5" /><div><span className="font-semibold">Best Time:</span><p className="text-gray-600">{destination.bestTime}</p></div></div>
                          <div className="flex items-start gap-2"><Users size={18} className="text-orange-600 mt-0.5" /><div><span className="font-semibold">Ideal For:</span><p className="text-gray-600">{destination.bestFor.join(", ")}</p></div></div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button asChild className="flex-1 bg-orange-600 hover:bg-orange-700"><Link href={`/destinations/${destination.slug}`}>Explore {destination.country} Safaris</Link></Button>
                          <Button variant="outline" asChild><Link href={`/tours?destination=${destination.country}`}>View All Tours</Link></Button>
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

      {/* CTA */}
      <section className="py-20 bg-orange-50 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your East African Safari Adventure?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Let our safari experts help you plan the perfect wildlife experience tailored to your preferences and budget.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700"><Link href="/tours">Browse All Safari Tours</Link></Button>
            <Button size="lg" variant="outline" asChild><Link href="/contact">Plan Custom Safari Trip</Link></Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
