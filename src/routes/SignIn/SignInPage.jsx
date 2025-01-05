import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import './signinpage.css'

const SignInPage = () => {
  return (
    <div className='signinpage'>
      <SignIn path='"/signin' signUpUrl='/signup'/>
    </div>
  )
}

export default SignInPage