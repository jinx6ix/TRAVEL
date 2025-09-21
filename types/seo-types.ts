import { Verification } from "next/dist/lib/metadata/types/metadata-types";

// types/seo-types.ts
export interface SEOConfig {
    defaultDescription: string;
    keywords: any;
    siteUrl: any;
    twitterHandle: string;
    verification: Verification | undefined;
    siteName: string | undefined;
    titleTemplate: string;
    defaultTitle: string;
    description: string;
    canonical?: string;
    openGraph: {
      type: string;
      locale: string;
      url: string;
      site_name: string;
      images: Array<{
        url: string;
        width: number;
        height: number;
        alt: string;
      }>;
    };
    twitter: {
      handle: string;
      site: string;
      cardType: string;
    };
    additionalMetaTags?: Array<{
      name?: string;
      content?: string;
      property?: string;
      httpEquiv?: string;
    }>;
  }
  
  export interface TourData {
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    images: Array<{
      url: string;
      alt?: string;
    }>;
    itinerary: Array<{
      day: string;
      activities: string;
    }>;
    price: string;
    validUntil: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface BlogPostData {
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    publishedAt: string;
    updatedAt: string;
    author: {
      name: string;
    };
    tags: string[];
  }