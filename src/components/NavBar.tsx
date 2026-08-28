import NavigationButton from './NavigationButton'
import LogOutButton from './LogOutButton'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        YOUR JOURNEY
      </div>

      <div className="navbar-actions">
        <NavigationButton path="/country" />
        <NavigationButton path="/profile" />
        <LogOutButton />
      </div>
    </nav>
  )
}

export default Navbar