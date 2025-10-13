// app/sitemap.xml/route.ts
import type { MetadataRoute } from "next";
import { NextResponse } from "next/server";
import toursData, { TourData } from "@/data/tours-data";
import { SEO } from "@/config/seo.config";

// ✅ Helper to escape XML special characters
function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<NextResponse> {
  const tours = toursData.map((tour: TourData) => ({
    url: `${SEO.canonical}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images:
      tour.gallery?.map((img, index) => ({
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
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      <url>
        <loc>${escapeXml(SEO.canonical)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        <image:image>
          <image:loc>${escapeXml(SEO.logo || "/og-image.jpg")}</image:loc>
          <image:title>Jae Travel Expeditions Logo</image:title>
        </image:image>
        <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(
          SEO.canonical
        )}" />
      </url>
      <url>
        <loc>${escapeXml(SEO.canonical + "/about")}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
        <image:image>
          <image:loc>${escapeXml(SEO.logo || "/og-image.jpg")}</image:loc>
          <image:title>Jae Travel Expeditions About Page</image:title>
        </image:image>
        <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(
          SEO.canonical + "/about"
        )}" />
      </url>
      ${tours
        .map(
          (tour) => `
        <url>
          <loc>${escapeXml(tour.url)}</loc>
          <lastmod>${tour.lastModified.toISOString()}</lastmod>
          <changefreq>${tour.changeFrequency}</changefreq>
          <priority>${tour.priority}</priority>
          ${tour.images
            .map(
              (img) => `
            <image:image>
              <image:loc>${escapeXml(img.loc)}</image:loc>
              <image:title>${escapeXml(img.title)}</image:title>
            </image:image>`
            )
            .join("")}
          <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(
            tour.url
          )}" />
        </url>`
        )
        .join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
