import { ErrorUXProps } from "../../types/Types"

export default function ErrorUX ({error}:ErrorUXProps) {
    return (
        <div> 
            {error && (
                <div className="message message-error">
                {error}
                </div>
            )}
        </div>
    )
}