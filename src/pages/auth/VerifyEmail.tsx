import { useNavigate } from 'react-router-dom'
import { ButtonLink } from '../../components/ui/Button'
import { AuthActions, AuthLayout, AuthPrompt } from '../../layouts/AuthLayout'

export function VerifyEmail() {
  const navigate = useNavigate()
  return (
    <AuthLayout prompt={<AuthPrompt text="Already have an account?" actionLabel="Sign in" href="#/login" />}>
      <h1 className="type-heading-2xl text-text-primary">We’ve sent you an email</h1>
      <div className="flex flex-col gap-10">
        <div className="type-body-md flex flex-col gap-4 text-text-primary">
          <p>
            To keep a trusted and safe community, we’ve sent an email to example@email.com for verification, and you’ll
            only do this once.
          </p>
          <p>Please follow the link in the email and you will be taken to the TrainLink platform</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="type-body-lg flex flex-wrap items-center gap-2 text-text-primary">
            Entered incorrect email?
            <ButtonLink variant="link" href="#/signup">
              Change email address
            </ButtonLink>
          </p>
          <p className="type-body-lg flex flex-wrap items-center gap-2 text-text-primary">
            Did not receive?
            <ButtonLink variant="link" href="#/verify-email">
              Resend link
            </ButtonLink>
          </p>
        </div>
      </div>
      <AuthActions backHref="#/signup" submitLabel="Continue" submitType="button" onSubmit={() => navigate('/')} />
    </AuthLayout>
  )
}
