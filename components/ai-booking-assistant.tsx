"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User, Calendar, MapPin, Star, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/useLanguage"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  tours?: Tour[]
  showBookingForm?: boolean
  isTyping?: boolean
}

interface Tour {
  id: number
  title: string
  destination: string
  duration: string
  price: number
  category: string
  rating: number
  wildlife?: string[]
  description?: string
}

const availableTours: Tour[] = [
  // Kenya Tours
  {
    id: 1,
    title: "Masai Mara JaeTravel Expeditions",
    destination: "Kenya",
    duration: "5 days",
    price: 1200,
    category: "wildlife",
    rating: 4.9,
    wildlife: ["Big Five", "Great Migration", "Lions", "Elephants"],
    description: "Experience the great migration and witness the Big Five.",
  },
  {
    id: 2,
    title: "Amboseli Elephant Safari",
    destination: "Kenya",
    duration: "4 days",
    price: 980,
    category: "wildlife",
    rating: 4.7,
    wildlife: ["Elephants", "Kilimanjaro Views"],
    description: "Get close to elephants with Mount Kilimanjaro backdrop.",
  },
  {
    id: 3,
    title: "Lake Nakuru Flamingo Tour",
    destination: "Kenya",
    duration: "2 days",
    price: 450,
    category: "photography",
    rating: 4.5,
    wildlife: ["Flamingos", "Birds"],
    description: "Witness thousands of flamingos in their natural habitat.",
  },
  {
    id: 4,
    title: "Mount Kenya Climbing",
    destination: "Kenya",
    duration: "5 days",
    price: 1100,
    category: "adventure",
    rating: 4.4,
    description: "Challenge yourself with Africa's second highest peak.",
  },
  {
    id: 5,
    title: "Laikipia Conservancy",
    destination: "Kenya",
    duration: "4 days",
    price: 1250,
    category: "conservation",
    rating: 4.8,
    wildlife: ["Rhinos", "Elephants"],
    description: "Experience conservation in action.",
  },
  {
    id: 6,
    title: "Maasai Cultural Experience",
    destination: "Kenya",
    duration: "3 days",
    price: 650,
    category: "culture",
    rating: 4.6,
    description: "Immerse yourself in Maasai culture.",
  },

  // Tanzania Tours
  {
    id: 7,
    title: "Serengeti Wildlife Safari",
    destination: "Tanzania",
    duration: "7 days",
    price: 1800,
    category: "wildlife",
    rating: 4.8,
    wildlife: ["Big Five", "Wildebeest Migration"],
    description: "Explore the endless plains of Serengeti.",
  },
  {
    id: 8,
    title: "Ngorongoro Crater Tour",
    destination: "Tanzania",
    duration: "3 days",
    price: 950,
    category: "wildlife",
    rating: 4.9,
    wildlife: ["Various Wildlife"],
    description: "Visit the world's largest intact caldera.",
  },
  {
    id: 9,
    title: "Kilimanjaro Climbing",
    destination: "Tanzania",
    duration: "8 days",
    price: 2200,
    category: "adventure",
    rating: 4.7,
    description: "Conquer Africa's highest peak.",
  },
  {
    id: 10,
    title: "Zanzibar Spice Island",
    destination: "Tanzania",
    duration: "5 days",
    price: 1300,
    category: "culture",
    rating: 4.8,
    description: "Explore the spice island paradise.",
  },
  {
    id: 11,
    title: "Mahale Chimpanzee Trek",
    destination: "Tanzania",
    duration: "6 days",
    price: 2100,
    category: "wildlife",
    rating: 4.9,
    wildlife: ["Chimpanzees"],
    description: "Trek with wild chimpanzees.",
  },

  // Rwanda Tours
  {
    id: 12,
    title: "Gorilla Trekking Experience",
    destination: "Rwanda",
    duration: "3 days",
    price: 2500,
    category: "wildlife",
    rating: 5.0,
    wildlife: ["Mountain Gorillas"],
    description: "Get up close with mountain gorillas.",
  },
  {
    id: 13,
    title: "Nyungwe Forest Canopy Walk",
    destination: "Rwanda",
    duration: "2 days",
    price: 450,
    category: "adventure",
    rating: 4.6,
    wildlife: ["Birds", "Primates"],
    description: "Walk among the treetops.",
  },
  {
    id: 14,
    title: "Golden Monkey Tracking",
    destination: "Rwanda",
    duration: "2 days",
    price: 680,
    category: "wildlife",
    rating: 4.7,
    wildlife: ["Golden Monkeys"],
    description: "Track rare golden monkeys.",
  },
  {
    id: 15,
    title: "Cultural Village Experience",
    destination: "Rwanda",
    duration: "2 days",
    price: 320,
    category: "culture",
    rating: 4.5,
    description: "Experience traditional Rwandan culture.",
  },

  // Uganda Tours
  {
    id: 16,
    title: "Bwindi Gorilla Trekking",
    destination: "Uganda",
    duration: "4 days",
    price: 2200,
    category: "wildlife",
    rating: 4.9,
    wildlife: ["Mountain Gorillas"],
    description: "Trek mountain gorillas in Bwindi.",
  },
  {
    id: 17,
    title: "Queen Elizabeth Safari",
    destination: "Uganda",
    duration: "5 days",
    price: 1150,
    category: "wildlife",
    rating: 4.6,
    wildlife: ["Tree Lions", "Elephants"],
    description: "Diverse wildlife in scenic landscapes.",
  },
  {
    id: 18,
    title: "Murchison Falls Adventure",
    destination: "Uganda",
    duration: "4 days",
    price: 980,
    category: "adventure",
    rating: 4.7,
    wildlife: ["Hippos", "Crocodiles"],
    description: "Witness the powerful Murchison Falls.",
  },
  {
    id: 19,
    title: "Kibale Chimpanzee Tracking",
    destination: "Uganda",
    duration: "3 days",
    price: 750,
    category: "wildlife",
    rating: 4.5,
    wildlife: ["Chimpanzees"],
    description: "Track our closest relatives.",
  },
  {
    id: 20,
    title: "Rwenzori Mountains Hiking",
    destination: "Uganda",
    duration: "7 days",
    price: 1800,
    category: "adventure",
    rating: 4.8,
    description: "Hike the Mountains of the Moon.",
  },
]

export function AIBookingAssistant() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t("aiWelcome"),
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  // Memoized AI response function for better performance
  const getAIResponse = useCallback(
    (userInput: string): { text: string; tours?: Tour[]; showBookingForm?: boolean } => {
      const input = userInput.toLowerCase()

      // Greeting responses
      if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
        return {
          text: "Hello! Welcome to JaeTravel Expeditions! I'm here to help you find the perfect East African safari experience. What type of adventure are you looking for today?",
          tours: availableTours.slice(0, 3),
        }
      }

      // Help and general questions
      if (input.includes("help") || input.includes("what can you do")) {
        return {
          text: "I can help you with:\n• Finding tours based on your interests (wildlife, adventure, photography, culture, conservation)\n• Recommending tours by destination (Kenya, Tanzania, Rwanda, Uganda)\n• Suggesting tours within your budget\n• Booking your selected tour\n• Answering questions about our services\n\nWhat would you like to explore?",
          tours: availableTours.slice(0, 4),
        }
      }

      // Tour recommendations based on interests
      if (
        input.includes("wildlife") ||
        input.includes("animals") ||
        input.includes("safari") ||
        input.includes("big five")
      ) {
        const wildlifeTours = availableTours.filter((tour) => tour.category === "wildlife")
        return {
          text: "🦁 Excellent choice! Here are our best wildlife safari tours. These offer incredible opportunities to see the Big Five, great migration, and diverse African wildlife:",
          tours: wildlifeTours,
        }
      }

      if (
        input.includes("adventure") ||
        input.includes("climbing") ||
        input.includes("hiking") ||
        input.includes("mountain")
      ) {
        const adventureTours = availableTours.filter((tour) => tour.category === "adventure")
        return {
          text: "🏔️ Perfect for adventure seekers! Here are our most thrilling adventure tours including mountain climbing and exciting activities:",
          tours: adventureTours,
        }
      }

      if (
        input.includes("photography") ||
        input.includes("photo") ||
        input.includes("camera") ||
        input.includes("pictures")
      ) {
        const photoTours = availableTours.filter((tour) => tour.category === "photography")
        return {
          text: "📸 Excellent! Our photography tours are designed with special vehicles and expert guides to help you capture stunning wildlife photos:",
          tours: photoTours,
        }
      }

      if (
        input.includes("culture") ||
        input.includes("local") ||
        input.includes("traditional") ||
        input.includes("village")
      ) {
        const cultureTours = availableTours.filter((tour) => tour.category === "culture")
        return {
          text: "🏛️ Wonderful! Experience authentic local cultures and traditions with these immersive cultural tours:",
          tours: cultureTours,
        }
      }

      if (
        input.includes("conservation") ||
        input.includes("environment") ||
        input.includes("protect") ||
        input.includes("sustainable")
      ) {
        const conservationTours = availableTours.filter((tour) => tour.category === "conservation")
        return {
          text: "🌱 Great to see your interest in conservation! These tours support local conservation efforts and sustainable tourism:",
          tours: conservationTours,
        }
      }

      // Budget-based recommendations
      if (
        input.includes("budget") ||
        input.includes("cheap") ||
        input.includes("affordable") ||
        input.includes("low cost")
      ) {
        const budgetTours = availableTours.filter((tour) => tour.price < 800)
        return {
          text: "💰 Here are our most budget-friendly tours (under $800) that still offer amazing experiences:",
          tours: budgetTours,
        }
      }

      if (
        input.includes("luxury") ||
        input.includes("premium") ||
        input.includes("high-end") ||
        input.includes("expensive")
      ) {
        const luxuryTours = availableTours.filter((tour) => tour.price > 1500)
        return {
          text: "✨ For a luxury experience, here are our premium tours ($1500+) with top-tier accommodations and services:",
          tours: luxuryTours,
        }
      }

      // Destination-based recommendations
      if (input.includes("kenya")) {
        const kenyaTours = availableTours.filter((tour) => tour.destination === "Kenya")
        return {
          text: "🇰🇪 Kenya offers incredible safari experiences! Home to the famous Masai Mara and diverse wildlife. Here are our top Kenya tours:",
          tours: kenyaTours,
        }
      }

      if (input.includes("tanzania")) {
        const tanzaniaTours = availableTours.filter((tour) => tour.destination === "Tanzania")
        return {
          text: "🇹🇿 Tanzania is home to Serengeti, Ngorongoro Crater, and Mount Kilimanjaro! Check out these amazing tours:",
          tours: tanzaniaTours,
        }
      }

      if (input.includes("rwanda")) {
        const rwandaTours = availableTours.filter((tour) => tour.destination === "Rwanda")
        return {
          text: "🇷🇼 Rwanda offers unique gorilla trekking experiences in the land of a thousand hills! Here are our Rwanda tours:",
          tours: rwandaTours,
        }
      }

      if (input.includes("uganda")) {
        const ugandaTours = availableTours.filter((tour) => tour.destination === "Uganda")
        return {
          text: "🇺🇬 Uganda, the Pearl of Africa, offers incredible biodiversity and primate experiences! Here are our Uganda tours:",
          tours: ugandaTours,
        }
      }

      // Specific wildlife interests
      if (input.includes("gorilla") || input.includes("gorillas")) {
        const gorillaTours = availableTours.filter((tour) =>
          tour.wildlife?.some((animal) => animal.toLowerCase().includes("gorilla")),
        )
        return {
          text: "🦍 Gorilla trekking is an unforgettable experience! Here are our gorilla trekking tours in Rwanda and Uganda:",
          tours: gorillaTours,
        }
      }

      if (input.includes("elephant") || input.includes("elephants")) {
        const elephantTours = availableTours.filter((tour) =>
          tour.wildlife?.some((animal) => animal.toLowerCase().includes("elephant")),
        )
        return {
          text: "🐘 Elephants are magnificent creatures! Here are tours where you can see large herds of elephants:",
          tours: elephantTours,
        }
      }

      if (input.includes("chimpanzee") || input.includes("chimps")) {
        const chimpTours = availableTours.filter((tour) =>
          tour.wildlife?.some((animal) => animal.toLowerCase().includes("chimpanzee")),
        )
        return {
          text: "🐵 Chimpanzee tracking is amazing! Here are our chimpanzee trekking experiences:",
          tours: chimpTours,
        }
      }

      // Price inquiries
      if (input.includes("price") || input.includes("cost") || input.includes("how much")) {
        return {
          text: "💵 Our tour prices range from $320 to $2,500 depending on destination, duration, and luxury level:\n\n• Budget tours: $320-$800\n• Mid-range tours: $800-$1,500\n• Luxury tours: $1,500+\n\nPrices include accommodation, meals, park fees, professional guide, and transportation. Would you like to see tours in a specific price range?",
          tours: [
            availableTours.find((t) => t.price < 500)!,
            availableTours.find((t) => t.price > 500 && t.price < 1500)!,
            availableTours.find((t) => t.price > 1500)!,
          ].filter(Boolean),
        }
      }

      // Booking intent
      if (
        input.includes("book") ||
        input.includes("reserve") ||
        input.includes("interested") ||
        input.includes("want to go")
      ) {
        return {
          text: "🎯 Excellent! I'd be happy to help you book a tour. Let me show you our booking form, or you can select from our recommended tours below. Which tour interests you most?",
          tours: availableTours.slice(0, 6),
          showBookingForm: true,
        }
      }

      // Duration-based queries
      if (
        input.includes("short") ||
        input.includes("weekend") ||
        input.includes("2 days") ||
        input.includes("3 days")
      ) {
        const shortTours = availableTours.filter((tour) => Number.parseInt(tour.duration) <= 3)
        return {
          text: "⏰ Perfect for a short getaway! Here are our tours that are 3 days or less:",
          tours: shortTours,
        }
      }

      if (input.includes("long") || input.includes("week") || input.includes("7 days") || input.includes("extended")) {
        const longTours = availableTours.filter((tour) => Number.parseInt(tour.duration) >= 7)
        return {
          text: "📅 For an extended adventure! Here are our longer tours (7+ days) for a comprehensive experience:",
          tours: longTours,
        }
      }

      // Contact and support
      if (
        input.includes("contact") ||
        input.includes("phone") ||
        input.includes("email") ||
        input.includes("support")
      ) {
        return {
          text: "📞 You can reach us through:\n\n• WhatsApp: +254 726 485 228\n• Email: Info@jaetravel.co.ke\n• Or use our booking form to send your inquiry directly!\n\nWe're available 24/7 for emergencies and respond to all inquiries within 24 hours.",
        }
      }

      // Default response with comprehensive tour suggestions
      return {
        text: "�� I'd be happy to help you find the perfect safari experience! Here are some of our most popular tours across different categories. You can also tell me about:\n\n• Your interests (wildlife, adventure, photography, culture, conservation)\n• Preferred destination (Kenya, Tanzania, Rwanda, Uganda)\n• Budget range\n• Specific animals you'd like to see\n• Trip duration\n\nWhat sounds most interesting to you?",
        tours: [
          availableTours.find((t) => t.category === "wildlife" && t.rating >= 4.8)!,
          availableTours.find((t) => t.category === "adventure" && t.rating >= 4.7)!,
          availableTours.find((t) => t.category === "culture")!,
          availableTours.find((t) => t.category === "conservation")!,
        ].filter(Boolean),
      }
    },
    [],
  )

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const botResponse = getAIResponse(inputValue)
        const botMessage: Message = {
          id: messages.length + 2,
          text: botResponse.text,
          isBot: true,
          timestamp: new Date(),
          tours: botResponse.tours,
          showBookingForm: botResponse.showBookingForm,
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }, [inputValue, messages.length, getAIResponse])

  const handleTourSelect = useCallback(
    (tour: Tour) => {
      setSelectedTour(tour)
      const message: Message = {
        id: messages.length + 1,
        text: `🎯 Great choice! You've selected "${tour.title}" (${tour.destination}, ${tour.duration}, $${tour.price}). This ${tour.category} tour has a ${tour.rating}/5 rating. Would you like to proceed with booking this tour?`,
        isBot: true,
        timestamp: new Date(),
        showBookingForm: true,
      }
      setMessages((prev) => [...prev, message])
    },
    [messages.length],
  )

  const handleBookingSubmit = useCallback(
    (bookingData: any) => {
      // Generate comprehensive WhatsApp message
      const whatsappMessage = `🦁 SAFARI BOOKING REQUEST 🦁

📋 TOUR DETAILS:
• Tour: ${selectedTour?.title || "Custom Tour"}
• Destination: ${selectedTour?.destination || "East Africa"}
• Duration: ${selectedTour?.duration || "TBD"}
• Price: $${selectedTour?.price || "TBD"}
• Category: ${selectedTour?.category || "TBD"}
${selectedTour?.wildlife ? `• Wildlife: ${selectedTour.wildlife.join(", ")}` : ""}

👤 CUSTOMER DETAILS:
• Name: ${bookingData.fullName}
• Email: ${bookingData.email}
• Phone: ${bookingData.phone}
• Nationality: ${bookingData.nationality}

📅 TRAVEL DETAILS:
• Travel Date: ${bookingData.travelDate}
• Adults: ${bookingData.adults}
• Children: ${bookingData.children}
• Total Travelers: ${Number.parseInt(bookingData.adults) + Number.parseInt(bookingData.children)}

💬 SPECIAL REQUESTS:
${bookingData.specialRequests || "None"}

Please confirm availability and send detailed itinerary. Thank you!`

      // Send to WhatsApp
      const whatsappUrl = `https://wa.me/254726485228?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappUrl, "_blank")

      // Send email
      const emailSubject = `🦁 Safari Booking Request - ${selectedTour?.title || "Custom Tour"}`
      const emailBody = whatsappMessage.replace(/\n/g, "%0D%0A")
      const emailUrl = `mailto:Info@jaetravel.co.ke?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
      window.open(emailUrl, "_blank")

      // Add confirmation message
      const confirmationMessage: Message = {
        id: messages.length + 1,
        text: "✅ Perfect! Your booking request has been sent via WhatsApp and email. We'll get back to you within 24 hours with confirmation and detailed itinerary.\n\n📞 For immediate assistance, call us at +254 726 485 228\n\nThank you for choosing JaeTravel Expeditions! 🦁",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, confirmationMessage])
    },
    [selectedTour, messages.length],
  )

  // Memoized tour cards for better performance
  const TourCard = useMemo(
    () =>
      ({ tour, onSelect }: { tour: Tour; onSelect: (tour: Tour) => void }) => (
        <Card
          className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] w-full"
          onClick={() => onSelect(tour)}
        >
          <CardContent className="p-3">
            <div className="flex justify-between items-start mb-2 gap-2">
              <h4 className="font-semibold text-sm line-clamp-2 flex-1 min-w-0">{tour.title}</h4>
              <Badge variant="outline" className="text-xs flex-shrink-0">
                ${tour.price}
              </Badge>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600 mb-2 gap-1">
              <div className="flex items-center gap-1 min-w-0">
                <MapPin size={12} className="flex-shrink-0" />
                <span className="truncate">{tour.destination}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Calendar size={12} />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span>{tour.rating}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 items-center">
              <Badge variant="secondary" className="text-xs capitalize">
                {tour.category}
              </Badge>
              {tour.wildlife && tour.wildlife.length > 0 && (
                <>
                  {tour.wildlife.slice(0, 2).map((animal) => (
                    <Badge key={animal} variant="outline" className="text-xs">
                      {animal}
                    </Badge>
                  ))}
                  {tour.wildlife.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{tour.wildlife.length - 2}
                    </Badge>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ),
    [],
  )

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-4 w-96 h-[600px] z-50 max-w-[calc(100vw-2rem)]"
          >
            <Card className="h-full flex flex-col shadow-2xl overflow-hidden">
              <CardHeader className="bg-orange-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot size={20} />
                    {t("aiAssistant")}
                    {isTyping && (
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
                        <div
                          className="w-1 h-1 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-1 h-1 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    )}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-orange-700"
                  >
                    <X size={20} />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 max-w-full"
                      >
                        <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                          <div
                            className={`max-w-[85%] p-3 rounded-lg break-words ${
                              message.isBot ? "bg-gray-100 text-gray-800" : "bg-orange-600 text-white"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {message.isBot && <Bot size={16} className="mt-1 flex-shrink-0" />}
                              {!message.isBot && <User size={16} className="mt-1 flex-shrink-0" />}
                              <div className="text-sm whitespace-pre-line break-words overflow-wrap-anywhere">
                                {message.text}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Tour Recommendations */}
                        {message.tours && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2 max-w-full"
                          >
                            {message.tours.map((tour) => (
                              <div key={tour.id} className="max-w-full">
                                <TourCard tour={tour} onSelect={handleTourSelect} />
                              </div>
                            ))}
                          </motion.div>
                        )}

                        {/* Booking Form */}
                        {message.showBookingForm && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-full"
                          >
                            <BookingForm onSubmit={handleBookingSubmit} selectedTour={selectedTour} />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[85%]">
                        <div className="flex items-center gap-2">
                          <Bot size={16} />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about tours, destinations, or say 'book now'..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !isTyping && handleSendMessage()}
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button onClick={handleSendMessage} size="icon" disabled={isTyping || !inputValue.trim()}>
                      {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </Button>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Wildlife Safari", "Gorilla Trekking", "Adventure Tours", "Budget Tours", "Book Now"].map(
                      (action) => (
                        <Button
                          key={action}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            setInputValue(action)
                            setTimeout(handleSendMessage, 100)
                          }}
                          disabled={isTyping}
                        >
                          {action}
                        </Button>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 bg-orange-600 hover:bg-orange-700 shadow-lg relative"
          size="icon"
        >
          <MessageCircle size={24} />
          {!isOpen && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />}
        </Button>
      </motion.div>
    </>
  )
}

function BookingForm({ onSubmit, selectedTour }: { onSubmit: (data: any) => void; selectedTour: Tour | null }) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    travelDate: "",
    adults: "2",
    children: "0",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSubmit(formData)
    setIsSubmitting(false)

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      nationality: "",
      travelDate: "",
      adults: "2",
      children: "0",
      specialRequests: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.fullName && formData.email && formData.phone && formData.travelDate

  return (
    <Card className="mt-2 w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 flex-wrap">
          📋 {t("bookingForm")}
          {selectedTour && (
            <Badge variant="secondary" className="text-xs">
              ${selectedTour.price}
            </Badge>
          )}
        </CardTitle>
        {selectedTour && (
          <div className="text-xs text-gray-600">
            <div className="font-medium truncate">{selectedTour.title}</div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="truncate">{selectedTour.destination}</span>
              <span>•</span>
              <span>{selectedTour.duration}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span>{selectedTour.rating}</span>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3 max-w-full">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder={t("fullName")}
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              required
              className="text-sm"
              disabled={isSubmitting}
            />
            <Input
              type="email"
              placeholder={t("email")}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="text-sm"
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder={t("phone")}
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              className="text-sm"
              disabled={isSubmitting}
            />
            <Input
              placeholder={t("nationality")}
              value={formData.nationality}
              onChange={(e) => handleInputChange("nationality", e.target.value)}
              className="text-sm"
              disabled={isSubmitting}
            />
          </div>
          <Input
            type="date"
            placeholder={t("travelDate")}
            value={formData.travelDate}
            onChange={(e) => handleInputChange("travelDate", e.target.value)}
            required
            className="text-sm"
            disabled={isSubmitting}
            min={new Date().toISOString().split("T")[0]}
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-600">{t("adults")}</label>
              <Input
                type="number"
                min="1"
                max="20"
                value={formData.adults}
                onChange={(e) => handleInputChange("adults", e.target.value)}
                className="text-sm"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">{t("children")}</label>
              <Input
                type="number"
                min="0"
                max="20"
                value={formData.children}
                onChange={(e) => handleInputChange("children", e.target.value)}
                className="text-sm"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <textarea
            placeholder={t("specialRequests")}
            value={formData.specialRequests}
            onChange={(e) => handleInputChange("specialRequests", e.target.value)}
            className="w-full p-2 border rounded text-sm resize-none"
            rows={2}
            disabled={isSubmitting}
          />

          {/* Total Cost Display */}
          {selectedTour && (
            <div className="bg-orange-50 p-2 rounded text-sm">
              <div className="flex justify-between items-center">
                <span>Total Cost:</span>
                <span className="font-bold text-orange-600">
                  ${selectedTour.price * (Number.parseInt(formData.adults) + Number.parseInt(formData.children) * 0.7)}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {formData.adults} adults + {formData.children} children (70% rate)
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-sm"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Sending...
              </div>
            ) : (
              t("submitBooking")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
