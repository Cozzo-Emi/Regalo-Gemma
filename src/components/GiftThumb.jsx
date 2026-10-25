import { useEffect, useState } from 'react'
import { GiftIcon } from './icons'

export default function GiftThumb({ imagen, producto, className = 'h-12 w-12' }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [imagen])

  const showImage = Boolean(imagen) && !failed

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl bg-linear-to-br from-pink-100 via-rose-50 to-mint/50 ${className}`}
    >
      {showImage ? (
        <img
          src={imagen}
          alt={producto}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-pink-300">
          <GiftIcon className="h-1/2 w-1/2" />
        </div>
      )}
    </div>
  )
}
