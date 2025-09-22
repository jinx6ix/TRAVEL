"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Tour = {
  slug: string;
  title: string;
  description?: string;
  gallery: string[];
  category?: string;
  difficulty?: string;
  destination?: string;
  duration?: string;
  groupSize?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  itinerary?: Array<{ day: number; title: string; description: string }>;
  reviews?: Array<{ name: string; comment: string; rating: number; date?: string }>;
};

export default function TourDetailClient({ tour }: { tour: Tour }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aiOverview, setAiOverview] = useState<string | null>(tour?.description ?? null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Simple in-memory cache per tour slug (survives while the page is open)
  const cacheKey = `ai_overview_${tour.slug}`;
  const cachedOverview = useMemo(() => {
    try {
      return sessionStorage.getItem(cacheKey);
    } catch {
      return null;
    }
  }, [cacheKey]);

  useEffect(() => {
    if (cachedOverview && !aiOverview) {
      setAiOverview(cachedOverview);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedOverview]);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % tour.gallery.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length);

  useEffect(() => {
    // When user switches to AI tab, fetch overview if not present
    if (activeTab !== "ai") return;
    if (aiOverview && aiOverview.length > 0) return; // already have overview

    let abort = false;
    async function fetchAiOverview() {
      setLoadingAi(true);
      setAiError(null);
      try {
        const res = await fetch("/api/ai-overview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tour }),
        });

        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json?.error || "Failed to fetch AI overview");
        }

        const json = await res.json();
        if (abort) return;
        const overview = json.overview ?? "No overview available.";
        setAiOverview(overview);

        try {
          sessionStorage.setItem(cacheKey, overview);
        } catch {
          // ignore
        }
      } catch (err: any) {
        console.error("Failed to load AI overview:", err);
        if (!abort) setAiError("Failed to load AI overview. Try again later.");
      } finally {
        if (!abort) setLoadingAi(false);
      }
    }

    fetchAiOverview();

    return () => {
      abort = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, tour]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={tour.gallery[currentImageIndex]}
            alt={`${tour.title} - Featured`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white"
          onClick={prevImage}
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white"
          onClick={nextImage}
        >
          <ChevronRight size={24} />
        </Button>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-orange-600 text-white">
                {tour.category}
              </Badge>
              <Badge variant="outline" className="text-white border-white">
                {tour.difficulty}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={16} /> <span>{tour.destination}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} /> <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} /> <span>{tour.groupSize}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span>
                  {tour.rating} ({tour.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs
            defaultValue="overview"
            onValueChange={(v) => setActiveTab(v)}
            value={activeTab}
          >
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ai">AI Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>About This Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{tour.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Overview */}
            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle>AI Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingAi ? (
                    <p className="text-gray-500">Generating AI overview…</p>
                  ) : aiError ? (
                    <p className="text-red-500">{aiError}</p>
                  ) : (
                    <p className="text-gray-700">{aiOverview}</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Itinerary */}
            <TabsContent value="itinerary">
              <Card>
                <CardHeader>
                  <CardTitle>Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {tour.itinerary?.map((day: any, i: number) => (
                      <li key={i} className="flex gap-3">
                        <Clock className="mt-1 text-orange-600" size={18} />
                        <div>
                          <p className="font-semibold">
                            Day {day.day}: {day.title}
                          </p>
                          <p className="text-gray-600">{day.description}</p>
                        </div>
                      </li>
                    )) ?? <p className="text-gray-500">No itinerary available.</p>}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery */}
            <TabsContent value="gallery">
              <Card>
                <CardHeader>
                  <CardTitle>Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.gallery.map((img: string, i: number) => (
                      <motion.img
                        key={i}
                        src={img}
                        alt={`${tour.title} image ${i + 1}`}
                        className="rounded-lg object-cover w-full h-40"
                        whileHover={{ scale: 1.05 }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {tour.reviews?.map((r: any, i: number) => (
                      <div key={i} className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{r.name}</span>
                        </div>
                        <p className="text-gray-600">{r.comment}</p>
                        <p className="text-sm text-gray-500">Rating: {r.rating}/5</p>
                      </div>
                    )) ?? <p className="text-gray-500">No reviews yet.</p>}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Book This Tour</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">${tour.price}</p>
              <Button
                asChild
                className="w-full bg-orange-600 hover:bg-orange-700 mt-4"
              >
                <Link href={`/tours/${tour.slug}/book`}>Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
