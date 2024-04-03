import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'configurations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      // RELATIONS
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('overlay_id')
        .unsigned()
        .references('id')
        .inTable('overlays')
        .onDelete('CASCADE')

      // OVERLAY INFO
      table.uuid('uuid').notNullable()
      table.string('name').notNullable()
      table.string('active').notNullable().defaultTo(true)

      // CONFIGURATION INFO
      table.string('game_title').nullable()
      table.string('number_of_games').nullable()

      table.boolean('use_ingame_names').notNullable().defaultTo(true)

      table.string('team_one_name').nullable()
      table.integer('team_one_score').nullable()
      table.integer('team_one_goals').nullable()
      table.string('team_one_image').nullable()

      table.string('team_two_name').nullable()
      table.integer('team_two_score').nullable()
      table.integer('team_two_goals').nullable()
      table.string('team_two_image').nullable()

      // TIMESTAMP
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
