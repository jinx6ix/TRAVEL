import { NextResponse } from "next/server";
import { SEO } from "@/config/seo.config";

// ✅ XML escaping helper
function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<NextResponse> {
  const lastModified = new Date("2025-09-28T14:29:00Z"); // 05:29 PM EAT

  const base = escapeXml(SEO.canonical);

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${base}/sitemap-static.xml</loc>
        <lastmod>${lastModified.toISOString()}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${base}/sitemap-tours.xml</loc>
        <lastmod>${lastModified.toISOString()}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${base}/sitemap-offers.xml</loc>
        <lastmod>${lastModified.toISOString()}</lastmod>
      </sitemap>
    </sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    headers: { "Content-Type": "application/xml" },
  });
}
