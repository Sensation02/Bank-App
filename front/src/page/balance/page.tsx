import Navigation from '../../component/navigation/navigation'
import Title from '../../component/title/title'
import receiveIcon from '../../assets/icons/arrow-down.svg'
import sendIcon from '../../assets/icons/send.svg'
import coinbaseIcon from '../../assets/icons/bank-1.svg'
import SignupSteps from '../../utils/navRoutes'
import BackgroundImage from '../../assets/images/background-2.png'
import { useNavigate } from 'react-router-dom'
import './style.scss'

type Props = {
  isLoggedIn: boolean | null
}

const BalancePage: React.FC = () => {
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
          <Title title='100.00 $' />
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
        <ul className='transactions'>
          {/* TODO: Transaction component with :transactionid */}
          <li className='transactions__item'>
            <div className='item__description'>
              <div className='description__icon'>
                <img src={coinbaseIcon} alt='coinbase' />
              </div>

              <div className='description__text'>
                <h6 className='description__name'>Coinbase</h6>
                <div className='description__info'>
                  <span className='info__date'>12:22</span>
                  <span className='info__type'>Receive</span>
                </div>
              </div>
            </div>

            <span className='item__amount'>+125.00$</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default BalancePage
