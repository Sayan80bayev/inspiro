import { useMutation } from '@tanstack/react-query'
import { loginUser, registerUser } from '../api/authApi'
import { useToast } from './useToast'

export const useRegister = () => {
  const { showSuccessToast, showErrorToast } = useToast()

  return useMutation({
    mutationFn: registerUser, // Define the mutation function here
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      showSuccessToast('Registration successful!')
    },
    onError: (error) => {
      showErrorToast(error.response?.data?.message || 'Registration failed')
    },
  })
}

export const useLogin = () => {
  const { showSuccessToast, showErrorToast } = useToast()

  return useMutation({
    mutationFn: loginUser, // Define the mutation function here
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      showSuccessToast('Login successful!')
    },
    onError: (error) => {
      showErrorToast(error.response?.data?.message || 'Login failed')
    },
  })
}
