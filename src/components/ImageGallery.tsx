import { useEffect, useState } from 'react'

import {
  getImageUrls,
  type ListItemImage,
} from '../lib/images'

type ImageGalleryProps = {
  images: ListItemImage[]
}

function ImageGallery({
  images,
}: ImageGalleryProps) {
  const [urls, setUrls] = useState<
    Record<number, string>
  >({})

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true)
        setError(null)

        const imageUrls =
          await getImageUrls(images)

        setUrls(imageUrls)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(
            'Failed to load images.'
          )
        }
      } finally {
        setLoading(false)
      }
    }

    if (images.length > 0) {
      loadImages()
    } else {
      setUrls({})
      setLoading(false)
    }
  }, [images])

  if (loading) {
    return <p>Loading images...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (images.length === 0) {
    return <p>No images yet.</p>
  }

  return (
    <div>
      {images.map((image) => {
        const url = urls[image.id]

        if (!url) {
          return null
        }

        return (
          <img
            key={image.id}
            src={url}
            alt="Travel"
            style={{
              width: '200px',
              height: '150px',
              objectFit: 'cover',
            }}
          />
        )
      })}
    </div>
  )
}

export default ImageGallery