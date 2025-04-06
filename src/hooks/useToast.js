// src/hooks/use-toast.js
import { toast } from 'sonner'

export const useToast = () => {
  const showSuccessToast = (message) => {
    toast.success(message)
  }

  const showErrorToast = (message) => {
    toast.error(message)
  }

  return { showSuccessToast, showErrorToast }
}
