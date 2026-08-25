import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addListItem } from '../lib/listItems'

import {
  searchCountries,
  type Country as CountryType,
} from '../api/countriesAPI'

import {
  getProfile,
} from '../lib/profile'

function Country() {
  const [search, setSearch] = useState('')

  const [countries, setCountries] = useState<
    CountryType[]
  >([])

  const [selectedCountry, setSelectedCountry] =
    useState<CountryType | null>(null)

  const [savedCountry, setSavedCountry] =
    useState<string | null>(null)

  const [loading, setLoading] = useState(false)

  const [saving, setSaving] = useState(false)

  const [error, setError] = useState<string | null>(
    null
  )

  const [adding, setAdding] = useState(false)

  const [addMessage, setAddMessage] = 
    useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile()

        if (profile?.country_code) {
          setSavedCountry(profile.country_code)
        }
      } catch (error) {
        console.error(
          'Failed to load profile:',
          error
        )
      }
    }

    loadProfile()
  }, [])

  useEffect(() => {
    const trimmedSearch = search.trim()

    if (!trimmedSearch) {
      setCountries([])
      setError(null)
      return
    }

    const controller = new AbortController()

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true)
        setError(null)

        const results = await searchCountries(
          trimmedSearch,
          controller.signal
        )

        if (!controller.signal.aborted) {
          setCountries(results)
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('Something went wrong')
        }

        setCountries([])
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }, 400)
    
    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [search])

  const handleAddToList = async () => {
  if (!selectedCountry) {
    return
  }

  try {
    setAdding(true)
    setAddMessage(null)

    await addListItem(
      selectedCountry.codes.alpha_2,
      selectedCountry.names.common
    )

    setAddMessage(
      `${selectedCountry.names.common} was added to your list.`
    )
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('unique_user_country')
    ) {
      setAddMessage(
        'This country is already on your list.'
      )
    } else if (error instanceof Error) {
      setAddMessage(error.message)
    } else {
      setAddMessage('Failed to add country.')
    }
  } finally {
    setAdding(false)
  }
}

  return (
    <div>
      <h1>Choose a country</h1>
      <Link to="/profile">
        My Profile
      </Link>

      {savedCountry && (
        <p>
          Your saved country:{' '}
          <strong>{savedCountry}</strong>
        </p>
      )}

      <input
        type="search"
        placeholder="Search for a country..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      {loading && <p>Searching...</p>}

      {error && <p>Error: {error}</p>}

      {!loading &&
        !error &&
        search.trim() &&
        countries.length === 0 && (
          <p>No countries found.</p>
        )}

      {countries.length > 0 && (
        <ul>
          {countries.map((country) => (
            <li key={country.codes.alpha_2}>
              <button
                onClick={() =>
                  setSelectedCountry(country)
                }
              >
                {country.flag.emoji}{' '}
                {country.names.common}
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedCountry && (
        <div>
          <h2>
            {selectedCountry.flag.emoji}{' '}
            {selectedCountry.names.common}
          </h2>

          <p>
            Official name:{' '}
            {selectedCountry.names.official}
          </p>

          <p>
            Capital:{' '}
            {selectedCountry.capital?.join(', ') ||
              'N/A'}
          </p>

          <p>
            Region: {selectedCountry.region}
          </p>

          <p>
            Subregion:{' '}
            {selectedCountry.subregion || 'N/A'}
          </p>

          <p>
            Population:{' '}
            {selectedCountry.population.toLocaleString()}
          </p>

          <p>
            ISO code:{' '}
            {selectedCountry.codes.alpha_2}
          </p>

          <button
            onClick={handleAddToList}
            disabled={adding}
            >
            {adding ? 'Adding...' : 'Add to my list'}
            </button>

            {addMessage && <p>{addMessage}</p>}

          <button
            onClick={() =>
              setSelectedCountry(null)
            }
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default Country