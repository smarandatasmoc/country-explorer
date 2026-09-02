import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  type ListItem,
} from '../../lib/listItems'

import ProfileBoardInfoItem from './ProfileBoardInfoItem'
import ProfileBoardStatusItem from './ProfileBoardStatusItem'
import ProfileBoardCountItem from './ProfileBoardCountItem'
import ProfileBoardDetailsButton from './ProfileBoardDetailsButton'

type ProfileBoardProps = {
  item: ListItem
}

export default function ProfileBoard({
  item,
}: ProfileBoardProps) {

  const [photoCount, _] =
    useState(0)

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