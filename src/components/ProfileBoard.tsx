import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  type ListItem,
} from '../lib/listItems'

import {
  getImagesForListItem,
  getImageUrls,
  type ListItemImage,
} from '../lib/images'

type ProfileBoardProps = {
  item: ListItem
}

export default function ProfileBoard({
  item,
}: ProfileBoardProps) {

  const navigate = useNavigate()

  const [coverUrl, setCoverUrl] =
    useState<string | null>(null)

  const [photoCount, setPhotoCount] =
    useState(0)


  useEffect(() => {

    async function loadCoverImage() {

      try {

        const images =
          await getImagesForListItem(
            item.id
          )

        setPhotoCount(images.length)


        /*
         * We only need the first image
         * for the profile card.
         */

        const coverImage = images[0]

        if (!coverImage) {
          return
        }


        const urls =
          await getImageUrls([
            coverImage,
          ])

        setCoverUrl(
          urls[coverImage.id] ?? null
        )

      } catch (error) {

        console.error(
          'Failed to load cover image:',
          error
        )

      }

    }

    loadCoverImage()

  }, [item.id])


  return (
    <article className="country-card">

      <div className="country-summary">

        {/* COUNTRY INFORMATION */}

        <div className="country-summary-content">

          <h2>
            {item.country_name}
          </h2>

          <p>
            {item.country_code}
          </p>


          {/* STATUS */}

          <span
            className={`status-badge ${
              item.status === 'visited'
                ? 'status-visited'
                : item.status === 'want'
                  ? 'status-want'
                  : 'status-none'
            }`}
          >

            {item.status === 'visited'
              ? 'Visited'
              : item.status === 'want'
                ? 'Want to visit'
                : 'No status'}

          </span>


          {/* PHOTO COUNT */}

          <p className="photo-count">

            {photoCount === 0
              ? 'No photos'
              : `${photoCount} ${
                  photoCount === 1
                    ? 'photo'
                    : 'photos'
                }`}

          </p>

        </div>


        {/* DETAILS */}

        <button
          className="view-country-button"
          onClick={() =>
            navigate(
              `/profile/country/${item.id}`
            )
          }
        >
          View details →
        </button>

      </div>

    </article>
  )
}