import './style.scss'
import Navigation from '../../component/navigation/navigation'
import Title from '../../component/title/title'
import { useNavigate } from 'react-router-dom'
import Form from '../../component/form/form'

const Signin: React.FC = () => {
  const navigation = useNavigate()
  const handleBack = () => {
    navigation('/')
  }
  return (
    <section className='signin'>
      <Navigation handleClick={handleBack} />
      <Title title='Sign in' subtitle='Welcome back!' isBlack />
      <Form isSignin />
    </section>
  )
}

export default Signin
