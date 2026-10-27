import { useNavigate } from 'react-router-dom'
import { ButtonLink } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { AuthActions, AuthLayout, AuthPrompt } from '../../layouts/AuthLayout'

export function LogIn() {
  const navigate = useNavigate()
  return (
    <AuthLayout prompt={<AuthPrompt text="Don’t have an account?" actionLabel="Sign up" href="#/signup" />}>
      <form
        className="flex flex-col gap-10"
        onSubmit={(event) => {
          event.preventDefault()
          navigate('/')
        }}
      >
        <div className="flex flex-col gap-4">
          <h1 className="type-label-lg text-text-primary">Log in</h1>
          <div className="flex flex-col gap-4">
            <Input label="Email address" type="email" name="email" placeholder="email@example.com" autoComplete="email" required />
            <Input label="Password" type="password" name="password" placeholder="Your password" autoComplete="current-password" required />
          </div>
          <ButtonLink variant="link" href="#/reset-password" className="w-fit">
            Forgot password?
          </ButtonLink>
        </div>
        <AuthActions backHref="#/" submitLabel="Log in" />
      </form>
    </AuthLayout>
  )
}
