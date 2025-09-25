"use client"

import Link from "next/link"

export default function BlogCTA() {
  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mt-8 shadow-sm">
      <h3 className="text-2xl font-semibold mb-3">
        Ready to Plan Your Accessible Safari?
      </h3>
      <p>
        Contact our travel experts today to customize your safari experience
        for full accessibility.
      </p>
      <Link
        href="/contact"
        className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Book Your Safari
      </Link>
    </div>
  )
}
