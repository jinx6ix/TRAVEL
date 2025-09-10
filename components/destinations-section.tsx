"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Destination {
  name: string
  image: string
  tours: number
}

export default function DestinationsSection({ destinations }: { destinations: Destination[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  }

  return (
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Destinations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore the most beautiful places in East Africa</p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <motion.div key={destination.name} variants={itemVariants}>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={`${destination.name} safari tours`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{destination.name}</h3>
                    <p className="text-sm">{destination.tours} safaris available</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Button className="w-full" asChild>
                    <Link href={`/destinations/${destination.name.toLowerCase()}`}>
                      Explore {destination.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}