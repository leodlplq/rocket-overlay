import { AuthContextType, User } from '#/types/user'
import { redirect } from '@tanstack/react-router'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null') as User
  )

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  const updateUser = (user: User | null) => {
    console.log('update user', user)
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    redirect({
      to: '/login',
    })
  }

  return (
    <AuthContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
