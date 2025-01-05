import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import "./signup.css"

const SignUpPages = () => {
  return (
    <div className='signuppage'>
      <SignUp path="/signup" signInUrl='/signin'/>
    </div>
  )
}

export default SignUpPages