import { cn } from '../../lib/cn'
import logotypeBrand from '../../assets/brand/logo-logotype-brand.svg'
import logotypeLight from '../../assets/brand/logo-logotype-light.svg'
import symbolBrand from '../../assets/brand/logo-symbol-brand.svg'
import symbolLight from '../../assets/brand/logo-symbol-light.svg'

export type LogoTone = 'light' | 'brand'

export interface LogoProps {
  /** `light` is white, for dark backgrounds. `brand` is the TrainLink green. */
  tone?: LogoTone
  className?: string
}

const assets: Record<LogoTone, { symbol: string; logotype: string }> = {
  light: { symbol: symbolLight, logotype: logotypeLight },
  brand: { symbol: symbolBrand, logotype: logotypeBrand },
}

export function Logo({ tone = 'light', className }: LogoProps) {
  const { symbol, logotype } = assets[tone]
  return (
    <span role="img" aria-label="TrainLink" className={cn('relative block h-9 w-44.75 shrink-0', className)}>
      <span className="absolute inset-[0_79.93%_0_0]">
        <img alt="" src={symbol} className="absolute inset-0 block size-full max-w-none" />
      </span>
      <span className="absolute inset-[16.71%_0_14.82%_23.41%]">
        <img alt="" src={logotype} className="absolute inset-0 block size-full max-w-none" />
      </span>
    </span>
  )
}
