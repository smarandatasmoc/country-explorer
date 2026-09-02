import { useNavigate } from "react-router-dom"
import { ListItem } from "../../lib/listItems"

export default function CountryDetailsHeader (props:{
    item: ListItem
}) {
    const navigate = useNavigate()
    return (
        <div>
            <header className="page-header">

                <div>

                <p className="eyebrow">
                    MY DESTINATION
                </p>

                <h1>
                    {props.item.country_name}
                </h1>

                <p className="page-description">
                    {props.item.country_code}
                </p>

                </div>

                <button
                onClick={() =>
                    navigate('/profile')
                }
                >
                ← Back to profile
                </button>

            </header>
        </div>
    ) 
}