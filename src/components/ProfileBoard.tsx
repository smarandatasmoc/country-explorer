import type {
  ListItem,
  ListItemStatus,
} from '../lib/listItems'

import type {
  ListItemImage,
} from '../lib/images'

import ImageUploader from './ImageUploader'

type ProfileBoardProps = {
  item: ListItem

  images: ListItemImage[]

  imageUrls: Record<number, string>

  onStatusChange: (
    id: number,
    status: ListItemStatus
  ) => Promise<void>

  onNoteChange: (
    id: number,
    note: string
  ) => void

  onSaveNote: (
    id: number,
    note: string
  ) => Promise<void>

  onDelete: (
    id: number
  ) => Promise<void>

  onDeleteImage: (
    image: ListItemImage
  ) => Promise<void>

  onImagesUploaded: (
    images: ListItemImage[]
  ) => void
}

export default function ProfileBoard({
  item,
  images,
  imageUrls,
  onStatusChange,
  onNoteChange,
  onSaveNote,
  onDelete,
  onDeleteImage,
  onImagesUploaded,
}: ProfileBoardProps) {
  return (
    <div>
      <h2>
        {item.country_name}
      </h2>

      <p>
        Country code: {item.country_code}
      </p>

      <label>
        Status:{' '}

        <select
          value={item.status ?? ''}
          onChange={(event) => {
            const value = event.target.value

            onStatusChange(
              item.id,
              value === ''
                ? null
                : (value as ListItemStatus)
            )
          }}
        >
          <option value="">
            Select
          </option>

          <option value="want">
            Want to visit
          </option>

          <option value="visited">
            Visited
          </option>
        </select>
      </label>

      <br />

      <label>
        Note:
        <br />

        <textarea
          value={item.note ?? ''}
          onChange={(event) =>
            onNoteChange(
              item.id,
              event.target.value
            )
          }
        />
      </label>

      <br />

      <button
        onClick={() =>
          onSaveNote(
            item.id,
            item.note ?? ''
          )
        }
      >
        Save note
      </button>

      <button
        onClick={() =>
          onDelete(item.id)
        }
      >
        Remove
      </button>

      <ImageUploader
        listItemId={item.id}
        onUploaded={onImagesUploaded}
      />

      <hr />

      {images.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            marginTop: '15px',
          }}
        >
          {images.map((image) => {
            const url = imageUrls[image.id]

            if (!url) {
              return null
            }

            return (
              <div
                key={image.id}
                style={{
                  position: 'relative',
                }}
              >
                <img
                  src={url}
                  alt={item.country_name}
                  style={{
                    width: '200px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    display: 'block',
                  }}
                />

                <button
                  onClick={() =>
                    onDeleteImage(image)
                  }
                >
                  Delete
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}