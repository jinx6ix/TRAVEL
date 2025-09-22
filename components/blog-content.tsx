"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, ArrowRight, ImageIcon, BookOpen, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import LazyVideo from "./LazyVideo";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
  slug: string;
}

interface GalleryItem {
  id: number;
  type: string;
  title: string;
  src: string;
  description: string;
  date: string;
}

interface BlogContentProps {
  blogPosts: BlogPost[];
  galleryItems: GalleryItem[];
}

export default function BlogContent({ blogPosts, galleryItems }: BlogContentProps) {
  const [activeTab, setActiveTab] = useState<'blog' | 'gallery'>('blog');
  const [selectedMedia, setSelectedMedia] = useState<null | { index: number; item: GalleryItem }>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

  const openMedia = (index: number) => setSelectedMedia({ index, item: galleryItems[index] });
  const closeMedia = () => setSelectedMedia(null);
  const navigateMedia = (direction: 'prev' | 'next') => {
    if (!selectedMedia) return;
    let newIndex = direction === 'prev'
      ? (selectedMedia.index - 1 + galleryItems.length) % galleryItems.length
      : (selectedMedia.index + 1) % galleryItems.length;
    setSelectedMedia({ index: newIndex, item: galleryItems[newIndex] });
    videoRef.current?.currentTime && (videoRef.current.currentTime = 0);
    videoRef.current?.play();
  };

  const generateBlogStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Safari Blog & Gallery",
    "description": "Expert safari tips, wildlife guides, and photography from East Africa's premier safari destination",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "author": { "@type": "Organization", "name": "Safari Experts" },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": { "@type": "Person", "name": post.author },
      "image": post.image,
      "keywords": post.category
    }))
  });

  return (
    <div className="min-h-screen pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogStructuredData()) }} />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-bold mb-4">
          {activeTab === 'blog' ? 'Safari Blog & Travel Guides' : 'Safari Photo Gallery'}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl mb-8">
          {activeTab === 'blog' 
            ? "Expert safari tips, wildlife guides, and travel advice for East Africa adventures" 
            : "Visual journey through Kenya and Tanzania safari experiences"}
        </motion.p>
        <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-center gap-4" aria-label="Content type selection">
          <Button variant={activeTab === 'blog' ? 'default' : 'outline'} className={`flex items-center gap-2 ${activeTab === 'blog' ? 'bg-white text-orange-600' : 'bg-transparent text-white'}`} onClick={() => setActiveTab('blog')} aria-pressed={activeTab === 'blog'}><BookOpen size={18}/>Safari Blog</Button>
          <Button variant={activeTab === 'gallery' ? 'default' : 'outline'} className={`flex items-center gap-2 ${activeTab === 'gallery' ? 'bg-white text-orange-600' : 'bg-transparent text-white'}`} onClick={() => setActiveTab('gallery')} aria-pressed={activeTab === 'gallery'}><ImageIcon size={18}/>Photo Gallery</Button>
        </motion.nav>
      </header>

      <main>
        {activeTab === 'blog' ? (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="py-20" aria-labelledby="featured-heading">
                <div className="container mx-auto px-4">
                  <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-12" itemScope itemType="https://schema.org/BlogPosting">
                    <h2 id="featured-heading" className="text-3xl font-bold mb-8 text-center">Featured Safari Article</h2>
                    <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        <div className="relative overflow-hidden">
                          <Image
                            src={featuredPost.image || "/placeholder.svg"}
                            alt={`Featured image for ${featuredPost.title}`}
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                          <Badge className="absolute top-4 left-4 bg-orange-600">Featured</Badge>
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                          <Badge variant="outline" className="w-fit mb-4" itemProp="keywords">{featuredPost.category}</Badge>
                          <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-2xl lg:text-3xl mb-2" itemProp="headline">{featuredPost.title}</CardTitle>
                            <CardDescription className="text-lg" itemProp="description">{featuredPost.excerpt}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-0">
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                              <div className="flex items-center gap-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                                <User size={16} /><span itemProp="name">{featuredPost.author}</span>
                              </div>
                              <div className="flex items-center gap-1"><Calendar size={16} /><time dateTime={featuredPost.date} itemProp="datePublished">{new Date(featuredPost.date).toLocaleDateString()}</time></div>
                              <div className="flex items-center gap-1"><Clock size={16} /><span>{featuredPost.readTime}</span></div>
                            </div>
                            <Button asChild><Link href={`/blog/${featuredPost.id}`} aria-label={`Read full article: ${featuredPost.title}`}>Read Full Article<ArrowRight size={16} className="ml-2"/></Link></Button>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  </motion.article>
                </div>
              </section>
            )}

            {/* Regular Posts Grid */}
            <section className="py-20" aria-label="Safari blog articles">
              <div className="container mx-auto px-4">
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <motion.article key={post.id} variants={itemVariants} itemScope itemType="https://schema.org/BlogPosting">
                      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full group">
                        <div className="relative overflow-hidden h-48">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={`Thumbnail for ${post.title}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            loading="lazy"
                          />
                          <Badge className="absolute top-4 left-4 bg-orange-600" itemProp="keywords">{post.category}</Badge>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl line-clamp-2 group-hover:text-orange-600 transition-colors" itemProp="headline">{post.title}</CardTitle>
                          <CardDescription className="line-clamp-3" itemProp="description">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                              <User size={14} /><span itemProp="name">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1"><Clock size={14} /><span>{post.readTime}</span></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <time dateTime={post.date} className="text-sm text-gray-500" itemProp="datePublished">{new Date(post.date).toLocaleDateString()}</time>
                            <Button variant="ghost" size="sm" asChild><Link href={`/blog/${post.id}`} aria-label={`Read more about ${post.title}`}>Read More<ArrowRight size={14} className="ml-1"/></Link></Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </section>
          </>
        ) : (
          <>{/* Gallery Tab remains unchanged, you can lazy-load images/videos using `Image` or `loading="lazy"` */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {galleryItems.map((item, index) => (
                <motion.figure
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col group cursor-pointer border-gray-200"
                    onClick={() => openMedia(index)}
                    aria-label={`View ${item.title}: ${item.description}`}
                  >
                    <div className="relative overflow-hidden aspect-[4/3]">
                      {item.type === "image" ? (
                        <Image
                          src={item.src}
                          alt={item.description}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 25vw"
                          loading="lazy"
                        />
                      ) : (
                        <div className="relative h-full">
                          <LazyVideo
                            src={item.src}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-orange-600"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-4 flex-1">
                      <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex items-center justify-between">
                      <time className="text-xs text-gray-500" dateTime={item.date}>
                        {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </time>
                      <Badge variant="outline" className="capitalize text-xs px-2 py-1 rounded-md border-gray-300">
                        {item.type}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.figure>
              ))}
            </motion.div>

            {/* Media Viewer Dialog */}
            <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && closeMedia()}>
  {selectedMedia && (
    <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black border-none rounded-lg overflow-hidden">
      <VisuallyHidden>
        <DialogTitle>
          {selectedMedia.item.title} - {selectedMedia.item.type}
        </DialogTitle>
      </VisuallyHidden>

      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close button */}
        <button
          title="Close Media"
          onClick={closeMedia}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-all text-white"
          aria-label="Close media viewer"
        >
          <X size={24} />
        </button>

        {/* Previous button */}
        <button
          title="Previous Media"
          onClick={() => navigateMedia("prev")}
          className="absolute left-4 z-50 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-all text-white"
          aria-label="View previous media"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Media content */}
                  <div className="w-full h-full flex items-center justify-center p-4">
                    {selectedMedia.item.type === "image" ? (
                      <Image
                        src={selectedMedia.item.src}
                        alt={selectedMedia.item.description}
                        width={1920}
                        height={1080}
                        className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        priority={true} // Important for LCP
                        sizes="(max-width: 1024px) 100vw, 80vw"
                      />
                    ) : (
                      <LazyVideo
                        ref={videoRef}
                        src={selectedMedia.item.src}
                        className="max-w-full max-h-[80vh] rounded-lg"
                        controls
                        autoPlay
                        playsInline
                        aria-label={`Video: ${selectedMedia.item.title}`}
                      />
                    )}
                  </div>

                  {/* Next button */}
                  <button
                    title="Next Media"
                    onClick={() => navigateMedia("next")}
                    className="absolute right-4 z-50 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-all text-white"
                    aria-label="View next media"
                  >
                    <ChevronRight size={28} />
                  </button>

                  {/* Caption */}
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12 text-white">
                    <h3 className="text-xl font-bold mb-1">{selectedMedia.item.title}</h3>
                    <p className="text-gray-300">{selectedMedia.item.description}</p>
                    <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                      <time dateTime={selectedMedia.item.date}>
                        {new Date(selectedMedia.item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span className="capitalize">{selectedMedia.item.type}</span>
                    </div>
                  </figcaption>
                </div>
              </DialogContent>
            )}
          </Dialog>

          </>
        )}
      </main>
    </div>
  );
}
