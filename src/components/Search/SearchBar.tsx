import { SearchBarProps } from "../../types/Types"

export default function SearchBar ({
    search,
    onSetSearch
}: SearchBarProps) {
    return(
        <div>
            <div className="search-box">
                <span className="search-icon">⌕</span>

                <input
                    className="country-search"
                    type="search"
                    placeholder="Search for a country..."
                    value={search}
                    onChange={(event) =>
                        onSetSearch(event.target.value)
                    }
                />
            </div>
        </div>
    )
}