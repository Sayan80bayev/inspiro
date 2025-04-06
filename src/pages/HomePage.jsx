import { useTheme } from '@/app/providers/ThemeProvider'
import PinsGrid from '@/components/ui/PinsGrid'
import Sidebar from '@/widgets/Sidebar'
import { useGetPins } from '@/hooks/usePinHooks'
import Loading from '@/components/ui/Loading'

export default function HomePage() {
  const { theme } = useTheme()
  const { data: pins, isLoading, isError, error } = useGetPins()

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-[80px] w-full min-h-screen px-4 py-6 bg-background text-foreground transition-colors">
        <div className="min-h-screen px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Inspiro</h1>
          </div>

          {isLoading ? (
            <Loading />
          ) : isError ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : (
            <PinsGrid pins={pins} theme={theme} />
          )}
        </div>
      </main>
    </div>
  )
}
