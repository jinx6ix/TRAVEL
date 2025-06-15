"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your safari assistant. How can I help you plan your East African adventure today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("tour") || input.includes("safari")) {
      return "We offer amazing safari tours in Kenya, Tanzania, Rwanda, and Uganda! Our most popular tours include Masai Mara Safari, Serengeti Wildlife Safari, and Gorilla Trekking. Would you like to know more about any specific destination?"
    }

    if (input.includes("price") || input.includes("cost") || input.includes("affordable")) {
      return "Our tour prices range from $1,200 to $2,500 depending on the destination and duration. We offer competitive rates and can customize packages to fit your budget. Would you like a detailed quote for a specific tour?"
    }

    if (input.includes("vehicle") || input.includes("car") || input.includes("hire")) {
      return "We have various vehicles available for hire: Toyota Landcruiser, Toyota Prado, Luxury Roof Top Camping vehicles, Photography Converted Vehicles, and Wheelchair Accessible Vehicles. Which type interests you?"
    }

    if (input.includes("book") || input.includes("reservation")) {
      return "I'd be happy to help you with booking! Please let me know your preferred destination, travel dates, and number of travelers. You can also call us at +254 726 485 228 or WhatsApp us for immediate assistance."
    }

    if (
      input.includes("destination") ||
      input.includes("kenya") ||
      input.includes("tanzania") ||
      input.includes("rwanda") ||
      input.includes("uganda")
    ) {
      return "We specialize in East African destinations: Kenya (Masai Mara, Amboseli), Tanzania (Serengeti, Ngorongoro), Rwanda (Volcanoes National Park), and Uganda (Bwindi Forest). Each offers unique wildlife experiences!"
    }

    return "Thank you for your question! I'm here to help with safari tours, vehicle hire, bookings, and travel information. Feel free to ask about our destinations, prices, or any specific requirements you have."
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-4 w-80 h-96 z-50"
          >
            <Card className="h-full flex flex-col shadow-2xl">
              <CardHeader className="bg-orange-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Safari Assistant</CardTitle>
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

              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isBot ? "bg-gray-100 text-gray-800" : "bg-orange-600 text-white"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about tours, bookings..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send size={16} />
                    </Button>
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
          className="rounded-full w-14 h-14 bg-orange-600 hover:bg-orange-700 shadow-lg"
          size="icon"
        >
          <MessageCircle size={24} />
        </Button>
      </motion.div>
    </>
  )
}
