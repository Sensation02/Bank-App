import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Title from '../../component/title/title'
import Navigation from '../../component/navigation/navigation'
import './style.scss'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import axios from 'axios'
import SignupSteps from '../../utils/navRoutes'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'
import { validateEmail, validatePassword } from '../../utils/validate'
import Button from '../../component/button/button'

interface IFormInput {
  email: string
  password: string
}

const Signup: React.FC = () => {
  // redirecting
  const navigation = useNavigate()
  const handleBack = () => {
    navigation('/')
  }

  // show password
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  // context

  // error message
  const [error, setError] = useState<string | null>('')

  // submit handler
  const { handleSubmit, control } = useForm<IFormInput>()
  const { errors } = useFormState({ control })
  const onSubmit: SubmitHandler<IFormInput> = async (data, event) => {
    event?.preventDefault()

    const { email, password } = data

    try {
      const response = await axios.post(
        'http://localhost:4000/register',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )

      // console.log for debug
      console.log(response.data)
      console.log(JSON.stringify(response))

      if (!response) {
        setError('No server response')
      } else if (response?.status === 400) {
        setError('Wrong email or password')
      } else if (response?.status === 401) {
        setError('Unauthorized')
      } else {
        setError('Login Failed')
      }

      // redirecting to confirm page
      navigation(SignupSteps.SignupConfirm)
    } catch (error: any) {
      if (!error?.response) {
        setError('Something went wrong on server side')
      } else if (error.response?.status === 409) {
        setError('User is already exist')
      } else {
        setError('Registration Failed')
      }
    }
  }

  return (
    <section className='signup'>
      <Navigation handleClick={handleBack} />
      <Title title='Sign up' subtitle='Create your account' isBlack />
      {/* <Form isSignup /> */}
      <form action='POST' className='form' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='email'
          rules={validateEmail}
          render={({ field }) => {
            return (
              <TextField
                id='outlined-helperText'
                label='Email'
                size='medium'
                type='email'
                fullWidth
                onChange={(e) => field.onChange(e)}
                value={field.value}
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                placeholder='Enter your email'
                autoFocus
              />
            )
          }}
        />
        <Controller
          control={control}
          name='password'
          rules={validatePassword}
          render={({ field }) => {
            return (
              <TextField
                id='outlined-helperText'
                label='Password'
                size='medium'
                type={showPassword ? 'text' : 'password'}
                fullWidth
                onChange={(e) => field.onChange(e)}
                value={field.value}
                autoComplete='off'
                error={!!errors.password?.message}
                helperText={errors.password?.message}
                placeholder='Enter your password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )
          }}
        />
        <span className='form__message'>
          Already have an account? <Link to={'/signin'}>Sing In</Link>
        </span>
        <Button isMain type='submit' text='Sign Up' />
        {error && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant='outlined' severity='error'>
              {error}
            </Alert>
          </Stack>
        )}
      </form>
    </section>
  )
}

export default Signup
