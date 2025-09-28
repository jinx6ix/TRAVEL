import type { Metadata } from "next";
import toursData, { type TourData } from "@/data/tours-data";
import ToursClient from "./tours-client";
import { SEO } from "@/config/seo.config";
import { generateUniqueMetaDescription, getTourCategories, getTourDestinations } from "@/lib/seo-utils";

// --- Constants ---
const TOURS_PER_PAGE = 12;
const SITE_NAME = "JaeTravel Expeditions - Accessible East Africa Safaris";

// Generate unique meta description for tours listing
async function generateToursMetaDescription(page: number, totalTours: number): Promise<string> {
  const destinations = getTourDestinations(toursData);
  const categories = getTourCategories(toursData);
  
  if (page > 1) {
    return `Browse page ${page} of our ${totalTours} accessible East Africa safari tours. Discover ${categories.slice(0, 3).join(', ')} experiences in ${destinations.slice(0, 3).join(', ')}. Wheelchair-friendly adventures.`;
  }
  
  return `Discover ${totalTours} accessible safari tours across ${destinations.slice(0, 3).join(', ')}. From ${categories[0]} to ${categories[1]} adventures - wheelchair-friendly experiences with expert guides.`;
}

// Enhanced metadata generation without keyword stuffing
export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1", 10);
  
  const pageTitle = page > 1 
    ? `Accessible Safari Tours - Page ${page} | ${SITE_NAME}`
    : `Wheelchair-Friendly Safari Tours | Accessible East Africa Adventures`;
  
  const pageDescription = await generateToursMetaDescription(page, toursData.length);
  const canonicalUrl = page > 1 
    ? `${SEO.canonical}/tours/page/${page}`
    : `${SEO.canonical}/tours`;

  // Focused, relevant keywords based on actual tour data
  const focusedKeywords = [
    "accessible safari tours",
    "wheelchair friendly Africa",
    "Kenya Tanzania Uganda Rwanda accessible travel",
    "disability friendly safari",
    "JaeTravel Expeditions"
  ];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: focusedKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: { 'en-US': canonicalUrl },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SEO.canonical}/images/accessible-safari-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'Accessible Safari Tours - Wheelchair Friendly East Africa Adventures',
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`${SEO.canonical}/images/accessible-safari-og.jpg`],
      creator: "@jaetravel",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: SEO.verification,
    category: "Accessible Travel & Tourism",
    authors: [{ name: SITE_NAME, url: SEO.canonical }],
    other: {
      "geo.region": "KE-TZ-UG-RW",
      "geo.placename": "East Africa",
      "ICBM": "-1.286389, 36.817223",
    },
  };
}

// Enhanced structured data with proper schema
function generateStructuredData(tours: TourData[], page: number, totalPages: number) {
  const baseUrl = SEO.canonical;
  const currentUrl = page > 1 ? `${baseUrl}/tours/page/${page}` : `${baseUrl}/tours`;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Accessible Safari Tours",
        "item": `${baseUrl}/tours`
      },
      ...(page > 1 ? [{
        "@type": "ListItem",
        "position": 3,
        "name": `Page ${page}`,
        "item": currentUrl
      }] : [])
    ]
  };

  const tourList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Accessible East Africa Safari Tours",
    "description": "Wheelchair-friendly wildlife and cultural tours across Kenya, Tanzania, Uganda, and Rwanda",
    "url": currentUrl,
    "numberOfItems": tours.length,
    "itemListElement": tours.map((tour, index) => ({
      "@type": "ListItem",
      "position": (page - 1) * TOURS_PER_PAGE + index + 1,
      "item": {
        "@type": "TouristAttraction",
        "name": tour.title,
        "description": tour.description.substring(0, 160),
        "url": `${baseUrl}/tours/${tour.slug}`,
        "image": tour.gallery[0],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": tour.destination
        },
        "offers": {
          "@type": "Offer",
          "price": tour.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  return [breadcrumbs, tourList];
}

// Dynamic FAQ data based on actual accessible tour content
function generateDynamicFAQData(tours: TourData[]) {
  const accessibleTours = tours.filter(tour => tour.accessible || tour.title.toLowerCase().includes('accessible'));
  const hasAccessibleTours = accessibleTours.length > 0;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are your safari tours wheelchair accessible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": hasAccessibleTours 
            ? `Yes! We offer ${accessibleTours.length} specially designed accessible safari tours with wheelchair-friendly vehicles, barrier-free accommodations, and trained guides. Our tours are perfect for travelers with mobility challenges.`
            : "We specialize in accessible travel with wheelchair-friendly vehicles and accommodations. Contact us for customized accessible safari options."
        }
      },
      {
        "@type": "Question",
        "name": "What makes a safari tour accessible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our accessible tours feature specially modified vehicles with ramps, barrier-free lodges, trained staff, adapted activities, and flexible itineraries designed for travelers with different mobility needs."
        }
      },
      {
        "@type": "Question",
        "name": "Can I see the Big Five on an accessible safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our accessible tours visit prime wildlife areas where you can see lions, elephants, leopards, rhinos, and buffalo. We choose routes and viewpoints that are wheelchair accessible."
        }
      }
    ]
  };
}

// Main server component
export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || "1", 10));
  const start = (page - 1) * TOURS_PER_PAGE;
  const paginatedTours = toursData.slice(start, start + TOURS_PER_PAGE);
  const totalPages = Math.ceil(toursData.length / TOURS_PER_PAGE);
  
  const structuredData = generateStructuredData(paginatedTours, page, totalPages);
  const faqData = generateDynamicFAQData(toursData);

  // Pagination links for SEO
  const prevPage = page > 1 ? `${SEO.canonical}/tours/page/${page - 1}` : undefined;
  const nextPage = page < totalPages ? `${SEO.canonical}/tours/page/${page + 1}` : undefined;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData[0]) }}
        key="breadcrumbs"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData[1]) }}
        key="tour-list"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        key="faq"
      />

      {/* SEO Meta Links */}
      {prevPage && <link rel="prev" href={prevPage} />}
      {nextPage && <link rel="next" href={nextPage} />}
      <link rel="canonical" href={
        page > 1 ? `${SEO.canonical}/tours/page/${page}` : `${SEO.canonical}/tours`
      } />

      <ToursClient
        tours={paginatedTours}
        currentPage={page}
        totalTours={toursData.length}
        perPage={TOURS_PER_PAGE}
        allTours={toursData}
      />
    </>
  );
}