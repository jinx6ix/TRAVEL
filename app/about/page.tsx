"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, Heart, Star, Plus } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Head from "next/head" // Added for meta tags

const teamMembers = [
  {
    name: "John Safari",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    experience: "15 years",
    description:
      "A visionary leader with a passion for connecting people with nature and creating sustainable tourism opportunities.",
  },
  {
    name: "Mary Kimani",
    role: "Head Guide",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    experience: "12 years",
    description:
      "An expert in wildlife behavior and conservation, Mary leads our guests on unforgettable JaeTravel Expeditions.",
  },
  {
    name: "David Mwangi",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    experience: "10 years",
    description:
      "David ensures the smooth and efficient operation of our tours, providing exceptional support to our guests and team.",
  },
  {
    name: "Sarah Akinyi",
    role: "Cultural Guide",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    experience: "8 years",
    description:
      "Sarah is dedicated to sharing the rich cultural heritage of East Africa, creating meaningful connections between our guests and local communities.",
  },
  {
    name: "Join Our Team",
    role: "Wildlife Guide",
    image: "",
    experience: "Open Position",
    description:
      "Passionate about wildlife and conservation? We're looking for experienced guides to join our growing team.",
    isOpenPosition: true,
  },
]

const achievements = [
  { number: "500+", label: "Happy Clients" },
  { number: "15", label: "Years Experience" },
  { number: "4", label: "Countries Covered" },
  { number: "50+", label: "Tour Packages" },
]

export default function AboutPage() {
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

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "JaeTravel Expeditions",
    "description": "Your trusted partner for unforgettable East African safari experiences since 2009. We offer comprehensive safari experiences across Kenya, Tanzania, Rwanda, and Uganda.",
    "url": "https://www.jaetravel.com/about",
    "telephone": "+254-XXX-XXXXXX",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Kenya"
    },
    "openingHours": "Mo-Fr 08:00-17:00",
    "yearsInOperation": "15",
    "numberOfEmployees": "20+",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Safari Tours",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "TouristAttraction",
            "name": "East African Safari Packages"
          }
        }
      ]
    }
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>About JaeTravel Expeditions - East African Safari Experts Since 2009</title>
        <meta name="description" content="Meet the team behind JaeTravel Expeditions - your trusted East African safari experts with 15+ years experience creating unforgettable wildlife adventures in Kenya, Tanzania, Rwanda & Uganda." />
        <meta name="keywords" content="East African safari, Kenya tours, Tanzania wildlife, Rwanda gorilla trekking, Uganda safaris, African travel experts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="About JaeTravel Expeditions - East African Safari Experts" />
        <meta property="og:description" content="15+ years creating unforgettable safari experiences across East Africa with expert guides and sustainable tourism practices." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
        <meta property="og:url" content="https://www.jaetravel.com/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About JaeTravel Expeditions - East African Safari Experts" />
        <meta name="twitter:description" content="15+ years creating unforgettable safari experiences across East Africa with expert guides and sustainable tourism practices." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
        <link rel="canonical" href="https://www.jaetravel.com/about" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen pt-16">
        {/* Header - Changed to header tag for semantic HTML */}
        <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              About JaeTravel Expeditions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-8 max-w-3xl mx-auto"
            >
              Your trusted partner for unforgettable East African safari experiences since 2009
            </motion.p>
          </div>
        </header>

        {/* Our Story - Added article and section tags for semantic structure */}
        <article className="py-20">
          <section className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Founded in 2009, JaeTravel Expeditions began as a small family business with a simple mission: to share the
                  incredible wildlife and natural beauty of East Africa with travelers from around the world.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Over the years, we've grown into a trusted safari operator, but we've never lost sight of our core
                  values: authentic experiences, sustainable tourism, and genuine care for our guests and local
                  communities.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Today, we're proud to offer comprehensive safari experiences across Kenya, Tanzania, Rwanda, and Uganda,
                  with a team of passionate guides and a fleet of well-maintained vehicles.
                </p>
                <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
                  <Link href="/tours" aria-label="Explore our safari tour packages">Explore Our Tours</Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="JaeTravel Expeditions team on safari in Masai Mara, Kenya"
                  className="rounded-lg shadow-xl w-full h-auto"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
              </motion.div>
            </div>
          </section>
        </article>

        {/* Achievements */}
        <section className="py-20 bg-green-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Achievements</h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Numbers that reflect our commitment to excellence and customer satisfaction in East African safari tours
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {achievements.map((achievement, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white">
                    <CardContent className="p-0">
                      <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">{achievement.number}</div>
                      <p className="text-gray-700 font-medium">{achievement.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Values</h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">The principles that guide everything we do at JaeTravel Expeditions</p>
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
                  icon: <Heart className="text-red-500" size={48} />,
                  title: "Passion",
                  description: "We love what we do and it shows in every safari experience we create.",
                },
                {
                  icon: <Globe className="text-blue-500" size={48} />,
                  title: "Sustainability",
                  description: "Committed to responsible tourism that benefits local communities and wildlife.",
                },
                {
                  icon: <Star className="text-yellow-500" size={48} />,
                  title: "Excellence",
                  description: "We strive for the highest standards in service, safety, and satisfaction.",
                },
                {
                  icon: <Users className="text-green-500" size={48} />,
                  title: "Community",
                  description: "Supporting local communities and creating meaningful cultural exchanges.",
                },
              ].map((value, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow h-full border-0 bg-gray-50">
                    <div className="flex justify-center mb-4">{value.icon}</div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-gray-900">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Meet Our Team</h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Passionate professionals dedicated to creating unforgettable safari experiences across East Africa
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 h-full flex flex-col">
                    <div className="relative overflow-hidden h-64 bg-gray-200 flex items-center justify-center">
                      {member.image ? (
                        <>
                          <img
                            src={member.image}
                            alt={`${member.name} - ${member.role} at JaeTravel Expeditions`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            width={300}
                            height={256}
                          />
                          <Badge className="absolute top-4 right-4 bg-orange-600">{member.experience}</Badge>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Plus size={48} className="mb-2" />
                          <p>Join Our Team</p>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900">{member.name}</CardTitle>
                      <CardDescription className="text-orange-600 font-medium">{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-700">{member.description}</p>
                    </CardContent>
                    {member.isOpenPosition && (
                      <div className="p-4 pt-0">
                        <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                          <Link href="/careers" aria-label="Apply for wildlife guide position">Apply Now</Link>
                        </Button>
                      </div>
                    )}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied travelers who have experienced the magic of East Africa with JaeTravel Expeditions.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="bg-white text-orange-600 hover:bg-gray-100">
                  <Link href="/tours" aria-label="Browse our safari tour packages">Browse Tours</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-orange-600"
                  asChild
                >
                  <Link href="/contact" aria-label="Contact JaeTravel Expeditions">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}