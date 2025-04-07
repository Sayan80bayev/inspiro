import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useEffect } from 'react'

export const CommentModal = ({ isOpen, onClose, comments }) => {
  const { theme } = useTheme()

  useEffect(() => {
    // Disable scroll on the body when the modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // Clean up the effect when the modal is closed
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center z-50">
      <div
        className={`rounded-lg p-6 max-w-lg w-full ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button
            onClick={onClose}
            className={`text-gray-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          >
            &times; Close
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {comments.map((comment, index) => (
            <div key={comment.id} className="flex gap-3 items-start">
              <Avatar>
                <AvatarImage src={comment.avatar} />
                <AvatarFallback>
                  {comment.user?.[0]?.toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              <div
                className={`p-4 rounded-xl w-full ${
                  theme === 'dark'
                    ? index % 2 === 0
                      ? 'bg-gray-700'
                      : 'bg-gray-600'
                    : index % 2 === 0
                      ? 'bg-blue-50'
                      : 'bg-green-50'
                }`}
              >
                <p className="text-sm font-medium">{comment.user}</p>
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'
                  }`}
                >
                  {comment.text}
                </p>
                <p
                  className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-muted-foreground'
                  }`}
                >
                  {comment.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
