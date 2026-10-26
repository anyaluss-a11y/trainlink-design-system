import { cn } from '../../lib/cn'
import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> {
  src?: string
  /** Name of the person. Used as the image description and for the initials fallback. */
  name: string
  size?: AvatarSize
}

const sizes: Record<AvatarSize, string> = {
  sm: 'size-8',
  md: 'size-11',
  lg: 'size-16',
}

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

export function Avatar({ src, name, size = 'lg', className, ...props }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-300',
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
        <span role="img" aria-label={name} className="type-label-sm text-text-primary">
          {initialsOf(name)}
        </span>
      )}
    </span>
  )
}
