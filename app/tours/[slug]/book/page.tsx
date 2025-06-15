"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Calendar,
  Users,
  MapPin,
  Star,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  Loader2,
} from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/useLanguage"

interface BookingFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  dateOfBirth: string

  // Travel Details
  travelDate: string
  adults: number
  children: number
  accommodationType: string

  // Additional Services
  airportTransfer: boolean
  travelInsurance: boolean
  hotAirBalloon: boolean
  extraNights: number

  // Special Requirements
  dietaryRequirements: string
  medicalConditions: string
  specialRequests: string

  // Emergency Contact
  emergencyName: string
  emergencyPhone: string
  emergencyRelation: string

  // Payment
  paymentMethod: string
}

const toursData = [
  {
    id: 1,
    slug: "masai-mara-safari-adventure",
    title: "Masai Mara JaeTravel Expedition",
    destination: "Kenya",
    duration: "5 days",
    price: 1200,
    category: "wildlife",
    rating: 4.9,
    reviewCount: 127,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    slug: "serengeti-wildlife-safari",
    title: "Serengeti Wildlife Safari",
    destination: "Tanzania",
    duration: "7 days",
    price: 1800,
    category: "wildlife",
    rating: 4.8,
    reviewCount: 89,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 12,
    slug: "gorilla-trekking-experience",
    title: "Gorilla Trekking Experience",
    destination: "Rwanda",
    duration: "3 days",
    price: 2500,
    category: "wildlife",
    rating: 5.0,
    reviewCount: 156,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const additionalServices = [
  { id: "airportTransfer", name: "Airport Transfer", price: 50, description: "Round-trip airport transfers" },
  { id: "travelInsurance", name: "Travel Insurance", price: 75, description: "Comprehensive travel coverage" },
  {
    id: "hotAirBalloon",
    name: "Hot Air Balloon Safari",
    price: 450,
    description: "Sunrise balloon flight (where available)",
  },
]

const accommodationTypes = [
  { id: "standard", name: "Standard", price: 0, description: "Comfortable mid-range accommodation" },
  { id: "luxury", name: "Luxury", price: 300, description: "Premium lodges and camps" },
  { id: "ultra-luxury", name: "Ultra Luxury", price: 600, description: "Exclusive high-end properties" },
]

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    dateOfBirth: "",
    travelDate: "",
    adults: 2,
    children: 0,
    accommodationType: "standard",
    airportTransfer: false,
    travelInsurance: false,
    hotAirBalloon: false,
    extraNights: 0,
    dietaryRequirements: "",
    medicalConditions: "",
    specialRequests: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    paymentMethod: "full",
  })

  const tour = toursData.find((t) => t.slug === params.slug)

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

  const updateFormData = (field: keyof BookingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateTotal = () => {
    let total = tour.price * formData.adults + tour.price * 0.7 * formData.children

    // Accommodation upgrade
    const accommodation = accommodationTypes.find((acc) => acc.id === formData.accommodationType)
    if (accommodation) {
      total += accommodation.price * (formData.adults + formData.children)
    }

    // Additional services
    if (formData.airportTransfer) total += 50
    if (formData.travelInsurance) total += 75 * (formData.adults + formData.children)
    if (formData.hotAirBalloon) total += 450 * (formData.adults + formData.children)

    // Extra nights
    total += formData.extraNights * 150 * (formData.adults + formData.children)

    return total
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate comprehensive booking message
    const bookingMessage = `🦁 SAFARI BOOKING REQUEST 🦁

📋 TOUR DETAILS:
• Tour: ${tour.title}
• Destination: ${tour.destination}
• Duration: ${tour.duration}
• Travel Date: ${formData.travelDate}
• Total Cost: $${calculateTotal()}

👤 TRAVELER DETAILS:
• Name: ${formData.firstName} ${formData.lastName}
• Email: ${formData.email}
• Phone: ${formData.phone}
• Nationality: ${formData.nationality}
• Date of Birth: ${formData.dateOfBirth}

👥 GROUP DETAILS:
• Adults: ${formData.adults}
• Children: ${formData.children}
• Total Travelers: ${formData.adults + formData.children}

🏨 ACCOMMODATION:
• Type: ${accommodationTypes.find((acc) => acc.id === formData.accommodationType)?.name}
${formData.extraNights > 0 ? `• Extra Nights: ${formData.extraNights}` : ""}

🎯 ADDITIONAL SERVICES:
${formData.airportTransfer ? "• Airport Transfer: Yes" : ""}
${formData.travelInsurance ? "• Travel Insurance: Yes" : ""}
${formData.hotAirBalloon ? "• Hot Air Balloon Safari: Yes" : ""}

🍽️ SPECIAL REQUIREMENTS:
${formData.dietaryRequirements ? `• Dietary: ${formData.dietaryRequirements}` : ""}
${formData.medicalConditions ? `• Medical: ${formData.medicalConditions}` : ""}
${formData.specialRequests ? `• Special Requests: ${formData.specialRequests}` : ""}

🚨 EMERGENCY CONTACT:
• Name: ${formData.emergencyName}
• Phone: ${formData.emergencyPhone}
• Relation: ${formData.emergencyRelation}

💳 PAYMENT METHOD: ${formData.paymentMethod === "full" ? "Full Payment" : "Deposit (30%)"}

Please confirm availability and send detailed booking confirmation. Thank you!`

    // Send to WhatsApp
    const whatsappUrl = `https://wa.me/254757662968?text=${encodeURIComponent(bookingMessage)}`
    window.open(whatsappUrl, "_blank")

    // Send email
    const emailSubject = `🦁 Safari Booking Request - ${tour.title}`
    const emailBody = bookingMessage.replace(/\n/g, "%0D%0A")
    const emailUrl = `mailto:Jaetravelexpeditions@gmail.com.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    window.open(emailUrl, "_blank")

    setIsSubmitting(false)

    // Redirect to confirmation page
    router.push(`/tours/${tour.slug}/book/confirmation`)
  }

  const steps = [
    { id: 1, title: "Personal Info", icon: Users },
    { id: 2, title: "Travel Details", icon: Calendar },
    { id: 3, title: "Add-ons", icon: Star },
    { id: 4, title: "Review & Pay", icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.push(`/tours/${tour.slug}`)} className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to Tour Details
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Book Your Safari</h1>
              <p className="text-gray-600">Complete your booking for {tour.title}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">${calculateTotal()}</div>
              <div className="text-sm text-gray-600">Total Cost</div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "bg-orange-600 border-orange-600 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle size={20} /> : <step.icon size={20} />}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div
                    className={`text-sm font-medium ${currentStep >= step.id ? "text-orange-600" : "text-gray-400"}`}
                  >
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-orange-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  Step {currentStep}: {steps.find((s) => s.id === currentStep)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Input
                          id="nationality"
                          value={formData.nationality}
                          onChange={(e) => updateFormData("nationality", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="emergencyName">Full Name *</Label>
                          <Input
                            id="emergencyName"
                            value={formData.emergencyName}
                            onChange={(e) => updateFormData("emergencyName", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyPhone">Phone Number *</Label>
                          <Input
                            id="emergencyPhone"
                            value={formData.emergencyPhone}
                            onChange={(e) => updateFormData("emergencyPhone", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyRelation">Relationship *</Label>
                          <Input
                            id="emergencyRelation"
                            value={formData.emergencyRelation}
                            onChange={(e) => updateFormData("emergencyRelation", e.target.value)}
                            placeholder="e.g., Spouse, Parent, Sibling"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Travel Details */}
                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="travelDate">Travel Date *</Label>
                        <Input
                          id="travelDate"
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => updateFormData("travelDate", e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="adults">Adults (18+) *</Label>
                        <Input
                          id="adults"
                          type="number"
                          min="1"
                          max="20"
                          value={formData.adults}
                          onChange={(e) => updateFormData("adults", Number.parseInt(e.target.value))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="children">Children (0-17)</Label>
                        <Input
                          id="children"
                          type="number"
                          min="0"
                          max="20"
                          value={formData.children}
                          onChange={(e) => updateFormData("children", Number.parseInt(e.target.value))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Accommodation Type</Label>
                      <RadioGroup
                        value={formData.accommodationType}
                        onValueChange={(value) => updateFormData("accommodationType", value)}
                        className="mt-2"
                      >
                        {accommodationTypes.map((accommodation) => (
                          <div key={accommodation.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value={accommodation.id} id={accommodation.id} />
                            <div className="flex-1">
                              <Label
                                htmlFor={accommodation.id}
                                className="flex items-center justify-between cursor-pointer"
                              >
                                <div>
                                  <div className="font-medium">{accommodation.name}</div>
                                  <div className="text-sm text-gray-600">{accommodation.description}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">
                                    {accommodation.price > 0 ? `+$${accommodation.price}` : "Included"}
                                  </div>
                                  <div className="text-xs text-gray-600">per person</div>
                                </div>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="extraNights">Extra Nights (before/after tour)</Label>
                      <Input
                        id="extraNights"
                        type="number"
                        min="0"
                        max="10"
                        value={formData.extraNights}
                        onChange={(e) => updateFormData("extraNights", Number.parseInt(e.target.value))}
                      />
                      <p className="text-sm text-gray-600 mt-1">$150 per person per night</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Special Requirements</h3>

                      <div>
                        <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                        <Textarea
                          id="dietaryRequirements"
                          value={formData.dietaryRequirements}
                          onChange={(e) => updateFormData("dietaryRequirements", e.target.value)}
                          placeholder="e.g., Vegetarian, Vegan, Allergies, etc."
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label htmlFor="medicalConditions">Medical Conditions</Label>
                        <Textarea
                          id="medicalConditions"
                          value={formData.medicalConditions}
                          onChange={(e) => updateFormData("medicalConditions", e.target.value)}
                          placeholder="Any medical conditions we should be aware of"
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label htmlFor="specialRequests">Special Requests</Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => updateFormData("specialRequests", e.target.value)}
                          placeholder="Any other special requests or preferences"
                          rows={3}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Add-ons */}
                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Additional Services</h3>
                      <div className="space-y-4">
                        {additionalServices.map((service) => (
                          <div key={service.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                            <Checkbox
                              id={service.id}
                              checked={formData[service.id as keyof BookingFormData] as boolean}
                              onCheckedChange={(checked) =>
                                updateFormData(service.id as keyof BookingFormData, checked)
                              }
                            />
                            <div className="flex-1">
                              <Label htmlFor={service.id} className="flex items-center justify-between cursor-pointer">
                                <div>
                                  <div className="font-medium">{service.name}</div>
                                  <div className="text-sm text-gray-600">{service.description}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">${service.price}</div>
                                  <div className="text-xs text-gray-600">
                                    {service.id === "travelInsurance" ? "per person" : "total"}
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="text-blue-600 mt-0.5" size={20} />
                        <div>
                          <h4 className="font-medium text-blue-900">Travel Insurance Recommended</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            We highly recommend travel insurance to protect your investment and provide coverage for
                            unexpected events, medical emergencies, and trip cancellations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review & Payment */}
                {currentStep === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Base Tour Price ({formData.adults} adults)</span>
                          <span>${tour.price * formData.adults}</span>
                        </div>
                        {formData.children > 0 && (
                          <div className="flex justify-between items-center">
                            <span>Children ({formData.children} × 70%)</span>
                            <span>${Math.round(tour.price * 0.7 * formData.children)}</span>
                          </div>
                        )}
                        {formData.accommodationType !== "standard" && (
                          <div className="flex justify-between items-center">
                            <span>Accommodation Upgrade</span>
                            <span>
                              +$
                              {accommodationTypes.find((acc) => acc.id === formData.accommodationType)?.price! *
                                (formData.adults + formData.children)}
                            </span>
                          </div>
                        )}
                        {formData.airportTransfer && (
                          <div className="flex justify-between items-center">
                            <span>Airport Transfer</span>
                            <span>+$50</span>
                          </div>
                        )}
                        {formData.travelInsurance && (
                          <div className="flex justify-between items-center">
                            <span>Travel Insurance</span>
                            <span>+${75 * (formData.adults + formData.children)}</span>
                          </div>
                        )}
                        {formData.hotAirBalloon && (
                          <div className="flex justify-between items-center">
                            <span>Hot Air Balloon Safari</span>
                            <span>+${450 * (formData.adults + formData.children)}</span>
                          </div>
                        )}
                        {formData.extraNights > 0 && (
                          <div className="flex justify-between items-center">
                            <span>Extra Nights ({formData.extraNights})</span>
                            <span>+${150 * formData.extraNights * (formData.adults + formData.children)}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Total</span>
                          <span className="text-orange-600">${calculateTotal()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Payment Method</Label>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => updateFormData("paymentMethod", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="full" id="full" />
                          <Label htmlFor="full" className="flex-1 cursor-pointer">
                            <div className="font-medium">Full Payment</div>
                            <div className="text-sm text-gray-600">Pay the full amount now</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="deposit" id="deposit" />
                          <Label htmlFor="deposit" className="flex-1 cursor-pointer">
                            <div className="font-medium">Deposit (30%)</div>
                            <div className="text-sm text-gray-600">
                              Pay ${Math.round(calculateTotal() * 0.3)} now, balance due 30 days before travel
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Shield className="text-green-600 mt-0.5" size={20} />
                        <div>
                          <h4 className="font-medium text-green-900">Secure Booking Process</h4>
                          <p className="text-sm text-green-700 mt-1">
                            Your booking request will be sent directly to our team via WhatsApp and email. We'll confirm
                            availability and send you secure payment instructions within 24 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          Submitting Booking...
                        </div>
                      ) : (
                        "Submit Booking Request"
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Tour Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Tour Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{tour.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MapPin size={14} />
                        <span>{tour.destination}</span>
                        <span>•</span>
                        <Calendar size={14} />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {tour.rating} ({tour.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Price Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Base Price ({formData.adults} adults)</span>
                      <span>${tour.price * formData.adults}</span>
                    </div>
                    {formData.children > 0 && (
                      <div className="flex justify-between">
                        <span>Children ({formData.children})</span>
                        <span>${Math.round(tour.price * 0.7 * formData.children)}</span>
                      </div>
                    )}
                    {formData.accommodationType !== "standard" && (
                      <div className="flex justify-between">
                        <span>Accommodation Upgrade</span>
                        <span>
                          +$
                          {accommodationTypes.find((acc) => acc.id === formData.accommodationType)?.price! *
                            (formData.adults + formData.children)}
                        </span>
                      </div>
                    )}
                    {formData.airportTransfer && (
                      <div className="flex justify-between">
                        <span>Airport Transfer</span>
                        <span>+$50</span>
                      </div>
                    )}
                    {formData.travelInsurance && (
                      <div className="flex justify-between">
                        <span>Travel Insurance</span>
                        <span>+${75 * (formData.adults + formData.children)}</span>
                      </div>
                    )}
                    {formData.hotAirBalloon && (
                      <div className="flex justify-between">
                        <span>Hot Air Balloon</span>
                        <span>+${450 * (formData.adults + formData.children)}</span>
                      </div>
                    )}
                    {formData.extraNights > 0 && (
                      <div className="flex justify-between">
                        <span>Extra Nights ({formData.extraNights})</span>
                        <span>+${150 * formData.extraNights * (formData.adults + formData.children)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-orange-600">${calculateTotal()}</span>
                    </div>
                    {formData.paymentMethod === "deposit" && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Due Now (30%)</span>
                        <span>${Math.round(calculateTotal() * 0.3)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-600">Our travel experts are here to help with your booking.</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        <span>+254 726 485 228</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        <span>Jaetravelexpeditions@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-gray-400" />
                        <span>Available 24/7</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
