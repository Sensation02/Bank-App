import './style.scss'
import Title from '../../component/title/title'
import Button from '../../component/button/button'
import Navigation from '../../component/navigation/navigation'
import SignupSteps from '../../utils/navRoutes'
import { useNavigate } from 'react-router-dom'

const SignupConfirm: React.FC = () => {
  const navigation = useNavigate()
  const handleNavigation = () => {
    navigation(SignupSteps.Signup)
  }

  const handleButton = () => {
    navigation(SignupSteps.Balance)
  }

  return (
    <section className='signup-confirm'>
      <Navigation handleClick={handleNavigation} />
      <Title
        title='You are all set!'
        subtitle="Let's start your journey with us!"
        isBlack
      />
      <Button text="Let's Go" isMain onClick={handleButton} />
    </section>
  )
}

export default SignupConfirm
