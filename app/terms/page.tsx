
// app/terms/TermsPageClient.tsx
"use client";

import { useEffect } from "react";
import { SEO } from "@/config/seo.config";

export default function TermsPageClient() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Terms of Service | Jae Travel Expeditions",
        page_location: `${SEO.canonical}/terms`,
      });
    }
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="text-lg mb-4">
        Welcome to Jae Travel Expeditions. These terms and conditions outline the rules and regulations for the use of our website and services.
      </p>
      <p className="text-lg mb-4">
        By accessing this website and booking our tours, we assume you accept these terms and conditions. Do not continue to use Jae Travel Expeditions if you do not agree to take all of the terms and conditions stated on this page.
      </p>
      <p className="text-lg">
        For any questions, please contact us at {SEO.contactEmail} or {SEO.contactPhone}.
      </p>
    </main>
  );
}
