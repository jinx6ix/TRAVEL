// app/api/ai-overview/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const USE_MOCK = process.env.USE_MOCK_AI === "true";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tour } = body ?? {};

    if (!tour || typeof tour !== "object") {
      return NextResponse.json({ error: "Missing 'tour' in request body" }, { status: 400 });
    }

    // Small safety: avoid sending extremely large objects to OpenAI
    const safeTour = {
      title: String(tour.title || ""),
      description: String(tour.description || ""),
      destination: String(tour.destination || ""),
      location: String(tour.location || tour.destination || ""),
      price: tour.price ?? "",
      duration: String(tour.duration ?? ""),
      rating: tour.rating ?? "",
      gallery: Array.isArray(tour.gallery) ? tour.gallery.slice(0, 3) : [],
      category: String(tour.category || ""),
      difficulty: String(tour.difficulty || ""),
    };

    // Mock response (local dev)
    if (USE_MOCK) {
      const mockOverview = `🌍 [Mock] ${safeTour.title} — ${safeTour.duration} in ${safeTour.location || safeTour.destination}. Starting at $${safeTour.price}. A ${safeTour.rating}⭐ experience for travelers.`;
      return NextResponse.json({ overview: mockOverview });
    }

    // Real AI call
    const prompt: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      {
        role: "system",
        content: "You are a friendly travel assistant that writes short, engaging tour overviews (1-3 short paragraphs). Keep it positive and factual.",
      },
      {
        role: "user",
        content: `Write a concise, engaging overview for this tour (1-3 short paragraphs). Use the following data: ${JSON.stringify(safeTour)}. Mention highlights, who it's best for, and a short closing call-to-action sentence.`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: prompt,
      max_tokens: 250,
      temperature: 0.8,
    });

    const overview = response.choices?.[0]?.message?.content?.trim() ?? "No overview generated.";
    return NextResponse.json({ overview });
  } catch (err: any) {
    // If missing API key or other OpenAI error, return friendly message but don't leak secrets
    console.error("AI overview error:", err?.message ?? err);
    return NextResponse.json(
      { overview: "⚠️ Could not generate AI overview at this time. Please try again later." },
      { status: 500 }
    );
  }
}
