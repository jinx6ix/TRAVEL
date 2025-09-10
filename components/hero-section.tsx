"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroImages = [
  {
    url: "https://cwzwdxedgblbbabcbnkj.supabase.co/storage/v1/object/sign/travel-images/_8108019.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTA2ZTM4Ni1hNGVjLTQ5MDEtYmU4NC1lZjgxY2E3OGI4YWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cmF2ZWwtaW1hZ2VzL184MTA4MDE5LmpwZyIsImlhdCI6MTc1MDAwMTk1OCwiZXhwIjoxNzgxNTM3OTU4fQ.BliZarhrxiotixnxtYX46nrQRZaMqxNoOpALoJDStxE",
    title: "Masai Mara Safari",
    location: "Kenya",
    description: "Unforgettable safaris, breathtaking landscapes, and authentic cultural experiences",
  },
  {
    url: "https://ik.imagekit.io/jinx/travel/_8501829.jpg?updatedAt=1750002842952",
    title: "Serengeti Wildlife",
    location: "Tanzania",
    description: "Witness the great migration and incredible wildlife diversity",
  },
  {
    url: "https://ik.imagekit.io/jinx/travel/_Z9P8753%20BW%20DN%20logo%20verkleind.jpg?updatedAt=1750002836396",
    title: "Mountain Gorillas",
    location: "Rwanda",
    description: "Get up close with mountain gorillas in their natural habitat",
  },
  {
    url: "https://ik.imagekit.io/jinx/travel/_Z9P5462%20DN%20logo%20verkleind.jpg?updatedAt=1750002833108",
    title: "Bwindi Forest",
    location: "Uganda",
    description: "Experience the Pearl of Africa's incredible biodiversity",
  },
  {
    url: "https://ik.imagekit.io/jinx/travel/_8502455.jpg?updatedAt=1750002805348",
    title: "Mount Kilimanjaro",
    location: "Tanzania",
    description: "Conquer Africa's highest peak with expert guides",
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="absolute inset-0">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full relative"
        >
          <Image
            src={heroImages[currentSlide].url}
            alt={heroImages[currentSlide].title}
            fill
            priority={currentSlide === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0" />
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              title="hero-dot"
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          title="prev-hero"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          title="next-hero"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
        <motion.h1 initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-5xl md:text-7xl font-bold mb-6">
          Jae Travel Expeditions
        </motion.h1>
      </div>

      <div className="absolute bottom-20 left-8 z-20 text-white">
        <motion.div key={currentSlide} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-xl font-bold mb-1">{heroImages[currentSlide].title}</h3>
          <p className="text-sm text-gray-200">{heroImages[currentSlide].location}</p>
        </motion.div>
      </div>
    </section>
  )
}