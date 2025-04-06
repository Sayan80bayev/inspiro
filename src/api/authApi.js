import axios from 'axios'

const API_URL = 'http://localhost:80/api/v1/auth'

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data)
  return response.data
}

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data)
  return response.data
}
