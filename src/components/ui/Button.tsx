import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonStyles } from './button-styles'
import type { ButtonSize, ButtonVariant } from './button-styles'

export type { ButtonSize, ButtonVariant } from './button-styles'

interface ButtonContentProps {
  iconLeft?: ReactNode
  iconRight?: ReactNode
  /** Square button that only shows an icon. Pass an aria-label. */
  iconOnly?: boolean
  children?: ReactNode
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonContentProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Tertiary only: highlights the button when its filter or menu is applied. */
  selected?: boolean
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
  return (
    <button
      type={type}
      aria-pressed={variant === 'tertiary' && selected ? true : undefined}
      className={buttonStyles({ variant, size, iconOnly, selected, className })}
      {...props}
    >
      {iconLeft}
      {!iconOnly && children}
      {iconRight}
    </button>
  )
}

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, ButtonContentProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** A link that looks like a button, for navigation. Use `Button` for actions. */
export function ButtonLink({
  variant = 'primary',
  size = 'sm',
  iconLeft,
  iconRight,
  iconOnly = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonStyles({ variant, size, iconOnly, className })} {...props}>
      {iconLeft}
      {!iconOnly && children}
      {iconRight}
    </a>
  )
}
