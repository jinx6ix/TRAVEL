import { NextResponse } from "next/server";

const USE_MOCK = process.env.USE_MOCK_AI === "true";

export async function POST(req: Request) {
  const { tour } = await req.json();

  // ✅ Mock response (for local dev without billing)
  if (USE_MOCK) {
    return NextResponse.json({
      overview: `🌍 [Mock] ${tour.title} is an amazing ${tour.duration} experience in ${tour.location}. 
      Starting at $${tour.price}, it’s rated ${tour.rating}⭐ by past travelers!`,
    });
  }

  try {
    // ✅ Lazy import OpenAI only here
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a travel assistant that writes short, engaging tour overviews.",
        },
        {
          role: "user",
          content: `Write an overview for this tour: ${JSON.stringify(tour)}`,
        },
      ],
    });

    const overview =
      response.choices[0]?.message?.content ?? "No overview generated.";
    return NextResponse.json({ overview });
  } catch (err: any) {
    console.error("AI overview error:", err);
    return NextResponse.json(
      { overview: "⚠️ Could not generate AI overview." },
      { status: 500 }
    );
  }
}
