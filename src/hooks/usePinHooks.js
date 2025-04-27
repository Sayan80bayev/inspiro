import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getPins,
  getPinById,
  createPin,
  updatePin,
  deletePin,
} from '../api/pinApi'
import { useToast } from './useToast'

export const useGetPins = (sortOrder = 'newest') => {
  return useQuery({
    queryKey: ['pins', sortOrder], // теперь зависит от сортировки
    queryFn: () => getPins(sortOrder),
  })
}

// GET a single pin by ID
export const useGetPinById = (id) => {
  return useQuery({
    queryKey: ['pin', id],
    queryFn: () => getPinById(id),
    enabled: !!id, // only fetch if id exists
  })
}

// CREATE pin
export const useCreatePin = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useToast()

  return useMutation({
    mutationFn: createPin,
    onSuccess: () => {
      showSuccessToast('Pin created successfully!')
      queryClient.invalidateQueries({ queryKey: ['pins'] })
    },
    onError: (error) => {
      showErrorToast(error.response?.data?.message || 'Create failed')
    },
  })
}

// UPDATE pin
export const useUpdatePin = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useToast()

  return useMutation({
    mutationFn: updatePin,
    onSuccess: () => {
      showSuccessToast('Pin updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['pins'] })
    },
    onError: (error) => {
      showErrorToast(error.response?.data?.message || 'Update failed')
    },
  })
}

// DELETE pin
export const useDeletePin = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useToast()

  return useMutation({
    mutationFn: deletePin,
    onSuccess: () => {
      showSuccessToast('Pin deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['pins'] })
    },
    onError: (error) => {
      showErrorToast(error.response?.data?.message || 'Delete failed')
    },
  })
}
