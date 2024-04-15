import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const id = user.id
    const books = Book.query()
      .preload('user', (u) => u.select('id', 'firstname', 'lastname')) //permet d'inclure à l'emplacement ou l'on fait réference à un user l'objet user.
      .preload('categories')
      .where('user_id', id)
    return books
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const book = Book.query()
      .preload('user', (u) => u.select('id', 'firstname', 'lastname')) //permet d'inclure à l'emplacement ou l'on fait réference à un user l'objet user.
      .preload('categories')
      .where('id', params.id)
    return book
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
