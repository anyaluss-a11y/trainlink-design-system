import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'
export type AvatarShape = 'circle' | 'rounded'

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> {
  src?: string
  /** Name of the person. Used as the image description and for the initials fallback. */
  name: string
  size?: AvatarSize
  /** `rounded` is the soft square used on profile cards. */
  shape?: AvatarShape
}

const sizes: Record<AvatarSize, string> = {
  sm: 'size-8',
  md: 'size-11',
  lg: 'size-16',
  xl: 'size-40',
}

const initialsStyles: Record<AvatarSize, string> = {
  sm: 'type-label-xs',
  md: 'type-label-sm',
  lg: 'type-label-md',
  xl: 'type-heading-lg',
}

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

export function Avatar({ src, name, size = 'lg', shape = 'circle', className, ...props }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-blue-300',
        shape === 'circle' ? 'rounded-full' : 'rounded-4xl',
        sizes[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          className="size-full object-cover"
          {...props}
        />
      ) : (
        <span role="img" aria-label={name} className={cn('text-text-primary', initialsStyles[size])}>
          {initialsOf(name)}
        </span>
      )}
    </span>
  )
}
