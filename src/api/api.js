import axios from 'axios'

const API_BASE_URL = 'http://localhost:5005/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Login function
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

// Future API functions can be added here (e.g., registerUser)
