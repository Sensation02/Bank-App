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
          title='Recover password'
          subtitle='Write the code you received by email'
          isBlack
        />
        <Field title='Code' type='text' placeholder='123456' />
        <Field
          title='New password'
          type='password'
          placeholder='your password here'
        />
        <Button text='Restore password' isMain />
      </div>
    </section>
  )
}

export default Recovery
