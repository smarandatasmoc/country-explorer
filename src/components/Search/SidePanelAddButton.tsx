import { AddButtonProps } from "../../types/Types"

export default function SidePanelAddButton ({
    onHandleAddToList,
    adding
}: AddButtonProps) {

    return (
        <div className="country-actions">

            <button
                className="button-primary"
                onClick={onHandleAddToList}
                disabled={adding}
            >
                {adding
                ? 'Adding...'
                : '＋ Add to my list'}
            </button>

        </div>
    )
}