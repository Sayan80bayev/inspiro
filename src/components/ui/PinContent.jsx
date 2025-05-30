import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useTheme } from '@/app/providers/ThemeProvider'
import { CommentList } from '@/components/ui/CommentList'
import { CommentInput } from '@/components/ui/CommentInput'
import { CommentModal } from '@/widgets/CommentModal'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

export const PinContent = ({ pin, showDelete, onDelete }) => {
  const { theme } = useTheme()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div
      className={`flex flex-col md:flex-row mx-auto rounded-2xl p-0 h-[65vh] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
      style={{ width: 'fit-content' }}
    >
      {/* Image Section */}
      <div
        className={`relative flex justify-center items-center overflow-hidden rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
      >
        <img
          src={pin.image}
          alt={pin.title}
          className="w-full h-auto object-contain"
          style={{
            maxWidth: '500px',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Info Section */}
      <div
        className={`flex-1 max-w-md relative flex flex-col justify-between p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={pin.authorAvatar} />
                <AvatarFallback>
                  {pin.author?.[0]?.toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{pin.title}</h1>
                <p className="text-sm text-muted-foreground">
                  by <strong>{pin.author}</strong> · {pin.createdAt}
                </p>
              </div>
            </div>

            {showDelete && (
              <Button
                onClick={onDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </Button>
            )}
          </div>

          {/* Description */}
          {pin.description && (
            <div>
              <h2 className="font-semibold mb-1">Description</h2>
              <p>{pin.description}</p>
            </div>
          )}

          <h2 className="font-semibold mb-2">Comments</h2>
          <CommentList comments={pin.comments} />
          {pin.comments?.length > 2 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-gray-500 flex items-center gap-2 text-sm font-medium hover:text-gray-700 mt-4"
            >
              <MoreHorizontal className="h-4 w-4" />
              View All Comments
            </button>
          )}
        </div>

        <CommentInput pin_id={pin.id} />
      </div>

      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        comments={pin.comments}
      />
    </div>
  )
}
