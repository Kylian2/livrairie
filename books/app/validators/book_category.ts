import vine from '@vinejs/vine'

export const bookValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(255),
    author: vine.string().maxLength(255),
    cover: vine.string().maxLength(255),
    resume: vine.string(),
  })
)
