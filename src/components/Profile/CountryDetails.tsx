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
} from '../../lib/listItems'

import {
  getImagesForListItem,
  getImageUrls,
  deleteImage,
  type ListItemImage,
} from '../../lib/images'

import Footer from '../Footer'
import CountryDetailsHeader from './CountryDetailsHeader'
import CountryDetailsBody from './CountryDetailsBody'

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

        // Keep "Saving..." visible for at least 800ms
        await new Promise(resolve => setTimeout(resolve, 800));

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

  if (loading) {
    return (
      <div className="app-page">
        <p>Loading country...</p>
      </div>
    )
  }

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

  return (
    <div className="app-page">

      <CountryDetailsHeader item={item}/>

      <CountryDetailsBody
        error = {error}
        item = {item}
        onHandleStatusChange={handleStatusChange}
        images={images}
        imageUrls={imageUrls}
        onSetImages={setImages}
        onSetImageUrls={setImageUrls}
        onHandleNoteChange={handleNoteChange}
        onHandleSaveNote={handleSaveNote}
        savingNote={savingNote}
        handleDelete={handleDelete}
      />
      
      <Footer/>

    </div>
  )
}

export default CountryDetails