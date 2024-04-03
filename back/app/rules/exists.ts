import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

export interface Options {
  table: string
  column: string
}

async function exists(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'number') {
    return
  }

  const row = await db
    .from(options.table)
    .select(options.column)
    .where(options.column, value)
    .first()

  if (!row) {
    field.report('The {{ field }} field does not exist', 'exists', field)
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const existsRule = vine.createRule(exists)
