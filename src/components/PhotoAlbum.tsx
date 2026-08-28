import { useState } from 'react'
import PhotoViewer from './PhotoViewer'

type PhotoAlbumProps = {
  images: string[]
}

function PhotoAlbum({
  images,
}: PhotoAlbumProps) {
  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null)

  if (images.length === 0) {
    return (
      <p className="empty-album">
        You haven't uploaded any photos yet.
      </p>
    )
  }

  return (
    <>
      <div className="photo-album">
        {images.map((url, index) => (
          <button
            key={url}
            className="album-photo"
            onClick={() =>
              setSelectedIndex(index)
            }
          >
            <img
              src={url}
              alt={`Travel photo ${index + 1}`}
            />
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <PhotoViewer
          images={images}
          initialIndex={selectedIndex}
          onClose={() =>
            setSelectedIndex(null)
          }
        />
      )}
    </>
  )
}

export default PhotoAlbum