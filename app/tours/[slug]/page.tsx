"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Users, Star, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/useLanguage"
import Link from "next/link"

interface TourData {
  id: number
  slug: string
  title: string
  destination: string
  duration: string
  price: number
  originalPrice?: number
  category: string
  rating: number
  reviewCount: number
  difficulty: string
  groupSize: string
  wildlife?: string[]
  description: string
  highlights: string[]
  included: string[]
  excluded: string[]
  itinerary: {
    day: number
    title: string
    description: string
    activities: string[]
    accommodation?: string
    meals?: string
  }[]
  gallery: string[]
  bestTime: string
  whatToBring: string[]
  physicalRequirements: string
  cancellationPolicy: string
  reviews: {
    id: number
    name: string
    rating: number
    comment: string
    date: string
    verified: boolean
  }[]
}

// Complete tours data with all 42 tours
const toursData: TourData[] = [
  // KENYA TOURS (12 tours)
  {
    id: 1,
    slug: "masai-mara-safari-adventure",
    title: "Masai Mara JaeTravel Expeditions",
    destination: "Kenya",
    duration: "5 days",
    price: 1200,
    originalPrice: 1400,
    category: "wildlife",
    rating: 4.9,
    reviewCount: 127,
    difficulty: "Easy",
    groupSize: "2-8 people",
    wildlife: ["Big Five", "Great Migration", "Lions", "Elephants", "Cheetahs", "Hippos"],
    description:
      "Experience the world-famous Masai Mara National Reserve, home to the Great Migration and the Big Five. This 5-day JaeTravel Expeditions offers unparalleled wildlife viewing opportunities in one of Africa's most iconic destinations.",
    highlights: [
      "Witness the Great Migration (seasonal)",
      "Big Five game viewing",
      "Maasai cultural village visit",
      "Hot air balloon safari (optional)",
      "Professional guide and 4x4 safari vehicle",
      "Luxury tented camp accommodation",
    ],
    included: [
      "Airport transfers",
      "4x4 safari vehicle with pop-up roof",
      "Professional English-speaking guide",
      "All park fees and conservancy fees",
      "Full board accommodation",
      "Game drives as per itinerary",
      "Bottled water during game drives",
      "Maasai village visit",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Hot air balloon safari ($450)",
      "Alcoholic beverages",
      "Personal expenses and tips",
      "Optional activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nairobi - Transfer to Masai Mara",
        description: "Pick up from Nairobi airport or hotel and drive to Masai Mara National Reserve.",
        activities: ["Airport pickup", "Scenic drive to Masai Mara", "Check-in at camp", "Evening game drive"],
        accommodation: "Luxury tented camp",
        meals: "Lunch, Dinner",
      },
      {
        day: 2,
        title: "Full Day Game Drives",
        description: "Full day exploring the Masai Mara with morning and afternoon game drives.",
        activities: ["Early morning game drive", "Bush breakfast", "Afternoon game drive", "Sundowner drinks"],
        accommodation: "Luxury tented camp",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 3,
        title: "Maasai Village & Game Drives",
        description: "Visit a traditional Maasai village and continue with game viewing.",
        activities: ["Maasai village visit", "Cultural interactions", "Game drive", "Photography session"],
        accommodation: "Luxury tented camp",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 4,
        title: "Migration Viewing & Big Five Search",
        description: "Focus on finding the Big Five and witnessing the Great Migration (seasonal).",
        activities: ["Early morning game drive", "Migration viewing", "Big Five tracking", "Bush lunch"],
        accommodation: "Luxury tented camp",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 5,
        title: "Final Game Drive - Return to Nairobi",
        description: "Final game drive and return journey to Nairobi.",
        activities: ["Final game drive", "Check out", "Drive to Nairobi", "Airport drop-off"],
        meals: "Breakfast, Lunch",
      },
    ],
    gallery: [
      "https://ik.imagekit.io/jinx/travel/safari-3.jpg?updatedAt=1750017262497?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/Herd-of-Elephants-Africa-Overland-Safaris--Africa-Lodge-Safaris--Africa-Tours--On-The-Go-Tours-256241422631671.jpg?updatedAt=1750017262465?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/How-long-does-the-Great-Migration-last.jpg?updatedAt=1750017260875?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/shutterstock_1093949657.jpg?updatedAt=1750017260813?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/Serengeti-National-Park-Africa-Kenya-Safaris2.jpg?updatedAt=1750017260460?height=400&width=600",
      "https://ik.imagekit.io/jinx/travel/best-places-blog-header-1600x500.jpg?updatedAt=1750017260583?height=400&width=600",
    ],
    bestTime: "July to October (Great Migration), December to March (Calving season)",
    whatToBring: [
      "Comfortable safari clothing (neutral colors)",
      "Hat and sunglasses",
      "Sunscreen and insect repellent",
      "Camera with extra batteries",
      "Binoculars",
      "Light jacket for early mornings",
      "Comfortable walking shoes",
    ],
    physicalRequirements:
      "Low physical fitness required. Suitable for all ages. Some walking involved during village visits.",
    cancellationPolicy:
      "Free cancellation up to 30 days before departure. 50% refund 15-30 days before. No refund within 15 days.",
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment:
          "Absolutely incredible experience! Saw all Big Five and the Great Migration. Our guide was knowledgeable and the accommodation was fantastic.",
        date: "2024-01-15",
        verified: true,
      },
      {
        id: 2,
        name: "Michael Chen",
        rating: 5,
        comment:
          "Best safari experience ever! The wildlife viewing was phenomenal and the Maasai village visit was very authentic.",
        date: "2024-01-10",
        verified: true,
      },
    ],
  },
  // Add more tours here - I'll include a few key ones for the demo
    // Kenya Tours (1-12)
    {
      id: 2,
      slug: "amboseli-elephant-safari",
      title: "Amboseli Elephant Safari",
      destination: "Kenya",
      duration: "3 days",
      price: 850,
      category: "wildlife",
      rating: 4.7,
      reviewCount: 92,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Elephants", "Lions", "Cheetahs", "Giraffes", "Zebras"],
      description: "Witness large herds of elephants with Mount Kilimanjaro as backdrop in Amboseli National Park.",
      highlights: [
        "Elephant sightings with Kilimanjaro views",
        "Observation Hill for panoramic views",
        "Maasai cultural experience",
        "Swamp habitats with diverse birdlife",
      ],
      included: [
        "Park entry fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Game drives",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Amboseli",
          description: "Drive to Amboseli with game viewing en route.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Amboseli Serena Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Amboseli",
          description: "Full day exploring Amboseli National Park.",
          activities: ["Early morning game drive", "Observation Hill visit", "Afternoon game drive"],
          accommodation: "Amboseli Serena Lodge",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/amboseli-elephants-00007.jpg?updatedAt=1750008046158",
        "https://ik.imagekit.io/jinx/travel/giraffes-sunset-tsavo-east-west-600nw-2114896097.webp?updatedAt=1750073693618",
      ],
      bestTime: "June to October, December to March",
      whatToBring: [
        "Binoculars",
        "Camera with zoom lens",
        "Light jacket",
        "Comfortable walking shoes",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 14 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Michael Brown",
          rating: 5,
          comment: "The elephants were magnificent and the Kilimanjaro views breathtaking!",
          date: "2024-02-10",
          verified: true,
        },
      ],
    },
    {
      id: 3,
      slug: "samburu-game-reserve",
      title: "Samburu Game Reserve",
      destination: "Kenya",
      duration: "4 days",
      price: 1100,
      category: "wildlife",
      rating: 4.6,
      reviewCount: 68,
      difficulty: "Easy",
      groupSize: "2-8 people",
      wildlife: ["Reticulated Giraffe", "Grevy's Zebra", "Somali Ostrich", "Elephants", "Lions"],
      description: "Explore the unique wildlife of Samburu, home to species not found in other Kenyan parks.",
      highlights: [
        "See the Samburu Special Five",
        "Ewaso Ng'iro River wildlife viewing",
        "Cultural visit to Samburu village",
        "Scenic landscapes",
      ],
      included: [
        "All park fees",
        "Professional guide",
        "Luxury tented camp",
        "All meals",
        "Game drives",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Samburu",
          description: "Drive to Samburu with scenic views of Mount Kenya.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Samburu Intrepids Camp",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Samburu",
          description: "Full day exploring Samburu Game Reserve.",
          activities: ["Early morning game drive", "River wildlife viewing", "Afternoon game drive"],
          accommodation: "Samburu Intrepids Camp",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Samburu_National_Reserve,_Kenya-26December2012.jpg?updatedAt=1750008245147",
        "https://ik.imagekit.io/jinx/travel/Samburu-National-Reserve.jpg?updatedAt=1750073795679",
      ],
      bestTime: "June to October, December to March",
      whatToBring: [
        "Neutral-colored clothing",
        "Hat and sunglasses",
        "Camera equipment",
        "Binoculars",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 21 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Emily Wilson",
          rating: 4,
          comment: "The special five were amazing to see, and our guide was very knowledgeable.",
          date: "2024-01-28",
          verified: true,
        },
      ],
    },
    {
      id: 12,
      slug: "diani-beach-safari-combo",
      title: "Diani Beach Safari Combo",
      destination: "Kenya",
      duration: "7 days",
      price: 1800,
      category: "beach",
      rating: 4.8,
      reviewCount: 45,
      difficulty: "Easy",
      groupSize: "2-6 people",
      description: "Combine wildlife safari with beach relaxation at Diani's white sand beaches.",
      highlights: [
        "Tsavo East safari",
        "Diani Beach relaxation",
        "Snorkeling at Kisite Marine Park",
        "Cultural village visit",
      ],
      included: [
        "Safari and beach accommodation",
        "All meals on safari",
        "Game drives",
        "Snorkeling trip",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Tsavo East",
          description: "Drive to Tsavo East National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Ashnil Aruba Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Tsavo East to Diani",
          description: "Morning game drive then transfer to Diani Beach.",
          activities: ["Morning game drive", "Transfer to Diani", "Beach relaxation"],
          accommodation: "Baobab Beach Resort",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/kenya-beach-safari-prices-jt-safaris-julius-safaris-diani-beach.jpg?updatedAt=1750012979870",
        "https://ik.imagekit.io/jinx/travel/chaleisland10.jpg?updatedAt=1750073905439",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Safari clothing",
        "Swimwear",
        "Beachwear",
        "Sun protection",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "David Thompson",
          rating: 5,
          comment: "Perfect combination of adventure and relaxation!",
          date: "2024-02-15",
          verified: true,
        },
      ],
    },
    {
      id: 4,
      slug: "lake-nakuru-flamingo-spectacle",
      title: "Lake Nakuru Flamingo Tour",
      destination: "Kenya",
      duration: "2 days",
      price: 450,
      category: "wildlife",
      rating: 4.4,
      reviewCount: 56,
      difficulty: "Easy",
      groupSize: "2-8 people",
      wildlife: ["Flamingos", "Rhinos", "Lions", "Giraffes", "Pelicans"],
      description: "Visit the famous flamingo-filled Lake Nakuru with its stunning birdlife and rhino sanctuary.",
      highlights: [
        "Thousands of flamingos",
        "Rhino sanctuary",
        "Baboon cliff viewpoint",
        "Diverse bird species",
      ],
      included: [
        "Park entry fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Game drives",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Lake Nakuru",
          description: "Drive to Lake Nakuru National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Lake Nakuru Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Lake Nakuru",
          description: "Full day exploring Lake Nakuru National Park.",
          activities: ["Early morning game drive", "Bird watching", "Afternoon game drive", "Return to Nairobi"],
          meals: "Breakfast, Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/lake-nakuru-flamingos-in-red-sunset-590x390.jpg?updatedAt=1750008429931",
        "https://ik.imagekit.io/jinx/travel/nakuru-national-park.jpg?updatedAt=1750074010058",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Binoculars",
        "Camera with zoom lens",
        "Light jacket",
        "Bird identification book",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 7 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Jennifer Lopez",
          rating: 4,
          comment: "The sea of pink flamingos was absolutely stunning!",
          date: "2024-01-22",
          verified: true,
        },
      ],
    },
    {
      id: 11,
      slug: "aberdare-national-park-safari",
      title: "Aberdare National Park",
      destination: "Kenya",
      duration: "2 days",
      price: 600,
      category: "wildlife",
      rating: 4.3,
      reviewCount: 38,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Elephants", "Buffalo", "Leopards", "Black Rhinos", "Colobus Monkeys"],
      description: "Explore the misty forests and waterfalls of Aberdare National Park with unique wildlife viewing.",
      highlights: [
        "Tree lodge wildlife viewing",
        "Waterfall hikes",
        "Moorland landscapes",
        "Night game viewing",
      ],
      included: [
        "Park entry fees",
        "Professional guide",
        "Tree lodge accommodation",
        "All meals",
        "Game drives",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Aberdare",
          description: "Drive to Aberdare National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening wildlife viewing"],
          accommodation: "The Ark",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Aberdare",
          description: "Explore Aberdare's diverse landscapes and wildlife.",
          activities: ["Morning game drive", "Waterfall hike", "Afternoon game drive", "Return to Nairobi"],
          meals: "Breakfast, Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Aberdare.jpg?updatedAt=1750013499302",
        "https://ik.imagekit.io/jinx/travel/Aberdare_Park_entrance.jpg?updatedAt=1750074921142",
      ],
      bestTime: "June to September, December to March",
      whatToBring: [
        "Warm clothing",
        "Waterproof jacket",
        "Hiking shoes",
        "Binoculars",
      ],
      physicalRequirements: "Moderate fitness for hiking.",
      cancellationPolicy: "Free cancellation up to 14 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Robert Garcia",
          rating: 4,
          comment: "The Ark lodge was amazing for night wildlife viewing!",
          date: "2024-02-05",
          verified: true,
        },
      ],
    },
    {
      id: 5,
      slug: "tsavo-east-west-adventure",
      title: "Tsavo East & West Safari",
      destination: "Kenya",
      duration: "4 days",
      price: 980,
      category: "wildlife",
      rating: 4.5,
      reviewCount: 54,
      difficulty: "Easy",
      groupSize: "2-8 people",
      wildlife: ["Red Elephants", "Lions", "Giraffes", "Buffalo", "Leopards"],
      description: "Explore Kenya's largest national park complex with diverse landscapes and wildlife.",
      highlights: [
        "Red elephants of Tsavo",
        "Mzima Springs hippos",
        "Lugard Falls",
        "Shetani Lava Flow",
      ],
      included: [
        "Park entry fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Game drives",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Tsavo West",
          description: "Drive to Tsavo West National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Kilaguni Serena Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Tsavo West to Tsavo East",
          description: "Morning game drive then transfer to Tsavo East.",
          activities: ["Morning game drive", "Transfer to Tsavo East", "Evening game drive"],
          accommodation: "Ashnil Aruba Lodge",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/tsavo-west-national-park-chyulu-gate.jpg.webp?updatedAt=1750012915321",
        "https://ik.imagekit.io/jinx/travel/giraffes-sunset-tsavo-east-west-600nw-2114896097.webp?updatedAt=1750073693618",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Safari clothing",
        "Binoculars",
        "Camera",
        "Sun protection",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 14 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Lisa Chen",
          rating: 4,
          comment: "The red elephants were amazing to see against the red soil!",
          date: "2024-01-25",
          verified: true,
        },
      ],
    },
    {
      "id": 6,
      "slug": "mombasa-coastal-safari",
      "title": "Mombasa Coastal Safari & Beach Retreat",
      "destination": "Kenya",
      "duration": "5 days",
      "price": 1200,
      "category": "coastal",
      "rating": 4.8,
      "reviewCount": 72,
      "difficulty": "Easy",
      "groupSize": "2-10 people",
      "wildlife": ["Dolphins", "Sea Turtles", "Tropical Fish", "Monkeys", "Coastal Birds"],
      "description": "Combine marine adventures with cultural experiences along Kenya's stunning coastline.",
      "highlights": [
        "Dhow cruise in Mombasa",
        "Swim with dolphins",
        "Old Town walking tour",
        "Relaxation at Diani Beach",
        "Marine park snorkeling"
      ],
      "included": [
        "All accommodations",
        "Meals as specified",
        "Marine park fees",
        "Professional guide",
        "All listed activities"
      ],
      "excluded": [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Alcoholic beverages",
        "Optional activities"
      ],
      "itinerary": [
        {
          "day": 1,
          "title": "Arrival in Mombasa",
          "description": "Transfer to beach resort and orientation.",
          "activities": ["Airport pickup", "Resort check-in", "Evening beach walk"],
          "accommodation": "Voyager Beach Resort",
          "meals": "Dinner"
        },
        {
          "day": 2,
          "title": "Marine Adventure Day",
          "description": "Explore Kenya's underwater world.",
          "activities": ["Boat trip to marine park", "Snorkeling", "Dolphin watching", "Beach relaxation"],
          "accommodation": "Voyager Beach Resort",
          "meals": "Breakfast, Lunch, Dinner"
        }
      ],
      "gallery": [
        "https://ik.imagekit.io/jinx/travel/Kenia-Mombasa-Diani-Beach-Leopard-Beach-Resort-strand-long-beach-LBR_1.jpg?updatedAt=1750085411780",
        "https://ik.imagekit.io/jinx/travel/4-Days-Classic-Mombasa-Beach-Holiday-750x450.jpg?updatedAt=1750085411747",
        "https://ik.imagekit.io/jinx/travel/Mombasa-beach-2-1960x800.webp?updatedAt=1750085411718"
      ],
      "bestTime": "June-October & December-February",
      "whatToBring": [
        "Swimwear",
        "Reef-safe sunscreen",
        "Water shoes",
        "Light clothing",
        "Underwater camera"
      ],
      "physicalRequirements": "Basic swimming ability recommended for water activities.",
      "cancellationPolicy": "Free cancellation up to 21 days before departure.",
      "reviews": [
        {
          "id": 1,
          "name": "James Peterson",
          "rating": 5,
          "comment": "The dolphin experience was magical - they swam right beside our boat!",
          "date": "2024-03-15",
          "verified": true
        },
        {
          "id": 2,
          "name": "Amina Hassan",
          "rating": 4,
          "comment": "Perfect mix of adventure and relaxation. Old Town's architecture was breathtaking.",
          "date": "2024-02-28",
          "verified": true
        }
      ]
    },
    {
      id: 8,
      slug: "laikipia-conservancy",
      title: "Laikipia Conservancy",
      destination: "Kenya",
      duration: "3 days",
      price: 1300,
      category: "wildlife",
      rating: 4.7,
      reviewCount: 39,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Grevy's Zebra", "African Wild Dog", "Reticulated Giraffe", "Elephants"],
      description: "Exclusive wildlife viewing in private conservancies with rare species.",
      highlights: [
        "Night game drives",
        "Walking safaris",
        "Community conservation projects",
        "Exclusive wildlife viewing",
      ],
      included: [
        "Conservancy fees",
        "Professional guide",
        "Luxury tented camp",
        "All meals",
        "Activities",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Laikipia",
          description: "Fly to Laikipia Plateau.",
          activities: ["Flight to Nanyuki", "Game drive to camp", "Evening game drive"],
          accommodation: "Lewa Wilderness",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Laikipia",
          description: "Full day of activities in the conservancy.",
          activities: ["Morning game drive", "Walking safari", "Community visit", "Night game drive"],
          accommodation: "Lewa Wilderness",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/laikipia-kenya-photography-safari.jpg?updatedAt=1750075373301",
        "https://ik.imagekit.io/jinx/travel/Grevys-plains-zebras-Samburu.jpg?updatedAt=1750075439927",
      ],
      bestTime: "June to October, December to March",
      whatToBring: [
        "Neutral-colored clothing",
        "Walking shoes",
        "Binoculars",
        "Camera",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Thomas Wilson",
          rating: 5,
          comment: "The walking safari was incredible - so close to wildlife!",
          date: "2024-02-12",
          verified: true,
        },
      ],
    },
    {
      id: 9,
      slug: "hell-gate-lake-naivasha-adventure",
      title: "Hell's Gate Adventure",
      destination: "Kenya",
      duration: "1 day",
      price: 120,
      category: "adventure",
      rating: 4.6,
      reviewCount: 87,
      difficulty: "Moderate",
      groupSize: "2-10 people",
      description: "Bike and hike through Hell's Gate National Park with its dramatic cliffs and geothermal activity.",
      highlights: [
        "Cycling safari",
        "Hiking through gorges",
        "Geothermal steam vents",
        "Rock climbing (optional)",
      ],
      included: [
        "Park entry fees",
        "Bike rental",
        "Professional guide",
        "Lunch",
      ],
      excluded: [
        "Personal insurance",
        "Tips",
        "Optional activities",
      ],
      itinerary: [
        {
          day: 1,
          title: "Full Day Hell's Gate",
          description: "Biking and hiking adventure in Hell's Gate.",
          activities: ["Morning departure", "Bike safari", "Gorge hike", "Geothermal area visit"],
          meals: "Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Hells-Gate-National-Park.jpg?updatedAt=1750075554545",
        "https://ik.imagekit.io/jinx/travel/Hells-gate-african-travels-1500.png-kl-400x363.png?updatedAt=1750075664463",
      ],
      bestTime: "June to February",
      whatToBring: [
        "Comfortable sports clothing",
        "Sturdy shoes",
        "Sun protection",
        "Camera",
      ],
      physicalRequirements: "Moderate fitness required for cycling and hiking.",
      cancellationPolicy: "Free cancellation up to 24 hours before departure.",
      reviews: [
        {
          id: 1,
          name: "Mark Johnson",
          rating: 5,
          comment: "Amazing to bike among wildlife and hike through the gorge!",
          date: "2024-01-30",
          verified: true,
        },
      ],
    },
    {
      id: 10,
      slug: "maasai-cultural-experience",
      title: "Maasai Cultural Experience",
      destination: "Kenya",
      duration: "2 days",
      price: 350,
      category: "cultural",
      rating: 4.4,
      reviewCount: 42,
      difficulty: "Easy",
      groupSize: "2-12 people",
      description: "Immerse yourself in Maasai culture with village stays, traditional dances, and warrior training.",
      highlights: [
        "Maasai village stay",
        "Traditional dances",
        "Warrior training",
        "Beadwork workshop",
      ],
      included: [
        "Cultural fees",
        "Homestay accommodation",
        "All meals",
        "Activities",
      ],
      excluded: [
        "Personal purchases",
        "Tips",
      ],
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Maasai Village",
          description: "Transfer to traditional Maasai village.",
          activities: ["Morning departure", "Village welcome", "Cultural orientation", "Evening dances"],
          accommodation: "Maasai Manyatta",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Cultural Immersion",
          description: "Participate in traditional Maasai activities.",
          activities: ["Cattle herding", "Warrior training", "Beadwork workshop", "Return to Nairobi"],
          meals: "Breakfast, Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg?updatedAt=1750013375250",
        "https://ik.imagekit.io/jinx/travel/M1BdYdrWMdxo7TUbwp_1582907793.jpg?updatedAt=1750075796391",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Neutral-colored clothing",
        "Comfortable shoes",
        "Camera",
        "Small gifts for hosts (optional)",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 48 hours before departure.",
      reviews: [
        {
          id: 1,
          name: "Anna Smith",
          rating: 4,
          comment: "Authentic cultural experience with very welcoming hosts.",
          date: "2024-02-08",
          verified: true,
        },
      ],
    },
    {
      id: 43,
      slug: "lake-naivasha-boat-safari",
      title: "Lake Naivasha Boat Safari",
      destination: "Kenya",
      duration: "1 day",
      price: 150,
      category: "wildlife",
      rating: 4.3,
      reviewCount: 65,
      difficulty: "Easy",
      groupSize: "2-8 people",
      wildlife: ["Hippos", "Fish Eagles", "Giraffes", "Waterbucks", "Colobus Monkeys"],
      description: "Boat safari on freshwater Lake Naivasha with hippos, birds, and Crescent Island walking safari.",
      highlights: [
        "Close hippo encounters",
        "Bird watching",
        "Crescent Island walk",
        "Fisherman village visit",
      ],
      included: [
        "Boat safari",
        "Professional guide",
        "Park fees",
        "Lunch",
      ],
      excluded: [
        "Personal expenses",
        "Tips",
      ],
      itinerary: [
        {
          day: 1,
          title: "Full Day Lake Naivasha",
          description: "Boat safari and walking tour.",
          activities: ["Morning departure", "Boat safari", "Crescent Island walk", "Lunch by the lake"],
          meals: "Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/flamingos-lakes-great-rift-valley-1.jpg?updatedAt=1750072866145",
        "https://ik.imagekit.io/jinx/travel/lake-nakuru-flamingos-in-red-sunset-590x390.jpg?updatedAt=1750008429931",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Binoculars",
        "Camera",
        "Sun protection",
        "Comfortable walking shoes",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 24 hours before departure.",
      reviews: [
        {
          id: 1,
          name: "Paul Wilson",
          rating: 4,
          comment: "Amazing to see hippos up close from the boat!",
          date: "2024-01-18",
          verified: true,
        },
      ],
    },
    {
      id: 7,
      slug: "mount-kenya-climbing-Expeditions",
      title: "Mount Kenya Climbing",
      destination: "Kenya",
      duration: "5 days",
      price: 950,
      category: "hiking",
      rating: 4.7,
      reviewCount: 58,
      difficulty: "Challenging",
      groupSize: "2-6 people",
      description: "Trek Africa's second highest mountain with diverse vegetation zones and stunning peaks.",
      highlights: [
        "Point Lenana summit",
        "Mountain lakes",
        "Unique alpine vegetation",
        "Glacier views",
      ],
      included: [
        "Park fees",
        "Professional guides",
        "Porters",
        "All meals",
        "Camping equipment",
      ],
      excluded: [
        "Personal hiking gear",
        "Tips",
      ],
      itinerary: [
        {
          day: 1,
          title: "Nairobi to Naro Moru",
          description: "Transfer to Mount Kenya National Park.",
          activities: ["Morning departure", "Equipment check", "Acclimatization walk"],
          accommodation: "Naro Moru River Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Start Ascent",
          description: "Begin trek through rainforest to Met Station.",
          activities: ["Morning departure", "Rainforest trek", "Arrive at Met Station"],
          accommodation: "Met Station",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/mt-kenya.jpg?updatedAt=1750013071132",
        "https://ik.imagekit.io/jinx/travel/original-925782c19d188263e00bf14985b940b2.jpg?updatedAt=1750075962075",
      ],
      bestTime: "January to February, July to October",
      whatToBring: [
        "Hiking boots",
        "Warm clothing",
        "Sleeping bag",
        "Headlamp",
      ],
      physicalRequirements: "Good physical fitness required.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "David Kim",
          rating: 5,
          comment: "Challenging but rewarding climb with amazing scenery!",
          date: "2024-02-20",
          verified: true,
        },
      ],
    },
  
    // Tanzania Tours (13-24)
    {
      id: 13,
      slug: "serengeti-wildlife-safari",
      title: "Serengeti Wildlife Safari",
      destination: "Tanzania",
      duration: "7 days",
      price: 1800,
      originalPrice: 2000,
      category: "wildlife",
      rating: 4.8,
      reviewCount: 89,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Big Five", "Wildebeest Migration", "Lions", "Leopards", "Cheetahs"],
      description: "Explore the endless plains of Serengeti National Park, famous for the annual wildebeest migration.",
      highlights: [
        "Witness the Great Migration",
        "Big Five encounters",
        "Ngorongoro Crater visit",
        "Olduvai Gorge exploration",
      ],
      included: [
        "Airport transfers",
        "4x4 safari vehicle",
        "Professional guide",
        "All park fees",
        "Full board accommodation",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Alcoholic beverages",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Arusha",
          description: "Arrive in Arusha and transfer to hotel for briefing.",
          activities: ["Airport pickup", "Hotel check-in", "Safari briefing"],
          accommodation: "Arusha Hotel",
          meals: "Dinner",
        },
        {
          day: 2,
          title: "Arusha to Serengeti",
          description: "Drive to Serengeti National Park with game viewing en route.",
          activities: ["Early departure", "Game drive en route", "Serengeti entry"],
          accommodation: "Serengeti Safari Lodge",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Serengeti-National-Park-Africa-Kenya-Safaris2.jpg?updatedAt=1750017260460",
        "https://ik.imagekit.io/jinx/travel/serengeti-day-trip.jpeg?updatedAt=1750016757896",
      ],
      bestTime: "June to October (Dry season)",
      whatToBring: [
        "Safari clothing",
        "Hat and sunscreen",
        "Camera equipment",
        "Binoculars",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Emma Wilson",
          rating: 5,
          comment: "The migration was spectacular and the Ngorongoro Crater breathtaking!",
          date: "2024-01-20",
          verified: true,
        },
      ],
    },
    {
      id: 14,
      slug: "ngorongoro-crater-safari",
      title: "Ngorongoro Crater Tour",
      destination: "Tanzania",
      duration: "2 days",
      price: 750,
      category: "wildlife",
      rating: 4.9,
      reviewCount: 112,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Big Five", "Flamingos", "Hippos", "Hyenas"],
      description: "Explore the world's largest intact volcanic caldera teeming with wildlife.",
      highlights: [
        "Descend into the crater floor",
        "Big Five sightings",
        "Picnic lunch by the hippo pool",
        "Scenic views from the rim",
      ],
      included: [
        "Crater service fees",
        "4x4 safari vehicle",
        "Professional guide",
        "Park fees",
        "Accommodation",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arusha to Ngorongoro",
          description: "Drive to Ngorongoro Conservation Area.",
          activities: ["Morning departure", "Crater rim walk", "Sunset viewing"],
          accommodation: "Ngorongoro Serena Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Crater Tour - Return",
          description: "Descend into the crater for full day game viewing.",
          activities: ["Early descent into crater", "Full day game drive", "Return to Arusha"],
          meals: "Breakfast, Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Ngorongoro-Crater.jpg?updatedAt=1750013843530",
        "https://ik.imagekit.io/jinx/4-Days-Ngorongoro-Wildlife-Tour.jpg?updatedAt=1750076232872",
      ],
      bestTime: "June to September (Dry season)",
      whatToBring: [
        "Warm layers for morning",
        "Binoculars",
        "Camera",
        "Comfortable shoes",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 14 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Jessica Lee",
          rating: 5,
          comment: "The crater was like Noah's Ark - animals everywhere!",
          date: "2024-01-20",
          verified: true,
        },
      ],
    },
    {
      id: 15,
      slug: "kilimanjaro-climbing-Expeditions",
      title: "Kilimanjaro Climbing",
      destination: "Tanzania",
      duration: "7 days",
      price: 2500,
      category: "hiking",
      rating: 4.8,
      reviewCount: 76,
      difficulty: "Challenging",
      groupSize: "2-8 people",
      description: "Climb Africa's highest peak through the scenic Machame Route with professional guides.",
      highlights: [
        "Uhuru Peak summit",
        "Diverse climate zones",
        "Glacier views",
        "Professional mountain crew",
      ],
      included: [
        "Park fees",
        "Professional guides",
        "Porters",
        "All meals",
        "Camping equipment",
      ],
      excluded: [
        "Personal hiking gear",
        "Tips",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arusha to Machame Gate",
          description: "Transfer to Kilimanjaro National Park.",
          activities: ["Morning departure", "Registration", "Start trek to Machame Camp"],
          accommodation: "Machame Camp",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Machame to Shira Camp",
          description: "Trek through heath and moorland zones.",
          activities: ["Morning trek", "Acclimatization", "Arrive at Shira Camp"],
          accommodation: "Shira Camp",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/kilimanjaro-moutain-climbing.jpg?updatedAt=1750013910253",
        "https://ik.imagekit.io/jinx/travel/7z41g35fwt_1203668448_73.jpg?updatedAt=1750076346182",
      ],
      bestTime: "January to February, July to October",
      whatToBring: [
        "Hiking boots",
        "Warm clothing",
        "Sleeping bag",
        "Headlamp",
      ],
      physicalRequirements: "Excellent physical fitness required.",
      cancellationPolicy: "Free cancellation up to 60 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Michael Chen",
          rating: 5,
          comment: "Life-changing experience reaching the roof of Africa!",
          date: "2024-02-15",
          verified: true,
        },
      ],
    },
    {
      id: 18,
      slug: "zanzibar-beach-holiday",
      title: "Zanzibar Spice Island",
      destination: "Tanzania",
      duration: "5 days",
      price: 950,
      category: "beach",
      rating: 4.6,
      reviewCount: 87,
      difficulty: "Easy",
      groupSize: "2-8 people",
      description: "Cultural and beach experience on Zanzibar's historic spice island.",
      highlights: [
        "Stone Town tour",
        "Spice farm visit",
        "Prison Island excursion",
        "Beach relaxation",
      ],
      included: [
        "Accommodation",
        "All tours",
        "Breakfast",
        "Airport transfers",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Zanzibar",
          description: "Transfer to Stone Town hotel.",
          activities: ["Airport pickup", "Stone Town orientation", "Sunset at Forodhani Gardens"],
          accommodation: "Dhow Palace Hotel",
          meals: "Breakfast",
        },
        {
          day: 2,
          title: "Stone Town Tour",
          description: "Explore historic Stone Town.",
          activities: ["City tour", "Old Fort visit", "House of Wonders", "Freddie Mercury Museum"],
          accommodation: "Dhow Palace Hotel",
          meals: "Breakfast",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/31719088_tourists-on-a-typical-narrow-street-in-stone-town-zanzibar-e1713023620250.jpg?updatedAt=1750081033831",
        "https://ik.imagekit.io/jinx/travel/zanzibar-stone-town-view-min-800x600.jpg?updatedAt=1750081120662",
      ],
      bestTime: "June to October, December to February",
      whatToBring: [
        "Light clothing",
        "Swimwear",
        "Comfortable walking shoes",
        "Sun protection",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 14 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Sophia Martinez",
          rating: 4,
          comment: "The spice tour was fascinating and the beaches beautiful!",
          date: "2024-01-18",
          verified: true,
        },
      ],
    },
    {
      id: 16,
      slug: "tarangire-national-park-safari",
      title: "Tarangire Elephant Safari",
      destination: "Tanzania",
      duration: "3 days",
      price: 850,
      category: "wildlife",
      rating: 4.5,
      reviewCount: 63,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Elephants", "Baobab Trees", "Lions", "Bird Species"],
      description: "Witness massive elephant herds among ancient baobabs in Tarangire National Park.",
      highlights: [
        "Large elephant herds",
        "Ancient baobab trees",
        "Silale Swamp wildlife",
        "Diverse bird species",
      ],
      included: [
        "Park entry fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Game drives",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arusha to Tarangire",
          description: "Drive to Tarangire National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Tarangire Safari Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Tarangire",
          description: "Full day exploring Tarangire National Park.",
          activities: ["Early morning game drive", "Baobab photography", "Afternoon game drive"],
          accommodation: "Tarangire Safari Lodge",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/boabab-tarangire-national-park.jpg?updatedAt=1750081221822",
        "https://ik.imagekit.io/jinx/travel/f37cb927c53c40d3ab19c4b5ffbb2bce.jpg?updatedAt=1750081221297",
      ],
      bestTime: "June to October (Dry season)",
      whatToBring: [
        "Safari clothing",
        "Camera with zoom lens",
        "Binoculars",
        "Bird identification book",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 14 days before departure.",
      reviews: [
        {
          id: 1,
          name: "James Wilson",
          rating: 4,
          comment: "The elephant herds were incredible, especially around the baobabs!",
          date: "2024-02-10",
          verified: true,
        },
      ],
    },
    {
      id: 20,
      slug: "selous-game-reserve-safari",
      title: "Selous Game Reserve",
      destination: "Tanzania",
      duration: "4 days",
      price: 1200,
      category: "wildlife",
      rating: 4.4,
      reviewCount: 47,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Wild Dogs", "Elephants", "Hippos", "Crocodiles", "Lions"],
      description: "Explore Africa's largest game reserve with boat safaris and walking safaris.",
      highlights: [
        "Boat safaris on Rufiji River",
        "Walking safaris",
        "Wild dog sightings",
        "Remote wilderness experience",
      ],
      included: [
        "Park fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Activities",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Dar es Salaam to Selous",
          description: "Fly to Selous Game Reserve.",
          activities: ["Morning flight", "Boat transfer", "Evening game drive"],
          accommodation: "Selous Serena Camp",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Selous",
          description: "Boat safari and walking safari in Selous.",
          activities: ["Morning boat safari", "Walking safari", "Afternoon game drive"],
          accommodation: "Selous Serena Camp",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/selous-safari.jpg?updatedAt=1750081764940",
        "https://ik.imagekit.io/jinx/travel/SELOUS-GAME-RESERVE.jpg?updatedAt=1750081764865",
      ],
      bestTime: "June to October (Dry season)",
      whatToBring: [
        "Neutral-colored clothing",
        "Binoculars",
        "Camera",
        "Sun protection",
      ],
      physicalRequirements: "Moderate fitness for walking safaris.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Emma Thompson",
          rating: 4,
          comment: "The boat safari was amazing for seeing hippos and crocodiles up close!",
          date: "2024-01-25",
          verified: true,
        },
      ],
    },
    {
      id: 17,
      slug: "lake-manyara-national-park-safari",
      title: "Lake Manyara Tree Climbing Lions",
      destination: "Tanzania",
      duration: "2 days",
      price: 550,
      category: "wildlife",
      rating: 4.3,
      reviewCount: 52,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Tree-climbing Lions", "Flamingos", "Elephants", "Hippos"],
      description: "Discover the unique tree-climbing lions and diverse birdlife of Lake Manyara National Park.",
      highlights: [
        "Tree-climbing lion sightings",
        "Lake shore bird watching",
        "Groundwater forest",
        "Hot springs visit",
      ],
      included: [
        "Park entry fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Game drives",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arusha to Lake Manyara",
          description: "Drive to Lake Manyara National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Lake Manyara Serena Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Lake Manyara",
          description: "Full day exploring Lake Manyara National Park.",
          activities: ["Early morning game drive", "Bird watching", "Afternoon game drive", "Return to Arusha"],
          meals: "Breakfast, Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/04tb-treelions1-facebookJumbo-1.jpg?updatedAt=1750014060199",
        "https://ik.imagekit.io/jinx/travel/Lake%20Manyara%20banner.jpg?updatedAt=1750081887006",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Binoculars",
        "Camera with zoom lens",
        "Bird identification book",
        "Light jacket",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 7 days before departure.",
      reviews: [
        {
          id: 1,
          name: "David Kim",
          rating: 4,
          comment: "Amazing to see lions lounging in trees - unique behavior!",
          date: "2024-02-05",
          verified: true,
        },
      ],
    },
    {
      id: 21,
      slug: "mikumi-national-park",
      title: "Mikumi National Park",
      destination: "Tanzania",
      duration: "3 days",
      price: 750,
      category: "wildlife",
      rating: 4.2,
      reviewCount: 38,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Lions", "Elephants", "Giraffes", "Zebras", "Wildebeest"],
      description: "Easy-access safari to Mikumi National Park, often called 'little Serengeti'.",
      highlights: [
        "Mkata floodplain wildlife",
        "Night game drives",
        "Bird watching",
        "Scenic landscapes",
      ],
      included: [
        "Park entry fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Game drives",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Dar es Salaam to Mikumi",
          description: "Drive to Mikumi National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Mikumi Wildlife Camp",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Mikumi",
          description: "Full day exploring Mikumi National Park.",
          activities: ["Early morning game drive", "Bird watching", "Afternoon game drive", "Night game drive"],
          accommodation: "Mikumi Wildlife Camp",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Mikumi2017.jpg?updatedAt=1750081992116",
        "https://ik.imagekit.io/jinx/travel/mikumi-04-qwwsnsil1ordwxunpqurtcufxgoghimjj36xqjruy8.jpg?updatedAt=1750081990924",
      ],
      bestTime: "June to October (Dry season)",
      whatToBring: [
        "Safari clothing",
        "Binoculars",
        "Camera",
        "Sun protection",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 14 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Lisa Chen",
          rating: 4,
          comment: "Great alternative to Serengeti with fewer crowds!",
          date: "2024-01-15",
          verified: true,
        },
      ],
    },
    {
      id: 19,
      slug: "ruaha-national-park-safari",
      title: "Ruaha National Park",
      destination: "Tanzania",
      duration: "5 days",
      price: 1500,
      category: "wildlife",
      rating: 4.6,
      reviewCount: 29,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Lions", "Elephants", "Kudus", "Wild Dogs", "Leopards"],
      description: "Remote wilderness experience in Tanzania's largest national park with excellent predator sightings.",
      highlights: [
        "Excellent predator sightings",
        "Great Ruaha River",
        "Baobab-studded landscapes",
        "Exclusive wilderness",
      ],
      included: [
        "Park fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Game drives",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Dar es Salaam to Ruaha",
          description: "Fly to Ruaha National Park.",
          activities: ["Morning flight", "Game drive to camp", "Evening game drive"],
          accommodation: "Jongomero Camp",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Ruaha",
          description: "Full day exploring Ruaha National Park.",
          activities: ["Early morning game drive", "River wildlife viewing", "Afternoon game drive"],
          accommodation: "Jongomero Camp",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/baobab-trees-ruaha.jpg?updatedAt=1750014184839",
        "https://ik.imagekit.io/jinx/travel/ruaha-national-park-featured.jpg?updatedAt=1750082082679",
      ],
      bestTime: "June to October (Dry season)",
      whatToBring: [
        "Neutral-colored clothing",
        "Binoculars",
        "Camera",
        "Sun protection",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Thomas Wilson",
          rating: 5,
          comment: "Incredible predator sightings with no other vehicles around!",
          date: "2024-02-12",
          verified: true,
        },
      ],
    },
    {
      id: 23,
      slug: "katavi-national-park-safari",
      title: "Katavi National Park",
      destination: "Tanzania",
      duration: "4 days",
      price: 1800,
      category: "wildlife",
      rating: 4.5,
      reviewCount: 24,
      difficulty: "Moderate",
      groupSize: "2-6 people",
      wildlife: ["Buffalo Herds", "Hippos", "Crocodiles", "Lions", "Elephants"],
      description: "Remote and wild safari experience in Tanzania's most untouched national park.",
      highlights: [
        "Massive buffalo herds",
        "Hippo-filled pools",
        "Exclusive wilderness",
        "Walking safaris",
      ],
      included: [
        "Park fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Activities",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Dar es Salaam to Katavi",
          description: "Fly to Katavi National Park.",
          activities: ["Morning flight", "Game drive to camp", "Evening game drive"],
          accommodation: "Chada Katavi",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Katavi",
          description: "Full day exploring Katavi National Park.",
          activities: ["Morning game drive", "Walking safari", "Afternoon game drive"],
          accommodation: "Chada Katavi",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Katavi-National-Park-600x400.png?updatedAt=1750082243699",
        "https://ik.imagekit.io/jinx/travel/katavi-Hippo-pool.jpg?updatedAt=1750082243296",
      ],
      bestTime: "June to October (Dry season)",
      whatToBring: [
        "Neutral-colored clothing",
        "Walking shoes",
        "Binoculars",
        "Camera",
      ],
      physicalRequirements: "Moderate fitness for walking safaris.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Robert Johnson",
          rating: 5,
          comment: "Like having an entire national park to ourselves - incredible!",
          date: "2024-01-28",
          verified: true,
        },
      ],
    },
    {
      id: 25,
      slug: "pemba-island-diving",
      title: "Pemba Island Diving",
      destination: "Tanzania",
      duration: "5 days",
      price: 1200,
      category: "beach",
      rating: 4.7,
      reviewCount: 41,
      difficulty: "Moderate",
      groupSize: "2-8 people",
      description: "World-class diving around Pemba Island with pristine coral reefs and abundant marine life.",
      highlights: [
        "Wall dives",
        "Coral gardens",
        "Dolphin encounters",
        "Island relaxation",
      ],
      included: [
        "Diving equipment",
        "Professional guides",
        "Accommodation",
        "All meals",
        "Boat transfers",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Zanzibar to Pemba",
          description: "Boat transfer to Pemba Island.",
          activities: ["Morning departure", "Resort check-in", "Dive briefing"],
          accommodation: "Fundu Lagoon",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Diving",
          description: "Two-tank dive to explore Pemba's underwater world.",
          activities: ["Morning dive", "Afternoon dive", "Relaxation time"],
          accommodation: "Fundu Lagoon",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/pemba-island-Tanzania.webp?updatedAt=1750014959262",
        "https://ik.imagekit.io/jinx/travel/Pemba-Island-15.jpg?updatedAt=1750082340557",
      ],
      bestTime: "June to October, December to February",
      whatToBring: [
        "Swimwear",
        "Dive certification",
        "Underwater camera",
        "Sun protection",
      ],
      physicalRequirements: "Must be certified diver.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Sarah Williams",
          rating: 5,
          comment: "Some of the best wall dives I've experienced anywhere in the world!",
          date: "2024-02-18",
          verified: true,
        },
      ],
    },
    {
      id: 22,
      slug: "arusha-cultural-tour",
      title: "Arusha Cultural Tour",
      destination: "Tanzania",
      duration: "2 days",
      price: 300,
      category: "cultural",
      rating: 4.3,
      reviewCount: 35,
      difficulty: "Easy",
      groupSize: "2-12 people",
      description: "Cultural immersion with Maasai and other tribes around Arusha region.",
      highlights: [
        "Maasai village visit",
        "Traditional dances",
        "Local market tour",
        "Coffee plantation visit",
      ],
      included: [
        "Cultural fees",
        "Professional guide",
        "Accommodation",
        "All meals",
      ],
      excluded: [
        "Personal purchases",
        "Tips",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arusha Cultural Visits",
          description: "Visit Maasai and other tribal villages.",
          activities: ["Morning departure", "Maasai village visit", "Traditional dances", "Local market tour"],
          accommodation: "Arusha Coffee Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Coffee Tour - Return",
          description: "Visit coffee plantation and return to Arusha.",
          activities: ["Coffee plantation tour", "Traditional lunch", "Return to Arusha"],
          meals: "Breakfast, Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Cultural-Heritage-Center-Arusha-Tanzania-Place-listed-outside-view-with-sculptures-and-elephant-sculpture.jpg?updatedAt=1750082422699",
        "https://ik.imagekit.io/jinx/travel/Cultural-Heritage-Centre-Arusha-Tanzania.jpg?updatedAt=1750082496399",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Comfortable shoes",
        "Camera",
        "Small gifts for hosts (optional)",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 48 hours before departure.",
      reviews: [
        {
          id: 1,
          name: "David Kim",
          rating: 4,
          comment: "Authentic cultural experiences with very welcoming hosts.",
          date: "2024-01-22",
          verified: true,
        },
      ],
    },
  
    // Uganda Tours (25-33)
    {
      id: 34,
      slug: "bwindi-gorilla-trekking",
      title: "Bwindi Gorilla Trekking",
      destination: "Uganda",
      duration: "3 days",
      price: 1500,
      category: "wildlife",
      rating: 4.9,
      reviewCount: 142,
      difficulty: "Moderate",
      groupSize: "2-8 people",
      wildlife: ["Mountain Gorillas", "Forest Elephants", "Primates"],
      description: "Trek through Bwindi's dense forest to encounter endangered mountain gorillas.",
      highlights: [
        "Gorilla trekking experience",
        "Community visits",
        "Forest nature walks",
        "Cultural performances",
      ],
      included: [
        "Gorilla permits",
        "Professional guides",
        "Accommodation",
        "All meals",
        "Park fees",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Entebbe to Bwindi",
          description: "Fly to Bwindi Impenetrable National Park.",
          activities: ["Flight to Kihihi", "Transfer to lodge", "Briefing session"],
          accommodation: "Mahogany Springs",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Gorilla Trekking",
          description: "Full day gorilla trekking in Bwindi Forest.",
          activities: ["Early breakfast", "Trekking briefing", "Gorilla trekking", "Cultural visit"],
          accommodation: "Mahogany Springs",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Rushaga-Gorilla-Trekking-Sector.jpg?updatedAt=1750082585133",
        "https://ik.imagekit.io/jinx/travel/aa-750x450.jpg?updatedAt=1750082584976",
      ],
      bestTime: "June to September, December to February",
      whatToBring: [
        "Hiking boots",
        "Rain jacket",
        "Long pants and sleeves",
        "Gardening gloves",
      ],
      physicalRequirements: "Moderate fitness required for trekking.",
      cancellationPolicy: "Gorilla permits non-refundable.",
      reviews: [
        {
          id: 1,
          name: "Daniel Kim",
          rating: 5,
          comment: "Life-changing experience seeing gorillas in the wild!",
          date: "2024-02-18",
          verified: true,
        },
      ],
    },
    {
      id: 36,
      slug: "murchison-falls-national-park-safari",
      title: "Murchison Falls Adventure",
      destination: "Uganda",
      duration: "4 days",
      price: 950,
      category: "wildlife",
      rating: 4.6,
      reviewCount: 78,
      difficulty: "Easy",
      groupSize: "2-8 people",
      wildlife: ["Nile Crocodiles", "Hippos", "Elephants", "Giraffes", "Lions"],
      description: "Explore Murchison Falls National Park with its powerful waterfall and abundant wildlife.",
      highlights: [
        "Boat cruise to the falls",
        "Game drives",
        "Top of the falls hike",
        "Bird watching",
      ],
      included: [
        "Park fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Activities",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Entebbe to Murchison",
          description: "Drive to Murchison Falls National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Paraa Safari Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Murchison",
          description: "Game drive and boat cruise in Murchison Falls.",
          activities: ["Morning game drive", "Boat cruise to falls", "Top of falls hike"],
          accommodation: "Paraa Safari Lodge",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/murchison-falls.webp?updatedAt=1750022040416",
        "https://ik.imagekit.io/jinx/travel/murchison_1077.jpg?updatedAt=1750082693282",
      ],
      bestTime: "December to February, June to September",
      whatToBring: [
        "Safari clothing",
        "Binoculars",
        "Camera",
        "Sun protection",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Jessica Lee",
          rating: 5,
          comment: "The power of the falls is incredible, and we saw so much wildlife!",
          date: "2024-01-25",
          verified: true,
        },
      ],
    },
    {
      id: 37,
      slug: "kibale-national-park-chimpanzee-trekking",
      title: "Kibale Chimpanzee Tracking",
      destination: "Uganda",
      duration: "3 days",
      price: 850,
      category: "wildlife",
      rating: 4.7,
      reviewCount: 64,
      difficulty: "Moderate",
      groupSize: "2-8 people",
      wildlife: ["Chimpanzees", "Red Colobus Monkeys", "Forest Birds"],
      description: "Track chimpanzees in Kibale Forest, home to the highest concentration of primates in Africa.",
      highlights: [
        "Chimpanzee tracking",
        "Bigodi wetland walk",
        "Community visits",
        "Bird watching",
      ],
      included: [
        "Chimpanzee permits",
        "Professional guides",
        "Accommodation",
        "All meals",
        "Park fees",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Entebbe to Kibale",
          description: "Drive to Kibale National Park.",
          activities: ["Morning departure", "Scenic drive", "Evening nature walk"],
          accommodation: "Primate Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Chimpanzee Tracking",
          description: "Full day chimpanzee tracking in Kibale Forest.",
          activities: ["Morning tracking", "Bigodi wetland walk", "Community visit"],
          accommodation: "Primate Lodge",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/kibale-national-park-chimpanzees-uganda-590x390.jpg?updatedAt=1750015970496",
        "https://ik.imagekit.io/jinx/travel/kibale_M0mw.jpeg?updatedAt=1750082880040",
      ],
      bestTime: "June to September, December to February",
      whatToBring: [
        "Hiking boots",
        "Rain jacket",
        "Long pants and sleeves",
        "Binoculars",
      ],
      physicalRequirements: "Moderate fitness required for tracking.",
      cancellationPolicy: "Chimpanzee permits non-refundable.",
      reviews: [
        {
          id: 1,
          name: "Michael Brown",
          rating: 4,
          comment: "Amazing to see chimps so close in their natural habitat!",
          date: "2024-02-10",
          verified: true,
        },
      ],
    },
    {
      id: 28,
      slug: "gorilla-trekking-experience",
      title: "Gorilla Trekking Experience",
      destination: "Rwanda",
      duration: "3 days",
      price: 2500,
      category: "wildlife",
      rating: 5.0,
      reviewCount: 156,
      difficulty: "Moderate",
      groupSize: "2-8 people",
      wildlife: ["Mountain Gorillas", "Golden Monkeys", "Various Birds"],
      description: "An unforgettable encounter with mountain gorillas in Volcanoes National Park, Rwanda.",
      highlights: [
        "Mountain gorilla trekking",
        "Golden monkey tracking",
        "Dian Fossey tomb visit",
        "Cultural village experience",
      ],
      included: [
        "Airport transfers",
        "Gorilla trekking permits",
        "Professional guides",
        "Park fees",
        "Accommodation",
        "All meals",
        "Transportation",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
        "Tips",
        "Optional activities",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kigali - Transfer to Volcanoes National Park",
          description: "Arrive in Kigali and transfer to Volcanoes National Park.",
          activities: ["Airport pickup", "Kigali city tour", "Transfer to Musanze", "Hotel check-in"],
          accommodation: "Mountain Gorilla View Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Gorilla Trekking Day",
          description: "The highlight of your trip - gorilla trekking in Volcanoes National Park.",
          activities: ["Early breakfast", "Gorilla trekking briefing", "Gorilla trekking", "Cultural village visit"],
          accommodation: "Mountain Gorilla View Lodge",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/gorilla-trekking-experience-13.jpg?updatedAt=1750015182565",
        "https://ik.imagekit.io/jinx/travel/Magical-encounters-with-the-mountain-gorillas-of-Bwindi.jpg?updatedAt=1750015754767",
      ],
      bestTime: "June to September, December to February (Dry seasons)",
      whatToBring: ["Hiking boots", "Long pants and sleeves", "Rain jacket", "Gloves", "Camera", "Water bottle"],
      physicalRequirements: "Moderate fitness required. Trekking can be challenging with steep terrain.",
      cancellationPolicy: "Gorilla permits are non-refundable. Other costs refundable up to 30 days before.",
      reviews: [
        {
          id: 1,
          name: "David Thompson",
          rating: 5,
          comment: "Life-changing experience! Being so close to the gorillas was incredible.",
          date: "2024-01-25",
          verified: true,
        },
      ],
    },
    {
      id: 35,
      slug: "queen-elizabeth-national-park-safari",
      title: "Queen Elizabeth Safari",
      destination: "Uganda",
      duration: "4 days",
      price: 900,
      category: "wildlife",
      rating: 4.5,
      reviewCount: 72,
      difficulty: "Easy",
      groupSize: "2-8 people",
      wildlife: ["Tree-climbing Lions", "Elephants", "Hippos", "Chimpanzees"],
      description: "Diverse wildlife viewing in Queen Elizabeth National Park with boat safaris on Kazinga Channel.",
      highlights: [
        "Kazinga Channel boat cruise",
        "Tree-climbing lion sightings",
        "Game drives",
        "Chimpanzee tracking (optional)",
      ],
      included: [
        "Park fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Activities",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Entebbe to Queen Elizabeth",
          description: "Drive to Queen Elizabeth National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Mweya Safari Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Queen Elizabeth",
          description: "Game drive and boat cruise in Queen Elizabeth.",
          activities: ["Morning game drive", "Kazinga Channel cruise", "Afternoon game drive"],
          accommodation: "Mweya Safari Lodge",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Queen-Elizabeth-National-Park.jpg?updatedAt=1750021975764",
        "https://ik.imagekit.io/jinx/travel/queen_game-viewing.jpg?updatedAt=1750083085880",
      ],
      bestTime: "June to September, December to February",
      whatToBring: [
        "Safari clothing",
        "Binoculars",
        "Camera",
        "Sun protection",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Sarah Johnson",
          rating: 4,
          comment: "The boat cruise was amazing for seeing hippos and birds up close!",
          date: "2024-01-30",
          verified: true,
        },
      ],
    },
    {
      id: 38,
      slug: "lake-mburo-national-park-safari",
      title: "Lake Mburo National Park",
      destination: "Uganda",
      duration: "2 days",
      price: 450,
      category: "wildlife",
      rating: 4.3,
      reviewCount: 48,
      difficulty: "Easy",
      groupSize: "2-8 people",
      wildlife: ["Zebras", "Impala", "Eland", "Hippos", "Bird Species"],
      description: "Compact safari experience close to Kampala with boat rides and walking safaris.",
      highlights: [
        "Boat safari on Lake Mburo",
        "Walking safari",
        "Night game drive",
        "Bird watching",
      ],
      included: [
        "Park fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Activities",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kampala to Lake Mburo",
          description: "Drive to Lake Mburo National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Mihingo Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Lake Mburo",
          description: "Boat safari and walking safari in Lake Mburo.",
          activities: ["Morning boat safari", "Walking safari", "Return to Kampala"],
          meals: "Breakfast, Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/lake-mburo-national-park.jpg?updatedAt=1750016037012",
        "https://ik.imagekit.io/jinx/travel/The-Salt-Lick.jpg?updatedAt=1750083230613",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Safari clothing",
        "Binoculars",
        "Camera",
        "Comfortable walking shoes",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 7 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Robert Wilson",
          rating: 4,
          comment: "Great short safari option with excellent zebra sightings!",
          date: "2024-02-15",
          verified: true,
        },
      ],
    },
    {
      id: 40,
      slug: "jinja-adventure-tour",
      title: "Jinja White Water Rafting",
      destination: "Uganda",
      duration: "2 days",
      price: 350,
      category: "adventure",
      rating: 4.8,
      reviewCount: 92,
      difficulty: "Moderate",
      groupSize: "2-12 people",
      description: "Thrilling white water rafting on the Nile River with grade 5 rapids.",
      highlights: [
        "White water rafting",
        "Nile River scenery",
        "Optional bungee jumping",
        "Source of the Nile visit",
      ],
      included: [
        "Rafting equipment",
        "Professional guides",
        "Accommodation",
        "All meals",
      ],
      excluded: [
        "Personal insurance",
        "Tips",
        "Optional activities",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kampala to Jinja",
          description: "Transfer to Jinja for rafting adventure.",
          activities: ["Morning departure", "Safety briefing", "Afternoon rafting"],
          accommodation: "Nile River Camp",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Source of the Nile - Return",
          description: "Visit the source of the Nile and return to Kampala.",
          activities: ["Source of the Nile visit", "Optional activities", "Return to Kampala"],
          meals: "Breakfast, Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/nile-river-rafting-itanda.jpg?updatedAt=1750016190875",
        "https://ik.imagekit.io/jinx/travel/6-days-gorilla-tracking-and-rafting-jinja.jpg?updatedAt=1750083327865",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Swimwear",
        "Water shoes",
        "Sun protection",
        "Change of clothes",
      ],
      physicalRequirements: "Moderate fitness required.",
      cancellationPolicy: "Free cancellation up to 48 hours before departure.",
      reviews: [
        {
          id: 1,
          name: "Mark Johnson",
          rating: 5,
          comment: "Incredible adrenaline rush with professional guides!",
          date: "2024-01-20",
          verified: true,
        },
      ],
    },
    {
      id: 42,
      slug: "ssese-islands-beach-holiday",
      title: "Ssese Islands Beach Holiday",
      destination: "Uganda",
      duration: "4 days",
      price: 650,
      category: "beach",
      rating: 4.4,
      reviewCount: 37,
      difficulty: "Easy",
      groupSize: "2-8 people",
      description: "Relaxation on Lake Victoria's beautiful Ssese Islands with water activities.",
      highlights: [
        "Beach relaxation",
        "Boat rides",
        "Fishing excursions",
        "Nature walks",
      ],
      included: [
        "Boat transfers",
        "Accommodation",
        "All meals",
        "Some activities",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Entebbe to Ssese Islands",
          description: "Boat transfer to Ssese Islands.",
          activities: ["Morning departure", "Island orientation", "Beach relaxation"],
          accommodation: "Pearl Gardens Beach Hotel",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Island Relaxation",
          description: "Enjoy island activities and relaxation.",
          activities: ["Boat ride", "Fishing", "Beach time", "Sunset viewing"],
          accommodation: "Pearl Gardens Beach Hotel",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Travel-to-Ssese-islands.jpg?updatedAt=1750016305699",
        "https://ik.imagekit.io/jinx/travel/ssese-islands-beach-hotel.jpg?updatedAt=1750083416010",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Swimwear",
        "Light clothing",
        "Sun protection",
        "Camera",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 14 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Lisa Chen",
          rating: 4,
          comment: "Beautiful peaceful getaway on Lake Victoria!",
          date: "2024-02-05",
          verified: true,
        },
      ],
    },
    {
      id: 39,
      slug: "rwenzori-mountains-hiking",
      title: "Rwenzori Mountains Hiking",
      destination: "Uganda",
      duration: "7 days",
      price: 1800,
      category: "hiking",
      rating: 4.8,
      reviewCount: 32,
      difficulty: "Challenging",
      groupSize: "2-6 people",
      description: "Trek through the mystical Mountains of the Moon with unique flora and landscapes.",
      highlights: [
        "Margherita Peak (optional)",
        "Unique alpine vegetation",
        "Glacial lakes",
        "Scenic mountain views",
      ],
      included: [
        "Park fees",
        "Professional guides",
        "Porters",
        "Camping equipment",
        "All meals",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Personal hiking gear",
        "Travel insurance",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kampala to Rwenzori",
          description: "Transfer to Rwenzori Mountains National Park.",
          activities: ["Morning departure", "Briefing session", "Equipment check"],
          accommodation: "Ruboni Community Camp",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Start Trekking",
          description: "Begin ascent through montane forest.",
          activities: ["Trek to Nyabitaba Hut", "Forest wildlife viewing"],
          accommodation: "Nyabitaba Hut",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Rwenzori-Mountains-03_1600p.jpg?updatedAt=1750016117660",
        "https://ik.imagekit.io/jinx/travel/1172_ruwenzori.jpg?updatedAt=1750083489411",
      ],
      bestTime: "June to August, December to February",
      whatToBring: [
        "Hiking boots",
        "Warm clothing",
        "Rain gear",
        "Sleeping bag",
      ],
      physicalRequirements: "Good physical fitness required.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "James Peterson",
          rating: 5,
          comment: "Challenging but rewarding trek with stunning scenery!",
          date: "2024-02-08",
          verified: true,
        },
      ],
    },
  
    // Rwanda Tours (34-36)
    {
      id: 31,
      slug: "akagera-national-park-safari",
      title: "Akagera National Park",
      destination: "Rwanda",
      duration: "2 days",
      price: 600,
      category: "wildlife",
      rating: 4.5,
      reviewCount: 56,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Lions", "Elephants", "Giraffes", "Hippos", "Rhinos"],
      description: "Game drives and boat safaris in Rwanda's only Big Five national park.",
      highlights: [
        "Big Five sightings",
        "Lake Ihema boat safari",
        "Scenic landscapes",
        "Bird watching",
      ],
      included: [
        "Park fees",
        "Professional guide",
        "Accommodation",
        "All meals",
        "Activities",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kigali to Akagera",
          description: "Drive to Akagera National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Ruzizi Tented Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Akagera",
          description: "Game drive and boat safari in Akagera.",
          activities: ["Morning game drive", "Boat safari", "Return to Kigali"],
          meals: "Breakfast, Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Akagera-national-park-1-750x450.jpg?updatedAt=1750015552704",
        "https://ik.imagekit.io/jinx/travel/Akagera-e1575031068754rwanda.jpg?updatedAt=1750083872128",
      ],
      bestTime: "June to September, December to February",
      whatToBring: [
        "Safari clothing",
        "Binoculars",
        "Camera",
        "Sun protection",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 7 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Emma Wilson",
          rating: 4,
          comment: "Great to see lions and rhinos back in Rwanda!",
          date: "2024-01-18",
          verified: true,
        },
      ],
    },
    {
      id: 32,
      slug: "kigali-city-tour",
      title: "Kigali City Tour",
      destination: "Rwanda",
      duration: "1 day",
      price: 120,
      category: "cultural",
      rating: 4.6,
      reviewCount: 84,
      difficulty: "Easy",
      groupSize: "2-12 people",
      description: "Explore Rwanda's clean and vibrant capital city with its moving genocide memorial.",
      highlights: [
        "Genocide Memorial visit",
        "Local markets",
        "Craft centers",
        "City viewpoints",
      ],
      included: [
        "Professional guide",
        "Transportation",
        "Entrance fees",
      ],
      excluded: [
        "Personal purchases",
        "Tips",
      ],
      itinerary: [
        {
          day: 1,
          title: "Full Day Kigali",
          description: "Explore Kigali's key sites.",
          activities: ["Genocide Memorial", "Local markets", "Craft centers", "City viewpoints"],
          meals: "Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/kigali-photo-600x300.jpg?updatedAt=1750083981249",
        "https://ik.imagekit.io/jinx/travel/kigali-750x450.png?updatedAt=1750083982309",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Comfortable shoes",
        "Camera",
        "Light jacket",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 24 hours before departure.",
      reviews: [
        {
          id: 1,
          name: "David Kim",
          rating: 5,
          comment: "The genocide memorial is very moving and important to visit.",
          date: "2024-02-12",
          verified: true,
        },
      ],
    },
    {
      id: 29,
      slug: "nyungwe-forest-canopy-walk",
      title: "Nyungwe Forest Canopy Walk",
      destination: "Rwanda",
      duration: "3 days",
      price: 750,
      category: "wildlife",
      rating: 4.7,
      reviewCount: 49,
      difficulty: "Moderate",
      groupSize: "2-8 people",
      wildlife: ["Chimpanzees", "Colobus Monkeys", "Forest Birds"],
      description: "Canopy walk and primate tracking in Nyungwe Forest, one of Africa's oldest rainforests.",
      highlights: [
        "Canopy walkway",
        "Chimpanzee tracking",
        "Colobus monkey troops",
        "Waterfall hikes",
      ],
      included: [
        "Park fees",
        "Professional guides",
        "Accommodation",
        "All meals",
        "Activities",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kigali to Nyungwe",
          description: "Drive to Nyungwe Forest National Park.",
          activities: ["Morning departure", "Scenic drive", "Evening nature walk"],
          accommodation: "Nyungwe Forest Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Nyungwe",
          description: "Canopy walk and primate tracking in Nyungwe.",
          activities: ["Morning canopy walk", "Primate tracking", "Waterfall hike"],
          accommodation: "Nyungwe Forest Lodge",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/nyungwe-forests.jpg?updatedAt=1750019999650",
        "https://ik.imagekit.io/jinx/travel/Walk-trail-nyungwe-Usoke-explorers.jpg?updatedAt=1750015272732",
      ],
      bestTime: "June to September, December to February",
      whatToBring: [
        "Hiking boots",
        "Rain jacket",
        "Binoculars",
        "Camera",
      ],
      physicalRequirements: "Moderate fitness required for hiking.",
      cancellationPolicy: "Free cancellation up to 14 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Sarah Williams",
          rating: 5,
          comment: "The canopy walk was breathtaking and we saw so many monkeys!",
          date: "2024-01-28",
          verified: true,
        },
      ],
    },
  
    // Multi-Country Tours (37-42)
    {
      id: 27,
      slug: "northern-circuit-safari",
      title: "Northern Circuit Safari",
      destination: "Tanzania",
      duration: "8 days",
      price: 3200,
      category: "wildlife",
      rating: 4.9,
      reviewCount: 76,
      difficulty: "Easy",
      groupSize: "2-6 people",
      wildlife: ["Big Five", "Great Migration", "Flamingos"],
      description: "Comprehensive safari covering Serengeti, Ngorongoro, Tarangire and Lake Manyara.",
      highlights: [
        "Great Migration viewing",
        "Ngorongoro Crater descent",
        "Tarangire elephants",
        "Lake Manyara tree-climbing lions",
      ],
      included: [
        "All park fees",
        "Professional guide",
        "Luxury lodges",
        "All meals",
        "Game drives",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arusha to Tarangire",
          description: "Drive to Tarangire National Park.",
          activities: ["Morning departure", "Game drive en route", "Evening game drive"],
          accommodation: "Tarangire Safari Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Tarangire to Serengeti",
          description: "Transfer to Serengeti National Park.",
          activities: ["Morning game drive", "Transfer to Serengeti", "Evening game drive"],
          accommodation: "Serengeti Serena Lodge",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/tz1-750x450.jpg?updatedAt=1750084155377",
        "https://ik.imagekit.io/jinx/travel/images%20(6).jpeg?updatedAt=1750084177376",
      ],
      bestTime: "June to October (Dry season)",
      whatToBring: [
        "Safari clothing",
        "Binoculars",
        "Camera",
        "Light jacket",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 30 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Sarah Williams",
          rating: 5,
          comment: "Saw all the Big Five and the migration was spectacular!",
          date: "2024-01-30",
          verified: true,
        },
      ],
    },
    {
      id: 30,
      slug: "lake-kivu-relaxation",
      title: "Lake Kivu Relaxation",
      destination: "Rwanda",
      duration: "3 days",
      price: 550,
      category: "beach",
      rating: 4.5,
      reviewCount: 42,
      difficulty: "Easy",
      groupSize: "2-8 people",
      description: "Relaxation on the shores of beautiful Lake Kivu with optional water activities.",
      highlights: [
        "Lake shore relaxation",
        "Boat rides",
        "Coffee plantation visit",
        "Hot springs",
      ],
      included: [
        "Accommodation",
        "All meals",
        "Some activities",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kigali to Lake Kivu",
          description: "Transfer to Lake Kivu.",
          activities: ["Morning departure", "Lakeside check-in", "Relaxation"],
          accommodation: "Lake Kivu Serena Hotel",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Lake Kivu",
          description: "Enjoy lake activities and relaxation.",
          activities: ["Boat ride", "Coffee plantation", "Hot springs visit"],
          accommodation: "Lake Kivu Serena Hotel",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/Lake-Kivu-Islands.jpg?updatedAt=1750084417678",
        "https://ik.imagekit.io/jinx/travel/worlds-greatest-places-2021-Lake-Kivu-Rwanda_001.webp?updatedAt=1750084445957",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Swimwear",
        "Light clothing",
        "Sun protection",
        "Camera",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 14 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Michael Chen",
          rating: 4,
          comment: "Beautiful peaceful lake with stunning sunsets!",
          date: "2024-02-15",
          verified: true,
        },
      ],
    },
    {
      id: 41,
      slug: "lake-bunyonyi-relaxation-tour",
      title: "Lake Bunyonyi Relaxation",
      destination: "Uganda",
      duration: "3 days",
      price: 500,
      category: "beach",
      rating: 4.6,
      reviewCount: 38,
      difficulty: "Easy",
      groupSize: "2-8 people",
      description: "Peaceful retreat at Uganda's deepest lake surrounded by terraced hills.",
      highlights: [
        "Island boat rides",
        "Cultural visits",
        "Bird watching",
        "Relaxation",
      ],
      included: [
        "Accommodation",
        "All meals",
        "Boat rides",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kampala to Lake Bunyonyi",
          description: "Transfer to Lake Bunyonyi.",
          activities: ["Morning departure", "Lakeside check-in", "Sunset viewing"],
          accommodation: "Bunyonyi Overlook Resort",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Full Day Lake Bunyonyi",
          description: "Enjoy lake activities and relaxation.",
          activities: ["Island boat ride", "Cultural visit", "Bird watching"],
          accommodation: "Bunyonyi Overlook Resort",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/lake-bunyonyi-uganda.webp?updatedAt=1750016252501",
        "https://ik.imagekit.io/jinx/travel/lake_bunyonyi__uganda-the-pearl-of-africa.webp?updatedAt=1750004263683",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Light clothing",
        "Binoculars",
        "Camera",
        "Swimwear",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 14 days before departure.",
      reviews: [
        {
          id: 1,
          name: "Jessica Lee",
          rating: 5,
          comment: "The most peaceful place I've ever been - stunning scenery!",
          date: "2024-01-22",
          verified: true,
        },
      ],
    },
    {
      id: 26,
      slug: "stone-town-heritage-tour",
      title: "Stone Town Heritage Tour",
      destination: "Tanzania",
      duration: "2 days",
      price: 350,
      category: "cultural",
      rating: 4.4,
      reviewCount: 67,
      difficulty: "Easy",
      groupSize: "2-12 people",
      description: "Explore the historic streets and rich culture of Zanzibar's Stone Town.",
      highlights: [
        "Historic buildings",
        "Spice market",
        "Old Fort",
        "Forodhani Gardens night market",
      ],
      included: [
        "Professional guide",
        "Accommodation",
        "Breakfast",
        "Entrance fees",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Stone Town",
          description: "Orientation and walking tour of Stone Town.",
          activities: ["Airport pickup", "Walking tour", "Sunset at Forodhani Gardens"],
          accommodation: "Dhow Palace Hotel",
          meals: "Breakfast",
        },
        {
          day: 2,
          title: "Full Day Stone Town",
          description: "Explore Stone Town's historic sites.",
          activities: ["Slave market museum", "Spice market", "Old Fort", "Freddie Mercury Museum"],
          accommodation: "Dhow Palace Hotel",
          meals: "Breakfast",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/zanzibar-stone-town-view-min-800x600.jpg?updatedAt=1750081120662",
        "https://ik.imagekit.io/jinx/travel/31719088_tourists-on-a-typical-narrow-street-in-stone-town-zanzibar-e1713023620250.jpg?updatedAt=1750081033831",
      ],
      bestTime: "All year round",
      whatToBring: [
        "Comfortable walking shoes",
        "Light clothing",
        "Camera",
        "Sun protection",
      ],
      physicalRequirements: "Low physical fitness required.",
      cancellationPolicy: "Free cancellation up to 48 hours before departure.",
      reviews: [
        {
          id: 1,
          name: "Robert Wilson",
          rating: 4,
          comment: "Fascinating history and architecture in Stone Town!",
          date: "2024-02-08",
          verified: true,
        },
      ],
    },
    {
      id: 24,
      slug: "mahale-mountains-national-park-chimpanzee-trekking",
      title: "Mahale Chimpanzee Trek",
      destination: "Tanzania",
      duration: "4 days",
      price: 2800,
      category: "wildlife",
      rating: 4.8,
      reviewCount: 38,
      difficulty: "Moderate",
      groupSize: "2-6 people",
      wildlife: ["Chimpanzees", "Colobus Monkeys", "Lake Tanganyika fish"],
      description: "Trek to see wild chimpanzees in Mahale Mountains National Park on Lake Tanganyika.",
      highlights: [
        "Chimpanzee trekking",
        "Lake Tanganyika relaxation",
        "Forest walks",
        "Boat safaris",
      ],
      included: [
        "Park fees",
        "Chimpanzee permits",
        "Boat transfers",
        "Full board accommodation",
        "Professional guides",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Mahale",
          description: "Boat transfer to Mahale Mountains National Park.",
          activities: ["Flight to Kigoma", "Boat transfer", "Orientation walk"],
          accommodation: "Greystoke Mahale",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Chimpanzee Trekking",
          description: "Full day chimpanzee trekking in the forest.",
          activities: ["Morning trek", "Afternoon relaxation", "Sunset boat cruise"],
          accommodation: "Greystoke Mahale",
          meals: "Breakfast, Lunch, Dinner",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/c2a4f1d9-5332-42ab-9ad3-31d99823d5a8_5-day-gombe-and-mahale-national-park-chimpanzee-trekking-xlarge.jpg?updatedAt=1750014593270",
        "https://ik.imagekit.io/jinx/travel/Chimp-Group-Mahale-Mountain-JEP_8612.jpg?updatedAt=1750084636722",
      ],
      bestTime: "June to October (Dry season)",
      whatToBring: [
        "Hiking boots",
        "Rain jacket",
        "Long pants and sleeves",
        "Binoculars",
      ],
      physicalRequirements: "Moderate fitness required for trekking.",
      cancellationPolicy: "Chimpanzee permits non-refundable.",
      reviews: [
        {
          id: 1,
          name: "Robert Johnson",
          rating: 5,
          comment: "Incredible experience walking with chimps in their natural habitat!",
          date: "2024-02-05",
          verified: true,
        },
      ],
    },
    {
      id: 33,
      slug: "golden-monkey-tracking",
      title: "Golden Monkey Tracking",
      destination: "Rwanda",
      duration: "2 days",
      price: 800,
      category: "wildlife",
      rating: 4.7,
      reviewCount: 45,
      difficulty: "Moderate",
      groupSize: "2-8 people",
      wildlife: ["Golden Monkeys", "Various Birds"],
      description: "Track endangered golden monkeys in Volcanoes National Park's bamboo forests.",
      highlights: [
        "Golden monkey tracking",
        "Scenic volcano views",
        "Cultural village visit",
        "Nature walks",
      ],
      included: [
        "Park fees",
        "Golden monkey permits",
        "Professional guides",
        "Accommodation",
        "All meals",
      ],
      excluded: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kigali to Volcanoes",
          description: "Transfer to Volcanoes National Park.",
          activities: ["Morning departure", "Scenic drive", "Cultural village visit"],
          accommodation: "Mountain Gorilla View Lodge",
          meals: "Lunch, Dinner",
        },
        {
          day: 2,
          title: "Golden Monkey Tracking",
          description: "Track golden monkeys in bamboo forest.",
          activities: ["Morning tracking", "Nature walk", "Return to Kigali"],
          meals: "Breakfast, Lunch",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/jinx/travel/golden-monkey-volcanoe-national-park.jpg?updatedAt=1750017679149",
        "https://ik.imagekit.io/jinx/travel/golden-monkey-trekking.jpg?updatedAt=1750015688667",
      ],
      bestTime: "June to September, December to February",
      whatToBring: [
        "Hiking boots",
        "Rain jacket",
        "Long pants and sleeves",
        "Camera",
      ],
      physicalRequirements: "Moderate fitness required for tracking.",
      cancellationPolicy: "Golden monkey permits non-refundable.",
      reviews: [
        {
          id: 1,
          name: "Sarah Thompson",
          rating: 5,
          comment: "The golden monkeys were playful and beautiful to observe!",
          date: "2024-01-15",
          verified: true,
        },
      ],
    }
  ];

export default function TourDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Find tour by slug or ID
  const tour = toursData.find((t) => t.slug === params.slug || t.id.toString() === params.slug)

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-4">The tour you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/tours")} className="bg-orange-600 hover:bg-orange-700">
            Back to Tours
          </Button>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={tour.gallery[currentImageIndex]}
            alt={tour.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
          onClick={prevImage}
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
          onClick={nextImage}
        >
          <ChevronRight size={24} />
        </Button>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-orange-600 text-white">
                  {tour.category}
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  {tour.difficulty}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{tour.destination}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{tour.groupSize}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span>
                    {tour.rating} ({tour.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {tour.gallery.map((_, index) => (
            <button
              title="Select Image"
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Tour</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{tour.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Highlights</h4>
                        <ul className="space-y-1">
                          {tour.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {tour.wildlife && tour.wildlife.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Wildlife to See</h4>
                          <div className="flex flex-wrap gap-2">
                            {tour.wildlife.map((animal, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {animal}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600">What's Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tour.included.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600">What's Excluded</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tour.excluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Important Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Best Time to Visit</h4>
                      <p className="text-sm text-gray-600">{tour.bestTime}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Physical Requirements</h4>
                      <p className="text-sm text-gray-600">{tour.physicalRequirements}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">What to Bring</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {tour.whatToBring.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                      <p className="text-sm text-gray-600">{tour.cancellationPolicy}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="itinerary" className="space-y-4">
                {tour.itinerary.map((day, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline">Day {day.day}</Badge>
                        {day.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{day.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h5 className="font-semibold mb-2">Activities</h5>
                          <ul className="space-y-1">
                            {day.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {day.accommodation && (
                          <div>
                            <h5 className="font-semibold mb-2">Accommodation</h5>
                            <p>{day.accommodation}</p>
                          </div>
                        )}
                        {day.meals && (
                          <div>
                            <h5 className="font-semibold mb-2">Meals</h5>
                            <p>{day.meals}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="gallery" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tour.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${tour.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="fill-yellow-400 text-yellow-400" size={24} />
                    <span className="text-2xl font-bold">{tour.rating}</span>
                  </div>
                  <div className="text-gray-600">Based on {tour.reviewCount} reviews</div>
                </div>

                {tour.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{review.name}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Book This Tour</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    {tour.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${tour.originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold text-orange-600">${tour.price}</span>
                    <span className="text-gray-600"> per person</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span>{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span>{tour.destination}</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                  <Link href={`/tours/${tour.slug}/book`}>Book Now</Link>
                </Button>

                <Button variant="outline" className="w-full">
                  Contact Us
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Free cancellation up to 24 hours before the tour
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
