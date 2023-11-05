import './style.scss'
import Navigation from '../../component/navigation/navigation'
import Title from '../../component/title/title'
import Button from '../../component/button/button'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import { validatePassword } from '../../utils/validate'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import axios from '../../api/axios'
import { ApiURL } from '../../utils/navRoutes'
import { useNavigate } from 'react-router-dom'

type FormInputs = {
  password: string
  oldPassword: string
  newPassword: string
}

const Recovery: React.FC = () => {
  // navigation
  const navigate = useNavigate()
  const handleBack = () => navigate(-1)

  // form
  const { control, handleSubmit } = useForm<FormInputs>()
  const { errors } = useFormState({ control })
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const onSubmitPassword: SubmitHandler<FormInputs> = async (data, event) => {
    event?.preventDefault()

    try {
      const res = await axios.put(`${ApiURL}/users`, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })

      if (res.status === 200) {
        console.log('password changed')
        navigate('/balance')
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data)
      }
    }
  }

  return (
    <section className='recovery'>
      <Navigation handleClick={handleBack} />
      <div className='recovery__container'>
        <Title
          title='Recover password'
          subtitle='Write the code you received by email'
          isBlack
        />
        <form
          action='POST'
          className='form'
          onSubmit={handleSubmit(onSubmitPassword)}
        >
          <Controller
            control={control}
            name='oldPassword'
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
            name='newPassword'
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
          <Button text='Restore password' isMain type='submit' />
        </form>
      </div>
    </section>
  )
}

export default Recovery
