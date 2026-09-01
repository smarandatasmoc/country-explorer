import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelTlds({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Tlds</span>

                <strong>
                    {onSelectedCountry.tlds.join(', ')
                    || 'N/A'}
                </strong>
            </div>
        </div>
    )
}