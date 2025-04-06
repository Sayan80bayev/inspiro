import { Card, CardContent } from '@/components/ui/card'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

const PinsGrid = ({ pins, theme }) => {
  return (
    <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
      {pins.map((pin, idx) => (
        <Link
          key={pin.id || idx}
          to={`/pinpage/${pin.id}`}
          className="block cursor-pointer"
        >
          <Card className="bg-transparent shadow-none border-none p-0">
            <div
              className={clsx(
                'overflow-hidden border rounded-2xl',
                theme === 'dark' ? 'border-white' : 'border-black'
              )}
            >
              <CardContent className="p-0">
                <img
                  src={pin.file_url}
                  alt={pin.title || `pin-${idx}`}
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default PinsGrid
