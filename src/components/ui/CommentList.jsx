import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useTheme } from '@/app/providers/ThemeProvider'

export const CommentList = ({ comments }) => {
  const { theme } = useTheme()

  if (!comments?.length) {
    return <p className="text-sm italic text-gray-500">No comments yet.</p>
  }

  // Limit to 2 comments
  const limitedComments = comments.slice(0, 2)

  return (
    <div className="space-y-4 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
      {limitedComments.map((comment, index) => (
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
  )
}
