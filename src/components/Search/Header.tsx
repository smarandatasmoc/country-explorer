import NavigationButton from "../NavigationButton"
import LogOutButton from "../LogOutButton"

export default function Header() {
    return (
        <div>
            <header className="page-header">
                <div>
                    <p className="eyebrow">EXPLORE THE WORLD</p>
                    <h1>Find your next destination</h1>
                    <p className="page-description">
                    Search for a country and add it to your travel list.
                    </p>
                </div>

                <div className="header-actions">
                    <NavigationButton path="/profile" />
                    <LogOutButton />
                </div>
                </header>
        </div>
    )
}