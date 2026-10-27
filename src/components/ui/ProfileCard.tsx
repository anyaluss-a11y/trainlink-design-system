import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { Review } from './Review'

export interface ProfileCardProps extends HTMLAttributes<HTMLElement> {
  name: string
  /** Job title and company, for example "Head of product at Northwind". */
  role: string
  avatarSrc?: string
  rating?: number
  jobsCompleted?: number
  /** Areas of expertise. Only the first `maxTags` are shown, the rest become a "+N" badge. */
  tags?: string[]
  maxTags?: number
  /** `horizontal` puts the photo beside the details, as used in marketing sections. */
  orientation?: 'vertical' | 'horizontal'
}

export function ProfileCard({
  name,
  role,
  avatarSrc,
  rating,
  jobsCompleted,
  tags = [],
  maxTags = 2,
  orientation = 'vertical',
  className,
  ...props
}: ProfileCardProps) {
  const visibleTags = tags.slice(0, maxTags)
  const hiddenCount = tags.length - visibleTags.length
  const tagList = tags.length > 0 && (
    <ul className="flex list-none flex-wrap gap-1" aria-label="Expertise">
      {visibleTags.map((tag) => (
        <li key={tag}>
          <Badge tone="outline">{tag}</Badge>
        </li>
      ))}
      {hiddenCount > 0 && (
        <li>
          <Badge tone="outline" aria-label={`${hiddenCount} more`}>
            +{hiddenCount}
          </Badge>
        </li>
      )}
    </ul>
  )
  if (orientation === 'horizontal') {
    return (
      <article
        className={cn('flex w-full max-w-113 items-stretch gap-4 rounded-sm border border-border-subtle bg-bg-default p-4', className)}
        {...props}
      >
        <Avatar src={avatarSrc} name={name} size="xl" shape="square" />
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="type-heading-sm text-neutral-black">{name}</h3>
            <p className="type-body-sm text-gray-500">{role}</p>
          </div>
          {tagList}
        </div>
      </article>
    )
  }
  return (
    <article
      className={cn('flex w-64.5 flex-col items-start gap-6 rounded-lg border border-border-subtle bg-gray-50 p-4', className)}
      {...props}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex justify-center">
          <Avatar src={avatarSrc} name={name} size="xl" shape="rounded" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="type-heading-sm text-text-primary">{name}</h3>
            <p className="type-body-sm text-text-secondary">{role}</p>
          </div>
          <Review rating={rating} jobsCompleted={jobsCompleted} />
        </div>
      </div>
      {tagList}
    </article>
  )
}
