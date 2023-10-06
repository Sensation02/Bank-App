import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/global.scss'
import Welcome from './page/welcome/page'
import Signup from './page/signup/page'
import SignupConfirm from './page/signupConfirm/page'
import Signin from './page/signin/page'
import Recovery from './page/recovery/page'
import RecoveryConfirm from './page/recoveryConfirm/page'

// type ContextType = {
//   isLogged : boolean
//   login: (status: boolean) => void
// }

// const AuthContext = React.createContext<ContextType | null>(null)

const Error: React.FC = () => {
  return <h1>Not found</h1>
}

function App() {
  return (
    <main className='app'>
      <section className='app__container'>
        <BrowserRouter>
          <Routes>
            <Route index element={<Welcome />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signup-confirm' element={<SignupConfirm />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/recovery' element={<Recovery />} />
            <Route path='/recovery-confirm' element={<RecoveryConfirm />} />
            <Route path='/balance' element={<h1>Balance</h1>} />
            <Route path='/notifications' element={<h1>Notifications</h1>} />
            <Route path='/settings' element={<h1>Settings</h1>} />
            <Route path='/receive' element={<h1>Receive</h1>} />
            <Route path='/send' element={<h1>Send</h1>} />
            <Route
              path='/transactions/:transactionsId'
              element={<h1>Transactions</h1>}
            />
            <Route path='*' element={<Error />} />
          </Routes>
        </BrowserRouter>
      </section>
    </main>
  )
}

export default App
