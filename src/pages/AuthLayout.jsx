import { useTheme } from '@/app/providers/ThemeProvider'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function AuthLayout({ children }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex justify-center items-center h-screen bg-muted relative">
      <div className="absolute top-4 right-4">
        <Button
          onClick={toggleTheme}
          variant="outline"
          className="flex items-center gap-2 border"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </div>
      {children}
    </div>
  )
}
