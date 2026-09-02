import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Auth from './routes/Auth'
import Search from './routes/Search'
import Profile from './routes/Profile'
import ProtectedRoute from './hooks/ProtectedRoute'
import CountryDetails from './components/Profile/CountryDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to="/login" replace />} 
        />
        
        <Route path="/login" element={<Auth />} />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
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
          path="/profile/search/:id"
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