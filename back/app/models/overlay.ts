import { BaseModel, column, computed, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Configuration from './configuration.js'

export default class Overlay extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare videoUrl: string | null

  @column({ serializeAs: null })
  declare active: boolean

  @computed()
  get isActive() {
    return this.active ? true : false
  }

  @hasMany(() => Configuration)
  declare configurations: HasMany<typeof Configuration>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
