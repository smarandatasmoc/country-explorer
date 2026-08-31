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
                    {selectedCountry.capitals.map((capital) => capital.name).join(', ') 
                    || 'N/A'}
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
                  <span>Continents</span>

                  <strong>
                    {selectedCountry.continents.join(', ')
                    || 'N/A'}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>ISO code</span>

                  <strong>
                    {selectedCountry.codes.alpha_2}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Landlocked</span>

                  <strong>
                    {selectedCountry.landlocked 
                    ? "Yes"
                    : "No"}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Area</span>

                  <strong>
                    {selectedCountry.area.kilometers} km<sup>2</sup>
                    <br />
                    {selectedCountry.area.miles} miles<sup>2</sup>
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Borders</span>

                  <strong>
                    {selectedCountry.borders.join(', ')
                    || 'N/A'}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Units</span>

                  <strong>
                    {`Measurement system: ${selectedCountry.units.measurement_system}`}
                    <br/>
                    {`Temperature scale: ${selectedCountry.units.temperature_scale}`}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Population</span>

                  <strong>
                    {selectedCountry.population.toLocaleString()}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Timezones</span>

                  <strong>
                    {selectedCountry.timezones.join(', ')
                    || 'N/A'}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Languages</span>

                  <strong>
                    {selectedCountry.languages.map((language) => language.name).join(', ')
                    || 'N/A'}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Currencies</span>

                  <strong>
                    {selectedCountry.currencies.length > 0 ? (
                      selectedCountry.currencies.map((currency) => (
                        <div key={currency.code}>
                          {currency.name} ({currency.code}) {currency.symbol}
                        </div>
                      ))
                    ) : (
                      <div>N/A</div>
                    )}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Calling Codes</span>

                  <strong>
                    {selectedCountry.calling_codes.join(', ')
                    || 'N/A'}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Tlds</span>

                  <strong>
                    {selectedCountry.tlds.join(', ')
                    || 'N/A'}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Driving Side</span>

                  <strong>
                    {selectedCountry.cars.driving_side
                    || 'N/A'}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Government Type</span>

                  <strong>
                    {selectedCountry.government_type
                    || 'N/A'}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Links</span>

                  <strong>
                    {selectedCountry.links ? (
                      <>
                        <a href={selectedCountry.links.official} target="_blank">
                          Official
                        </a>
                        <br/>
                        <a href={selectedCountry.links.open_street_maps} target="_blank">
                          OpenStreetMap
                        </a>
                        <br/>
                        <a href={selectedCountry.links.google_maps} target="_blank">
                          Google Maps
                        </a>
                        <br/>
                        <a href={selectedCountry.links.wikipedia} target="_blank">
                          Wikipedia
                        </a>
                      </>
                    ) : (
                      'N/A'
                    )}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Memberships</span>

                  <strong>
                    {selectedCountry.memberships.un && (
                      <div>United Nations</div>
                    )}

                    {selectedCountry.memberships.eu && (
                      <div>European Union</div>
                    )}

                    {selectedCountry.memberships.eurozone && (
                      <div>Eurozone</div>
                    )}

                    {selectedCountry.memberships.schengen && (
                      <div>Schengen</div>
                    )}

                    {selectedCountry.memberships.nato && (
                      <div>NATO</div>
                    )}

                    {selectedCountry.memberships.commonwealth && (
                      <div>Commonwealth</div>
                    )}

                    {selectedCountry.memberships.oecd && (
                      <div>OECD</div>
                    )}

                    {selectedCountry.memberships.g7 && (
                      <div>G7</div>
                    )}

                    {selectedCountry.memberships.g20 && (
                      <div>G20</div>
                    )}

                    {selectedCountry.memberships.brics && (
                      <div>BRICS</div>
                    )}

                    {selectedCountry.memberships.opec && (
                      <div>OPEC</div>
                    )}

                    {selectedCountry.memberships.african_union && (
                      <div>African Union</div>
                    )}

                    {selectedCountry.memberships.asean && (
                      <div>ASEAN</div>
                    )}

                    {selectedCountry.memberships.arab_league && (
                      <div>Arab League</div>
                    )}

                    {!selectedCountry.memberships.un &&
                      !selectedCountry.memberships.eu &&
                      !selectedCountry.memberships.eurozone &&
                      !selectedCountry.memberships.schengen &&
                      !selectedCountry.memberships.nato &&
                      !selectedCountry.memberships.commonwealth &&
                      !selectedCountry.memberships.oecd &&
                      !selectedCountry.memberships.g7 &&
                      !selectedCountry.memberships.g20 &&
                      !selectedCountry.memberships.brics &&
                      !selectedCountry.memberships.opec &&
                      !selectedCountry.memberships.african_union &&
                      !selectedCountry.memberships.asean &&
                      !selectedCountry.memberships.arab_league && (
                        <div>N/A</div>
                      )}
                  </strong>
                </div>

                <div className="country-info-item">
                  <span>Classification</span>

                  <strong>
                    {selectedCountry.classification.sovereign && (
                      <div>Sovereign</div>
                    )}

                    {selectedCountry.classification.un_member && (
                      <div>Full UN member state</div>
                    )}

                    {selectedCountry.classification.un_observer && (
                      <div>UN permanent observer state</div>
                    )}

                    {selectedCountry.classification.disputed && (
                      <div>Contested or limited international recognition</div>
                    )}

                    {selectedCountry.classification.dependency && (
                      <>
                        <div>
                          Dependant territory belonging to{' '}
                          {selectedCountry.parent?.alpha_2}
                          {' as a'}
                          {selectedCountry.classification.dependency_type.replace(/_/g, " ")}
                          {'.'}
                        </div>
                      </>
                    )}

                    {!selectedCountry.classification.sovereign &&
                      !selectedCountry.classification.un_member &&
                      !selectedCountry.classification.un_observer &&
                      !selectedCountry.classification.disputed &&
                      !selectedCountry.classification.dependency && (
                        <div>N/A</div>
                      )}
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