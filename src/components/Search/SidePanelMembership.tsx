import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelMembership({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Memberships</span>

                    <strong>
                        {onSelectedCountry.memberships.un && (
                        <div>United Nations</div>
                        )}

                        {onSelectedCountry.memberships.eu && (
                        <div>European Union</div>
                        )}

                        {onSelectedCountry.memberships.eurozone && (
                        <div>Eurozone</div>
                        )}

                        {onSelectedCountry.memberships.schengen && (
                        <div>Schengen</div>
                        )}

                        {onSelectedCountry.memberships.nato && (
                        <div>NATO</div>
                        )}

                        {onSelectedCountry.memberships.commonwealth && (
                        <div>Commonwealth</div>
                        )}

                        {onSelectedCountry.memberships.oecd && (
                        <div>OECD</div>
                        )}

                        {onSelectedCountry.memberships.g7 && (
                        <div>G7</div>
                        )}

                        {onSelectedCountry.memberships.g20 && (
                        <div>G20</div>
                        )}

                        {onSelectedCountry.memberships.brics && (
                        <div>BRICS</div>
                        )}

                        {onSelectedCountry.memberships.opec && (
                        <div>OPEC</div>
                        )}

                        {onSelectedCountry.memberships.african_union && (
                        <div>African Union</div>
                        )}

                        {onSelectedCountry.memberships.asean && (
                        <div>ASEAN</div>
                        )}

                        {onSelectedCountry.memberships.arab_league && (
                        <div>Arab League</div>
                        )}

                        {!onSelectedCountry.memberships.un &&
                        !onSelectedCountry.memberships.eu &&
                        !onSelectedCountry.memberships.eurozone &&
                        !onSelectedCountry.memberships.schengen &&
                        !onSelectedCountry.memberships.nato &&
                        !onSelectedCountry.memberships.commonwealth &&
                        !onSelectedCountry.memberships.oecd &&
                        !onSelectedCountry.memberships.g7 &&
                        !onSelectedCountry.memberships.g20 &&
                        !onSelectedCountry.memberships.brics &&
                        !onSelectedCountry.memberships.opec &&
                        !onSelectedCountry.memberships.african_union &&
                        !onSelectedCountry.memberships.asean &&
                        !onSelectedCountry.memberships.arab_league && (
                        <div>N/A</div>
                        )}
                    </strong>
            </div>
        </div>
    )
}