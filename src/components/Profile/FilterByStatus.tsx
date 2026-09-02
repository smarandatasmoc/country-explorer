import { ListItemStatus } from "../../lib/listItems"

export default function FilterByStatus (props:{
    statusFilter:ListItemStatus
    setStatusFilter: React.Dispatch<React.SetStateAction<ListItemStatus>>
}) {
    return (
        <div className="sort-select">
            
            <select value={props.statusFilter ?? ''} onChange={(event)=>
                {   
                    const value = event.target.value
                    props.setStatusFilter(
                        value === ''
                        ? null
                        : value as ListItemStatus
                    )

                }
            }>
                <option value=''>
                    All
                </option>
                <option value='want'>
                    Want To Visit
                </option>
                <option value='visited'>
                    Visited
                </option>
            </select>

        </div>
    )
}