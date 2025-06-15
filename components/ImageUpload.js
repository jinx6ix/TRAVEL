// components/ImageUpload.js
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ImageUpload() {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const handleUpload = async (e) => {
    try {
      setUploading(true)
      
      if (!image) throw new Error('Please select an image')
      
      const fileExt = image.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      
      let { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, image)
      
      if (uploadError) throw uploadError
      
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath)
      
      setImageUrl(publicUrl)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button 
        onClick={handleUpload} 
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" width={200} />
          <p>Image URL: {imageUrl}</p>
        </div>
      )}
    </div>
  )
}