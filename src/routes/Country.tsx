import { useEffect, useState } from 'react'
import { addListItem } from '../lib/listItems'
import LogOutButton from '../components/LogOutButton'
import NavigationButton from '../components/NavigationButton'
import { searchCountries } from '../api/searchCountries'
import {type Country as CountryType,} from '../api/countriesAPI'
import Footer from '../components/Footer'

function Country() {
  const [search, setSearch] = useState('')

  const [countries, setCountries] = useState<
    CountryType[]
  >([])

  const [selectedCountry, setSelectedCountry] =
    useState<CountryType | null>(null)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState<string | null>(
    null
  )

  const [adding, setAdding] = useState(false)

  const [addMessage, setAddMessage] = 
    useState<string | null>(null)

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
  <div className="app-page">

    <header className="page-header">
      <div>
        <p className="eyebrow">EXPLORE THE WORLD</p>
        <h1>Find your next destination</h1>
        <p className="page-description">
          Search for a country and add it to your travel list.
        </p>
      </div>

      <div className="header-actions">
        <NavigationButton path="/profile" />
        <LogOutButton />
      </div>
    </header>


    <main className="country-page">

      <section className="search-section">

        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            className="country-search"
            type="search"
            placeholder="Search for a country..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <p className="search-hint">
          Search by country name
        </p>

      </section>


      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Searching countries...</p>
        </div>
      )}


      {error && (
        <div className="message message-error">
          {error}
        </div>
      )}


      {!loading &&
        !error &&
        search.trim() &&
        countries.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🌍</div>
            <h2>No countries found</h2>
            <p>
              Try searching for a different country.
            </p>
          </div>
        )}


      {countries.length > 0 && (
        <section className="country-results-section">

          <div className="section-heading">
            <div>
              <p className="eyebrow">SEARCH RESULTS</p>
              <h2>Countries</h2>
            </div>

            <span className="result-count">
              {countries.length} results
            </span>
          </div>


          <ul className="country-results">

            {countries.map((country) => (
              <li
                className="country-result"
                key={country.codes.alpha_2}
              >
                <button
                  onClick={() =>
                    setSelectedCountry(country)
                  }
                >
                  <span className="country-flag">
                    {country.flag.emoji}
                  </span>

                  <span>
                    <strong>
                      {country.names.common}
                    </strong>

                    <small>
                      {country.region}
                    </small>
                  </span>

                  <span className="country-arrow">
                    →
                  </span>
                </button>
              </li>
            ))}

          </ul>

        </section>
      )}

      {selectedCountry && (
        <>
          {/* Optional dark overlay */}
          <div
            className="country-details-overlay"
            onClick={() => setSelectedCountry(null)}
          />

          {/* Side panel */}
          <aside className="country-details">

            <button
              className="country-details-close"
              onClick={() => setSelectedCountry(null)}
              aria-label="Close country details"
            >
              ×
            </button>

            <div className="country-details-content">

              <div className="country-details-header">

                <div className="large-country-flag">
                  {selectedCountry.flag.emoji}
                </div>

                <div>
                  <p className="eyebrow">
                    COUNTRY DETAILS
                  </p>

                  <h2>
                    {selectedCountry.names.common}
                  </h2>

                  <p>
                    {selectedCountry.names.official}
                  </p>
                </div>

              </div>


              <div className="country-information">

                <div className="country-info-item">
                  <span>Capital</span>

                  <strong>
                    {selectedCountry.capital?.join(', ') ||
                      'N/A'}
                  </strong>
                </div>


                <div className="country-info-item">
                  <span>Region</span>

                  <strong>
                    {selectedCountry.region}
                  </strong>
                </div>


                <div className="country-info-item">
                  <span>Subregion</span>

                  <strong>
                    {selectedCountry.subregion || 'N/A'}
                  </strong>
                </div>


                <div className="country-info-item">
                  <span>Population</span>

                  <strong>
                    {selectedCountry.population.toLocaleString()}
                  </strong>
                </div>


                <div className="country-info-item">
                  <span>ISO code</span>

                  <strong>
                    {selectedCountry.codes.alpha_2}
                  </strong>
                </div>

              </div>


              <div className="country-actions">

                <button
                  className="button-primary"
                  onClick={handleAddToList}
                  disabled={adding}
                >
                  {adding
                    ? 'Adding...'
                    : '＋ Add to my list'}
                </button>

              </div>


              {addMessage && (
                <div className="message">
                  {addMessage}
                </div>
              )}

            </div>

          </aside>
        </>
      )}
      

    </main>
    <Footer/>
  </div>
)
}

export default Country