"use client"

import { useState, useCallback } from "react"
import Head from "next/head"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/useLanguage"
import { SEO } from "@/config/seo.config"

interface Tour {
  id: number
  title: string
  destination: string
  duration: string
  price: number
  rating: number
  image: string
  description: string
  category: string
  wildlife: string[]
  slug: string
}

const tours = [
  // Kenya Tours
  {
    id: 1,
    title: "Masai Mara JaeTravel Expeditions",
    destination: "Kenya",
    duration: "5 days",
    price: 1200,
    rating: 4.9,
    image: "https://ik.imagekit.io/jinx/travel/_8502543-1.jpg?updatedAt=1750002814593?height=250&width=350",
    description: "Experience the great migration and witness the Big Five.",
    category: "wildlife",
    wildlife: ["Big Five", "Great Migration", "Lions", "Elephants"],
    slug: "masai-mara-safari-adventure",
  },
  {
    id: 2,
    title: "Amboseli Elephant Safari",
    destination: "Kenya",
    duration: "4 days",
    price: 980,
    rating: 4.7,
    image: "https://ik.imagekit.io/jinx/travel/amboseli-elephants-00007.jpg?updatedAt=1750008046158?height=250&width=350",
    description: "Get close to elephants with Mount Kilimanjaro backdrop.",
    category: "wildlife",
    wildlife: ["Elephants", "Kilimanjaro"],
    slug: "amboseli-elephant-safari",
  },
  {
    id: 3,
    title: "Samburu Game Reserve",
    destination: "Kenya",
    duration: "3 days",
    price: 750,
    rating: 4.6,
    image: "https://ik.imagekit.io/jinx/travel/Samburu_National_Reserve,_Kenya-26December2012.jpg?updatedAt=1750008245147?height=250&width=350",
    description: "Discover unique wildlife in the northern frontier.",
    category: "wildlife",
    wildlife: ["Giraffes", "Zebras", "Oryx"],
    slug: "samburu-game-reserve",
  },
  {
    id: 4,
    title: "Lake Nakuru Flamingo Tour",
    destination: "Kenya",
    duration: "2 days",
    price: 450,
    rating: 4.5,
    image: "https://ik.imagekit.io/jinx/travel/lake-nakuru-flamingos-in-red-sunset-590x390.jpg?updatedAt=1750008429931?height=250&width=350",
    description: "Witness thousands of flamingos in their natural habitat.",
    category: "photography",
    wildlife: ["Flamingos", "Birds"],
    slug: "lake-nakuru-flamingo-spectacle",
  },
  {
    id: 5,
    title: "Tsavo East & West Safari",
    destination: "Kenya",
    duration: "6 days",
    price: 1350,
    rating: 4.8,
    image: "https://ik.imagekit.io/jinx/travel/tsavo-west-national-park-chyulu-gate.jpg.webp?updatedAt=1750012915321?height=250&width=350",
    description: "Explore Kenya's largest national park.",
    category: "wildlife",
    wildlife: ["Elephants", "Lions", "Rhinos"],
    slug: "tsavo-east-west-adventure",
  },
  {
    id: 6,
    title: "Mombasa Beach & Safari",
    destination: "Kenya",
    duration: "7 days",
    price: 1600,
    rating: 4.7,
    image: "https://ik.imagekit.io/jinx/travel/kenya-beach-safari-prices-jt-safaris-julius-safaris-diani-beach.jpg?updatedAt=1750012979870?height=250&width=350",
    description: "Combine JaeTravel Expeditions with beach relaxation.",
    category: "adventure",
    wildlife: ["Various"],
    slug: "mombasa-coastal-safari",
  },
  {
    id: 7,
    title: "Mount Kenya Climbing",
    destination: "Kenya",
    duration: "5 days",
    price: 1100,
    rating: 4.4,
    image: "https://ik.imagekit.io/jinx/travel/mt-kenya.jpg?updatedAt=1750013071132?height=250&width=350",
    description: "Challenge yourself with Africa's second highest peak.",
    category: "adventure",
    wildlife: [],
    slug: "mount-kenya-climbing-Expeditions",
  },
  {
    id: 8,
    title: "Laikipia Conservancy",
    destination: "Kenya",
    duration: "4 days",
    price: 1250,
    rating: 4.8,
    image: "https://ik.imagekit.io/jinx/travel/lewa-safari-camp---bush-walk.jpg?updatedAt=1750013183762?height=250&width=350",
    description: "Experience conservation in action.",
    category: "conservation",
    wildlife: ["Rhinos", "Elephants"],
    slug: "laikipia-conservancy",
  },
  {
    id: 9,
    title: "Hell's Gate Adventure",
    destination: "Kenya",
    duration: "2 days",
    price: 380,
    rating: 4.3,
    image: "https://ik.imagekit.io/jinx/travel/861661.jpg?updatedAt=1750013290458?height=250&width=350",
    description: "Bike and hike through dramatic landscapes.",
    category: "adventure",
    wildlife: ["Birds"],
    slug: "hell-gate-lake-naivasha-adventure",
  },
  {
    id: 10,
    title: "Maasai Cultural Experience",
    destination: "Kenya",
    duration: "3 days",
    price: 650,
    rating: 4.6,
    image: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg?updatedAt=1750013375250?height=250&width=350",
    description: "Immerse yourself in Maasai culture.",
    category: "culture",
    wildlife: [],
    slug: "maasai-cultural-experience",
  },
  {
    id: 11,
    title: "Aberdare National Park",
    destination: "Kenya",
    duration: "3 days",
    price: 720,
    rating: 4.5,
    image: "https://ik.imagekit.io/jinx/travel/Aberdare.jpg?updatedAt=1750013499302?height=250&width=350",
    description: "Mountain forest safari experience.",
    category: "wildlife",
    wildlife: ["Elephants", "Buffaloes"],
    slug: "aberdare-national-park-safari",
  },
  {
    id: 12,
    title: "Diani Beach Safari Combo",
    destination: "Kenya",
    duration: "8 days",
    price: 1800,
    rating: 4.9,
    image: "https://ik.imagekit.io/jinx/travel/caption-1.jpg?updatedAt=1750013703250?height=250&width=350",
    description: "Ultimate Kenya safari and beach experience.",
    category: "adventure",
    wildlife: ["Various"],
    slug: "diani-beach-safari-combo",
  },

  // Tanzania Tours
  {
    id: 13,
    title: "Serengeti Wildlife Safari",
    destination: "Tanzania",
    duration: "7 days",
    price: 1800,
    rating: 4.8,
    image: "https://ik.imagekit.io/jinx/travel/Game-Drive-north-of-Serengeti-National-Park.jpg?updatedAt=1750013774565?height=250&width=350",
    description: "Explore the endless plains of Serengeti.",
    category: "wildlife",
    wildlife: ["Big Five", "Wildebeest Migration"],
    slug: "serengeti-wildlife-safari",
  },
  {
    id: 14,
    title: "Ngorongoro Crater Tour",
    destination: "Tanzania",
    duration: "3 days",
    price: 950,
    rating: 4.9,
    image: "https://ik.imagekit.io/jinx/travel/Ngorongoro-Crater.jpg?updatedAt=1750013843530?height=250&width=350",
    description: "Visit the world's largest intact caldera.",
    category: "wildlife",
    wildlife: ["Various"],
    slug: "ngorongoro-crater-safari",
  },
  {
    id: 15,
    title: "Kilimanjaro Climbing",
    destination: "Tanzania",
    duration: "8 days",
    price: 2200,
    rating: 4.7,
    image: "https://ik.imagekit.io/jinx/travel/kilimanjaro-moutain-climbing.jpg?updatedAt=1750013910253?height=250&width=350",
    description: "Conquer Africa's highest peak.",
    category: "adventure",
    wildlife: [],
    slug: "kilimanjaro-climbing-Expeditions",
  },
  {
    id: 16,
    title: "Tarangire Elephant Safari",
    destination: "Tanzania",
    duration: "4 days",
    price: 1100,
    rating: 4.6,
    image: "https://ik.imagekit.io/jinx/travel/TA-1.jpg?updatedAt=1750013999268?height=250&width=350",
    description: "See large herds of elephants.",
    category: "wildlife",
    wildlife: ["Elephants"],
    slug: "tarangire-national-park-safari",
  },
  {
    id: 17,
    title: "Lake Manyara Tree Climbing Lions",
    destination: "Tanzania",
    duration: "2 days",
    price: 580,
    rating: 4.4,
    image: "https://ik.imagekit.io/jinx/travel/04tb-treelions1-facebookJumbo-1.jpg?updatedAt=1750014060199?height=250&width=350",
    description: "Witness unique tree-climbing lions.",
    category: "wildlife",
    wildlife: ["Lions"],
    slug: "lake-manyara-national-park-safari",
  },
  {
    id: 18,
    title: "Zanzibar Spice Island",
    destination: "Tanzania",
    duration: "5 days",
    price: 1300,
    rating: 4.8,
    image: "https://ik.imagekit.io/jinx/travel/160829145810-zanzibar-11-rock.jpg?updatedAt=1750014122225?height=250&width=350",
    description: "Explore the spice island paradise.",
    category: "culture",
    wildlife: [],
    slug: "zanzibar-beach-holiday",
  },
  {
    id: 19,
    title: "Ruaha National Park",
    destination: "Tanzania",
    duration: "6 days",
    price: 1450,
    rating: 4.5,
    image: "https://ik.imagekit.io/jinx/travel/baobab-trees-ruaha.jpg?updatedAt=1750014184839?height=250&width=350",
    description: "Tanzania's largest national park.",
    category: "wildlife",
    wildlife: ["Various"],
    slug: "ruaha-national-park-safari",
  },
  {
    id: 20,
    title: "Selous Game Reserve",
    destination: "Tanzania",
    duration: "5 days",
    price: 1350,
    rating: 4.7,
    image: "https://ik.imagekit.io/jinx/travel/images%20(1).jpeg?updatedAt=1750014262541?height=250&width=350",
    description: "Africa's largest game reserve.",
    category: "wildlife",
    wildlife: ["Various"],
    slug: "selous-game-reserve-safari",
  },
  {
    id: 21,
    title: "Mikumi National Park",
    destination: "Tanzania",
    duration: "3 days",
    price: 750,
    rating: 4.3,
    image: "https://ik.imagekit.io/jinx/travel/M6.jpg?updatedAt=1750014335135?height=250&width=350",
    description: "Accessible wildlife viewing.",
    category: "wildlife",
    wildlife: ["Various"],
    slug: "mikumi-national-park",
  },
  {
    id: 22,
    title: "Arusha Cultural Tour",
    destination: "Tanzania",
    duration: "2 days",
    price: 420,
    rating: 4.2,
    image: "https://ik.imagekit.io/jinx/travel/1687776506_755574c936615bdeeefd.webp?updatedAt=1750014412685?height=250&width=350",
    description: "Experience local Tanzanian culture.",
    category: "culture",
    wildlife: [],
    slug: "arusha-cultural-tour",
  },
  {
    id: 23,
    title: "Katavi National Park",
    destination: "Tanzania",
    duration: "4 days",
    price: 1600,
    rating: 4.6,
    image: "https://ik.imagekit.io/jinx/travel/images%20(2).jpeg?updatedAt=1750014524461?height=250&width=350",
    description: "Remote wilderness experience.",
    category: "wildlife",
    wildlife: ["Various"],
    slug: "katavi-national-park-safari",
  },
  {
    id: 24,
    title: "Mahale Chimpanzee Trek",
    destination: "Tanzania",
    duration: "6 days",
    price: 2100,
    rating: 4.9,
    image: "https://ik.imagekit.io/jinx/travel/c2a4f1d9-5332-42ab-9ad3-31d99823d5a8_5-day-gombe-and-mahale-national-park-chimpanzee-trekking-xlarge.jpg?updatedAt=1750014593270?height=250&width=350",
    description: "Trek with wild chimpanzees.",
    category: "wildlife",
    wildlife: ["Chimpanzees"],
    slug: "mahale-mountains-national-park-chimpanzee-trekking",
  },
  {
    id: 25,
    title: "Pemba Island Diving",
    destination: "Tanzania",
    duration: "4 days",
    price: 980,
    rating: 4.5,
    image: "https://ik.imagekit.io/jinx/travel/pemba-island-Tanzania.webp?updatedAt=1750014959262?height=250&width=350",
    description: "World-class diving experience.",
    category: "adventure",
    wildlife: [],
    slug: "pemba-island-diving",
  },
  {
    id: 26,
    title: "Stone Town Heritage Tour",
    destination: "Tanzania",
    duration: "2 days",
    price: 350,
    rating: 4.4,
    image: "https://ik.imagekit.io/jinx/travel/51.jpg?updatedAt=1750015033324?height=250&width=350",
    description: "Explore UNESCO World Heritage site.",
    category: "culture",
    wildlife: [],
    slug: "stone-town-heritage-tour",
  },
  {
    id: 27,
    title: "Northern Circuit Safari",
    destination: "Tanzania",
    duration: "10 days",
    price: 2800,
    rating: 4.9,
    image: "https://ik.imagekit.io/jinx/travel/images%20(3).jpeg?updatedAt=1750015098700?height=250&width=350",
    description: "Complete northern Tanzania experience.",
    category: "wildlife",
    wildlife: ["Various"],
    slug: "northern-circuit-safari",
  },

  // Rwanda Tours
  {
    id: 28,
    title: "Gorilla Trekking Experience",
    destination: "Rwanda",
    duration: "3 days",
    price: 2500,
    rating: 5.0,
    image: "https://ik.imagekit.io/jinx/travel/gorilla-trekking-experience-13.jpg?updatedAt=1750015182565?height=250&width=350",
    description: "Get up close with mountain gorillas.",
    category: "wildlife",
    wildlife: ["Gorillas"],
    slug: "gorilla-trekking-experience",
  },
  {
    id: 29,
    title: "Nyungwe Forest Canopy Walk",
    destination: "Rwanda",
    duration: "2 days",
    price: 450,
    rating: 4.6,
    image: "https://ik.imagekit.io/jinx/travel/Walk-trail-nyungwe-Usoke-explorers.jpg?updatedAt=1750015272732?height=250&width=350",
    description: "Walk among the treetops.",
    category: "adventure",
    wildlife: ["Birds"],
    slug: "nyungwe-forest-canopy-walk",
  },
  {
    id: 30,
    title: "Lake Kivu Relaxation",
    destination: "Rwanda",
    duration: "3 days",
    price: 380,
    rating: 4.4,
    image: "https://ik.imagekit.io/jinx/travel/images%20(4).jpeg?updatedAt=1750015334762?height=250&width=350",
    description: "Relax by Africa's great lake.",
    category: "adventure",
    wildlife: [],
    slug: "lake-kivu-relaxation",
  },
  {
    id: 31,
    title: "Akagera National Park",
    destination: "Rwanda",
    duration: "2 days",
    price: 520,
    rating: 4.5,
    image: "https://ik.imagekit.io/jinx/travel/Akagera-national-park-1-750x450.jpg?updatedAt=1750015552704?height=250&width=350",
    description: "Rwanda's only savanna park.",
    category: "wildlife",
    wildlife: ["Various"],
    slug: "akagera-national-park-safari",
  },
  {
    id: 32,
    title: "Kigali City Tour",
    destination: "Rwanda",
    duration: "1 day",
    price: 150,
    rating: 4.3,
    image: "https://ik.imagekit.io/jinx/travel/25-Top-Attractions-in-Rwanda-2.jpg?updatedAt=1750004163696?height=250&width=350",
    description: "Explore the clean city of Kigali.",
    category: "culture",
    wildlife: [],
    slug: "kigali-city-tour",
  },
  {
    id: 33,
    title: "Golden Monkey Tracking",
    destination: "Rwanda",
    duration: "2 days",
    price: 680,
    rating: 4.7,
    image: "https://ik.imagekit.io/jinx/travel/golden-monkey-trekking.jpg?updatedAt=1750015688667?height=250&width=350",
    description: "Track rare golden monkeys.",
    category: "wildlife",
    wildlife: ["Monkeys"],
    slug: "golden-monkey-tracking",
  },

  // Uganda Tours
  {
    id: 34,
    title: "Bwindi Gorilla Trekking",
    destination: "Uganda",
    duration: "4 days",
    price: 2200,
    rating: 4.9,
    image: "https://ik.imagekit.io/jinx/travel/Magical-encounters-with-the-mountain-gorillas-of-Bwindi.jpg?updatedAt=1750015754767?height=250&width=350",
    description: "Trek mountain gorillas in Bwindi.",
    category: "wildlife",
    wildlife: ["Gorillas"],
    slug: "bwindi-gorilla-trekking",
  },
  {
    id: 35,
    title: "Queen Elizabeth Safari",
    destination: "Uganda",
    duration: "5 days",
    price: 1150,
    rating: 4.6,
    image: "https://ik.imagekit.io/jinx/travel/fc.jpg?updatedAt=1750015847691?height=250&width=350",
    description: "Diverse wildlife in scenic landscapes.",
    category: "wildlife",
    wildlife: ["Various"],
    slug: "queen-elizabeth-national-park-safari",
  },
  {
    id: 36,
    title: "Murchison Falls Adventure",
    destination: "Uganda",
    duration: "4 days",
    price: 980,
    rating: 4.7,
    image: "https://ik.imagekit.io/jinx/travel/10-days-wildlife-safari-and-yoga-adventure.jpg?updatedAt=1750015915152?height=250&width=350",
    description: "Witness the powerful Murchison Falls.",
    category: "adventure",
    wildlife: ["Birds"],
    slug: "murchison-falls-national-park-safari",
  },
  {
    id: 37,
    title: "Kibale Chimpanzee Tracking",
    destination: "Uganda",
    duration: "3 days",
    price: 750,
    rating: 4.5,
    image: "https://ik.imagekit.io/jinx/travel/kibale-national-park-chimpanzees-uganda-590x390.jpg?updatedAt=1750015970496?height=250&width=350",
    description: "Track our closest relatives.",
    category: "wildlife",
    wildlife: ["Chimpanzees"],
    slug: "kibale-national-park-chimpanzee-trekking",
  },
  {
    id: 38,
    title: "Lake Mburo National Park",
    destination: "Uganda",
    duration: "2 days",
    price: 420,
    rating: 4.3,
    image: "https://ik.imagekit.io/jinx/travel/lake-mburo-national-park.jpg?updatedAt=1750016037012?height=250&width=350",
    description: "Compact park with diverse wildlife.",
    category: "wildlife",
    wildlife: ["Various"],
    slug: "lake-mburo-national-park-safari",
  },
  {
    id: 39,
    title: "Rwenzori Mountains Hiking",
    destination: "Uganda",
    duration: "7 days",
    price: 1800,
    rating: 4.8,
    image: "https://ik.imagekit.io/jinx/travel/Rwenzori-Mountains-03_1600p.jpg?updatedAt=1750016117660?height=250&width=350",
    description: "Hike the Mountains of the Moon.",
    category: "adventure",
    wildlife: [],
    slug: "rwenzori-mountains-hiking",
  },
  {
    id: 40,
    title: "Jinja White Water Rafting",
    destination: "Uganda",
    duration: "2 days",
    price: 350,
    rating: 4.6,
    image: "https://ik.imagekit.io/jinx/travel/nile-river-rafting-itanda.jpg?updatedAt=1750016190875?height=250&width=350",
    description: "Adventure at the source of the Nile.",
    category: "adventure",
    wildlife: [],
    slug: "jinja-adventure-tour",
  },
  {
    id: 41,
    title: "Lake Bunyonyi Relaxation",
    destination: "Uganda",
    duration: "3 days",
    price: 450,
    rating: 4.4,
    image: "https://ik.imagekit.io/jinx/travel/lake-bunyonyi-uganda.webp?updatedAt=1750016252501?height=250&width=350",
    description: "Relax by Uganda's deepest lake.",
    category: "relaxation",
    wildlife: [],
    slug: "lake-bunyonyi-relaxation-tour",
  },
  {
    id: 42,
    title: "Ssese Islands Beach Holiday",
    destination: "Uganda",
    duration: "4 days",
    price: 650,
    rating: 4.5,
    image: "https://ik.imagekit.io/jinx/travel/Travel-to-Ssese-islands.jpg?updatedAt=1750016305699?height=250&width=350",
    description: "Beach paradise on Lake Victoria.",
    category: "beach",
    wildlife: [],
    slug: "ssese-islands-beach-holiday",
  },
  {
    id: 43,
    title: "Lake Naivasha Boat Safari",
    destination: "Kenya",
    duration: "1 day",
    price: 150,
    rating: 4.3,
    image: "https://ik.imagekit.io/jinx/travel/flamingos-lakes-great-rift-valley-1.jpg?updatedAt=1750072866145?updatedAt=1750016305699?height=250&width=350",
    description: "Boat safari on freshwater Lake Naivasha with hippos, birds, and Crescent Island walking safari.",
    category: "wildlife",
    wildlife: ["Various"],
    slug: "lake-naivasha-boat-safari",
  },
{
  id: 44,
  title: "Accessible  Kenya Safari Experience",
  destination: "Kenya",
  duration: "7 days",
  price: 2450,
  rating: 4.8,
  image: "https://ik.imagekit.io/jinx/travel/accessible-safari-kenya.jpg?updatedAt=1750073000000?height=250&width=350",
  description: "A fully accessible safari experience designed for travelers with mobility challenges, featuring wheelchair-accessible vehicles, accommodations, and tailored wildlife viewing.",
  category: "wildlife",
  wildlife: ["Elephants", "Lions", "Giraffes", "Zebras", "Hippos", "Various Bird Species"],
  slug: "kenya-disability-safari"
}
]

const TOURS_PER_PAGE = 10

export default function ToursPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDestination, setSelectedDestination] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useLanguage()

  // Generate SEO metadata
  const pageTitle = `Safari Tours | ${SEO.defaultTitle}`
  const pageDescription = "Browse our collection of premium East Africa safari tours. From luxury Kenya safaris to budget-friendly Uganda adventures, we have the perfect African experience for you."
  const canonicalUrl = `${SEO.canonical}/tours`

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tour.wildlife && tour.wildlife.some((animal) => animal.toLowerCase().includes(searchQuery.toLowerCase())))
    const matchesDestination = selectedDestination === "all" || tour.destination === selectedDestination
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "budget" && tour.price < 800) ||
      (priceRange === "mid" && tour.price >= 800 && tour.price < 1500) ||
      (priceRange === "luxury" && tour.price >= 1500)
    const matchesCategory = selectedCategory === "all" || tour.category === selectedCategory

    return matchesSearch && matchesDestination && matchesPrice && matchesCategory
  })

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return b.rating - a.rating
    }
  })

  const totalPages = Math.ceil(sortedTours.length / TOURS_PER_PAGE)
  const startIndex = (currentPage - 1) * TOURS_PER_PAGE
  const endIndex = startIndex + TOURS_PER_PAGE
  const currentTours = sortedTours.slice(startIndex, endIndex)

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === currentPage || page < 1 || page > totalPages) return

      setIsLoading(true)
      setCurrentPage(page)

      const toursSection = document.getElementById("tours-section")
      if (toursSection) {
        toursSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }

      setTimeout(() => setIsLoading(false), 300)
    },
    [currentPage, totalPages],
  )

  const handleFilterChange = useCallback((filterType: string, value: string) => {
    setCurrentPage(1)
    setIsLoading(true)

    switch (filterType) {
      case "search":
        setSearchQuery(value)
        break
      case "destination":
        setSelectedDestination(value)
        break
      case "price":
        setPriceRange(value)
        break
      case "category":
        setSelectedCategory(value)
        break
      case "sort":
        setSortBy(value)
        break
    }

    setTimeout(() => setIsLoading(false), 300)
  }, [])

  const clearAllFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedDestination("all")
    setPriceRange("all")
    setSelectedCategory("all")
    setCurrentPage(1)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 300)
  }, [])

  // Generate structured data for search engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": currentTours.map((tour, index) => ({
      "@type": "ListItem",
      "position": startIndex + index + 1,
      "item": {
        "@type": "TouristAttraction",
        "name": tour.title,
        "description": tour.description,
        "url": `${canonicalUrl}/${tour.slug}`,
        "image": tour.image,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": tour.destination
        },
        "offers": {
          "@type": "Offer",
          "price": tour.price,
          "priceCurrency": "USD"
        }
      }
    }))
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={SEO.openGraph.images[0].url} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={SEO.openGraph.images[0].url} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div className="min-h-screen pt-16">
        {/* Header with rich schema markup */}
        <section 
          className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20"
          itemScope
          itemType="https://schema.org/WebPage"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4"
              itemProp="headline"
            >
              {t("tours")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-8"
              itemProp="description"
            >
              Discover {tours.length} amazing tours across East Africa
            </motion.p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search tours..."
                  value={searchQuery}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10"
                  aria-label="Search tours by keyword"
                />
              </div>

              <Select value={selectedDestination} onValueChange={(value) => handleFilterChange("destination", value)}>
                <SelectTrigger className="w-full md:w-48" aria-label="Filter by destination">
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allDestinations")}</SelectItem>
                  <SelectItem value="Kenya">Kenya</SelectItem>
                  <SelectItem value="Tanzania">Tanzania</SelectItem>
                  <SelectItem value="Rwanda">Rwanda</SelectItem>
                  <SelectItem value="Uganda">Uganda</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={(value) => handleFilterChange("price", value)}>
                <SelectTrigger className="w-full md:w-48" aria-label="Filter by price range">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allPrices")}</SelectItem>
                  <SelectItem value="budget">{t("budget")} ($0-$800)</SelectItem>
                  <SelectItem value="mid">{t("midRange")} ($800-$1500)</SelectItem>
                  <SelectItem value="luxury">{t("luxury")} ($1500+)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger className="w-full md:w-48" aria-label="Filter by category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allCategories")}</SelectItem>
                  <SelectItem value="wildlife">{t("wildlife")}</SelectItem>
                  <SelectItem value="adventure">{t("adventure")}</SelectItem>
                  <SelectItem value="photography">{t("photography")}</SelectItem>
                  <SelectItem value="culture">{t("culture")}</SelectItem>
                  <SelectItem value="conservation">{t("conservation")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => handleFilterChange("sort", value)}>
                <SelectTrigger className="w-full md:w-48" aria-label="Sort tours by">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{t("mostPopular")}</SelectItem>
                  <SelectItem value="price-low">{t("priceLowToHigh")}</SelectItem>
                  <SelectItem value="price-high">{t("priceHighToLow")}</SelectItem>
                  <SelectItem value="rating">{t("highestRated")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Tours Grid with schema.org markup */}
        <section id="tours-section" className="py-12" itemScope itemType="https://schema.org/ItemList">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {t("showingResults")} {startIndex + 1}-{Math.min(endIndex, sortedTours.length)} {t("of")}{" "}
                {sortedTours.length} {t("resultsText")}
              </p>
              <p className="text-sm text-gray-500">
                {t("page")} {currentPage} {t("of")} {totalPages}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentPage}-${searchQuery}-${selectedDestination}-${priceRange}-${selectedCategory}-${sortBy}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0.5 : 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {currentTours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                  >
                    <meta itemProp="position" content={String(startIndex + index + 1)} />
                    <Card 
                      className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full"
                      itemScope
                      itemType="https://schema.org/TouristAttraction"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={tour.image || "/placeholder.svg"}
                          alt={`${tour.title} - ${tour.destination} safari tour`}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          itemProp="image"
                          loading="lazy"
                        />
                        <Badge className="absolute top-4 left-4 bg-orange-600" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                          <meta itemProp="addressCountry" content={tour.destination} />
                          {tour.destination}
                        </Badge>
                        <Badge className="absolute top-4 right-4 bg-white text-gray-800 capitalize" variant="secondary">
                          {tour.category}
                        </Badge>
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                            <meta itemProp="ratingValue" content={String(tour.rating)} />
                            <meta itemProp="reviewCount" content="100" />
                            {tour.rating}
                          </span>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg line-clamp-2" itemProp="name">
                          {tour.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2" itemProp="description">
                          {tour.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span itemProp="duration">{tour.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>{tour.destination}</span>
                            </div>
                          </div>
                          {tour.wildlife.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {tour.wildlife.slice(0, 3).map((animal) => (
                                <Badge key={animal} variant="outline" className="text-xs">
                                  {animal}
                                </Badge>
                              ))}
                              {tour.wildlife.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{tour.wildlife.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-orange-600" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                            <meta itemProp="priceCurrency" content="USD" />
                            <meta itemProp="price" content={String(tour.price)} />
                            ${tour.price}
                          </span>
                          <Button asChild className="bg-orange-600 hover:bg-orange-700">
                            <Link href={`/tours/${tour.slug}`} itemProp="url">
                              {t("viewDetails")}
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {sortedTours.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">{t("noToursFound")}</p>
                <Button onClick={clearAllFilters} className="bg-orange-600 hover:bg-orange-700">
                  {t("clearAllFilters")}
                </Button>
              </motion.div>
            )}

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading}
                  className="flex items-center gap-2"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                  {t("previous")}
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          disabled={isLoading}
                          className={`min-w-[40px] ${currentPage === page ? "bg-orange-600 hover:bg-orange-700" : ""}`}
                          aria-label={`Go to page ${page}`}
                          aria-current={currentPage === page ? "page" : undefined}
                        >
                          {page}
                        </Button>
                      )
                    } else if (page === currentPage - 3 || page === currentPage + 3) {
                      return (
                        <span key={page} className="px-2 py-1 text-gray-500 flex items-center">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isLoading}
                  className="flex items-center gap-2"
                  aria-label="Next page"
                >
                  {t("next")}
                  <ChevronRight size={16} />
                </Button>

                <div className="text-sm text-gray-500 md:ml-4">
                  {t("page")} {currentPage} {t("of")} {totalPages}
                </div>
              </motion.div>
            )}

            {totalPages > 10 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center gap-2 mt-4"
              >
                <span className="text-sm text-gray-600">{t("jumpToPage")}</span>
                <Input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = Number.parseInt(e.target.value)
                    if (page >= 1 && page <= totalPages) {
                      handlePageChange(page)
                    }
                  }}
                  className="w-20 text-center"
                  disabled={isLoading}
                  aria-label="Jump to page number"
                />
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}