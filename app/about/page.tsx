import { Metadata } from 'next'
import AboutClient from './AboutClient'

// Preload critical images
export const preload = () => {
  return [
    { href: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", as: "image" },
  ]
}

export const metadata: Metadata = {
  title: "About JaeTravel Expeditions - Safari Experts Since 2009",
  description: "Meet the team behind JaeTravel Expeditions - trusted East African safari experts with 15+ years of experience.",
  openGraph: {
    title: "About JaeTravel Expeditions - Safari Experts",
    description: "15+ years creating unforgettable safari experiences across East Africa with expert guides and sustainable tourism practices.",
    images: ["https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"],
  },
  keywords: "safari experts, East Africa tours, wildlife guides, sustainable tourism, Kenya safari, Tanzania tours",
}

// Generate structured data for SEO
function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "JaeTravel Expeditions",
    "description": "Your trusted partner for unforgettable East African safari experiences since 2009.",
    "url": "https://www.jaetravel.com/about",
    "telephone": "+254-726-485-228",
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
}

// Static data that doesn't need client-side interactivity
const teamMembers = [
  {
    name: "John Safari",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    experience: "15 years",
    description: "A visionary leader with a passion for connecting people with nature and creating sustainable tourism opportunities.",
  },
  {
    name: "Mary Kimani",
    role: "Head Guide",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    experience: "12 years",
    description: "An expert in wildlife behavior and conservation, Mary leads our guests on unforgettable JaeTravel Expeditions.",
  },
  {
    name: "David Mwangi",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    experience: "10 years",
    description: "David ensures the smooth and efficient operation of our tours, providing exceptional support to our guests and team.",
  },
  {
    name: "Sarah Akinyi",
    role: "Cultural Guide",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80",
    experience: "8 years",
    description: "Sarah is dedicated to sharing the rich cultural heritage of East Africa, creating meaningful connections between our guests and local communities.",
  },
  {
    name: "Join Our Team",
    role: "Wildlife Guide",
    image: "",
    experience: "Open Position",
    description: "Passionate about wildlife and conservation? We're looking for experienced guides to join our growing team.",
    isOpenPosition: true,
  },
]

const achievements = [
  { number: "500+", label: "Happy Clients" },
  { number: "15", label: "Years Experience" },
  { number: "4", label: "Countries Covered" },
  { number: "50+", label: "Tour Packages" },
]

const values = [
  { icon: "Heart", title: "Passion", desc: "We love what we do and it shows in every safari." },
  { icon: "Globe", title: "Sustainability", desc: "Responsible tourism benefiting communities and wildlife." },
  { icon: "Star", title: "Excellence", desc: "We strive for the highest standards in service & safety." },
  { icon: "Users", title: "Community", desc: "Supporting locals and fostering cultural exchange." },
]

export default function AboutPage() {
  const structuredData = getStructuredData()
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AboutClient 
        teamMembers={teamMembers}
        achievements={achievements}
        values={values}
      />
    </>
  )
}