// app/tours/[slug]/page.tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import toursData from "@/data/tours-data"
import { SEO } from "@/config/seo.config"
import TourDetailClient from "./TourDetailClient"

interface PageProps {
  params: {
    slug: string
  }
}

// Generate per-tour metadata (SEO)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tour = toursData.find(
    (t) => t.slug === params.slug || t.id.toString() === params.slug
  )

  if (!tour) {
    return { title: "Tour Not Found | JaeTravel Expeditions" }
  }

  const pageTitle = `${tour.title} | ${SEO.defaultTitle}`
  const pageDescription =
    tour.description || "Experience an unforgettable tour with JaeTravel Expeditions"
  const canonicalUrl = `${SEO.canonical}/tours/${tour.slug}`
  const images =
    tour.gallery?.map((image) => ({
      url: image,
      width: 1200,
      height: 630,
      alt: `${tour.title} tour image`,
    })) || SEO.openGraph.images

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: images.map((img) => img.url),
    },
  }
}

// Server component page
export default async function TourDetailPage({ params }: PageProps) {
  const tour = toursData.find(
    (t) => t.slug === params.slug || t.id.toString() === params.slug
  )

  if (!tour) return notFound()

  // Structured data for search engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: tour.title,
    description: tour.description,
    url: `${SEO.canonical}/tours/${tour.slug}`,
    image: tour.gallery,
    address: {
      "@type": "PostalAddress",
      addressCountry: tour.destination,
    },
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "USD",
      validFrom: new Date().toISOString().split("T")[0],
      url: `${SEO.canonical}/tours/${tour.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
    },
  }

  return (
    <main>
      {/* JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Client component for interactivity */}
      <TourDetailClient tour={tour} />
    </main>
  )
}
