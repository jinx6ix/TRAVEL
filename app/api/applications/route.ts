import { supabase } from "@/lib/supabaseClient"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const first_name = formData.get("first_name") as string
    const last_name = formData.get("last_name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const location = formData.get("location") as string
    const position = formData.get("position") as string
    const experience = formData.get("experience") as string
    const cover_letter = formData.get("cover_letter") as string

    // Upload resume
    const resumeFile = formData.get("resume") as File | null
    let resumeUrl = null
    if (resumeFile) {
      const { data, error } = await supabase.storage
        .from("resumes")
        .upload(`resumes/${Date.now()}-${resumeFile.name}`, resumeFile, {
          cacheControl: "3600",
          upsert: false,
        })
      if (error) throw error
      resumeUrl = data?.path
    }

    // Upload portfolio
    const portfolioFile = formData.get("portfolio") as File | null
    let portfolioUrl = null
    if (portfolioFile) {
      const { data, error } = await supabase.storage
        .from("portfolios")
        .upload(`portfolios/${Date.now()}-${portfolioFile.name}`, portfolioFile, {
          cacheControl: "3600",
          upsert: false,
        })
      if (error) throw error
      portfolioUrl = data?.path
    }

    // Insert into applications table
    const { data: appData, error: insertError } = await supabase
      .from("applications")
      .insert({
        first_name,
        last_name,
        email,
        phone,
        location,
        position,
        experience,
        cover_letter,
        resume_url: resumeUrl,
        portfolio_url: portfolioUrl,
      })
      .select()

    if (insertError) throw insertError

    return NextResponse.json({ success: true, application: appData }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
