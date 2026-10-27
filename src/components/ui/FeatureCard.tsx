import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface FeatureCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: string
  description: string
  /** Illustration or product preview shown under the text. */
  children?: ReactNode
}

export function FeatureCard({ title, description, children, className, ...props }: FeatureCardProps) {
  return (
    <article className={cn('flex flex-col gap-8 overflow-clip rounded-sm bg-bg-subtle p-7.5', className)} {...props}>
      <header className="flex flex-col">
        <h3 className="type-heading-card text-neutral-black">{title}</h3>
        <p className="type-body-lg text-gray-500">{description}</p>
      </header>
      {children}
    </article>
  )
}
