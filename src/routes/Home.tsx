import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'

function Home() {

  const navigate = useNavigate()

  const moveToLoginPage = () => {
    navigate('/login')
  }
  

  return (
    <div>
      <div className="page-container">
      <h1>Home</h1>

      <p>
        Welcome to the application.
      </p>

      <button onClick={moveToLoginPage}>Login</button>
    </div>
    </div>
  )
}

export default Home