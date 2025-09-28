// app/api/og/route.ts
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import toursData from "@/data/tours-data";
import { SEO } from "@/config/seo.config";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const tour = toursData.find((t) => t.slug === slug);
  if (!tour) return new Response("Tour not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          backgroundImage: `url(${tour.gallery[0] || `${SEO.canonical}/images/placeholder.jpg`})`,
          backgroundSize: "cover",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "48px",
          textAlign: "center",
          fontWeight: "bold",
          backgroundColor: "#000",
        }}
      >
        {tour.title} - {tour.destination}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}