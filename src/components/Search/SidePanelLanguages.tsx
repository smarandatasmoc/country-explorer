import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelLanguages({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Languages</span>

                <strong>
                    {onSelectedCountry.languages.map((language) => language.name).join(', ')
                    || 'N/A'}
                </strong>
            </div>
        </div>
    )
}