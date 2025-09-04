"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Fuel, Settings, Shield, Camera, Accessibility } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Vehicle {
  id: number
  name: string
  image: string
  description: string
  capacity: string
  features: string[]
  pricePerDay: number
  ideal: string
  specifications: {
    engine: string
    transmission: string
    fuelType: string
    luggage: string
  }
  extras?: Record<string, string>
}

interface VehicleHireClientProps {
  vehicles: Vehicle[]
}

export default function VehicleHireClient({ vehicles }: VehicleHireClientProps) {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-bold mb-4">
            Premium Safari Vehicle Hire
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl mb-8">
            Choose from our fleet of specialized safari vehicles for your East African adventure
          </motion.p>
        </div>
      </section>

      {/* Vehicle Fleet */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Safari Vehicle Fleet</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Professional, well-maintained vehicles designed for the ultimate East African safari experience</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {vehicles.map((vehicle) => (
              <motion.div key={vehicle.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="relative overflow-hidden">
                    <img src={vehicle.image} alt={`${vehicle.name} safari vehicle rental`} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width={400} height={300} />
                    <Badge className="absolute top-4 left-4 bg-orange-600">${vehicle.pricePerDay}/day</Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      {vehicle.name}
                      {vehicle.name.includes("Wheelchair") && <Accessibility className="text-blue-600" size={24} />}
                      {vehicle.name.includes("Photography") && <Camera className="text-purple-600" size={24} />}
                    </CardTitle>
                    <CardDescription className="text-lg">{vehicle.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users size={16} className="text-orange-600" />
                        <span>{vehicle.capacity}</span>
                      </div>
                      <Badge variant="outline" className="text-orange-600 border-green-200">{vehicle.ideal}</Badge>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Key Features</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {vehicle.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-orange-600 rounded-full" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Technical Specifications</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><span className="text-gray-600">Engine:</span><p className="font-medium">{vehicle.specifications.engine}</p></div>
                        <div><span className="text-gray-600">Transmission:</span><p className="font-medium">{vehicle.specifications.transmission}</p></div>
                        <div><span className="text-gray-600">Fuel:</span><p className="font-medium">{vehicle.specifications.fuelType}</p></div>
                        <div><span className="text-gray-600">Luggage:</span><p className="font-medium">{vehicle.specifications.luggage}</p></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-3xl font-bold text-orange-600">${vehicle.pricePerDay}</span>
                        <span className="text-gray-600">/day</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" asChild>
                          <Link href={`/vehicle-hire/${vehicle.id}`} aria-label={`View details for ${vehicle.name}`}>Details</Link>
                        </Button>
                        <Button asChild className="bg-orange-600 hover:bg-orange-700">
                          <Link href={`/contact?vehicle=${encodeURIComponent(vehicle.name)}`} aria-label={`Book ${vehicle.name} now`}>Book Now</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
