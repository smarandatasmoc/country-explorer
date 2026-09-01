import { Country } from "../../api/countriesAPI"
import { SetSelectedCountryCountryProp } from "../../types/Types"

export default function SidePanelDarkOverlay ({
    onSetSelectedCountry
} : SetSelectedCountryCountryProp) {
    return(
        <div>
            <div
                className="country-details-overlay"
                onClick={() => onSetSelectedCountry(null)}
            />
        </div>
    )
}