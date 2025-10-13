// app/sitemap-offers.xml/route.ts
import { NextResponse } from "next/server";
import { SEO } from "@/config/seo.config";

// Safari offer data
const safariOffers = [
  {
    id: 1,
    slug: "nairobi-highlights-express-tour",
    title: "Nairobi Highlights Express Tour",
    destination: "Kenya",
    duration: "Half Day (5 hrs)",
    price: 99,
    originalPrice: 129,
    rating: 4.8,
    reviews: 142,
    image:
      "https://ik.imagekit.io/jinx/travel/Giraffe-at-Nairobi-National-Park.webp?updatedAt=1751635762605",
    description:
      "Perfect for layovers! Experience Nairobi's top attractions in just hours",
    badge: "TRANSIT SPECIAL",
    highlights: [
      "Hotel pickup/drop-off included",
      "Giraffe Centre & Karen Blixen Museum",
    ],
    offer: "Book 48hrs in advance & get free airport transfer",
    availability: "Only 3 spots left today",
  },
  {
    id: 2,
    slug: "maasai-mara-luxury-safari",
    title: "Maasai Mara Luxury Safari",
    destination: "Kenya",
    duration: "3 Days / 2 Nights",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 89,
    image:
      "https://ik.imagekit.io/jinx/travel/mahali-mzuri-2-2-420x310.jpg?updatedAt=1751635762576",
    description: "Premium safari with luxury tents & private game drives",
    badge: "BEST SELLER",
    highlights: ["Award-winning eco-lodges", "Sunset champagne game drives"],
    offer: "FREE night + massage for couples (limited time)",
    availability: "High season - booking fast",
  },
  {
    id: 3,
    slug: "amboseli-elephant-paradise",
    title: "Amboseli Elephant Paradise",
    destination: "Kenya",
    duration: "2 Days / 1 Night",
    price: 749,
    originalPrice: 899,
    rating: 4.7,
    reviews: 63,
    image:
      "https://ik.imagekit.io/jinx/travel/Amboseli-National-Park-Elephantsssss.jpg?updatedAt=1751635762755",
    description: "Hundreds of elephants with Kilimanjaro backdrop",
    badge: "FAMILY FAVORITE",
    highlights: [
      "Guaranteed elephant sightings",
      "Kilimanjaro photo opportunities",
    ],
    offer: "Kids under 12 stay FREE (2 adults minimum)",
    availability: "Only 1 lodge remaining",
  },
];

// --- Utility function to escape invalid XML characters ---
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<NextResponse> {
  const lastModified = new Date("2025-09-28T14:29:00Z");
  const OFFERS_PER_PAGE = 10;
  const totalPages = Math.ceil(safariOffers.length / OFFERS_PER_PAGE);

  // Generate paginated offer index pages
  const paginatedIndexPages = [];
  for (let page = 1; page <= totalPages; page++) {
    const url =
      page === 1
        ? `${SEO.canonical}/offers`
        : `${SEO.canonical}/offers/page/${page}`;
    paginatedIndexPages.push({
      url,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [
        {
          loc: `${SEO.canonical}/images/offer-og.jpg`,
          title: `Safari Special Offers - Page ${page}`,
        },
      ],
      alternates: {
        languages: {
          "en-US": url,
        },
      },
    });
  }

  // Generate individual offer pages
  const offerPages = safariOffers.map((offer) => ({
    url: `${SEO.canonical}/offers/${offer.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: [
      {
        loc: offer.image,
        title: offer.title,
      },
    ],
    alternates: {
      languages: {
        "en-US": `${SEO.canonical}/offers/${offer.slug}`,
      },
    },
  }));

  // Combine all URLs
  const allOfferUrls = [...paginatedIndexPages, ...offerPages];

  // --- Build sitemap XML safely ---
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      ${allOfferUrls
        .map(
          (offer) => `
        <url>
          <loc>${escapeXml(offer.url)}</loc>
          <lastmod>${offer.lastModified.toISOString()}</lastmod>
          <changefreq>${offer.changeFrequency}</changefreq>
          <priority>${offer.priority}</priority>
          ${offer.images
            .map(
              (img) => `
            <image:image>
              <image:loc>${escapeXml(img.loc)}</image:loc>
              <image:title>${escapeXml(img.title)}</image:title>
            </image:image>`
            )
            .join("")}
          <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(
            offer.url
          )}" />
        </url>`
        )
        .join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
