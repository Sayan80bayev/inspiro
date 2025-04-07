// api/commentApi.js
import axios from 'axios'

const API_BASE = 'http://localhost:80/api/v1/comments'

export const createComment = async ({ text, pin_id }) => {
  const token = localStorage.getItem('token')
  const res = await axios.post(
    API_BASE,
    { text, pin_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return res.data
}

export const fetchCommentsForPin = async (pin_id) => {
  const res = await axios.get(`${API_BASE}/${pin_id}`)
  return res.data
}
