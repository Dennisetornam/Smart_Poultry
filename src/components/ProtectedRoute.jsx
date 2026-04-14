import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    // Preserve the page the user tried to visit so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
