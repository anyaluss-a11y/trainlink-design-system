import symbolBrand from '../../assets/brand/logo-symbol-brand.svg'
import { cn } from '../../lib/cn'

export interface BrandPanelProps {
  className?: string
}

/** Teal panel with the symbol enlarged and cropped, the brand's "zoomed in" graphic. */
export function BrandPanel({ className }: BrandPanelProps) {
  return (
    <div aria-hidden className={cn('relative overflow-hidden bg-teal-100', className)}>
      <img
        src={symbolBrand}
        alt=""
        className="absolute top-[18%] left-[10%] h-auto w-[125%] max-w-none opacity-90"
      />
    </div>
  )
}
