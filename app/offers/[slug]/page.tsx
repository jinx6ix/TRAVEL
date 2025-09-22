import type { Metadata } from "next"
import Script from "next/script"
import OfferDetailClient from "./OfferDetailClient"
import { SEO } from "@/config/seo.config"

// Mock data
interface OfferData {
  id: number
  slug: string
  title: string
  destination: string
  duration: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  description: string
  badge: string
  highlights: string[]
  offer: string
  availability: string
}

const safariOffers: OfferData[] = [
  {
    id: 1,
    slug: "nairobi-highlights-express-tour",
    title: "Nairobi Highlights Express Tour",
    destination: "Kenya",
    duration: "Half Day (5 hrs)",
    price: 99,
    originalPrice: 129,
    rating: 4.8,
    reviews: 142,
    image: "https://ik.imagekit.io/jinx/travel/Giraffe-at-Nairobi-National-Park.webp?updatedAt=1751635762605",
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
  },
  {
    id: 2,
    slug: "maasai-mara-luxury-safari",
    title: "Maasai Mara Luxury Safari",
    destination: "Kenya",
    duration: "3 Days / 2 Nights",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 89,
    image: "https://ik.imagekit.io/jinx/travel/mahali-mzuri-2-2-420x310.jpg?updatedAt=1751635762576",
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
  },
  {
    id: 3,
    slug: "amboseli-elephant-paradise",
    title: "Amboseli Elephant Paradise",
    destination: "Kenya",
    duration: "2 Days / 1 Night",
    price: 749,
    originalPrice: 899,
    rating: 4.7,
    reviews: 63,
    image: "https://ik.imagekit.io/jinx/travel/Amboseli-National-Park-Elephantsssss.jpg?updatedAt=1751635762755",
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
  }
]

// ------------------ Fix: Use Promise for params ------------------
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const offer = safariOffers.find((o) => o.slug === slug)

  if (!offer) {
    return {
      title: `Offer Not Found | ${SEO.defaultTitle}`,
      description: "The offer you're looking for doesn't exist.",
    }
  }

  const canonicalUrl = `${SEO.canonical}/offers/${offer.slug}`

  return {
    title: `${offer.title} | ${SEO.defaultTitle}`,
    description: offer.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: offer.title,
      description: offer.description,
      url: canonicalUrl,
      siteName: "JaeTravel",
      images: [{ url: offer.image, width: 1200, height: 630, alt: offer.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: offer.title,
      description: offer.description,
      images: [offer.image],
    },
  }
}

// ------------------ Fix: Page props also expect Promise ------------------
export default async function OfferDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const offer = safariOffers.find((o) => o.slug === slug)

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <h1 className="text-2xl font-bold">Offer Not Found</h1>
      </div>
    )
  }

  const canonicalUrl = `${SEO.canonical}/offers/${offer.slug}`

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: offer.title,
    description: offer.description,
    url: canonicalUrl,
    image: [offer.image],
  }

  return (
    <>
      <Script id="ld-json-offer" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <OfferDetailClient offer={offer} />
    </>
  )
}
