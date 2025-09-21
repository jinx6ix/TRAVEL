import { MetadataRoute } from "next"
import toursData from "@/data/tours-data"
import { SEO } from "@/config/seo.config"

export default function sitemap(): MetadataRoute.Sitemap {
  const tours = toursData.map((tour) => ({
    url: `${SEO.siteUrl}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: SEO.siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...tours,
  ]
}
