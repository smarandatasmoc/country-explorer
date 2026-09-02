import { ListItem } from "../../lib/listItems"
import { ListItemStatus } from "../../lib/listItems"

export default function CountryDetailsBodyStatus (props:{
    item:ListItem,
    onHandleStatusChange: (status: ListItemStatus) => Promise<void>
}) {
    return (
        <div>
            <select
                id="country-status"
                value={props.item.status ?? ''}
                onChange={(event) => {
                    const value =
                    event.target.value
                    props.onHandleStatusChange(
                        value === ''
                        ? null
                        : (value as ListItemStatus)
                    )}}
                >

                    <option value="">
                    Select status
                    </option>

                    <option value="want">
                    Want to visit
                    </option>

                    <option value="visited">
                    Visited
                    </option>

                </select>
        </div>
    )
}