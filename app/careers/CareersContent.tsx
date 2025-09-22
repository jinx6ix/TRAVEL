"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, ArrowRight, Users, Globe, Heart, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

interface Job {
  id: number
  title: string
  department: string
  type: string
  location: string
  experience: string
  salary: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  slug: string
}

interface CareersContentProps {
  jobs: Job[]
}

export default function CareersContent({ jobs }: CareersContentProps) {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  const toggleJobExpand = (id: number) => {
    setExpandedJob(expandedJob === id ? null : id)
    if (expandedJob !== id) {
      const element = document.getElementById(`job-${id}`)
      element?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="openings" className="py-20 bg-gray-50" role="region" aria-labelledby="job-openings-heading">
      <div className="container mx-auto px-4">
        <h2 id="job-openings-heading" className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-center">
          Current Safari Job Openings
        </h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-16 text-center">
          Join our team and help create unforgettable wildlife experiences for our safari guests across East Africa
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8"
        >
          {jobs.map((job) => (
            <motion.article key={job.id} id={`job-${job.id}`} variants={itemVariants} itemScope itemType="https://schema.org/JobPosting">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-gray-900" itemProp="title">{job.title}</CardTitle>
                      <CardDescription className="text-orange-600 font-medium text-lg mt-1" itemProp="industry">{job.department}</CardDescription>
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
                            {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements & Qualifications</h3>
                          <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {job.requirements.map((item, index) => <li key={index}>{item}</li>)}
                          </ul>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefits & Perks</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          {job.benefits.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                      </div>
                    </>
                  )}

                  <div className="flex flex-col md:flex-row gap-4">
                    <Button
                      onClick={() => toggleJobExpand(job.id)}
                      variant="outline"
                      aria-expanded={expandedJob === job.id}
                      aria-controls={`job-${job.id}`}
                    >
                      {expandedJob === job.id ? "Show Less" : "View Full Details"}
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
  )
}
