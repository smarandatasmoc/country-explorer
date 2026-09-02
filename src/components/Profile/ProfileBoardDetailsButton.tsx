import { useNavigate } from "react-router-dom"
import { ListItem } from "../../lib/listItems"

export default function ProfileBoardDetailsButton (props:{
    item:ListItem
}) {
    const navigate = useNavigate()
    return (
        <div>
            <button
                className="view-country-button"
                onClick={() =>
                    navigate(
                    `/profile/search/${props.item.id}`
                    )
                }
            >
                View details →
            </button>
        </div>
    )
} 