import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelPopulation({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Population</span>

                <strong>
                    {onSelectedCountry.population.toLocaleString()}
                </strong>
            </div>
        </div>
    )
}