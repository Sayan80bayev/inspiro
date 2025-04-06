import { useTheme } from '@/app/providers/ThemeProvider'
import { PinContent } from '@/components/ui/PinContent'
import Sidebar from '@/widgets/Sidebar'
import PinsGrid from '@/components/ui/PinsGrid'

const dummyPin = {
  // image: 'https://i.pinimg.com/736x/5b/23/7f/5b237f6f08ba0daf6990571a927b7ae3.jpg',
  image:
    'https://i.pinimg.com/736x/91/5b/1b/915b1bf025b6b08d1de5ca7f9b92a896.jpg',

  title: 'Mystical Forest Girl',
  author: 'DarkArtFan',
  authorAvatar: 'https://i.pravatar.cc/40?u=3',
  createdAt: '2 days ago',
  description:
    'A surreal depiction of a forest witch with fungi growing from her skull.',
  comments: [
    {
      id: 1,
      user: 'dreamer42',
      avatar: 'https://i.pravatar.cc/40?u=1',
      text: 'This is so beautifully haunting.',
      time: '1 hour ago',
    },
    {
      id: 2,
      user: 'sketchoholic',
      avatar: 'https://i.pravatar.cc/40?u=2',
      text: 'I need this on a poster!',
      time: '3 hours ago',
    },
  ],
  similar: [
    'https://i.pinimg.com/736x/ce/bd/d5/cebdd5d501342064edaca7ba4a53d1f4.jpg',
    'https://i.pinimg.com/736x/91/5b/1b/915b1bf025b6b08d1de5ca7f9b92a896.jpg',
    'https://i.pinimg.com/736x/90/83/e6/9083e65c0648ae538ec6262f87b1aada.jpg',
    'https://i.pinimg.com/736x/f5/29/41/f52941d47be6ae5699bd44bf697c32c9.jpg',
    'https://i.pinimg.com/736x/da/ac/18/daac1808b8b429c45a514e636bf0b6f3.jpg',
  ],
}

export default function PinPage() {
  const { theme } = useTheme()

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-[80px] w-full min-h-screen p-4 md:p-6 bg-background text-foreground">
        <div className="max-w-6xl mx-auto">
          {/* Pin Content with Centering, Light Gray Background and 65% Height */}
          <PinContent pin={dummyPin} />

          {/* Similar Pins */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">More like this</h2>
            <PinsGrid pins={dummyPin.similar} theme={theme} />
          </div>
        </div>
      </main>
    </div>
  )
}
