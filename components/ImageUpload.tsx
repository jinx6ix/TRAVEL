'use client'
import { useState, useCallback, useEffect } from 'react'
import { getPublicUrl, supabase } from '@/lib/supabaseClient'
import type { ImageFile, UploadResult } from '@/types/supabase'



export default function ImageUpload() {
  const [files, setFiles] = useState<ImageFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([])

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'))
    setFiles(imageFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
  }, [])

  const handleUpload = async () => {
    try {
      setUploading(true)
      const results = await Promise.all(
        files.map(async (file) => {
          const fileExt = file.name.split('.').pop()
          const fileName = `${Math.random()}.${fileExt}`
          const filePath = `${fileName}`

          const { error } = await supabase.storage
            .from('images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            })

          if (error) throw error

          return {
            path: filePath,
            fullPath: `${supabase}/storage/v1/object/public/images/${filePath}`,
            publicUrl: getPublicUrl(filePath)
          }
        })
      )
      setUploadResults(results)
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setUploading(false)
    }
  }

  // Clean up object URLs
  useEffect(() => {
    return () => {
      files.forEach(file => file.preview && URL.revokeObjectURL(file.preview))
    }
  }, [files])

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed p-8 rounded-lg">
        <input 
          type="file"
          id="file-upload"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleDrop(Array.from(e.target.files))}
          className="hidden"
        />
        <label 
          htmlFor="file-upload"
          className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
        >
          Select Images
        </label>
        <p className="mt-2 text-sm text-gray-500">or drag and drop files here</p>
      </div>

      {/* Preview and upload button remain the same */}
    </div>
  )
}