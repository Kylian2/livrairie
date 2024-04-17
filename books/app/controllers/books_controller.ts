import Book from '#models/book'
import BookCategorie from '#models/book_categorie'
import Category from '#models/category'
import { bookValidator } from '#validators/book_category'
import type { HttpContext } from '@adonisjs/core/http'

import db from '@adonisjs/lucid/services/db'
import { error } from 'node:console'

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
      await bookCategory.save()
      return true
    }
    return 'Une erreur est survenue'
  }

  /**
   * Show individual record
   */
  async show({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    const userId = user.id
    const book = await db.rawQuery(
      `
        SELECT b.id, title, author, resume, cover, name 
        FROM books b
        INNER JOIN book_categories bc ON bc.book_id = b.id
        INNER JOIN categories c ON bc.categorie_id = c.id
        WHERE user_id = :user_id and b.id = :book_id`,
      {
        user_id: userId,
        book_id: Number(params.id),
      }
    )
    //.where('id', params.id)
    if (book.length > 0) {
      return book
    } else {
      return false
    }
  }

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    book.delete().then(() => {
      console.log('Fini')
      return true
    })
    return false
  }
}
