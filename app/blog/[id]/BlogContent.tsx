"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ArrowLeft, MapPin } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  authorImage?: string;
  authorBio?: string;
  date: string;
  readTime: string;
  category: string;
  location?: string;
  content: string;
}

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
  return (
    <article className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/blog" className="flex items-center text-sm font-medium hover:text-orange-200 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/destinations" className="hover:text-orange-200 transition-colors">Destinations</Link>
            <Link href="/tours" className="hover:text-orange-200 transition-colors">Tours</Link>
            <Link href="/about" className="hover:text-orange-200 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-orange-200 transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-medium">{post.category}</span>
          <div>
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link> / 
            <Link href="/blog" className="hover:text-orange-600 transition-colors"> Blog</Link> / 
            <span className="text-gray-800 font-medium"> {post.title}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
          <div className="flex items-center gap-1"><User size={16} /><span>{post.author}</span></div>
          <div className="flex items-center gap-1"><Calendar size={16} /><span>{new Date(post.date).toLocaleDateString()}</span></div>
          <div className="flex items-center gap-1"><Clock size={16} /><span>{post.readTime}</span></div>
          {post.location && <div className="flex items-center gap-1"><MapPin size={16} /><span>{post.location}</span></div>}
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Content */}
        <div className="mb-12 text-lg text-black">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Author Bio */}
        {post.authorImage && (
          <div className="bg-gray-50 rounded-lg p-6 mb-12 border border-gray-200 flex items-start gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
              <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About {post.author}</h3>
              <p className="text-gray-700">{post.authorBio}</p>
            </div>
          </div>
        )}

        {/* Related Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-orange-500 pl-3">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(rp => (
              <div key={rp.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48"><Image src={rp.image} alt={rp.title} fill className="object-cover" /></div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full mb-2">{rp.category}</span>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">{rp.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{rp.excerpt}</p>
                  <Link href={`/blog/${rp.id}`} className="text-orange-600 font-medium text-sm hover:text-orange-700 inline-flex items-center transition-colors">
                    Read more <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-orange-50 py-12 border-t border-orange-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated with Our Safari Insights</h2>
          <p className="text-gray-700 mb-6">Subscribe to our newsletter for the latest safari tips, wildlife updates, and exclusive travel offers.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" required />
            <button type="submit" className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors shadow-md">Subscribe</button>
          </form>
        </section>
      </div>
    </article>
  );
}
