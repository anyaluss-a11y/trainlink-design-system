import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface StepItemProps extends HTMLAttributes<HTMLLIElement> {
  step: number
  /** Highlights the step, for example the one the user is on. */
  active?: boolean
  children: ReactNode
}

/** One numbered step. Wrap several in an `<ol>`. */
export function StepItem({ step, active = false, className, children, ...props }: StepItemProps) {
  return (
    <li className={cn('flex flex-wrap items-center gap-2', className)} aria-current={active ? 'step' : undefined} {...props}>
      <span
        className={cn(
          'type-body-sm-bold inline-flex min-w-11 shrink-0 items-center justify-center rounded-full px-3 text-text-primary',
          active ? 'bg-green-60 py-0.5' : 'border border-gray-400 py-px',
        )}
      >
        Step {step}
      </span>
      <span className="type-body-xl leading-8! text-text-primary">{children}</span>
    </li>
  )
}
