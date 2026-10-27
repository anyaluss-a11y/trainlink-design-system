import { useState } from 'react'
import { cn } from '../../lib/cn'

export interface CompanyLogoProps {
  /** Company name. Used as the image description and for the initial fallback. */
  name: string
  src?: string
  className?: string
}

export function CompanyLogo({ name, src, className }: CompanyLogoProps) {
  const [failed, setFailed] = useState(false)
  return (
    <span
      className={cn(
        'inline-flex size-14 shrink-0 items-center justify-center rounded-sm bg-bg-default px-1.5 py-1',
        className,
      )}
    >
      {src && !failed ? (
        <img src={src} alt={name} onError={() => setFailed(true)} className="max-h-full max-w-full object-contain" />
      ) : (
        <span role="img" aria-label={name} className="type-heading-lg text-text-brand">
          {name.trim()[0]?.toUpperCase()}
        </span>
      )}
    </span>
  )
}
