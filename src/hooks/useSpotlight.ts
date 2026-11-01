import { useEffect, useState } from 'react'

interface SpotlightOptions {
  /** How long each item stays in the spotlight, including the time it takes to open. */
  visibleMs?: number
  /** Pause between one item leaving and the next appearing. Keep it longer than the closing animation so two are never shown together. */
  gapMs?: number
  /** Wait before the first item appears. */
  startDelayMs?: number
}

/** Cycles through `count` items one at a time. Returns the index in the spotlight, or null during the pause. */
export function useSpotlight(count: number, { visibleMs = 4800, gapMs = 1000, startDelayMs = 900 }: SpotlightOptions = {}) {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (count === 0) return
    let timer = 0
    let next = 0

    const hide = () => {
      setActive(null)
      next = (next + 1) % count
      timer = window.setTimeout(show, gapMs)
    }
    const show = () => {
      setActive(next)
      timer = window.setTimeout(hide, visibleMs)
    }

    timer = window.setTimeout(show, startDelayMs)
    return () => window.clearTimeout(timer)
  }, [count, visibleMs, gapMs, startDelayMs])

  return active
}
