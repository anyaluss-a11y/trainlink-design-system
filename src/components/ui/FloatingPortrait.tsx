import type { CSSProperties, HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { StarRating } from './StarRating'

export interface FloatingPortraitProps extends HTMLAttributes<HTMLDivElement> {
  src: string
  /** Area of expertise shown on the card, for example "Public financial management". */
  competence: string
  /** Rating out of 5. */
  rating: number
  /** Shows the competence and rating card. */
  active?: boolean
  /** Which way the card extends from the photo. */
  side?: 'left' | 'right'
  /** Put the card over the top edge of the photo instead of the bottom edge. */
  cardAbove?: boolean
  /** How far the photo drifts up and down, in px. */
  floatDistance?: number
  /** Seconds for one float cycle. */
  floatDuration?: number
  /** Seconds to offset the float, so photos don't move in sync. Negative values start mid-cycle. */
  floatDelay?: number
}

/** A photo that drifts gently up and down, with a card that pops in over its corner when `active`. */
export function FloatingPortrait({
  src,
  competence,
  rating,
  active = false,
  side = 'right',
  cardAbove = false,
  floatDistance = 8,
  floatDuration = 6,
  floatDelay = 0,
  className,
  style,
  ...props
}: FloatingPortraitProps) {
  const floatStyle = {
    ...style,
    '--float-distance': `${-floatDistance}px`,
    animationDuration: `${floatDuration}s`,
    animationDelay: `${floatDelay}s`,
  } as CSSProperties

  return (
    <div className={cn('animate-float motion-reduce:animate-none', className)} style={floatStyle} {...props}>
      <img src={src} alt="" loading="lazy" className="size-full rounded-sm object-cover" />
      <div
        className={cn(
          'absolute z-10 flex flex-col gap-2 rounded-2xl border border-green-100 bg-blue-10/75 p-3',
          'transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          'motion-reduce:transform-none motion-reduce:transition-opacity',
          side === 'right' ? 'left-20 origin-top-left' : 'right-20 origin-top-right',
          cardAbove ? 'bottom-[calc(100%-42px)]' : 'top-[calc(100%-42px)]',
          active ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-2 scale-90 opacity-0',
        )}
      >
        <p className="type-body-sm leading-[18px]! whitespace-nowrap text-neutral-black">{competence}</p>
        <StarRating
          value={rating}
          className={cn(
            '[&>svg]:transition-[opacity,transform] [&>svg]:duration-300 motion-reduce:[&>svg]:transition-none',
            active ? '[&>svg]:scale-100 [&>svg]:opacity-100' : '[&>svg]:scale-50 [&>svg]:opacity-0',
          )}
        />
      </div>
    </div>
  )
}
