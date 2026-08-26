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

export type CountriesResponse = {
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

export const responseFields = [
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