import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface CtaBannerProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: string
  description: string
  /** The call to action, usually a `<ButtonLink variant="inverse">`. */
  action: ReactNode
  /** Decorative content placed behind the text, for example floating image tiles. */
  decoration?: ReactNode
}

export function CtaBanner({ title, description, action, decoration, className, ...props }: CtaBannerProps) {
  return (
    <section
      className={cn(
        'relative flex flex-col items-center gap-10 overflow-clip rounded-t-sm bg-green-45 px-6 py-35 text-center lg:px-20',
        className,
      )}
      {...props}
    >
      {decoration}
      <div className="relative flex flex-col items-center gap-10">
        <h2 className="type-display-cta max-w-175.5 text-neutral-black max-sm:text-[28px]!">{title}</h2>
        <p className="type-body-2xl max-w-133.5 text-gray-600 max-sm:text-lg!">{description}</p>
      </div>
      <div className="relative">{action}</div>
    </section>
  )
}
