import type { LoginPayload, RegisterPayload, User } from '#/types/user'
import { makeUrl } from '#utils/url'
import axios from 'axios'

export const login = (payload: LoginPayload): Promise<User> =>
  axios
    .post(makeUrl('login'), payload)
    .then((res) => res.data)
    .catch((error) => {
      throw error?.response?.data.errors
    })

export const register = (payload: RegisterPayload): Promise<User> =>
  axios
    .post(makeUrl('register'), payload)
    .then((res) => res.data)
    .catch((error) => {
      throw error?.response?.data.errors
    })
