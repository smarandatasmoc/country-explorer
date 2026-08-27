type CountrySearchProps = {
    search:string;
    onSearchChange: (value:string) => void
}
export default function SearchBar ({search, onSearchChange}:CountrySearchProps) {
   return(
    <input
        className="search-input"
        type="search"
        placeholder="Search for a country..."
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
      />
   )
}