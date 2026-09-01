import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelCallingCodes({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Calling Codes</span>

                <strong>
                    {onSelectedCountry.calling_codes.join(', ')
                    || 'N/A'}
                </strong>
            </div>
        </div>
    )
}