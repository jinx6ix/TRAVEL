"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, User } from "lucide-react"
import { motion } from "framer-motion"

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  date: string
  tour?: string
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely incredible experience! The Masai Mara safari exceeded all expectations. Our guide was knowledgeable and the wildlife viewing was spectacular.",
    date: "2024-01-15",
    tour: "Masai Mara Safari",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    comment:
      "Best vacation ever! The gorilla trekking in Rwanda was life-changing. Professional service and amazing accommodations throughout.",
    date: "2024-01-10",
    tour: "Gorilla Trekking",
  },
  {
    id: 3,
    name: "Emma Williams",
    rating: 4,
    comment:
      "Great experience overall. The Serengeti tour was well organized and we saw the Big Five. Would definitely recommend to others!",
    date: "2024-01-05",
    tour: "Serengeti Wildlife Safari",
  },
  {
    id: 4,
    name: "David Rodriguez",
    rating: 5,
    comment:
      "Outstanding service from start to finish. The team went above and beyond to make our East African adventure unforgettable.",
    date: "2023-12-28",
  },
]

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
    tour: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newReview: Review = {
      id: reviews.length + 1,
      name: formData.name,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString().split("T")[0],
      tour: formData.tour || undefined,
    }

    setReviews([newReview, ...reviews])
    setFormData({ name: "", rating: 5, comment: "", tour: "" })
    setShowForm(false)
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Read reviews from our satisfied customers and share your own experience
          </p>
        </motion.div>

        {/* Add Review Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Button onClick={() => setShowForm(!showForm)} size="lg" className="bg-orange-600 hover:bg-orange-700">
            {showForm ? "Cancel" : "Write a Review"}
          </Button>
        </motion.div>

        {/* Review Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <CardDescription>Tell others about your JaeTravel Expeditions with us</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="tour" className="block text-sm font-medium mb-2">
                        Tour/Service (Optional)
                      </label>
                      <Input
                        id="tour"
                        value={formData.tour}
                        onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                        placeholder="Which tour did you take?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Rating *</label>
                    {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                  </div>

                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium mb-2">
                      Your Review *
                    </label>
                    <Textarea
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Share your experience with us..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                      Submit Review
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((review) => (
            <motion.div key={review.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <User size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </div>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  {review.tour && (
                    <Badge variant="secondary" className="w-fit">
                      {review.tour}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Overall Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length))}
              </div>
              <p className="text-gray-600">
                Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
