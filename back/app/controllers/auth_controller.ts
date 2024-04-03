import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    const data = request.all()
    const { email, password } = await loginValidator.validate(data)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return token
  }

  async register({ request }: HttpContext) {
    const data = request.all()
    const payload = await registerValidator.validate(data)

    const user = await User.create(payload)
    const token = await User.accessTokens.create(user)

    return token
  }
}
