import { NextResponse } from "next/server";
import toursData, { TourData } from "@/data/tours-data";
import { SEO } from "@/config/seo.config";

export async function GET(): Promise<NextResponse> {
  const escapeXML = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const tours = toursData.map((tour: TourData) => ({
    url: `${SEO.canonical}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    images:
      tour.gallery?.map((img, index) => ({
        loc: img,
        title: `${tour.title} - Image ${index + 1}`,
      })) || [],
  }));

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',

    // Home page
    `<url>
      <loc>${escapeXML(SEO.canonical)}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
      <image:image>
        <image:loc>${escapeXML(SEO.logo || "/og-image.jpg")}</image:loc>
        <image:title>JaeTravel Expeditions Logo</image:title>
      </image:image>
      <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXML(SEO.canonical)}" />
    </url>`,

    // About page
    `<url>
      <loc>${escapeXML(`${SEO.canonical}/about`)}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
      <image:image>
        <image:loc>${escapeXML(SEO.logo || "/og-image.jpg")}</image:loc>
        <image:title>About Jae Travel Expeditions</image:title>
      </image:image>
      <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXML(`${SEO.canonical}/about`)}" />
    </url>`,

    // Tour pages
    ...tours.map(
      (tour) => `
      <url>
        <loc>${escapeXML(tour.url)}</loc>
        <lastmod>${tour.lastModified.toISOString()}</lastmod>
        <changefreq>${tour.changeFrequency}</changefreq>
        <priority>${tour.priority}</priority>
        ${tour.images
          .map(
            (img) => `
          <image:image>
            <image:loc>${escapeXML(img.loc)}</image:loc>
            <image:title>${escapeXML(img.title)}</image:title>
          </image:image>`
          )
          .join("")}
        <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXML(tour.url)}" />
      </url>`
    ),

    "</urlset>",
  ].join("");

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
