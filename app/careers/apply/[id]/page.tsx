"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApplyPage() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    cover_letter: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const message = `
New Job Application - Job ID: ${id}

Name: ${form.first_name} ${form.last_name}
Email: ${form.email}
Phone: ${form.phone}
Location: ${form.location}
Experience: ${form.experience}

Cover Letter:
${form.cover_letter}
    `

    // 1. Send via WhatsApp
    const whatsappUrl = `https://wa.me/254726485228?text=${encodeURIComponent(message)}`

    // 2. Send via Email
    const mailtoUrl = `mailto:Info@jaetravel.co.ke?subject=Job Application - Job ID: ${id}&body=${encodeURIComponent(message)}`

    // Open both in new tabs (WhatsApp first, then Email)
    window.open(whatsappUrl, "_blank")
    window.open(mailtoUrl, "_blank")

    setLoading(false)
    alert("Your application has been prepared in WhatsApp and Email. Please review and send.")
  }

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Apply for Job #{id}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <Input name="first_name" placeholder="First Name" onChange={handleChange} required />
            <Input name="last_name" placeholder="Last Name" onChange={handleChange} required />
            <Input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <Input name="phone" placeholder="Phone" onChange={handleChange} required />
            <Input name="location" placeholder="Location" onChange={handleChange} />
            <Input name="experience" placeholder="Experience (e.g., 3+ years)" onChange={handleChange} required />
            <Textarea name="cover_letter" placeholder="Cover Letter" onChange={handleChange} required />

            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
