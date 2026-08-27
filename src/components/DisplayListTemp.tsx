import type {Country as CountryType} from '../api/countriesAPI'

type DisplayListProps = {
    countries:CountryType[]
    onSelectedCountry: (country:CountryType) => void
}

export default function DisplayList ({countries, onSelectedCountry} : DisplayListProps) {
    return (
        <div>
            {countries.length > 0 && (
                <ul className="country-result">
                {countries.map((country) => (
                    <li key={country.codes.alpha_2}>
                    <button
                        onClick={() =>
                        onSelectedCountry(country)
                        }
                    >
                        {country.flag.emoji}{' '}
                        {country.names.common}
                    </button>
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}