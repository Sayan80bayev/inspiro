import { useTheme } from '@/app/providers/ThemeProvider'
import { PinContent } from '@/components/ui/PinContent'
import Sidebar from '@/widgets/Sidebar'
import PinsGrid from '@/components/ui/PinsGrid'
import { useParams } from 'react-router-dom'
import { useGetPinById, useGetPins } from '@/hooks/usePinHooks'
import Loading from '@/components/ui/Loading'

export default function PinPage() {
  const { theme } = useTheme()
  const { id } = useParams() // pin ID from the URL
  const { data, isLoading, isError, error } = useGetPinById(id)
  const { data: pins } = useGetPins()

  if (isLoading)
    return (
      <>
        <Sidebar />
        <Loading />
      </>
    )
  if (isError)
    return <div className="text-red-500 p-4">Error: {error.message}</div>

  const pin = {
    image: data.pin.file_url,
    title: data.pin.title,
    description: data.pin.description,
    createdAt: new Date(data.pin.createdAt).toLocaleDateString(),
    author: data.pin.user.email.split('@')[0],
    authorAvatar: `https://i.pravatar.cc/40?u=${data.pin.user._id}`,
    comments: data.pin.comments.map((c) => ({
      id: c.id,
      user: c.user.email.split('@')[0],
      avatar: `https://i.pravatar.cc/40?u=${c.user._id}`,
      text: c.text,
      time: new Date(c.createdAt).toLocaleTimeString(),
    })),
    similar: pins, // Optional: use `useGetPins()` or other logic to show similar ones
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-[80px] w-full min-h-screen p-4 md:p-6 bg-background text-foreground">
        <div className="max-w-6xl mx-auto">
          <PinContent pin={pin} />
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">More like this</h2>
            <PinsGrid pins={pin.similar} theme={theme} />
          </div>
        </div>
      </main>
    </div>
  )
}
