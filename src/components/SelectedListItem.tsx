import type {Country as CountryType} from '../api/countriesAPI'
type CountryDetailsProps = {
  country: CountryType
  adding: boolean
  addMessage: string | null
  onAddToList: () => void
  onClose: () => void
}
export default function SelectedListItem (
    {country, 
    adding, 
    addMessage, 
    onAddToList, 
    onClose} : CountryDetailsProps
){
    return(
        <div>
          <h2>
            {country.flag.emoji}{' '}
            {country.names.common}
          </h2>

          <p>
            Official name:{' '}
            {country.names.official}
          </p>

          <p>
            Capital:{' '}
            {country.capital?.join(', ') ||
              'N/A'}
          </p>

          <p>
            Region: {country.region}
          </p>

          <p>
            Subregion:{' '}
            {country.subregion || 'N/A'}
          </p>

          <p>
            Population:{' '}
            {country.population.toLocaleString()}
          </p>

          <p>
            ISO code:{' '}
            {country.codes.alpha_2}
          </p>

          <button
            onClick={onAddToList}
            disabled={adding}
            >
            {adding ? 'Adding...' : 'Add to my list'}
            </button>

            {addMessage && <p>{addMessage}</p>}

          <button
            onClick={onClose}
          >
            Close
          </button>
        </div>
    )
}