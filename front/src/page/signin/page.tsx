import Navigation from '../../component/navigation/navigation'
import Title from '../../component/title/title'
import { Link, useNavigate } from 'react-router-dom'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import { useState } from 'react'
import { validateEmail, validatePassword } from '../../utils/validate'
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Button from '../../component/button/button'
import axios from 'axios'
import './style.scss'
import { AuthContext } from '../../component/requireAuth/requireAuth'
import React from 'react'
interface IFormInput {
  email: string
  password: string
}

const Signin: React.FC = () => {
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

  // for context
  const auth = React.useContext(AuthContext)

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
        'http://localhost:4000/auth',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )

      // for debug
      console.log(response?.data?.accessToken)

      // checking response and set error if it is
      if (!response) {
        setError('No server response')
      } else if (response?.status === 400) {
        setError('Wrong email or password')
      } else if (response?.status === 401) {
        setError('Unauthorized')
      } else if (!response?.data?.accessToken) {
        setError('Login Failed')
      }

      // set auth data to context
      if (response?.data?.accessToken) {
        auth?.login(true)
        navigation('/balance')
      }
    } catch (error: any) {
      if (!error?.response) {
        setError('Something went wrong on server side')
      } else if (error.response?.status === 409) {
        setError('User is already exist')
      }
    }
  }
  return (
    <section className='signin'>
      <Navigation handleClick={handleBack} />
      <Title title='Sign in' subtitle='Welcome back!' isBlack />
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
        <>
          <span className='form__message'>
            Forgot password? <Link to={'/recovery'}>Recover</Link>
          </span>
          <Button isMain type='submit' text='Sign In'></Button>
          {error && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant='outlined' severity='error'>
                {error}
              </Alert>
            </Stack>
          )}
        </>
      </form>
    </section>
  )
}

export default Signin
