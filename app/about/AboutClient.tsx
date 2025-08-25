"use client"

import { useState, useEffect, useRef } from 'react'
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, Heart, Star, Plus } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  image: string
  experience: string
  description: string
  isOpenPosition?: boolean
}

interface Achievement {
  number: string
  label: string
}

interface Value {
  icon: string
  title: string
  desc: string
}

interface AboutClientProps {
  teamMembers: TeamMember[]
  achievements: Achievement[]
  values: Value[]
}

// Optimized LazyImage component
interface LazyImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  priority?: boolean
  width?: number
  height?: number
  [key: string]: any
}

const LazyImage = ({ src, alt, fill = false, className = "", priority = false, width, height, ...props }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.01,
        rootMargin: '50px 0px 100px 0px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [src])

  const iconMap = {
    Heart: <Heart className="text-red-500" size={48} />,
    Globe: <Globe className="text-blue-500" size={48} />,
    Star: <Star className="text-yellow-500" size={48} />,
    Users: <Users className="text-green-500" size={48} />,
  }

  return (
    <div 
      ref={imgRef}
      className={`relative ${className}`}
      style={fill ? {} : { width, height }}
      {...props}
    >
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => console.error(`Failed to load image: ${src}`)}
          priority={priority}
          loading="lazy"
          decoding="async"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMkQ=="
        />
      ) : (
        <div 
          className="bg-gray-200 animate-pulse"
          style={fill ? { width: '100%', height: '100%' } : { width, height }}
        />
      )}
    </div>
  )
}

export default function AboutClient({ teamMembers, achievements, values }: AboutClientProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  const iconMap = {
    Heart: <Heart className="text-red-500" size={48} />,
    Globe: <Globe className="text-blue-500" size={48} />,
    Star: <Star className="text-yellow-500" size={48} />,
    Users: <Users className="text-green-500" size={48} />,
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
          >
            About JaeTravel Expeditions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Your trusted partner for unforgettable East African safari experiences since 2009
          </motion.p>
        </div>
      </header>

      {/* Our Story */}
      <article className="py-12 sm:py-16 md:py-20">
        <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true, margin: "100px" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              Founded in 2009, JaeTravel Expeditions began as a small family business with a simple mission: 
              to share the incredible wildlife and natural beauty of East Africa with travelers worldwide.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              Over the years, we've grown into a trusted safari operator, but we've never lost sight of our 
              values: authentic experiences, sustainable tourism, and genuine care for guests and communities.
            </p>
            <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/tours" prefetch={false}>Explore Our Tours</Link>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true, margin: "100px" }}
            className="relative w-full aspect-[4/3]"
          >
            <LazyImage
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
              alt="JaeTravel team on safari in Kenya"
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
          </motion.div>
        </section>
      </article>

      {/* Achievements */}
      <section className="py-12 sm:py-16 md:py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Achievements</h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence in East African safaris
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
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
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Values</h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
              The principles that guide everything we do at JaeTravel Expeditions
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((v, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="text-center p-6 hover:shadow-lg h-full border-0 bg-gray-50">
                  <div className="flex justify-center mb-4">{iconMap[v.icon as keyof typeof iconMap]}</div>
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
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Meet Our Team</h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
              Passionate professionals dedicated to creating unforgettable safari experiences
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((m, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl border-0 h-full flex flex-col">
                  <div className="relative w-full aspect-[4/3] bg-gray-200 flex items-center justify-center">
                    {m.image ? (
                      <>
                        <LazyImage
                          src={m.image}
                          alt={`${m.name} - ${m.role}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "100px" }}
          className="container mx-auto px-4"
        >
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