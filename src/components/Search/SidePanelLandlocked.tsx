import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelLandlocked({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Landlocked</span>

                <strong>
                    {onSelectedCountry.landlocked 
                        ? "Yes"
                        : "No"}
                </strong>
            </div>
        </div>
    )
}