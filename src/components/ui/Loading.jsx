import { useTheme } from '@/app/providers/ThemeProvider'

export default function Loading() {
  const { theme } = useTheme() // Get the current theme

  return (
    <div
      className={`flex justify-center items-center h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      <div
        className={`animate-spin rounded-full h-12 w-12 border-t-4 ${
          theme === 'dark' ? 'border-blue-300' : 'border-blue-500'
        }`}
      ></div>
    </div>
  )
}
