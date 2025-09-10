import BlogContent from '@/components/blog-content';
import { blogPosts, galleryItems } from '@/lib/data';
import Head from 'next/head';

// Generate structured data for SEO
const generateStructuredData = () => {
  const blogUrls = blogPosts.map(post => `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jaetravel.com'}/blog/${post.slug}`);
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Safari Blog & Gallery | Expert Travel Guides & Tips",
    "description": "Discover expert safari tips, wildlife guides, and stunning photography from East Africa's premier safari destinations.",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jaetravel.com'}/blog`,
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
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jaetravel.com'}/blog/${post.slug}`
    }))
  };
};

export default function ContentPage() {
  const structuredData = generateStructuredData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jaetravel.com';
  const currentUrl = `${siteUrl}/blog`;
  const featuredImage = blogPosts.length > 0 ? blogPosts[0].image : `${siteUrl}/images/blog-default.jpg`;

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Safari Blog & Gallery | Expert Travel Guides & Tips</title>
        <meta name="title" content="Safari Blog & Gallery | Expert Travel Guides & Tips" />
        <meta name="description" content="Discover expert safari tips, wildlife guides, and stunning photography from East Africa's premier safari destinations. Plan your adventure with our comprehensive travel resources." />
        <meta name="keywords" content="safari blog, travel guides, wildlife photography, East Africa travel, safari tips, Maasai Mara, gorilla trekking, Kilimanjaro climbing, African safari" />
        <meta name="author" content="JaeTravel Expeditions" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content="Safari Blog & Gallery | Expert Travel Guides & Tips" />
        <meta property="og:description" content="Discover expert safari tips, wildlife guides, and stunning photography from East Africa's premier safari destinations." />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:site_name" content="JaeTravel Expeditions" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content="Safari Blog & Gallery | Expert Travel Guides & Tips" />
        <meta property="twitter:description" content="Discover expert safari tips, wildlife guides, and stunning photography from East Africa's premier safari destinations." />
        <meta property="twitter:image" content={featuredImage} />
        <meta name="twitter:creator" content="@jaetravel" />
        <meta name="twitter:site" content="@jaetravel" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <BlogContent blogPosts={blogPosts} galleryItems={galleryItems} />
    </>
  );
}

export const metadata = {
  title: 'Safari Blog & Gallery | Expert Travel Guides & Tips',
  description: 'Discover expert safari tips, wildlife guides, and stunning photography from East Africa\'s premier safari destinations. Plan your adventure with our comprehensive travel resources.',
  keywords: 'safari blog, travel guides, wildlife photography, East Africa travel, safari tips, Maasai Mara, gorilla trekking, Kilimanjaro climbing, African safari',
  openGraph: {
    title: 'Safari Blog & Gallery | Expert Travel Guides & Tips',
    description: 'Discover expert safari tips, wildlife guides, and stunning photography from East Africa\'s premier safari destinations.',
    url: 'https://jaetravel.com/blog',
    siteName: 'JaeTravel Expeditions',
    images: [
      {
        url: blogPosts.length > 0 ? blogPosts[0].image : '/images/blog-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Safari Blog - JaeTravel Expeditions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safari Blog & Gallery | Expert Travel Guides & Tips',
    description: 'Discover expert safari tips, wildlife guides, and stunning photography from East Africa\'s premier safari destinations.',
    images: [blogPosts.length > 0 ? blogPosts[0].image : '/images/blog-default.jpg'],
    creator: '@jaetravel',
  },
  alternates: {
    canonical: 'https://jaetravel.com/blog',
  },
};