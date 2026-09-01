import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelGovernment({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Government Type</span>

                <strong>
                    {onSelectedCountry.government_type
                    || 'N/A'}
                </strong>
            </div>
        </div>
    )
}