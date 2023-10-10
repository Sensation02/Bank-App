import './style.scss'
import Navigation from '../../component/navigation/navigation'
import Title from '../../component/title/title'
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
        <Button text='Send' isMain />
      </div>
    </section>
  )
}

export default Recovery
