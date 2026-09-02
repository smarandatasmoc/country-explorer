import { ListItem } from "../../lib/listItems"

export default function ProfileBoardInfoItem (props:{
  item: ListItem
}) {
    return(
        <div>
            <h2>
            {props.item.country_name}
          </h2>

          <p>
            {props.item.country_code}
          </p>
        </div>
    )
}