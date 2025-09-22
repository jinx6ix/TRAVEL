import CareersContent from "./CareersContent"
import { jobOpenings, benefits } from "@/data/careers-data"

export const metadata = {
  title: "Safari Careers at JaeTravel Expeditions",
  description: "Explore safari jobs in Kenya, Tanzania, and Rwanda with JaeTravel Expeditions. Join our team of wildlife professionals.",
}

export default function CareersPage() {
  const structuredData = jobOpenings.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "JaeTravel Expeditions",
      "value": job.id.toString()
    },
    "datePosted": new Date().toISOString(),
    "validThrough": new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days
    "employmentType": job.type.toUpperCase(),
    "hiringOrganization": {
      "@type": "Organization",
      "name": "JaeTravel Expeditions",
      "sameAs": "https://jaetravel.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary.replace(/[^0-9.-]+/g, ""),
        "unitText": "MONTH"
      }
    }
  }));

  return (
    <div className="min-h-screen pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Safari Careers at JaeTravel Expeditions</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our team of passionate safari professionals creating unforgettable wildlife experiences across East Africa
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="#openings" className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              View Safari Job Openings
            </a>
            <a href="/about" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition">
              Learn About Our Safari Company
            </a>
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section className="py-20" aria-labelledby="why-work-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="why-work-heading" className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Work With Our Safari Team?
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-12">
            At JaeTravel Expeditions, we're committed to creating meaningful careers in sustainable safari tourism across East Africa
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
            const Icon = benefit.icon; // get the component
            return (
              <div
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow h-full border-0 bg-gray-50"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="text-blue-500" size={32} /> {/* render as JSX */}
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            );
          })}

          </div>
        </div>
      </section>

      {/* Client Component for Interactive Job Listings */}
      <CareersContent jobs={jobOpenings} />
    </div>
  )
}
