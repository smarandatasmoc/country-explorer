import { Country } from "../../api/countriesAPI"
import { SetSelectedCountryCountryProp } from "../../types/Types"

export default function CloseSidePanelButton ({
    onSetSelectedCountry
} : SetSelectedCountryCountryProp) {
    return(
        <div>
            <button
              className="country-details-close"
              onClick={() => onSetSelectedCountry(null)}
              aria-label="Close country details"
            >
              X
            </button>
        </div>
    )
}