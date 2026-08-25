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
      <h1>Home</h1>

      <p>
        Welcome to the application.
      </p>

      <button onClick={moveToLoginPage}>Login</button>
    </div>
  )
}

export default Home