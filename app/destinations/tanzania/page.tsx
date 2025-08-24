import type { Metadata } from "next";
import TanzaniaPage from "./TanzaniaPage";
import Script from "next/script";

// 🔹 SEO Metadata
export const metadata: Metadata = {
  title: "Tanzania Safari Adventures | Serengeti, Kilimanjaro & Zanzibar | JaeTravel",
  description:
    "Explore Tanzania with Jae Travel Expeditions. Book safaris to Serengeti, Ngorongoro Crater, Mount Kilimanjaro treks, and Zanzibar beach escapes — expertly curated.",
  keywords: [
    "Tanzania safari",
    "Jae Travel Expeditions",
    "Serengeti safari",
    "Ngorongoro Crater tour",
    "Kilimanjaro trek",
    "Zanzibar beach holiday",
    "East Africa safari",
    "wildlife tours Tanzania",
    "Great Migration Tanzania",
  ],
  openGraph: {
    title: "Tanzania Safari Adventures | Serengeti, Kilimanjaro & Zanzibar | JaeTravel",
    description:
      "Join Jae Travel Expeditions for unforgettable Tanzania experiences — safaris, mountain climbing, cultural tours, and beach relaxation.",
    url: "https://jaetravel.com/destinations/tanzania",
    siteName: "JaeTravel",
    images: [
      {
        url: "https://ik.imagekit.io/jinx/travel/b12582a3dc9844409c80d6aa5b1cf0d4.webp?updatedAt=1750019014225",
        width: 1200,
        height: 630,
        alt: "Tanzania Safari Adventures — Jae Travel Expeditions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanzania Safari Adventures | JaeTravel Expeditions",
    description:
      "Discover Tanzania tours with Jae Travel Expeditions — Serengeti, Kilimanjaro, Ngorongoro Crater, Zanzibar & more.",
    images: [
      "https://ik.imagekit.io/jinx/travel/b12582a3dc9844409c80d6aa5b1cf0d4.webp?updatedAt=1750019014225",
    ],
  },
  alternates: {
    canonical: "https://jaetravel.com/destinations/tanzania",
  },
};

// 🔹 Page Component with JSON-LD
export default function Page() {
  return (
    <>
      <TanzaniaPage />

      {/* ✅ Structured Data for SEO */}
      <Script id="ld-json-breadcrumb" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://jaetravel.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Destinations",
              item: "https://jaetravel.com/destinations",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Tanzania",
              item: "https://jaetravel.com/destinations/tanzania",
            },
          ],
        })}
      </Script>

      <Script id="ld-json-destination" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: "Tanzania",
          description:
            "Tanzania is home to Serengeti, Ngorongoro Crater, Mount Kilimanjaro, and Zanzibar — offering safaris, trekking, cultural tours, and beach holidays.",
          image:
            "https://ik.imagekit.io/jinx/travel/b12582a3dc9844409c80d6aa5b1cf0d4.webp?updatedAt=1750019014225",
          geo: {
            "@type": "GeoCoordinates",
            latitude: -6.369028,
            longitude: 34.888822,
          },
          touristType: ["Adventure travelers", "Wildlife enthusiasts", "Cultural explorers"],
        })}
      </Script>

      <Script id="ld-json-tours" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Featured Tanzania Tours",
          itemListElement: [
            {
              "@type": "Product",
              name: "Serengeti Wildlife Safari",
              description: "7-day Serengeti safari with game drives, hot air balloon experience, and photography tours.",
              image:
                "https://ik.imagekit.io/jinx/travel/serengeti-day-trip.jpeg?updatedAt=1750016757896",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: "1800",
                availability: "https://schema.org/InStock",
                url: "https://jaetravel.com/tours/13",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "124",
              },
              provider: {
                "@type": "Organization",
                name: "JaeTravel Expeditions",
                url: "https://jaetravel.com",
              },
            },
            {
              "@type": "Product",
              name: "Ngorongoro Crater Tour",
              description: "3-day tour of Ngorongoro Crater with game drives, cultural village visits, and wildlife viewing.",
              image:
                "https://ik.imagekit.io/jinx/travel/Ngorongoro-Crater.jpg?updatedAt=1750013843530",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: "950",
                availability: "https://schema.org/InStock",
                url: "https://jaetravel.com/tours/14",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "89",
              },
              provider: {
                "@type": "Organization",
                name: "JaeTravel Expeditions",
                url: "https://jaetravel.com",
              },
            },
            {
              "@type": "Product",
              name: "Kilimanjaro Climbing Expedition",
              description: "8-day trek to summit Mount Kilimanjaro with experienced guides and full support.",
              image:
                "https://ik.imagekit.io/jinx/travel/kilimanjaro-moutain-climbing.jpg?updatedAt=1750013910253",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: "2200",
                availability: "https://schema.org/InStock",
                url: "https://jaetravel.com/tours/15",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.7",
                reviewCount: "75",
              },
              provider: {
                "@type": "Organization",
                name: "JaeTravel Expeditions",
                url: "https://jaetravel.com",
              },
            },
          ],
        })}
      </Script>
    </>
  );
}
