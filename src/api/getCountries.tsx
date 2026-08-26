import { responseFields } from "./countriesAPI"
import { CountriesResponse } from "./countriesAPI"
import { Country } from "./countriesAPI"

const API_URL =
  'https://api.restcountries.com/countries/v5'

const API_KEY =
  import.meta.env.VITE_REST_COUNTRIES_API_KEY

export async function getCountries(): Promise<Country[]> {
  const params = new URLSearchParams({
    response_fields: responseFields,
    limit: '100',
  })

  const response = await fetch(
    `${API_URL}?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Countries API error: ${response.status}`
    )
  }

  const result: CountriesResponse =
    await response.json()

  return result.data.objects
}