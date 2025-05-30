// src/utils/authUtils.js
export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.id || null
  } catch (err) {
    console.error('Invalid token', err)
    return null
  }
}
