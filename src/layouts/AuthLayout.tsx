import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { BrandPanel } from '../components/ui/BrandPanel'
import { Button, ButtonLink } from '../components/ui/Button'
import { Logo } from '../components/ui/Logo'

export interface AuthPromptProps {
  text: string
  actionLabel: string
  href: string
}

/** The "Already have an account? Sign in" row under the logo. */
export function AuthPrompt({ text, actionLabel, href }: AuthPromptProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="type-body-lg text-text-primary">{text}</p>
      <ButtonLink variant="secondary" href={href}>
        {actionLabel}
      </ButtonLink>
    </div>
  )
}

export interface AuthLayoutProps {
  /** Row under the logo, usually an `<AuthPrompt>`. */
  prompt?: ReactNode
  /** Replaces the brand panel on the left. */
  image?: ReactNode
  children: ReactNode
}

/** Split-screen layout shared by sign up, log in, email verification and password reset. */
export function AuthLayout({ prompt, image, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-bg-default p-5">
      <div className="hidden w-160 shrink-0 lg:block">{image ?? <BrandPanel className="h-full" />}</div>
      <main className="flex min-w-0 flex-1 flex-col gap-22 bg-gray-50 px-6 pt-10 pb-16 sm:px-15 sm:pt-20 sm:pb-25">
        <div className="flex flex-col gap-10">
          <a href="#/" aria-label="TrainLink home" className="w-fit">
            <Logo tone="dark" className="h-11 w-54.75" />
          </a>
          {prompt}
        </div>
        <div className="flex w-full max-w-160 flex-col gap-10">{children}</div>
      </main>
    </div>
  )
}

export interface AuthActionsProps {
  /** Where the Back link goes. Leave out to hide it. */
  backHref?: string
  backLabel?: string
  submitLabel: string
  onSubmit?: () => void
  /** Use `submit` inside a form, `button` otherwise. */
  submitType?: 'submit' | 'button'
}

/** Back link on the left, large primary button on the right. */
export function AuthActions({ backHref, backLabel = 'Back', submitLabel, onSubmit, submitType = 'submit' }: AuthActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {backHref ? (
        <ButtonLink variant="link" href={backHref} iconLeft={<ArrowLeft className="size-5" aria-hidden />}>
          {backLabel}
        </ButtonLink>
      ) : (
        <span />
      )}
      <Button
        type={submitType}
        size="lg"
        className="w-full sm:w-70"
        iconRight={<ArrowRight className="size-5" aria-hidden />}
        onClick={onSubmit}
      >
        {submitLabel}
      </Button>
    </div>
  )
}
