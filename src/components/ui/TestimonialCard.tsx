import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { Avatar } from './Avatar'

export interface TestimonialCardProps extends HTMLAttributes<HTMLElement> {
  quote: string
  name: string
  role: string
  avatarSrc?: string
}

export function TestimonialCard({ quote, name, role, avatarSrc, className, ...props }: TestimonialCardProps) {
  return (
    <figure className={cn('flex flex-col gap-7.5 rounded-sm bg-bg-default p-7.5', className)} {...props}>
      <blockquote className="type-body-lg leading-normal! text-neutral-black">{quote}</blockquote>
      <figcaption className="flex items-center gap-4">
        <Avatar src={avatarSrc} name={name} size="lg" />
        <span className="flex flex-col gap-1">
          <span className="type-body-lg font-semibold! tracking-[-0.04em] text-neutral-black">{name}</span>
          <span className="type-body-md text-gray-600">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
