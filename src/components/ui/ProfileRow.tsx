import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { Avatar } from './Avatar'
import { Review } from './Review'

export interface ProfileRowProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  role: string
  avatarSrc?: string
  rating?: number
  jobsCompleted?: number
}

/** Compact profile summary for tables and lists. */
export function ProfileRow({ name, role, avatarSrc, rating, jobsCompleted, className, ...props }: ProfileRowProps) {
  return (
    <div className={cn('flex items-center gap-4', className)} {...props}>
      <Avatar src={avatarSrc} name={name} shape="rounded" className="size-15" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <p className="type-heading-sm whitespace-nowrap text-text-primary">{name}</p>
          <p className="type-body-sm whitespace-nowrap text-text-primary">{role}</p>
        </div>
        <Review rating={rating} jobsCompleted={jobsCompleted} />
      </div>
    </div>
  )
}
