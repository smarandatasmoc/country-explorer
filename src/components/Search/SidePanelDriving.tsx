import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelDriving({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Driving Side</span>

                <strong>
                    {onSelectedCountry.cars.driving_side
                    || 'N/A'}
                </strong>
            </div>
        </div>
    )
}