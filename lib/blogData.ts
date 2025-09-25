// Define the blog post interface
export interface BlogPost {
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
  export const blogPosts: BlogPost[] = [
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
    },
    {
      id: 4,
      title: "Cultural Experiences: Meeting the Maasai People in Kenya",
      excerpt: "Learn about authentic cultural interactions and respectful tourism practices with local communities.",
      image: "https://ik.imagekit.io/jinx/travel/magestic-maasai-serengeti.jpg?updatedAt=1750013375250",
      author: "Sarah Akinyi",
      authorImage: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=100&q=80",
      authorBio: "Cultural anthropologist passionate about community-based tourism in East Africa.",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "Culture",
      location: "Narok, Kenya",
      metaDescription: "Explore Maasai culture and traditions in Kenya. Learn about ceremonies, cultural practices, and ethical tourism interactions.",
      keywords: "Maasai people, cultural safari, Kenya tourism, Maasai traditions, responsible travel",
      relatedPosts: [1, 6, 7],
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4">Respectful Cultural Tourism</h2>
        <p>Visiting the Maasai provides insight into one of Africa’s most iconic cultures. However, respectful engagement is key.</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Support community-led initiatives and homestays</li>
          <li>Ask permission before taking photographs</li>
          <li>Participate in storytelling, dance, and craft-making</li>
        </ul>
      `
    },
    {
      id: 5,
      title: "Climbing Mount Kilimanjaro: Routes, Preparation & Tips",
      excerpt: "A comprehensive guide to Africa's highest peak, including route options, training tips, and what to expect.",
      image: "https://ik.imagekit.io/jinx/travel/kilimanjaro-moutain-climbing.jpg?updatedAt=1750013910253",
      author: "John Safari",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      authorBio: "Experienced mountain guide specializing in Kilimanjaro and Mount Kenya treks.",
      date: "2023-12-20",
      readTime: "10 min read",
      category: "Adventure",
      location: "Mount Kilimanjaro, Tanzania",
      metaDescription: "Comprehensive Kilimanjaro climbing guide: best routes, physical preparation, altitude acclimatization, and trekking tips.",
      keywords: "Kilimanjaro climbing, trekking Africa, mountain hiking, Kilimanjaro routes, adventure travel",
      relatedPosts: [3, 6, 8],
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4">Popular Routes to the Summit</h2>
        <p>The most popular routes include Marangu, Machame, and Lemosho, each offering unique scenery and difficulty levels.</p>
        <h3 class="text-xl font-semibold mt-6 mb-3">Preparation Tips</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Train at least 3-6 months in advance</li>
          <li>Practice hiking with a backpack</li>
          <li>Acclimatize properly to reduce altitude sickness risk</li>
        </ul>
      `
    },
    {
      id: 6,
      title: "Sustainable Safari Tourism in East Africa | Eco-Friendly Travel",
      excerpt: "How responsible tourism practices benefit wildlife conservation and local communities.",
      image: "https://ik.imagekit.io/jinx/4-Days-Ngorongoro-Wildlife-Tour.jpg?updatedAt=1750076232872",
      author: "Mary Kimani",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      authorBio: "Eco-tourism advocate working with NGOs to promote conservation-focused travel in Africa.",
      date: "2023-12-15",
      readTime: "6 min read",
      category: "Eco-Tourism",
      location: "Ngorongoro, Tanzania",
      metaDescription: "Learn how eco-friendly safari practices protect wildlife and support African communities.",
      keywords: "eco tourism, sustainable safari, responsible travel, conservation Africa",
      relatedPosts: [1, 4, 8],
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4">Principles of Sustainable Safaris</h2>
        <p>Sustainable safaris aim to minimize environmental impact while maximizing benefits for communities and conservation.</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Choose lodges with eco-certifications</li>
          <li>Support local guides and community projects</li>
          <li>Limit plastic use and waste generation</li>
        </ul>
      `
    },
    {
      id: 7,
      title: "Safari Packing List: Essentials for Your African Adventure",
      excerpt: "The ultimate packing checklist for your East African safari, from clothing to camera gear.",
      image: "https://ik.imagekit.io/jinx/travel/Mombasa-beach-2-1960x800.webp?updatedAt=1750085411718",
      author: "David Mwangi",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
      authorBio: "Safari planner and travel writer specializing in East African travel logistics.",
      date: "2023-12-10",
      readTime: "4 min read",
      category: "Travel Tips",
      location: "East Africa",
      metaDescription: "Essential safari packing guide: clothing, gear, and accessories to make your African safari safe and enjoyable.",
      keywords: "safari packing list, travel essentials Africa, safari tips, safari gear",
      relatedPosts: [3, 4, 5],
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4">Clothing Essentials</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li>Neutral-colored clothing (avoid bright colors)</li>
          <li>Lightweight, breathable fabrics</li>
          <li>Warm layers for early morning game drives</li>
        </ul>
        <h3 class="text-xl font-semibold mt-6 mb-3">Other Essentials</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Binoculars for wildlife viewing</li>
          <li>Insect repellent and sunscreen</li>
          <li>Reusable water bottle</li>
        </ul>
      `
    },
    {
      id: 8,
      title: "Bird Watching in Uganda: Diverse Species & Best Locations",
      excerpt: "Discover Uganda's incredible bird diversity across different habitats and national parks.",
      image: "https://ik.imagekit.io/jinx/travel/lilac.jpg?updatedAt=1750098330501",
      author: "Sarah Akinyi",
      authorImage: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=100&q=80",
      authorBio: "Ornithologist with extensive field research on East African bird species.",
      date: "2023-12-05",
      readTime: "8 min read",
      category: "Birding",
      location: "Uganda",
      metaDescription: "Uganda birdwatching guide: best birding locations, unique species, and seasonal tips for bird enthusiasts.",
      keywords: "bird watching Uganda, birding safari, Uganda wildlife, best birding spots Africa",
      relatedPosts: [2, 6, 7],
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4">Top Birding Destinations</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li>Queen Elizabeth National Park — over 600 recorded species</li>
          <li>Mabamba Swamp — famous for the rare Shoebill Stork</li>
          <li>Bwindi Impenetrable Forest — diverse forest species</li>
        </ul>
        <h3 class="text-xl font-semibold mt-6 mb-3">Best Time for Birding</h3>
        <p>November to April offers the best opportunity as migratory species join Uganda’s resident birds.</p>
      `
    },
    {
      id: 9,
      title: "How to Go on Safari in a Wheelchair: Complete Accessible Travel Guide",
      excerpt: "A comprehensive guide for wheelchair users to experience African safaris with accessible vehicles, lodges, and tailored travel tips.",
      image: "https://ik.imagekit.io/jinx/travel/WhatsApp-Image-2025-01-15-at-12.06.45-PM.webp?updatedAt=1756903260238",
      author: "Ian Iraya",
      authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
      authorBio: "Accessible travel specialist dedicated to making African safaris inclusive for all adventurers.",
      date: "2025-09-25",
      readTime: "10 min read",
      category: "Accessible Safari",
      location: "Kenya & Tanzania",
      metaDescription: "Step-by-step safari guide for wheelchair users: accessible vehicles, lodges, and safari tips across East Africa.",
      keywords: "wheelchair safari, accessible safari Africa, disabled travel Kenya, Tanzania wheelchair travel, inclusive tourism",
      relatedPosts: [8, 6, 4],
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4">Planning an Accessible Safari</h2>
        <p>With the right planning, a wheelchair safari can be just as thrilling and immersive as any other adventure. Tour operators across East Africa now offer modified vehicles, trained guides, and accessible lodges designed for comfort and inclusivity.</p>
    
        <h3 class="text-xl font-semibold mt-6 mb-3">Accessible Safari Vehicles</h3>
        <p>Specially adapted Landcruisers come fitted with ramps and hydraulic lifts, making it easy for wheelchair users to board. These vehicles also offer spacious interiors and panoramic windows for unobstructed wildlife viewing.</p>
    
        <h3 class="text-xl font-semibold mt-6 mb-3">Wheelchair-Friendly Lodges</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Masai Mara Lodges</strong> — ramps, wide doorways, and roll-in showers</li>
          <li><strong>Serengeti Camps</strong> — accessible tents with firm pathways</li>
          <li><strong>Amboseli Resorts</strong> — trained staff to assist with mobility needs</li>
        </ul>
    
        <h3 class="text-xl font-semibold mt-6 mb-3">Travel Tips for Wheelchair Users</h3>
        <p>Book early to secure adapted vehicles, communicate personal requirements with operators, and carry a lightweight travel wheelchair for added convenience in camps and lodges.</p>
    
        <h3 class="text-xl font-semibold mt-6 mb-3">Best Destinations for Wheelchair Safaris</h3>
        <p>The Masai Mara, Amboseli, Serengeti, and Ngorongoro Crater stand out as top destinations with well-developed infrastructure for inclusive travel.</p>
      `
    }
    
  ];
  