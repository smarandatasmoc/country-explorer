import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelCapital ({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Capital</span>

                <strong>
                    {onSelectedCountry.capitals.map((capital) => capital.name).join(', ') 
                    || 'N/A'}
                </strong>
            </div>
        </div>
    )
}