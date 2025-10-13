// config/seo.config.ts

export interface SEOConfig {
  twitterHandle: string;
  canonical: string;
  siteName: string;
  organizationName: string;
  defaultTitle: string;
  defaultDescription: string;
  logo: string;
  socials: string[];
  contactPhone: string;
  contactEmail: string;
  verification: {
    google?: string;
    yandex?: string;
    yahoo?: string;
  };
  openGraph: {
    url: any;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  keywords: string[];
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

export const SEO: SEOConfig = {
  canonical: "https://www.jaetravel.com",
  siteName: "Jae Travel Expeditions",
  organizationName: "Jae Travel Expeditions",
  defaultTitle: "Jae Travel Expeditions - Premium Safaris in Kenya, Uganda, Tanzania & Rwanda",
  defaultDescription:
    "Experience unforgettable safaris in East Africa with Jae Travel. Custom tours in Kenya, Uganda, Tanzania, and Rwanda. Book your dream African adventure today.",
  logo: "https://jaetravel.com/logo.svg",
  socials: [
    "https://www.facebook.com/JaeTravelExpeditions",
    "https://www.instagram.com/jaetravelexpeditions/",
    "https://twitter.com/jaetravel",
  ],
  contactPhone: "+254726485228",
  contactEmail: "info@jaetravel.com",
  verification: {
    google: "IGxEnPG73ZqCfKPuOdpjfM_HNDfuM03gWG9AUYOu74U",
    yandex: "b585127e41b6a92f",
    yahoo: "750BAD767F0FB4E4100952EBD7883CEE",
  },
  keywords: [
    "Kenya safari",
    "Uganda tours",
    "Tanzania travel",
    "Rwanda gorilla trekking",
    "East Africa vacations",
    "African safari packages",
    "luxury safaris",
    "WHEELCHAIR ACCESSIBLE SAFARIS KENYA",
    "budget tours Africa",
  ],
  twitterHandle: "@jaetravelexpeditions",
  openGraph: {
    url: "https://www.jaetravel.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jae Travel Expeditions",
      },
    ],
  },
  address: {
    streetAddress: "Karen Road",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    postalCode: "00100",
    addressCountry: "KE",
  },
};
