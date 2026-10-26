import { cn } from '../../lib/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link'
export type ButtonSize = 'sm' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: ReactNode
  iconRight?: ReactNode
  /** Square button that only shows an icon. Pass an aria-label. */
  iconOnly?: boolean
  /** Tertiary only: highlights the button when its filter or menu is applied. */
  selected?: boolean
}

const base =
  'inline-flex items-center justify-center overflow-clip rounded-full whitespace-nowrap transition-colors ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-70 disabled:cursor-not-allowed'

const variants: Record<ButtonVariant, string> = {
  primary:
    'type-body-sm-bold gap-2.5 bg-teal-100 text-green-100 px-5 py-0.5 min-w-12 ' +
    'hover:bg-teal-85 disabled:bg-teal-70 disabled:text-teal-30',
  secondary:
    'type-body-sm-bold gap-2.5 bg-teal-30 text-text-brand px-5 py-0.5 min-w-12 ' +
    'hover:bg-teal-60 disabled:opacity-50',
  tertiary:
    'type-label-sm gap-3 bg-bg-default text-text-primary border border-border-default px-5 py-0.5 min-w-11 ' +
    'hover:bg-bg-subtle disabled:opacity-50',
  link:
    'type-body-sm-bold leading-5! gap-2 text-teal-85 hover:underline disabled:opacity-50',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-11',
  lg: 'h-16',
}

const iconOnlySizes: Record<ButtonSize, string> = {
  sm: 'size-10 px-0!',
  lg: 'size-16 px-0!',
}

export function Button({
  variant = 'primary',
  size = 'sm',
  iconLeft,
  iconRight,
  iconOnly = false,
  selected = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const isLink = variant === 'link'
  return (
    <button
      type={type}
      aria-pressed={variant === 'tertiary' && selected ? true : undefined}
      className={cn(
        base,
        variants[variant],
        !isLink && (iconOnly ? iconOnlySizes[size] : sizes[size]),
        variant === 'tertiary' && selected && 'border-2 border-teal-70 bg-teal-30',
        className,
      )}
      {...props}
    >
      {iconLeft}
      {!iconOnly && children}
      {iconRight}
    </button>
  )
}
