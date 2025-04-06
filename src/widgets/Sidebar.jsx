import {
  Settings,
  Home,
  Search,
  Bell,
  User,
  Plus,
  Moon,
  Sun,
  LogOut,
} from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/app/providers/ThemeProvider'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { useToast } from '@/hooks/useToast'

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme()
  const { showSuccessToast, showErrorToast } = useToast()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token') // Clear token
    showSuccessToast('Successfully logged out!')
    navigate('/auth/login') // Redirect to login
  }

  const handleNavigation = (to) => {
    const token = localStorage.getItem('token')
    if (!token && (to === '/create' || to === '/notifications')) {
      // If the user is not logged in, redirect to login
      showErrorToast("You haven't signed in!")
      navigate('/auth/login')
    } else {
      // If the user is logged in, allow navigation
      navigate(to)
    }
  }

  const navItems = [
    { icon: Home, label: 'Home', to: '/home' },
    { icon: Search, label: 'Explore', to: '/explore' },
    { icon: Bell, label: 'Notifications', to: '/notifications' },
    { icon: User, label: 'Profile', to: '/profile' },
    { icon: Plus, label: 'Create', to: '/create' },
  ]

  const isLoggedIn = !!localStorage.getItem('token') // Check if user is logged in
  console.log(isLoggedIn)
  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 h-screen w-[80px] p-4 flex flex-col items-center border-r',
        theme === 'dark' ? 'border-white' : 'border-black',
        'bg-background text-foreground'
      )}
    >
      <div className="flex flex-col gap-6 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.label}
              variant="ghost"
              className="w-[35px] p-2 rounded-xl hover:rounded-1xl hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer hover:text-black"
              title={item.label}
              onClick={() => handleNavigation(item.to)} // Use handleNavigation here
            >
              <Icon className="w-6 h-6" />
            </Button>
          )
        })}
      </div>

      {/* Spacer to push settings to bottom */}
      <div className="flex-grow"></div>

      {/* Settings Popover - Now at the very bottom */}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={clsx(
              'w-[35px] p-2 rounded-xl hover:rounded-1xl transition-all duration-300 ease-in-out cursor-pointer',
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            )}
            title="Settings"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </PopoverTrigger>

        {/* Popover Content with Theme Support */}
        <PopoverContent
          className={clsx(
            'w-[200px] p-4 rounded-xl shadow-lg',
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-200 text-black'
          )}
          side="right"
          align="start"
        >
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <p className="text-sm mb-6">Manage your preferences here.</p>
          <div className="space-y-4">
            {/* Theme Toggle Option */}
            <Button
              className={`w-full
                ${theme === 'dark' ? 'text-white bg-transparent border border-white' : 'bg-gray hover:bg-gray-200'}`}
              onClick={() => {
                toggleTheme()
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Log In / Log Out Option */}
            <Button
              className={`w-full
                ${theme === 'dark' ? 'text-white bg-transparent border border-white hover:bg-gray-900' : 'bg-gray-100 hover:bg-red-500 hover:text-white'}`}
              onClick={
                isLoggedIn ? handleLogout : () => navigate('/auth/login')
              } // Navigate to login if not logged in
            >
              {isLoggedIn ? (
                <LogOut size={18} className="hover:text-white" />
              ) : (
                <User size={18} className="hover:text-white" />
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </aside>
  )
}
