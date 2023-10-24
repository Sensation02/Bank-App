import Navigation from '../../component/navigation/navigation'
import Page from '../../component/page/page'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm, useFormState } from 'react-hook-form'
import { validateAmount, validateEmail } from '../../utils/validate'
import { TextField } from '@mui/material'
import Button from '../../component/button/button'
import './style.scss'

type FormInputs = {
  email: string
  money: string
}

const Send: React.FC = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/balance')
  }

  const { control } = useForm<FormInputs>()
  const { errors } = useFormState({ control })

  return (
    <Page>
      <Navigation title='Send' handleClick={handleBack} />
      <form className='form'>
        <Controller
          control={control}
          name='email'
          rules={validateEmail}
          render={({ field }) => {
            return (
              <TextField
                id='outlined-helperText'
                label='Email'
                type='email'
                size='medium'
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                variant='outlined'
                fullWidth
                {...field}
              />
            )
          }}
        />
        <Controller
          control={control}
          name='money'
          rules={validateAmount}
          render={({ field }) => {
            return (
              <TextField
                id='outlined-helperText'
                label='Sum'
                type='text'
                size='medium'
                error={!!errors.money?.message}
                helperText={errors.money?.message}
                variant='outlined'
                fullWidth
                {...field}
              />
            )
          }}
        />
        <Button isMain text='Send' type='submit' />
      </form>
    </Page>
  )
}

export default Send
