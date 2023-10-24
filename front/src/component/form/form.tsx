import Button from '../button/button'
import { Link, useNavigate } from 'react-router-dom'
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from 'react-hook-form'
import {
  IconButton,
  InputAdornment,
  Stack,
  Alert,
  TextField,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { validateEmail, validatePassword } from '../../utils/validate'
import { useState, useContext } from 'react'
import axios from '../../api/axios'
import SignupSteps from '../../utils/navRoutes'
import { AuthContext } from '../../context/AuthProvider'

enum URL {
  REGISTRATION = '/register',
  LOGIN = '/auth',
}

interface IFormInput {
  email: string
  password: string
}
interface IFormProps {
  isSignup?: boolean
  isSignin?: boolean
}

const SignupForm: React.FC<IFormProps> = ({ isSignup, isSignin }) => {
  const navigation = useNavigate()

  // show password
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  // error: user is already exist
  const [error, setError] = useState<string | null>('')

  // context
  const { auth, setAuth } = useContext(AuthContext)

  // submit handler
  const { handleSubmit, control } = useForm<IFormInput>()
  const { errors } = useFormState({ control })
  const onSubmit: SubmitHandler<IFormInput> = async (data, event) => {
    event?.preventDefault()

    try {
      let response

      if (isSignup) {
        // send data to server: signup
        response = await axios.post(
          URL.REGISTRATION,
          { email: data.email, password: data.password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        )

        // console.log for debug
        console.log(response.data)
        console.log(response.data.accessToken)
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
      }

      if (isSignin) {
        response = await axios.post(
          URL.LOGIN,
          { email: data.email, password: data.password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        )

        // for debug
        console.log(response?.data)

        // set auth data to context
        const accessToken = response?.data?.accessToken
        const email = response?.data?.email
        const password = response?.data?.password
        setAuth({ email, password, accessToken })

        // checking response and set error if it is
        if (!response) {
          setError('No server response')
        } else if (response?.status === 400) {
          setError('Wrong email or password')
        } else if (response?.status === 401) {
          setError('Unauthorized')
        } else {
          setError('Login Failed')
        }

        // redirecting to balance page
        navigation(SignupSteps.Balance)
      }
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
    <>
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
        {isSignup && (
          <>
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
          </>
        )}
        {isSignin && (
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
        )}
      </form>
    </>
  )
}

export default SignupForm
