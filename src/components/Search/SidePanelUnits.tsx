import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelUnits({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Units</span>

                <strong>
                    {`Measurement system: ${onSelectedCountry.units.measurement_system}`}
                    <br/>
                    {`Temperature scale: ${onSelectedCountry.units.temperature_scale}`}
                </strong>
            </div>
        </div>
    )
}