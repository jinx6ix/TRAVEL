import type { Metadata } from "next"
import Script from "next/script"
import OtherServicesPage from "./OtherServicesPage"

// 🔹 Metadata for SEO
export const metadata: Metadata = {
  title: "Travel Services in East Africa | JaeTravel Expeditions",
  description:
    "Book complete East Africa travel services with JaeTravel Expeditions — airport transfers, hotel bookings, group tours, photography, city tours, insurance, catering, and more.",
  keywords: [
    "East Africa travel services",
    "Jae Travel Expeditions",
    "airport transfers East Africa",
    "hotel bookings East Africa",
    "safari photography services",
    "group travel tours",
    "city tours East Africa",
    "travel insurance Africa",
    "catering safari services",
    "private transfers Africa",
  ],
  openGraph: {
    title: "East Africa Travel Services | JaeTravel Expeditions",
    description:
      "Explore JaeTravel's additional services: airport transfers, hotel bookings, photography, group tours, city tours, travel insurance, catering, and private transfers.",
    url: "https://jaetravel.com/other-services",
    siteName: "JaeTravel",
    images: [
      {
        url: "https://ik.imagekit.io/jinx/travel/other-services.jpg?updatedAt=1750019014225",
        width: 1200,
        height: 630,
        alt: "East Africa Travel Services — JaeTravel Expeditions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "East Africa Travel Services | JaeTravel Expeditions",
    description:
      "Book airport transfers, hotels, photography, group tours, city tours, insurance, catering, and private transfers in East Africa with JaeTravel.",
    images: [
      "https://ik.imagekit.io/jinx/travel/other-services.jpg?updatedAt=1750019014225",
    ],
  },
  alternates: {
    canonical: "https://jaetravel.com/other-services",
  },
}

export default function Page() {
  return (
    <>
      <OtherServicesPage />

      {/* ✅ Structured Data */}
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
              name: "Other Services",
              item: "https://jaetravel.com/other-services",
            },
          ],
        })}
      </Script>

      <Script id="ld-json-services" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "East Africa Travel Services",
          provider: {
            "@type": "Organization",
            name: "JaeTravel Expeditions",
            url: "https://jaetravel.com",
            logo: "https://jaetravel.com/logo.png",
          },
          areaServed: {
            "@type": "Place",
            name: "East Africa",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Other Travel Services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Airport Transfers",
                  description:
                    "Comfortable and reliable airport pickup and drop-off services for all major airports in East Africa.",
                },
                price: "30",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Hotel Bookings",
                  description:
                    "Curated selection of accommodations from luxury lodges to budget-friendly options across East Africa.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Photography Services",
                  description:
                    "Professional wildlife and travel photography services to capture your safari memories.",
                },
                price: "250",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Group Tours",
                  description:
                    "Specialized group tour packages for families, friends, corporate teams, and educational groups.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "City Tours",
                  description:
                    "Explore vibrant East African cities with guided tours showcasing culture, history, and local life.",
                },
                price: "60",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Travel Insurance",
                  description:
                    "Comprehensive travel insurance coverage for peace of mind during your East African adventure.",
                },
                price: "20",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Catering Services",
                  description:
                    "Delicious local and international cuisine options for your safari and travel experiences.",
                },
                price: "35",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Private Transfers",
                  description:
                    "Comfortable private transportation between cities, parks, and attractions across East Africa.",
                },
                price: "90",
                priceCurrency: "USD",
              },
            ],
          },
        })}
      </Script>
    </>
  )
}
