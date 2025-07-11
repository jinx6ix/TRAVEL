"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Fuel, Settings, Shield, Camera, Accessibility } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Head from "next/head"
import { SEO } from "@/config/seo.config"

const vehicles = [
  {
    id: 1,
    name: "Toyota Landcruiser",
    image: "https://ik.imagekit.io/jinx/travel/6-1536x776%20(2).png?updatedAt=1750087071508?height=300&width=400",
    description: "The ultimate safari vehicle with exceptional off-road capabilities and reliability.",
    capacity: "7 passengers",
    features: ["4WD", "Pop-up roof", "Charging ports", "Cooler box", "First aid kit"],
    pricePerDay: 120,
    ideal: "Perfect for game drives and rough terrain",
    specifications: {
      engine: "4.5L V8",
      transmission: "Automatic",
      fuelType: "Diesel",
      luggage: "Large capacity",
    },
  },
  {
    id: 2,
    name: "Toyota Prado",
    image: "https://ik.imagekit.io/jinx/travel/5-1536x776%20(1).png?updatedAt=1750087067905?height=300&width=400",
    description: "Comfortable and reliable SUV perfect for family safaris and city tours.",
    capacity: "5 passengers",
    features: ["4WD", "Air conditioning", "GPS navigation", "Bluetooth", "Safety features"],
    pricePerDay: 90,
    ideal: "Great for families and comfortable touring",
    specifications: {
      engine: "3.0L Turbo",
      transmission: "Automatic",
      fuelType: "Diesel",
      luggage: "Medium capacity",
    },
  },
  {
    id: 3,
    name: "Luxury Roof Top Camping",
    image: "https://ik.imagekit.io/jinx/travel/4-1536x776%20(1).png?updatedAt=1750087065024?height=300&width=400",
    description: "Experience the wild with luxury camping setup on your vehicle roof.",
    capacity: "4 passengers",
    features: ["Roof tent", "Camping gear", "Solar power", "Kitchenette", "Bedding included"],
    pricePerDay: 180,
    ideal: "Perfect for adventurous camping safaris",
    specifications: {
      engine: "4.0L V6",
      transmission: "Manual/Auto",
      fuelType: "Petrol",
      luggage: "Camping equipment included",
    },
  },
  {
    id: 4,
    name: "Photography Converted Vehicle",
    image: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-07-07%20at%2018.28.17_94668579.jpg?updatedAt=1751902480309?height=300&width=400",
    description: "Specially modified vehicle with photography equipment and optimal viewing angles.",
    capacity: "6 passengers",
    features: ["Camera mounts", "Bean bags", "Extended roof", "Charging stations", "Storage compartments"],
    pricePerDay: 200,
    ideal: "Designed for professional photography",
    specifications: {
      engine: "4.2L Diesel",
      transmission: "Automatic",
      fuelType: "Diesel",
      luggage: "Photography gear storage",
    },
  },
  {
    id: 5,
    name: "Wheelchair Accessible Vehicle",
    image: "https://ik.imagekit.io/jinx/travel/wheelchair-1-1536x776%20(1).png?updatedAt=1750087063365?height=300&width=400",
    description: "Fully accessible vehicle ensuring everyone can enjoy JaeTravel Expeditions.",
    capacity: "4 passengers + wheelchair",
    features: ["Wheelchair ramp", "Secure wheelchair area", "Easy access", "Safety harnesses", "Accessible controls"],
    pricePerDay: 150,
    ideal: "Inclusive safari experiences for all",
    specifications: {
      engine: "3.5L V6",
      transmission: "Automatic",
      fuelType: "Petrol",
      luggage: "Accessible storage",
    },
  },
  {
    id: 6,
    name: "Family Safari Minivan",
    image: "https://ik.imagekit.io/jinx/travel/car-van-1536x776%20(1).png?updatedAt=1750087064275?height=300&width=400",
    description: "Spacious and comfortable minivan perfect for family safaris and group travel.",
    capacity: "7 passengers + driver",
    features: [
      "Pop-up roof for game viewing",
      "AC throughout",
      "Charging ports",
      "Comfortable seating",
      "Large windows"
    ],
    pricePerDay: 120,
    ideal: "Family safaris and small group tours",
    specifications: {
      engine: "2.4L 4-cylinder",
      transmission: "Automatic",
      fuelType: "Diesel",
      luggage: "Rear storage compartment",
      fuelEfficiency: "12L/100km"
    },
    extras: {
      childSeats: "Available upon request (+$10/day)",
      coolerBox: "Included free of charge"
    }
  }
]

export default function VehicleHirePage() {
  const pageTitle = "Safari Vehicle Hire | Jae Travel Expeditions"
  const pageDescription = "Rent premium safari vehicles in East Africa. Choose from Landcruisers, Prados, photography rigs, and wheelchair accessible options for your perfect safari adventure."
  
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
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${SEO.canonical}/vehicle-hire`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${SEO.openGraph.url}/vehicle-hire`} />
        <meta property="og:image" content="https://www.jaetravel.com/images/vehicle-hire-og.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.jaetravel.com/images/vehicle-hire-twitter.jpg" />
        
        {/* Additional Tags */}
        <meta name="keywords" content="safari vehicle hire, Kenya 4x4 rental, Tanzania Landcruiser, Uganda safari car, Rwanda tour vehicle, wheelchair accessible safari, photography safari vehicle" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProductCollection",
            "name": "Safari Vehicle Hire",
            "description": pageDescription,
            "url": `${SEO.canonical}/vehicle-hire`,
            "brand": {
              "@type": "Brand",
              "name": "Jae Travel Expeditions"
            },
            "makesOffer": vehicles.map(vehicle => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": vehicle.name,
                "description": vehicle.description,
                "image": vehicle.image,
                "brand": {
                  "@type": "Brand",
                  "name": "Jae Travel Expeditions"
                }
              },
              "price": vehicle.pricePerDay,
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }))
          })}
        </script>
      </Head>

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
              Premium Safari Vehicle Hire
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Choose from our fleet of specialized safari vehicles for your East African adventure
            </motion.p>
          </div>
        </section>

        {/* Vehicle Fleet */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Safari Vehicle Fleet</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional, well-maintained vehicles designed for the ultimate East African safari experience
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {vehicles.map((vehicle) => (
                <motion.div key={vehicle.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={`${vehicle.name} safari vehicle rental`}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        width={400}
                        height={300}
                      />
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
                        <Badge variant="outline" className="text-orange-600 border-green-200">
                          {vehicle.ideal}
                        </Badge>
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
                          <div>
                            <span className="text-gray-600">Engine:</span>
                            <p className="font-medium">{vehicle.specifications.engine}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Transmission:</span>
                            <p className="font-medium">{vehicle.specifications.transmission}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Fuel:</span>
                            <p className="font-medium">{vehicle.specifications.fuelType}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Luggage:</span>
                            <p className="font-medium">{vehicle.specifications.luggage}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-3xl font-bold text-orange-600">${vehicle.pricePerDay}</span>
                          <span className="text-gray-600">/day</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" asChild>
                            <Link href={`/vehicle-hire/${vehicle.id}`} aria-label={`View details for ${vehicle.name}`}>
                              Details
                            </Link>
                          </Button>
                          <Button asChild className="bg-orange-600 hover:bg-orange-700">
                            <Link 
                              href={`/contact?vehicle=${encodeURIComponent(vehicle.name)}`}
                              aria-label={`Book ${vehicle.name} now`}
                            >
                              Book Now
                            </Link>
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

        {/* Why Choose Our Vehicles */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Our Safari Vehicles</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional maintenance, safety standards, and specialized equipment for the best East African safari experience
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: <Shield className="text-orange-600" size={48} />,
                  title: "Safety First",
                  description: "All vehicles undergo regular safety inspections and maintenance to international standards",
                },
                {
                  icon: <Settings className="text-blue-600" size={48} />,
                  title: "Professional Maintenance",
                  description: "Serviced by certified technicians to ensure reliability on all terrains",
                },
                {
                  icon: <Users className="text-purple-600" size={48} />,
                  title: "Expert Safari Drivers",
                  description: "Experienced drivers with extensive knowledge of East African safari routes",
                },
                {
                  icon: <Fuel className="text-orange-600" size={48} />,
                  title: "Fuel Efficient",
                  description: "Modern engines optimized for long safari journeys across Kenya, Tanzania, Uganda & Rwanda",
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow h-full">
                    <div className="flex justify-center mb-4" aria-hidden="true">{feature.icon}</div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Safari Vehicle?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Contact us for custom quotes, group discounts, and long-term rental options across East Africa.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/about-vehicle-hire" aria-label="Learn more about our vehicle hire services">
                    Learn More
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-orange-600"
                  asChild
                >
                  <Link href="/contact" aria-label="Get a quote for vehicle hire">
                    Get Quote
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}