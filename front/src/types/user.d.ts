export interface User {
  id: number
  firstname: string
  lastname: string
  username: string
  email: string
  createdAt: string
  updatedAt: string
  isAdmin: boolean
  token: string
}

export interface AuthContextType {
  user: User | null
  updateUser: (user: User) => void
  logout: () => void
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  firstname: string
  lastname: string
  username: string
}
