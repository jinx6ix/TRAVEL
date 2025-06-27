"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, MapPin, Phone, Mail, MessageCircle, Download, Share2, Home } from "lucide-react"
import { motion } from "framer-motion"

const toursData = [
  // Kenya Tours
{
  id: 1,
  slug: "masai-mara-safari-adventure",
  title: "Masai Mara JaeTravel Expeditions",
  destination: "Kenya",
  duration: "5 days",
  price: 1200,
  category: "wildlife",
},
{
  id: 2,
  slug: "amboseli-elephant-safari",
  title: "Amboseli Elephant Safari",
  destination: "Kenya",
  duration: "4 days",
  price: 980,
  category: "wildlife",
},
{
  id: 3,
  slug: "samburu-game-reserve",
  title: "Samburu Game Reserve",
  destination: "Kenya",
  duration: "3 days",
  price: 750,
  category: "wildlife",
},
{
  id: 4,
  slug: "lake-nakuru-flamingo-spectacle",
  title: "Lake Nakuru Flamingo Tour",
  destination: "Kenya",
  duration: "2 days",
  price: 450,
  category: "photography",
},
{
  id: 5,
  slug: "tsavo-east-west-adventure",
  title: "Tsavo East & West Safari",
  destination: "Kenya",
  duration: "6 days",
  price: 1350,
  category: "wildlife",
},
{
  id: 6,
  slug: "mombasa-coastal-safari",
  title: "Mombasa Beach & Safari",
  destination: "Kenya",
  duration: "7 days",
  price: 1600,
  category: "adventure",
},
{
  id: 7,
  slug: "mount-kenya-climbing-Expeditions",
  title: "Mount Kenya Climbing",
  destination: "Kenya",
  duration: "5 days",
  price: 1100,
  category: "adventure",
},
{
  id: 8,
  slug: "laikipia-conservancy",
  title: "Laikipia Conservancy",
  destination: "Kenya",
  duration: "4 days",
  price: 1250,
  category: "conservation",
},
{
  id: 9,
  slug: "hell-gate-lake-naivasha-adventure",
  title: "Hell's Gate Adventure",
  destination: "Kenya",
  duration: "2 days",
  price: 380,
  category: "adventure",
},
{
  id: 10,
  slug: "maasai-cultural-experience",
  title: "Maasai Cultural Experience",
  destination: "Kenya",
  duration: "3 days",
  price: 650,
  category: "culture",
},
{
  id: 11,
  slug: "aberdare-national-park-safari",
  title: "Aberdare National Park",
  destination: "Kenya",
  duration: "3 days",
  price: 720,
  category: "wildlife",
},
{
  id: 12,
  slug: "diani-beach-safari-combo",
  title: "Diani Beach Safari Combo",
  destination: "Kenya",
  duration: "8 days",
  price: 1800,
  category: "adventure",
},

// Tanzania Tours
{
  id: 13,
  slug: "serengeti-wildlife-safari",
  title: "Serengeti Wildlife Safari",
  destination: "Tanzania",
  duration: "7 days",
  price: 1800,
  category: "wildlife",
},
{
  id: 14,
  slug: "ngorongoro-crater-safari",
  title: "Ngorongoro Crater Tour",
  destination: "Tanzania",
  duration: "3 days",
  price: 950,
  category: "wildlife",
},
{
  id: 15,
  slug: "kilimanjaro-climbing-Expeditions",
  title: "Kilimanjaro Climbing",
  destination: "Tanzania",
  duration: "8 days",
  price: 2200,
  category: "adventure",
},
{
  id: 16,
  slug: "tarangire-national-park-safari",
  title: "Tarangire Elephant Safari",
  destination: "Tanzania",
  duration: "4 days",
  price: 1100,
  category: "wildlife",
},
{
  id: 17,
  slug: "lake-manyara-national-park-safari",
  title: "Lake Manyara Tree Climbing Lions",
  destination: "Tanzania",
  duration: "2 days",
  price: 580,
  category: "wildlife",
},
{
  id: 18,
  slug: "zanzibar-beach-holiday",
  title: "Zanzibar Spice Island",
  destination: "Tanzania",
  duration: "5 days",
  price: 1300,
  category: "culture",
},
{
  id: 19,
  slug: "ruaha-national-park-safari",
  title: "Ruaha National Park",
  destination: "Tanzania",
  duration: "6 days",
  price: 1450,
  category: "wildlife",
},
{
  id: 20,
  slug: "selous-game-reserve-safari",
  title: "Selous Game Reserve",
  destination: "Tanzania",
  duration: "5 days",
  price: 1350,
  category: "wildlife",
},
{
  id: 21,
  slug: "mikumi-national-park",
  title: "Mikumi National Park",
  destination: "Tanzania",
  duration: "3 days",
  price: 750,
  category: "wildlife",
},
{
  id: 22,
  slug: "arusha-cultural-tour",
  title: "Arusha Cultural Tour",
  destination: "Tanzania",
  duration: "2 days",
  price: 420,
  category: "culture",
},
{
  id: 23,
  slug: "katavi-national-park-safari",
  title: "Katavi National Park",
  destination: "Tanzania",
  duration: "4 days",
  price: 1600,
  category: "wildlife",
},
{
  id: 24,
  slug: "mahale-mountains-national-park-chimpanzee-trekking",
  title: "Mahale Chimpanzee Trek",
  destination: "Tanzania",
  duration: "6 days",
  price: 2100,
  category: "wildlife",
},
{
  id: 25,
  slug: "pemba-island-diving",
  title: "Pemba Island Diving",
  destination: "Tanzania",
  duration: "4 days",
  price: 980,
  category: "adventure",
},
{
  id: 26,
  slug: "stone-town-heritage-tour",
  title: "Stone Town Heritage Tour",
  destination: "Tanzania",
  duration: "2 days",
  price: 350,
  category: "culture",
},
{
  id: 27,
  slug: "northern-circuit-safari",
  title: "Northern Circuit Safari",
  destination: "Tanzania",
  duration: "10 days",
  price: 2800,
  category: "wildlife",
},

// Rwanda Tours
{
  id: 28,
  slug: "gorilla-trekking-experience",
  title: "Gorilla Trekking Experience",
  destination: "Rwanda",
  duration: "3 days",
  price: 2500,
  category: "wildlife",
},
{
  id: 29,
  slug: "nyungwe-forest-canopy-walk",
  title: "Nyungwe Forest Canopy Walk",
  destination: "Rwanda",
  duration: "2 days",
  price: 450,
  category: "adventure",
},
{
  id: 30,
  slug: "lake-kivu-relaxation",
  title: "Lake Kivu Relaxation",
  destination: "Rwanda",
  duration: "3 days",
  price: 380,
  category: "adventure",
},
{
  id: 31,
  slug: "akagera-national-park-safari",
  title: "Akagera National Park",
  destination: "Rwanda",
  duration: "2 days",
  price: 520,
  category: "wildlife",
},
{
  id: 32,
  slug: "kigali-city-tour",
  title: "Kigali City Tour",
  destination: "Rwanda",
  duration: "1 day",
  price: 150,
  category: "culture",
},
{
  id: 33,
  slug: "golden-monkey-tracking",
  title: "Golden Monkey Tracking",
  destination: "Rwanda",
  duration: "2 days",
  price: 680,
  category: "wildlife",
},

// Uganda Tours
{
  id: 34,
  slug: "bwindi-gorilla-trekking",
  title: "Bwindi Gorilla Trekking",
  destination: "Uganda",
  duration: "4 days",
  price: 2200,
  category: "wildlife",
},
{
  id: 35,
  slug: "queen-elizabeth-national-park-safari",
  title: "Queen Elizabeth Safari",
  destination: "Uganda",
  duration: "5 days",
  price: 1150,
  category: "wildlife",
},
{
  id: 36,
  slug: "murchison-falls-national-park-safari",
  title: "Murchison Falls Adventure",
  destination: "Uganda",
  duration: "4 days",
  price: 980,
  category: "adventure",
},
{
  id: 37,
  slug: "kibale-national-park-chimpanzee-trekking",
  title: "Kibale Chimpanzee Tracking",
  destination: "Uganda",
  duration: "3 days",
  price: 750,
  category: "wildlife",
},
{
  id: 38,
  slug: "lake-mburo-national-park-safari",
  title: "Lake Mburo National Park",
  destination: "Uganda",
  duration: "2 days",
  price: 420,
  category: "wildlife",
},
{
  id: 39,
  slug: "rwenzori-mountains-hiking",
  title: "Rwenzori Mountains Hiking",
  destination: "Uganda",
  duration: "7 days",
  price: 1800,
  category: "adventure",
},
{
  id: 40,
  slug: "jinja-adventure-tour",
  title: "Jinja White Water Rafting",
  destination: "Uganda",
  duration: "2 days",
  price: 350,
  category: "adventure",
},
{
  id: 41,
  slug: "lake-bunyonyi-relaxation-tour",
  title: "Lake Bunyonyi Relaxation",
  destination: "Uganda",
  duration: "3 days",
  price: 450,
  category: "relaxation",
},
{
  id: 42,
  slug: "ssese-islands-beach-holiday",
  title: "Ssese Islands Beach Holiday",
  destination: "Uganda",
  duration: "4 days",
  price: 650,
  category: "beach",
},
{
  id: 43,
  slug: "lake-naivasha-boat-safari",
  title: "Lake Naivasha Boat Safari",
  destination: "Kenya",
  duration: "1 day",
  price: 150,
  category: "wildlife",
}
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
              Thank you for choosing JaeTravel Expeditions. Your booking request has been sent successfully.
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
                      <div className="text-sm text-gray-600">+254 726 485 228</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Mail className="text-blue-600" size={20} />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-600">JaetravelExpeditionss@gmail.com</div>
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
                      text: `I just booked ${tour.title} with JaeTravel Expeditions!`,
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
