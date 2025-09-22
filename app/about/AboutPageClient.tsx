"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, Heart, Star, Plus } from "lucide-react"

// --- Team Data ---
const teamMembers = [
  {
    name: "John Safari",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    experience: "15 years",
    description: "A visionary leader connecting people with nature & sustainable tourism.",
  },
  {
    name: "Mary Kimani",
    role: "Head Guide",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    experience: "12 years",
    description: "Expert in wildlife behavior leading unforgettable JaeTravel Expeditions.",
  },
  {
    name: "David Mwangi",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    experience: "10 years",
    description: "Ensures smooth operations and exceptional support for guests and team.",
  },
  {
    name: "Sarah Akinyi",
    role: "Cultural Guide",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80",
    experience: "8 years",
    description: "Shares East Africa’s rich cultural heritage for meaningful guest experiences.",
  },
  {
    name: "Join Our Team",
    role: "Wildlife Guide",
    image: "",
    experience: "Open Position",
    description: "Passionate about wildlife? Join our growing team.",
    isOpenPosition: true,
  },
]

// --- Achievements ---
const achievements = [
  { number: "500+", label: "Happy Clients" },
  { number: "15", label: "Years Experience" },
  { number: "4", label: "Countries Covered" },
  { number: "50+", label: "Tour Packages" },
]

// --- Lazy Image Component ---
const LazyImage: React.FC<any> = ({ src, alt, fill = false, className = "", width, height }) => {
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: "50px 0px 100px 0px" }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`} style={fill ? {} : { width, height }}>
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
          onLoad={() => setIsLoaded(true)}
        />
      ) : (
        <div className="bg-gray-200 animate-pulse" style={fill ? { width: "100%", height: "100%" } : { width, height }} />
      )}
    </div>
  )
}

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } }

export default function AboutPageClient() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    )

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          About JaeTravel Expeditions
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Your trusted partner for unforgettable East African safari experiences since 2009
        </motion.p>
      </header>

      {/* Our Story */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "100px" }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              Founded in 2009, JaeTravel Expeditions began as a small family business with a simple mission: to share the incredible wildlife and natural beauty of East Africa with travelers worldwide.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              Over the years, we've grown into a trusted safari operator, but we've never lost sight of our values: authentic experiences, sustainable tourism, and genuine care for guests and communities.
            </p>
            <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/tours" prefetch={false}>Explore Our Tours</Link>
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "100px" }} className="relative w-full aspect-[4/3]">
            <LazyImage
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
              alt="JaeTravel team on safari in Kenya"
              fill
              className="object-cover rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 sm:py-16 md:py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "100px" }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Achievements</h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">Numbers that reflect our commitment to excellence in East African safaris</p>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((a, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="text-center p-6 hover:shadow-lg border-0 bg-white">
                  <CardContent className="p-0">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mb-2">{a.number}</div>
                    <p className="text-gray-700 font-medium">{a.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "100px" }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Values</h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">The principles that guide everything we do at JaeTravel Expeditions</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart className="text-red-500" size={48} />, title: "Passion", desc: "We love what we do and it shows in every safari." },
              { icon: <Globe className="text-blue-500" size={48} />, title: "Sustainability", desc: "Responsible tourism benefiting communities and wildlife." },
              { icon: <Star className="text-yellow-500" size={48} />, title: "Excellence", desc: "We strive for the highest standards in service & safety." },
              { icon: <Users className="text-green-500" size={48} />, title: "Community", desc: "Supporting locals and fostering cultural exchange." },
            ].map((v, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="text-center p-6 hover:shadow-lg h-full border-0 bg-gray-50">
                  <div className="flex justify-center mb-4">{v.icon}</div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg sm:text-xl text-gray-900">{v.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm sm:text-base">{v.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "100px" }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Meet Our Team</h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">Passionate professionals dedicated to creating unforgettable safari experiences</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((m, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl border-0 h-full flex flex-col">
                  <div className="relative w-full aspect-[4/3] bg-gray-200 flex items-center justify-center">
                    {m.image ? (
                      <>
                        <LazyImage src={m.image} alt={`${m.name} - ${m.role}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                        <Badge className="absolute top-4 right-4 bg-orange-600">{m.experience}</Badge>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-gray-500">
                        <Plus size={48} className="mb-2" />
                        <p>Join Our Team</p>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-gray-900">{m.name}</CardTitle>
                    <CardDescription className="text-orange-600 font-medium">{m.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-700 text-sm sm:text-base">{m.description}</p>
                  </CardContent>
                  {m.isOpenPosition && (
                    <div className="p-4 pt-0">
                      <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                        <Link href="/careers" prefetch={false}>Apply Now</Link>
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-orange-600 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "100px" }} className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of travelers who've experienced the magic of East Africa with JaeTravel Expeditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/tours" prefetch={false}>Browse Tours</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-orange-600" asChild>
              <Link href="/contact" prefetch={false}>Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
