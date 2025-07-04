export interface Offer {
    id: number
    title: string
    destination: string
    duration: string
    price: string
    originalPrice: string
    rating: number
    reviews: number
    image: string
    description: string
    badge: string
    highlights: string[]
    offer: string
    availability: string
    cta: string
  }
  
  export const offers: Offer[] = [
    {
      id: 1,
      title: "Nairobi Highlights Express Tour",
      destination: "Kenya",
      duration: "Half Day (5 hrs)",
      price: "$99",
      originalPrice: "$129",
      rating: 4.8,
      reviews: 142,
      image: "https://ik.imagekit.io/jinx/travel/nairobi-skyline.jpg?updatedAt=1750000000000?height=250&width=350",
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
      cta: "Reserve Now - Instant Confirmation"
    },
    {
      id: 2,
      title: "Maasai Mara Luxury Safari",
      destination: "Kenya",
      duration: "3 Days / 2 Nights",
      price: "$1,299",
      originalPrice: "$1,599",
      rating: 4.9,
      reviews: 89,
      image: "https://ik.imagekit.io/jinx/travel/masai-mara-sunset.jpg?updatedAt=1750000000000?height=250&width=350",
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
      cta: "Secure Your Luxury Safari"
    },
    {
      id: 3,
      title: "Amboseli Elephant Paradise",
      destination: "Kenya",
      duration: "2 Days / 1 Night",
      price: "$749",
      originalPrice: "$899",
      rating: 4.7,
      reviews: 63,
      image: "https://ik.imagekit.io/jinx/travel/amboseli-elephants.jpg?updatedAt=1750000000000?height=250&width=350",
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
      cta: "Book Family Package"
    }
  ]