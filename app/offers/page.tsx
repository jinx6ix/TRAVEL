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

interface Offer {
  id: number
  slug: string
  title: string
  destination: string
  duration: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  description: string
  badge: string
  highlights: string[]
  offer: string
  availability: string
}

const safariOffers = [
  {
    id: 1,
    slug: "nairobi-highlights-express-tour",
    title: "Nairobi Highlights Express Tour",
    destination: "Kenya",
    duration: "Half Day (5 hrs)",
    price: 99,
    originalPrice: 129,
    rating: 4.8,
    reviews: 142,
    image: "https://ik.imagekit.io/jinx/travel/Giraffe-at-Nairobi-National-Park.webp?updatedAt=1751635762605",
    description: "Perfect for layovers! Experience Nairobi's top attractions in just hours",
    badge: "TRANSIT SPECIAL",
    highlights: [
      "Hotel pickup/drop-off included",
      "Giraffe Centre & Karen Blixen Museum",
      "Optional Sheldrick Wildlife Trust",
      "Local artisan shopping"
    ],
    offer: "Book 48hrs in advance & get free airport transfer",
    availability: "Only 3 spots left today",
  },
  {
    id: 2,
    slug: "maasai-mara-luxury-safari",
    title: "Maasai Mara Luxury Safari",
    destination: "Kenya",
    duration: "3 Days / 2 Nights",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 89,
    image: "https://ik.imagekit.io/jinx/travel/mahali-mzuri-2-2-420x310.jpg?updatedAt=1751635762576",
    description: "Premium safari with luxury tents & private game drives",
    badge: "BEST SELLER",
    highlights: [
      "Award-winning eco-lodges",
      "Sunset champagne game drives",
      "Hot air balloon add-on available",
      "Maasai cultural experience"
    ],
    offer: "FREE night + massage for couples (limited time)",
    availability: "High season - booking fast",
  },
  {
    id: 3,
    slug: "amboseli-elephant-paradise",
    title: "Amboseli Elephant Paradise",
    destination: "Kenya",
    duration: "2 Days / 1 Night",
    price: 749,
    originalPrice: 899,
    rating: 4.7,
    reviews: 63,
    image: "https://ik.imagekit.io/jinx/travel/Amboseli-National-Park-Elephantsssss.jpg?updatedAt=1751635762755",
    description: "Hundreds of elephants with Kilimanjaro backdrop",
    badge: "FAMILY FAVORITE",
    highlights: [
      "Guaranteed elephant sightings",
      "Kilimanjaro photo opportunities",
      "Child-friendly lodge with pool",
      "400+ bird species"
    ],
    offer: "Kids under 12 stay FREE (2 adults minimum)",
    availability: "Only 1 lodge remaining",
  }
]

const OFFERS_PER_PAGE = 10

export default function OffersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDestination, setSelectedDestination] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useLanguage()

  // Generate SEO metadata
  const pageTitle = `Safari Special Offers | ${SEO.defaultTitle}`
  const pageDescription = "Browse our limited-time safari special offers and deals. Get discounted rates on premium Kenya safari experiences with exclusive perks."
  const canonicalUrl = `${SEO.canonical}/offers`

  const filteredOffers = safariOffers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.highlights.some((highlight) => highlight.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDestination = selectedDestination === "all" || offer.destination === selectedDestination
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "budget" && offer.price < 500) ||
      (priceRange === "mid" && offer.price >= 500 && offer.price < 1000) ||
      (priceRange === "luxury" && offer.price >= 1000)

    return matchesSearch && matchesDestination && matchesPrice
  })

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "discount":
        return (b.originalPrice - b.price) - (a.originalPrice - a.price)
      default:
        return b.rating - a.rating
    }
  })

  const totalPages = Math.ceil(sortedOffers.length / OFFERS_PER_PAGE)
  const startIndex = (currentPage - 1) * OFFERS_PER_PAGE
  const endIndex = startIndex + OFFERS_PER_PAGE
  const currentOffers = sortedOffers.slice(startIndex, endIndex)

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === currentPage || page < 1 || page > totalPages) return

      setIsLoading(true)
      setCurrentPage(page)

      const offersSection = document.getElementById("offers-section")
      if (offersSection) {
        offersSection.scrollIntoView({
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
    setSortBy("popular")
    setCurrentPage(1)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 300)
  }, [])

  // Generate structured data for search engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": currentOffers.map((offer, index) => ({
      "@type": "ListItem",
      "position": startIndex + index + 1,
      "item": {
        "@type": "TouristAttraction",
        "name": offer.title,
        "description": offer.description,
        "url": `${canonicalUrl}/${offer.slug}`,
        "image": offer.image,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": offer.destination
        },
        "offers": {
          "@type": "Offer",
          "price": offer.price,
          "priceCurrency": "USD",
          "priceValidUntil": "2024-12-31"
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
              {t("specialOffers")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-8"
              itemProp="description"
            >
              Limited-time deals on premium safari experiences
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
                  placeholder="Search offers..."
                  value={searchQuery}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10"
                  aria-label="Search offers by keyword"
                />
              </div>

              <Select value={selectedDestination} onValueChange={(value) => handleFilterChange("destination", value)}>
                <SelectTrigger className="w-full md:w-48" aria-label="Filter by destination">
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allDestinations")}</SelectItem>
                  <SelectItem value="Kenya">Kenya</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={(value) => handleFilterChange("price", value)}>
                <SelectTrigger className="w-full md:w-48" aria-label="Filter by price range">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allPrices")}</SelectItem>
                  <SelectItem value="budget">Budget ($0-$500)</SelectItem>
                  <SelectItem value="mid">Mid-Range ($500-$1000)</SelectItem>
                  <SelectItem value="luxury">Luxury ($1000+)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => handleFilterChange("sort", value)}>
                <SelectTrigger className="w-full md:w-48" aria-label="Sort offers by">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{t("mostPopular")}</SelectItem>
                  <SelectItem value="price-low">{t("priceLowToHigh")}</SelectItem>
                  <SelectItem value="price-high">{t("priceHighToLow")}</SelectItem>
                  <SelectItem value="rating">{t("highestRated")}</SelectItem>
                  <SelectItem value="discount">Biggest Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Offers Grid with schema.org markup */}
        <section id="offers-section" className="py-12" itemScope itemType="https://schema.org/ItemList">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {t("showingResults")} {startIndex + 1}-{Math.min(endIndex, sortedOffers.length)} {t("of")}{" "}
                {sortedOffers.length} {t("resultsText")}
              </p>
              <p className="text-sm text-gray-500">
                {t("page")} {currentPage} {t("of")} {totalPages}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentPage}-${searchQuery}-${selectedDestination}-${priceRange}-${sortBy}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0.5 : 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentOffers.map((offer, index) => (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                  >
                    <meta itemProp="position" content={String(startIndex + index + 1)} />
                    <Card 
                      className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full border-2 border-orange-500"
                      itemScope
                      itemType="https://schema.org/TouristAttraction"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={offer.image}
                          alt={`${offer.title} - ${offer.destination} safari offer`}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          itemProp="image"
                          loading="lazy"
                        />
                        <Badge className="absolute top-4 left-4 bg-orange-600" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                          <meta itemProp="addressCountry" content={offer.destination} />
                          {offer.destination}
                        </Badge>
                        <Badge className="absolute top-4 right-4 bg-white text-gray-800 capitalize" variant="secondary">
                          {offer.badge}
                        </Badge>
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                            <meta itemProp="ratingValue" content={String(offer.rating)} />
                            <meta itemProp="reviewCount" content={String(offer.reviews)} />
                            {offer.rating} ({offer.reviews})
                          </span>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg line-clamp-2" itemProp="name">
                          {offer.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2" itemProp="description">
                          {offer.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span itemProp="duration">{offer.duration}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Highlights:</h4>
                            <ul className="space-y-1 text-sm">
                              {offer.highlights.slice(0, 3).map((highlight, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="mr-2 text-green-500">✓</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                            <p className="text-sm font-medium text-yellow-800">{offer.offer}</p>
                            <p className="text-xs text-yellow-600 mt-1">{offer.availability}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-2xl font-bold text-orange-600" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                              <meta itemProp="priceCurrency" content="USD" />
                              <meta itemProp="price" content={String(offer.price)} />
                              ${offer.price}
                            </span>
                            {offer.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">${offer.originalPrice}</span>
                            )}
                          </div>
                          <Button asChild className="bg-orange-600 hover:bg-orange-700">
                            <Link href={`/offers/${offer.slug}`} itemProp="url">
                              {t("bookNow")}
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {sortedOffers.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No offers found matching your criteria</p>
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
          </div>
        </section>
      </div>
    </>
  )
}