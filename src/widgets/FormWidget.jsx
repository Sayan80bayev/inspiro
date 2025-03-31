import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useTheme } from '../app/providers/ThemeProvider'

export function FormWidget({ title, inputs, links = [], onSubmit }) {
  const { theme } = useTheme()

  return (
    <div
      className={cn(
        'p-6 rounded-lg shadow-md',
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      )}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {inputs.map((input, index) => (
          <div key={index}>
            <Label htmlFor={input.name}>{input.label}</Label>
            <Input
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              required={input.required}
            />
          </div>
        ))}
        <Button type="submit" className="w-full">
          Отправить
        </Button>
      </form>
      <div className="mt-4 text-sm">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="text-blue-500 hover:underline block"
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  )
}
