// lib/tours.ts
export interface Tour {
    id: string
    slug: string
    title: string
    description: string
    price: number
    currency: string
    rating: number
    reviewCount: number
    itinerary: string
    bookingUrl: string
    region: string
    country: string
  }
  
  export const toursData: Tour[] = [
    {
      id: "kenya-masai-mara",
      slug: "masai-mara-luxury-safari",
      title: "Masai Mara Luxury Safari",
      description: "Experience the wildlife of Masai Mara with luxury accommodations and expert guides. Includes game drives and meals.",
      price: 3500,
      currency: "USD",
      rating: 4.8,
      reviewCount: 128,
      itinerary: "Day 1: Arrival... Day 3: Optional hot air balloon ride and departure.",
      bookingUrl: "https://jaetravel.com/book/masai-mara-luxury-safari",
      region: "East Africa",
      country: "Kenya",
    },
    // ...other tours
  ]
  