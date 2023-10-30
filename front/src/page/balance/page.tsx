import Navigation from '../../component/navigation/navigation'
import Title from '../../component/title/title'
import receiveIcon from '../../assets/icons/arrow-down.svg'
import sendIcon from '../../assets/icons/send.svg'
import coinbaseIcon from '../../assets/icons/bank-1.svg'
import userIcon from '../../assets/icons/user.svg'
import SignupSteps from '../../utils/navRoutes'
import BackgroundImage from '../../assets/images/background-2.png'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Alert, Stack } from '@mui/material'
import { Capitalize } from '../../utils/capitalize'
import './style.scss'

type Transaction = {
  id: number
  date: string
  type: string
  amount: number
  email: string
}

// date in format dd/MM HH:mm
const date = new Date()
const formattedDate = format(date, 'dd/MM HH:mm')

const BalancePage: React.FC = () => {
  // redirecting to other pages
  const navigate = useNavigate()
  const handleSettings = () => {
    navigate(SignupSteps.Settings)
  }
  const handleNotifications = () => {
    navigate(SignupSteps.Notifications)
  }
  const handleReceive = () => {
    navigate(SignupSteps.Receive)
  }
  const handleSend = () => {
    navigate(SignupSteps.Send)
  }

  // states for transactions
  const [data, setData] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  // get transactions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        await axios.get('/transactions').then((res) => {
          const data = res.data
          setData(data.transactions)
          setTotal(data.totalAmount)
          setLoading(false)
        })
      } catch (error) {
        setError('Could not get transactions')
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section className='balance__page'>
      <img
        src={BackgroundImage}
        alt='background_image_blue'
        className='background__img'
      />
      <div className='page__content'>
        <Navigation
          title='Main wallet'
          settings
          isWhite
          handleSettings={handleSettings}
          handleNotifications={handleNotifications}
        />
        <header className='balance__heading'>
          <Title title={`${total} $`} />
          <div className='balance__operations'>
            <button className='operations__icon' onClick={handleReceive}>
              <img src={receiveIcon} alt='' className='icon__btn' />
              <span className='icon__name'>Receive</span>
            </button>
            <button className='operations__icon' onClick={handleSend}>
              <img src={sendIcon} alt='' className='icon__btn' />
              <span className='icon__name'>Send</span>
            </button>
          </div>
        </header>
        {loading ? (
          <Stack sx={{ width: '100%', marginTop: '2rem' }} spacing={2}>
            <Alert variant='outlined' severity='info'>
              Loading...
            </Alert>
          </Stack>
        ) : error ? (
          <Stack sx={{ width: '100%', marginTop: '2rem' }} spacing={2}>
            <Alert variant='outlined' severity='error'>
              {error}
            </Alert>
          </Stack>
        ) : data ? (
          <ul className='transactions'>
            {data.map((item) => (
              <li className='transactions__item' key={item.id}>
                <div className='item__description'>
                  <div className='description__icon'>
                    <img src={userIcon} alt='coinbase' />
                  </div>

                  <div className='description__text'>
                    <h6 className='description__name'>{item.email}</h6>
                    <div className='description__info'>
                      <span className='info__date'>{item.date}</span>
                      <span className='info__type'>
                        {Capitalize(item.type)}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`item__amount ${
                    item.type === 'receive' ? 'receive' : 'send'
                  }`}
                >
                  {item.type === 'receive' ? '+' : '-'} {item.amount}$
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export default BalancePage
