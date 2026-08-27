import NavigationButton from "./NavigationButton"
import LogOutButton from "./LogOutButton"

export default function NavBar(){
    return(
        <div>
            <nav className="navbar">
                <div className="navbar-content">
                    <h1 className="logo">
                    🌍 Travel Journal
                    </h1>

                    <div className="nav-actions">
                    <NavigationButton path="/country" />
                    <NavigationButton path="/profile" />
                    <LogOutButton />
                    </div>
                </div>
            </nav>
            <br/>
        </div>
    )
}