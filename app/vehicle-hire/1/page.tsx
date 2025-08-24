import type { Metadata } from "next";
import Script from "next/script";
import LandcruiserPage from "./LandcruiserPage";

const CANONICAL = "https://jaetravel.com/vehicle-hire/landcruiser";
const OG_IMAGE =
  "https://ik.imagekit.io/jinx/travel/6-1536x776%20(2).png?updatedAt=1750087071508";

export const metadata: Metadata = {
  title:
    "Toyota Landcruiser Safari Vehicle Hire | Pop-Up Roof 4x4 | Jae Travel Expeditions",
  description:
    "Hire a Toyota Landcruiser safari vehicle in East Africa. Pop-up roof, 4WD, cooler box, multiple charging ports, professional driver & fuel included. Perfect for game drives.",
  keywords: [
    "Toyota Landcruiser hire",
    "safari vehicle hire",
    "4x4 rental Kenya",
    "Landcruiser Tanzania",
    "safari car Uganda",
    "wheelchair accessible safari",
    "photography safari vehicle",
    "East Africa vehicle hire",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title:
      "Toyota Landcruiser Safari Vehicle Hire | Pop-Up Roof 4x4 | Jae Travel",
    description:
      "Premium Landcruiser hire for safaris across Kenya, Tanzania, Uganda & Rwanda. Pop-up roof, 4WD, cooler box, charging ports, pro driver & fuel included.",
    siteName: "JaeTravel",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Toyota Landcruiser safari vehicle with pop-up roof" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Toyota Landcruiser Safari Vehicle Hire | Pop-Up Roof 4x4 | Jae Travel",
    description:
      "Hire a Landcruiser with pop-up roof, 4WD, cooler box & pro driver. Ideal for game drives across East Africa.",
    images: [OG_IMAGE],
  },
};

export default function Page() {
  // Page constants for schema
  const pricePerDay = 120;
  const name = "Toyota Landcruiser Safari Vehicle";
  const description =
    "The ultimate safari vehicle with exceptional off-road capabilities, pop-up roof for game viewing, cooler box, multiple charging ports, GPS navigation, and professional driver with fuel included.";

  const features = [
    "4WD System",
    "Pop-Up Roof",
    "Multiple Charging Ports",
    "Built-In Cooler Box",
    "First Aid Kit",
    "GPS Navigation",
    "Professional Driver",
    "Fuel Included",
  ];

  return (
    <>
      <LandcruiserPage />

      {/* Breadcrumbs */}
      <Script id="ld-breadcrumbs" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://jaetravel.com/" },
            { "@type": "ListItem", position: 2, name: "Vehicle Hire", item: "https://jaetravel.com/vehicle-hire" },
            { "@type": "ListItem", position: 3, name: "Toyota Landcruiser", item: CANONICAL },
          ],
        })}
      </Script>

      {/* Product / Offer (rental) */}
      <Script id="ld-product-offer" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name,
          description,
          image: [OG_IMAGE],
          brand: { "@type": "Brand", name: "Jae Travel Expeditions" },
          category: "Car",
          additionalProperty: features.map((f) => ({
            "@type": "PropertyValue",
            name: "Feature",
            value: f,
          })),
          offers: {
            "@type": "Offer",
            price: pricePerDay,
            priceCurrency: "USD",
            url: CANONICAL,
            availability: "https://schema.org/InStock",
            businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
            itemCondition: "https://schema.org/UsedCondition",
            eligibleRegion: [
              "Kenya",
              "Tanzania",
              "Uganda",
              "Rwanda",
            ],
            seller: {
              "@type": "Organization",
              name: "Jae Travel Expeditions",
              url: "https://jaetravel.com",
            },
          },
        })}
      </Script>

      {/* FAQ rich results */}
      <Script id="ld-faq" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What makes the Toyota Landcruiser ideal for safaris?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "It combines 4WD capability, high ground clearance, and a pop-up roof for unobstructed wildlife viewing. Our units include cooler box, multiple charging ports, and GPS for comfort and reliability.",
              },
            },
            {
              "@type": "Question",
              name: "Is a professional driver and fuel included?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Yes. Our Landcruiser hire includes a professional driver/guide and fuel for safari activities as standard.",
              },
            },
            {
              "@type": "Question",
              name: "Where is the Landcruiser available for hire?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "We operate across Kenya, Tanzania, Uganda, and Rwanda. Cross-border hires can be arranged on request.",
              },
            },
          ],
        })}
      </Script>
    </>
  );
}
