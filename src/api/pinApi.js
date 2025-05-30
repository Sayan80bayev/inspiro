import axios from 'axios'

const API_BASE = 'http://localhost:80/api/v1/pin'

export const getPins = async (sortOrder = 'newest') => {
  const response = await axios.get(`${API_BASE}?sort=${sortOrder}`)
  return response.data
}

export const getPinById = async (id) => {
  const response = await axios.get(`${API_BASE}/${id}`)
  return response.data
}

export const createPin = async (pinData) => {
  const formData = new FormData()
  for (const key in pinData) {
    formData.append(key, pinData[key])
  }

  const response = await axios.post(API_BASE, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const updatePin = async ({ id, pinData }) => {
  const formData = new FormData()
  for (const key in pinData) {
    formData.append(key, pinData[key])
  }

  const response = await axios.put(`${API_BASE}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const deletePin = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}
