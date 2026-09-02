import { useState } from 'react'

import {
  type ListItem,
} from '../../lib/listItems'

import ProfileBoardInfoItem from './ProfileBoardInfoItem'
import ProfileBoardStatusItem from './ProfileBoardStatusItem'
import ProfileBoardCountItem from './ProfileBoardCountItem'
import ProfileBoardDetailsButton from './ProfileBoardDetailsButton'
import {getImageCount} from '../../lib/images'
import { useEffect } from 'react'

type ProfileBoardProps = {
  item: ListItem
}

export default function ProfileBoard({
  item,
}: ProfileBoardProps) {

  const [photoCount, setPhotoCount] =
    useState(0)

  useEffect(() => {
    async function loadPhotoCount() {
      const count = await getImageCount(item.id)

      setPhotoCount(count)
    }

    loadPhotoCount()
  }, [item.id])

  return (
    <article className="country-card">

      <div className="country-summary">

        <div className="country-summary-content">

          <ProfileBoardInfoItem item={item}/>

          <ProfileBoardStatusItem item={item}/>

          <ProfileBoardCountItem photoCount={photoCount}/>

        </div>

        <ProfileBoardDetailsButton item={item}/>

      </div>

    </article>
  )
}