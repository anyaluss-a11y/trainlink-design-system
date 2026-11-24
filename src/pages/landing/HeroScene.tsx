import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { portraits } from '../../assets/people'
import { FloatingPortrait } from '../../components/ui/FloatingPortrait'
import { useSpotlight } from '../../hooks/useSpotlight'

/** Positions below are in px on the design's 1400 x 660 hero. */
const HERO_WIDTH = 1400

interface Rect {
  x: number
  y: number
  w: number
  h: number
}

interface HeroPhoto {
  id: string
  src: string
  competence: string
  name: string
  rating: number
  side: 'left' | 'right'
  cardAbove?: boolean
  floatDistance: number
  floatDuration: number
  floatDelay: number
  /** Where the photo rests once it has arrived. */
  rest: Rect
  /** Wave 1 starts in place and flies off past the edges. Wave 2 starts as a faint ghost and takes its place. */
  wave: 1 | 2
  fly?: { dx: number; dy: number; scale: number }
  ghost?: Rect & { blur: number }
}

const photos: HeroPhoto[] = [
  {
    id: 'tie', src: portraits[3], wave: 1, rest: { x: 56, y: 162, w: 273, h: 330 }, fly: { dx: -470, dy: 90, scale: 1.7 },
    competence: 'Change Management', name: 'Michael B.', rating: 4.8, side: 'right', floatDistance: 8, floatDuration: 6, floatDelay: 0,
  },
  {
    id: 'elder', src: portraits[1], wave: 1, rest: { x: 1066, y: 67, w: 287, h: 325 }, fly: { dx: 470, dy: -80, scale: 1.7 },
    competence: 'Leadership Coaching', name: 'Kenji T.', rating: 5.0, side: 'left', floatDistance: 10, floatDuration: 7, floatDelay: -2,
  },
  {
    id: 'mustard', src: portraits[4], wave: 2, rest: { x: 70, y: 90, w: 250, h: 283 }, ghost: { x: 254, y: 55, w: 114, h: 129, blur: 0 },
    competence: 'Public Financial Management', name: 'Joan P.', rating: 4.9, side: 'right', floatDistance: 9, floatDuration: 6.5, floatDelay: -1,
  },
  {
    id: 'earrings', src: portraits[0], wave: 2, rest: { x: 190, y: 430, w: 180, h: 203 }, ghost: { x: 412, y: 509, w: 87, h: 98, blur: 0 },
    competence: 'Digital Transformation', name: 'Naledi D.', rating: 5.0, side: 'left', cardAbove: true, floatDistance: 8, floatDuration: 7.5, floatDelay: -3,
  },
  {
    id: 'grey', src: portraits[2], wave: 2, rest: { x: 1070, y: 170, w: 260, h: 294 }, ghost: { x: 980, y: 408, w: 116, h: 131, blur: 2 },
    competence: 'Agile Delivery', name: 'Daniel O.', rating: 4.7, side: 'left', floatDistance: 10, floatDuration: 6, floatDelay: -5,
  },
]

/** Scroll progress (0 to 1) over which the first wave flies off and the second wave arrives. */
const EXIT: [number, number] = [0.04, 0.5]
const ENTER: [number, number] = [0.2, 0.74]
const GHOST_OPACITY = 0.1

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const smooth = (t: number) => t * t * (3 - 2 * t)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const within = (p: number, [from, to]: [number, number]) => clamp01((p - from) / (to - from))

interface Pose {
  x: number
  y: number
  scale: number
  opacity: number
  blur: number
  visible: boolean
}

function poseAt(photo: HeroPhoto, p: number): Pose {
  if (photo.wave === 1 && photo.fly) {
    const t = smooth(within(p, EXIT))
    const fade = t > 0.8 ? 1 - (t - 0.8) / 0.2 : 1
    return { x: photo.fly.dx * t, y: photo.fly.dy * t, scale: lerp(1, photo.fly.scale, t), opacity: fade, blur: 0, visible: t < 1 }
  }
  const ghost = photo.ghost!
  const t = smooth(within(p, ENTER))
  const dx = ghost.x + ghost.w / 2 - (photo.rest.x + photo.rest.w / 2)
  const dy = ghost.y + ghost.h / 2 - (photo.rest.y + photo.rest.h / 2)
  const solid = smooth(clamp01(t / 0.7))
  return {
    x: lerp(dx, 0, t),
    y: lerp(dy, 0, t),
    scale: lerp(ghost.w / photo.rest.w, 1, t),
    opacity: lerp(GHOST_OPACITY, 1, solid),
    blur: lerp(ghost.blur, 0, t),
    visible: true,
  }
}

type Phase = 'first' | 'between' | 'second'

export interface HeroSceneProps {
  /** The headline, text and button, shown in the middle. */
  children: ReactNode
}

/**
 * The landing hero. On wide screens it pins in place while you scroll: the two large photos fly off past the edges
 * and the faint photos in the background grow, sharpen and take their place. On narrow screens, or with reduced
 * motion, it stays still and shows the starting arrangement.
 */
export function HeroScene({ children }: HeroSceneProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLElement>(null)
  const layers = useRef(new Map<string, HTMLDivElement>())
  const [phase, setPhase] = useState<Phase>('first')

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1280px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let lastPhase: Phase = 'first'

    const apply = (p: number) => {
      for (const photo of photos) {
        const layer = layers.current.get(photo.id)
        if (!layer) continue
        const pose = poseAt(photo, p)
        layer.style.visibility = pose.visible ? 'visible' : 'hidden'
        layer.style.transform = `translate3d(${pose.x.toFixed(1)}px, ${pose.y.toFixed(1)}px, 0) scale(${pose.scale.toFixed(4)})`
        layer.style.opacity = pose.opacity >= 0.999 ? '' : pose.opacity.toFixed(3)
        layer.style.filter = pose.blur > 0.05 ? `blur(${pose.blur.toFixed(2)}px)` : ''
      }
      const next: Phase = p < 0.02 ? 'first' : p > 0.98 ? 'second' : 'between'
      if (next !== lastPhase) {
        lastPhase = next
        setPhase(next)
      }
    }

    const update = () => {
      frame = 0
      const outer = outerRef.current
      const inner = innerRef.current
      let p = 0
      if (outer && inner && wide.matches && !reduced.matches) {
        const rect = outer.getBoundingClientRect()
        const distance = rect.height - inner.offsetHeight
        const top = parseFloat(getComputedStyle(inner).top) || 0
        p = distance > 0 ? clamp01((top - rect.top) / distance) : 0
      }
      apply(p)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    wide.addEventListener('change', schedule)
    reduced.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      wide.removeEventListener('change', schedule)
      reduced.removeEventListener('change', schedule)
    }
  }, [])

  const settled = phase === 'first' ? photos.filter((photo) => photo.wave === 1) : phase === 'second' ? photos.filter((photo) => photo.wave === 2) : []
  const spotlight = useSpotlight(settled.length)
  const activeId = spotlight === null ? null : settled[spotlight]?.id

  return (
    <div ref={outerRef} className="motion-safe:xl:h-[calc(660px+90vh)]">
      <section
        ref={innerRef}
        className="relative flex h-165 flex-col items-center justify-center gap-4 overflow-clip pt-35 pb-40 motion-safe:xl:sticky motion-safe:xl:top-5"
      >
        <div className="hidden xl:block" aria-hidden>
          {photos.map((photo) => (
            <div
              key={photo.id}
              ref={(node) => {
                if (node) layers.current.set(photo.id, node)
                else layers.current.delete(photo.id)
              }}
              className="absolute will-change-transform"
              style={{
                left: `${(photo.rest.x / HERO_WIDTH) * 100}%`,
                top: photo.rest.y,
                width: photo.rest.w,
                height: photo.rest.h,
                ...(photo.wave === 2 ? { opacity: GHOST_OPACITY } : null),
              }}
            >
              <FloatingPortrait
                src={photo.src}
                competence={photo.competence}
                name={photo.name}
                rating={photo.rating}
                side={photo.side}
                cardAbove={photo.cardAbove}
                active={activeId === photo.id}
                floatDistance={photo.floatDistance}
                floatDuration={photo.floatDuration}
                floatDelay={photo.floatDelay}
                className="relative size-full"
              />
            </div>
          ))}
        </div>
        {children}
      </section>
    </div>
  )
}
