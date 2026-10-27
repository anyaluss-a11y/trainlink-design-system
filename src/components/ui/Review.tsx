import { Star } from 'lucide-react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  /** Average rating out of 5. Leave empty when there are no reviews yet. */
  rating?: number
  jobsCompleted?: number
}

export function Review({ rating, jobsCompleted, className, ...props }: ReviewProps) {
  const hasRating = rating !== undefined
  return (
    <div className={cn('type-body-xs flex items-center gap-1', className)} {...props}>
      <Star
        aria-hidden
        className={cn('size-4 shrink-0 text-icon-rating', hasRating && 'fill-current')}
      />
      {hasRating ? (
        <>
          <span className="font-semibold! text-text-primary">{rating.toFixed(1)}</span>
          {jobsCompleted !== undefined && (
            <span className="text-text-secondary">({jobsCompleted} jobs completed)</span>
          )}
        </>
      ) : (
        <span className="text-text-secondary">No reviews yet</span>
      )}
    </div>
  )
}
