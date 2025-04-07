// hooks/useCommentHooks.jsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createComment, fetchCommentsForPin } from '@/api/commentApi'

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createComment,
    onSuccess: (_, { pin_id }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', pin_id] })
    },
  })
}

export const useComments = (pin_id) => {
  return useQuery({
    queryKey: ['comments', pin_id],
    queryFn: () => fetchCommentsForPin(pin_id),
    enabled: !!pin_id,
  })
}
