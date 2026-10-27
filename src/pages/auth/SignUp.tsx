import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '../../components/ui/Input'
import { AuthActions, AuthLayout, AuthPrompt } from '../../layouts/AuthLayout'

export function SignUp() {
  const { role = 'facilitator' } = useParams()
  const navigate = useNavigate()
  return (
    <AuthLayout prompt={<AuthPrompt text="Already have an account?" actionLabel="Sign in" href="#/login" />}>
      <form
        className="flex flex-col gap-10"
        onSubmit={(event) => {
          event.preventDefault()
          navigate('/verify-email')
        }}
      >
        <div className="flex flex-col gap-4">
          <h1 className="type-label-lg text-text-primary">Sign up as a {role}</h1>
          <div className="flex flex-col gap-4">
            <Input label="Email address" type="email" name="email" placeholder="email@example.com" autoComplete="email" required />
            <Input label="Password" type="password" name="password" placeholder="Create a password" autoComplete="new-password" minLength={8} required />
          </div>
          <p className="type-body-xs leading-5! text-gray-600">
            By signing up I accept{' '}
            <a href="#/" className="underline">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="#/" className="underline">
              Privacy Policy
            </a>
          </p>
        </div>
        <AuthActions backHref="#/signup" submitLabel="Continue" />
      </form>
    </AuthLayout>
  )
}
