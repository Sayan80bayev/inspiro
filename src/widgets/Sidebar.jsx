import { Home, Search, Bell, User, Plus } from 'lucide-react'
import { useTheme } from '@/app/providers/ThemeProvider'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

const navItems = [
  { icon: Home, label: 'Home' },
  { icon: Search, label: 'Explore' },
  { icon: Bell, label: 'Notifications' },
  { icon: User, label: 'Profile' },
  { icon: Plus, label: 'Create' },
]

export default function Sidebar() {
  const { theme } = useTheme()

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
              className="p-2 rounded-xl hover:bg-accent"
              title={item.label}
            >
              <Icon className="w-6 h-6" />
            </Button>
          )
        })}
      </div>
    </aside>
  )
}
