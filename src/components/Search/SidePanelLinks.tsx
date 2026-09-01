import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelLinks({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Links</span>

                <strong>
                    {onSelectedCountry.links 
                    
                        ? (<>
                                <a href={onSelectedCountry.links.official} target="_blank">
                                Official
                                </a>
                                <br/>
                                <a href={onSelectedCountry.links.open_street_maps} target="_blank">
                                OpenStreetMap
                                </a>
                                <br/>
                                <a href={onSelectedCountry.links.google_maps} target="_blank">
                                Google Maps
                                </a>
                                <br/>
                                <a href={onSelectedCountry.links.wikipedia} target="_blank">
                                Wikipedia
                                </a>
                            </>) 
                        : ('N/A')
                    }
                </strong>
            </div>
        </div>
    )
}