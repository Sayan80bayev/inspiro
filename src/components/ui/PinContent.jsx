import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useTheme } from '@/app/providers/ThemeProvider'

export const PinContent = ({ pin }) => {
  const { theme } = useTheme() // Get the current theme

  return (
    <div
      className={`flex flex-col md:flex-row mx-auto rounded-2xl p-0 h-[65vh] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
      style={{ width: 'fit-content' }}
    >
      {/* Image Section - Pinterest Style */}
      <div
        className={`relative flex justify-center items-center overflow-hidden rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
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
        className={`flex-1 max-w-md overflow-y-auto relative flex justify-center items-center p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
      >
        <div className="w-full h-full max-w-full overflow-y-auto flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {/* Author Avatar */}
            <Avatar>
              <AvatarImage src={pin.authorAvatar} />
              <AvatarFallback>{pin.author[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{pin.title}</h1>
              <p
                className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}`}
              >
                by <strong>{pin.author}</strong> · {pin.createdAt}
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-1">Description</h2>
            <p>{pin.description}</p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Comments</h2>
            <div className="space-y-4">
              {pin.comments.map((comment, index) => (
                <div key={comment.id} className="flex gap-3 items-start">
                  {/* Comment Avatar */}
                  <Avatar>
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>
                      {comment.user[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`p-4 rounded-xl ${theme === 'dark' ? (index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600') : index % 2 === 0 ? 'bg-blue-50' : 'bg-green-50'}`}
                  >
                    <p className="text-sm font-medium">{comment.user}</p>
                    <p
                      className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'}`}
                    >
                      {comment.text}
                    </p>
                    <p
                      className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-muted-foreground'}`}
                    >
                      {comment.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
