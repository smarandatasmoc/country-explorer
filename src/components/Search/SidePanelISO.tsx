import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelISO({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>ISO code</span>

                <strong>
                    {onSelectedCountry.codes.alpha_2}
                </strong>
            </div>
        </div>
    )
}