import BlogContent from '@/components/blog-content';
import type { Metadata } from "next";
import { blogPosts, galleryItems } from '@/lib/data';
import { SEO } from "@/config/seo.config";
import Head from 'next/head';

// Structured Data for SEO
const generateStructuredData = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jaetravel.com';
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Karen Road",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    "name": "Safari Blog & Gallery | Expert Travel Guides & Tips",
    "description": "Discover expert safari tips, wildlife guides, and stunning photography from East Africa's premier safari destinations.",
    "url": `${siteUrl}/blog`,
    "mainEntity": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "image": post.image,
      "url": `${siteUrl}/blog/${post.slug}`
    }))
  };
};

export const metadata: Metadata = {
  title: `Blog | ${SEO.siteName} - Safari Tips & News`,
  description: "Read the latest safari news, travel tips, and adventure stories from Jae Travel Expeditions. Discover East Africa through our blog.",
  keywords: SEO.keywords,
  alternates: {
    canonical: `${SEO.canonical}/blog`,
    languages: { "en-US": `${SEO.canonical}/blog` },
  },
  openGraph: {
    title: "Jae Travel Expeditions Blog - Safari Insights",
    description: "Latest news and tips for your East African safari adventure.",
    url: `${SEO.canonical}/blog`,
    siteName: SEO.siteName,
    images: SEO.openGraph.images,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jae Travel Expeditions Blog - Safari Insights",
    description: "Latest news and tips for your East African safari adventure.",
    images: SEO.openGraph.images,
    creator: SEO.twitterHandle || "@jaetravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: SEO.verification,
  category: "Travel & Tourism",
  authors: [{ name: SEO.siteName, url: SEO.canonical }],
};

export default function ContentPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jaetravel.com';
  const currentUrl = `${siteUrl}/blog`;
  const featuredImage = blogPosts.length > 0 ? blogPosts[0].image : `${siteUrl}/images/blog-default.jpg`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Jae Travel Expeditions Blog",
    url: `${SEO.canonical}/blog`,
    description: "Safari news, travel tips, and adventure stories from East Africa.",
    publisher: {
      "@type": "Organization",
      name: SEO.organizationName,
      logo: SEO.logo,
    },
  };

  return (
    <>
      <Head>
        <title>Safari Blog & Gallery | Expert Travel Guides & Tips</title>
        <meta name="description" content="Discover expert safari tips, wildlife guides, and stunning photography from East Africa's premier safari destinations. Plan your adventure with our comprehensive travel resources." />
        <meta name="keywords" content="safari blog, travel guides, wildlife photography, East Africa travel, safari tips, Maasai Mara, gorilla trekking, Kilimanjaro climbing, African safari" />
        <meta name="author" content="JaeTravel Expeditions" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content="Safari Blog & Gallery | Expert Travel Guides & Tips" />
        <meta property="og:description" content="Discover expert safari tips, wildlife guides, and stunning photography from East Africa's premier safari destinations." />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:site_name" content="JaeTravel Expeditions" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content="Safari Blog & Gallery | Expert Travel Guides & Tips" />
        <meta property="twitter:description" content="Discover expert safari tips, wildlife guides, and stunning photography from East Africa's premier safari destinations." />
        <meta property="twitter:image" content={featuredImage} />
        <meta name="twitter:creator" content="@jaetravel" />
        <meta name="twitter:site" content="@jaetravel" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <BlogContent blogPosts={blogPosts} galleryItems={galleryItems} />
    </>
  );
}

// Next.js metadata export for app directory

