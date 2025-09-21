// lib/generateAiOverview.ts
import type { TourData } from "@/data/tours-data";

export async function generateAiOverview(tour: TourData) {
  // Mock AI response (replace with real API later if needed)
  const overview = `🌍 Discover ${tour.title} in ${tour.destination}! 
This ${tour.duration || "multi-day"} adventure is perfect for travelers seeking ${
    tour.category || "unique experiences"
  }. With expert guides, comfortable accommodations, and unforgettable activities, 
this tour ensures a once-in-a-lifetime journey.`;

  const keywords = [
    `${tour.title} tour`,
    `${tour.destination} travel`,
    `${tour.destination} safari`,
    "adventure tours",
    "expedition packages",
  ];

  // Generate sample FAQs for SEO (can later integrate with AI)
  const faqs = [
    {
      q: `What is included in the ${tour.title} tour?`,
      a: `The ${tour.title} tour includes guided activities, accommodations, and transportation according to the itinerary.`,
    },
    {
      q: `How long is the ${tour.title} tour?`,
      a: `This tour lasts ${tour.duration || "several days"}, offering a complete experience of ${tour.destination}.`,
    },
    {
      q: `What is the difficulty level of the ${tour.title} tour?`,
      a: `The tour is suitable for ${tour.level || "all travelers"}, with activities designed for comfort and safety.`,
    },
  ];

  // In your generateAiOverview function, add this check at the beginning:
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY not configured");
}

  return {
    overview,
    keywords,
    faqs,
  };
}
