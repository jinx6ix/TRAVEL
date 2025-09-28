// lib/seo-utils.ts
import { TourData } from "@/data/tours-data";

// Define RelatedTour type for clarity
export interface RelatedTour {
  slug: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  category: string;
}

// Get related tours for internal linking
export function getRelatedTours(currentTour: TourData, allTours: TourData[], limit: number = 4): RelatedTour[] {
  return allTours
    .filter(tour => 
      tour.slug !== currentTour.slug && 
      (tour.destination === currentTour.destination || 
       tour.category === currentTour.category)
    )
    .sort((a, b) => {
      // Prioritize same destination, then same category
      const aScore = (a.destination === currentTour.destination ? 2 : 0) + 
                    (a.category === currentTour.category ? 1 : 0);
      const bScore = (b.destination === currentTour.destination ? 2 : 0) + 
                    (b.category === currentTour.category ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, limit)
    .map(tour => ({
      slug: tour.slug,
      title: tour.title,
      destination: tour.destination,
      duration: tour.duration,
      price: tour.price,
      image: tour.gallery && tour.gallery.length > 0 ? tour.gallery[0] : "/images/placeholder.jpg",
      category: tour.category,
    }));
}

// Generate SEO-friendly tour slugs
export function generateTourSlug(title: string, destination: string): string {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${destination.toLowerCase()}-safari`
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Get unique destinations from tours
export function getTourDestinations(tours: TourData[]): string[] {
  return [...new Set(tours.map(tour => tour.destination))].filter(Boolean);
}

// Get unique categories from tours
export function getTourCategories(tours: TourData[]): string[] {
  return [...new Set(tours.map(tour => tour.category))].filter(Boolean);
}

// Generate unique meta description for tours
export async function generateUniqueMetaDescription(tour: TourData): Promise<string> {
  const templates = [
    `Experience ${tour.title} in ${tour.destination}. ${tour.duration} ${tour.category} tour featuring ${tour.highlights?.[0] || 'wildlife viewing'}. Book now for $${tour.price} USD.`,
    `Join our ${tour.duration} ${tour.title} through ${tour.destination}. ${tour.description?.substring(0, 120) || 'Premium experience with expert guides.'}`,
    `Book ${tour.title} - ${tour.duration} in ${tour.destination}. ${tour.category} tour featuring ${tour.highlights?.slice(0, 2).join(', ') || 'unique experiences'}.`
  ];

  // Select template based on tour characteristics
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  
  // Ensure natural length (150-160 characters)
  let description = selectedTemplate;
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }
  
  return description;
}