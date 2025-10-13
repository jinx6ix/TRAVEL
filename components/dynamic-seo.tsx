"use client"

import { usePathname } from "next/navigation"
import { pageKeywords } from "@/lib/keywords"

// Type guard to check if an item has the required properties
function isPageKeywordItem(item: any): item is { 
  url: string; 
  metaTitle: string; 
  metaDescription: string;
  region?: string;
  country?: string;
  internalLinks?: Array<{ url: string; label: string }>;
} {
  return item && typeof item.url === 'string' && 
         typeof item.metaTitle === 'string' && 
         typeof item.metaDescription === 'string'
}

export default function DynamicSEO() {
  const pathname = usePathname()
  
  // Find the matching item and check its type
  const matched = pageKeywords.find((item) => item.url === pathname)
  
  if (!matched || !isPageKeywordItem(matched)) return null

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Karen Road",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    name: matched.metaTitle,
    description: matched.metaDescription,
    image: "https://ik.imagekit.io/jinx/travel/logo.jpg?updatedAt=1751985025367",
    provider: {
      "@type": "TravelAgency",
      name: "JaeTravel Expeditions",
      url: "https://jaetravel.com",
    },
  }

  // Safely access internalLinks with optional chaining
  let linksToShow = matched.internalLinks || []

  // If no internal links are defined, generate related links
  if (linksToShow.length === 0) {
    const related = pageKeywords
      .filter((item) => 
        isPageKeywordItem(item) &&
        item.url !== pathname &&
        (item.region === matched.region || item.country === matched.country)
      )
      .slice(0, 4)

    linksToShow = related.map((r) => ({
      url: r.url,
      label: r.metaTitle,
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {linksToShow.length > 0 && (
        <section className="p-6 bg-gray-50 rounded-lg mt-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Explore More Safaris</h3>
          <ul className="list-disc list-inside space-y-2">
            {linksToShow.map((link, idx) => (
              <li key={idx} className="text-blue-600 hover:text-blue-800 transition-colors">
                <a href={link.url} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}