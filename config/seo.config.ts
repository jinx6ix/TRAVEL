// config/seo.config.ts
import { SEOConfig } from '../types/seo-types';

export const SEO: SEOConfig = {
  titleTemplate: '%s | Jae Travel Expeditions - East Africa Safari Experts',
  defaultTitle: 'Jae Travel Expeditions - Premium Safaris in Kenya, Uganda, Tanzania & Rwanda',
  description: 'Experience unforgettable safaris in East Africa with Jae Travel. Custom tours in Kenya, Uganda, Tanzania, and Rwanda. Book your dream African adventure today.',
  canonical: 'https://www.jaetravel.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jaetravel.com',
    site_name: 'Jae Travel',
    images: [
      {
        url: '/public/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Jae Travel Expeditions - East Africa Safari Tours',
      },
    ],
  },
  twitter: {
    handle: '@jaetravel',
    site: '@jaetravel',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'Kenya safari, Uganda tours, Tanzania travel, Rwanda gorilla trekking, East Africa vacations, African safari packages, luxury safaris, budget tours Africa'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge; chrome=1'
    }
  ],
};