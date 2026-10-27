import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Logo } from './Logo'
import type { LogoTone } from './Logo'
import { NavigationToneProvider } from './Navigation'
import type { NavigationTone } from './Navigation'

export type PageHeaderVariant = 'default' | 'landing' | 'light' | 'subtle'

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * `default`: signed-in app header. `landing`: dark marketing header with the green logo.
   * `light`: the lighter teal header, which has no logo. `subtle`: light grey header with black logo and text.
   */
  variant?: PageHeaderVariant
  /** Usually a `<Navigation>`. */
  navigation?: ReactNode
  /** Right-aligned content, for example a notifications button and an avatar. */
  actions?: ReactNode
  /** Where the logo links to. */
  logoHref?: string
}

const surfaces: Record<PageHeaderVariant, string> = {
  default: 'bg-purple-800 px-10',
  landing: 'bg-purple-800 px-10',
  light: 'bg-teal-100 px-10',
  subtle: 'bg-bg-subtle px-7.5',
}

const logoTones: Record<PageHeaderVariant, LogoTone | null> = {
  default: 'light',
  landing: 'brand',
  light: null,
  subtle: 'dark',
}

const navigationTones: Record<PageHeaderVariant, NavigationTone> = {
  default: 'onDark',
  landing: 'onDark',
  light: 'onDark',
  subtle: 'onLight',
}

export function PageHeader({
  variant = 'default',
  navigation,
  actions,
  logoHref,
  className,
  ...props
}: PageHeaderProps) {
  const logoTone = logoTones[variant]
  const logo = logoTone ? <Logo tone={logoTone} /> : <span aria-hidden className="block h-9 w-44.75" />
  return (
    <header
      className={cn('flex h-22 w-full items-center justify-between rounded-sm', surfaces[variant], className)}
      {...props}
    >
      <NavigationToneProvider value={navigationTones[variant]}>
        <div className="flex h-full items-center gap-20">
          <div className="flex h-full items-center py-5">
            {logoHref && logoTone ? <a href={logoHref}>{logo}</a> : logo}
          </div>
          {navigation}
        </div>
      </NavigationToneProvider>
      {actions && <div className="flex h-full items-center justify-end gap-5">{actions}</div>}
    </header>
  )
}
