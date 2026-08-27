import { useEffect, useState } from 'react'

import LogOutButton from '../components/LogOutButton'
import NavigationButton from '../components/NavigationButton'
import ProfileBoard from '../components/ProfileBoard'

import NavBar from '../components/NavBar'

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
        setError(
          'Failed to update country.'
        )
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

  const handleDelete = async (
    id: number
  ) => {
    try {
      await deleteListItem(id)

      setItems((currentItems) =>
        currentItems.filter(
          (item) => item.id !== id
        )
      )
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(
          'Failed to delete country.'
        )
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
          currentImages[
            image.list_item_id
          ].filter(
            (currentImage) =>
              currentImage.id !== image.id
          ),
      }))

      setImageUrls((currentUrls) => {
        const updatedUrls = {
          ...currentUrls,
        }

        delete updatedUrls[image.id]

        return updatedUrls
      })
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(
          'Failed to delete image.'
        )
      }
    }
  }

  if (loading) {
    return (
      <p>
        Loading your countries...
      </p>
    )
  }

  if (error && items.length === 0) {
    return (
      <p>
        Error: {error}
      </p>
    )
  }

  return (
    <div>
      <div className="page-container">
      <h1>My List</h1>
      <NavBar/>

      {error && (
        <p>
          Error: {error}
        </p>
      )}

      {items.length === 0 ? (
        <p>
          You haven't added any countries yet.
        </p>
      ) : (
        items.map((item) => (
          <ProfileBoard
            key={item.id}
            item={item}
            images={images[item.id] ?? []}
            imageUrls={imageUrls}
            onStatusChange={
              handleStatusChange
            }
            onNoteChange={
              handleNoteChange
            }
            onSaveNote={
              handleSaveNote
            }
            onDelete={
              handleDelete
            }
            onDeleteImage={
              handleDeleteImage
            }
            onImagesUploaded={(
              newImages
            ) => {
              setImages(
                (currentImages) => ({
                  ...currentImages,
                  [item.id]: [
                    ...(currentImages[
                      item.id
                    ] ?? []),
                    ...newImages,
                  ],
                })
              )

              getImageUrls(
                newImages
              ).then((newUrls) => {
                setImageUrls(
                  (currentUrls) => ({
                    ...currentUrls,
                    ...newUrls,
                  })
                )
              })
            }}
          />
        ))
      )}
    </div>
  </div>
  )
}

export default Profile