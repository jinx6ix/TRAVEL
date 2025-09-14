// app/tours/[slug]/page.tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import toursData from "@/data/tours-data"
import { SEO } from "@/config/seo.config"
import TourDetailClient from "./TourDetailClient"

// ✅ Updated for Next.js 15: params is now a Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  // Await the params promise
  const { slug } = await params
  
  const tour = toursData.find(
    (t) => t.slug === slug || t.id.toString() === slug
  )

  if (!tour) {
    return { 
      title: "Tour Not Found | JaeTravel Expeditions",
      robots: {
        index: false,
        follow: true,
      }
    }
  }

  // Enhanced metadata with SEO improvements
  const pageTitle = `${tour.title} Tour - ${tour.destination} | ${SEO.defaultTitle}`
  const pageDescription = tour.seoDescription || 
    `${tour.description?.substring(0, 155)}...` || 
    `Experience an unforgettable ${tour.title} tour in ${tour.destination} with JaeTravel Expeditions. Book now for the best adventure experience.`
  
  const canonicalUrl = `${SEO.canonical}/tours/${tour.slug}`
  
  // Handle both string and array image formats
  const primaryImage = Array.isArray(tour.gallery) && tour.gallery.length > 0 
    ? tour.gallery[0] 
    : typeof tour.gallery === 'string' 
      ? tour.gallery 
      : SEO.openGraph.images[0]?.url || '/default-tour-image.jpg'
  
  const images = [
    {
      url: primaryImage,
      width: 1200,
      height: 630,
      alt: `${tour.title} tour in ${tour.destination} - JaeTravel Expeditions`,
    },
    ...(Array.isArray(tour.gallery) && tour.gallery.length > 1 
      ? tour.gallery.slice(1).map((image, index) => ({
          url: image,
          width: 800,
          height: 600,
          alt: `${tour.title} tour image ${index + 2} - ${tour.destination}`,
        }))
      : [])
  ]

  // Keywords based on tour content
  const keywords = [
    tour.title,
    tour.destination,
    'tour',
    'travel',
    'expedition',
    'adventure',
    'vacation',
    ...(tour.tags || []),
    ...(tour.category ? [tour.category] : [])
  ].filter(Boolean).join(', ')

  return {
    title: pageTitle,
    description: pageDescription,
    keywords,
    authors: [{ name: SEO.defaultTitle }],
    creator: SEO.defaultTitle,
    publisher: SEO.defaultTitle,
    metadataBase: new URL(SEO.canonical || 'https://jaetravel.com'),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: SEO.defaultTitle,
      locale: 'en_US',
      type: 'website',
      images,
      ...(tour.duration && { duration: tour.duration }),
      ...(tour.destination && { location: tour.destination }),
    },
    twitter: {
      card: "summary_large_image",
      site: SEO.twitterHandle || '@jaetravel',
      creator: SEO.twitterHandle || '@jaetravel',
      title: pageTitle,
      description: pageDescription,
      images: [primaryImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: SEO.verification, // If you have Google Search Console verification
  }
}

// ✅ Updated for Next.js 15: params is now a Promise
export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // Await the params promise
  const { slug } = await params
  
  const tour = toursData.find(
    (t) => t.slug === slug || t.id.toString() === slug
  )

  if (!tour) return notFound()

  // Enhanced structured data with more properties
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip", // More specific than TouristAttraction
    "name": tour.title,
    "description": tour.description,
    "url": `${SEO.canonical}/tours/${tour.slug}`,
    "image": Array.isArray(tour.gallery) ? tour.gallery : [tour.gallery],
    "location": {
      "@type": "Place",
      "name": tour.destination,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": tour.destination,
      }
    },
    "offers": {
      "@type": "Offer",
      "price": tour.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split("T")[0],
      "url": `${SEO.canonical}/tours/${tour.slug}`,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tour.rating,
      "reviewCount": tour.reviewCount,
      "bestRating": "5",
      "worstRating": "1",
    },
    "itinerary": tour.itinerary ? {
      "@type": "ItemList",
      "numberOfItems": tour.itinerary.length,
      "itemListElement": tour.itinerary.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TouristAttraction",
          "name": item.title || `Day ${index + 1}`,
          "description": item.description,
        }
      }))
    } : undefined,
    "duration": tour.duration, // e.g., "P7D" for 7 days
    "touristType": tour.tourType || "Adventure", // e.g., Adventure, Family, Luxury
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TourDetailClient tour={tour} />
    </main>
  )
}