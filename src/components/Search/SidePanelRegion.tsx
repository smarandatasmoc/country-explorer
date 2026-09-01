import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelRegion({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Region</span>

                <strong>
                    {onSelectedCountry.region
                    || 'N/A'}
                </strong>
            </div>
        </div>
    )
}