import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { OptionCard } from '../../components/ui/OptionCard'
import { AuthLayout, AuthPrompt } from '../../layouts/AuthLayout'

type Role = 'facilitator' | 'client'

export function SignUpStart() {
  const [role, setRole] = useState<Role>('facilitator')
  const navigate = useNavigate()
  return (
    <AuthLayout prompt={<AuthPrompt text="Already have an account?" actionLabel="Sign in" href="#/login" />}>
      <div className="flex flex-col gap-4">
        <h1 id="role-heading" className="type-label-lg text-text-primary">
          What brings you to the community?
        </h1>
        <div role="radiogroup" aria-labelledby="role-heading" className="flex flex-col gap-4">
          <OptionCard
            lead="I’m a "
            title="Facilitator"
            description="I offer training services and want to get hired for workshops, courses, or consulting"
            selected={role === 'facilitator'}
            onClick={() => setRole('facilitator')}
          />
          <OptionCard
            lead="I’m a "
            title="Client"
            description="I want to post training needs and find facilitators who can deliver the programmes we require"
            selected={role === 'client'}
            onClick={() => setRole('client')}
          />
        </div>
      </div>
      <Button
        size="lg"
        className="w-full sm:w-70"
        iconRight={<ArrowRight className="size-5" aria-hidden />}
        onClick={() => navigate(`/signup/${role}`)}
      >
        Next
      </Button>
    </AuthLayout>
  )
}
