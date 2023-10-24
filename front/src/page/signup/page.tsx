import React from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../../component/title/title'
import Navigation from '../../component/navigation/navigation'
import Form from '../../component/form/form'
import './style.scss'

const Signup: React.FC = () => {
  const navigation = useNavigate()
  const handleBack = () => {
    navigation('/')
  }

  return (
    <section className='signup'>
      <Navigation handleClick={handleBack} />
      <Title title='Sign up' subtitle='Create your account' isBlack />
      <Form isSignup />
    </section>
  )
}

export default Signup
