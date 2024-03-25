const AuthController = () => import('#controllers/auth_controller')
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])

router
  .group(() => {
    router.get('/ping', ({ auth }: HttpContext) => auth.user) // Test route
  })
  .use(middleware.auth({ guards: ['api'] }))
