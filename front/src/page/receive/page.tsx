import { Controller, useForm, useFormState } from 'react-hook-form'
import Navigation from '../../component/navigation/navigation'
import Page from '../../component/page/page'
import {
  Avatar,
  IconButton,
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
import './style.scss'

type FormInputs = {
  money: string
}

const Receive = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/balance')
  }

  const { control } = useForm<FormInputs>()
  const { errors } = useFormState({ control })

  // TODO: get payment systems from backend
  const getPaymentSystems = () => {
    axios
      .get('/payment')
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  // TODO: Receive money from payment system (backend)

  return (
    <Page>
      <Navigation title='Receive' handleClick={handleBack} />
      <Title subtitle='Receive amount' isBlack />
      {/* TODO: Receive money from payment system (backend)  */}
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
      <Divider sx={{ border: '1px solid lightgray', width: '100%' }} />
      <div className='list'>
        <Title subtitle='Payment System' isBlack />
        <List
          dense
          sx={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}
        >
          {/* // TODO: get payment systems from backend, use map */}
          <ListItem
            secondaryAction={
              <IconButton edge='end' aria-label='delete'>
                <img src={bank_2} alt='' />
              </IconButton>
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
              <IconButton edge='end' aria-label='delete'>
                <img src={bank_1} alt='' />
              </IconButton>
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
    </Page>
  )
}

export default Receive
