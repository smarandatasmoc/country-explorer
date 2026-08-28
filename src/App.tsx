import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Auth from './routes/Auth'
import Country from './routes/Country'
import Profile from './routes/Profile'
import Home from './routes/Home'
import ProtectedRoute from './hooks/ProtectedRoute'
import CountryDetails from './routes/CountryDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to="/home" replace />} 
        />
        <Route 
          path="/home" 
          element={<Home/>} 
        />
        <Route path="/login" element={<Auth />} />

        <Route
          path="/country"
          element={
            <ProtectedRoute>
              <Country />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/country/:code"
          element={
            <ProtectedRoute>
              <CountryDetails />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App