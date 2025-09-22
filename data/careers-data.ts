import { Globe, Users, Heart, Star } from "lucide-react"
import { LucideIcon } from "lucide-react"; // import the type

// Type for benefits
interface Benefit {
    icon: LucideIcon; // store the component, not JSX
    title: string;
    description: string;
  }

 // SEO-optimized job openings with targeted keywords
export const jobOpenings = [
  {
    id: 1,
    title: "Wildlife Safari Guide - Masai Mara Kenya",
    department: "Safari Guiding",
    type: "Full-time",
    location: "Masai Mara National Reserve, Kenya",
    experience: "3+ years",
    salary: "Competitive salary + tips",
    description: "Lead wildlife viewing expeditions as a certified safari guide in Kenya's Masai Mara. Provide expert commentary on animal behavior and ensure guest safety during African safari experiences.",
    responsibilities: [
      "Conduct daily game drives in Masai Mara conservation areas",
      "Educate guests on African wildlife, ecosystems, and conservation efforts",
      "Ensure vehicle maintenance and safety protocols are followed",
      "Provide exceptional customer service throughout the safari experience"
    ],
    requirements: [
      "KPSGA certified safari guide with valid credentials",
      "Extensive knowledge of East African flora and fauna",
      "Excellent communication skills in English (Swahili a plus)",
      "Valid driver's license with 4x4 experience",
      "First aid and emergency response training"
    ],
    benefits: [
      "Accommodation provided in Masai Mara",
      "Comprehensive safari guide training program",
      "Travel opportunities across East Africa national parks",
      "Health insurance coverage",
      "Performance bonuses based on guest satisfaction"
    ],
    slug: "wildlife-safari-guide-masai-mara-kenya"
  },
  {
    id: 2,
    title: "Lodge Hospitality Manager - Serengeti Tanzania",
    department: "Lodge Management",
    type: "Full-time",
    location: "Serengeti National Park, Tanzania",
    experience: "5+ years",
    salary: "$2,500 - $3,200 monthly",
    description: "Oversee luxury lodge operations in Tanzania's Serengeti, ensuring exceptional guest experiences while managing staff and maintaining African safari luxury standards.",
    responsibilities: [
      "Manage daily lodge operations and guest services in Serengeti",
      "Train and supervise hospitality staff at safari lodge",
      "Coordinate with safari guides and other departments",
      "Maintain inventory and order supplies for remote location",
      "Handle guest inquiries and resolve issues promptly"
    ],
    requirements: [
      "Degree in Hospitality Management or related field",
      "Proven experience in luxury lodge or hotel management in Africa",
      "Strong leadership and team management skills",
      "Knowledge of sustainable tourism practices in Tanzania",
      "Fluency in English and Swahili preferred"
    ],
    benefits: [
      "Private accommodation in Serengeti",
      "Relocation assistance to Tanzania",
      "Paid vacation days between safari seasons",
      "Professional development opportunities",
      "Retirement plan contributions"
    ],
    slug: "lodge-hospitality-manager-serengeti-tanzania"
  },
  {
    id: 3,
    title: "Conservation Officer - Rwanda Gorilla Trekking",
    department: "Wildlife Conservation",
    type: "Full-time",
    location: "Volcanoes National Park, Rwanda",
    experience: "2+ years",
    salary: "$1,800 - $2,400 monthly",
    description: "Work with local communities and park authorities to develop conservation initiatives for mountain gorillas and sustainable tourism practices in Rwanda.",
    responsibilities: [
      "Develop and lead community conservation programs in Rwanda",
      "Monitor gorilla populations and habitats in Volcanoes National Park",
      "Coordinate anti-poaching efforts with park rangers",
      "Educate guests and staff on gorilla conservation practices",
      "Prepare reports on conservation activities and impacts"
    ],
    requirements: [
      "Degree in Conservation Biology, Ecology or related field",
      "Experience in wildlife monitoring and research in Africa",
      "Knowledge of GIS and data collection methods",
      "Strong communication and community engagement skills",
      "Physical fitness for field work in mountainous terrain"
    ],
    benefits: [
      "Field equipment provided for gorilla tracking",
      "Research opportunities with mountain gorillas",
      "Conference attendance support",
      "Housing allowance in Rwanda",
      "Wildlife tracking training"
    ],
    slug: "conservation-officer-rwanda-gorilla-trekking"
  },
  {
    id: 4,
    title: "Adventure Tour Coordinator - Tanzania Safari Operations",
    department: "Safari Operations",
    type: "Full-time",
    location: "Arusha, Tanzania",
    experience: "3+ years",
    salary: "$1,500 - $2,000 monthly",
    description: "Plan and coordinate multi-day African safari tours, manage logistics, and ensure seamless experiences for clients exploring Tanzania's national parks.",
    responsibilities: [
      "Design and customize Tanzania safari itineraries",
      "Coordinate transportation, accommodations, and safari activities",
      "Manage client communications and special requests",
      "Handle emergency situations and problem-solving in remote areas",
      "Maintain relationships with suppliers and partners in East Africa"
    ],
    requirements: [
      "Experience in safari tour operations or travel planning in Africa",
      "Excellent organizational and multitasking abilities",
      "Knowledge of East African travel destinations and parks",
      "Customer service excellence for luxury safari clients",
      "Proficiency with booking software and logistics management"
    ],
    benefits: [
      "Fam trip opportunities to Tanzania safari destinations",
      "Flexible work arrangements in Arusha",
      "Commission on customized safari tours",
      "Mobile phone and laptop provided",
      "Discounts on personal travel in East Africa"
    ],
    slug: "adventure-tour-coordinator-tanzania-safari"
  }
]

// Use the components as values when rendering
export const benefits: Benefit[] = [
    {
      icon: Globe,
      title: "African Travel Opportunities",
      description:
        "Explore East Africa's most spectacular safari destinations while working",
    },
    {
      icon: Users,
      title: "Community Impact",
      description:
        "Make a difference in local communities through sustainable safari tourism",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Comprehensive health insurance and wellness programs for safari staff",
    },
    {
      icon: Star,
      title: "Career Growth",
      description:
        "Professional development and advancement opportunities in safari industry",
    },
  ];
