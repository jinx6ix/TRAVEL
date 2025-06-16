"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

type FeatureKey = 
  | "popUpRoof"
  | "cameraMounts"
  | "swivelSeats"
  | "chargingStations"
  | "equipmentStorage"
  | "gpsNavigation"
  | "professionalGuide"
  | "sunsetViewing"

const photoSpecs = {
  name: "Photography Converted Vehicle",
  image: "/placeholder.svg?height=400&width=600",
  descriptionKey: "photographyVehicleDescription",
  capacity: "4 passengers",
  pricePerDay: 180,
  featuresKeys: [
    "popUpRoof",
    "cameraMounts",
    "swivelSeats",
    "chargingStations",
    "equipmentStorage",
    "gpsNavigation",
    "professionalGuide",
    "sunsetViewing",
  ] as FeatureKey[],
  specifications: {
    vehicle: "Customized 4x4 Safari Vehicle",
    roof: "360° pop-up photography roof",
    mounts: "Multiple camera mounting points",
    power: "Dual battery system with inverters",
    storage: "Secure equipment compartments",
    seating: "Rotating captain chairs",
    windows: "Slide-open for low-angle shots",
  },
  ideal: "Perfect for wildlife photographers and videographers",
  included: [
    "Professional photography guide",
    "All necessary camera mounts",
    "Equipment charging stations",
    "National park entry fees",
    "Unlimited mileage within parks",
    "Comprehensive insurance",
    "Customized safari routes",
  ],
}

export default function PhotographyVehiclePage() {
  const featureTextMap: Record<FeatureKey, string> = {
    popUpRoof: "360° Pop-Up Roof",
    cameraMounts: "Professional Camera Mounts",
    swivelSeats: "Swivel Seats for Stability",
    chargingStations: "Multiple Charging Stations",
    equipmentStorage: "Secure Equipment Storage",
    gpsNavigation: "GPS Navigation System",
    professionalGuide: "Professional Photography Guide",
    sunsetViewing: "Sunset Viewing Platform",
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/20">
              <Link href="/vehicle-hire">
                <ArrowLeft size={24} />
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold">Photography Converted Vehicle</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl"
          >
            Capture stunning wildlife moments with our specially designed photography vehicle
          </motion.p>
        </div>
      </section>

      {/* Vehicle Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={photoSpecs.image || "/placeholder.svg"}
                alt={photoSpecs.name}
                className="w-full rounded-lg shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">{photoSpecs.name}</h2>
                <p className="text-lg text-gray-600 mb-4">
                  Specially designed for photographers with all the necessary features for perfect shots.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <Badge className="bg-orange-600">${photoSpecs.pricePerDay}/day</Badge>
                  <Badge variant="outline">{photoSpecs.capacity}</Badge>
                  <Badge variant="secondary">{photoSpecs.ideal}</Badge>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="text-orange-600" size={24} />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {photoSpecs.featuresKeys.map((featureKey) => (
                      <div key={featureKey} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full" />
                        <span className="text-sm">{featureTextMap[featureKey]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1 bg-orange-600 hover:bg-orange-700" asChild>
                  <Link href={`/contact?vehicle=${photoSpecs.name}`}>Book Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Technical Specifications</h2>
            <p className="text-xl text-gray-600">Detailed specifications of our photography vehicle</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(photoSpecs.specifications).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-2 capitalize">{key.replace(/([A-Z])/g, " $1")}</h3>
                    <p className="text-gray-600">{value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What's Included</h2>
            <p className="text-xl text-gray-600">Everything you need for successful wildlife photography</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {photoSpecs.included.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-3 h-3 bg-orange-600 rounded-full flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Photography Vehicle?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Capture the perfect shot with our specialized photography safari vehicle
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href={`/contact?vehicle=${photoSpecs.name}`}>
                  Book Now - ${photoSpecs.pricePerDay}/day
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-orange-600"
                asChild
              >
                <Link href="/vehicle-hire">View Other Vehicles</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}