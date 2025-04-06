import { useEffect } from 'react'
import { QueryProvider } from './app/providers/QueryProvider'
import { ThemeProvider, useTheme } from './app/providers/ThemeProvider'
import { AppRouter } from './app/routes/routes'
import { Toaster } from '@/components/ui/sonner'

function BodyStyler() {
  const { theme } = useTheme()

  useEffect(() => {
    document.body.className =
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
  }, [theme])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <BodyStyler /> {/* Adds body styling based on theme */}
        <AppRouter />
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: '#4caf50',
              color: 'white',
            },
          }}
        />
      </QueryProvider>
    </ThemeProvider>
  )
}

export default App
