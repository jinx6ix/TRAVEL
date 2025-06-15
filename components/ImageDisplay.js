// components/ImageDisplay.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ImageDisplay() {
  const [images, setImages] = useState([])

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    const { data, error } = await supabase.storage
      .from('project-images')
      .list()
    
    if (error) {
      console.error('Error fetching images:', error)
      return
    }
    
    const imageUrls = data.map(item => {
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(item.name)
      return publicUrl
    })
    
    setImages(imageUrls)
  }

  return (
    <div>
      {images.map((url, index) => (
        <img key={index} src={url} alt={`Image ${index}`} width={200} />
      ))}
    </div>
  )
}