import NavigationButton from "../NavigationButton"
import LogOutButton from "../LogOutButton"

export default function ProfileHeader () {
    return (
        <div>
            <header className="page-header">

                <div>

                    <p className="eyebrow">
                        YOUR JOURNEY
                    </p>

                    <h1>
                        My Travel List
                    </h1>

                    <p className="page-description">
                        Keep track of the places you want
                        to visit and the places you've
                        already explored.
                    </p>

                </div>


                <div className="header-actions">

                    <NavigationButton
                        path="/search"
                    />

                    <LogOutButton />

                </div>

            </header>
        </div>
    )
}