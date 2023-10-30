import Navigation from '../../component/navigation/navigation'
import Title from '../../component/title/title'
import Button from '../../component/button/button'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import { Alert, Stack, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/validate'
import axios from 'axios'
import { useState } from 'react'

import './style.scss'

interface IFormInput {
  email: string
}

const Recovery: React.FC = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }

  const { handleSubmit, control } = useForm<IFormInput>()
  const { errors } = useFormState({ control })
  const [error, setError] = useState<string | null>('')
  const onSubmit: SubmitHandler<IFormInput> = async (data, event) => {
    event?.preventDefault()
    // console.log(data)
    const { email } = data
    try {
      const res = await axios.put(
        'http://localhost:4000/users',
        { email: email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )

      console.log(res.data)

      if (!res) {
        setError('No server response')
      } else if (res?.status === 400) {
        setError('Wrong email or password')
      } else if (res?.status === 401) {
        setError('Unauthorized')
      } else if (!res?.data?.accessToken) {
        setError('Login Failed')
      }
    } catch (error) {}
  }

  return (
    <section className='recovery'>
      <Navigation handleClick={handleBack} />
      <div className='recovery__container'>
        <Title
          title='Password Recovery'
          subtitle='enter your email to recover your password'
          isBlack
        />
        <form action='PUT' className='form' onSubmit={handleSubmit(onSubmit)}>
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
          <Button text='Send' isMain type='submit' />
          {error && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant='outlined' severity='error'>
                {error}
              </Alert>
            </Stack>
          )}
        </form>
      </div>
    </section>
  )
}

export default Recovery
