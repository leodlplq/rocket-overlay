import vine from '@vinejs/vine'

export const createConfigurationValidator = vine.compile(
  vine.object({
    overlay_id: vine.number().exists({ table: 'overlays', column: 'id' }),
  })
)

export const updateConfigurationValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    game_title: vine.string().optional(),
    number_of_games: vine.number().optional(),
    use_ingame_names: vine.boolean().optional(),
    team_one_name: vine.string().optional(),
    team_one_score: vine.number().optional(),
    team_one_goals: vine.number().optional(),
    team_one_image: vine.file({ extnames: ['png', 'jpg'], size: '5mb' }).optional(),
    team_two_name: vine.string().optional(),
    team_two_score: vine.number().optional(),
    team_two_goals: vine.number().optional(),
    team_two_image: vine.file({ extnames: ['png', 'jpg'], size: '5mb' }).optional(),
  })
)
