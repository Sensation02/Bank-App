import { createContext, useState } from 'react'

// type for props
type Props = {
  children: React.ReactNode
}
// type for context
type AuthContextType = {
  auth: any
  setAuth: React.Dispatch<React.SetStateAction<any>>
}

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
})

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(null)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
