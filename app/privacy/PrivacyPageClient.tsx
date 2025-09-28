"use client";

import { useEffect } from "react";
import { SEO } from "@/config/seo.config";

export default function PrivacyPageClient() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Privacy Policy | Jae Travel Expeditions",
        page_location: `${SEO.canonical}/privacy`,
      });
    }
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-lg mb-4">
        At Jae Travel Expeditions, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
      </p>
      <p className="text-lg mb-4">
        We collect information when you book tours, subscribe to our newsletter, or contact us. This may include your name, email, phone number, and payment details.
      </p>
      <p className="text-lg">
        For questions about our privacy policy, contact us at {SEO.contactEmail} or {SEO.contactPhone}.
      </p>
    </main>
  );
}