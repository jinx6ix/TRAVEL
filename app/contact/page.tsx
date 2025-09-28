// app/contact/page.tsx
import type { Metadata } from "next";
import { SEO } from "@/config/seo.config";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: `Contact Us | ${SEO.siteName}`,
  description:
    "Get in touch with Jae Travel Expeditions for inquiries, bookings, or custom safari planning. We're here to help with your East African adventure.",
  keywords: SEO.keywords,
  alternates: {
    canonical: `${SEO.canonical}/contact`,
    languages: { "en-US": `${SEO.canonical}/contact` },
  },
  openGraph: {
    title: "Contact Jae Travel Expeditions - Safari Experts",
    description:
      "Reach out to our team for personalized safari planning and inquiries.",
    url: `${SEO.canonical}/contact`,
    siteName: SEO.siteName,
    images: SEO.openGraph.images,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Jae Travel Expeditions - Safari Experts",
    description:
      "Get in touch for your East Africa safari questions and bookings.",
    images: SEO.openGraph.images,
    creator: SEO.twitterHandle || "@jaetravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: SEO.verification,
  category: "Travel & Tourism",
  authors: [{ name: SEO.siteName, url: SEO.canonical }],
};

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: SEO.contactPhone,
    contactType: "Customer Service",
    email: SEO.contactEmail,
    availableLanguage: ["English", "Swahili"],
    areaServed: "KE, UG, TZ, RW",
  };
  // FAQ data
const faqData = [
  {
    question: "What's included in your safari tour prices?",
    answer: "Our safari packages include accommodation, meals, park fees, professional guide services, and transportation. International flights, visas, and travel insurance are not included.",
  },
  {
    question: "What should I pack for an East African safari?",
    answer: "We recommend light, neutral-colored clothing, comfortable walking shoes, sun protection, binoculars, and camera equipment. We provide a detailed packing list upon booking.",
  },
  {
    question: "Is it safe to travel on safari in East Africa?",
    answer: "Yes, our safaris are designed with safety as the top priority. We use experienced guides, well-maintained vehicles, and follow all recommended safety protocols for wildlife viewing.",
  },
  {
    question: "Can you customize safari tours for special interests?",
    answer: "Absolutely! We specialize in custom safaris for photography, birdwatching, honeymoons, family trips, and special occasions. Contact us to create your ideal itinerary.",
  },
  {
    question: "What is the best time for wildlife viewing in East Africa?",
    answer: "The Great Migration in Serengeti/Masai Mara is best from July-October. Dry seasons (Jan-Feb and Jun-Oct) generally offer the best wildlife viewing conditions.",
  },
  {
    question: "Do you offer gorilla trekking permits?",
    answer: "Yes, we can secure gorilla trekking permits for Rwanda and Uganda. These must be booked well in advance due to limited availability.",
  },
]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ContactPageClient faqData={faqData} />
    </>
  );
}