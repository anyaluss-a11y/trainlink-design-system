import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ButtonLink } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { AuthActions, AuthLayout } from '../../layouts/AuthLayout'

/** Step 1: ask for the account email. */
export function ResetPasswordRequest() {
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <form
        className="flex flex-col gap-10"
        onSubmit={(event) => {
          event.preventDefault()
          navigate('/reset-password/sent')
        }}
      >
        <h1 className="type-heading-2xl text-text-primary">Reset password</h1>
        <div className="flex flex-col gap-4">
          <h2 className="type-label-lg text-text-primary">What is your email?</h2>
          <Input label="Email address" type="email" name="email" placeholder="email@example.com" autoComplete="email" required />
        </div>
        <AuthActions backHref="#/login" submitLabel="Send reset link" />
      </form>
    </AuthLayout>
  )
}

/** Step 2: tell the user to check their inbox. */
export function ResetPasswordSent() {
  return (
    <AuthLayout>
      <h1 className="type-heading-2xl text-text-primary">Check your email!</h1>
      <p className="type-body-md text-text-primary">
        We’ve sent a link to reset your password. Please follow the instructions in the email to complete the process.
      </p>
      <div className="flex flex-wrap items-center gap-6">
        <ButtonLink variant="link" href="#/login" iconLeft={<ArrowLeft className="size-5" aria-hidden />}>
          Back to log in
        </ButtonLink>
        <ButtonLink variant="link" href="#/reset-password/new">
          I have the link
        </ButtonLink>
      </div>
    </AuthLayout>
  )
}

/** Step 3: choose a new password. */
export function ResetPasswordNew() {
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <form
        className="flex flex-col gap-10"
        onSubmit={(event) => {
          event.preventDefault()
          navigate('/login')
        }}
      >
        <h1 className="type-heading-2xl text-text-primary">Reset password</h1>
        <div className="flex flex-col gap-6">
          <p className="type-body-md text-text-primary">
            Enter your new password below to finish resetting your account. Once saved, you’ll be able to log in with
            your updated password.
          </p>
          <div className="flex flex-col gap-4">
            <Input label="New password" type="password" name="password" placeholder="New password" autoComplete="new-password" minLength={8} required />
            <Input label="Confirm new password" type="password" name="confirm" placeholder="Repeat the password" autoComplete="new-password" minLength={8} required />
          </div>
        </div>
        <AuthActions backHref="#/reset-password/sent" submitLabel="Save password" />
      </form>
    </AuthLayout>
  )
}
