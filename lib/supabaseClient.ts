import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to get public URL with TypeScript
export const getPublicUrl = (path: string): string => {
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(path)
  return publicUrl
}