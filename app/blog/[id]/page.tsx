import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, Share, BookOpen, MapPin } from "lucide-react";

// Define the blog post interface
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
  featured?: boolean;
  content: string;
  metaDescription: string;
  keywords: string;
  relatedPosts?: number[];
}

// Blog posts data with full content
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Best Time to Visit Masai Mara for the Great Migration",
    excerpt: "Discover the optimal timing to witness one of nature's most spectacular events in Kenya's premier wildlife destination.",
    image: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg?updatedAt=1750013375250",
    author: "John Safari",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    authorBio: "Wildlife expert with 15+ years of experience guiding safaris across East Africa.",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Wildlife",
    location: "Masai Mara, Kenya",
    featured: true,
    metaDescription: "Complete guide to timing your Masai Mara visit for the Great Migration. Learn about river crossings, wildlife patterns, and optimal safari seasons in Kenya.",
    keywords: "Masai Mara, Great Migration, Kenya safari, wildlife migration, best time to visit Masai Mara",
    relatedPosts: [2, 4, 6],
    content: `
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Understanding the Great Migration Cycle</h2>
      <p class="mb-5 text-gray-700 leading-relaxed">The Great Migration is one of nature's most spectacular events, where over 1.5 million wildebeest, 200,000 zebras, and 350,000 gazelles move through the Serengeti-Mara ecosystem in a continuous search for fresh grazing and water.</p>
      
      <h3 class="text-xl font-semibold mt-7 mb-3 text-gray-900">Monthly Breakdown of the Migration</h3>
      <p class="mb-4 text-gray-700 leading-relaxed"><strong class="font-semibold text-gray-900">July:</strong> The herds typically arrive in the northern Serengeti and begin crossing into the Masai Mara. Early July sightings are common.</p>
      <p class="mb-4 text-gray-700 leading-relaxed"><strong class="font-semibold text-gray-900">August-September:</strong> Peak season in the Masai Mara. The herds are spread across the reserve, with dramatic river crossings occurring regularly.</p>
      <p class="mb-5 text-gray-700 leading-relaxed"><strong class="font-semibold text-gray-900">October:</strong> The migration begins its return south to the Serengeti, with smaller groups remaining in the Mara.</p>
      
      <h3 class="text-xl font-semibold mt-7 mb-3 text-gray-900">Factors Affecting Migration Timing</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">Rainfall patterns significantly influence the movement of the herds. Climate change has made the migration less predictable in recent years, but generally:</p>
      <ul class="list-disc pl-5 mb-5 text-gray-700 space-y-2">
        <li class="leading-relaxed">The long rains (March-May) trigger the movement north</li>
        <li class="leading-relaxed">The short rains (November-December) initiate the return south</li>
        <li class="leading-relaxed">Localized rainfall creates "green pockets" that attract the herds</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-7 mb-3 text-gray-900">Optimal Viewing Tips</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">For the best experience:</p>
      <ul class="list-disc pl-5 mb-5 text-gray-700 space-y-2">
        <li class="leading-relaxed">Book 9-12 months in advance for July-September dates</li>
        <li class="leading-relaxed">Consider staying at least 4 nights to maximize crossing opportunities</li>
        <li class="leading-relaxed">Choose accommodations near the Mara River for prime access</li>
        <li class="leading-relaxed">Hire experienced guides who know the crossing points</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-7 mb-3 text-gray-900">Beyond the Migration: Year-Round Wildlife</h3>
      <p class="mb-5 text-gray-700 leading-relaxed">While the migration is spectacular, the Masai Mara offers excellent wildlife viewing year-round. The Big Five (lion, leopard, elephant, buffalo, and rhino) are resident, along with cheetahs, hyenas, and numerous antelope species.</p>
    `
  },
  {
    id: 2,
    title: "Gorilla Trekking in Rwanda: A Complete Guide",
    excerpt: "Everything you need to know about planning your gorilla trekking adventure in Volcanoes National Park.",
    image: "https://ik.imagekit.io/jinx/travel/6-days-gorilla-tracking-and-rafting-jinja.jpg?updatedAt=1750083327865",
    author: "Mary Kimani",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    authorBio: "Primate conservation specialist with a focus on responsible tourism practices.",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "Adventure",
    location: "Volcanoes National Park, Rwanda",
    metaDescription: "Complete guide to gorilla trekking in Rwanda's Volcanoes National Park. Permit information, physical preparation, and what to expect during your encounter.",
    keywords: "gorilla trekking, Rwanda, Volcanoes National Park, mountain gorillas, primate tracking",
    relatedPosts: [1, 3, 8],
    content: `
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Understanding Mountain Gorilla Conservation</h2>
      <p class="mb-5 text-gray-700 leading-relaxed">Mountain gorillas are an endangered species with only about 1,000 individuals remaining in the wild. Rwanda's conservation efforts, supported by tourism revenue, have been crucial to their protection and population growth.</p>
      
      <h3 class="text-xl font-semibold mt-7 mb-3 text-gray-900">Permit Information and Booking</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">Gorilla trekking permits in Rwanda cost $1,500 per person (2024). This may seem expensive, but the fee directly funds:</p>
      <ul class="list-disc pl-5 mb-5 text-gray-700 space-y-2">
        <li class="leading-relaxed">Gorilla protection and anti-poaching patrols</li>
        <li class="leading-relaxed">Veterinary care for the gorillas</li>
        <li class="leading-relaxed">Community development projects around the park</li>
        <li class="leading-relaxed">Research and monitoring programs</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-7 mb-3 text-gray-900">Physical Preparation and Fitness Requirements</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">Gorilla trekking involves hiking through dense forest at high altitudes (2,500-4,000 meters). While not technically difficult, it can be physically demanding:</p>
      <ul class="list-disc pl-5 mb-5 text-gray-700 space-y-2">
        <li class="leading-relaxed">Treks can last from 30 minutes to 4+ hours each way</li>
        <li class="leading-relaxed">Terrain is often muddy and steep</li>
        <li class="leading-relaxed">Altitude can affect breathing and stamina</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-7 mb-3 text-gray-900">What to Expect During Your Trek</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">A typical gorilla trekking day:</p>
      <ul class="list-disc pl-5 mb-5 text-gray-700 space-y-2">
        <li class="leading-relaxed">6:30 AM: Arrive at park headquarters for briefing and group assignment</li>
        <li class="leading-relaxed">7:30 AM: Drive to the trailhead and meet your trackers</li>
        <li class="leading-relaxed">8:00 AM: Begin trek through the forest</li>
        <li class="leading-relaxed">Variable: Time to locate the gorillas (1-4 hours typically)</li>
        <li class="leading-relaxed">1 hour: Observation time with the gorilla family</li>
        <li class="leading-relaxed">Return: Hike back to the starting point</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-7 mb-3 text-gray-900">Photography Guidelines</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">To protect the gorillas and get the best photos:</p>
      <ul class="list-disc pl-5 mb-5 text-gray-700 space-y-2">
        <li class="leading-relaxed">No flash photography (can disturb the gorillas)</li>
        <li class="leading-relaxed">Use a telephoto lens (70-200mm or 100-400mm ideal)</li>
        <li class="leading-relaxed">Bring rain protection for your equipment</li>
        <li class="leading-relaxed">Practice shooting in low-light conditions beforehand</li>
      </ul>
    `
  },
  // Additional blog posts would follow the same pattern
  {
    id: 3,
    title: "Photography Tips for Your Safari Expeditions",
    excerpt: "Professional tips to capture stunning wildlife photos during your East African safari experience.",
    image: "https://ik.imagekit.io/jinx/travel/new%20(1).png?updatedAt=1750098099514",
    author: "David Mwangi",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    authorBio: "Award-winning wildlife photographer with publications in National Geographic and BBC Wildlife.",
    date: "2024-01-05",
    readTime: "12 min read",
    category: "Photography",
    location: "Serengeti, Tanzania",
    metaDescription: "Expert wildlife photography tips for African safaris. Camera settings, lens recommendations, and techniques for capturing stunning safari images.",
    keywords: "safari photography, wildlife photography, camera gear, photography tips, African wildlife",
    relatedPosts: [2, 5, 7],
    content: `
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Essential Camera Gear for Safari</h2>
      <p class="mb-5 text-gray-700 leading-relaxed">Having the right equipment can make all the difference in safari photography. The dust, humidity, and challenging lighting conditions of the African wilderness demand reliable gear that can perform in tough environments.</p>
      
      <h3 class="text-xl font-semibold mt-7 mb-3 text-gray-900">Camera Bodies</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">For serious wildlife photography, a DSLR or mirrorless camera with these features is essential:</p>
      <ul class="list-disc pl-5 mb-5 text-gray-700 space-y-2">
        <li class="leading-relaxed">Fast autofocus system with reliable tracking capabilities</li>
        <li class="leading-relaxed">High frames-per-second rate for action sequences</li>
        <li class="leading-relaxed">Good performance at high ISO settings for low-light conditions</li>
        <li class="leading-relaxed">Weather sealing to protect against dust and moisture</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-7 mb-3 text-gray-900">Lens Selection</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">Your lens choices will determine the types of shots you can capture:</p>
      <ul class="list-disc pl-5 mb-5 text-gray-700 space-y-2">
        <li class="leading-relaxed"><strong class="font-semibold text-gray-900">Telephoto zoom (100-400mm or 200-500mm):</strong> Ideal for most wildlife photography</li>
        <li class="leading-relaxed"><strong class="font-semibold text-gray-900">Fast telephoto (70-200mm f/2.8):</strong> Perfect for low-light situations and closer subjects</li>
        <li class="leading-relaxed"><strong class="font-semibold text-gray-900">Wide-angle (16-35mm):</strong> Great for landscapes and environmental portraits</li>
        <li class="leading-relaxed"><strong class="font-semibold text-gray-900">Macro lens:</strong> For detailed shots of insects, flowers, and small creatures</li>
      </ul>
    `
  }
];

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts.find(p => p.id === Number(params.id));
  
  if (!post) {
    return {
      title: 'Post Not Found | Safari Experts Blog',
    };
  }
  
  return {
    title: `${post.title} | Safari Experts Blog`,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [post.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

// Generate static params for SSG
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === Number(params.id));
  
  if (!post) {
    notFound();
  }
  
  // Get related posts
  const relatedPosts = post.relatedPosts 
    ? blogPosts.filter(p => post.relatedPosts?.includes(p.id))
    : blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <article className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <Link href="/blog" className="flex items-center text-sm font-medium hover:text-orange-200 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/destinations" className="hover:text-orange-200 transition-colors">Destinations</Link>
              <Link href="/tours" className="hover:text-orange-200 transition-colors">Tours</Link>
              <Link href="/about" className="hover:text-orange-200 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-orange-200 transition-colors">Contact</Link>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Blog Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Category and Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            {post.category}
          </span>
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link> / 
            <Link href="/blog" className="hover:text-orange-600 transition-colors"> Blog</Link> / 
            <span className="text-gray-800 font-medium"> {post.title}</span>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
        
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
          <div className="flex items-center gap-1">
            <User size={16} className="text-gray-500" />
            <span className="text-gray-700">{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-gray-700">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-gray-500" />
            <span className="text-gray-700">{post.readTime}</span>
          </div>
          {post.location && (
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-gray-700">{post.location}</span>
            </div>
          )}
        </div>
        
        {/* Featured Image */}
        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Article Content */}
        <div className="mb-12 text-lg">
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
        
        {/* Author Bio */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12 border border-gray-200">
          <div className="flex items-start gap-4">
            {post.authorImage && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About {post.author}</h3>
              <p className="text-gray-700">{post.authorBio}</p>
            </div>
          </div>
        </div>
        
        {/* Share Buttons */}
        <div className="border-t border-b border-gray-200 py-6 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div className="flex gap-3">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md">
              <span className="sr-only">Share on Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors shadow-md">
              <span className="sr-only">Share on Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-md">
              <span className="sr-only">Share on LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Related Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-orange-500 pl-3">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full mb-2">
                    {relatedPost.category}
                  </span>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">{relatedPost.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                  <Link 
                    href={`/blog/${relatedPost.id}`}
                    className="text-orange-600 font-medium text-sm hover:text-orange-700 inline-flex items-center transition-colors"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Newsletter Subscription */}
      <section className="bg-orange-50 py-12 border-t border-orange-100">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated with Our Safari Insights</h2>
          <p className="text-gray-700 mb-6">Subscribe to our newsletter for the latest safari tips, wildlife updates, and exclusive travel offers.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
    </article>
  );
}