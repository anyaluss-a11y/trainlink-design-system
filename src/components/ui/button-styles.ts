import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link' | 'accent' | 'outline' | 'inverse'
export type ButtonSize = 'sm' | 'lg'

interface ButtonStyleOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  iconOnly?: boolean
  selected?: boolean
  className?: string
}

const base =
  'inline-flex shrink-0 items-center justify-center overflow-clip rounded-full whitespace-nowrap transition-colors ' +
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
  link: 'type-body-sm-bold leading-5! gap-2 text-teal-85 hover:underline disabled:opacity-50',
  accent:
    'type-body-sm-bold gap-2.5 bg-green-100 text-text-primary px-10 min-w-12 ' +
    'hover:bg-green-60 disabled:opacity-50',
  outline:
    'type-body-sm-bold gap-2.5 border border-gray-400 text-text-primary px-7.5 min-w-12 ' +
    'hover:bg-bg-subtle disabled:opacity-50',
  inverse:
    'type-body-sm-bold gap-2.5 bg-bg-default text-text-primary px-10 min-w-12 ' +
    'hover:bg-bg-subtle disabled:opacity-50',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-11',
  lg: 'h-16',
}

const iconOnlySizes: Record<ButtonSize, string> = {
  sm: 'size-10 px-0!',
  lg: 'size-16 px-0!',
}

export function buttonStyles({
  variant = 'primary',
  size = 'sm',
  iconOnly = false,
  selected = false,
  className,
}: ButtonStyleOptions) {
  return cn(
    base,
    variants[variant],
    variant !== 'link' && (iconOnly ? iconOnlySizes[size] : sizes[size]),
    variant === 'tertiary' && selected && 'border-2 border-teal-70 bg-teal-30 hover:bg-teal-30',
    className,
  )
}
