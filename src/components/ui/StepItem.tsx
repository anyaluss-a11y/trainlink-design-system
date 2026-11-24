import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface StepItemProps extends HTMLAttributes<HTMLLIElement> {
  step: number
  /** Highlights the step, for example the one the user is on. */
  active?: boolean
  /** Fades the step back, for steps that are not the current one. */
  dimmed?: boolean
  children: ReactNode
}

/** One numbered step. Wrap several in an `<ol>`. */
export function StepItem({ step, active = false, dimmed = false, className, children, ...props }: StepItemProps) {
  return (
    <li
      className={cn('flex flex-wrap items-center gap-2 transition-opacity duration-500', dimmed && 'opacity-50', className)}
      aria-current={active ? 'step' : undefined}
      {...props}
    >
      <span
        className={cn(
          'type-body-sm-bold inline-flex min-w-11 shrink-0 items-center justify-center rounded-full border px-3 py-px text-text-primary transition-colors duration-500',
          active ? 'border-green-60 bg-green-60' : 'border-gray-400 bg-transparent',
        )}
      >
        Step {step}
      </span>
      <span className={cn('type-body-xl leading-8! text-text-primary transition-[font-weight] duration-500', active && 'font-semibold!')}>
        {children}
      </span>
    </li>
  )
}
