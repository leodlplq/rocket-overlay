const AuthController = () => import('#controllers/auth_controller')
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import { normalize, sep } from 'node:path'
import { middleware } from './kernel.js'
const OverlaysController = () => import('#controllers/overlays_controller')

router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])

router
  .group(() => {
    router.get('/ping', ({ auth }: HttpContext) => auth.user) // Test route

    router
      .group(() => {
        router.resource('overlays', OverlaysController).apiOnly()
      })
      .use(middleware.role({ guards: ['ADMIN'] }))
  })
  .use(middleware.auth({ guards: ['api'] }))

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)

  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = app.makePath('uploads', normalizedPath)
  return response.download(absolutePath)
})
