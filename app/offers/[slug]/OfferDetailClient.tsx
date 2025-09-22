"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Star, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface OfferProps {
  offer: {
    id: number
    slug: string
    title: string
    description: string
    image: string
    destination?: string
    duration?: string
    price?: number
    originalPrice?: number
    rating?: number
    reviews?: number
    highlights?: string[]
    badge?: string
    offer?: string
    availability?: string
  }
}

export default function OfferDetailClient({ offer }: OfferProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <h1 className="text-xl font-semibold">Offer Not Found</h1>
        <Button onClick={() => router.push("/offers")} className="ml-4 bg-orange-600 hover:bg-orange-700">
          Back to Offers
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={offer.image}
            alt={`${offer.title} - Featured`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="text-white">
              {offer.badge && (
                <Badge variant="secondary" className="bg-orange-600 text-white mb-2">
                  {offer.badge}
                </Badge>
              )}
              <h1 className="text-4xl font-bold">{offer.title}</h1>
              <div className="flex items-center gap-4 text-sm mt-2">
                {offer.destination && (
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{offer.destination}</span>
                  </div>
                )}
                {offer.duration && (
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{offer.duration}</span>
                  </div>
                )}
                {offer.rating && (
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span>
                      {offer.rating} ({offer.reviews} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="offer">Special Offer</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>About This Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{offer.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            {offer.highlights && (
              <TabsContent value="highlights">
                <Card>
                  <CardHeader>
                    <CardTitle>Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {offer.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="offer">
              <Card>
                <CardHeader>
                  <CardTitle>Special Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-600">{offer.offer || "Check availability for discounts."}</p>
                  <p className="text-sm text-gray-500">{offer.availability}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4 border-2 border-orange-500">
            <CardHeader>
              <CardTitle>Book This Offer</CardTitle>
            </CardHeader>
            <CardContent>
              {offer.originalPrice && offer.price && (
                <div className="mb-4">
                  <span className="line-through text-gray-500">${offer.originalPrice}</span>
                  <span className="text-3xl font-bold text-orange-600 ml-2">${offer.price}</span>
                </div>
              )}
              <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                <Link href={`/offers/${offer.slug}/book`}>Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
