import { useNavigate } from 'react-router-dom'

type NavigationButtonProps = {
  path: string
}

function NavigationButton({
  path,
}: NavigationButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      className="nav-button"
      onClick={() => navigate(path)}
    >
      {path === '/search'
        ? 'Search Countries'
        : 'My Profile'}
    </button>
  )
}

export default NavigationButton