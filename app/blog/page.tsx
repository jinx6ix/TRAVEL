"use client"

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, ArrowRight, ImageIcon, BookOpen, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const blogPosts = [
  {
    id: 1,
    title: "Best Time to Visit Masai Mara for the Great Migration",
    excerpt: "Discover the optimal timing to witness one of nature's most spectacular events in Kenya's premier wildlife destination.",
    image: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg?updatedAt=1750013375250?height=300&width=400",
    author: "John Safari",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Wildlife",
    featured: true,
  },
  {
    id: 2,
    title: "Gorilla Trekking in Rwanda: A Complete Guide",
    excerpt: "Everything you need to know about planning your gorilla trekking adventure in Volcanoes National Park.",
    image: "https://ik.imagekit.io/jinx/travel/6-days-gorilla-tracking-and-rafting-jinja.jpg?updatedAt=1750083327865?height=300&width=400",
    author: "Mary Kimani",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Adventure",
  },
  {
    id: 3,
    title: "Photography Tips for Your Safari Expeditions",
    excerpt: "Professional tips to capture stunning wildlife photos during your East African safari experience.",
    image: "https://ik.imagekit.io/jinx/travel/new%20(1).png?updatedAt=1750098099514?height=300&width=400",
    author: "David Mwangi",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Photography",
  },
  {
    id: 4,
    title: "Cultural Experiences: Meeting the Maasai People",
    excerpt: "Learn about authentic cultural interactions and respectful tourism practices with local communities.",
    image: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg?updatedAt=1750013375250?height=300&width=400",
    author: "Sarah Akinyi",
    date: "2023-12-28",
    readTime: "7 min read",
    category: "Culture",
  },
  {
    id: 5,
    title: "Climbing Mount Kilimanjaro: Routes and Preparation",
    excerpt: "A comprehensive guide to Africa's highest peak, including route options and training tips.",
    image: "https://ik.imagekit.io/jinx/travel/kilimanjaro-moutain-climbing.jpg?updatedAt=1750013910253?height=300&width=400",
    author: "John Safari",
    date: "2023-12-20",
    readTime: "10 min read",
    category: "Adventure",
  },
  {
    id: 6,
    title: "Sustainable Safari Tourism in East Africa",
    excerpt: "How responsible tourism practices benefit wildlife conservation and local communities.",
    image: "https://ik.imagekit.io/jinx/4-Days-Ngorongoro-Wildlife-Tour.jpg?updatedAt=1750076232872?height=300&width=400",
    author: "Mary Kimani",
    date: "2023-12-15",
    readTime: "6 min read",
    category: "Conservation",
  },
  {
    id: 7,
    title: "Packing Essentials for Your Safari Expeditions",
    excerpt: "The ultimate packing checklist for your East African safari, from clothing to camera gear.",
    image: "https://ik.imagekit.io/jinx/travel/Mombasa-beach-2-1960x800.webp?updatedAt=1750085411718?height=300&width=400",
    author: "David Mwangi",
    date: "2023-12-10",
    readTime: "4 min read",
    category: "Travel Tips",
  },
  {
    id: 8,
    title: "Bird Watching in Uganda's Diverse Ecosystems",
    excerpt: "Discover Uganda's incredible bird diversity across different habitats and national parks.",
    image: "https://ik.imagekit.io/jinx/travel/lilac.jpg?updatedAt=1750098330501?height=300&width=400",
    author: "Sarah Akinyi",
    date: "2023-12-05",
    readTime: "8 min read",
    category: "Wildlife",
  },
];

const galleryItems = [
  {
    id: 1,
    type: "image",
    title: "Masai Mara Sunset",
    src: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg",
    description: "Beautiful sunset over the Masai Mara plains",
    date: "2024-01-10"
  },
  {
    id: 2,
    type: "video",
    title: "Gorilla Trekking",
    src: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Video%202025-07-06%20at%2021.39.39_fc1ee175.mp4?updatedAt=1751827587454",
    description: "Our team tracking mountain gorillas in Rwanda",
    date: "2023-12-15"
  },
  {
    id: 3,
    type: "video",
    title: "Gorilla Trekking",
    src: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Video%202025-07-06%20at%2021.39.37_afc307d2.mp4?updatedAt=1751827566022",
    description: "Our team tracking mountain gorillas in Rwanda",
    date: "2023-12-15"
  },
  {
    id: 4,
    type: "video",
    title: "Gorilla Trekking",
    src: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Video%202025-07-06%20at%2021.39.38_16f7fe74.mp4?updatedAt=1751827535288",
    description: "Our team tracking mountain gorillas in Rwanda",
    date: "2023-12-15"
  },
  {
    id: 5,
    type: "video",
    title: "Gorilla Trekking",
    src: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Video%202025-07-06%20at%2021.39.38_631b1f42.mp4?updatedAt=1751827502305",
    description: "Our team tracking mountain gorillas in Rwanda",
    date: "2023-12-15"
  },
  {
    id: 6,
    type: "video",
    title: "Gorilla Trekking",
    src: "https://ik.imagekit.io/jinx/travel/WhatsApp%20Video%202025-07-06%20at%2021.39.39_7dead60e.mp4?updatedAt=1751827500814",
    description: "Our team tracking mountain gorillas in Rwanda",
    date: "2023-12-15"
  },
  {
    id: 7,
    type: "image",
    title: "Kilimanjaro Summit",
    src: "https://ik.imagekit.io/jinx/travel/kilimanjaro-moutain-climbing.jpg",
    description: "View from the top of Africa's highest peak",
    date: "2023-11-20"
  },
];

const categoryKeys = ["all", "wildlife", "adventure", "photography", "culture", "conservation", "travelTips"];

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<'blog' | 'gallery'>('blog');
  const [selectedMedia, setSelectedMedia] = useState<null | {
    index: number;
    item: typeof galleryItems[0];
  }>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const openMedia = (index: number) => {
    setSelectedMedia({
      index,
      item: galleryItems[index]
    });
  };

  const closeMedia = () => {
    setSelectedMedia(null);
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (!selectedMedia) return;

    let newIndex;
    if (direction === 'prev') {
      newIndex = (selectedMedia.index - 1 + galleryItems.length) % galleryItems.length;
    } else {
      newIndex = (selectedMedia.index + 1) % galleryItems.length;
    }

    setSelectedMedia({
      index: newIndex,
      item: galleryItems[newIndex]
    });

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {activeTab === 'blog' ? 'Safari Blog' : 'Gallery'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8"
          >
            {activeTab === 'blog' 
              ? "Stories, tips, and insights from East Africa's wildlife experts" 
              : "Visual journey through our safari experiences"}
          </motion.p>
          
          {/* Toggle buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <Button
              variant={activeTab === 'blog' ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${activeTab === 'blog' ? 'bg-white text-orange-600' : 'bg-transparent text-white'}`}
              onClick={() => setActiveTab('blog')}
            >
              <BookOpen size={18} />
              Blog
            </Button>
            <Button
              variant={activeTab === 'gallery' ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${activeTab === 'gallery' ? 'bg-white text-orange-600' : 'bg-transparent text-white'}`}
              onClick={() => setActiveTab('gallery')}
            >
              <ImageIcon size={18} />
              Gallery
            </Button>
          </motion.div>
        </div>
      </section>

      {activeTab === 'blog' ? (
        <>
          {/* Featured Post */}
          {featuredPost && (
            <section className="py-20">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold mb-8 text-center">Featured Article</h2>
                  <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={featuredPost.image || "/placeholder.svg"}
                          alt={featuredPost.title}
                          className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-orange-600">Featured</Badge>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <Badge variant="outline" className="w-fit mb-4">
                          {featuredPost.category}
                        </Badge>
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-2xl lg:text-3xl mb-2">{featuredPost.title}</CardTitle>
                          <CardDescription className="text-lg">{featuredPost.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                            <div className="flex items-center gap-1">
                              <User size={16} />
                              <span>{featuredPost.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span>{featuredPost.readTime}</span>
                            </div>
                          </div>
                          <Button asChild>
                            <Link href={`/blog/${featuredPost.id}`}>
                              Read Full Article
                              <ArrowRight size={16} className="ml-2" />
                            </Link>
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </section>
          )}

          {/* Categories */}
          <section className="py-8 bg-gray-50 border-y">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {categoryKeys.map((category) => (
                  <Button
                    key={category}
                    variant={category === "all" ? "default" : "outline"}
                    size="sm"
                    className={category === "all" ? "bg-orange-600 hover:bg-orange-700" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {regularPosts.map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full group">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-orange-600">{post.category}</Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/blog/${post.id}`}>
                              Read More
                              <ArrowRight size={14} className="ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </>
      ) : (
        <>
    {/* Gallery content */}
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Safari Gallery
        </motion.h2>
        
        {/* Categories filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {['All', 'Wildlife', 'Landscapes', 'Culture', 'Adventure'].map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className="text-gray-800 hover:bg-orange-50 hover:text-orange-600 border-gray-300"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {galleryItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col group cursor-pointer border-gray-200"
                onClick={() => openMedia(index)}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  {item.type === 'image' ? (
                    <>
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="relative h-full">
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-orange-600">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
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
                  <CardDescription className="line-clamp-2 text-sm">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <Badge 
                    variant="outline" 
                    className="capitalize text-xs px-2 py-1 rounded-md border-gray-300"
                  >
                    {item.type}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

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
            <button
              title="Close Media"
              onClick={closeMedia}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-all text-white"
            >
              <X size={24} />
            </button>

            <button
              title="Previous Media"
              onClick={() => navigateMedia('prev')}
              className="absolute left-4 z-50 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-all text-white"
            >
              <ChevronLeft size={28} />
            </button>

            <div className="w-full h-full flex items-center justify-center p-4">
              {selectedMedia.item.type === 'image' ? (
                <img
                  src={selectedMedia.item.src}
                  alt={selectedMedia.item.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={selectedMedia.item.src}
                  className="max-w-full max-h-[80vh] rounded-lg"
                  controls
                  autoPlay
                  playsInline
                />
              )}
            </div>

            <button
              title="Next Media"
              onClick={() => navigateMedia('next')}
              className="absolute right-4 z-50 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-all text-white"
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12 text-white">
              <h3 className="text-xl font-bold mb-1">{selectedMedia.item.title}</h3>
              <p className="text-gray-300">{selectedMedia.item.description}</p>
              <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                <span>
                  {new Date(selectedMedia.item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="capitalize">{selectedMedia.item.type}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
        </>
      )}

      {/* Newsletter Signup */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest safari tips, wildlife updates, and travel inspiration.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}