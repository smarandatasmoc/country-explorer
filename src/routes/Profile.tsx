import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogOutButton from '../components/LogOutButton'
import NavigationButton from '../components/NavigationButton'

import {
  deleteListItem,
  getListItems,
  updateListItem,
  type ListItem,
  type ListItemStatus,
} from '../lib/listItems'

import {
  getImagesForListItem,
  getImageUrls,
  deleteImage,
  type ListItemImage,
} from '../lib/images'

import ImageUploader from '../components/ImageUploader'

function Profile() {
  const [items, setItems] = useState<ListItem[]>([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(
    null
  )

  const [images, setImages] = useState<
  Record<number, ListItemImage[]>
  >({})

  const [imageUrls, setImageUrls] = useState<
    Record<number, string>
  >({})

  useEffect(() => {
  async function loadItems() {
    try {
      setLoading(true)
      setError(null)

      const data = await getListItems()

      setItems(data)

      const imagesByItem: Record<
        number,
        ListItemImage[]
      > = {}

      const urlsByImage: Record<
        number,
        string
      > = {}

      for (const item of data) {
        const itemImages =
          await getImagesForListItem(item.id)

        imagesByItem[item.id] = itemImages

        const urls = await getImageUrls(
          itemImages
        )

        Object.assign(
          urlsByImage,
          urls
        )
      }

      setImages(imagesByItem)
      setImageUrls(urlsByImage)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(
          'Failed to load your countries.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  loadItems()
  }, [])

  const handleStatusChange = async (
    id: number,
    status: ListItemStatus
  ) => {
    try {
      const updatedItem =
        await updateListItem(id, { status })

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === id ? updatedItem : item
        )
      )
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to update country.')
      }
    }
  }

  const handleNoteChange = (
    id: number,
    note: string
  ) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, note }
          : item
      )
    )
  }

  const handleSaveNote = async (
    id: number,
    note: string
  ) => {
    try {
      const updatedItem =
        await updateListItem(id, { note })

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === id ? updatedItem : item
        )
      )
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to save note.')
      }
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteListItem(id)

      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== id)
      )
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to delete country.')
      }
    }
  }

  const handleDeleteImage = async (
  image: ListItemImage
) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this image?'
  )

  if (!confirmed) {
    return
  }

  try {
    await deleteImage(image)

    setImages((currentImages) => ({
      ...currentImages,
      [image.list_item_id]:
        currentImages[image.list_item_id].filter(
          (currentImage) =>
            currentImage.id !== image.id
        ),
    }))

    setImageUrls((currentUrls) => {
      const updatedUrls = { ...currentUrls }

      delete updatedUrls[image.id]

      return updatedUrls
    })
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('Failed to delete image.')
    }
  }
}

  if (loading) {
    return <p>Loading your countries...</p>
  }

  if (error && items.length === 0) {
    return <p>Error: {error}</p>
  }

  return (
    <div>
      <h1>My List</h1>

      <NavigationButton path="/country"/>
      <LogOutButton/>

      {error && <p>Error: {error}</p>}

      {items.length === 0 ? (
        <p>
          You haven't added any countries yet.
        </p>
      ) : (
        items.map((item) => (
          <div key={item.id}>
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

                  handleStatusChange(
                    item.id,
                    value ===''
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
                  handleNoteChange(
                    item.id,
                    event.target.value
                  )
                }
              />
            </label>

            <br />

            <button
              onClick={() =>
                handleSaveNote(
                  item.id,
                  item.note ?? ''
                )
              }
            >
              Save note
            </button>

            <button
              onClick={() =>
                handleDelete(item.id)
              }
            >
              Remove
            </button>
            
            <ImageUploader
              listItemId={item.id}
              onUploaded={(newImages) => {
                setImages((currentImages) => ({
                  ...currentImages,
                  [item.id]: [
                    ...(currentImages[item.id] ?? []),
                    ...newImages,
                  ],
                }))

                getImageUrls(newImages).then((newUrls) => {
                  setImageUrls((currentUrls) => ({
                    ...currentUrls,
                    ...newUrls,
                  }))
                })
              }}
            />

            <hr />
            {images[item.id]?.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: '15px',
                  flexWrap: 'wrap',
                  marginTop: '15px',
                }}
              >
                {images[item.id].map((image) => {
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
                          handleDeleteImage(image)
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
        ))
      )}
    </div>
  )
}

export default Profile