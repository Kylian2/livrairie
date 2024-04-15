import vine from '@vinejs/vine'
import { VineString } from '@vinejs/vine'
import { uniqueRule, Options } from './rules/unique.js'

VineString.macro('unique', function (this: VineString, options: Options) {
  return this.use(uniqueRule(options))
})

declare module '@vinejs/vine' {
  interface VineString {
    unique(options: Options): this
  }
}

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
