import { Star } from 'lucide-react'
import type { CSSProperties, HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface FloatingPortraitProps extends HTMLAttributes<HTMLDivElement> {
  src: string
  /** Area of expertise, for example "Public Financial Management". */
  competence: string
  /** Short name shown under the competence, for example "Joan P.". */
  name: string
  /** Average rating out of 5, shown with one star. */
  rating: number
  /** Shows the bubble. */
  active?: boolean
  /** Which way the bubble extends from the green square. */
  side?: 'left' | 'right'
  /** Put the square and bubble over the top of the photo instead of the bottom. */
  cardAbove?: boolean
  /** How far the photo drifts up and down, in px. */
  floatDistance?: number
  /** Seconds for one float cycle. */
  floatDuration?: number
  /** Seconds to offset the float, so photos don't move in sync. Negative values start mid-cycle. */
  floatDelay?: number
}

/** Full class names, so Tailwind can see them. Keyed by the bubble's anchored corner. */
const corners = {
  'right-below': {
    anchor: 'left-[22.9%] top-[81%]',
    bubble: 'top-0 left-0 origin-top-left',
    closed: '[clip-path:inset(0_100%_100%_0)]',
  },
  'left-below': {
    anchor: 'right-[22.9%] top-[81%]',
    bubble: 'top-0 right-0 origin-top-right',
    closed: '[clip-path:inset(0_0_100%_100%)]',
  },
  'right-above': {
    anchor: 'left-[22.9%] bottom-[81%]',
    bubble: 'bottom-0 left-0 origin-bottom-left',
    closed: '[clip-path:inset(100%_100%_0_0)]',
  },
  'left-above': {
    anchor: 'right-[22.9%] bottom-[81%]',
    bubble: 'bottom-0 right-0 origin-bottom-right',
    closed: '[clip-path:inset(100%_0_0_100%)]',
  },
} as const

/**
 * A photo that drifts gently up and down. When `active`, a small green square pops in near its corner and a frosted
 * bubble with the person's competence and rating grows out of that square, then folds back into it when `active` ends.
 */
export function FloatingPortrait({
  src,
  competence,
  name,
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
  const corner = corners[`${side}-${cardAbove ? 'above' : 'below'}`]

  return (
    <div className={cn('animate-float motion-reduce:animate-none', className)} style={floatStyle} {...props}>
      <img src={src} alt="" loading="lazy" className="size-full rounded-sm object-cover" />

      {/* Zero-size anchor at the square's centre, which is also the bubble's corner. */}
      <div className={cn('absolute z-10 size-0', corner.anchor)}>
        <div
          className={cn(
            'absolute -top-1.5 -left-1.5 z-10 size-3 bg-green-100 transition-[scale,opacity] motion-reduce:scale-100',
            active
              ? 'scale-100 opacity-100 duration-300 ease-out'
              : 'scale-0 opacity-0 delay-[650ms] duration-300 ease-in motion-reduce:delay-0',
          )}
        />
        <div
          className={cn(
            'absolute bg-black-5/78 backdrop-blur-[2px]',
            'transition-[clip-path,scale,opacity] motion-reduce:transition-opacity motion-reduce:[clip-path:none]',
            corner.bubble,
            active
              ? 'scale-100 opacity-100 delay-[250ms] duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] [clip-path:inset(0_0_0_0)]'
              : cn('pointer-events-none scale-60 opacity-0 duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]', corner.closed),
            'motion-reduce:scale-100',
          )}
        >
          <div
            className={cn(
              'flex flex-col px-4 py-3 whitespace-nowrap text-neutral-black transition-opacity motion-reduce:transition-none',
              active ? 'opacity-100 delay-[750ms] duration-500' : 'opacity-0 duration-200',
            )}
          >
            <p className="type-label-sm leading-6!">{competence}</p>
            <p className="type-body-xs flex items-center gap-4 leading-5!">
              <span>{name}</span>
              <span className="flex items-center gap-1">
                <Star aria-hidden className="size-4 fill-current text-amber-100" />
                {rating.toFixed(1)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
