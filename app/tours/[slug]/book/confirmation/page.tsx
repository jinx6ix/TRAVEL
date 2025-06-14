"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, MapPin, Phone, Mail, MessageCircle, Download, Share2, Home } from "lucide-react"
import { motion } from "framer-motion"

const toursData = [
  {
    id: 1,
    slug: "masai-mara-safari-adventure",
    title: "Masai Mara Safari Adventure",
    destination: "Kenya",
    duration: "5 days",
    price: 1200,
    category: "wildlife",
  },
  {
    id: 7,
    slug: "serengeti-wildlife-safari",
    title: "Serengeti Wildlife Safari",
    destination: "Tanzania",
    duration: "7 days",
    price: 1800,
    category: "wildlife",
  },
  {
    id: 12,
    slug: "gorilla-trekking-experience",
    title: "Gorilla Trekking Experience",
    destination: "Rwanda",
    duration: "3 days",
    price: 2500,
    category: "wildlife",
  },
]

export default function BookingConfirmationPage() {
  const params = useParams()
  const router = useRouter()

  const tour = toursData.find((t) => t.slug === params.slug)
  const bookingReference = `SAF${Date.now().toString().slice(-6)}`

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tour Not Found</h1>
          <Button onClick={() => router.push("/tours")}>Back to Tours</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="text-green-600" size={40} />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Request Submitted!</h1>
            <p className="text-gray-600">
              Thank you for choosing Safari Adventures. Your booking request has been sent successfully.
            </p>
          </div>

          {/* Booking Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Booking Details</span>
                <Badge variant="outline">Ref: {bookingReference}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Tour:</span>
                  <span>{tour.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Destination:</span>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{tour.destination}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Duration:</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{tour.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending Confirmation</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Confirmation Within 24 Hours</h4>
                    <p className="text-sm text-gray-600">
                      Our team will review your request and confirm availability within 24 hours.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Detailed Itinerary</h4>
                    <p className="text-sm text-gray-600">
                      You'll receive a comprehensive itinerary with all tour details and requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Secure Payment</h4>
                    <p className="text-sm text-gray-600">
                      We'll send secure payment instructions to complete your booking.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Pre-Departure Information</h4>
                    <p className="text-sm text-gray-600">
                      Receive packing lists, travel tips, and final preparations closer to your departure.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-600 mb-4">Have questions about your booking? Our team is here to help!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <MessageCircle className="text-green-600" size={20} />
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm text-gray-600">+254 757 662 968</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Mail className="text-blue-600" size={20} />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-600">irayaian4@gmail.com</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Phone className="text-orange-600" size={20} />
                  <div>
                    <div className="font-medium">24/7 Emergency Support</div>
                    <div className="text-sm text-gray-600">Available for urgent assistance</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => window.print()} className="flex items-center gap-2">
                <Download size={16} />
                Print Confirmation
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Safari Booking Confirmation",
                      text: `I just booked ${tour.title} with Safari Adventures!`,
                      url: window.location.href,
                    })
                  }
                }}
                className="flex items-center gap-2"
              >
                <Share2 size={16} />
                Share
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={() => router.push("/tours")} variant="outline" className="flex items-center gap-2">
                Browse More Tours
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
              >
                <Home size={16} />
                Back to Home
              </Button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Keep this confirmation for your records</li>
              <li>• Check your email (including spam folder) for updates</li>
              <li>• Ensure your passport is valid for at least 6 months</li>
              <li>• Consider travel insurance for your protection</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
