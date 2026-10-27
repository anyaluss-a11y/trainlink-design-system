import logotypeBrand from '../../assets/brand/logo-logotype-brand.svg'
import logotypeDark from '../../assets/brand/logo-logotype-dark.svg'
import logotypeLight from '../../assets/brand/logo-logotype-light.svg'
import symbolBrand from '../../assets/brand/logo-symbol-brand.svg'
import symbolDark from '../../assets/brand/logo-symbol-dark.svg'
import symbolLight from '../../assets/brand/logo-symbol-light.svg'
import { cn } from '../../lib/cn'

export type LogoTone = 'light' | 'brand' | 'dark'

export interface LogoProps {
  /** `light` is white, for dark backgrounds. `brand` is the TrainLink green. `dark` is black, for light backgrounds. */
  tone?: LogoTone
  /** Set the size with `h-*` and `w-*` classes. Keep the 179:36 proportion. */
  className?: string
}

const assets: Record<LogoTone, { symbol: string; logotype: string }> = {
  light: { symbol: symbolLight, logotype: logotypeLight },
  brand: { symbol: symbolBrand, logotype: logotypeBrand },
  dark: { symbol: symbolDark, logotype: logotypeDark },
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
