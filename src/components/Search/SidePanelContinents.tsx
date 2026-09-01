import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelContinents({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                    <span>Continents</span>

                <strong>
                    {onSelectedCountry.continents.join(', ')
                    || 'N/A'}
                </strong>
            </div>
        </div>
    )
}