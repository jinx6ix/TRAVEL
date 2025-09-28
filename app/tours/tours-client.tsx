"use client"

import { useState, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Star, ChevronLeft, ChevronRight, Filter, X, Globe, Tag, Accessibility } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/useLanguage"
import { type TourData } from "@/data/tours-data"
import { useRouter, useSearchParams } from "next/navigation"

interface ToursClientProps {
  tours: TourData[]
  currentPage: number
  totalTours: number
  perPage: number
  allTours?: TourData[]
}

// SEO-optimized filter options based on actual tour data
const DESTINATIONS = [
  { value: "all", label: "All Destinations", description: "Browse all countries" },
  { value: "Kenya", label: "Kenya", description: "Maasai Mara & Amboseli" },
  { value: "Tanzania", label: "Tanzania", description: "Serengeti & Zanzibar" },
  { value: "Uganda", label: "Uganda", description: "Gorilla trekking" },
  { value: "Rwanda", label: "Rwanda", description: "Cultural experiences" },
  { value: "Kenya & Tanzania", label: "Kenya & Tanzania", description: "Maasai Mara & Serengeti" },
] as const;

const PRICE_RANGES = [
  { value: "all", label: "Any Price", description: "All budget ranges" },
  { value: "budget", label: "Budget", description: "Under $800" },
  { value: "mid", label: "Mid-Range", description: "$800 - $1500" },
  { value: "luxury", label: "Luxury", description: "$1500+" },
] as const;

const CATEGORIES = [
  { value: "all", label: "All Categories", description: "All tour types" },
  { value: "wildlife", label: "Wildlife", description: "Safari adventures" },
  { value: "adventure", label: "Adventure", description: "Active experiences" },
  { value: "cultural", label: "Cultural", description: "Local communities" },
  { value: "beach", label: "Beach", description: "Coastal relaxation" },
  { value: "hiking", label: "Hiking", description: "Mountain treks" },
] as const;

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular", description: "Top rated" },
  { value: "price-low", label: "Price: Low to High", description: "Budget first" },
  { value: "price-high", label: "Price: High to Low", description: "Luxury first" },
  { value: "rating", label: "Highest Rated", description: "Best reviews" },
  { value: "duration", label: "Tour Duration", description: "Trip length" },
] as const;

export default function ToursClient({ tours, currentPage, totalTours, perPage, allTours = [] }: ToursClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDestination, setSelectedDestination] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Memoized filtering for performance, updated to handle multi-country destinations
  const filteredTours = useMemo(() => {
    if (!searchQuery && selectedDestination === "all" && priceRange === "all" && selectedCategory === "all") {
      return tours;
    }

    return tours.filter((tour) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" ||
        tour.title.toLowerCase().includes(searchLower) ||
        tour.description.toLowerCase().includes(searchLower) ||
        tour.country.toLowerCase().includes(searchLower) ||
        tour.category.toLowerCase().includes(searchLower) ||
        (tour.wildlife && tour.wildlife.some((animal: string) => 
          animal.toLowerCase().includes(searchLower))
        );

      // Split tour.country into individual countries and normalize for case-insensitive matching
      const tourCountries = tour.country.split(" & ").map(c => c.trim().toLowerCase());
      const selectedDestLower = selectedDestination.toLowerCase();
      const matchesDestination = selectedDestination === "all" ||
        tourCountries.includes(selectedDestLower) ||
        (selectedDestination === "Kenya & Tanzania" && tour.country === "Kenya & Tanzania");

      const matchesPrice = priceRange === "all" ||
        (priceRange === "budget" && tour.price < 800) ||
        (priceRange === "mid" && tour.price >= 800 && tour.price < 1500) ||
        (priceRange === "luxury" && tour.price >= 1500);
      const matchesCategory = selectedCategory === "all" || tour.category === selectedCategory;

      return matchesSearch && matchesDestination && matchesPrice && matchesCategory;
    });
  }, [tours, searchQuery, selectedDestination, priceRange, selectedCategory]);

  // Optimized sorting
  const sortedTours = useMemo(() => {
    return [...filteredTours].sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "duration": return parseInt(b.duration) - parseInt(a.duration);
        default: return b.rating - a.rating; // Default to rating
      }
    });
  }, [filteredTours, sortBy]);

  const totalPages = Math.ceil(totalTours / perPage);
  const activeFiltersCount = [
    searchQuery,
    selectedDestination !== "all",
    priceRange !== "all",
    selectedCategory !== "all",
  ].filter(Boolean).length;

  // Get unique destinations and categories for SEO content
  const uniqueDestinations = useMemo(() => 
    [...new Set(allTours.map(t => t.country))], [allTours]);
  const uniqueCategories = useMemo(() => 
    [...new Set(allTours.map(t => t.category))], [allTours]);
  const accessibleToursCount = useMemo(() => 
    allTours.filter(tour => tour.accessible || tour.title.toLowerCase().includes('accessible')).length, [allTours]);

  // SEO-friendly URL updates with null check for searchParams
  const updateURLParams = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "all" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    params.set("page", "1");
    router.push(`/tours?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const handleFilterChange = useCallback((filterType: string, value: string) => {
    setIsLoading(true);
    switch (filterType) {
      case "search": setSearchQuery(value); updateURLParams({ search: value }); break;
      case "destination": setSelectedDestination(value); updateURLParams({ destination: value }); break;
      case "price": setPriceRange(value); updateURLParams({ price: value }); break;
      case "category": setSelectedCategory(value); updateURLParams({ category: value }); break;
      case "sort": setSortBy(value); updateURLParams({ sort: value }); break;
    }
    setTimeout(() => setIsLoading(false), 200);
  }, [updateURLParams]);

  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedDestination("all");
    setPriceRange("all");
    setSelectedCategory("all");
    setIsLoading(true);
    updateURLParams({ search: "", destination: "all", price: "all", category: "all" });
    setTimeout(() => setIsLoading(false), 200);
  }, [updateURLParams]);

  const navigateToPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.set("page", page.toString());
    router.push(`/tours?${params.toString()}`, { scroll: true });
  }, [router, searchParams]);

  return (
    <div className="min-h-screen pt-16">
      {/* Enhanced Header with accessible focus */}
      <header className="bg-gradient-to-br from-orange-600 via-red-600 to-purple-700 text-white py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Accessible East Africa Safari Tours
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Discover {totalTours.toLocaleString()} curated safari experiences across {uniqueDestinations.length} countries. 
            {accessibleToursCount > 0 && ` ${accessibleToursCount} wheelchair-friendly tours available.`}
          </motion.p>
          
          {/* Accessible tour stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {[
              { label: "Countries", value: uniqueDestinations.length },
              { label: "Tour Types", value: uniqueCategories.length },
              { label: "Accessible Tours", value: accessibleToursCount },
              { label: "Satisfaction", value: "98%" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Enhanced Filters Section */}
      <section className="py-8 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Safari</h2>
              <p className="text-gray-600">Filter by destination, budget, or activity type</p>
            </div>
            
            <div className="flex items-center gap-4">
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  {activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}
                </Badge>
              )}
              <Button
                variant="outline"
                onClick={clearAllFilters}
                disabled={activeFiltersCount === 0}
                className="flex items-center gap-2"
              >
                <X size={16} />
                Clear All
              </Button>
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Tours
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="search"
                  placeholder="Search by destination, wildlife, or activity..."
                  value={searchQuery}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-12 pr-4 py-3"
                />
              </div>
            </div>

            {[
              { value: selectedDestination, onChange: (v: string) => handleFilterChange("destination", v), options: DESTINATIONS, label: "Destination", icon: Globe },
              { value: priceRange, onChange: (v: string) => handleFilterChange("price", v), options: PRICE_RANGES, label: "Price Range", icon: Tag },
              { value: selectedCategory, onChange: (v: string) => handleFilterChange("category", v), options: CATEGORIES, label: "Category", icon: Filter },
            ].map(({ value, onChange, options, label, icon: Icon }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label}
                </label>
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={label} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-sm text-gray-500">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden space-y-4">
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center gap-2 py-3"
            >
              <Filter size={20} />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>

            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <Input
                    placeholder="Search tours..."
                    value={searchQuery}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="w-full"
                  />
                  
                  {[
                    { value: selectedDestination, onChange: (v: string) => handleFilterChange("destination", v), options: DESTINATIONS, label: "Destination" },
                    { value: priceRange, onChange: (v: string) => handleFilterChange("price", v), options: PRICE_RANGES, label: "Price Range" },
                    { value: selectedCategory, onChange: (v: string) => handleFilterChange("category", v), options: CATEGORIES, label: "Category" },
                  ].map(({ value, onChange, options, label }) => (
                    <Select key={label} value={value} onValueChange={onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={label} />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sort Options */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-600">
              Showing {sortedTours.length} of {tours.length} tours
              {searchQuery && ( <> for "<strong>{searchQuery}</strong>"</> )}
              {selectedDestination !== "all" && ( <> in <strong>{selectedDestination}</strong></> )}
            </div>
            
            <Select value={sortBy} onValueChange={(v) => handleFilterChange("sort", v)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Main Tours Grid */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPage}-${searchQuery}-${selectedDestination}-${priceRange}-${selectedCategory}-${sortBy}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0.7 : 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {sortedTours.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {sortedTours.map((tour, index) => (
                    <motion.article
                      key={tour.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group h-full"
                    >
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-200">
                        <div className="relative overflow-hidden">
                          <Link href={`/tours/${tour.slug}`} className="block">
                            <Image
                              src={tour.gallery[0] || "/images/placeholder-tour.jpg"}
                              alt={`${tour.title} - ${tour.country} ${tour.category} tour`}
                              width={400}
                              height={250}
                              className="w-full h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                              loading={index < 8 ? "eager" : "lazy"}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                          </Link>
                          
                          <Badge className="absolute top-3 left-3 bg-orange-600 border-0">
                            {tour.country}
                          </Badge>
                          
                          <Badge variant="secondary" className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm">
                            {tour.category}
                          </Badge>

                          {/* Accessibility Badge */}
                          {(tour.accessible || tour.title.toLowerCase().includes('accessible')) && (
                            <Badge className="absolute bottom-3 left-3 bg-green-600 border-0">
                              <Accessibility size={12} className="mr-1" />
                              Accessible
                            </Badge>
                          )}
                          
                          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">
                              {tour.rating}
                            </span>
                          </div>
                        </div>
                        
                        <CardHeader className="pb-3 flex-1">
                          <CardTitle className="text-lg leading-tight line-clamp-2">
                            <Link href={`/tours/${tour.slug}`} className="hover:text-orange-600 transition-colors">
                              {tour.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-2 text-gray-600">
                            {tour.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar size= {14} />
                                <span>{tour.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin size={14} />
                                <span>{tour.country}</span>
                              </div>
                            </div>
                            
                            {tour.wildlife && tour.wildlife.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {tour.wildlife.slice(0, 3).map((animal, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {animal}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex flex-col">
                              <span className="text-xl font-bold text-orange-600">
                                ${tour.price.toLocaleString()}
                              </span>
                              <span className="text-xs text-gray-500">per person</span>
                            </div>
                            <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700">
                              <Link href={`/tours/${tour.slug}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-center py-16"
                >
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">No tours found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchQuery ? `No results for "${searchQuery}". Try different keywords.` : 'Adjust your filters to find more safari tours.'}
                    </p>
                    <Button onClick={clearAllFilters} className="bg-orange-600 hover:bg-orange-700">
                      Clear All Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Pagination */}
          {totalPages > 1 && sortedTours.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-center items-center gap-6 mt-16 pt-8 border-t border-gray-200"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateToPage(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="flex items-center gap-2 px-6"
              >
                <ChevronLeft size={20} />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 7) pageNum = i + 1;
                  else if (currentPage <= 4) pageNum = i + 1;
                  else if (currentPage >= totalPages - 3) pageNum = totalPages - 6 + i;
                  else pageNum = currentPage - 3 + i;

                  if (pageNum < 1 || pageNum > totalPages) return null;

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => navigateToPage(pageNum)}
                      disabled={isLoading}
                      className={`min-w-[44px] h-11 ${
                        currentPage === pageNum ? "bg-orange-600 hover:bg-orange-700" : ""
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateToPage(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="flex items-center gap-2 px-6"
              >
                Next
                <ChevronRight size={20} />
              </Button>
            </motion.nav>
          )}
        </div>
      </main>
    </div>
  )
}