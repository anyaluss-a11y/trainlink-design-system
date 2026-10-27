import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { CompanyLogo } from './CompanyLogo'

export interface ProfileSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: string
  /** Optional control on the right of the header, for example an edit button. */
  action?: ReactNode
  children: ReactNode
}

/** A titled card on a profile page, such as "Work experience". */
export function ProfileSection({ title, action, children, className, ...props }: ProfileSectionProps) {
  return (
    <section
      className={cn('flex w-full flex-col gap-0.5 rounded-xl border border-border-default bg-bg-default', className)}
      {...props}
    >
      <header className="flex h-15 items-center gap-2.5 border-b border-border-default py-3 pr-2 pl-5">
        <h2 className="type-heading-xs flex-1 text-text-primary">{title}</h2>
        {action}
      </header>
      <div className="flex flex-col gap-2 px-5 pb-3">{children}</div>
    </section>
  )
}

export interface ExperienceItemProps extends HTMLAttributes<HTMLElement> {
  title: string
  company: string
  logoSrc?: string
  description?: string
}

/** One role in a work-experience list. */
export function ExperienceItem({ title, company, logoSrc, description, className, ...props }: ExperienceItemProps) {
  return (
    <article className={cn('flex flex-col gap-3 py-3', className)} {...props}>
      <div className="flex items-center gap-4">
        <CompanyLogo name={company} src={logoSrc} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="type-label-md font-bold! text-text-primary">{title}</h3>
          <p className="type-body-sm text-gray-600">{company}</p>
        </div>
      </div>
      {description && <p className="type-body-sm text-text-primary">{description}</p>}
    </article>
  )
}
