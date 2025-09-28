
// app/sitemap-static.xml/route.ts
import { NextResponse } from "next/server";
import { SEO } from "@/config/seo.config";

export async function GET(): Promise<NextResponse> {
  const lastModified = new Date("2025-09-28T13:59:00Z"); // 04:59 PM EAT on 2025-09-28

  const staticPages = [
    {
      url: SEO.canonical,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      images: [
        {
          loc: SEO.logo,
          title: "Jae Travel Expeditions Logo",
        },
        
      ],
    },
    {
      url: `${SEO.canonical}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [
        {
          loc: SEO.logo,
          title: "Jae Travel Expeditions About Page",
        },
      ],
    },
    {
      url: `${SEO.canonical}/tours`, // Added Tours index page
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [
        {
          loc: SEO.logo,
          title: "Jae Travel Expeditions Tours Page",
        },
      ],
    },
    {
      url: `${SEO.canonical}/vehicle-hire`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [
        {
          loc: "https://ik.imagekit.io/jinx/travel/6-1536x776%20(2).png?updatedAt=1750087071508",
          title: "Toyota Landcruiser",
        },
        {
          loc: "https://ik.imagekit.io/jinx/travel/5-1536x776%20(1).png?updatedAt=1750087067905?height=300&width=400",
          title: "Toyota Prado",
        },
        {
          loc: "//ik.imagekit.io/jinx/travel/4-1536x776%20(1).png?updatedAt=1750087065024?height=300&width=400",
          title: "Luxury Roof Top Camping",
        },
        {
          loc: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-07-07%20at%2018.28.17_94668579.jpg?updatedAt=1751902480309?height=300&width=400",
          title: "Photography Converted Vehicle",
        },
        {
          loc: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Image%202025-09-02%20at%2011.43.25%20AM.jpeg?updatedAt=1756810077606",
          title: "Wheelchair Accessible Vehicle",
        },
        {
          loc: "https://ik.imagekit.io/jinx/travel/car-van-1536x776%20(1).png?updatedAt=1750087064275?height=300&width=400",
          title: "Family Safari Minivan",
        },
        // Add more vehicle images as needed
      ],
    },
    {
      url: `${SEO.canonical}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [
        {
          loc: SEO.logo,
          title: "Jae Travel Expeditions Contact Page",
        },
      ],
    },
    {
      url: `${SEO.canonical}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
      images: [
        {
          loc: SEO.logo,
          title: "Jae Travel Expeditions Blog",
        },
      ],
    },
    {
      url: `${SEO.canonical}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
      images: [
        {
          loc: SEO.logo,
          title: "Jae Travel Expeditions Terms of Service",
        },
      ],
    },
    {
      url: `${SEO.canonical}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
      images: [
        {
          loc: SEO.logo,
          title: "Jae Travel Expeditions Privacy Policy",
        },
      ],
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${staticPages
        .map(
          (page) => `
        <url>
          <loc>${page.url}</loc>
          <lastmod>${page.lastModified.toISOString()}</lastmod>
          <changefreq>${page.changeFrequency}</changefreq>
          <priority>${page.priority}</priority>
          ${page.images
            .map(
              (img) => `
            <image:image>
              <image:loc>${img.loc}</image:loc>
              <image:title>${img.title}</image:title>
            </image:image>`
            )
            .join("")}
          <xhtml:link rel="alternate" hreflang="en-US" href="${page.url}" />
        </url>`
        )
        .join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
