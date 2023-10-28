// import { Outlet } from 'react-router-dom'
import React, { createContext } from 'react'
import { Navigate } from 'react-router-dom'

// type for context
type ContextType = {
  isLogged: boolean
  login: (status: boolean) => void
}
export const AuthContext = createContext<ContextType | null>(null)

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = React.useContext(AuthContext)
  if (!auth?.isLogged) {
    return <Navigate to='/signin' />
  } else {
    return <>{children}</>
  }
}

export default PrivateRoute
