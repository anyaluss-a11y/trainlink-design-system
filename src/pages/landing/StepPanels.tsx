import { useId } from 'react'
import symbolDark from '../../assets/brand/logo-symbol-dark.svg'

/**
 * Brand graphics for the steps section: the brand's three patterns and the enlarged symbol (the teal one is `BrandPanel`). They stand in for photos,
 * which can be swapped in through the `images` prop of `StepsShowcase`.
 */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg aria-hidden viewBox="0 0 505 675" preserveAspectRatio="xMidYMid slice" className="size-full">
      {children}
    </svg>
  )
}

/** Pattern 2: a structured grid on brand green, with one arm of the symbol. */
export function GridPanel() {
  const lines = [107, 214, 321, 428]
  const rows = [118, 236, 354, 472, 590]
  return (
    <Frame>
      <rect width="505" height="675" className="fill-green-100" />
      {lines.map((x) => (
        <rect key={x} x={x - 3.5} width="7" height="675" className="fill-green-15" />
      ))}
      {rows.map((y) => (
        <rect key={y} y={y - 3.5} width="505" height="7" className="fill-green-15" />
      ))}
      <path d="M321 354 L252 423" strokeWidth="9" className="stroke-neutral-white" fill="none" />
      <rect x="315" y="348" width="12" height="12" className="fill-neutral-white" />
    </Frame>
  )
}

const stripes = [260, 330, 180, 420, 300, 230, 380, 200, 350, 280, 430, 240, 320, 190, 400, 270, 340, 220, 360, 300, 250, 410, 200, 330]

/** Pattern 3: bars that fade in from the right, on teal. */
export function StripesPanel() {
  const id = useId()
  return (
    <Frame>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--color-green-100)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--color-green-100)" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect width="505" height="675" className="fill-teal-100" />
      {stripes.map((length, i) => (
        <rect key={i} x={505 - length} y={10 + i * 28} width={length} height="18" fill={`url(#${id})`} />
      ))}
    </Frame>
  )
}

/** Pattern 1: a quiet grid of small squares, here on lilac. */
export function DotsPanel() {
  const id = useId()
  return (
    <Frame>
      <defs>
        <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse">
          <rect x="32" y="32" width="8" height="8" className="fill-neutral-black" />
        </pattern>
      </defs>
      <rect width="505" height="675" className="fill-purple-200" />
      <rect width="505" height="675" fill={`url(#${id})`} />
    </Frame>
  )
}

/** The symbol, enlarged and cropped, in black on a pale mint. */
export function MintSymbolPanel() {
  return (
    <div className="relative size-full overflow-hidden bg-green-15">
      <img src={symbolDark} alt="" className="absolute top-[8%] -left-[18%] h-auto w-[130%] max-w-none" />
    </div>
  )
}
