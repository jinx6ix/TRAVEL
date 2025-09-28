
// app/sitemap-tours.xml/route.ts
import { NextResponse } from "next/server";
import toursData, { TourData } from "@/data/tours-data";
import { SEO } from "@/config/seo.config";

export async function GET(): Promise<NextResponse> {
  const lastModified = new Date("2025-09-28T13:59:00Z"); // 04:59 PM EAT on 2025-09-28

  const tours = toursData.map((tour: TourData) => ({
    url: `${SEO.canonical}/tours/${tour.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: tour.gallery?.map((img, index) => ({
      loc: img,
      title: `${tour.title} - Image ${index + 1}`,
    })) || [],
    alternates: {
      languages: {
        "en-US": `${SEO.canonical}/tours/${tour.slug}`,
      },
    },
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${tours
        .map(
          (tour) => `
        <url>
          <loc>${tour.url}</loc>
          <lastmod>${tour.lastModified.toISOString()}</lastmod>
          <changefreq>${tour.changeFrequency}</changefreq>
          <priority>${tour.priority}</priority>
          ${tour.images
            .map(
              (img) => `
            <image:image>
              <image:loc>${img.loc}</image:loc>
              <image:title>${img.title}</image:title>
            </image:image>`
            )
            .join("")}
          <xhtml:link rel="alternate" hreflang="en-US" href="${tour.url}" />
        </url>`
        )
        .join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
