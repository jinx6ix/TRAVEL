import type { Metadata } from "next"
import { SEO } from "@/config/seo.config"
import OffersClient from "./OffersClient"

export const metadata: Metadata = {
  title: `Safari Special Offers | ${SEO.defaultTitle}`,
  description: "Browse our limited-time safari special offers and deals. Get discounted rates on premium Kenya safari experiences with exclusive perks.",
  openGraph: {
    title: `Safari Special Offers | ${SEO.defaultTitle}`,
    description: "Browse our limited-time safari special offers and deals. Get discounted rates on premium Kenya safari experiences with exclusive perks.",
    url: `${SEO.canonical}/offers`,
    images: SEO.openGraph.images,
  },
  alternates: {
    canonical: `${SEO.canonical}/offers`,
  },
}

export default function OffersPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header stays on the SERVER for SEO */}
      <section 
        className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" itemProp="headline">
            Safari Special Offers
          </h1>
          <p className="text-xl mb-8" itemProp="description">
            Limited-time deals on premium safari experiences
          </p>
        </div>
      </section>

      {/* Client-side interactive part */}
      <OffersClient />
    </div>
  )
}
