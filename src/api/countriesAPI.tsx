const API_URL =
  'https://api.restcountries.com/countries/v5'

const API_KEY =
  import.meta.env.VITE_REST_COUNTRIES_API_KEY

export type Country = {
  names: {
    common: string
    official: string
  }

  codes: {
    alpha_2: string
    alpha_3: string
  }

  flag: {
    emoji: string
  }

  capital?: string[]

  region: string

  subregion?: string

  population: number
}

type CountriesResponse = {
  data: {
    objects: Country[]
    meta: {
      total: number
      count: number
      limit: number
      offset: number
      more: boolean
    }
  }
}

const responseFields = [
  'names.common',
  'names.official',
  'codes.alpha_2',
  'codes.alpha_3',
  'flag.emoji',
  'capital',
  'region',
  'subregion',
  'population',
].join(',')

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

export async function searchCountries(
  query: string,
  signal?: AbortSignal
): Promise<Country[]> {
  const params = new URLSearchParams({
    q: query,
    response_fields: responseFields,
    limit: '20',
  })

  const response = await fetch(
    `${API_URL}?${params.toString()}`,
    {
      signal,
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