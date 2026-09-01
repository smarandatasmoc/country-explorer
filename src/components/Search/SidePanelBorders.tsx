import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelBorders({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Borders</span>

                <strong>
                    {onSelectedCountry.borders.join(', ')
                    || 'N/A'}
                </strong>
            </div>
        </div>
    )
}