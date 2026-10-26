import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Usually a `<SearchInput>`. Give it a width, for example `className="w-92.5"`. */
  search?: ReactNode
  /** Extra controls separated from the filters, for example a "Saved" chip. */
  actions?: ReactNode
  /** The filter chips. */
  children?: ReactNode
}

export function FilterBar({ search, actions, children, className, ...props }: FilterBarProps) {
  return (
    <div
      role="search"
      className={cn('flex w-full flex-wrap items-center gap-4 rounded-4xl bg-bg-subtle px-2 py-4', className)}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-2">
        {search}
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      </div>
      {actions}
    </div>
  )
}
