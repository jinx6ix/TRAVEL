
// app/privacy/page.tsx
import type { Metadata } from "next";
import { SEO } from "@/config/seo.config";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SEO.siteName}`,
  description: "Read Jae Travel Expeditions' privacy policy to understand how we protect and use your personal information for safari bookings and travel services.",
  keywords: SEO.keywords,
  alternates: {
    canonical: `${SEO.canonical}/privacy`,
    languages: { "en-US": `${SEO.canonical}/privacy` },
  },
  openGraph: {
    title: "Privacy Policy | Jae Travel Expeditions",
    description: "Our commitment to protecting your privacy and personal data.",
    url: `${SEO.canonical}/privacy`,
    siteName: SEO.siteName,
    images: SEO.openGraph.images,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Jae Travel Expeditions",
    description: "Our commitment to protecting your privacy and personal data.",
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

export default function PrivacyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Karen Road",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    name: "Privacy Policy",
    url: `${SEO.canonical}/privacy`,
    description: "Privacy policy for Jae Travel Expeditions.",
    publisher: {
      "@type": "Organization",
      name: SEO.organizationName,
      logo: SEO.logo,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PrivacyPageClient />
    </>
  );
}
