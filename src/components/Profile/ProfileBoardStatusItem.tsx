import { ListItem } from "../../lib/listItems"

export default function ProfileBoardStatusItem (props: {
    item: ListItem
}) {
    return (
        <div>
            <span
            className={`status-badge ${
              props.item.status === 'visited'
                ? 'status-visited'
                : props.item.status === 'want'
                  ? 'status-want'
                  : 'status-none'
            }`}
          >

            {props.item.status === 'visited'
              ? 'Visited'
              : props.item.status === 'want'
                ? 'Want to visit'
                : 'No status'}

          </span>
        </div>
    )
}