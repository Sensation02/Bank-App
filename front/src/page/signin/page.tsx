import './style.scss'
import Navigation from '../../component/navigation/navigation'
import Title from '../../component/title/title'
import Button from '../../component/button/button'
import Field from '../../component/field/field'
import { Link, useNavigate } from 'react-router-dom'

const Signin: React.FC = () => {
  const navigation = useNavigate()
  const handleBack = () => {
    navigation('/')
  }
  return (
    <section className='signin'>
      <Navigation handleClick={handleBack} />
      <Title title='Sign in' subtitle='Welcome back!' isBlack />
      <form action='POST' className='form'>
        {/* <Field title='Email' type='email' placeholder='example123@mail.com' />
        <Field
          title='Password'
          type='password'
          placeholder='your password here'
        /> */}
        <p className='form__message'>
          Forgot your password?
          <Link to={'/recovery'} className='form__link'>
            Recover
          </Link>
        </p>
        <Button text='Sign in' isMain />
      </form>
    </section>
  )
}

export default Signin
