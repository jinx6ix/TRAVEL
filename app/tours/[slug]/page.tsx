// app/tours/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import toursData from "@/data/tours-data";
import { SEO } from "@/config/seo.config";
import TourDetailClient from "./TourDetailClient";

// Generate static paths
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return toursData.map((tour) => ({ slug: tour.slug }));
}

// Metadata for SEO, Open Graph, and verification
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = toursData.find((t) => t.slug === slug);

  if (!tour) return {};

  return {
    title: tour.metaTitle || `${tour.title} | ${SEO.defaultTitle}`,
    description: tour.metaDescription || SEO.defaultDescription,
    keywords: [...(SEO.keywords || []), ...(tour.keywords || [])],
    alternates: { canonical: `${SEO.canonical}/tours/${tour.slug}` },
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

// Page component
export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = toursData.find((t) => t.slug === slug);

  if (!tour) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description || "",
    image: tour.gallery || [],
    touristType: tour.category || "",
    country: tour.destination || "",
    offers: {
      "@type": "Offer",
      price: tour.price ?? "",
      priceCurrency: tour.currency || "USD",
      url: `${SEO.canonical}/tours/${tour.slug}`,
    },
    review:
      tour.reviews?.map((r: any) => ({
        "@type": "Review",
        author: r.name,
        reviewBody: r.comment,
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
        datePublished: r.date,
      })) || [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourDetailClient tour={tour} />
    </>
  );
}
