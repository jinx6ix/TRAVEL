export interface Tour {
  metaTitle: string
  metaDescription?: string        // ✅ remove null
  keywords?: string | string[]    // ✅ remove null
  url: string
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

export const pageKeywords: Tour[] = [
  {
    id: "kenya-masai-mara",
    slug: "masai-mara-luxury-safari",
    title: "Masai Mara Luxury Safari",
    description: "Experience the wildlife of Masai Mara with luxury accommodations and expert guides. Includes game drives and meals.",
    price: 3500,
    currency: "USD",
    rating: 4.8,
    reviewCount: 128,
    itinerary: "Day 1: Arrival and lodge check-in. Day 2: Morning and evening game drives. Day 3: Optional hot air balloon ride and departure.",
    bookingUrl: "https://jaetravel.com/book/masai-mara-luxury-safari",
    region: "East Africa",
    country: "Kenya",

    metaTitle: "Masai Mara Luxury Safari | Jae Travel",
    metaDescription: "Book your Masai Mara Luxury Safari with Jae Travel. Enjoy game drives, luxury lodges, and expert guides in Kenya’s most iconic park.",
    keywords: ["Masai Mara Safari", "Luxury Kenya Safari", "Kenya Wildlife Tours"],
    url: "https://jaetravel.com/tours/masai-mara-luxury-safari",
  },
  {
    id: "kenya-amboseli",
    slug: "amboseli-safari",
    title: "Amboseli Safari Adventure",
    description: "Explore Amboseli National Park with guided game drives and spectacular views of Mount Kilimanjaro.",
    price: 2800,
    currency: "USD",
    rating: 4.7,
    reviewCount: 95,
    itinerary: "Day 1: Arrival and lodge check-in. Day 2: Morning and evening game drives. Day 3: Departure.",
    bookingUrl: "https://jaetravel.com/book/amboseli-safari",
    region: "East Africa",
    country: "Kenya",

    metaTitle: "Amboseli Safari Adventure | Jae Travel",
    metaDescription: "Discover Amboseli Safari with breathtaking views of Mount Kilimanjaro. Guided game drives and luxury stays included.",
    keywords: ["Amboseli Safari", "Kenya Tours", "Kilimanjaro Safari"],
    url: "https://jaetravel.com/tours/amboseli-safari",
  },
  {
    id: "tanzania-serengeti",
    slug: "serengeti-migration-tour",
    title: "Serengeti Migration Safari",
    description: "Witness the Great Migration in Serengeti with guided tours and comfortable lodges. Includes daily game drives and meals.",
    price: 4200,
    currency: "USD",
    rating: 4.9,
    reviewCount: 97,
    itinerary: "Day 1: Arrival in Serengeti. Day 2-3: Game drives tracking the migration. Day 4: Cultural visit and departure.",
    bookingUrl: "https://jaetravel.com/book/serengeti-migration-tour",
    region: "East Africa",
    country: "Tanzania",

    metaTitle: "Serengeti Migration Safari | Jae Travel",
    metaDescription: "Experience the Great Migration in Serengeti with expert guides, luxury lodges, and unforgettable wildlife encounters.",
    keywords: ["Serengeti Migration", "Tanzania Safari", "Great Migration Tour"],
    url: "https://jaetravel.com/tours/serengeti-migration-tour",
  },
  {
    id: "tanzania-ngorongoro",
    slug: "ngorongoro-crater-safari",
    title: "Ngorongoro Crater Safari",
    description: "Explore the Ngorongoro Crater with guided game drives and luxury accommodation. Ideal for families and photographers.",
    price: 2800,
    currency: "USD",
    rating: 4.7,
    reviewCount: 64,
    itinerary: "Day 1: Arrival and lodge check-in. Day 2: Full-day game drive in the crater. Day 3: Departure.",
    bookingUrl: "https://jaetravel.com/book/ngorongoro-crater-safari",
    region: "East Africa",
    country: "Tanzania",

    metaTitle: "Ngorongoro Crater Safari | Jae Travel",
    metaDescription: "Book your Ngorongoro Crater Safari with Jae Travel. A perfect adventure for families, photographers, and nature lovers.",
    keywords: ["Ngorongoro Safari", "Tanzania Wildlife Tours", "Family Safari"],
    url: "https://jaetravel.com/tours/ngorongoro-crater-safari",
  },
  {
    id: "uganda-bwindi",
    slug: "bwindi-gorilla-trek",
    title: "Bwindi Gorilla Trekking",
    description: "Trek the dense forests of Bwindi to see mountain gorillas up close with expert guides. Includes park fees and accommodations.",
    price: 3200,
    currency: "USD",
    rating: 4.8,
    reviewCount: 80,
    itinerary: "Day 1: Arrival at lodge. Day 2: Gorilla trekking experience. Day 3: Cultural visit and departure.",
    bookingUrl: "https://jaetravel.com/book/bwindi-gorilla-trek",
    region: "East Africa",
    country: "Uganda",

    metaTitle: "Bwindi Gorilla Trekking | Jae Travel",
    metaDescription: "Embark on a Bwindi Gorilla Trekking safari. See mountain gorillas up close and explore Uganda’s lush forests.",
    keywords: ["Bwindi Gorilla Trek", "Uganda Safari", "Gorilla Trekking Tours"],
    url: "https://jaetravel.com/tours/bwindi-gorilla-trek",
  },
  {
    id: "rwanda-volcanoes",
    slug: "volcanoes-national-park-safari",
    title: "Rwanda Gorilla Safari",
    description: "Explore Volcanoes National Park in Rwanda to trek gorillas and experience local culture.",
    price: 3800,
    currency: "USD",
    rating: 4.9,
    reviewCount: 72,
    itinerary: "Day 1: Arrival and lodge check-in. Day 2: Gorilla trekking. Day 3: Cultural tour and departure.",
    bookingUrl: "https://jaetravel.com/book/volcanoes-national-park-safari",
    region: "East Africa",
    country: "Rwanda",

    metaTitle: "Rwanda Gorilla Safari | Jae Travel",
    metaDescription: "Book your Rwanda Gorilla Safari in Volcanoes National Park. Trek gorillas, enjoy cultural tours, and luxury accommodations.",
    keywords: ["Rwanda Gorilla Safari", "Volcanoes National Park", "Gorilla Trekking Rwanda"],
    url: "https://jaetravel.com/tours/volcanoes-national-park-safari",
  },
]
