import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './page/welcome/page'
import Signup from './page/signup/page'
import SignupConfirm from './page/signupConfirm/page'
import Signin from './page/signin/page'
import Recovery from './page/recovery/page'
import RecoveryConfirm from './page/recoveryConfirm/page'
import Balance from './page/balance/page'
import Notifications from './page/notifications/page'
import Settings from './page/settings/page'
import Receive from './page/receive/page'
import Send from './page/send/page'
import { AuthProvider } from './context/AuthProvider'
import './style/global.scss'

const Error: React.FC = () => {
  return <h1>Not found</h1>
}

function App() {
  return (
    <main className='app'>
      <section className='app__container'>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Welcome />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/signup-confirm' element={<SignupConfirm />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='/recovery' element={<Recovery />} />
              <Route path='/recovery-confirm' element={<RecoveryConfirm />} />
              <Route path='/balance' element={<Balance />} />
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/receive' element={<Receive />} />
              <Route path='/send' element={<Send />} />
              <Route
                path='/transactions/:transactionsId'
                element={<h1>Transactions</h1>}
              />
              <Route path='*' element={<Error />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </section>
    </main>
  )
}

export default App
