import { useEffect, useState } from 'react'
import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import {
  getListItems,
  updateListItem,
  deleteListItem,
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
import PhotoAlbum from '../components/PhotoAlbum'

function CountryDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] =
    useState<ListItem | null>(null)

  const [images, setImages] =
    useState<ListItemImage[]>([])

  const [imageUrls, setImageUrls] =
    useState<Record<number, string>>({})

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const [savingNote, setSavingNote] =
    useState(false)

  /*
   * LOAD COUNTRY + IMAGES
   */

  useEffect(() => {
    async function loadCountry() {
      try {
        setLoading(true)
        setError(null)

        if (!id) {
          throw new Error(
            'No country ID was provided.'
          )
        }

        const listItems =
          await getListItems()

        const foundItem =
          listItems.find(
            (item) =>
              item.id === Number(id)
          )

        if (!foundItem) {
          throw new Error(
            'Country not found.'
          )
        }

        setItem(foundItem)

        const countryImages =
          await getImagesForListItem(
            foundItem.id
          )

        setImages(countryImages)

        const urls =
          await getImageUrls(
            countryImages
          )

        setImageUrls(urls)

      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(
            'Failed to load country.'
          )
        }
      } finally {
        setLoading(false)
      }
    }

    loadCountry()
  }, [id])

  /*
   * STATUS
   */

  const handleStatusChange = async (
    status: ListItemStatus | null
  ) => {
    if (!item) {
      return
    }

    try {
      setError(null)

      const updatedItem =
        await updateListItem(
          item.id,
          { status }
        )

      setItem(updatedItem)

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(
          'Failed to update status.'
        )
      }
    }
  }

  /*
   * NOTE
   */

  const handleNoteChange = (
    note: string
  ) => {
    setItem((currentItem) =>
      currentItem
        ? {
            ...currentItem,
            note,
          }
        : currentItem
    )
  }

  const handleSaveNote = async () => {
    if (!item) {
      return
    }

    try {
      setSavingNote(true)
      setError(null)

      const updatedItem =
        await updateListItem(
          item.id,
          {
            note: item.note ?? '',
          }
        )

      setItem(updatedItem)

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(
          'Failed to save note.'
        )
      }
    } finally {
      setSavingNote(false)
    }
  }

  /*
   * DELETE COUNTRY
   */

  const handleDelete = async () => {
    if (!item) {
      return
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to remove ${item.country_name} from your list?`
      )

    if (!confirmed) {
      return
    }

    try {
      setError(null)

      await deleteListItem(item.id)

      navigate('/profile')

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

  /*
   * DELETE IMAGE
   */

  const handleDeleteImage = async (
    image: ListItemImage
  ) => {
    const confirmed =
      window.confirm(
        'Are you sure you want to delete this image?'
      )

    if (!confirmed) {
      return
    }

    try {
      setError(null)

      await deleteImage(image)

      setImages(
        (currentImages) =>
          currentImages.filter(
            (currentImage) =>
              currentImage.id !==
              image.id
          )
      )

      setImageUrls(
        (currentUrls) => {
          const updatedUrls = {
            ...currentUrls,
          }

          delete updatedUrls[
            image.id
          ]

          return updatedUrls
        }
      )

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

  /*
   * LOADING
   */

  if (loading) {
    return (
      <div className="app-page">
        <p>Loading country...</p>
      </div>
    )
  }

  /*
   * ERROR
   */

  if (error && !item) {
    return (
      <div className="app-page">
        <button
          onClick={() =>
            navigate('/profile')
          }
        >
          ← Back to profile
        </button>

        <p>
          Error: {error}
        </p>
      </div>
    )
  }

  if (!item) {
    return null
  }

  /*
   * PAGE
   */

  return (
    <div className="app-page">

      <header className="page-header">

        <div>

          <p className="eyebrow">
            MY DESTINATION
          </p>

          <h1>
            {item.country_name}
          </h1>

          <p className="page-description">
            {item.country_code}
          </p>

        </div>

        <button
          onClick={() =>
            navigate('/profile')
          }
        >
          ← Back to profile
        </button>

      </header>

      <main className="profile-page">

        {error && (
          <div className="message message-error">
            {error}
          </div>
        )}

        {/* STATUS */}

        <section className="country-section">

          <label htmlFor="country-status">
            Status
          </label>

          <select
            id="country-status"
            value={item.status ?? ''}
            onChange={(event) => {

              const value =
                event.target.value

              handleStatusChange(
                value === ''
                  ? null
                  : (value as ListItemStatus)
              )

            }}
          >

            <option value="">
              Select status
            </option>

            <option value="want">
              Want to visit
            </option>

            <option value="visited">
              Visited
            </option>

          </select>

        </section>

        {/* PHOTOS */}

        <section className="album-section">

          <div className="section-heading">

            <div>
              <p className="eyebrow">
                MEMORIES
              </p>

              <h2>
                My photos
              </h2>
            </div>

            <span>
              {images.length}{' '}
              {images.length === 1
                ? 'photo'
                : 'photos'}
            </span>

          </div>

          {images.length === 0 ? (

            <p className="empty-album">
              You haven't uploaded any
              photos yet.
            </p>

          ) : (

            <PhotoAlbum
              images={images
                .map(
                  (image) =>
                    imageUrls[image.id]
                )
                .filter(
                  (
                    url
                  ): url is string =>
                    Boolean(url)
                )}
            />

          )}

          <ImageUploader
            listItemId={item.id}
            onUploaded={async (
              newImages
            ) => {

              setImages(
                (currentImages) => [
                  ...currentImages,
                  ...newImages,
                ]
              )

              const newUrls =
                await getImageUrls(
                  newImages
                )

              setImageUrls(
                (currentUrls) => ({
                  ...currentUrls,
                  ...newUrls,
                })
              )

            }}
          />

        </section>

        {/* NOTE */}

        <section className="country-section">

          <label htmlFor="country-note">
            Note
          </label>

          <textarea
            id="country-note"
            value={item.note ?? ''}
            onChange={(event) =>
              handleNoteChange(
                event.target.value
              )
            }
            placeholder="Write something about this country..."
          />

          <button
            className="save-note-button"
            onClick={handleSaveNote}
            disabled={savingNote}
          >
            {savingNote
              ? 'Saving...'
              : 'Save note'}
          </button>

        </section>

        {/* REMOVE */}

        <section className="country-actions">

          <button
            className="remove-country-button"
            onClick={handleDelete}
          >
            Remove from list
          </button>

        </section>

      </main>

    </div>
  )
}

export default CountryDetails