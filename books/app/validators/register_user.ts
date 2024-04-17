import vine from '@vinejs/vine'

export const inscriptionValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(3).maxLength(255),
    lastname: vine.string().minLength(3).maxLength(255),
    email: vine.string().email(),
    //.unique({
    //  table: 'users',
    //  column: 'email',
    //})
    password: vine.string().minLength(4).maxLength(32),
  })
)
