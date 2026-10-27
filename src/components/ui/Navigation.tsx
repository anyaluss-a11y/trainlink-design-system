import { createContext, useContext } from 'react'
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type NavigationTone = 'onDark' | 'onLight'

const NavigationToneContext = createContext<NavigationTone>('onDark')

export const NavigationToneProvider = NavigationToneContext.Provider

export interface NavigationItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string
  /** Optional 16px icon shown before the label. */
  icon?: ReactNode
  active?: boolean
}

export function NavigationItem({ label, icon, active = false, className, ...props }: NavigationItemProps) {
  const tone = useContext(NavigationToneContext)
  const onLight = tone === 'onLight'
  return (
    <a
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex h-full items-center justify-center overflow-clip',
        onLight
          ? 'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal-70'
          : 'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-green-100',
        active &&
          cn(
            'after:absolute after:inset-x-0 after:bottom-0 after:h-1.25 after:content-[""]',
            onLight ? 'after:bg-text-primary' : 'after:bg-green-100',
          ),
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'type-body-sm flex items-center gap-2.5 px-3 py-1 whitespace-nowrap transition-colors',
          onLight
            ? cn('text-neutral-black', active ? 'font-bold!' : 'hover:text-teal-85')
            : active
              ? 'font-bold! text-green-60'
              : 'text-green-35 hover:text-green-60',
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

/** Horizontal primary navigation for the page header. Items adapt to the header's background. */
export function Navigation({ className, children, ...props }: NavigationProps) {
  return (
    <nav aria-label="Main" className={cn('flex h-22 items-center gap-3', className)} {...props}>
      {children}
    </nav>
  )
}
