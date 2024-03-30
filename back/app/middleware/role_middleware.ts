import Roles, { RoleKey } from '#enums/roles'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle(
    { response, auth }: HttpContext,
    next: NextFn,
    options: {
      guards?: RoleKey[]
    } = {}
  ) {
    if (options.guards === undefined) {
      return await next()
    }

    const rolesIds = options.guards.map((guard) => Roles[guard])

    // @ts-ignore
    if (!rolesIds.includes(auth.user?.roleId)) {
      return response.unauthorized({ error: `Unauthorized` })
    }

    const output = await next()
    return output
  }
}
