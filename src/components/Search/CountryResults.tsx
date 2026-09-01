import { SearchCountriesProps } from "../../types/Types"

export default function CountryResults ({
    countries,
    onSetSelectedCountry
}:SearchCountriesProps) {
    
    return (
        <div>
            <ul className="country-results">

            {countries.map((country) => (
              <li
                className="country-result"
                key={country.codes.alpha_2}
              >
                <button
                  onClick={() =>
                    onSetSelectedCountry(country)
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
        </div>
    )
}