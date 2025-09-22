import type { Metadata } from "next";
import { tours, type Tour } from "@/lib/tours-data";
import ToursClient from "./tours-client";
import { SEO } from "@/config/seo.config";

// --- Pagination config ---
const TOURS_PER_PAGE = 9;

// --- Metadata generation ---
export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = `Safari Tours | ${SEO.defaultTitle}`;
  const pageDescription =
    "Browse our collection of premium East Africa safari tours. From luxury Kenya safaris to budget-friendly Uganda adventures, we have the perfect African experience for you.";
  const canonicalUrl = `${SEO.canonical}/tours`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      ...(SEO.keywords || []),
      "safari tours",
      "Kenya safaris",
      "Tanzania tours",
      "Uganda safaris",
      "African travel packages",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: SEO.siteName,
      images: SEO.openGraph.images,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: SEO.openGraph.images,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "google-site-verification": SEO.verification?.google || "",
      "yandex-verification": SEO.verification?.yandex || "",
      "yahoo-verification": SEO.verification?.yahoo || "",
    },
  };
}

// --- Structured data ---
function generateStructuredData(tours: Tour[], page: number) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: tours.map((tour, index) => ({
      "@type": "ListItem",
      position: (page - 1) * TOURS_PER_PAGE + index + 1,
      item: {
        "@type": "TouristAttraction",
        name: tour.title,
        description: tour.description,
        url: `${SEO.canonical}/tours/${tour.slug}`,
        image: tour.image,
        address: { "@type": "PostalAddress", addressCountry: tour.destination },
        offers: {
          "@type": "Offer",
          price: tour.price,
          priceCurrency: tour.currency || "USD",
        },
      },
    })),
  };
}

// --- Server component ---
export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1", 10);
  const start = (page - 1) * TOURS_PER_PAGE;
  const paginatedTours = tours.slice(start, start + TOURS_PER_PAGE);
  const structuredData = generateStructuredData(paginatedTours, page);

  return (
    <>
      {/* ✅ SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ Client-side paginated tour list */}
      <ToursClient
        tours={paginatedTours}
        currentPage={page}
        totalTours={tours.length}
        perPage={TOURS_PER_PAGE}
      />
    </>
  );
}
