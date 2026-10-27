import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { LogIn } from './auth/LogIn'
import { ResetPasswordNew, ResetPasswordRequest, ResetPasswordSent } from './auth/ResetPassword'
import { SignUp } from './auth/SignUp'
import { SignUpStart } from './auth/SignUpStart'
import { VerifyEmail } from './auth/VerifyEmail'
import { Landing } from './Landing'

const inRouter =
  (path: string): Decorator =>
  (Story) => (
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  )

const meta = {
  title: 'Pages/TrainLink',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const LandingPage: Story = { render: () => <Landing /> }
export const SignUpRole: Story = { render: () => <SignUpStart />, decorators: [inRouter('/signup')] }
export const SignUpForm: Story = { render: () => <SignUp />, decorators: [inRouter('/signup/facilitator')] }
export const LogInPage: Story = { render: () => <LogIn />, decorators: [inRouter('/login')] }
export const EmailConfirmation: Story = { render: () => <VerifyEmail />, decorators: [inRouter('/verify-email')] }
export const PasswordResetEmail: Story = { render: () => <ResetPasswordRequest />, decorators: [inRouter('/reset-password')] }
export const PasswordResetSent: Story = { render: () => <ResetPasswordSent />, decorators: [inRouter('/reset-password/sent')] }
export const PasswordResetNew: Story = { render: () => <ResetPasswordNew />, decorators: [inRouter('/reset-password/new')] }
