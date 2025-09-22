"use client"

import { useState } from "react"
import { notFound } from "next/navigation";
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

interface PageProps {
  params: { slug?: string };
}

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
  // Kenya Tours
    {
      id: 1,
      slug: "masai-mara-safari-adventure",
      title: "Masai Mara JaeTravel Expeditions",
      destination: "Kenya",
      duration: "5 days",
      price: 1200,
      category: "wildlife",
      rating: 4.9,
      reviewCount: 127,
      image: "https://ik.imagekit.io/jinx/travel/_8502543-1.jpg?updatedAt=1750002814593?height=200&width=300"
    },
    {
      id: 2,
      slug: "amboseli-elephant-safari",
      title: "Amboseli Elephant Safari",
      destination: "Kenya",
      duration: "4 days",
      price: 980,
      category: "wildlife",
      rating: 4.7,
      reviewCount: 98,
      image: "https://ik.imagekit.io/jinx/travel/amboseli-elephants-00007.jpg?updatedAt=1750008046158?height=200&width=300"
    },
    {
      id: 3,
      slug: "samburu-game-reserve",
      title: "Samburu Game Reserve",
      destination: "Kenya",
      duration: "3 days",
      price: 750,
      category: "wildlife",
      rating: 4.6,
      reviewCount: 85,
      image: "https://ik.imagekit.io/jinx/travel/Samburu_National_Reserve,_Kenya-26December2012.jpg?updatedAt=1750008245147?height=200&width=300"
    },
    {
      id: 4,
      slug: "lake-nakuru-flamingo-spectacle",
      title: "Lake Nakuru Flamingo Tour",
      destination: "Kenya",
      duration: "2 days",
      price: 450,
      category: "photography",
      rating: 4.5,
      reviewCount: 76,
      image: "https://ik.imagekit.io/jinx/travel/lake-nakuru-flamingos-in-red-sunset-590x390.jpg?updatedAt=1750008429931?height=200&width=300"
    },
    {
      id: 5,
      slug: "tsavo-east-west-adventure",
      title: "Tsavo East & West Safari",
      destination: "Kenya",
      duration: "6 days",
      price: 1350,
      category: "wildlife",
      rating: 4.8,
      reviewCount: 112,
      image: "https://ik.imagekit.io/jinx/travel/tsavo-west-national-park-chyulu-gate.jpg.webp?updatedAt=1750012915321?height=200&width=300"
    },
    {
      id: 6,
      slug: "mombasa-coastal-safari",
      title: "Mombasa Beach & Safari",
      destination: "Kenya",
      duration: "7 days",
      price: 1600,
      category: "adventure",
      rating: 4.7,
      reviewCount: 104,
      image: "https://ik.imagekit.io/jinx/travel/kenya-beach-safari-prices-jt-safaris-julius-safaris-diani-beach.jpg?updatedAt=1750012979870?height=200&width=300"
    },
    {
      id: 7,
      slug: "mount-kenya-climbing-Expeditions",
      title: "Mount Kenya Climbing",
      destination: "Kenya",
      duration: "5 days",
      price: 1100,
      category: "adventure",
      rating: 4.4,
      reviewCount: 68,
      image: "https://ik.imagekit.io/jinx/travel/mt-kenya.jpg?updatedAt=1750013071132?height=200&width=300"
    },
    {
      id: 8,
      slug: "laikipia-conservancy",
      title: "Laikipia Conservancy",
      destination: "Kenya",
      duration: "4 days",
      price: 1250,
      category: "conservation",
      rating: 4.8,
      reviewCount: 92,
      image: "https://ik.imagekit.io/jinx/travel/lewa-safari-camp---bush-walk.jpg?updatedAt=1750013183762?height=200&width=300"
    },
    {
      id: 9,
      slug: "hell-gate-lake-naivasha-adventure",
      title: "Hell's Gate Adventure",
      destination: "Kenya",
      duration: "2 days",
      price: 380,
      category: "adventure",
      rating: 4.3,
      reviewCount: 57,
      image: "https://ik.imagekit.io/jinx/travel/861661.jpg?updatedAt=1750013290458?height=200&width=300"
    },
    {
      id: 10,
      slug: "maasai-cultural-experience",
      title: "Maasai Cultural Experience",
      destination: "Kenya",
      duration: "3 days",
      price: 650,
      category: "culture",
      rating: 4.6,
      reviewCount: 83,
      image: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg?updatedAt=1750013375250?height=200&width=300"
    },
    {
      id: 11,
      slug: "aberdare-national-park-safari",
      title: "Aberdare National Park",
      destination: "Kenya",
      duration: "3 days",
      price: 720,
      category: "wildlife",
      rating: 4.5,
      reviewCount: 74,
      image: "https://ik.imagekit.io/jinx/travel/Aberdare.jpg?updatedAt=1750013499302?height=200&width=300"
    },
    {
      id: 12,
      slug: "diani-beach-safari-combo",
      title: "Diani Beach Safari Combo",
      destination: "Kenya",
      duration: "8 days",
      price: 1800,
      category: "adventure",
      rating: 4.9,
      reviewCount: 118,
      image: "https://ik.imagekit.io/jinx/travel/caption-1.jpg?updatedAt=1750013703250?height=200&width=300"
    },
    {
      id: 13,
      slug: "serengeti-wildlife-safari",
      title: "Serengeti Wildlife Safari",
      destination: "Tanzania",
      duration: "7 days",
      price: 1800,
      category: "wildlife",
      rating: 4.8,
      reviewCount: 132,
      image: "https://ik.imagekit.io/jinx/travel/Game-Drive-north-of-Serengeti-National-Park.jpg?updatedAt=1750013774565?height=200&width=300"
    },
    {
      id: 14,
      slug: "ngorongoro-crater-safari",
      title: "Ngorongoro Crater Tour",
      destination: "Tanzania",
      duration: "3 days",
      price: 950,
      category: "wildlife",
      rating: 4.9,
      reviewCount: 145,
      image: "https://ik.imagekit.io/jinx/travel/Ngorongoro-Crater.jpg?updatedAt=1750013843530?height=200&width=300"
    },
    {
      id: 15,
      slug: "kilimanjaro-climbing-Expeditions",
      title: "Kilimanjaro Climbing",
      destination: "Tanzania",
      duration: "8 days",
      price: 2200,
      category: "adventure",
      rating: 4.7,
      reviewCount: 107,
      image: "https://ik.imagekit.io/jinx/travel/kilimanjaro-moutain-climbing.jpg?updatedAt=1750013910253?height=200&width=300"
    },
    {
      id: 16,
      slug: "tarangire-national-park-safari",
      title: "Tarangire Elephant Safari",
      destination: "Tanzania",
      duration: "4 days",
      price: 1100,
      category: "wildlife",
      rating: 4.6,
      reviewCount: 89,
      image: "https://ik.imagekit.io/jinx/travel/TA-1.jpg?updatedAt=1750013999268?height=200&width=300"
    },
    {
      id: 17,
      slug: "lake-manyara-national-park-safari",
      title: "Lake Manyara Tree Climbing Lions",
      destination: "Tanzania",
      duration: "2 days",
      price: 580,
      category: "wildlife",
      rating: 4.4,
      reviewCount: 63,
      image: "https://ik.imagekit.io/jinx/travel/04tb-treelions1-facebookJumbo-1.jpg?updatedAt=1750014060199?height=200&width=300"
    },
    {
      id: 18,
      slug: "zanzibar-beach-holiday",
      title: "Zanzibar Spice Island",
      destination: "Tanzania",
      duration: "5 days",
      price: 1300,
      category: "culture",
      rating: 4.8,
      reviewCount: 121,
      image: "https://ik.imagekit.io/jinx/travel/160829145810-zanzibar-11-rock.jpg?updatedAt=1750014122225?height=200&width=300"
    },
    {
      id: 19,
      slug: "ruaha-national-park-safari",
      title: "Ruaha National Park",
      destination: "Tanzania",
      duration: "6 days",
      price: 1450,
      category: "wildlife",
      rating: 4.5,
      reviewCount: 78,
      image: "https://ik.imagekit.io/jinx/travel/baobab-trees-ruaha.jpg?updatedAt=1750014184839?height=200&width=300"
    },
    {
      id: 20,
      slug: "selous-game-reserve-safari",
      title: "Selous Game Reserve",
      destination: "Tanzania",
      duration: "5 days",
      price: 1350,
      category: "wildlife",
      rating: 4.7,
      reviewCount: 96,
      image: "https://ik.imagekit.io/jinx/travel/images%20(1).jpeg?updatedAt=1750014262541?height=200&width=300"
    },
    {
      id: 21,
      slug: "mikumi-national-park",
      title: "Mikumi National Park",
      destination: "Tanzania",
      duration: "3 days",
      price: 750,
      category: "wildlife",
      rating: 4.3,
      reviewCount: 59,
      image: "https://ik.imagekit.io/jinx/travel/M6.jpg?updatedAt=1750014335135?height=200&width=300"
    },
    {
      id: 22,
      slug: "arusha-cultural-tour",
      title: "Arusha Cultural Tour",
      destination: "Tanzania",
      duration: "2 days",
      price: 420,
      category: "culture",
      rating: 4.2,
      reviewCount: 47,
      image: "https://ik.imagekit.io/jinx/travel/1687776506_755574c936615bdeeefd.webp?updatedAt=1750014412685?height=200&width=300"
    },
    {
      id: 23,
      slug: "katavi-national-park-safari",
      title: "Katavi National Park",
      destination: "Tanzania",
      duration: "4 days",
      price: 1600,
      category: "wildlife",
      rating: 4.6,
      reviewCount: 82,
      image: "https://ik.imagekit.io/jinx/travel/images%20(2).jpeg?updatedAt=1750014524461?height=200&width=300"
    },
    {
      id: 24,
      slug: "mahale-mountains-national-park-chimpanzee-trekking",
      title: "Mahale Chimpanzee Trek",
      destination: "Tanzania",
      duration: "6 days",
      price: 2100,
      category: "wildlife",
      rating: 4.9,
      reviewCount: 113,
      image: "https://ik.imagekit.io/jinx/travel/c2a4f1d9-5332-42ab-9ad3-31d99823d5a8_5-day-gombe-and-mahale-national-park-chimpanzee-trekking-xlarge.jpg?updatedAt=1750014593270?height=200&width=300"
    },
    {
      id: 25,
      slug: "pemba-island-diving",
      title: "Pemba Island Diving",
      destination: "Tanzania",
      duration: "4 days",
      price: 980,
      category: "adventure",
      rating: 4.5,
      reviewCount: 71,
      image: "https://ik.imagekit.io/jinx/travel/pemba-island-Tanzania.webp?updatedAt=1750014959262?height=200&width=300"
    },
    {
      id: 26,
      slug: "stone-town-heritage-tour",
      title: "Stone Town Heritage Tour",
      destination: "Tanzania",
      duration: "2 days",
      price: 350,
      category: "culture",
      rating: 4.4,
      reviewCount: 65,
      image: "https://ik.imagekit.io/jinx/travel/51.jpg?updatedAt=1750015033324?height=200&width=300"
    },
    {
      id: 27,
      slug: "northern-circuit-safari",
      title: "Northern Circuit Safari",
      destination: "Tanzania",
      duration: "10 days",
      price: 2800,
      category: "wildlife",
      rating: 4.9,
      reviewCount: 128,
      image: "https://ik.imagekit.io/jinx/travel/images%20(3).jpeg?updatedAt=1750015098700?height=200&width=300"
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
      image: "https://ik.imagekit.io/jinx/travel/gorilla-trekking-experience-13.jpg?updatedAt=1750015182565?height=200&width=300"
    },
    {
      id: 29,
      slug: "nyungwe-forest-canopy-walk",
      title: "Nyungwe Forest Canopy Walk",
      destination: "Rwanda",
      duration: "2 days",
      price: 450,
      category: "adventure",
      rating: 4.6,
      reviewCount: 84,
      image: "https://ik.imagekit.io/jinx/travel/Walk-trail-nyungwe-Usoke-explorers.jpg?updatedAt=1750015272732?height=200&width=300"
    },
    {
      id: 30,
      slug: "lake-kivu-relaxation",
      title: "Lake Kivu Relaxation",
      destination: "Rwanda",
      duration: "3 days",
      price: 380,
      category: "adventure",
      rating: 4.4,
      reviewCount: 62,
      image: "https://ik.imagekit.io/jinx/travel/images%20(4).jpeg?updatedAt=1750015334762?height=200&width=300"
    },
    {
      id: 31,
      slug: "akagera-national-park-safari",
      title: "Akagera National Park",
      destination: "Rwanda",
      duration: "2 days",
      price: 520,
      category: "wildlife",
      rating: 4.5,
      reviewCount: 73,
      image: "https://ik.imagekit.io/jinx/travel/Akagera-national-park-1-750x450.jpg?updatedAt=1750015552704?height=200&width=300"
    },
    {
      id: 32,
      slug: "kigali-city-tour",
      title: "Kigali City Tour",
      destination: "Rwanda",
      duration: "1 day",
      price: 150,
      category: "culture",
      rating: 4.3,
      reviewCount: 58,
      image: "https://ik.imagekit.io/jinx/travel/25-Top-Attractions-in-Rwanda-2.jpg?updatedAt=1750004163696?height=200&width=300"
    },
    {
      id: 33,
      slug: "golden-monkey-tracking",
      title: "Golden Monkey Tracking",
      destination: "Rwanda",
      duration: "2 days",
      price: 680,
      category: "wildlife",
      rating: 4.7,
      reviewCount: 91,
      image: "https://ik.imagekit.io/jinx/travel/golden-monkey-trekking.jpg?updatedAt=1750015688667?height=200&width=300"
    },
    {
      id: 34,
      slug: "bwindi-gorilla-trekking",
      title: "Bwindi Gorilla Trekking",
      destination: "Uganda",
      duration: "4 days",
      price: 2200,
      category: "wildlife",
      rating: 4.9,
      reviewCount: 142,
      image: "https://ik.imagekit.io/jinx/travel/Magical-encounters-with-the-mountain-gorillas-of-Bwindi.jpg?updatedAt=1750015754767?height=200&width=300"
    },
    {
      id: 35,
      slug: "queen-elizabeth-national-park-safari",
      title: "Queen Elizabeth Safari",
      destination: "Uganda",
      duration: "5 days",
      price: 1150,
      category: "wildlife",
      rating: 4.6,
      reviewCount: 87,
      image: "https://ik.imagekit.io/jinx/travel/fc.jpg?updatedAt=1750015847691?height=200&width=300"
    },
    {
      id: 36,
      slug: "murchison-falls-national-park-safari",
      title: "Murchison Falls Adventure",
      destination: "Uganda",
      duration: "4 days",
      price: 980,
      category: "adventure",
      rating: 4.7,
      reviewCount: 94,
      image: "https://ik.imagekit.io/jinx/travel/10-days-wildlife-safari-and-yoga-adventure.jpg?updatedAt=1750015915152?height=200&width=300"
    },
    {
      id: 37,
      slug: "kibale-national-park-chimpanzee-trekking",
      title: "Kibale Chimpanzee Tracking",
      destination: "Uganda",
      duration: "3 days",
      price: 750,
      category: "wildlife",
      rating: 4.5,
      reviewCount: 79,
      image: "https://ik.imagekit.io/jinx/travel/kibale-national-park-chimpanzees-uganda-590x390.jpg?updatedAt=1750015970496?height=200&width=300"
    },
    {
      id: 38,
      slug: "lake-mburo-national-park-safari",
      title: "Lake Mburo National Park",
      destination: "Uganda",
      duration: "2 days",
      price: 420,
      category: "wildlife",
      rating: 4.3,
      reviewCount: 61,
      image: "https://ik.imagekit.io/jinx/travel/lake-mburo-national-park.jpg?updatedAt=1750016037012?height=200&width=300"
    },
    {
      id: 39,
      slug: "rwenzori-mountains-hiking",
      title: "Rwenzori Mountains Hiking",
      destination: "Uganda",
      duration: "7 days",
      price: 1800,
      category: "adventure",
      rating: 4.8,
      reviewCount: 103,
      image: "https://ik.imagekit.io/jinx/travel/Rwenzori-Mountains-03_1600p.jpg?updatedAt=1750016117660?height=200&width=300"
    },
    {
      id: 40,
      slug: "jinja-adventure-tour",
      title: "Jinja White Water Rafting",
      destination: "Uganda",
      duration: "2 days",
      price: 350,
      category: "adventure",
      rating: 4.6,
      reviewCount: 88,
      image: "https://ik.imagekit.io/jinx/travel/nile-river-rafting-itanda.jpg?updatedAt=1750016190875?height=200&width=300"
    },
    {
      id: 41,
      slug: "lake-bunyonyi-relaxation-tour",
      title: "Lake Bunyonyi Relaxation",
      destination: "Uganda",
      duration: "3 days",
      price: 450,
      category: "relaxation",
      rating: 4.4,
      reviewCount: 67,
      image: "https://ik.imagekit.io/jinx/travel/lake-bunyonyi-uganda.webp?updatedAt=1750016252501?height=200&width=300"
    },
    {
      id: 42,
      slug: "ssese-islands-beach-holiday",
      title: "Ssese Islands Beach Holiday",
      destination: "Uganda",
      duration: "4 days",
      price: 650,
      category: "beach",
      rating: 4.5,
      reviewCount: 72,
      image: "https://ik.imagekit.io/jinx/travel/Travel-to-Ssese-islands.jpg?updatedAt=1750016305699?height=200&width=300"
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
      reviewCount: 56,
      image: "https://ik.imagekit.io/jinx/travel/flamingos-lakes-great-rift-valley-1.jpg?updatedAt=1750072866145?height=200&width=300"
    },
    {
      id: 44,
      slug: "kenya-disability-safari",
      title: "Accessible Kenya Safari Experience",
      destination: "Kenya",
      duration: "7 days",
      price: 2450,
      category: "wildlife",
      rating: 4.8,
      reviewCount: 24,
      image: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-09-02%20at%2011.43.25%20AM.jpeg?updatedAt=1756810077606"
    },
    {
      id: 45,
      slug: "accessible-masai-mara-4days",
      title: "4-Day Accessible Masai Mara Experience",
      destination: "Kenya",
      duration: "4 days",
      price: 1450,
      category: "wildlife",
      rating: 4.9,
      reviewCount: 18,
      image: "https://ik.imagekit.io/jinx/travel/63baaaef6b14d.jpg?updatedAt=1756903341232",
    },
    {
      id: 46,
      slug: "tanzania-accessible-safari",
      title: "Tanzania Accessible Safari Adventure",
      destination: "Tanzania",
      duration: "8 days",
      price: 2950,
      category: "wildlife",
      rating: 4.7,
      reviewCount: 15,
      image: "https://ik.imagekit.io/jinx/travel/WhatsApp-Image-2025-01-15-at-12.06.45-PM.webp?updatedAt=1756903260238",
    },
    {
      id: 47,
      slug: "rwanda-accessible-gorilla",
      title: "Rwanda Accessible Gorilla Experience",
      destination: "Rwanda",
      duration: "5 days",
      price: 3200,
      category: "wildlife",
      rating: 4.9,
      reviewCount: 12,
      image: "https://ik.imagekit.io/jinx/travel/bisatelodge1.jpg?updatedAt=1756902495617",
    },
    {
      id: 48,
      slug: "uganda-accessible-primate",
      title: "Uganda Accessible Primate Safari",
      destination: "Uganda",
      duration: "6 days",
      price: 2200,
      category: "wildlife",
      rating: 4.6,
      reviewCount: 16,
      image: "https://ik.imagekit.io/jinx/travel/6-days-gorilla-tracking-and-rafting-jinja.jpg?updatedAt=1750083327865",
    },
    {
      id: 49,
      slug: "east-africa-grand-accessible",
      title: "East Africa Grand Accessible Safari",
      destination: "Multi-Country",
      duration: "12 days",
      price: 5800,
      category: "wildlife",
      rating: 4.9,
      reviewCount: 8,
      image: "https://ik.imagekit.io/jinx/travel/Tineke-in-Kenya.png?updatedAt=1756902738914",
    },
      {
        id: 50,
        slug: "kilimanjaro-climbing-adventure",
        title: "Kilimanjaro Climbing Adventure",
        destination: "Tanzania",
        duration: "8 days",
        price: 3500,
        category: "adventure",
        rating: 4.8,
        reviewCount: 10,
        image: "https://ik.imagekit.io/jinx/travel/kilimanjaro-climb.jpg",
      },
      {
        id: 51,
        slug: "ngorongoro-crater-tour",
        title: "Ngorongoro Crater Tour",
        destination: "Tanzania",
        duration: "3 days",
        price: 1200,
        category: "wildlife",
        rating: 4.9,
        reviewCount: 8,
        image: "https://ik.imagekit.io/jinx/travel/ngorongoro-crater.jpg",
      },
      {
        id: 52,
        slug: "bwindi-gorilla-trekking",
        title: "Bwindi Gorilla Trekking",
        destination: "Uganda",
        duration: "5 days",
        price: 4200,
        category: "wildlife",
        rating: 4.9,
        reviewCount: 12,
        image: "https://ik.imagekit.io/jinx/travel/bwindi-gorillas.jpg",
      },
      {
        id: 53,
        slug: "queen-elizabeth-safari",
        title: "Queen Elizabeth Safari",
        destination: "Uganda",
        duration: "4 days",
        price: 2800,
        category: "wildlife",
        rating: 4.8,
        reviewCount: 9,
        image: "https://ik.imagekit.io/jinx/travel/queen-elizabeth-safari.jpg",
      },
      {
        id: 54,
        slug: "murchison-falls-adventure",
        title: "Murchison Falls Adventure",
        destination: "Uganda",
        duration: "4 days",
        price: 3000,
        category: "wildlife",
        rating: 4.9,
        reviewCount: 11,
        image: "https://ik.imagekit.io/jinx/travel/murchison-falls.jpg",
      },
      {
        id: 55,
        slug: "kenya-disability-7-day-accessible-safari",
        title: "Kenya Disability Tours - 7-Day Accessible Safari",
        destination: "Kenya",
        duration: "7 days",
        price: 3200,
        category: "wildlife",
        rating: 4.9,
        reviewCount: 7,
        image: "https://ik.imagekit.io/jinx/travel/accessible-kenya1.jpg",
      },
      {
        id: 56,
        slug: "4-day-accessible-masai-mara",
        title: "4-Day Accessible Masai Mara Experience",
        destination: "Kenya",
        duration: "4 days",
        price: 1800,
        category: "wildlife",
        rating: 4.9,
        reviewCount: 8,
        image: "https://ik.imagekit.io/jinx/travel/accessible-mara1.jpg",
      },
      {
        id: 57,
        slug: "tanzania-accessible-safari-adventure",
        title: "Tanzania Accessible Safari Adventure",
        destination: "Tanzania",
        duration: "7 days",
        price: 3800,
        category: "wildlife",
        rating: 4.9,
        reviewCount: 10,
        image: "https://ik.imagekit.io/jinx/travel/tanzania-accessible1.jpg",
      },
      {
        id: 58,
        slug: "rwanda-accessible-gorilla-trek",
        title: "Rwanda Accessible Gorilla Trek",
        destination: "Rwanda",
        duration: "5 days",
        price: 4200,
        category: "wildlife",
        rating: 4.9,
        reviewCount: 12,
        image: "https://ik.imagekit.io/jinx/travel/rwanda-gorilla1.jpg",
      },
      {
        id: 59,
        slug: "uganda-accessible-primate-safari",
        title: "Uganda Accessible Primate Safari",
        destination: "Uganda",
        duration: "6 days",
        price: 3700,
        category: "wildlife",
        rating: 4.8,
        reviewCount: 15,
        image: "https://ik.imagekit.io/jinx/travel/uganda-primate1.jpg",
      },
      {
        id: 60,
        slug: "east-africa-grand-accessible-safari",
        title: "East Africa Grand Accessible Safari",
        destination: "Multi-Country",
        duration: "12 days",
        price: 5800,
        category: "wildlife",
        rating: 4.9,
        reviewCount: 8,
        image: "https://ik.imagekit.io/jinx/travel/Tineke-in-Kenya.png?updatedAt=1756902738914",
      }
    

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

  if (!params?.slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid tour</h1>
          <Button onClick={() => router.push("/tours")}>Back to Tours</Button>
        </div>
      </div>
    )
  }

  const tour = toursData.find((t) => t.slug === params.slug)

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tours Not Found</h1>
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
    const whatsappUrl = `https://wa.me/254726485228?text=${encodeURIComponent(bookingMessage)}`
    window.open(whatsappUrl, "_blank")

    // Send email
    const emailSubject = `🦁 Safari Booking Request - ${tour.title}`
    const emailBody = bookingMessage.replace(/\n/g, "%0D%0A")
    const emailUrl = `mailto:Info@jaetravel.co.ke?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
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
                        <span>Info@jaetravel.co.ke</span>
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
