"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Calendar, ArrowRight, Users, Globe, Heart, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

// SEO-optimized job openings with targeted keywords
const jobOpenings = [
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

const benefits = [
  {
    icon: <Globe className="text-blue-500" size={32} />,
    title: "African Travel Opportunities",
    description: "Explore East Africa's most spectacular safari destinations while working"
  },
  {
    icon: <Users className="text-green-500" size={32} />,
    title: "Community Impact",
    description: "Make a difference in local communities through sustainable safari tourism"
  },
  {
    icon: <Heart className="text-red-500" size={32} />,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs for safari staff"
  },
  {
    icon: <Star className="text-yellow-500" size={32} />,
    title: "Career Growth",
    description: "Professional development and advancement opportunities in safari industry"
  }
]

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const toggleJobExpand = (id: number) => {
    setExpandedJob(expandedJob === id ? null : id)
  }

  // Generate structured data for SEO
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "name": "Safari Jobs in East Africa",
      "description": "Career opportunities with JaeTravel Expeditions - Join our team of safari professionals in Kenya, Tanzania, and Rwanda",
      "url": typeof window !== 'undefined' ? window.location.href : '',
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Multiple locations across East Africa"
        }
      },
      "industry": "Travel & Tourism",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "JaeTravel Expeditions",
        "sameAs": "https://jaetravel.com"
      }
    }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />
      
      {/* Header with semantic markup */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Safari Careers at JaeTravel Expeditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Join our team of passionate safari professionals creating unforgettable wildlife experiences across East Africa
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" variant="secondary" asChild className="mr-4">
              <a href="#openings">View Safari Job Openings</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-orange-600"
              asChild
            >
              <Link href="/about">Learn About Our Safari Company</Link>
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Why Work With Us */}
      <section className="py-20" aria-labelledby="why-work-heading">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="why-work-heading" className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Why Work With Our Safari Team?</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              At JaeTravel Expeditions, we're committed to creating meaningful careers in sustainable safari tourism across East Africa
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow h-full border-0 bg-gray-50">
                  <div className="flex justify-center mb-4" aria-hidden="true">{benefit.icon}</div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-gray-900">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-20 bg-gray-50" aria-labelledby="job-openings-heading">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="job-openings-heading" className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Current Safari Job Openings</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Join our team and help create unforgettable wildlife experiences for our safari guests across East Africa
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8"
          >
            {jobOpenings.map((job) => (
              <motion.article key={job.id} variants={itemVariants} itemScope itemType="https://schema.org/JobPosting">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl text-gray-900" itemProp="title">{job.title}</CardTitle>
                        <CardDescription className="text-orange-600 font-medium text-lg mt-1" itemProp="industry">
                          {job.department}
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800" itemProp="employmentType">{job.type}</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center text-gray-700" itemProp="jobLocation" itemScope itemType="https://schema.org/Place">
                        <MapPin size={18} className="mr-2 text-gray-500" aria-hidden="true" />
                        <span itemProp="address">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock size={18} className="mr-2 text-gray-500" aria-hidden="true" />
                        {job.experience} experience
                      </div>
                      <div className="flex items-center text-gray-700" itemProp="baseSalary">
                        <DollarSign size={18} className="mr-2 text-gray-500" aria-hidden="true" />
                        {job.salary}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
                      <p className="text-gray-700" itemProp="description">{job.description}</p>
                    </div>
                    
                    {expandedJob === job.id && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Responsibilities</h3>
                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                              {job.responsibilities.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements & Qualifications</h3>
                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                              {job.requirements.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefits & Perks</h3>
                          <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {job.benefits.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <Button 
                        onClick={() => toggleJobExpand(job.id)} 
                        variant="outline" 
                        className="md:w-auto"
                        aria-expanded={expandedJob === job.id}
                        aria-controls={`job-details-${job.id}`}
                      >
                        {expandedJob === job.id ? 'Show Less' : 'View Full Details'}
                      </Button>
                      <Button asChild className="bg-orange-600 hover:bg-orange-700">
                        <Link href={`/careers/apply/${job.slug}`}>
                          Apply Now <ArrowRight size={18} className="ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20" aria-labelledby="hiring-process-heading">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="hiring-process-heading" className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Safari Hiring Process</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              We've designed our process to be transparent and respectful of your time when applying for safari positions
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              {
                step: "01",
                title: "Application Submission",
                description: "Submit your application through our portal. We review every safari job application carefully."
              },
              {
                step: "02",
                title: "Initial Screening",
                description: "Our hiring team will contact qualified safari candidates for an initial phone screening."
              },
              {
                step: "03",
                title: "Interviews",
                description: "Successful candidates will be invited for interviews with our safari team members."
              },
              {
                step: "04",
                title: "Job Offer",
                description: "We extend offers to exceptional candidates who align with our safari values and mission."
              }
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow h-full border-0 bg-orange-50">
                  <div className="text-4xl font-bold text-orange-600 mb-4" aria-hidden="true">{item.step}</div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-gray-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-orange-600 text-white" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Safari Career?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our team of passionate professionals creating unforgettable wildlife experiences across East Africa
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-white text-orange-600 hover:bg-gray-100">
                <a href="#openings">View Safari Positions</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-orange-600"
                asChild
              >
                <Link href="/contact">Contact Our HR Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}