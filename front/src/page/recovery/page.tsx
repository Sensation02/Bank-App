import Navigation from '../../component/navigation/navigation'
import Title from '../../component/title/title'
import Button from '../../component/button/button'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import { TextField } from '@mui/material'

import './style.scss'
import { validateEmail } from '../../utils/validate'
import axios from 'axios'

interface IFormInput {
  email: string
}

const Recovery: React.FC = () => {
  const { handleSubmit, control } = useForm<IFormInput>()
  const { errors } = useFormState({ control })
  const onSubmit: SubmitHandler<IFormInput> = async (data, event) => {
    event?.preventDefault()
    console.log(data)

    try {
      const res = await axios.put('http://localhost:4000/auth/recovery')
    } catch (error) {}
  }

  return (
    <section className='recovery'>
      <Navigation />
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
        </form>
      </div>
    </section>
  )
}

export default Recovery
