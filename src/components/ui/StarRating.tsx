import { Star } from 'lucide-react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface StarRatingProps extends HTMLAttributes<HTMLSpanElement> {
  /** Rating out of 5. Shown as the nearest whole number of filled stars. */
  value: number
}

export function StarRating({ value, className, ...props }: StarRatingProps) {
  const filled = Math.round(value)
  return (
    <span role="img" aria-label={`Rated ${value} out of 5`} className={cn('flex gap-1', className)} {...props}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn('size-4', i < filled ? 'fill-current text-gold-100' : 'fill-current text-gray-300')}
        />
      ))}
    </span>
  )
}
