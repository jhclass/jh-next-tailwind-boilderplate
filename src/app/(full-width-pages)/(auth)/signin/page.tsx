import SignInForm from '@/components/auth/SignInForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'D365 | Login',
  description: '',
}

export default function SignIn() {
  return <SignInForm />
}
