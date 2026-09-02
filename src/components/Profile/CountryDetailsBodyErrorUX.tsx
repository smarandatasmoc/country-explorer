export default function CountryDetailsBodyErrorUX (props:{
    error: string|null
}) {
    return (
        <div>
            {props.error && (
                <div className="message message-error">
                    {props.error}
                </div>
            )}
        </div>
    )
}