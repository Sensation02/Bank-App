import Button from '../button/button'
import { Link } from 'react-router-dom'
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import { IconButton, InputAdornment, Stack } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  validateEmail,
  validatePassword,
  validateToken,
} from '../../utils/validate'
import { useState } from 'react'

interface IFormInput {
  email: string
  password: string
  code: string
}
interface IFormProps {
  isSignup?: boolean
  isSignin?: boolean
  isToken?: boolean
}

const SignupForm: React.FC<IFormProps> = ({ isSignup, isSignin, isToken }) => {
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
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // TODO: send data to server
    console.log(data)
    setError('User is already exist')
  }

  return (
    <>
      <form action='POST' className='form' onSubmit={handleSubmit(onSubmit)}>
        {isSignup || isSignin ? (
          <>
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
                    autoComplete='off'
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                    inputProps={{ inputProps: { noValidate: 'noValidate' } }}
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
          </>
        ) : isToken ? (
          <>
            <Controller
              control={control}
              name='code'
              rules={validateToken}
              render={({ field }) => {
                return (
                  <TextField
                    id='outlined-helperText'
                    label='Code'
                    size='medium'
                    type='text'
                    fullWidth
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    error={!!errors.code?.message}
                    helperText={errors.code?.message}
                    placeholder='Enter your code'
                    autoFocus
                  />
                )
              }}
            />
          </>
        ) : null}
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
