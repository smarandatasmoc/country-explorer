import { useEffect, useState } from 'react'
import {
  getListItems,
  type ListItem,
} from '../lib/listItems'
import Footer from '../components/Footer'
import ProfileHeader from '../components/Profile/ProfileHeader'
import ProfileErrorUX from '../components/Profile/ProfileErrorUX'
import ProfileSummary from '../components/Profile/ProfileSummary'
import ProfileEmptyState from '../components/Profile/ProfileEmptyState'
import ProfilePopulated from '../components/Profile/ProfilePopulated'

function Profile() {

  const [items, setItems] =
    useState<ListItem[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)


  useEffect(() => {

    async function loadItems() {

      try {

        setLoading(true)
        setError(null)

        const data =
          await getListItems()

        setItems(data)

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
    <div className="app-page">

      <ProfileHeader/>

      <main className="profile-page">

        <ProfileErrorUX error={error}/>

        <ProfileSummary items={items}/>

        {items.length === 0 ? (
          <ProfileEmptyState/>
        ) : (

          <ProfilePopulated items={items}/>

        )}

      </main>

      <Footer/>

    </div>
  )
}

export default Profile