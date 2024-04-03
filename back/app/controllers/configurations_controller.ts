import Configuration from '#models/configuration'
import {
  createConfigurationValidator,
  updateConfigurationValidator,
} from '#validators/configuration'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { v4 as uuidv4 } from 'uuid'

export default class ConfigurationsController {
  async index({ auth }: HttpContext) {
    await auth.user?.load('overlays')
    return auth.user?.overlays
  }

  async store({ request, auth }: HttpContext) {
    const data = await request.validateUsing(createConfigurationValidator)

    await auth.user?.load('overlays')
    const userOverlayCount = auth.user?.overlays.length ?? 0

    const configuration = await Configuration.create({
      uuid: uuidv4(),
      overlayId: data.overlay_id,
      userId: auth.user?.id,
      name: `overlay-${auth.user?.username}-${userOverlayCount + 1}`,
    })

    return configuration
  }

  async show({ request, response }: HttpContext) {
    const configuration = await Configuration.findBy('uuid', request.param('uuid'))

    if (!configuration) {
      return response.notFound({ error: 'Configuration not found' })
    }

    return configuration
  }

  async update({ request, response, bouncer }: HttpContext) {
    const configuration = await Configuration.findBy('uuid', request.param('uuid'))

    if (!configuration) {
      return response.notFound({ error: 'Configuration not found' })
    }

    await bouncer.authorize('editConfiguration', configuration)

    const data = await request.validateUsing(updateConfigurationValidator)

    if (data.game_title) configuration.gameTitle = data.game_title
    if (data.number_of_games) configuration.numberOfGames = data.number_of_games
    if (data.use_ingame_names) configuration.useIngameNames = data.use_ingame_names
    if (data.team_one_name) configuration.teamOneName = data.team_one_name
    if (data.team_one_score) configuration.teamOneScore = data.team_one_score
    if (data.team_one_goals) configuration.teamOneGoals = data.team_one_goals
    if (data.team_two_name) configuration.teamTwoName = data.team_two_name
    if (data.team_two_score) configuration.teamTwoScore = data.team_two_score
    if (data.team_two_goals) configuration.teamTwoGoals = data.team_two_goals

    if (data.team_one_image) {
      console.log(data.team_one_image)
      await data.team_one_image.move(app.makePath('uploads/teams'), {
        name: `${configuration.uuid}-team-one-image.${data.team_one_image.extname}`,
      })
      configuration.teamOneImage = `/uploads/teams/${data.team_one_image.fileName}`
    }
    if (data.team_two_image) {
      await data.team_two_image.move(app.makePath('uploads/teams'), {
        name: `${configuration.uuid}-team-two-image.${data.team_two_image.extname}`,
      })
      configuration.teamTwoImage = `/uploads/teams/${data.team_two_image.fileName}`
    }

    configuration.save()

    // TODO: handle realtime database updates with pusher
    return configuration
  }
}
