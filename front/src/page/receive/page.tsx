import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import Navigation from '../../component/navigation/navigation'
import Page from '../../component/page/page'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material'
import { validateAmount } from '../../utils/validate'
import coinbase from '../../assets/icons/bank-1.svg'
import stripe from '../../assets/icons/bank-2.svg'
import bank_1 from '../../assets/images/Frame 537.png'
import bank_2 from '../../assets/images/Frame 539.png'
import Title from '../../component/title/title'
import Divider from '@mui/material/Divider'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
// import { ApiURL } from '../../utils/navRoutes'
import './style.scss'
import { ApiURL } from '../../utils/navRoutes'

type FormInputs = {
  money: string
  type?: string
  email?: string
}

const Receive = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/balance')
  }

  const { handleSubmit, control } = useForm<FormInputs>()
  const { errors } = useFormState({ control })
  const type = 'receive'

  const onSubmitCoinbase: SubmitHandler<FormInputs> = async (data, event) => {
    event?.preventDefault()
    const { money } = data

    try {
      const response = await axios.post(`${ApiURL}/transactions`, {
        amount: money,
        type: type,
        email: 'Coinbase',
      })
      console.log(response)
      if (response.status === 201) {
        navigate('/balance')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmitStripe: SubmitHandler<FormInputs> = async (data, event) => {
    event?.preventDefault()
    const { money } = data

    try {
      const response = await axios.post('http://localhost:4000/transactions/', {
        amount: money,
        type: type,
        email: 'Stripe',
      })
      console.log(response)
      if (response.status === 201) {
        navigate('/balance')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page>
      <Navigation title='Receive' handleClick={handleBack} />
      <Title subtitle='Receive amount' isBlack />
      <form action='POST' className='receive__form'>
        <Controller
          control={control}
          name='money'
          rules={validateAmount}
          render={({ field }) => {
            return (
              <TextField
                id='outlined-helperText'
                label='Enter amount to receive'
                size='medium'
                type='text'
                fullWidth
                onChange={(e) => field.onChange(e)}
                value={field.value}
                error={!!errors.money?.message}
                helperText={errors.money?.message}
              />
            )
          }}
        />
        <Divider
          sx={{
            border: '1px solid lightgray',
            width: '100%',
            margin: '2em 0 1em 0',
          }}
        />
        <div className='list'>
          <Title subtitle='Payment System' isBlack />
          <List
            dense
            sx={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}
          >
            <ListItem
              secondaryAction={
                <button
                  id='1'
                  type='button'
                  onClick={handleSubmit(onSubmitCoinbase)}
                >
                  <img src={bank_2} alt='Coinbase_icon' />
                </button>
              }
              className='list__item'
            >
              <ListItemAvatar>
                <Avatar>
                  <img src={coinbase} alt='' className='icon' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Coinbase'
                primaryTypographyProps={{ variant: 'h6' }}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <button
                  id='2'
                  type='button'
                  onClick={handleSubmit(onSubmitStripe)}
                >
                  <img src={bank_1} alt='Stripe_icon' />
                </button>
              }
              className='list__item'
            >
              <ListItemAvatar>
                <Avatar>
                  <img src={stripe} alt='' className='icon' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Stripe'
                primaryTypographyProps={{ variant: 'h6' }}
              />
            </ListItem>
          </List>
        </div>
      </form>
    </Page>
  )
}

export default Receive
