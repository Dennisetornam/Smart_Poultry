import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/auth'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../components/Toast'

/**
 * useLogin — mutation hook for POST /api/auth/login
 *
 * Usage:
 *   const { mutate: login, isPending } = useLogin()
 *   login({ email, password })
 */
export function useLogin() {
  const { setToken, setRole } = useAuth()
  const { showSuccess, showError } = useToast()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      setToken(data.token)
      setRole(data.role)
      showSuccess('Welcome back! Redirecting to dashboard…')
      navigate('/dashboard')
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message || 'Login failed. Please check your credentials.'
      showError(message)
    },
  })
}
