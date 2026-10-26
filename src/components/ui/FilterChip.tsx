import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from './Button'
import type { ButtonProps } from './Button'

export interface FilterChipProps extends Omit<ButtonProps, 'variant' | 'size' | 'iconLeft' | 'iconRight' | 'iconOnly' | 'selected' | 'children'> {
  label: string
  /** The applied filter value. When set, the chip is highlighted and shows `label: value`. */
  value?: string
  /** Optional leading icon, for example a heart for "Saved". */
  icon?: ReactNode
  /** Show the dropdown chevron. Turn off for chips that toggle a list instead of opening a menu. */
  chevron?: boolean
}

export function FilterChip({ label, value, icon, chevron = true, ...props }: FilterChipProps) {
  const applied = value !== undefined && value !== ''
  return (
    <Button
      variant="tertiary"
      selected={applied}
      iconLeft={icon}
      iconRight={chevron ? <ChevronDown className="size-5" aria-hidden /> : undefined}
      {...props}
    >
      {applied ? (
        <span className="flex items-center gap-1">
          <span className="font-semibold">{label}:</span>
          <span className="font-medium">{value}</span>
        </span>
      ) : (
        label
      )}
    </Button>
  )
}
