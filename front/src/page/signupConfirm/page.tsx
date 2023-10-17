import './style.scss'
import Title from '../../component/title/title'
import Button from '../../component/button/button'
import Navigation from '../../component/navigation/navigation'
import { SignupSteps } from '../../utils/navRoutes'
import { useNavigate } from 'react-router-dom'

const SignupConfirm: React.FC = () => {
  const navigation = useNavigate()
  const handleNavigation = () => {
    navigation(SignupSteps.Signup)
  }

  return (
    <section className='signup-confirm'>
      <Navigation handleClick={handleNavigation} />
      <Title
        title='Confirm account'
        subtitle='Write the code you received'
        isBlack
      />
      <Button text='Confirm' isMain />
    </section>
  )
}

export default SignupConfirm
