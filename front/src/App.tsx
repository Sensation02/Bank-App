import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
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
import PrivateRoute, { AuthContext } from './component/requireAuth/requireAuth'
import Transaction from './page/transaction/page'
import Page from './component/page/page'
import Title from './component/title/title'
import './style/global.scss'
import Navigation from './component/navigation/navigation'

const Error: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Page>
      <Navigation
        handleClick={() => {
          navigate('/')
        }}
        title='Navigate to Welcome page'
      />
      <br />
      <br />
      <Title title='404' subtitle='Page not found' isBlack />
    </Page>
  )
}

function App() {
  const [isLogged, login] = useState(false)
  return (
    <main className='app'>
      <section className='app__container'>
        <AuthContext.Provider value={{ isLogged, login }}>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route index element={<Welcome />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/signup-confirm' element={<SignupConfirm />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='/recovery' element={<Recovery />} />
              <Route path='/recovery-confirm' element={<RecoveryConfirm />} />

              {/* Privet routes */}
              <Route
                path='/balance'
                element={
                  <PrivateRoute>
                    <Balance />
                  </PrivateRoute>
                }
              />
              <Route
                path='/notifications'
                element={
                  <PrivateRoute>
                    <Notifications />
                  </PrivateRoute>
                }
              />
              <Route
                path='/settings'
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path='/receive'
                element={
                  <PrivateRoute>
                    <Receive />
                  </PrivateRoute>
                }
              />
              <Route
                path='/send'
                element={
                  <PrivateRoute>
                    <Send />
                  </PrivateRoute>
                }
              />
              <Route
                path='/balance/:transactionId'
                element={
                  <PrivateRoute>
                    <Transaction />
                  </PrivateRoute>
                }
              />

              {/* Error - catch all */}
              <Route path='*' element={<Error />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </section>
    </main>
  )
}

export default App
