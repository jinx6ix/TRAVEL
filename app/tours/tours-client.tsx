"use client"

import { useState, useCallback, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/useLanguage"
import { type Tour } from "@/lib/tours-data"

interface ToursClientProps {
  tours: Tour[]
  currentPage: number
  totalTours: number
  perPage: number
}

export default function ToursClient({ tours, currentPage, totalTours, perPage }: ToursClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDestination, setSelectedDestination] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useLanguage()

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tour.wildlife && tour.wildlife.some((animal: string) => animal.toLowerCase().includes(searchQuery.toLowerCase())))
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

  const totalPages = Math.ceil(totalTours / perPage)

  const handleFilterChange = useCallback((filterType: string, value: string) => {
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
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 300)
  }, [])

  return (
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
            Discover {totalTours} amazing tours across East Africa
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
              {t("showingResults")} {sortedTours.length > 0 ? 1 : 0}-{sortedTours.length} {t("of")}{" "}
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
              {sortedTours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" content={String(index + 1)} />
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
                            {tour.wildlife.slice(0, 3).map((animal: boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Key | null | undefined) => (
                              <Badge key={`${animal}-${index}`} variant="outline" className="text-xs">
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
                onClick={() => window.location.href = `/tours?page=${currentPage - 1}`}
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
                        onClick={() => window.location.href = `/tours?page=${page}`}
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
                onClick={() => window.location.href = `/tours?page=${currentPage + 1}`}
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
  )
}