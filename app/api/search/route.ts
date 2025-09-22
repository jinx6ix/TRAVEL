import { NextResponse } from "next/server";
import { tours } from "@/lib/tours-data"; // ✅ use your real tours data

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  // 🔍 filter actual tours
  const results = tours
    .filter((tour) =>
      tour.title.toLowerCase().includes(query) ||
      tour.description.toLowerCase().includes(query) ||
      tour.destination?.toLowerCase().includes(query)
    )
    .map((tour) => ({
      id: tour.id,
      title: tour.title,
      slug: `/tours/${tour.slug}`,
      image: tour.image,
      price: tour.price,
    }));

  return NextResponse.json({ results });
}
