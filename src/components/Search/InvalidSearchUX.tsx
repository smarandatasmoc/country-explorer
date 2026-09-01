import { InvalidSearchUXProps } from "../../types/Types";

export default function InvalidSearchUX ({
    loading,
    error,
    search,
    countries
}:InvalidSearchUXProps){
    return(
        <div>
            {!loading &&
                !error &&
                search.trim() &&
                countries.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">🌍</div>
                    <h2>No countries found</h2>
                    <p>
                    Try searching for a different country.
                    </p>
                </div>
            )}
        </div>
    )
}