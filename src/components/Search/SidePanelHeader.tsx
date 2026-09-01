import { SelectedCountryProp } from "../../types/Types"

export default function SidePanelHeader ({
    onSelectedCountry
}: SelectedCountryProp) {
    return (
        <div>
            <div className="country-details-header">

                <div className="large-country-flag">
                  {onSelectedCountry.flag.emoji}
                </div>

                <div>
                  <p className="eyebrow">
                    COUNTRY DETAILS
                  </p>

                  <h2>
                    {onSelectedCountry.names.common}
                  </h2>

                  <p>
                    {onSelectedCountry.names.official}
                  </p>
                </div>

              </div>
        </div>
    )
}