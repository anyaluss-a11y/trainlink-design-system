import { cn } from '../../lib/cn'
import type { HTMLAttributes, ReactNode } from 'react'
import { Logo } from './Logo'

export type PageHeaderVariant = 'default' | 'landing' | 'light'

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * `default`: signed-in app header. `landing`: marketing header with the green logo.
   * `light`: the lighter teal header, which has no logo.
   */
  variant?: PageHeaderVariant
  /** Usually a `<Navigation>`. */
  navigation?: ReactNode
  /** Right-aligned content, for example a notifications button and an avatar. */
  actions?: ReactNode
}

const surfaces: Record<PageHeaderVariant, string> = {
  default: 'bg-purple-800',
  landing: 'bg-purple-800',
  light: 'bg-teal-100',
}

export function PageHeader({ variant = 'default', navigation, actions, className, ...props }: PageHeaderProps) {
  return (
    <header
      className={cn('flex h-22 w-full items-center justify-between rounded-sm px-10', surfaces[variant], className)}
      {...props}
    >
      <div className="flex h-full items-center gap-20">
        <div className="flex h-full items-center py-5">
          {variant === 'light' ? (
            <span aria-hidden className="block h-9 w-44.75" />
          ) : (
            <Logo tone={variant === 'landing' ? 'brand' : 'light'} />
          )}
        </div>
        {navigation}
      </div>
      {actions && <div className="flex h-full items-center justify-end gap-5">{actions}</div>}
    </header>
  )
}
