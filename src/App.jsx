import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import { ThemeProvider } from './app/providers/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
