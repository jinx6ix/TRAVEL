"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { motion } from "framer-motion"

interface FAQItem {
  question: string
  answer: string
}

interface ContactPageClientProps {
  faqData: FAQItem[]
}

export default function ContactPageClient({ faqData }: ContactPageClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    tourType: "",
    travelDate: "",
    groupSize: "",
    budget: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Safari inquiry submitted:", formData)
    alert("Thank you for your safari inquiry! We'll get back to you within 24 hours to help plan your East African adventure.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header with semantic markup */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Contact JaeTravel Expeditions - East Africa Safari Experts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Get in touch to plan your perfect East African safari adventure with our expert guides
          </motion.p>
        </div>
      </header>

      {/* Contact Information & Form */}
      <section className="py-20" aria-labelledby="contact-heading">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 id="contact-heading" className="text-3xl font-bold mb-8">Contact Our Safari Experts</h2>
              <p className="text-gray-600 mb-8">
                Reach out to our team of East Africa safari specialists to start planning your unforgettable adventure. 
                We're here to answer all your questions about wildlife tours, gorilla trekking, and cultural experiences.
              </p>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="text-orange-600 mt-1" size={24} aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold mb-2">Phone & WhatsApp</h3>
                      <p className="text-gray-600">+254 726 485 228</p>
                      <p className="text-sm text-gray-500 mt-1">Available 24/7 for safari emergencies</p>
                      <Button
                        size="sm"
                        className="mt-2 bg-orange-600 hover:bg-orange-700"
                        onClick={() =>
                          window.open(
                            "https://wa.me/254726485228?text=Hello! I'm interested in your East Africa safari tours.",
                            "_blank",
                          )
                        }
                        aria-label="Contact us via WhatsApp"
                      >
                        WhatsApp Our Safari Team
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail className="text-orange-600 mt-1" size={24} aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold mb-2">Email Address</h3>
                      <p className="text-gray-600">Info@jaetravel.co.ke</p>
                      <p className="text-sm text-gray-500 mt-1">We respond to safari inquiries within 24 hours</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-green-600 mt-1" size={24} aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold mb-2">Safari Office Location</h3>
                      <p className="text-gray-600">JaeTravel Expeditions Ltd</p>
                      <p className="text-gray-600">Westlands, Nairobi</p>
                      <p className="text-gray-600">Kenya, East Africa</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="text-green-600 mt-1" size={24} aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold mb-2">Safari Planning Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM EAT</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM EAT</p>
                      <p className="text-gray-600">Sunday: Emergency safari calls only</p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Plan Your Safari Adventure</CardTitle>
                  <CardDescription>
                    Complete this form and our safari experts will help you create your perfect East African itinerary
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name *</label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+254 123 456 789"
                        />
                      </div>
                      <div>
                        <label htmlFor="travelDate" className="block text-sm font-medium mb-2">Preferred Travel Date</label>
                        <Input
                          id="travelDate"
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => handleInputChange("travelDate", e.target.value)}
                          aria-label="Select your preferred safari travel date"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="groupSize" className="block text-sm font-medium mb-2">Group Size</label>
                        <Select
                          value={formData.groupSize}
                          onValueChange={(value) => handleInputChange("groupSize", value)}
                        >
                          <SelectTrigger id="groupSize">
                            <SelectValue placeholder="Number of travelers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solo">Solo Traveler</SelectItem>
                            <SelectItem value="couple">Couple (2 people)</SelectItem>
                            <SelectItem value="family">Family (3-5 people)</SelectItem>
                            <SelectItem value="small-group">Small Group (6-10 people)</SelectItem>
                            <SelectItem value="large-group">Large Group (10+ people)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium mb-2">Budget Range</label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => handleInputChange("budget", value)}
                        >
                          <SelectTrigger id="budget">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economy">Economy ($1,000 - $2,000 pp)</SelectItem>
                            <SelectItem value="standard">Standard ($2,000 - $4,000 pp)</SelectItem>
                            <SelectItem value="premium">Premium ($4,000 - $7,000 pp)</SelectItem>
                            <SelectItem value="luxury">Luxury ($7,000+ pp)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="tourType" className="block text-sm font-medium mb-2">Safari Type</label>
                        <Select
                          value={formData.tourType}
                          onValueChange={(value) => handleInputChange("tourType", value)}
                        >
                          <SelectTrigger id="tourType">
                            <SelectValue placeholder="Select safari type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wildlife-safari">Wildlife Safari (Kenya/Tanzania)</SelectItem>
                            <SelectItem value="gorilla-trekking">Gorilla Trekking (Rwanda/Uganda)</SelectItem>
                            <SelectItem value="cultural-tour">Cultural Tour (Maasai Village)</SelectItem>
                            <SelectItem value="mountain-climbing">Mountain Climbing (Kilimanjaro)</SelectItem>
                            <SelectItem value="beach-safari">Beach & Safari Combo</SelectItem>
                            <SelectItem value="custom">Custom Safari Itinerary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">Inquiry Type</label>
                        <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="booking">Safari Booking</SelectItem>
                            <SelectItem value="vehicle-hire">Safari Vehicle Hire</SelectItem>
                            <SelectItem value="quote">Safari Quote Request</SelectItem>
                            <SelectItem value="information">General Safari Information</SelectItem>
                            <SelectItem value="support">Customer Support</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">Safari Details *</label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your dream safari: preferred destinations, duration, special interests (photography, birdwatching, etc.), and any specific requirements..."
                        aria-required="true"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                      <Send size={20} className="mr-2" aria-hidden="true" />
                      Send Safari Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50" aria-labelledby="location-heading">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="location-heading" className="text-3xl md:text-4xl font-bold mb-4">Visit Our Safari Office in Nairobi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our headquarters is conveniently located in Nairobi, the gateway to East Africa's premier safari destinations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8199!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2sWestlands%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JaeTravel Expeditions Safari Office Location in Nairobi, Kenya"
              className="w-full h-96"
              aria-label="Map showing JaeTravel Expeditions office location in Nairobi, Kenya"
            />
            <div className="bg-white p-4 border-t">
              <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                <div>
                  <h3 className="font-semibold text-lg">JaeTravel Expeditions Ltd</h3>
                  <p className="text-gray-600">Safari Experts in East Africa</p>
                  <p className="text-gray-600">Westlands, Nairobi, Kenya</p>
                </div>
                <Button
                  onClick={() => window.open("https://maps.google.com/?q=Westlands,Nairobi,Kenya", "_blank")}
                  className="bg-orange-600 hover:bg-orange-700"
                  aria-label="Get directions to our safari office"
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold mb-4">Safari Planning FAQs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Common questions about planning your East African safari adventure
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {faqData.map((faq, index) => (
              <Card key={index} className="p-6 h-full">
                <h3 className="font-semibold mb-3 text-orange-600">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}