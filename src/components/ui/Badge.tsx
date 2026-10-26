import { cn } from '../../lib/cn'
import type { HTMLAttributes } from 'react'

export type BadgeTone = 'brand' | 'warning' | 'success' | 'neutral' | 'danger' | 'info' | 'muted' | 'outline'
export type BadgeSize = 'sm' | 'lg'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  size?: BadgeSize
}

const tones: Record<BadgeTone, string> = {
  brand: 'bg-green-45',
  warning: 'bg-yellow-200',
  success: 'bg-success',
  neutral: 'bg-gray-400',
  danger: 'bg-attention',
  info: 'bg-blue-200',
  muted: 'bg-bg-subtle',
  outline: 'bg-bg-default border-2 border-border-default',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-1',
  lg: 'px-3 py-1.5',
}

export function Badge({ tone = 'brand', size = 'sm', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-full whitespace-nowrap text-text-primary',
        tone === 'outline' ? 'type-body-xs px-3' : 'type-label-xs',
        tone === 'outline' && size === 'sm' ? 'py-1' : sizes[size],
        tone !== 'outline' && size === 'sm' && 'gap-2',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
