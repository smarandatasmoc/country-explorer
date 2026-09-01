import { LoadingUXProps } from "../../types/Types"

export default function LoadingUX ({loading}:LoadingUXProps) {
    return(
        <div>
            {loading && (
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Searching countries...</p>
                </div>
            )}
        </div>
    )
}