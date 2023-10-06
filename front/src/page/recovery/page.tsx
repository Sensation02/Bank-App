import './style.scss'
import Navigation from '../../component/navigation/navigation'
import Title from '../../component/title/title'
import Field from '../../component/field/field'
import Button from '../../component/button/button'

const Recovery: React.FC = () => {
  return (
    <section className='recovery'>
      <Navigation />
      <div className='recovery__container'>
        <Title
          title='Password Recovery'
          subtitle='Choose a recovery method'
          isBlack
        />
        <Field title='Email' type='email' placeholder='example123@mail.com' />
        <Button text='Send' isMain />
      </div>
    </section>
  )
}

export default Recovery
