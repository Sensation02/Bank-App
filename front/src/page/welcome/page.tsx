import React from 'react'
import './style.scss'
import Title from '../../component/title/title'
import image from '../../assets/images/background-1.png'
import bank from '../../assets/images/bank.png'
import Button from '../../component/button/button'
import { useNavigate } from 'react-router-dom'

// метод який буде перенаправляти на сторінку реєстрації:

const Welcome: React.FC = () => {
  const navigate = useNavigate()
  const handleClickSignUp = () => {
    navigate('/signup')
  }
  const handleClickSignIn = () => {
    navigate('/signin')
  }
  return (
    <section className='welcome'>
      <img src={image} alt='background-gradient-img' className='img' />
      <div className='welcome__content'>
        <Title title='Hello!' subtitle='Welcome to bank app' />
        <div className='img__container'>
          <img src={bank} alt='' className='bank__img' />
        </div>
        <div className='buttons'>
          <Button
            onClick={() => handleClickSignUp()}
            type='submit'
            disabled={false}
            text='Sign up'
            isMain={true}
          />
          <Button
            onClick={() => handleClickSignIn()}
            type='submit'
            disabled={false}
            text='Log in'
            isMain={false}
          />
        </div>
      </div>
    </section>
  )
}

export default Welcome
