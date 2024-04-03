import vine from '@vinejs/vine'

export const overlayValidator = vine.compile(
  vine.object({
    name: vine.string(),
    video: vine.file({ extnames: ['webm'] }).optional(),
    active: vine.boolean(),
  })
)
