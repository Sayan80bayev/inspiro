import { Card, CardContent } from '@/components/ui/card'
import clsx from 'clsx'

const PinsGrid = ({ pins, theme }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {pins.map((src, idx) => (
        <Card key={idx} className="bg-transparent shadow-none border-none p-0">
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
  )
}

export default PinsGrid
