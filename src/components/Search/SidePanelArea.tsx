import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelArea({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Area</span>

                <strong>
                    {onSelectedCountry.area.kilometers} km<sup>2</sup>
                    <br />
                    {onSelectedCountry.area.miles} miles<sup>2</sup>
                    </strong>
            </div>
        </div>
    )
}