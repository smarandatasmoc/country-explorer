import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelCurrencies({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Currencies</span>

                <strong>
                    {onSelectedCountry.currencies.length > 0 
                        ? (onSelectedCountry.currencies.map((currency) => (
                            <div key={currency.code}>
                            {currency.name} ({currency.code}) {currency.symbol}
                            </div>))) 
                        : (<div>N/A</div>)
                    }
                </strong>
            </div>
        </div>
    )
}