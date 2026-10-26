import { cn } from '../../lib/cn'
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export interface NavigationItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string
  /** Optional 16px icon shown before the label. */
  icon?: ReactNode
  active?: boolean
}

export function NavigationItem({ label, icon, active = false, className, ...props }: NavigationItemProps) {
  return (
    <a
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex h-full items-center justify-center overflow-clip',
        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-green-100',
        active && 'after:absolute after:inset-x-0 after:bottom-0 after:h-1.25 after:bg-green-100 after:content-[""]',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'type-body-sm flex items-center gap-2.5 px-3 py-1 whitespace-nowrap transition-colors',
          active ? 'font-bold! text-green-60' : 'text-green-35 hover:text-green-60',
        )}
      >
        {icon && (
          <span aria-hidden className="flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
            {icon}
          </span>
        )}
        {label}
      </span>
    </a>
  )
}

export interface NavigationProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

/** Horizontal primary navigation for the page header (designed for a dark background). */
export function Navigation({ className, children, ...props }: NavigationProps) {
  return (
    <nav aria-label="Main" className={cn('flex h-22 items-center gap-3', className)} {...props}>
      {children}
    </nav>
  )
}
