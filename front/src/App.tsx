import React, { useState } from 'react'
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
import './style/global.scss'
import PrivateRoute, { AuthContext } from './component/requireAuth/requireAuth'

const Error: React.FC = () => {
  return <h1>Not found</h1>
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
                path='/transactions/:transactionsId'
                element={
                  <PrivateRoute>
                    <h1>Transactions</h1>
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
