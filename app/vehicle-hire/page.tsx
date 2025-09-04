import VehicleHireClient from "@/components/vehicle-hire/VehicleHireClient"
import { SEO } from "@/config/seo.config"

export const metadata = {
  title: "Safari Vehicle Hire | Jae Travel Expeditions | Accessible Safaris Kenya",
  description: "Rent premium safari vehicles in East Africa. Choose from Landcruisers, Prados, photography rigs, and wheelchair accessible options for your perfect safari adventure.",
  keywords: "safari vehicle hire, Kenya 4x4 rental, Tanzania Landcruiser, Uganda safari car, Rwanda tour vehicle, wheelchair accessible safari, photography safari vehicle, disability tour vehicle, accessible safari transport, wheelchair friendly safari truck, adapted safari vehicle Kenya",
  openGraph: {
    title: "Safari Vehicle Hire | Jae Travel Expeditions",
    description: "Rent premium safari vehicles in East Africa for your perfect safari adventure.",
    url: `${SEO.openGraph.url}/vehicle-hire`,
    images: [
      {
        url: "https://www.jaetravel.com/images/vehicle-hire-og.jpg",
        width: 1200,
        height: 630,
        alt: "Safari Vehicle Hire Jae Travel Expeditions",
      },
    ],
  },
  twitter: {
    title: "Safari Vehicle Hire | Jae Travel Expeditions",
    description: "Choose from our fleet of specialized safari vehicles for your East African adventure.",
    images: ["https://www.jaetravel.com/images/vehicle-hire-twitter.jpg"],
  },
}

const vehicles = [
  {
    id: 1,
    name: "Toyota Landcruiser",
    image: "https://ik.imagekit.io/jinx/travel/6-1536x776%20(2).png?updatedAt=1750087071508?height=300&width=400",
    description: "The ultimate safari vehicle with exceptional off-road capabilities and reliability.",
    capacity: "7 passengers",
    features: ["4WD", "Pop-up roof", "Charging ports", "Cooler box", "First aid kit"],
    pricePerDay: 200,
    ideal: "Perfect for game drives and rough terrain",
    specifications: {
      engine: "4.5L 1HZ",
      transmission: "Manual",
      fuelType: "Diesel",
      luggage: "Large capacity",
    },
  },
  {
    id: 2,
    name: "Toyota Prado",
    image: "https://ik.imagekit.io/jinx/travel/5-1536x776%20(1).png?updatedAt=1750087067905?height=300&width=400",
    description: "Comfortable and reliable SUV perfect for family safaris and city tours.",
    capacity: "5 passengers",
    features: ["4WD", "Air conditioning", "GPS navigation", "Bluetooth", "Safety features"],
    pricePerDay: 200,
    ideal: "Great for families and comfortable touring",
    specifications: {
      engine: "3.0L Turbo",
      transmission: "Manual",
      fuelType: "Diesel",
      luggage: "Medium capacity",
    },
  },
  {
    id: 3,
    name: "Luxury Roof Top Camping",
    image: "https://ik.imagekit.io/jinx/travel/4-1536x776%20(1).png?updatedAt=1750087065024?height=300&width=400",
    description: "Experience the wild with luxury camping setup on your vehicle roof.",
    capacity: "4 passengers",
    features: ["Roof tent", "Camping gear", "Solar power", "Kitchenette", "Bedding included"],
    pricePerDay: 200,
    ideal: "Perfect for adventurous camping safaris",
    specifications: {
      engine: "4.0L V6",
      transmission: "Manual/Auto",
      fuelType: "Diesel",
      luggage: "Camping equipment included",
    },
  },
  {
    id: 4,
    name: "Photography Converted Vehicle",
    image: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-07-07%20at%2018.28.17_94668579.jpg?updatedAt=1751902480309?height=300&width=400",
    description: "Specially modified vehicle with photography equipment and optimal viewing angles.",
    capacity: "6 passengers",
    features: ["Camera mounts", "Bean bags", "Extended roof", "Charging stations", "Storage compartments"],
    pricePerDay: 250,
    ideal: "Designed for professional photography",
    specifications: {
      engine: "4.2L Diesel",
      transmission: "Manual",
      fuelType: "Diesel",
      luggage: "Photography gear storage",
    },
  },
  {
    id: 5,
    name: "Wheelchair Accessible Vehicle",
    image: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-09-02%20at%2011.43.25%20AM.jpeg?updatedAt=1756810077606",
    description: "Fully accessible vehicle ensuring everyone can enjoy JaeTravel Expeditions.",
    capacity: "4 passengers + wheelchair",
    features: ["Wheelchair ramp", "Secure wheelchair area", "Easy access", "Safety harnesses", "Accessible controls"],
    pricePerDay: 300,
    ideal: "Inclusive safari experiences for all",
    specifications: {
      engine: "3.5L V6",
      transmission: "Manual",
      fuelType: "Diesel",
      luggage: "Accessible storage",
    },
  },
  {
    id: 6,
    name: "Family Safari Minivan",
    image: "https://ik.imagekit.io/jinx/travel/car-van-1536x776%20(1).png?updatedAt=1750087064275?height=300&width=400",
    description: "Spacious and comfortable minivan perfect for family safaris and group travel.",
    capacity: "7 passengers + driver",
    features: [
      "Pop-up roof for game viewing",
      "AC throughout",
      "Charging ports",
      "Comfortable seating",
      "Large windows"
    ],
    pricePerDay: 200,
    ideal: "Family safaris and small group tours",
    specifications: {
      engine: "2.4L 4-cylinder",
      transmission: "Manual",
      fuelType: "Diesel",
      luggage: "Rear storage compartment",
      fuelEfficiency: "12L/100km"
    },
    extras: {
      childSeats: "Available upon request (+$10/day)",
      coolerBox: "Included free of charge"
    }
  }
]


export default function VehicleHirePage() {
  return <VehicleHireClient vehicles={vehicles} />
}
