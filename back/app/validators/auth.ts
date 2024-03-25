import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    firstname: vine.string(),
    lastname: vine.string(),
    username: vine.string().unique({ table: 'users', column: 'username' }),
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
