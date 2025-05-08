import { Suspense, lazy, useMemo, useState } from 'react'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useGetPins } from '@/hooks/usePinHooks'
import Loading from '@/components/ui/Loading'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const Sidebar = lazy(() => import('@/widgets/Sidebar'))
const PinsGrid = lazy(() => import('@/components/ui/PinsGrid'))

export default function HomePage() {
  const { theme } = useTheme()
  const [sortOrder, setSortOrder] = useState('newest') // новое состояние сортировки

  const { data: pins, isLoading, isError, error } = useGetPins(sortOrder)

  const formattedPins = useMemo(() => {
    if (!pins) return []
    return pins.map((pin) => ({
      id: pin._id,
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

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger
                className={`w-[160px] rounded-md px-3 py-2 text-base
                ${theme === 'dark' ? 'border-white text-white' : 'border-black text-black'}
                transition-colors duration-200 no-focus-ring
              `}
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent
                className={`bg-opacity-100 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`} // Задаем фон без прозрачности
              >
                <SelectItem
                  value="newest"
                  className={`py-2 px-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                >
                  Newest First
                </SelectItem>
                <SelectItem
                  value="oldest"
                  className={`py-2 px-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                >
                  Oldest First
                </SelectItem>
              </SelectContent>
            </Select>
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
