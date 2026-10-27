import { Route, Routes } from 'react-router-dom'
import { LogIn } from './pages/auth/LogIn'
import { ResetPasswordNew, ResetPasswordRequest, ResetPasswordSent } from './pages/auth/ResetPassword'
import { SignUp } from './pages/auth/SignUp'
import { SignUpStart } from './pages/auth/SignUpStart'
import { VerifyEmail } from './pages/auth/VerifyEmail'
import { Landing } from './pages/Landing'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUpStart />} />
      <Route path="/signup/:role" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPasswordRequest />} />
      <Route path="/reset-password/sent" element={<ResetPasswordSent />} />
      <Route path="/reset-password/new" element={<ResetPasswordNew />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
