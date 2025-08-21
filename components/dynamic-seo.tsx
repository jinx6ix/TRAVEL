"use client"

import { usePathname } from "next/navigation"
import { pageKeywords } from "@/lib/keywords"

export default function DynamicSEO() {
  const pathname = usePathname()
  const matched = pageKeywords.find((item) => item.url === pathname)

  if (!matched) return null

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: matched.metaTitle,
    description: matched.metaDescription,
    image:
      "https://ik.imagekit.io/jinx/travel/logo.jpg?updatedAt=1751985025367",
    provider: {
      "@type": "TravelAgency",
      name: "JaeTravel Expeditions",
      url: "https://jaetravel.com",
    },
  }

  let linksToShow = matched.internalLinks || []

  if (!linksToShow || linksToShow.length === 0) {
    const related = pageKeywords
      .filter(
        (item) =>
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
        <section className="p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">Explore More Safaris</h3>
          <ul className="list-disc list-inside space-y-2">
            {linksToShow.map((link, idx) => (
              <li key={idx}>
                <a href={link.url} className="text-blue-600 hover:underline">
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
