import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface OptionCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /** Light lead-in before the title, for example "I’m a ". */
  lead?: string
  title: string
  description: string
  selected?: boolean
}

/** A large selectable card. Put several inside a `role="radiogroup"` container. */
export function OptionCard({ lead, title, description, selected = false, className, ...props }: OptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={cn(
        'flex w-full flex-col items-start gap-4 rounded-sm p-7 text-left transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-70',
        selected ? 'bg-green-45' : 'border border-border-default bg-bg-default hover:bg-bg-subtle',
        className,
      )}
      {...props}
    >
      <span className="type-heading-lg block w-full leading-7! text-text-primary">
        {lead && <span className="font-medium!">{lead}</span>}
        {title}
      </span>
      <span className={cn('type-body-md block w-full', selected ? 'text-gray-800' : 'text-gray-600')}>
        {description}
      </span>
    </button>
  )
}
