import ProfileBoard from "./ProfileBoard"
import { ListItem, ListItemStatus } from "../../lib/listItems"
import SortDropdown from "./FilterByStatus"
import { useState } from "react"
import FilterByStatus from "./FilterByStatus"
export default function ProfilePopulated (props:{
    items:ListItem[]
}) {
    const [statusFilter, setStatusFilter] = useState<ListItemStatus>(null)

    const visibleItems = props.items.filter((item) => {
        if (statusFilter === null) {
            return true
        }
        return item.status === statusFilter
    })

    return (
        <div>
            <section className="profile-list">
            
                <div className="section-heading">
            
                    <div>
            
                        <p className="eyebrow">
                             YOUR DESTINATIONS
                        </p>
            
                        <h2>
                            Saved countries
                        </h2>

                        <FilterByStatus
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}/>
            
                    </div>
            
                </div>
            
            
                <div className="profile-grid">
                    {props.items
                        .filter((item) => {
                        if (statusFilter === null) {
                            return true
                        }

                        return item.status === statusFilter
                        })
                        .map((item) => (
                        <ProfileBoard
                            key={item.id}
                            item={item}
                        />
                        ))}
                </div>
            
            </section>
        </div>
    )
}