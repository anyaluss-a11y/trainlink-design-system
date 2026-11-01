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

/**
 * A photo that drifts gently up and down. When `active`, a card opens over its corner like a screen switching on:
 * it grows from its top-left corner to full size, then folds back into that corner when `active` ends.
 */
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
          'absolute z-10 origin-top-left rounded-2xl border border-green-100 bg-blue-10/75',
          'transition-[clip-path,scale,opacity] motion-reduce:transition-opacity',
          side === 'right' ? 'left-20' : 'right-20',
          cardAbove ? 'bottom-[calc(100%-42px)]' : 'top-[calc(100%-42px)]',
          active
            ? 'scale-100 opacity-100 duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] [clip-path:inset(0_0_0_0_round_1rem)]'
            : 'pointer-events-none scale-60 opacity-0 duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] [clip-path:inset(0_100%_100%_0_round_1rem)]',
          'motion-reduce:scale-100 motion-reduce:[clip-path:none]',
        )}
      >
        <div
          className={cn(
            'flex flex-col gap-2 p-3 transition-opacity motion-reduce:transition-none',
            active ? 'opacity-100 delay-[600ms] duration-500' : 'opacity-0 duration-200',
          )}
        >
          <p className="type-body-sm leading-[18px]! whitespace-nowrap text-neutral-black">{competence}</p>
          <StarRating
            value={rating}
            className={cn(
              '[&>svg]:transition-[scale,opacity] motion-reduce:[&>svg]:transition-none',
              active
                ? '[&>svg]:scale-100 [&>svg]:opacity-100 [&>svg]:duration-500 [&>svg:nth-child(1)]:delay-[750ms] [&>svg:nth-child(2)]:delay-[830ms] [&>svg:nth-child(3)]:delay-[910ms] [&>svg:nth-child(4)]:delay-[990ms] [&>svg:nth-child(5)]:delay-[1070ms]'
                : '[&>svg]:scale-50 [&>svg]:opacity-0 [&>svg]:duration-150',
            )}
          />
        </div>
      </div>
    </div>
  )
}
