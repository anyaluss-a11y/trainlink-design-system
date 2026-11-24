import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { portraits } from '../../assets/people'
import { FloatingPortrait } from '../../components/ui/FloatingPortrait'

/** Positions below are in px on the design's 1400 x 660 hero. */
const HERO_WIDTH = 1400
const HERO_CENTER = { x: 700, y: 330 }

interface Rect {
  x: number
  y: number
  w: number
  h: number
}

type Wave = 1 | 2 | 3

interface HeroPhoto {
  id: string
  wave: Wave
  src: string
  floatDistance: number
  floatDuration: number
  floatDelay: number
  /** Where the photo rests once it has arrived. */
  rest: Rect
  /** Where the photo comes from in the background. Waves 2 and 3 only. */
  ghost?: Rect & { blur: number }
  /** How far the photo flies, and how much it grows, as it leaves past the edges. Waves 1 and 2 only. */
  fly?: { dx: number; dy: number; scale: number }
}

const people = {
  tie: portraits[3],
  elder: portraits[1],
  mustard: portraits[4],
  earrings: portraits[0],
  grey: portraits[2],
  brunette: portraits[5],
}

/** A background starting point for wave 3: smaller, and pulled toward the middle of the hero. */
const backgroundOf = (rest: Rect): Rect & { blur: number } => {
  const w = rest.w * 0.45
  const h = rest.h * 0.45
  const cx = rest.x + rest.w / 2 + (HERO_CENTER.x - (rest.x + rest.w / 2)) * 0.5
  const cy = rest.y + rest.h / 2 + (HERO_CENTER.y - (rest.y + rest.h / 2)) * 0.5
  return { x: cx - w / 2, y: cy - h / 2, w, h, blur: 2 }
}

const float = (distance: number, duration: number, delay: number) => ({ floatDistance: distance, floatDuration: duration, floatDelay: delay })

const photos: HeroPhoto[] = [
  // Wave 1: two large photos, sharp from the start.
  { id: 'w1-tie', wave: 1, src: people.tie, ...float(8, 6, 0), rest: { x: 56, y: 162, w: 273, h: 330 }, fly: { dx: -470, dy: 90, scale: 1.7 } },
  { id: 'w1-elder', wave: 1, src: people.elder, ...float(10, 7, -2), rest: { x: 1066, y: 67, w: 287, h: 325 }, fly: { dx: 470, dy: -80, scale: 1.7 } },

  // Wave 2: three faint photos in the background that come forward.
  {
    id: 'w2-mustard', wave: 2, src: people.mustard, ...float(9, 6.5, -1),
    rest: { x: 70, y: 90, w: 250, h: 283 }, ghost: { x: 254, y: 55, w: 114, h: 129, blur: 0 }, fly: { dx: -430, dy: -90, scale: 1.7 },
  },
  {
    id: 'w2-earrings', wave: 2, src: people.earrings, ...float(8, 7.5, -3),
    rest: { x: 190, y: 430, w: 180, h: 203 }, ghost: { x: 412, y: 509, w: 87, h: 98, blur: 0 }, fly: { dx: -440, dy: 110, scale: 1.7 },
  },
  {
    id: 'w2-grey', wave: 2, src: people.grey, ...float(10, 6, -5),
    rest: { x: 1070, y: 170, w: 260, h: 294 }, ghost: { x: 980, y: 408, w: 116, h: 131, blur: 2 }, fly: { dx: 450, dy: 20, scale: 1.7 },
  },

  // Wave 3: the six small, scattered portraits.
  { id: 'w3-mustard', wave: 3, src: people.mustard, ...float(8, 6, 0), rest: { x: 98, y: 31, w: 144, h: 163 } },
  { id: 'w3-elder', wave: 3, src: people.elder, ...float(10, 7, -2), rest: { x: 1158, y: 0, w: 144, h: 163 } },
  { id: 'w3-earrings', wave: 3, src: people.earrings, ...float(7, 5.5, -4), rest: { x: 1230, y: 257, w: 144, h: 163 } },
  { id: 'w3-tie', wave: 3, src: people.tie, ...float(10, 6, -5), rest: { x: 26, y: 308, w: 144, h: 163 } },
  { id: 'w3-brunette', wave: 3, src: people.brunette, ...float(8, 7.5, -3), rest: { x: 242, y: 497, w: 144, h: 163 } },
  { id: 'w3-grey', wave: 3, src: people.grey, ...float(9, 6.5, -1), rest: { x: 1081, y: 475, w: 144, h: 163 } },
].map((photo) => (photo.wave === 3 ? { ...photo, ghost: backgroundOf(photo.rest) } : photo)) as HeroPhoto[]

type Span = [number, number]

/**
 * Scroll progress (0 to 1) for each stage. Each wave arrives over exactly the stretch of scroll in which the one in
 * front of it leaves, so the photos behind come forward at the same time as the photos in front fly off. Only a short
 * hold in the middle lets wave 2 settle. Wave 3 also creeps forward from the first scroll (`appear` fades it in, and
 * it drifts a little closer) so it is already on its way when its turn comes.
 */
const TIMELINE: Record<Wave, { enter?: Span; exit?: Span; appear?: Span }> = {
  1: { exit: [0.02, 0.44] },
  2: { enter: [0.02, 0.44], exit: [0.56, 0.98] },
  3: { enter: [0.56, 0.98], appear: [0.06, 0.4] },
}

/** Scroll distance the hero stays pinned for, as a share of the viewport height. */
const PIN_DISTANCE_VH = 200
const GHOST_OPACITY = 0.1

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (t: number) => t * t * (3 - 2 * t)
/** Eases movement a little at each end, but keeps most of it steady so the photos keep gliding as you scroll. */
const glide = (t: number) => lerp(t, smooth(t), 0.4)
const within = (p: number, [from, to]: Span) => clamp01((p - from) / (to - from))

interface Pose {
  x: number
  y: number
  scale: number
  opacity: number
  blur: number
  visible: boolean
}

function poseAt(photo: HeroPhoto, p: number): Pose {
  const { enter, exit, appear } = TIMELINE[photo.wave]
  const arrive = enter ? glide(within(p, enter)) : 1
  const leave = exit ? glide(within(p, exit)) : 0
  const present = appear ? smooth(within(p, appear)) : 1

  let x = 0
  let y = 0
  let scale = 1
  let opacity = 1
  let blur = 0

  if (photo.ghost && enter) {
    // Wave 3 starts even further back, and creeps forward before its own turn, so it comes forward gradually.
    const far = photo.wave === 3 ? 1 - glide(within(p, [0, enter[0]])) : 0
    const ghostCenterX = photo.ghost.x + photo.ghost.w / 2
    const ghostCenterY = photo.ghost.y + photo.ghost.h / 2
    const dx = ghostCenterX + (HERO_CENTER.x - ghostCenterX) * 0.3 * far - (photo.rest.x + photo.rest.w / 2)
    const dy = ghostCenterY + (HERO_CENTER.y - ghostCenterY) * 0.3 * far - (photo.rest.y + photo.rest.h / 2)
    x = lerp(dx, 0, arrive)
    y = lerp(dy, 0, arrive)
    scale = lerp((photo.ghost.w / photo.rest.w) * lerp(1, 0.6, far), 1, arrive)
    opacity = lerp(GHOST_OPACITY, 1, smooth(clamp01(arrive / 0.7)))
    blur = lerp(photo.ghost.blur, 0, arrive)
  }
  if (photo.fly) {
    x += photo.fly.dx * leave
    y += photo.fly.dy * leave
    scale *= lerp(1, photo.fly.scale, leave)
    opacity *= leave > 0.8 ? 1 - (leave - 0.8) / 0.2 : 1
  }
  opacity *= present

  return { x, y, scale, opacity, blur, visible: leave < 1 && present > 0 }
}

export interface HeroSceneProps {
  /** The headline, text and button, shown in the middle. */
  children: ReactNode
}

/**
 * The landing hero. On wide screens it pins in place while you scroll through three stages: two large photos, then
 * three photos that come forward from the background as the first two fly off past the edges, then six small
 * portraits that come forward as those fly off in turn. On narrow screens, or with reduced motion, it stays still
 * and shows the first stage.
 */
export function HeroScene({ children }: HeroSceneProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLElement>(null)
  const layers = useRef(new Map<string, HTMLDivElement>())

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1280px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

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

  return (
    <div ref={outerRef} style={{ ['--pin' as string]: `${PIN_DISTANCE_VH}vh` }} className="motion-safe:xl:h-[calc(660px+var(--pin))]">
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
                ...(photo.wave === 3 ? { visibility: 'hidden' as const } : null),
              }}
            >
              <FloatingPortrait
                src={photo.src}
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
