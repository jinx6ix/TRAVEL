"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Clock,
  Shield,
  CheckCircle,
  Award,
  Compass,
  ArrowRight,
  Heart,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Tour = {
  slug: string;
  title: string;
  description?: string;
  gallery: string[];
  category?: string;
  difficulty?: string;
  destination?: string;
  duration?: string;
  groupSize?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  currency?: string;
  itinerary?: Array<{ day: number; title: string; description: string }>;
  reviews?: Array<{ name: string; comment: string; rating: number; date?: string }>;
  includes?: string[];
  excludes?: string[];
  highlights?: string[];
  season?: string;
  accommodation?: string;
};

type RelatedTour = {
  slug: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  category: string;
};

interface TourDetailClientProps {
  tour: Tour;
  aiOverview: string;
  relatedTours: RelatedTour[];
}

export default function TourDetailClient({ tour, aiOverview, relatedTours }: TourDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Initialize states
  useEffect(() => {
    setImageLoaded(new Array(tour.gallery.length).fill(false));
    setShareUrl(window.location.href);
  }, [tour.gallery.length]);

  // Image loading handler
  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // Navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length);
  };

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tour.title,
          text: tour.description?.substring(0, 100),
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      // Show copied message
    }
  };

  // Favorite functionality
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In real app, this would sync with backend/local storage
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section with Next.js Image Optimization */}
      <header className="relative h-96 lg:h-[500px] overflow-hidden" role="banner">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={tour.gallery[currentImageIndex] || "/images/placeholder.jpg"}
              alt={`${tour.title} - ${tour.destination} Safari Tour - Featured Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
              onLoad={() => handleImageLoad(currentImageIndex)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            {!imageLoaded[currentImageIndex] && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
          onClick={nextImage}
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </Button>

        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-orange-600 text-white">
                {tour.category} Tour
              </Badge>
              <Badge variant="outline" className="text-white border-white bg-black/30">
                {tour.difficulty}
              </Badge>
              {tour.rating && (
                <Badge variant="outline" className="text-white border-white bg-black/30">
                  <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                  {tour.rating} ({tour.reviewCount} reviews)
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">{tour.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm lg:text-base">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span className="font-medium">{tour.destination}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{tour.duration} Days</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>Max {tour.groupSize} People</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            aria-label="Share this tour"
          >
            <Share2 size={20} />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Tabs with Visible AI Content */}
            <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full h-auto p-1 bg-gray-100 rounded-lg">
                <TabsTrigger value="overview" className="py-3">Overview</TabsTrigger>
                <TabsTrigger value="itinerary" className="py-3">Itinerary</TabsTrigger>
                <TabsTrigger value="details" className="py-3">Details</TabsTrigger>
                <TabsTrigger value="reviews" className="py-3">Reviews</TabsTrigger>
              </TabsList>

              {/* Overview Tab with AI Content Integrated */}
              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Tour Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {tour.description}
                      </p>
                      
                      {/* Server-rendered AI Overview - Always Visible */}
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                          <Award size={20} className="text-blue-600" />
                          Expert Insight
                        </h3>
                        <p className="text-blue-800 leading-relaxed">
                          {aiOverview}
                        </p>
                      </div>
                    </div>

                    {/* Highlights */}
                    {tour.highlights && tour.highlights.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-semibold text-xl mb-4">Tour Highlights</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {tour.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                              <CheckCircle size={20} className="text-orange-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Itinerary Tab */}
              <TabsContent value="itinerary" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Detailed Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {tour.itinerary?.map((day, index) => (
                        <motion.div
                          key={day.day}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex gap-4 p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-orange-600">Day {day.day}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2 text-gray-900">
                              {day.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {day.description}
                            </p>
                          </div>
                        </motion.div>
                      )) ?? (
                        <p className="text-gray-500 text-center py-8">
                          Detailed itinerary coming soon. Contact us for more information.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Tour Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* What's Included */}
                    {(tour.includes || tour.excludes) && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {tour.includes && (
                          <div>
                            <h3 className="font-semibold text-lg mb-3">What's Included</h3>
                            <ul className="space-y-2">
                              {tour.includes.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                  <span className="text-gray-600">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {tour.excludes && (
                          <div>
                            <h3 className="font-semibold text-lg mb-3">Not Included</h3>
                            <ul className="space-y-2">
                              {tour.excludes.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Shield size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                                  <span className="text-gray-600">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Tour Information</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Destination:</dt>
                            <dd className="font-medium">{tour.destination}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Duration:</dt>
                            <dd className="font-medium">{tour.duration} days</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Group Size:</dt>
                            <dd className="font-medium">Up to {tour.groupSize}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Difficulty:</dt>
                            <dd className="font-medium">{tour.difficulty}</dd>
                          </div>
                        </dl>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Best Time to Visit</h3>
                        <p className="text-gray-600">
                          {tour.season || 'This tour operates year-round, with optimal wildlife viewing during dry seasons.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Star size={24} className="text-yellow-500" />
                      Customer Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {tour.reviews?.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-orange-600">
                                {review.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold">{review.name}</div>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                <span>{review.rating}/5</span>
                                {review.date && <span>• {review.date}</span>}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      )) ?? (
                        <div className="text-center py-8">
                          <Star size={48} className="mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500">No reviews yet. Be the first to review this tour!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Related Tours Section - Internal Linking */}
            {relatedTours.length > 0 && (
              <section className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Related Tours You Might Like</h2>
                  <Link href="/tours" className="text-orange-600 hover:text-orange-700 flex items-center gap-1">
                    View All Tours <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedTours.map((relatedTour, index) => (
                    <motion.div
                      key={relatedTour.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <Link href={`/tours/${relatedTour.slug}`}>
                          <div className="relative h-48">
                            <Image
                              src={relatedTour.image || "/images/vehicle-hire-og.jpg"}
                              alt={`${relatedTour.title} - ${relatedTour.destination} Safari`}
                              fill
                              className="object-cover rounded-t-lg"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                              {relatedTour.title}
                            </h3>
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                              <span>{relatedTour.destination}</span>
                              <span>{relatedTour.duration} days</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-orange-600">
                                ${relatedTour.price}
                              </span>
                              <Badge variant="secondary">{relatedTour.category}</Badge>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Booking Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg border-orange-200">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Book This Tour</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-1">
                    ${tour.price?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">per person</div>
                </div>

                <Button
                  asChild
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 text-lg"
                  size="lg"
                >
                  <Link href={`/tours/${tour.slug}/book`}>
                    Book Now
                  </Link>
                </Button>

                <div className="text-center text-xs text-gray-500 space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Shield size={12} />
                    <span>Best Price Guarantee</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <CheckCircle size={12} />
                    <span>Free Cancellation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}