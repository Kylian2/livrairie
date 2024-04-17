import type { HttpContext } from '@adonisjs/core/http'
import { inscriptionValidator } from '#validators/register_user'
import { connexionValidator } from '#validators/login_user'
import User from '#models/user'
//import { loginUserValidator } from '#validators/login_user'

export default class AuthController {
  async inscription({ request }: HttpContext) {
    const payload = await request.validateUsing(inscriptionValidator)
    return await User.create(payload)
  }

  async connexion({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(connexionValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return token
  }

  async deconnexion({ auth, response }: HttpContext) {
    console.log(auth.check())
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    await User.accessTokens.delete(user, token)
    return response.ok({ message: 'Logged out' })
  }

  async checklogged({ auth }: HttpContext) {
    return await auth.check()
  }
}
