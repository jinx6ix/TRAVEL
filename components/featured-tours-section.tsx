"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge, Calendar, Star, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"

interface Tour {
  id: number
  slug: string
  title: string
  destination: string
  duration: string
  price: string
  rating: number
  image: string
  description: string
}

export default function FeaturedToursSection({ featuredTours }: { featuredTours: Tour[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  }

  function FeaturedTourCard({ tour }: { tour: typeof featuredTours[0] }) {
    return (
      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
          <div className="relative w-full h-48">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
            <Badge className="absolute top-4 left-4 bg-orange-600 hover:bg-orange-700">{tour.destination}</Badge>
          </div>
  
          <CardHeader>
            <CardTitle className="text-xl">{tour.title}</CardTitle>
            <CardDescription>{tour.description}</CardDescription>
          </CardHeader>
  
          <CardContent className="flex-grow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-orange-600" />
                <span className="text-sm text-gray-600">{tour.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{tour.rating}</span>
              </div>
            </div>
          </CardContent>
  
          <CardFooter className="mt-auto">
            <div className="flex items-center justify-between w-full">
              <span className="text-2xl font-bold text-orange-600">{tour.price}</span>
              <Button asChild>
                <Link href={`/offers/${tour.slug}/book`}>Book Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Safaris</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Handpicked adventures for your perfect safari</p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <motion.div key={tour.id} variants={itemVariants}>
              <FeaturedTourCard tour={tour} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/offers">View All Safaris</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}