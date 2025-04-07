// components/CommentInput.jsx
import { useState, useEffect } from 'react'
import { useTheme } from '@/app/providers/ThemeProvider'
import { Send } from 'lucide-react'
import { useCreateComment } from '@/hooks/useCommentHooks'
import { useToast } from '@/hooks/useToast'

import { useQueryClient } from '@tanstack/react-query'

export const CommentInput = ({ pin_id }) => {
  const queryClient = useQueryClient()
  const { theme } = useTheme()
  const [comment, setComment] = useState('')
  const [hasToken, setHasToken] = useState(false)
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: createComment, isPending } = useCreateComment()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setHasToken(!!token)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    createComment(
      { text: comment.trim(), pin_id },
      {
        onSuccess: () => {
          setComment('')
          showSuccessToast('Successfully created a comment!')

          // 🔁 Refetch pin to get updated comments
          queryClient.invalidateQueries({ queryKey: ['pin', pin_id] })
        },
        onError: (error) => {
          showErrorToast('Failed to post comment!')
          console.error('Failed to post comment:', error)
        },
      }
    )
  }

  const inputStyles = `w-full border rounded-xl px-4 py-2 text-sm outline-none resize-none ${
    theme === 'dark'
      ? 'bg-gray-800 border-white text-white placeholder-gray-400'
      : 'bg-white border-black text-black placeholder-gray-500'
  }`

  return (
    <div className="mt-4" style={{ minWidth: '350px' }}>
      {hasToken ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2"
        >
          <textarea
            className={`${inputStyles} sm:w-[calc(100%-48px)]`}
            rows="3"
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isPending}
          />
          <button
            type="submit"
            className={`sm:w-auto p-2 rounded-lg text-sm font-medium h-[35px] ${
              theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
            }`}
            disabled={isPending}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      ) : (
        <p className="text-sm italic text-gray-500">
          You need to sign in to leave a comment!
        </p>
      )}
    </div>
  )
}
