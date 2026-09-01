import { Country } from "../../api/countriesAPI"

export default function SearchResultHeading (props:{countries:Country[]}) {
    return (
        <div>
            <div className="section-heading">
            <div>
              <p className="eyebrow">SEARCH RESULTS</p>
              <h2>Countries</h2>
            </div>

            <span className="result-count">
              {props.countries.length} results
            </span>
          </div>
        </div>
    )
}