import { useEffect, useState } from 'react'

import LogOutButton from '../components/LogOutButton'
import NavigationButton from '../components/NavigationButton'
import ProfileBoard from '../components/ProfileBoard'

import {
  getListItems,
  type ListItem,
} from '../lib/listItems'

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


      <main className="profile-page">

        {error && (
          <div className="message message-error">
            {error}
          </div>
        )}


        {/* SUMMARY */}

        {items.length > 0 && (

          <div className="profile-summary">

            <div className="summary-card">

              <span className="summary-number">
                {items.length}
              </span>

              <span className="summary-label">
                Countries
              </span>

            </div>


            <div className="summary-card">

              <span className="summary-number">

                {
                  items.filter(
                    (item) =>
                      item.status === 'visited'
                  ).length
                }

              </span>

              <span className="summary-label">
                Visited
              </span>

            </div>


            <div className="summary-card">

              <span className="summary-number">

                {
                  items.filter(
                    (item) =>
                      item.status === 'want'
                  ).length
                }

              </span>

              <span className="summary-label">
                Want to visit
              </span>

            </div>

          </div>

        )}


        {/* EMPTY STATE */}

        {items.length === 0 ? (

          <div className="empty-state profile-empty">

            <div className="empty-icon">
              🧭
            </div>

            <h2>
              Your travel list is empty
            </h2>

            <p>
              Start exploring countries and
              add destinations you'd like
              to visit.
            </p>

            <NavigationButton
              path="/country"
            />

          </div>

        ) : (

          <section className="profile-list">

            <div className="section-heading">

              <div>

                <p className="eyebrow">
                  YOUR DESTINATIONS
                </p>

                <h2>
                  Saved countries
                </h2>

              </div>

            </div>


            <div className="profile-grid">

              {items.map((item) => (

                <ProfileBoard
                  key={item.id}
                  item={item}
                />

              ))}

            </div>

          </section>

        )}

      </main>

    </div>
  )
}

export default Profile