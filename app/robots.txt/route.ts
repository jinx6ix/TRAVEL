import { NextResponse } from "next/server";
import { SEO } from "@/config/seo.config";

export async function GET(): Promise<NextResponse> {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${SEO.canonical}/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
}
