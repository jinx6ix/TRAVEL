import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogCTA from "./blog-cta"

// ✅ SEO metadata
export const metadata: Metadata = {
  title: "How to Go on Safari in a Wheelchair | Jae Travel",
  description:
    "Discover the ultimate guide to planning a wheelchair-accessible safari in Africa. Tips on accessible lodges, safari vehicles, destinations, and booking with confidence.",
  alternates: {
    canonical:
      "https://jaetravel.com/blog/how-to-go-on-safari-in-a-wheelchair",
  },
  openGraph: {
    title: "How to Go on Safari in a Wheelchair | Jae Travel",
    description:
      "Accessible safari planning made simple. Learn how wheelchair users can enjoy Africa’s wildlife safely and comfortably.",
    url: "https://jaetravel.com/blog/how-to-go-on-safari-in-a-wheelchair",
    siteName: "Jae Travel",
    images: [
      {
        url: "https://ik.imagekit.io/jinx/travel/WhatsApp-Image-2025-01-15-at-12.06.45-PM.webp?updatedAt=1756903260238",
        width: 1200,
        height: 630,
        alt: "Wheelchair accessible safari in Africa",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Go on Safari in a Wheelchair | Jae Travel",
    description:
      "Step-by-step guide for planning a wheelchair-friendly safari in Africa.",
    images: ["https://ik.imagekit.io/jinx/travel/WhatsApp-Image-2025-01-15-at-12.06.45-PM.webp?updatedAt=1756903260238"],
  },
  other: {
    "google-site-verification": "IGxEnPG73ZqCfKPuOdpjfM_HNDfuM03gWG9AUYOu74U",
    "yandex-verification": "b585127e41b6a92f",
    "yahoo-verification": "750BAD767F0FB4E4100952EBD7883CEE",
  },
}

export default function BlogPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Karen Road",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    headline: "How to Go on Safari in a Wheelchair",
    description:
      "Discover the ultimate guide to planning a wheelchair-accessible safari in Africa. Tips on accessible lodges, safari vehicles, destinations, and booking with confidence.",
    image: "https://ik.imagekit.io/jinx/travel/WhatsApp-Image-2025-01-15-at-12.06.45-PM.webp?updatedAt=1756903260238",
    author: {
      "@type": "Organization",
      name: "Jae Travel",
      url: "https://jaetravel.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Jae Travel",
      logo: {
        "@type": "ImageObject",
        url: "https://jaetravel/logo.png",
      },
    },
    url: "https://jaetravel.com/blogs/how-to-go-on-safari-in-a-wheelchair",
    mainEntityOfPage:
      "https://jaetravel.com/blogs/how-to-go-on-safari-in-a-wheelchair",
    datePublished: "2025-09-25",
    dateModified: "2025-09-25",
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://jaetravel.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://jaetravel.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How to Go on Safari in a Wheelchair",
        item: "https://jaetravel.com/blog/how-to-go-on-safari-in-a-wheelchair",
      },
    ],
  }

  const relatedBlogsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: "https://jaetravel.com/blog/best-time-for-african-safari",
        name: "Best Time for an African Safari",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: "https://jaetravel.com/blog/family-safari-guide",
        name: "Family Safari Guide",
      },
      {
        "@type": "ListItem",
        position: 3,
        url: "https://jaetravel.com/blog/accessible-travel-tips",
        name: "Accessible Travel Tips in Africa",
      },
    ],
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 prose prose-lg">
      {/* ✅ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schema, breadcrumbSchema, relatedBlogsSchema]),
        }}
      />

      <h1 className="text-4xl font-bold mb-6">
        How to Go on Safari in a Wheelchair: Complete Accessible Travel Guide
      </h1>

      <Image
        src="https://ik.imagekit.io/jinx/travel/WhatsApp-Image-2025-01-15-at-12.06.45-PM.webp?updatedAt=1756903260238"
        alt="Wheelchair user on African safari"
        width={1200}
        height={600}
        className="rounded-xl shadow-md my-6"
        priority
      />

      <p>
        Going on an African safari is a bucket-list adventure. But what if you
        use a wheelchair? The good news is: with the right planning, Africa’s
        wildlife experiences are more accessible than ever. This guide will walk
        you through how to plan, where to go, and what to expect on a{" "}
        <strong>wheelchair-accessible safari</strong>.
      </p>

      <h2>1. Choosing the Right Safari Destination</h2>
      <p>
        Not all safari parks are equally accessible. Some have rugged terrain,
        while others have made great progress in inclusive tourism.
      </p>
      <ul>
        <li>
          <strong>Kenya</strong> – Several lodges in Maasai Mara and Amboseli
          offer wheelchair access and customized safari vans.
        </li>
        <li>
          <strong>Tanzania</strong> – Serengeti and Ngorongoro Crater have
          specialist operators for mobility support.
        </li>
        <li>
          <strong>South Africa</strong> – Kruger National Park leads in
          accessibility, with paved areas and adapted safari vehicles.
        </li>
      </ul>

      <h2>2. Accessible Safari Vehicles</h2>
      <ul>
        <li>Ramp or lift access for wheelchairs</li>
        <li>Secure wheelchair locking systems</li>
        <li>Spacious seating for comfort</li>
      </ul>

      <h2>3. Accommodation That Works for You</h2>
      <ul>
        <li>Step-free entrances and pathways</li>
        <li>Accessible bathrooms with roll-in showers</li>
        <li>Lowered light switches and counters</li>
      </ul>

      <h2>4. Travel Tips for Wheelchair Users</h2>
      <ul>
        <li>Book well in advance—accessible lodges are limited.</li>
        <li>Share your exact needs with the operator (manual vs. power chair).</li>
        <li>Consider travel insurance that covers mobility equipment.</li>
      </ul>

      <h2>5. Why Book With Jae Travel?</h2>
      <p>
        At <Link href="/">Jae Travel</Link>, we specialize in{" "}
        <Link href="/safaris/accessible">accessible safaris</Link>. Our team
        ensures that your safari is not only unforgettable but also safe,
        comfortable, and inclusive.
      </p>

      {/* ✅ Client component for CTA */}
      <BlogCTA />

      <hr className="my-12" />

      <h3>Related Blogs</h3>
      <ul>
        <li>
          <Link href="/blog/best-time-for-african-safari">
            Best Time for an African Safari
          </Link>
        </li>
        <li>
          <Link href="/blog/family-safari-guide">Family Safari Guide</Link>
        </li>
        <li>
          <Link href="/blog/accessible-travel-tips">
            Accessible Travel Tips in Africa
          </Link>
        </li>
      </ul>
    </article>
  )
}
