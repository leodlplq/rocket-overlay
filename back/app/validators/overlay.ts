import vine from '@vinejs/vine'

export const overlayValidator = vine.compile(
  vine.object({
    name: vine.string(),
    video: vine.file({ extnames: ['webm'] }).optional(),
    image: vine.file({ extnames: ['png', 'jpg'] }),
    active: vine.boolean(),
  })
)
