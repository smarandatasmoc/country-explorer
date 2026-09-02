import { ListItem } from "../../lib/listItems"

export default function CountryDetailsBodyNote (props:{
    item: ListItem
    onHandleNoteChange: (note: string) => void
    onHandleSaveNote: () => Promise<void>
    savingNote: boolean
}
) {
    return (
        <div>
            <section className="country-section">

                <label htmlFor="country-note">
                    Note
                </label>

                <textarea
                    id="country-note"
                    value={props.item.note ?? ''}
                    onChange={(event) =>
                    props.onHandleNoteChange(
                        event.target.value
                    )
                    }
                    placeholder="Write something about this country..."
                />

                <button
                    className="save-note-button"
                    onClick={props.onHandleSaveNote}
                    disabled={props.savingNote}
                >
                    {props.savingNote
                    ? 'Saving...'
                    : 'Save note'}
                </button>

                </section>
        </div>
    )
}