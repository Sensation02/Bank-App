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
import { useState } from 'react'
import axios from '../../api/axios'
import { SignupSteps } from '../../utils/navRoutes'

enum URLs {
  signup = '/register',
  signin = '/auth',
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

  // submit handler
  const { handleSubmit, control } = useForm<IFormInput>()
  const { errors } = useFormState({ control })
  const onSubmit: SubmitHandler<IFormInput> = async (data, event) => {
    // TODO: send data to server
    event?.preventDefault()

    try {
      let response

      if (isSignup) {
        // send data to server: signup
        response = await axios.post(
          URLs.signup,
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

        // if we get response from server - set error to null, else - set error
        response.data.accessToken
          ? setError(null)
          : setError('User is already exist')

        // redirecting to confirm page
        navigation(SignupSteps.SignupConfirm)
      }

      if (isSignin) {
        response = await axios.post(
          URLs.signin,
          { email: data.email, password: data.password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        )

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
          </>
        )}
      </form>
    </>
  )
}

export default SignupForm
