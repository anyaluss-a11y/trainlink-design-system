import { useEffect, useRef } from 'react'

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/**
 * Tracks how far you have scrolled through a "pinned" section: a tall outer element holding a sticky inner one.
 * `onProgress` gets 0 when the inner element first sticks and 1 when it lets go, and `pinned` says whether the
 * pinning is switched on at all (it is not on narrow screens or with reduced motion, where progress stays 0).
 */
export function usePinnedProgress(onProgress: (progress: number, pinned: boolean) => void) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLElement>(null)
  const latest = useRef(onProgress)

  useEffect(() => {
    latest.current = onProgress
  })

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1280px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      const outer = outerRef.current
      const inner = innerRef.current
      const pinned = Boolean(outer && inner && wide.matches && !reduced.matches)
      let progress = 0
      if (pinned && outer && inner) {
        const rect = outer.getBoundingClientRect()
        const distance = rect.height - inner.offsetHeight
        const top = parseFloat(getComputedStyle(inner).top) || 0
        progress = distance > 0 ? clamp01((top - rect.top) / distance) : 0
      }
      latest.current(progress, pinned)
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

  return { outerRef, innerRef }
}
