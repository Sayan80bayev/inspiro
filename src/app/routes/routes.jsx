import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import HomePage from '@/pages/HomePage'
import PinPage from '@/pages/PinPage'
import PinCreatePage from '@/pages/PinCreatePage'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pinpage/:id" element={<PinPage />} />
        <Route path="/create" element={<PinCreatePage />} />
      </Routes>
    </Router>
  )
}
