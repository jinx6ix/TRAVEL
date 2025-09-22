import { SEOConfig } from '../types/seo-types';

export const SEO: SEOConfig = {
  titleTemplate: '%s | Jae Travel Expeditions - East Africa Safari Experts',
  defaultTitle: 'Jae Travel Expeditions - Premium Safaris in Kenya, Uganda, Tanzania & Rwanda',
  description: 'Experience unforgettable safaris in East Africa with Jae Travel. Custom tours in Kenya, Uganda, Tanzania, and Rwanda. Book your dream African adventure today.',
  canonical: 'https://www.jaetravel.com',
  siteUrl: 'https://www.jaetravel.com',
  siteName: 'Jae Travel Expeditions',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jaetravel.com',
    site_name: 'Jae Travel Expeditions',
    images: [
      {
        url: '/logo.svg',
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
      content:
        'Kenya safari, Uganda tours, Tanzania travel, Rwanda gorilla trekking, East Africa vacations, African safari packages, luxury safaris, budget tours Africa',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge; chrome=1',
    },
  ],

  logo: '/logo.svg',
  organizationName: 'Jae Travel Expeditions',

  // ✅ Corrected socials as string array
  socials: [
    'https://www.facebook.com/jaetravel',
    'https://www.instagram.com/jaetravel',
    'https://twitter.com/jaetravel',
  ],

  verification: {
    google: 'IGxEnPG73ZqCfKPuOdpjfM_HNDfuM03gWG9AUYOu74U',
    yandex: 'b585127e41b6a92f',
    yahoo: '750BAD767F0FB4E4100952EBD7883CEE',
  },

  defaultDescription: 'Explore unforgettable African safaris with Jae Travel Expeditions.',
  keywords: [
    'Kenya safari',
    'Uganda tours',
    'Tanzania travel',
    'Rwanda gorilla trekking',
    'East Africa vacations',
    'African safari packages',
    'luxury safaris',
    'WHEELCHAIR ACCESSIBLE SAFARIS KENYA',
    'budget tours Africa',
  ],

  twitterHandle: '@jaetravel',
};
