"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Calendar, ArrowRight, Users, Globe, Heart, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const jobOpenings = [
  {
    id: 1,
    title: "Wildlife Safari Guide",
    department: "Guiding",
    type: "Full-time",
    location: "Masai Mara, Kenya",
    experience: "3+ years",
    salary: "Competitive + tips",
    description: "Lead small groups on wildlife viewing expeditions, provide expert commentary on animal behavior, and ensure guest safety during safari experiences.",
    responsibilities: [
      "Conduct daily game drives in designated conservation areas",
      "Educate guests on local wildlife, ecosystems, and conservation efforts",
      "Ensure vehicle maintenance and safety protocols are followed",
      "Provide exceptional customer service throughout the safari experience"
    ],
    requirements: [
      "Certified safari guide with valid credentials",
      "Extensive knowledge of East African flora and fauna",
      "Excellent communication skills in English (additional languages a plus)",
      "Valid driver's license with 4x4 experience",
      "First aid and emergency response training"
    ],
    benefits: [
      "Accommodation provided",
      "Comprehensive training program",
      "Travel opportunities across East Africa",
      "Health insurance coverage",
      "Performance bonuses"
    ]
  },
  {
    id: 2,
    title: "Lodge Hospitality Manager",
    department: "Hospitality",
    type: "Full-time",
    location: "Serengeti, Tanzania",
    experience: "5+ years",
    salary: "$2,500 - $3,200 monthly",
    description: "Oversee all lodge operations, ensuring exceptional guest experiences while managing staff, supplies, and maintaining luxury standards.",
    responsibilities: [
      "Manage daily lodge operations and guest services",
      "Train and supervise hospitality staff",
      "Coordinate with safari guides and other departments",
      "Maintain inventory and order supplies",
      "Handle guest inquiries and resolve issues"
    ],
    requirements: [
      "Degree in Hospitality Management or related field",
      "Proven experience in luxury lodge or hotel management",
      "Strong leadership and team management skills",
      "Knowledge of sustainable tourism practices",
      "Fluency in English and Swahili"
    ],
    benefits: [
      "Private accommodation",
      "Relocation assistance",
      "Paid vacation days",
      "Professional development opportunities",
      "Retirement plan contributions"
    ]
  },
  {
    id: 3,
    title: "Conservation Officer",
    department: "Conservation",
    type: "Full-time",
    location: "Volcanoes National Park, Rwanda",
    experience: "2+ years",
    salary: "$1,800 - $2,400 monthly",
    description: "Work with local communities and park authorities to develop and implement conservation initiatives and sustainable tourism practices.",
    responsibilities: [
      "Develop and lead community conservation programs",
      "Monitor wildlife populations and habitats",
      "Coordinate anti-poaching efforts with park rangers",
      "Educate guests and staff on conservation practices",
      "Prepare reports on conservation activities and impacts"
    ],
    requirements: [
      "Degree in Conservation Biology, Ecology or related field",
      "Experience in wildlife monitoring and research",
      "Knowledge of GIS and data collection methods",
      "Strong communication and community engagement skills",
      "Physical fitness for field work in challenging terrain"
    ],
    benefits: [
      "Field equipment provided",
      "Research opportunities",
      "Conference attendance support",
      "Housing allowance",
      "Wildlife tracking training"
    ]
  },
  {
    id: 4,
    title: "Adventure Tour Coordinator",
    department: "Operations",
    type: "Full-time",
    location: "Arusha, Tanzania",
    experience: "3+ years",
    salary: "$1,500 - $2,000 monthly",
    description: "Plan and coordinate multi-day adventure tours, manage logistics, and ensure seamless experiences for clients from arrival to departure.",
    responsibilities: [
      "Design and customize safari itineraries",
      "Coordinate transportation, accommodations, and activities",
      "Manage client communications and special requests",
      "Handle emergency situations and problem-solving",
      "Maintain relationships with suppliers and partners"
    ],
    requirements: [
      "Experience in tour operations or travel planning",
      "Excellent organizational and multitasking abilities",
      "Knowledge of East African travel destinations",
      "Customer service excellence",
      "Proficiency with booking software"
    ],
    benefits: [
      "Fam trip opportunities",
      "Flexible work arrangements",
      "Commission on customized tours",
      "Mobile phone and laptop provided",
      "Discounts on personal travel"
    ]
  }
]

const benefits = [
  {
    icon: <Globe className="text-blue-500" size={32} />,
    title: "Travel Opportunities",
    description: "Explore East Africa's most spectacular destinations while working"
  },
  {
    icon: <Users className="text-green-500" size={32} />,
    title: "Community Impact",
    description: "Make a difference in local communities through sustainable tourism"
  },
  {
    icon: <Heart className="text-red-500" size={32} />,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs"
  },
  {
    icon: <Star className="text-yellow-500" size={32} />,
    title: "Career Growth",
    description: "Professional development and advancement opportunities"
  }
]

export default function CareersPage() {
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
            Careers at JaeTravel Expeditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Join our team of passionate professionals creating unforgettable safari experiences across East Africa
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" variant="secondary" asChild className="mr-4">
              <a href="#openings">View Open Positions</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-orange-600"
              asChild
            >
              <Link href="/about">Learn About Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Why Work With Us?</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              At JaeTravel Expeditions, we're committed to creating meaningful careers in sustainable tourism
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
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
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
      <section id="openings" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Current Openings</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Join our team and help create unforgettable safari experiences for our guests
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
              <motion.div key={job.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl text-gray-900">{job.title}</CardTitle>
                        <CardDescription className="text-orange-600 font-medium text-lg mt-1">{job.department}</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{job.type}</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center text-gray-700">
                        <MapPin size={18} className="mr-2 text-gray-500" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock size={18} className="mr-2 text-gray-500" />
                        {job.experience} experience
                      </div>
                      <div className="flex items-center text-gray-700">
                        <DollarSign size={18} className="mr-2 text-gray-500" />
                        {job.salary}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-700">{job.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsibilities</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          {job.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          {job.requirements.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefits</h3>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        {job.benefits.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button asChild className="w-full md:w-auto bg-orange-600 hover:bg-orange-700">
                      <Link href={`/careers/apply/${job.id}`}>
                        Apply Now <ArrowRight size={18} className="ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Hiring Process</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              We've designed our process to be transparent and respectful of your time
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
                title: "Application",
                description: "Submit your application through our portal. We review every application carefully."
              },
              {
                step: "02",
                title: "Screening",
                description: "Our hiring team will contact qualified candidates for an initial phone screening."
              },
              {
                step: "03",
                title: "Interviews",
                description: "Successful candidates will be invited for interviews with our team members."
              },
              {
                step: "04",
                title: "Offer",
                description: "We extend offers to exceptional candidates who align with our values and mission."
              }
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow h-full border-0 bg-orange-50">
                  <div className="text-4xl font-bold text-orange-600 mb-4">{item.step}</div>
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
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey With Us?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our team of passionate professionals creating unforgettable safari experiences across East Africa
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-white text-orange-600 hover:bg-gray-100">
                <a href="#openings">View Open Positions</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-orange-600"
                asChild
              >
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}