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

const EMAIL_REGEX = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)

enum ErrorType {
  INCORRECT = 'incorrect email',
  PASSWORD_SIMPLE = 'password is too simple, try again',
  PASSWORD_SHORT = 'password must be at least 8 characters long',
  CONTAIN_BIG = 'password must contain at least one uppercase letter',
  CONTAIN_SPECIAL = 'password must contain at least one special character',
  CONTAIN_NUMBER = 'password must contain at least one number',
  IS_EMPTY = 'field is empty',
  IS_SHORT = 'email is too short',
}

enum FieldTypes {
  Email = 'email',
  Password = 'password',
  Text = 'text',
}

const Signup: React.FC = () => {
  const navigation = useNavigate()
  const handleBack = () => {
    navigation(SignupSteps.Index)
  }

  const typeEmail = FieldTypes.Email
  const typePassword = FieldTypes.Password

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  // Визначаємо функцію для валідації
  const validate = (value: string) => {
    if (value.length === 0) {
      setErrMsg(ErrorType.IS_EMPTY)
    } else if (typeEmail === 'email') {
      if (value.length < 6) {
        setEmailError(ErrorType.IS_SHORT)
      } else if (!value.match(EMAIL_REGEX)) {
        setEmailError(ErrorType.INCORRECT)
      } else {
        setEmailError('')
      }
    } else if (typePassword === 'password') {
      if (value.length < 8) {
        setPasswordError(ErrorType.PASSWORD_SHORT)
      } else if (!value.match(/[A-Z]/)) {
        setPasswordError(ErrorType.CONTAIN_BIG)
      } else if (!value.match(/[!@#$%]/)) {
        setPasswordError(ErrorType.CONTAIN_SPECIAL)
      } else if (!value.match(/[0-9]/)) {
        setPasswordError(ErrorType.CONTAIN_NUMBER)
      } else {
        setPasswordError('')
      }
    }
  }

  const disabled = () => {
    if (!emailError || !passwordError) {
      return true
    } else {
      return false
    }
  }

  // Визначаємо функцію для зміни значення інпута
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value)
  // }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  }

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  return (
    <section className='signup'>
      <Navigation handleClick={handleBack} />
      <Title title='Sign up' subtitle='Create your account' isBlack />
      <form action='POST' className='form'>
        <Field
          title='Email'
          type={typeEmail}
          placeholder='example123@mail.com'
          value={emailValue}
          onChange={(e) => {
            validate(e.target.value)
            handleEmailChange(e)
          }}
        />
        {emailError && errMsg ? (
          <p className='field__error'>{emailError}</p>
        ) : (
          ''
        )}
        <Field
          title='Password'
          type={typePassword}
          placeholder='your password here'
          value={passwordValue}
          onChange={(e) => {
            validate(e.target.value)
            handlePwdChange(e)
          }}
        />
        {passwordError && errMsg ? (
          <p className='field__error'>{passwordError}</p>
        ) : (
          ''
        )}
        <p className='form__message'>
          Already have an account? <Link to={'/signin'}>Sing In</Link>
        </p>
        <Button
          isMain={true}
          type='submit'
          text='Sign Up'
          // onClick={handleSignup}
          disabled={disabled()}
        />
        <span className='alert alert--disabled'>
          <img src={icon} alt='danger_icon' className='icon' />
        </span>
      </form>
    </section>
  )
}

export default Signup
