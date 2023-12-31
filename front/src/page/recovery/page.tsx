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
import { ApiURL } from '../../utils/navRoutes'

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
    const { email } = data
    try {
      const response = await axios.post(`${ApiURL}/users`, { email: email })

      if (response.status === 404) {
        setError(response.data.message)
      } else {
        setError(null)
        navigate('/recovery-confirm')
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message)
      }
    }
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
