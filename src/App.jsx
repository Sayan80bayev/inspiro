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

function ToastComponent() {
  const { theme } = useTheme() // Get the current theme from the context

  // Define dark theme color and lighter border color
  const darkColor = 'oklch(0.21 0.034 264.665)'
  const lighterBorder = 'oklch(0.30 0.034 264.665)' // Slightly lighter for the border

  // Set the toast style based on the current theme
  const toastStyle = {
    backgroundColor: theme === 'dark' ? darkColor : '#fff', // Dark theme gets the oklch color, light theme gets white
    color: theme === 'dark' ? '#fff' : '#000', // Text color changes based on theme
    border: theme === 'dark' ? `1px solid ${lighterBorder}` : '1px solid #000', // Lighter border for dark theme, black border for light theme
  }

  return (
    <Toaster
      toastOptions={{
        style: toastStyle, // Dynamically applied style based on theme
      }}
      position="top-right" // Position the toasts at the top-right
    />
  )
}

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <BodyStyler /> {/* Adds body styling based on theme */}
        <AppRouter />
        <ToastComponent /> {/* Render the Toast component here */}
      </QueryProvider>
    </ThemeProvider>
  )
}

export default App
