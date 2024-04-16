import Book from '#models/book'
import BookCategorie from '#models/book_categorie'
import Category from '#models/category'
import { bookValidator } from '#validators/book_category'
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
  async store({ request, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const id = user.id

    const categorie = request.body().categorie

    let book = new Book()
    const payrol = await request.validateUsing(bookValidator)
    book.merge({
      userId: id,
      ...payrol,
    })
    book = await book.save()
    const categorieQueryResult = Category.query().select('id').where('name', categorie)
    let idCategorie: number

    if (categorieQueryResult !== undefined) {
      idCategorie = (await categorieQueryResult).at(0).id
      let bookCategory = new BookCategorie()
      bookCategory.merge({
        bookId: book.id,
        categorieId: idCategorie,
      })
      return 'Le livre a bien été ajouté'
    }
    return 'Une erreur est survenue'
  }

  /**
   * Show individual record
   */
  async show({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    const id = user.id
    const book = await Book.query()
      .preload('user', (u) => u.select('id', 'firstname', 'lastname')) //permet d'inclure à l'emplacement ou l'on fait réference à un user l'objet user.
      .preload('categories')
      .where('id', params.id)
      .where('user_id', id)
    if (book.length > 0) {
      return book
    } else {
      return false
    }
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
