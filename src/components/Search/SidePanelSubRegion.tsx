import { SelectedCountryProp } from "../../types/Types";

export default function SidePaneSubRegion({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Subregion</span>

                    <strong>
                        {onSelectedCountry.subregion 
                        || 'N/A'}
                    </strong>
            </div>
        </div>
    )
}