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

  capitals: {
    name: string
  } []
  region: string

  subregion?: string

  area : {
    kilometers:number
    miles:number
  }

  population: number

  languages: {
    name:string
  }[]

  continents:string[]

  landlocked:boolean

  borders:string[]

  timezones: string[]

  currencies:{
    code:string
    name:string
    symbol:string
  }[]

  calling_codes:string[]

  tlds: string[]

  cars: {
    driving_side:string
  }

  government_type:string

  links: {
    official:string
    open_street_maps:string
    google_maps:string
    wikipedia:string
  }

  units : {
    measurement_system:string
    temperature_scale:string
  }

  classification:{
    sovereign:boolean
    un_member:boolean 
    un_observer: boolean 
    disputed: boolean 
    dependency: boolean
    dependency_type: string
  }

  parent? :{
    alpha_2:string
  }

  memberships : {
    un:boolean 
    eu: boolean 
    eurozone: boolean
    schengen: boolean
    nato: boolean
    commonwealth: boolean 
    oecd: boolean
    g7: boolean
    g20: boolean 
    brics: boolean 
    opec:boolean
    african_union: boolean 
    asean: boolean 
    arab_league : boolean
  }

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
  'capitals.name',
  'region',
  'subregion',
  'population',
  'languages.name',
  'continents',
  'landlocked',
  'borders',
  'timezones',
  'currencies',
  'calling_codes',
  'tlds',
  'cars.driving_side',
  'government_type',
  'links.google_maps',
  'links.open_street_maps',
  'links.official',
  'links.wikipedia',
  'area.kilometers',
  'area.miles',
  'units.measurement_system',
  'units.temperature_scale',
  'classification.sovereign',
  'classification.un_member',
  'classification.un_observer',
  'classification.disputed',
  'classification.dependency',
  'classification.dependency_type',
  'parent.alpha_2',
  'memberships.un',
  'memberships.eu',
  'memberships.eurozone',
  'memberships.schengen',
  'memberships.nato',
  'memberships.commonwealth',
  'memberships.oecd',
  'memberships.g7',
  'memberships.g20',
  'memberships.brics',
  'memberships.opec',
  'memberships.african_union',
  'memberships.asean',
  'memberships.arab_league'

].join(',')