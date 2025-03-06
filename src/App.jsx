import { ThemeProvider } from './app/providers/ThemeProvider'
import { AppRouter } from './app/routes/routes'

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
