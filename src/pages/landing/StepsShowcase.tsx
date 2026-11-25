import { useEffect, useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { StepItem } from '../../components/ui/StepItem'
import { usePinnedProgress } from '../../hooks/usePinnedProgress'
import { cn } from '../../lib/cn'

/** Scroll distance per step while the section is pinned, as a share of the viewport height. */
const VH_PER_STEP = 70
/**
 * Height of the section on wide screens: the viewport minus the 20px page gutter above and below, so the pinned
 * section fills the screen exactly. It never gets shorter than the steps need.
 */
const SECTION_HEIGHT = 'max(40rem, calc(100svh - 40px))'

export interface StepsShowcaseProps {
  id?: string
  title: ReactNode
  description: string
  steps: string[]
  /** One image per step, each as a component that fills its box. The one for the current step fades in over the others. */
  images: ComponentType[]
}

/**
 * Steps beside a large picture. On wide screens the section is as tall as the viewport and pins while you scroll: each step lights up in turn and
 * one picture dissolves into the next. On narrow screens, or with reduced motion, nothing is pinned, no step is dimmed,
 * and the first picture is shown.
 */
export function StepsShowcase({ id, title, description, steps, images }: StepsShowcaseProps) {
  const [active, setActive] = useState<number | null>(null)
  const { outerRef, innerRef } = usePinnedProgress((progress, pinned) => {
    const next = pinned ? Math.min(steps.length - 1, Math.floor(progress * steps.length)) : null
    setActive((current) => (current === next ? current : next))
  })
  const shown = active ?? 0
  const isPinned = active !== null

  // While pinned, let scrolling settle gently on each step. "proximity" only catches you when you stop close to one.
  useEffect(() => {
    if (!isPinned) return
    const root = document.documentElement
    const previous = root.style.scrollSnapType
    root.style.scrollSnapType = 'y proximity'
    return () => {
      root.style.scrollSnapType = previous
    }
  }, [isPinned])

  return (
    <div
      ref={outerRef}
      id={id}
      style={{ ['--pin' as string]: `${steps.length * VH_PER_STEP}vh`, ['--section' as string]: SECTION_HEIGHT }}
      className="relative motion-safe:xl:h-[calc(var(--section)+var(--pin))]"
    >
      {isPinned &&
        steps.map((step, index) => (
          // Invisible resting points, one in the middle of each step's stretch of scroll.
          <span
            key={step}
            aria-hidden
            className="pointer-events-none absolute left-0 size-px snap-start scroll-mt-5"
            style={{ top: `${(index + 0.5) * VH_PER_STEP}vh` }}
          />
        ))}
      <section
        ref={innerRef}
        className="flex flex-col gap-15 rounded-sm bg-bg-subtle p-7.5 lg:flex-row lg:p-15 xl:h-(--section) motion-safe:xl:sticky motion-safe:xl:top-5"
      >
        <div aria-hidden className="relative h-100 w-full shrink-0 overflow-hidden rounded-sm lg:h-auto lg:w-[min(31.5625rem,40%)]">
          {images.map((Image, index) => (
            <div
              key={index}
              className={cn(
                // Earlier pictures stay solid underneath, so the next one dissolves over them with no dip to the background.
                'absolute inset-0 transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none',
                index <= shown ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Image />
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="type-display-cta text-text-primary max-sm:text-[32px]!">{title}</h2>
            <p className="type-body-md max-w-137.5 text-gray-600">{description}</p>
          </div>
          <ol className="flex list-none flex-col gap-5">
            {steps.map((step, index) => (
              <StepItem key={step} step={index + 1} active={active === index} dimmed={active !== null && active !== index}>
                {step}
              </StepItem>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
