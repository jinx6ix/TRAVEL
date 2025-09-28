// Server-side AI overview generation
export async function generateTourAIOverview(tour: any): Promise<string> {
    // In a real implementation, this would call your AI API
    // For now, we'll generate a structured overview
    
    const overviewSections = [
      `The ${tour.title} offers a comprehensive ${tour.duration}-day safari experience in ${tour.destination}.`,
      `This ${tour.category.toLowerCase()} tour is designed for ${tour.difficulty?.toLowerCase() || 'all'} fitness levels.`,
      `Highlights include ${tour.highlights?.slice(0, 3).join(', ') || 'expert-guided wildlife viewing'}.`,
      `With groups limited to ${tour.groupSize} participants, expect personalized attention throughout.`
    ];
  
    return overviewSections.join(' ');
  }