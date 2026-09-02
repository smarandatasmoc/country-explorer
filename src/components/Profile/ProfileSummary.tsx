import { ListItem } from "../../lib/listItems"

export default function ProfileSummary (props:{
    items: ListItem[]
}) {
    return (
        <div>
            {props.items.length > 0 && (

                <div className="profile-summary">

                    <div className="summary-card">

                    <span className="summary-number">
                        {props.items.length}
                    </span>

                    <span className="summary-label">
                        Countries
                    </span>

                    </div>


                    <div className="summary-card">

                    <span className="summary-number">

                        {
                        props.items.filter(
                            (item) =>
                            item.status === 'visited'
                        ).length
                        }

                    </span>

                    <span className="summary-label">
                        Visited
                    </span>

                    </div>


                    <div className="summary-card">

                    <span className="summary-number">

                        {
                        props.items.filter(
                            (item) =>
                            item.status === 'want'
                        ).length
                        }

                    </span>

                    <span className="summary-label">
                        Want to visit
                    </span>

                    </div>

                </div>

            )}
        </div>
    )
}