import { useTheme } from '@/app/providers/ThemeProvider'
import { PinContent } from '@/components/ui/PinContent'
import Sidebar from '@/widgets/Sidebar'
import PinsGrid from '@/components/ui/PinsGrid'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetPinById, useGetPins, useDeletePin } from '@/hooks/usePinHooks'
import { getUserIdFromToken } from '@/utils/authUtils'
import Loading from '@/components/ui/Loading'

export default function PinPage() {
  const { theme } = useTheme()
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useGetPinById(id)
  const { data: pins } = useGetPins()
  const deletePinMutation = useDeletePin()
  const currentUserId = getUserIdFromToken()

  if (isLoading) {
    return (
      <>
        <Sidebar />
        <Loading />
      </>
    )
  }

  if (isError) {
    return <div className="text-red-500 p-4">Error: {error.message}</div>
  }

  const isOwner = data?.pin?.user?._id === currentUserId

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this pin?')) {
      deletePinMutation.mutate(id, {
        onSuccess: () => navigate('/home'),
      })
    }
  }

  const pin = {
    id,
    image: data.pin.file_url,
    title: data.pin.title,
    description: data.pin.description,
    createdAt: new Date(data.pin.createdAt).toLocaleDateString(),
    author: data.pin.user.email.split('@')[0],
    authorAvatar: `https://i.pravatar.cc/40?u=${data.pin.user._id}`,
    comments: data.pin.comments.map((c) => ({
      id: c._id,
      user: c.user_id.email.split('@')[0],
      avatar: `https://i.pravatar.cc/40?u=${c.user_id._id}`,
      text: c.text,
      time: new Date(c.createdAt).toLocaleTimeString(),
    })),
    similar: pins,
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-[80px] w-full min-h-screen p-4 md:p-6 bg-background text-foreground">
        <div className="max-w-6xl mx-auto">
          <PinContent pin={pin} showDelete={isOwner} onDelete={handleDelete} />
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">More like this</h2>
            <PinsGrid pins={pin.similar} theme={theme} />
          </div>
        </div>
      </main>
    </div>
  )
}
