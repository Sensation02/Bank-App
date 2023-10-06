import './style.scss'
import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../../component/title/title'
import Button from '../../component/button/button'
import Navigation from '../../component/navigation/navigation'
import Field from '../../component/field/field'
import icon from '../../assets/icons/warning.svg'
import { Link } from 'react-router-dom'
import { SignupSteps } from '../../utils/navRoutes'
import { useInput, ErrorType } from '../../utils/hooks/useInput'

const EMAIL_REGEX = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)

enum FieldType {
  EMAIL = 'email',
  PASSWORD = 'password',
}

const Signup: React.FC = () => {
  const navigation = useNavigate()
  const handleBack = () => {
    navigation(SignupSteps.Index)
  }

  const emailInput = useInput('')
  const passwordInput = useInput('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    validateInput(emailInput)
    validateInput(passwordInput)
    console.log(emailInput.value, passwordInput.value)
    if (!emailInput.error && !passwordInput.error) {
      navigation(SignupSteps.SignupConfirm)
    }
  }

  const validateInput = (input: {
    value: string
    name?: FieldType
    setError: (errorType: ErrorType) => void
  }) => {
    if (input.value === '') {
      input.setError(ErrorType.IS_EMPTY)
    } else if (input.value.length < 6 && input.name === FieldType.PASSWORD) {
      input.setError(ErrorType.PASSWORD_SHORT)
    } else if (
      !EMAIL_REGEX.test(input.value) &&
      input.name === FieldType.EMAIL
    ) {
      input.setError(ErrorType.INCORRECT)
    } else {
      input.setError(ErrorType.NONE)
    }
  }

  return (
    <section className='signup'>
      <Navigation handleClick={handleBack} />
      <Title title='Sign up' subtitle='Create your account' isBlack />
      <form action='POST' className='form' onSubmit={handleSubmit}>
        <Field
          title='Email'
          type={FieldType.EMAIL}
          placeholder='example123@mail.com'
          name={FieldType.EMAIL}
          id={FieldType.EMAIL}
          {...emailInput}
        />
        <Field
          title='Password'
          type={FieldType.PASSWORD}
          placeholder='your password here'
          name={FieldType.PASSWORD}
          id={FieldType.PASSWORD}
          {...passwordInput}
        />
        <p className='form__message'>
          Already have an account? <Link to={'/signin'}>Sing In</Link>
        </p>
        <Button
          isMain={true}
          type='submit'
          text='Sign Up'
          disabled={emailInput.value && passwordInput.value ? false : true}
        />
        <span className='alert alert--disabled'>
          <img src={icon} alt='danger_icon' className='icon' />
        </span>
      </form>
    </section>
  )
}

export default Signup
