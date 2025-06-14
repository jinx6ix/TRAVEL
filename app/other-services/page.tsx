"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Hotel, Camera, Users, MapPin, Shield, Utensils, Car } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const services = [
  {
    id: 1,
    title: "Airport Transfers",
    description: "Comfortable and reliable airport pickup and drop-off services for all major airports in East Africa.",
    icon: <Plane className="text-blue-600" size={48} />,
    features: ["Meet & Greet Service", "24/7 Availability", "Professional Drivers", "Flight Tracking"],
    price: "From $30",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Hotel Bookings",
    description:
      "Curated selection of accommodations from luxury lodges to budget-friendly options across East Africa.",
    icon: <Hotel className="text-green-600" size={48} />,
    features: ["Luxury Lodges", "Budget Hotels", "Tented Camps", "City Hotels"],
    price: "Varies",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Photography Services",
    description: "Professional wildlife and travel photography services to capture your safari memories.",
    icon: <Camera className="text-purple-600" size={48} />,
    features: ["Professional Photographer", "High-Quality Equipment", "Edited Photos", "Digital Delivery"],
    price: "From $250/day",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Group Tours",
    description: "Specialized group tour packages for families, friends, corporate teams, and educational groups.",
    icon: <Users className="text-orange-600" size={48} />,
    features: ["Custom Itineraries", "Group Discounts", "Team Building", "Educational Programs"],
    price: "Group Rates",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "City Tours",
    description: "Explore vibrant East African cities with guided tours showcasing culture, history, and local life.",
    icon: <MapPin className="text-red-600" size={48} />,
    features: ["Cultural Sites", "Local Markets", "Historical Tours", "Food Tours"],
    price: "From $60",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Travel Insurance",
    description: "Comprehensive travel insurance coverage for peace of mind during your East African adventure.",
    icon: <Shield className="text-indigo-600" size={48} />,
    features: ["Medical Coverage", "Trip Cancellation", "Equipment Protection", "24/7 Support"],
    price: "From $20",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "Catering Services",
    description: "Delicious local and international cuisine options for your safari and travel experiences.",
    icon: <Utensils className="text-yellow-600" size={48} />,
    features: ["Local Cuisine", "International Menu", "Dietary Requirements", "Bush Dining"],
    price: "From $35/meal",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "Private Transfers",
    description: "Comfortable private transportation between cities, parks, and attractions across East Africa.",
    icon: <Car className="text-teal-600" size={48} />,
    features: ["Private Vehicles", "Experienced Drivers", "Flexible Schedule", "Door-to-Door Service"],
    price: "From $90/day",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function OtherServicesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
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
            Other Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8"
          >
            Complete travel solutions for your East African adventure
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Complete Travel Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Beyond safaris, we offer comprehensive services to make your East African journey seamless and memorable
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full group">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-white text-gray-800">{service.price}</Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      {service.icon}
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-3">{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Learn More
                      </Button>
                      <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700" asChild>
                        <Link href={`/contact?service=${service.title}`}>Book Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our services are designed to provide you with the best travel experience in East Africa. From reliable
              airport transfers to luxurious hotel bookings, we have got you covered.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
