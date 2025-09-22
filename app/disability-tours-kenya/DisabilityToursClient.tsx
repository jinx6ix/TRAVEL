"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, Star, Shield, Heart, Accessibility, Plane, Globe } from "lucide-react";
import Link from "next/link";
import { FaWheelchair } from "react-icons/fa"
import { motion } from "framer-motion";

const accessibleTours = [
  {
    id: 44,
    slug: "kenya-disability-7-day-accessible-safari",
    title: "Kenya Disability Tours - 7-Day Accessible Safari",
    destination: "Kenya",
    duration: "7 days",
    price: 2450,
    rating: 4.8,
    reviewCount: 24,
    description: "Completely accessible safari experience through Kenya's best parks with wheelchair-adapted vehicles and accommodations.",
    highlights: [
      "Wheelchair-accessible safari vehicles",
      "Barrier-free lodges with roll-in showers",
      "Trained accessibility guides",
      "Maasai Mara, Lake Nakuru, and Amboseli",
      "Medical support available"
    ],
    image: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-09-02%20at%2011.43.25%20AM.jpeg?updatedAt=1756810077606"
  },
  {
    id: 45,
    slug: "accessible-masai-mara-4days",
    title: "4-Day Accessible Masai Mara Experience",
    destination: "Kenya",
    duration: "4 days",
    price: 1450,
    rating: 4.9,
    reviewCount: 18,
    description: "Focused accessible safari in the world-famous Masai Mara National Reserve.",
    highlights: [
      "Specialized wheelchair vehicles",
      "Accessible tented camp",
      "Great Migration viewing areas",
      "Cultural visits with accessibility"
    ],
    image: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-09-01%20at%204.36.05%20PM.jpeg?updatedAt=1756810077465"
  },
  {
    id: 46,
    slug: "tanzania-accessible-safari",
    title: "Tanzania Accessible Safari Adventure",
    destination: "Tanzania",
    duration: "8 days",
    price: 2950,
    rating: 4.7,
    reviewCount: 15,
    description: "Accessible journey through Tanzania's iconic parks including Serengeti and Ngorongoro Crater.",
    highlights: [
      "Adapted safari vehicles with lifts",
      "Accessible lodges with wide pathways",
      "Serengeti accessible viewing platforms",
      "Ngorongoro Crater rim accessibility"
    ],
    image: "https://ik.imagekit.io/jinx/travel/wheelchair-accessible-tanzania-safari.webp?updatedAt=1756902426095"
  },
  {
    id: 47,
    slug: "rwanda-accessible-gorilla",
    title: "Rwanda Accessible Gorilla Experience",
    destination: "Rwanda",
    duration: "5 days",
    price: 3200,
    rating: 4.9,
    reviewCount: 12,
    description: "Once-in-a-lifetime accessible gorilla experience with specially designed viewing opportunities.",
    highlights: [
      "Adapted gorilla tracking routes",
      "Accessible Volcanoes National Park viewing",
      "Kigali accessible city tour",
      "Special permits for mobility-impaired visitors"
    ],
    image: "https://ik.imagekit.io/jinx/travel/bisatelodge1.jpg?updatedAt=1756902495617"
  },
  {
    id: 48,
    slug: "uganda-accessible-primate",
    title: "Uganda Accessible Primate Safari",
    destination: "Uganda",
    duration: "6 days",
    price: 2200,
    rating: 4.6,
    reviewCount: 16,
    description: "Accessible primate watching in Uganda's beautiful forests with adapted facilities.",
    highlights: [
      "Wheelchair-friendly forest pathways",
      "Accessible boat safaris on Kazinga Channel",
      "Bwindi adapted gorilla viewing",
      "Kibale chimpanzee tracking accessibility"
    ],
    image: "https://ik.imagekit.io/jinx/travel/Safari-kenya-17.jpg?updatedAt=1756902619169"
  },
  {
    id: 49,
    slug: "uganda-accessible-primate-safari",
    title: "East Africa Grand Accessible Safari",
    destination: "Multi-Country",
    duration: "12 days",
    price: 5800,
    rating: 4.9,
    reviewCount: 8,
    description: "Ultimate accessible safari experience across Kenya and Tanzania's most famous parks.",
    highlights: [
      "Cross-border accessible transportation",
      "Premium accessible accommodations",
      "Maasai Mara & Serengeti combination",
      "Dedicated accessibility coordinator"
    ],
    image: "https://ik.imagekit.io/jinx/travel/Tineke-in-Kenya.png?updatedAt=1756902738914"
  }
];

const accessibilityFeatures = [
  {
    icon: FaWheelchair,
    title: "Wheelchair Accessible Vehicles",
    description: "Custom 4x4 safari vehicles with hydraulic lifts, wheelchair securement systems, and ramp access."
  },
  {
    icon: Accessibility,
    title: "Adapted Accommodations",
    description: "Lodges and camps with roll-in showers, wide doorways, accessible pathways, and adapted facilities."
  },
  {
    icon: Users,
    title: "Trained Staff",
    description: "Guides and drivers trained in disability assistance, emergency procedures, and accessibility support."
  },
  {
    icon: Shield,
    title: "Safety & Medical Support",
    description: "Comprehensive safety protocols, medical equipment availability, and emergency evacuation plans."
  },
  {
    icon: Globe,
    title: "East Africa Expertise",
    description: "Accessible experiences across Kenya, Tanzania, Uganda, and Rwanda with local knowledge."
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description: "Custom itineraries tailored to individual accessibility needs and preferences."
  }
];

const destinationColors = {
  Kenya: "bg-orange-100 text-orange-800 border-orange-200",
  Tanzania: "bg-green-100 text-green-800 border-green-200",
  Rwanda: "bg-blue-100 text-blue-800 border-blue-200",
  Uganda: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Multi-Country": "bg-purple-100 text-purple-800 border-purple-200"
};

export default function DisabilityToursClient() {
  return (
    <div className="min-h-screen pt-10">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-600 to-indigo-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Accessible East Africa Safari Tours
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Experience the magic of East Africa's wildlife with our fully accessible safari tours designed specifically for travelers with disabilities across Kenya, Tanzania, Uganda, and Rwanda.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" asChild className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg">
              <Link href="#tours">Explore Accessible Tours</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-orange/10 backdrop-blur-sm">
              <Link href="/contact">Plan Your Accessible Safari</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200 text-base px-4 py-1">
              <Accessibility className="w-4 h-4 mr-2" />
              Inclusive Travel Experiences
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-400">Accessible Safari Adventures Across East Africa</h2>
            <p className="text-lg text-gray-600 mb-12">
              At JaeTravel Expeditions, we believe everyone deserves to experience the wonder of East African wildlife. 
              Our accessible safaris across Kenya, Tanzania, Uganda, and Rwanda are carefully designed to ensure travelers 
              with disabilities can enjoy the same breathtaking experiences as all our guests.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {accessibilityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accessible Tours */}
      <section id="tours" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200 text-base px-4 py-1">
              <Plane className="w-4 h-4 mr-2" />
              East Africa Destination Tours
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Accessible Safari Tours</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover East Africa's wonders with our specially designed accessible tours across Kenya, Tanzania, Uganda, and Rwanda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessibleTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600">
                        <Accessibility className="w-3 h-3 mr-1" />
                        Fully Accessible
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className={destinationColors[tour.destination as keyof typeof destinationColors]}>
                        <MapPin className="w-3 h-3 mr-1" />
                        {tour.destination}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{tour.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{tour.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1 text-blue-600" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        <span className="font-semibold">{tour.rating}</span>
                        <span className="text-gray-500 ml-1">({tour.reviewCount})</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-sm">Accessibility Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {tour.highlights.slice(0, 3).map((highlight, i) => (
                          <Badge key={i} variant="outline" className="text-xs py-1">
                            {highlight}
                          </Badge>
                        ))}
                        {tour.highlights.length > 3 && (
                          <Badge variant="secondary" className="text-xs py-1">
                            +{tour.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">${tour.price}</span>
                        <span className="text-sm text-gray-500 ml-1">/person</span>
                      </div>
                      <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Link href={`/tours/${tour.slug}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-400">East Africa Accessibility Highlights</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes each East African destination special for accessible travel
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
            {[
              {
                destination: "Kenya",
                color: "orange",
                highlights: ["Maasai Mara accessible game drives", "Amboseli elephant viewing platforms", "Lake Nakuru wheelchair-friendly paths", "Nairobi accessible attractions"],
                icon: "🦁"
              },
              {
                destination: "Tanzania",
                color: "green",
                highlights: ["Serengeti adapted viewing areas", "Ngorongoro Crater accessibility", "Zanzibar beach wheelchair access", "Tarangire elevated walkways"],
                icon: "🐘"
              },
              {
                destination: "Uganda",
                color: "yellow",
                highlights: ["Bwindi gorilla adapted tracking", "Queen Elizabeth boat accessibility", "Murchison Falls viewing platforms", "Kibale chimpanzee accessible paths"],
                icon: "🦍"
              },
              {
                destination: "Rwanda",
                color: "blue",
                highlights: ["Volcanoes gorilla accessibility", "Kigali wheelchair-friendly city", "Nyungwe canopy walk adaptation", "Lake Kivu accessible resorts"],
                icon: "🌋"
              }
            ].map((country, index) => (
              <motion.div
                key={country.destination}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-${country.color}-50 border-${country.color}-200 rounded-xl p-6 hover:shadow-md transition-shadow`}
              >
                <div className="text-center mb-4">
                  <span className="text-3xl">{country.icon}</span>
                  <h3 className="font-bold text-lg mt-2">{country.destination}</h3>
                </div>
                <ul className="space-y-2">
                  {country.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`w-2 h-2 rounded-full bg-${country.color}-400 mt-2 mr-3`}></div>
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your East Africa Accessible Adventure?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let our accessibility specialists help you plan the perfect safari tailored to your specific needs across Kenya, Tanzania, Uganda, or Rwanda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg">
                <Link href="/contact">Plan Your Accessible Safari</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 backdrop-blur-sm">
                <Link href="/accessibility-faq">Accessibility FAQ</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}