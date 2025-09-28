import { notFound } from "next/navigation";
import type { Metadata } from "next";
import toursData from "@/data/tours-data";
import { SEO } from "@/config/seo.config";
import TourDetailClient from "./TourDetailClient";
import { generateTourAIOverview } from "@/lib/ai-service";
import { generateUniqueMetaDescription, getRelatedTours } from "@/lib/seo-utils";

// Generate static paths for optimal SEO performance
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return toursData.map((tour) => ({
    slug: tour.slug,
  }));
}

// Generate dynamic OG image for social sharing
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = toursData.find((t) => t.slug === slug);

  if (!tour) return [];

  return [
    {
      contentType: "image/png",
      size: { width: 1200, height: 630 },
      id: `tour-${slug}-og`,
    },
  ];
}

// Enhanced metadata generation with unique, natural language
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = toursData.find((t) => t.slug === slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
      robots: { index: false, follow: false },
    };
  }

  // Generate unique, natural meta description
  const pageDescription = await generateUniqueMetaDescription(tour);
  const pageTitle = `${tour.title} | ${tour.destination} Safari Tour ${tour.duration} Days`;

  const canonicalUrl = `${SEO.canonical}/tours/${tour.slug}`;
  const primaryImage = tour.gallery?.[0] || "/default-tour-image.jpg";

  // Focused, relevant keywords without stuffing
  const focusedKeywords = [
    `${tour.destination} safari tour`,
    `${tour.duration} day ${tour.destination.toLowerCase()} safari`,
    `${tour.category.toLowerCase()} tour ${tour.destination}`,
    `book ${tour.title.toLowerCase()}`,
  ];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: focusedKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: { "en-US": canonicalUrl },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: SEO.siteName,
      type: "website",
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: `${tour.title} - ${tour.destination} Safari Experience`,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [primaryImage],
      creator: "@eastafricasafaris",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    verification: SEO.verification,
    category: "Travel & Tourism",
    authors: [{ name: SEO.siteName, url: SEO.canonical }],
  };
}

// Server-side AI overview generation for crawlability
async function generateServerAIOverview(tour: any): Promise<string> {
  try {
    // Use server-side AI service (mock implementation)
    const overview = await generateTourAIOverview(tour);
    return overview || tour.description || "Explore this incredible safari experience.";
  } catch (error) {
    // Fallback to crafted description
    return `Join our ${tour.duration}-day ${tour.title} in ${tour.destination}. ${tour.description}`;
  }
}

// Generate dynamic FAQ data from tour content
function generateDynamicFAQData(tour: any) {
  const faqs = [
    {
      question: `What makes the ${tour.title} unique compared to other ${tour.destination} safaris?`,
      answer: `The ${tour.title} stands out with its ${tour.duration}-day itinerary focusing on ${tour.highlights?.[0] || "unique wildlife experiences"}. Our expert guides ensure personalized attention with groups of ${tour.groupSize} or fewer.`,
    },
    {
      question: `What is the best time of year for the ${tour.title}?`,
      answer: `This tour operates year-round, but optimal viewing is during ${tour.bestTime || "the dry seasons"} when wildlife congregates around water sources. ${tour.destination} offers excellent game viewing throughout the year.`,
    },
    {
      question: `What level of fitness is required for the ${tour.title}?`,
      answer: `This is a ${tour.difficulty || "moderate"} level tour. ${
        tour.difficulty === "Easy"
          ? "Suitable for all fitness levels and ages."
          : "Participants should be comfortable with moderate physical activity and walking on uneven terrain."
      }`,
    },
    {
      question: `What type of accommodation can I expect on the ${tour.title}?`,
      answer: `Accommodation ranges from ${tour.itinerary?.[0]?.accommodation || "comfortable lodges and tented camps"} with modern amenities. All lodging is carefully selected for comfort, location, and authentic safari experience.`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

// Enhanced structured data with related content
function generateComprehensiveStructuredData(tour: any, relatedTours: any[]) {
  const baseUrl = SEO.canonical;
  const tourUrl = `${baseUrl}/tours/${tour.slug}`;

  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour.title,
    "description": tour.description,
    "image": tour.gallery || [],
    "url": tourUrl,
    "offers": {
      "@type": "Offer",
      "price": tour.price,
      "priceCurrency": tour.currency || "USD",
      "availability": "https://schema.org/InStock",
    },
    "location": {
      "@type": "Place",
      "name": tour.destination,
    },
    "itinerary": tour.itinerary.map((day: any) => ({
      "@type": "ItemList",
      "name": day.title,
      "description": day.description,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Tours", "item": `${baseUrl}/tours` },
      { "@type": "ListItem", "position": 3, "name": tour.destination, "item": `${baseUrl}/tours?destination=${tour.destination}` },
      { "@type": "ListItem", "position": 4, "name": tour.title, "item": tourUrl },
    ],
  };

  return [tourSchema, breadcrumbSchema];
}

// Main page component with server-side optimizations
export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = toursData.find((t) => t.slug === slug);

  if (!tour) {
    notFound();
  }

  // Server-side generation of AI overview for SEO
  const aiOverview = await generateServerAIOverview(tour);
  const relatedTours = getRelatedTours(tour, toursData);
  const faqData = generateDynamicFAQData(tour);
  const structuredData = generateComprehensiveStructuredData(tour, relatedTours);

  return (
    <>
      {/* Comprehensive Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData[0]) }}
        key="tour-schema"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData[1]) }}
        key="breadcrumb-schema"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        key="faq-schema"
      />

      {/* Preload critical resources */}
      <link rel="preload" href={tour.gallery[0]} as="image" />

      {/* Server-rendered AI overview in hidden div for crawlability */}
      <div className="hidden" aria-hidden="true">
        <div id="ai-overview-seo">{aiOverview}</div>
      </div>

      <TourDetailClient tour={tour} aiOverview={aiOverview} relatedTours={relatedTours} />
    </>
  );
}