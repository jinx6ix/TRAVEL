// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import { SEO } from "@/config/seo.config";

// Helper to escape XML safely
function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<NextResponse> {
  const lastMod = new Date().toISOString();

  // The XML sitemap index linking to your other sitemap files
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>${escapeXml(`${SEO.canonical}/sitemap-static.xml`)}</loc>
      <lastmod>${lastMod}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${escapeXml(`${SEO.canonical}/sitemap-tours.xml`)}</loc>
      <lastmod>${lastMod}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${escapeXml(`${SEO.canonical}/sitemap-offers.xml`)}</loc>
      <lastmod>${lastMod}</lastmod>
    </sitemap>
  </sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
