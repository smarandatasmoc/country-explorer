import { useState } from 'react'

import {
  uploadImages,
  type ListItemImage,
} from '../lib/images'

type ImageUploaderProps = {
  listItemId: number
  onUploaded: (
    images: ListItemImage[]
  ) => void
}

function ImageUploader({
  listItemId,
  onUploaded,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([])

  const [uploading, setUploading] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return
    }

    setFiles(
      Array.from(event.target.files)
    )
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      return
    }

    try {
      setUploading(true)
      setError(null)

      const uploaded =
        await uploadImages(
          listItemId,
          files
        )

      onUploaded(uploaded)

      setFiles([])
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to upload images.')
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      {files.length > 0 && (
        <p>
          {files.length} image
          {files.length !== 1 ? 's' : ''}{' '}
          selected
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={
          uploading || files.length === 0
        }
      >
        {uploading
          ? 'Uploading...'
          : 'Upload images'}
      </button>

      {error && (
        <p>Error: {error}</p>
      )}
    </div>
  )
}

export default ImageUploader