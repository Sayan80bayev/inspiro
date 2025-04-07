import { Suspense, lazy, useMemo } from 'react'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useGetPins } from '@/hooks/usePinHooks'
import Loading from '@/components/ui/Loading'

const Sidebar = lazy(() => import('@/widgets/Sidebar'))
const PinsGrid = lazy(() => import('@/components/ui/PinsGrid'))

export default function HomePage() {
  const { theme } = useTheme()
  const { data: pins, isLoading, isError, error } = useGetPins()

  const formattedPins = useMemo(() => {
    if (!pins) return []
    return pins.map((pin) => ({
      ...pin,
      title: pin.title.trim(),
    }))
  }, [pins])

  return (
    <div className="flex">
      <Suspense fallback={<div className="w-[80px]" />}>
        <Sidebar />
      </Suspense>

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
            <Suspense fallback={<Loading />}>
              <PinsGrid pins={formattedPins} theme={theme} />
            </Suspense>
          )}
        </div>
      </main>
    </div>
  )
}
