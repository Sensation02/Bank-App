import Navigation from '../../component/navigation/navigation'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Stack from '@mui/material/Stack'
import SignupSteps from '../../utils/navRoutes'
import { useNavigate } from 'react-router-dom'
import './style.scss'
import Page from '../../component/page/page'

const Notifications = () => {
  const navigation = useNavigate()
  const handleBack = () => {
    navigation(SignupSteps.Balance)
  }
  return (
    <Page>
      <Navigation title='Notifications' handleClick={handleBack} />
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity='error'>
          <AlertTitle>New Login</AlertTitle>
          <span className='alert__text'> 10 min ago </span>
          <span className='alert__type'>Warning</span>
        </Alert>
        <Alert severity='info'>
          <AlertTitle>New reward system</AlertTitle>
          <span className='alert__text'> 21 min ago </span>
          <span className='alert__type'>Announcement</span>
        </Alert>
      </Stack>
    </Page>
  )
}

export default Notifications
