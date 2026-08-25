import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Auth from './routes/Auth'
import Country from './routes/Country'
import Profile from './routes/Profile'
import ProtectedRoute from './hooks/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  )
}

export default App