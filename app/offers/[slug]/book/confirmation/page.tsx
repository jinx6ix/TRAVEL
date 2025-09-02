"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, MapPin, Phone, Mail, MessageCircle, Download, Share2, Home } from "lucide-react"
import { motion } from "framer-motion"

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


export default function BookingConfirmationPage() {
  const params = useParams<{ slug?: string }>()
  const router = useRouter()

  const slug = params?.slug
  const offer = safariOffers.find((o) => o.slug === slug)
  const bookingReference = `SAF${Date.now().toString().slice(-6)}`

  if (!slug || !offer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Offer Not Found</h1>
          <Button onClick={() => router.push("/offers")}>
            Back to Offers
          </Button>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Special Offer Booking Request Submitted!</h1>
            <p className="text-gray-600">
              Thank you for choosing JaeTravel Expeditions. Your special offer booking request has been sent successfully.
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
                  <span className="font-medium">Special Offer:</span>
                  <span>{offer.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Destination:</span>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{offer.destination}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Duration:</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{offer.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Original Price:</span>
                  <span className="line-through">${offer.originalPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Discounted Price:</span>
                  <span className="text-orange-600 font-bold">${offer.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Your Savings:</span>
                  <span className="text-green-600 font-bold">${offer.originalPrice - offer.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending Confirmation</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Offer Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Special Offer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-orange-100 text-orange-800">{offer.badge}</Badge>
                  <div>
                    <h4 className="font-medium">{offer.offer}</h4>
                    <p className="text-sm text-gray-600">{offer.availability}</p>
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-1">Highlights:</h4>
                  <ul className="list-disc list-inside text-sm text-orange-700 space-y-1">
                    {offer.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
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
                    <h4 className="font-medium">Priority Confirmation</h4>
                    <p className="text-sm text-gray-600">
                      Our team will prioritize your special offer request and confirm availability within 12 hours.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Secure Your Discount</h4>
                    <p className="text-sm text-gray-600">
                      We'll send payment instructions to lock in your special offer price before it expires.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Exclusive Itinerary</h4>
                    <p className="text-sm text-gray-600">
                      Receive a detailed itinerary with all the premium inclusions from your special offer.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium">VIP Support</h4>
                    <p className="text-sm text-gray-600">
                      Enjoy dedicated support to help prepare for your premium safari experience.
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
                <p className="text-gray-600 mb-4">Have questions about your special offer? Our team is here to help!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <MessageCircle className="text-green-600" size={20} />
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm text-gray-600">+254 726 485 228</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Mail className="text-blue-600" size={20} />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-600">Info@jaetravel.co.ke</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Phone className="text-orange-600" size={20} />
                  <div>
                    <div className="font-medium">VIP Support Line</div>
                    <div className="text-sm text-gray-600">Priority assistance for special offer bookings</div>
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
                      title: "Special Safari Offer Booking",
                      text: `I just booked ${offer.title} with ${offer.offer} - saved $${offer.originalPrice - offer.price}!`,
                      url: window.location.href,
                    })
                  }
                }}
                className="flex items-center gap-2"
              >
                <Share2 size={16} />
                Share This Deal
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={() => router.push("/offers")} variant="outline" className="flex items-center gap-2">
                View More Offers
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
            <h4 className="font-medium text-blue-900 mb-2">Important Notes About Your Special Offer:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• This offer is subject to availability and must be confirmed by our team</li>
              <li>• Check your email (including spam folder) for priority confirmation</li>
              <li>• Payment must be completed within 48 hours to secure the discounted rate</li>
              <li>• Some offers may have specific terms and conditions</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}