// app/sitemap-index.xml/route.ts
import { NextResponse } from "next/server";
import { SEO } from "@/config/seo.config";

export async function GET(): Promise<NextResponse> {
  const lastModified = new Date("2025-09-28T14:29:00Z"); // 05:29 PM EAT on 2025-09-28

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${SEO.canonical}/sitemap-static.xml</loc>
        <lastmod>${lastModified.toISOString()}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${SEO.canonical}/sitemap-tours.xml</loc>
        <lastmod>${lastModified.toISOString()}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${SEO.canonical}/sitemap-offers.xml</loc>
        <lastmod>${lastModified.toISOString()}</lastmod>
      </sitemap>
    </sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    headers: { "Content-Type": "application/xml" },
  });
}