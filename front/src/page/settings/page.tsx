import Navigation from '../../component/navigation/navigation'
import SignupSteps from '../../utils/navRoutes'
import { validateEmail, validatePassword } from '../../utils/validate'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from 'react-hook-form'
import { TextField, IconButton, InputAdornment, Divider } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Button from '@mui/material/Button'
import ButtonMain from '../../component/button/button'
import './style.scss'
import Page from '../../component/page/page'
import Title from '../../component/title/title'

type FormInputs = {
  email: string
  password: string
  oldPassword: string
}

const Settings = () => {
  const { control, handleSubmit } = useForm<FormInputs>()
  const { errors } = useFormState({ control })
  const onSubmit = (data: FormInputs) => console.log(data)

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/balance')
  }

  return (
    <Page>
      <Navigation title='Settings' handleClick={handleBack} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        action='PUT'
        className='form__settings'
      >
        <Title subtitle='Change Email' isBlack />
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
        <ButtonMain type='submit' text='Change Email' />
      </form>
      <Divider sx={{ border: '1px solid lightgray', width: '100%' }} />
      <form
        action='PUT'
        className='form__settings'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title subtitle='Change Password' isBlack />
        <Controller
          control={control}
          name='password'
          rules={validatePassword}
          render={({ field }) => {
            return (
              <TextField
                id='outlined-helperText'
                label='Old Password'
                size='medium'
                type={showPassword ? 'text' : 'password'}
                fullWidth
                onChange={(e) => field.onChange(e)}
                value={field.value}
                autoComplete='off'
                error={!!errors.password?.message}
                helperText={errors.password?.message}
                placeholder='Enter your old password'
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
        <Controller
          control={control}
          name='password'
          rules={validatePassword}
          render={({ field }) => {
            return (
              <TextField
                id='outlined-helperText'
                label='New Password'
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
        <ButtonMain type='submit' text='Change Password' />
      </form>
      <Divider sx={{ border: '1px solid lightgray', width: '100%' }} />
      <br />
      <Button variant='outlined' color='error' fullWidth size='large'>
        Logout
      </Button>
    </Page>
  )
}

export default Settings
