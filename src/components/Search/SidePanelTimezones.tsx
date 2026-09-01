import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelTimezones({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Timezones</span>

                <strong>
                    {onSelectedCountry.timezones.join(', ')
                    || 'N/A'}
                </strong>
            </div>
        </div>
    )
}