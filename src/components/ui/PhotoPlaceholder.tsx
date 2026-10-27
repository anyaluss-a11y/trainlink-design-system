import { useId } from 'react'
import type { CSSProperties } from 'react'
import { cn } from '../../lib/cn'

export type PhotoPlaceholderTone = 'mint' | 'lilac' | 'butter' | 'green' | 'teal' | 'neutral'

export interface PhotoPlaceholderProps {
  tone?: PhotoPlaceholderTone
  /** Describes the photo that will go here. */
  label: string
  className?: string
  style?: CSSProperties
}

const tones: Record<PhotoPlaceholderTone, string> = {
  mint: 'bg-green-20 text-neutral-black',
  lilac: 'bg-purple-200 text-neutral-black',
  butter: 'bg-yellow-200 text-neutral-black',
  green: 'bg-green-100 text-neutral-black',
  teal: 'bg-teal-100 text-green-100',
  neutral: 'bg-bg-subtle text-neutral-black',
}

/** Brand dotted-grid tile that stands in for photography. Replace with a real photo when you have one. */
export function PhotoPlaceholder({ tone = 'neutral', label, className, style }: PhotoPlaceholderProps) {
  const id = useId()
  return (
    <div
      role="img"
      aria-label={label}
      style={style}
      className={cn('relative overflow-hidden rounded-sm', tones[tone], className)}
    >
      <svg aria-hidden className="absolute inset-0 size-full">
        <defs>
          <pattern id={id} width="38" height="38" patternUnits="userSpaceOnUse">
            <rect x="16" y="16" width="6" height="6" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}
