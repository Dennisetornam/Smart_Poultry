import axios from 'axios'

// Backend listens on PORT from smartpoultry-backend/.env (currently 5000).
// Override per environment via Vite env: VITE_API_BASE_URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
