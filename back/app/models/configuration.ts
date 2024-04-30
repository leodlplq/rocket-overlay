import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Overlay from './overlay.js'
import User from './user.js'

export default class Configuration extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare active: boolean

  @column()
  declare gameTitle: string | null

  @column({
    serialize(value) {
      return Number.parseInt(value)
    },
  })
  declare numberOfGames: number | null

  @column()
  declare useIngameNames: boolean

  @column()
  declare teamOneName: string | null

  @column()
  declare teamOneScore: number | null

  @column()
  declare teamOneGoals: number | null

  @column()
  declare teamOneImage: string | null

  @column()
  declare teamTwoName: string | null

  @column()
  declare teamTwoScore: number | null

  @column()
  declare teamTwoGoals: number | null

  @column()
  declare teamTwoImage: string | null

  @column()
  declare userId: number

  @column()
  declare overlayId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Overlay)
  declare overlay: BelongsTo<typeof Overlay>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
