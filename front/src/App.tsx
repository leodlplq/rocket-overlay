import { queryClient } from '#/api/queryClient'
import { AuthContext } from '#/context/AuthProvider'
import { RouterProvider } from '@tanstack/react-router'
import { useContext } from 'react'
import { router } from './router'
import { AuthContextType } from './types/user'

export default function App() {
  const authContext = useContext(AuthContext) as AuthContextType
  return (
    <RouterProvider router={router} context={{ ...authContext, queryClient }} />
  )
}
