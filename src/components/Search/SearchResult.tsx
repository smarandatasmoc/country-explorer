import { SearchCountriesProps } from "../../types/Types";
import CountryResults from "./CountryResults";
import SearchResultHeading from "./SearchResultHeading";

export default function SearchResult ({
    countries,
    onSetSelectedCountry
}: SearchCountriesProps) {
    return (
        <div>
            {countries.length > 0 && (
                <section className="country-results-section">

                    <SearchResultHeading countries={countries}/>

                    <CountryResults 
                        countries={countries}
                        onSetSelectedCountry={onSetSelectedCountry}
                    />

                </section>
            )}
        </div>
    )
}