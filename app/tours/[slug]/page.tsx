// app/tours/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import toursData, { TourData } from "@/data/tours-data";
import { SEO } from "@/config/seo.config";
import TourDetailClient from "./TourDetailClient";
import { generateAiOverview } from "@/lib/generateAiOverview";

export async function generateStaticParams() {
  return toursData.map((tour) => ({ slug: tour.slug }));
}

// ✅ Build-time metadata with basic info; AI overview added at runtime
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const tour = toursData.find((t) => t.slug === slug);
  if (!tour) return {};

  return {
    title: tour.metaTitle || `${tour.title} | Jae Travel Expeditions`,
    description: tour.metaDescription || SEO.defaultDescription,
    keywords: [...(SEO.keywords || []), ...(tour.keywords || [])],
    alternates: {
      canonical: `${SEO.canonical}/tours/${tour.slug}`,
    },
    openGraph: {
      title: tour.title,
      description: tour.metaDescription || SEO.defaultDescription,
      url: `${SEO.canonical}/tours/${tour.slug}`,
      type: "article",
      images: tour.gallery?.length ? [{ url: tour.gallery[0], alt: tour.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: tour.title,
      description: tour.metaDescription || SEO.defaultDescription,
      images: tour.gallery?.[0] ? [tour.gallery[0]] : [],
      creator: SEO.twitter?.handle || "",
    },
    other: {
      "google-site-verification": SEO.verification?.google || "",
      "yandex-verification": SEO.verification?.yandex || "",
      "yahoo-verification": SEO.verification?.yahoo || "",
    },
  };
}

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const tour = toursData.find((t) => t.slug === slug);
  if (!tour) notFound();

  // ✅ Fetch AI overview at runtime
  let ai: { overview: string; keywords: string[]; faqs: { q: string; a: string }[] } = { overview: "", keywords: [], faqs: [] };
  try {
    ai = await generateAiOverview(tour);
  } catch (err) {
    console.warn("AI overview could not be generated:", err);
  }

  // ✅ Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description || ai.overview,
    image: tour.gallery || [],
    touristType: tour.category || "",
    country: tour.destination || "",
    offers: {
      "@type": "Offer",
      price: tour.price || "",
      priceCurrency: tour.currency || "USD",
      url: `${SEO.canonical}/tours/${tour.slug}`,
    },
    review: tour.reviews?.map((r) => ({
      "@type": "Review",
      author: r.name,
      reviewBody: r.comment,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      datePublished: r.date,
    })) || [],
    mainEntity: ai.faqs?.map((faq: { q: string; a: string }) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })) || [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourDetailClient tour={{ ...tour, aiOverview: ai.overview }} />
    </>
  );
}
