import { useEffect, useState } from 'react'
import { addListItem } from '../lib/listItems'
import LogOutButton from '../components/LogOutButton'
import NavigationButton from '../components/NavigationButton'
import { searchCountries } from '../api/searchCountries'

import {type Country as CountryType,} from '../api/countriesAPI'
import SelectedListItem from '../components/SelectedListItem'
import SearchBar from '../components/SearchBar' 
import DisplayList from '../components/DisplayListTemp'

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
    <div>
      <h1>Country Search</h1>
      <NavigationButton path="/profile"/>
      <LogOutButton/>

      <SearchBar 
        search={search} 
        onSearchChange={setSearch}
      />

      {loading && <p>Searching...</p>}

      {error && <p>Error: {error}</p>}

      {!loading &&
        !error &&
        search.trim() &&
        countries.length === 0 && (
          <p>No countries found.</p>
        )}

      <DisplayList 
      countries={countries} 
      onSelectedCountry={setSelectedCountry}/>
      
      {selectedCountry && (
        <SelectedListItem
          country={selectedCountry}
          adding={adding}
          addMessage={addMessage}
          onAddToList={handleAddToList}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  )
}

export default Country