import Overlay from '#models/overlay'
import { overlayValidator } from '#validators/overlay'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class OverlaysController {
  async index() {
    return Overlay.all()
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(overlayValidator)

    await data.video?.move(app.makePath('uploads/overlays'), {
      name: `${data.name.toLocaleLowerCase() + Date.now()}.webm`,
    })

    const overlay = await Overlay.create({
      name: data.name,
      videoUrl: data.video?.fileName ? `/uploads/overlays/${data.video?.fileName}` : null,
      active: data.active,
    })

    return overlay
  }

  async update({ request }: HttpContext) {
    const overlay = await Overlay.findOrFail(request.param('id'))
    const data = await request.validateUsing(overlayValidator)

    await data.video?.move(app.makePath('uploads/overlays'), {
      name: `${data.name.toLocaleLowerCase() + Date.now()}.webm`,
    })

    overlay.name = data.name
    overlay.videoUrl = data.video?.fileName ? `/uploads/overlays/${data.video?.fileName}` : null
    overlay.active = data.active

    overlay.save()

    return overlay
  }

  async destroy({ request, response }: HttpContext) {
    const overlay = await Overlay.findOrFail(request.param('id'))
    overlay.delete()

    return response.ok({})
  }
}
