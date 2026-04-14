import api from './axios'

/**
 * POST /api/auth/login
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, role: string, user: object }>}
 */
export const loginUser = (credentials) =>
  api.post('/api/auth/login', credentials).then((res) => res.data)
