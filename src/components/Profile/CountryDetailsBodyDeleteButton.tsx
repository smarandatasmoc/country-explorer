export default function CountryDetailsBodyDeleteButton (props:{
    handleDelete: () => Promise<void>
}) {
    return (
        <div>
            <button
                    className="remove-country-button"
                    onClick={props.handleDelete}
                >
                    Remove from list
                </button>
        </div>
    )
}