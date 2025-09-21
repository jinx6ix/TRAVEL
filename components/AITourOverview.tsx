"use client"

import { useEffect, useState } from "react"
import type { TourData } from "@/data/tours-data"

interface AITourOverviewProps {
  tour: TourData
}

export default function AITourOverview({ tour }: AITourOverviewProps) {
  const [overview, setOverview] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchOverview() {
      try {
        const res = await fetch("/api/ai-overview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tour }),
        })
        const data = await res.json()
        setOverview(data.overview)
      } catch (err) {
        console.error(err)
        setOverview("⚠️ Could not load AI overview.")
      } finally {
        setLoading(false)
      }
    }

    fetchOverview()
  }, [tour])

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 shadow-sm mb-6">
      <h2 className="text-lg font-semibold text-orange-700 mb-2">AI Overview</h2>
      {loading ? (
        <p className="text-gray-500 italic">Generating overview...</p>
      ) : (
        <p className="text-gray-700 leading-relaxed">{overview}</p>
      )}
    </div>
  )
}
