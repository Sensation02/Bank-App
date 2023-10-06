import './style.scss'
import React, { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../../component/title/title'
import Button from '../../component/button/button'
import Navigation from '../../component/navigation/navigation'
import Field from '../../component/field/field'
import icon from '../../assets/icons/warning.svg'
import { Link } from 'react-router-dom'
import { SignupSteps } from '../../utils/navRoutes'
// import { isExistClass } from '../../utils/validate'

const Signup: React.FC = () => {
  const navigation = useNavigate()
  const handleBack = () => {
    navigation(SignupSteps.Index)
  }

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  return (
    <section className='signup'>
      <Navigation handleClick={handleBack} />
      <Title title='Sign up' subtitle='Create your account' isBlack />
      <form action='POST' className='form'>
        <Field title='Email' type='email' placeholder='example123@mail.com' />
        <Field
          title='Password'
          type='password'
          placeholder='your password here'
        />
        <p className='form__message'>
          Already have an account? <Link to={'/signin'}>Sing In</Link>
        </p>
        <Button
          isMain={true}
          type='submit'
          text='Sign Up'
          // onClick={handleSignup}
          // disabled={emailError && passwordError}
        />
        <span className='alert alert--disabled'>
          <img src={icon} alt='danger_icon' className='icon' />
        </span>
      </form>
    </section>
  )
}

export default Signup
