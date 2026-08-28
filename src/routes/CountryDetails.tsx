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

import NavigationButton from '../components/NavigationButton'
import LogOutButton from '../components/LogOutButton'

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


  /*
   * LOAD COUNTRY
   */

  useEffect(() => {

    async function loadCountry() {

      try {

        setLoading(true)
        setError(null)

        const listItems =
          await getListItems()

        const foundItem =
          listItems.find(
            (item) =>
              item.id === Number(id)
          )

        if (!foundItem) {
          setError(
            'Country could not be found.'
          )

          return
        }

        setItem(foundItem)


        /*
         * LOAD IMAGES
         */

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

    if (!item) {
      return
    }

    setItem({
      ...item,
      note,
    })
  }


  /*
   * SAVE NOTE
   */

  const handleSaveNote = async () => {

    if (!item) {
      return
    }

    try {

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
        `Remove ${item.country_name} from your list?`
      )

    if (!confirmed) {
      return
    }

    try {

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

      await deleteImage(image)


      setImages(
        (currentImages) =>
          currentImages.filter(
            (currentImage) =>
              currentImage.id !== image.id
          )
      )


      setImageUrls(
        (currentUrls) => {

          const updatedUrls = {
            ...currentUrls,
          }

          delete updatedUrls[image.id]

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
      <p>
        Loading country...
      </p>
    )
  }


  /*
   * ERROR
   */

  if (error && !item) {
    return (
      <div>

        <p>
          Error: {error}
        </p>

        <button
          onClick={() =>
            navigate('/profile')
          }
        >
          ← Back to profile
        </button>

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
            YOUR JOURNEY
          </p>

          <h1>
            My Travel List
          </h1>

          <p className="page-description">
            Keep track of the places you want
            to visit and the places you've
            already explored.
          </p>

        </div>


        <div className="header-actions">

          <NavigationButton
            path="/country"
          />

          <LogOutButton />

        </div>

      </header>
      {/* BACK */}
    <div className='page-container'>
      <button
        className="back-button"
        onClick={() =>
          navigate('/profile')
        }
      >
        ← Back to my countries
      </button>


      {/* ERROR */}

      {error && (
        <div className="message message-error">
          {error}
        </div>
      )}


      {/* COUNTRY HEADER */}

      <header className="country-details-header">

        <div>

          <p className="eyebrow">
            MY DESTINATION
          </p>

          <h1>
            {item.country_name}
          </h1>

          <p>
            Country code: {item.country_code}
          </p>

        </div>

      </header>


      {/* PHOTOS */}

      <section className="album-section">

        <div className="section-heading">

          <h2>
            My photos
          </h2>

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

          <div className="photo-album">

            {images.map((image) => {

              const url =
                imageUrls[image.id]

              if (!url) {
                return null
              }

              return (
                <div
                  key={image.id}
                  className="album-photo"
                >

                  <img
                    src={url}
                    alt={item.country_name}
                  />

                  <button
                    className="delete-photo-button"
                    onClick={() =>
                      handleDeleteImage(
                        image
                      )
                    }
                  >
                    Delete
                  </button>

                </div>
              )
            })}

          </div>
        )}

        <br/>
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
        >
          Save note
        </button>

      </section>


      {/* DELETE */}

      <section className="country-actions">

        <button
          className="remove-country-button"
          onClick={handleDelete}
        >
          Remove from list
        </button>

      </section>
    </div>
    </div>
  )
}

export default CountryDetails