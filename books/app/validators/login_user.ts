import vine from '@vinejs/vine'

export const connexionValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(4).maxLength(32),
  })
)
