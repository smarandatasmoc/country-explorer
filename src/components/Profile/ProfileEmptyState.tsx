import NavigationButton from "../NavigationButton"

export default function ProfileEmptyState () {
    return (
        <div>

          <div className="empty-state profile-empty">

            <div className="empty-icon">
              🧭
            </div>

            <h2>
              Your travel list is empty
            </h2>

            <p>
              Start exploring countries and
              add destinations you'd like
              to visit.
            </p>

            <NavigationButton
              path="/search"
            />

          </div>
        </div>
    )
}