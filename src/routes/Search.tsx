import { useEffect, useState } from 'react'
import { addListItem } from '../lib/listItems'
import { searchCountries } from '../api/searchCountries'
import {type Country as CountryType,} from '../api/countriesAPI'
import Footer from '../components/Footer'
import Header from '../components/Search/Header'
import SearchBar from '../components/Search/SearchBar'
import SearchHint from '../components/Search/SearchHint'
import LoadingUX from '../components/Search/LoadingUX'
import ErrorUX from '../components/Search/ErrorUX'
import InvalidSearchUX from '../components/Search/InvalidSearchUX'
import SearchResult from '../components/Search/SearchResult'
import SidePanel from '../components/Search/SidePanel'
import { getCountries } from '../api/getCountries'
import BrowseBackwardButton from '../components/Search/BrowseBackwardButton'
import BrowseForwardButton from '../components/Search/BrowseForwardButton'
import NavBrowse from '../components/Search/NavBrowse'

function Search() {
  const HTTP_RESPONSE_BAD_REQUEST:number = 400

  const [offset, setOffset] = useState(0)

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
      setError(null)
      setLoading(true)

      async function loadCountries() {
        try {
          const results = await getCountries({ offset })
          setCountries(results)
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message)
          } else {
            setError('Something went wrong')
          }

          setCountries([])
        } finally {
          setLoading(false)
        }
      }

      loadCountries()

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
    }, HTTP_RESPONSE_BAD_REQUEST)
    
    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [search, offset])

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
    <Header/>
    <main className="country-page">
      <section className="search-section">
        <SearchBar search={search} onSetSearch={setSearch}/>
        <SearchHint/>
      </section>
      <LoadingUX loading={loading}/>
      <ErrorUX error={error}/>
      <InvalidSearchUX
        loading = {loading}
        error = {error}
        search = {search}
        countries = {countries}
      />
      <SearchResult
        countries={countries}
        onSetSelectedCountry={setSelectedCountry}
      />
      <SidePanel
        onAddMessage={addMessage}
        onHandleAddToList={handleAddToList}
        adding = {adding}
        onSelectedCountry={selectedCountry}
        onSetSelectedCountry={setSelectedCountry}
      />

      <NavBrowse
        search={search}
        offset={offset}
        onSetOffset={setOffset}
      />

    </main>
    <Footer/>
  </div>
)
}

export default Search