import { useTheme } from '@/app/providers/ThemeProvider'
import { Card, CardContent } from '@/components/ui/card'
import Sidebar from '@/widgets/Sidebar'
import clsx from 'clsx'

const dummyImages = [
  'https://i.pinimg.com/736x/5b/23/7f/5b237f6f08ba0daf6990571a927b7ae3.jpg',
  'https://i.pinimg.com/736x/90/83/e6/9083e65c0648ae538ec6262f87b1aada.jpg',
  'https://i.pinimg.com/736x/ce/bd/d5/cebdd5d501342064edaca7ba4a53d1f4.jpg',
  'https://i.pinimg.com/736x/91/5b/1b/915b1bf025b6b08d1de5ca7f9b92a896.jpg',
  'https://i.pinimg.com/736x/4f/ea/4e/4fea4ea246211bc2ec160f14d0ee5684.jpg',
]

export default function HomePage() {
  const { theme } = useTheme()
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-[80px] w-full min-h-screen px-4 py-6 bg-background text-foreground transition-colors">
        <div className="min-h-screen px-4 py-6 bg-background text-foreground transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Inspiro</h1>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {dummyImages.map((src, idx) => (
              <Card
                key={idx}
                className="bg-transparent shadow-none border-none p-0"
              >
                <div
                  className={clsx(
                    'overflow-hidden border rounded-2xl',
                    theme === 'dark' ? 'border-white' : 'border-black'
                  )}
                >
                  <CardContent className="p-0">
                    <img
                      src={src}
                      alt={`img-${idx}`}
                      className="w-full h-auto object-cover"
                    />
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
